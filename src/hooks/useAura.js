import { useEffect, useRef } from 'react'

// Track cursor position inside a host element and write a normalised
// (0..1) position into the returned ref. Y is flipped to match WebGL UV
// convention (origin at bottom-left), which is what the shader expects on
// its uMouse uniform. Writes are rAF-throttled so multiple mousemove
// events per frame coalesce into one update.
export function useAura(ref, enabled = true) {
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let rafId = 0
    let px = 0.5
    let py = 0.5

    const flush = () => {
      rafId = 0
      mouse.current.x = px
      mouse.current.y = py
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      px = (e.clientX - r.left) / Math.max(r.width, 1)
      py = 1 - (e.clientY - r.top) / Math.max(r.height, 1)
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [ref, enabled])

  return mouse
}
