import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-scrubbed entrance: fades up in lockstep with scroll position.
// Animation begins when element top enters at 85% and completes at 30%.
// Bi-directional by nature of scrub. Bypassed entirely on reduced-motion.
export default function Reveal({ children, y = 22, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [y])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
