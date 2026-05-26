import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-scrubbed exit for the hero. Deferred until useHeroIntro fires
// its onComplete callback — this prevents the exit's ScrollTrigger from
// conflicting with the intro's in-flight tweens on the same elements.
//
// Coexistence flow:
//   1. Page load: intro plays (invisible → visible, ~1.2s).
//   2. intro onComplete: dispatches 'heroIntroComplete', sets window.__heroIntroComplete.
//   3. Exit setup fires: ScrollTrigger created, starting from intro's final state.
//   4. scrollY = 0 → exit progress = 0 → elements stay visible. Clean.
export function useHeroExit({ badgeRef, headlineRef, subheadRef, ctasRef, sectionRef }) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx

    const setup = () => {
      const section = sectionRef.current
      const badge = badgeRef?.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      const ctas = ctasRef.current
      if (!section || !headline) return

      // .hero-word spans created by useHeroIntro's SplitText — guaranteed to
      // exist because heroIntroComplete fires after the intro's run() completes.
      const words = Array.from(headline.querySelectorAll('.hero-word'))
      const headlineTarget = words.length ? words : headline

      ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom 20%',
            scrub: 0.8,
          },
        })
          .to(badge, { y: -120, opacity: 0, ease: 'power2.in' }, 0)
          .to(
            headlineTarget,
            {
              y: -100,
              opacity: 0,
              stagger: { amount: 0.4, from: 'start' },
              ease: 'power2.in',
            },
            0.05,
          )
          .to(subhead, { y: -60, opacity: 0, ease: 'power2.in' }, 0.15)
          .to(ctas, { y: -30, opacity: 0, ease: 'power2.in' }, 0.25)
      }, section)
    }

    if (window.__heroIntroComplete) {
      // Intro already finished (e.g. hot-reload / StrictMode remount).
      setup()
    } else {
      window.addEventListener('heroIntroComplete', setup, { once: true })
    }

    return () => {
      window.removeEventListener('heroIntroComplete', setup)
      ctx?.revert()
    }
  }, [badgeRef, headlineRef, subheadRef, ctasRef, sectionRef])
}
