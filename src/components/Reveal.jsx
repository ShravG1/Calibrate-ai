import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Three-phase scroll animation: enter from below, hold visible, exit upward.
// All three phases are scrub-linked to scroll position and bi-directional.
// Bypassed entirely on reduced-motion (elements render naturally visible).
export default function Reveal({ children, y = 22, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
      // Enter: fade up from below
      tl.fromTo(el, { y, opacity: 0 }, { y: 0, opacity: 1, ease: 'power1.out' }, 0)
      // Exit: fade up out of view (starts at 0.75 on timeline)
      tl.to(el, { y: -y, opacity: 0, ease: 'power1.in' }, 0.75)
    }, el)

    return () => ctx.revert()
  }, [y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
