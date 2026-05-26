import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Scroll-scrubbed exit for the hero. Reads the .hero-word spans created by
// useHeroIntro's SplitText — both hooks call document.fonts.ready; useHeroIntro
// registers first (hook call order in Hero.jsx) so its SplitText exists by the
// time this callback runs. Falls back to animating the headline block if the
// words aren't present yet (e.g. reduced-motion skipped the intro split).
//
// Coexistence with useHeroIntro:
//   Intro  → invisible → visible  (mount, one-shot, no scrub)
//   Exit   → visible  → invisible (scroll, scrub, bi-directional)
// At scrollY = 0 exit progress = 0 so elements stay at intro's final state.
export function useHeroExit({ badgeRef, headlineRef, subheadRef, ctasRef, sectionRef }) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx
    let cancelled = false

    const start = () => {
      if (cancelled) return
      const section = sectionRef.current
      const badge = badgeRef?.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      const ctas = ctasRef.current
      if (!section || !headline) return

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

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(start)

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [badgeRef, headlineRef, subheadRef, ctasRef, sectionRef])
}
