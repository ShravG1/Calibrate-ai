import { useEffect } from 'react'

// Track cursor position inside a host element and write it into the
// element's --aura-x / --aura-y CSS variables. A radial-gradient layer on
// the element can then read those vars to render a glow that follows the
// pointer. Writes are throttled with requestAnimationFrame — multiple
// mousemove events in a single frame coalesce into one DOM write.
export function useAura(ref, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return

    let rafId = 0
    let px = 0
    let py = 0

    const flush = () => {
      rafId = 0
      el.style.setProperty('--aura-x', `${px}px`)
      el.style.setProperty('--aura-y', `${py}px`)
    }

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      px = e.clientX - r.left
      py = e.clientY - r.top
      if (!rafId) rafId = requestAnimationFrame(flush)
    }

    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [ref, enabled])
}
