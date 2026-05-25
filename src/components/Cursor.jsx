import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

const TRAIL_LENGTH = 10          // ~170ms history at 60fps — a streak, not a tail
const AMPLITUDE = 1.5            // wave peak, px — almost straight
const WAVELENGTHS = 1            // single cycle across the streak
const DRAIN_PER_FRAME = 3        // retract speed when hovered

// Magnetic field over CTAs marked with data-cursor-magnetic="true".
// The visible cursor (head + trail) drifts toward the nearest target's
// centre when within range. Real click position is unaffected — the offset
// is purely cosmetic. Spring is implemented as a critically-ish-damped
// velocity integrator (stiffness ~200 / damping ~25 in Framer terms).
const MAG_RANGE = 100            // px — outside this radius, no pull
const MAG_MAX = 18               // px — cap on magnitude of the visible offset
const MAG_STIFFNESS = 0.18
const MAG_DAMPING = 0.65

// Wave-trail cursor — a small teal head dot follows the pointer
// ~instantly, while a single SVG path traces the last ~30 sample
// positions and ripples with a sine displacement that echoes the
// Calibrate logo. All per-frame work is done via refs/rAF so React
// never re-renders during animation.
export default function Cursor() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 0,
    h: typeof window !== 'undefined' ? window.innerHeight : 0,
  }))

  const pointer = useRef({ x: -200, y: -200 })
  const history = useRef([])
  const hoveredRef = useRef(false)
  const visibleRef = useRef(false)
  const reduceRef = useRef(false)
  const magnetics = useRef([])
  const magOffset = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const gradRef = useRef(null)
  const headRef = useRef(null)
  const rafRef = useRef(0)

  // Touch / coarse-pointer devices keep their native cursor.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setActive(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!active) return
    document.documentElement.classList.add('cursor-none')
    return () => document.documentElement.classList.remove('cursor-none')
  }, [active])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Mirror state into refs so the rAF loop can read without re-subscribing.
  useEffect(() => { hoveredRef.current = hovered }, [hovered])
  useEffect(() => { visibleRef.current = visible }, [visible])
  useEffect(() => { reduceRef.current = !!reduce }, [reduce])

  useEffect(() => {
    if (!active) return

    const onMove = (e) => {
      pointer.current.x = e.clientX
      pointer.current.y = e.clientY
      if (!visibleRef.current) setVisible(true)
    }

    const resolve = (target) => {
      if (!target || typeof target.closest !== 'function') return null
      const labelEl = target.closest('[data-cursor-label]')
      if (labelEl) return { kind: 'label', text: labelEl.dataset.cursorLabel || '' }
      const hoverEl = target.closest(HOVER_SELECTOR)
      if (hoverEl) return { kind: 'hover' }
      return null
    }

    const onOver = (e) => {
      const hit = resolve(e.target)
      if (hit) {
        setHovered(true)
        setLabel(hit.kind === 'label' ? hit.text : '')
      }
    }

    const onOut = (e) => {
      const next = resolve(e.relatedTarget)
      if (!next) {
        setHovered(false)
        setLabel('')
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [active])

  // Discover magnetic targets and keep the list fresh as the DOM changes
  // (sections mounting, Contact form swapping for the success state, etc.).
  // We cache element refs only — the rects/centres are read on each frame
  // in the rAF loop so scroll position stays correct without a scroll
  // listener.
  useEffect(() => {
    if (!active) return
    if (typeof document === 'undefined') return

    let scheduled = 0
    const refresh = () => {
      const els = document.querySelectorAll('[data-cursor-magnetic="true"]')
      magnetics.current = Array.from(els)
    }
    refresh()

    const observer = new MutationObserver(() => {
      cancelAnimationFrame(scheduled)
      scheduled = requestAnimationFrame(refresh)
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-cursor-magnetic'],
    })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(scheduled)
    }
  }, [active])

  // rAF loop. All per-frame work happens here via refs + DOM writes.
  useEffect(() => {
    if (!active) return

    const tick = () => {
      const hx = pointer.current.x
      const hy = pointer.current.y
      const r = reduceRef.current

      // Magnetic target offset — spring toward the nearest magnetic CTA's
      // centre when within range. Zeroed on reduced motion.
      let targetOx = 0
      let targetOy = 0
      if (!r && magnetics.current.length) {
        let bestPull = 0
        let bestDx = 0
        let bestDy = 0
        let bestDist = 0
        for (let i = 0; i < magnetics.current.length; i++) {
          const el = magnetics.current[i]
          const rect = el.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dx = cx - hx
          const dy = cy - hy
          const dist = Math.hypot(dx, dy)
          if (dist >= MAG_RANGE) continue
          const t = 1 - dist / MAG_RANGE
          const pull = t * t // quadratic falloff
          if (pull > bestPull) {
            bestPull = pull
            bestDx = dx
            bestDy = dy
            bestDist = dist
          }
        }
        if (bestPull > 0) {
          // Unit vector × min(dist, MAG_MAX) × pull. The min() prevents the
          // visible cursor from overshooting the centre when pointer is
          // very close.
          const len = bestDist || 1
          const magnitude = Math.min(bestDist, MAG_MAX) * bestPull
          targetOx = (bestDx / len) * magnitude
          targetOy = (bestDy / len) * magnitude
        }
      }
      // Damped spring integration toward the target offset.
      const off = magOffset.current
      off.vx += (targetOx - off.x) * MAG_STIFFNESS - off.vx * MAG_DAMPING
      off.vy += (targetOy - off.y) * MAG_STIFFNESS - off.vy * MAG_DAMPING
      off.x += off.vx
      off.y += off.vy
      const ox = off.x
      const oy = off.y

      // Position the head element — visible head sits at pointer + offset.
      const headEl = headRef.current
      if (headEl) {
        headEl.style.transform =
          `translate3d(${hx + ox}px, ${hy + oy}px, 0) translate(-50%, -50%)`
      }

      // History bookkeeping.
      if (!r) {
        if (hoveredRef.current) {
          if (history.current.length > 0) {
            history.current.length = Math.max(
              0,
              history.current.length - DRAIN_PER_FRAME,
            )
          }
        } else {
          history.current.unshift({ x: hx, y: hy })
          if (history.current.length > TRAIL_LENGTH) {
            history.current.length = TRAIL_LENGTH
          }
        }
      } else if (history.current.length) {
        history.current.length = 0
      }

      // Draw the path.
      const path = pathRef.current
      const grad = gradRef.current
      if (path) {
        const N = history.current.length
        if (r || N < 2) {
          path.setAttribute('d', '')
        } else {
          const pts = new Array(N)
          for (let i = 0; i < N; i++) {
            const p = history.current[i]
            const t = i / (N - 1)
            // Taper amplitude with a half-sine envelope so the wave
            // is zero at the head (so the dot sits on the pointer)
            // and zero at the tail (so the gradient fade reads clean).
            const env = Math.sin(t * Math.PI)
            const w =
              Math.sin(t * Math.PI * 2 * WAVELENGTHS) * AMPLITUDE * env
            // Translate every sample by the current magnetic offset so the
            // trail moves rigidly with the head — head + trail stay connected.
            pts[i] = { x: p.x + ox, y: p.y + oy + w }
          }
          path.setAttribute('d', catmullRom(pts))
          if (grad) {
            const head = pts[0]
            const tail = pts[N - 1]
            grad.setAttribute('x1', String(head.x))
            grad.setAttribute('y1', String(head.y))
            grad.setAttribute('x2', String(tail.x))
            grad.setAttribute('y2', String(tail.y))
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  if (!active) return null

  const morphed = hovered && !reduce
  const fade = visible ? 1 : 0

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden
        width={size.w}
        height={size.h}
        viewBox={`0 0 ${size.w} ${size.h}`}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ opacity: fade, transition: 'opacity 180ms ease' }}
      >
        <defs>
          <linearGradient
            ref={gradRef}
            id="cursor-trail-gradient"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stopColor="#00ffcc" stopOpacity="1" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d=""
          fill="none"
          stroke="url(#cursor-trail-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        ref={headRef}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full ${
          morphed
            ? 'h-6 w-6 border-[1.5px] border-electric bg-transparent shadow-[0_0_18px_rgba(0,255,204,0.35)]'
            : 'h-1.5 w-1.5 border-0 bg-electric shadow-[0_0_10px_rgba(0,255,204,0.6)]'
        }`}
        style={{
          opacity: fade,
          willChange: 'transform',
          transition:
            'width 200ms ease, height 200ms ease, background-color 200ms ease, border-width 200ms ease, opacity 180ms ease',
        }}
      >
        {morphed && label && (
          <span className="select-none whitespace-nowrap font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-mist">
            {label}
          </span>
        )}
      </div>
    </>
  )
}

// Catmull-Rom → cubic Bezier path. Uniform parameterisation.
function catmullRom(pts) {
  if (pts.length < 2) return ''
  const out = [`M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    out.push(
      `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    )
  }
  return out.join(' ')
}
