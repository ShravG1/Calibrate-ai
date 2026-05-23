import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'

// Custom site cursor. A small dot tracks the pointer with a stiff spring; a
// thin outline ring trails it with a softer spring. Over interactive elements
// the dot fades and the ring grows; elements with [data-cursor-label] swap
// the dot for a tracked caption inside the ring.
export default function Cursor() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const dotXSpring = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 })
  const dotYSpring = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 })
  const ringXSpring = useSpring(x, { stiffness: 180, damping: 22, mass: 0.55 })
  const ringYSpring = useSpring(y, { stiffness: 180, damping: 22, mass: 0.55 })

  const dotX = reduce ? x : dotXSpring
  const dotY = reduce ? y : dotYSpring
  const ringX = reduce ? x : ringXSpring
  const ringY = reduce ? y : ringYSpring

  // Decide once whether to render at all. Touch / coarse-pointer devices keep
  // the native cursor (they don't have one to replace, but we mustn't ship a
  // floating dot when they tap).
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setActive(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  // Hide the native cursor only while ours is mounted.
  useEffect(() => {
    if (!active) return
    document.documentElement.classList.add('cursor-none')
    return () => document.documentElement.classList.remove('cursor-none')
  }, [active])

  // Pointer + hover tracking via event delegation — robust to dynamic DOM.
  useEffect(() => {
    if (!active) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
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
      const hitNext = resolve(e.relatedTarget)
      if (!hitNext) {
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
  }, [active, x, y, visible])

  if (!active) return null

  const ringSize = reduce ? 32 : hovered ? 56 : 32
  const showDot = !hovered

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-electric/70"
          animate={{ width: ringSize, height: ringSize }}
          transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
        >
          {label && (
            <span className="select-none whitespace-nowrap font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-mist">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-electric shadow-[0_0_12px_rgba(0,255,204,0.55)]"
          animate={{
            width: 8,
            height: 8,
            opacity: visible && showDot ? 1 : 0,
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        />
      </motion.div>
    </>
  )
}
