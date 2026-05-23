import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// One-shot cinematic intro for the hero. Splits the headline into words and
// choreographs badge → headline words → subhead → CTAs → stats on a single
// GSAP timeline so the sequence reads as one breath.
export function useHeroIntro({
  badgeRef,
  headlineRef,
  subheadRef,
  ctasRef,
  statsRef,
}) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const headline = headlineRef.current
    const subhead = subheadRef.current
    const ctas = ctasRef.current
    const badge = badgeRef?.current
    const stats = statsRef?.current
    if (!headline || !subhead || !ctas) return

    // Hide synchronously before paint so the timeline owns the reveal.
    gsap.set(headline, { opacity: 0 })
    gsap.set([badge, subhead, ctas, stats].filter(Boolean), { opacity: 0, y: 20 })

    let split
    let tl
    let cancelled = false

    const run = () => {
      if (cancelled || !headlineRef.current) return

      split = new SplitText(headlineRef.current, {
        type: 'words',
        wordsClass: 'hero-word',
        aria: 'auto',
      })

      gsap.set(headlineRef.current, { opacity: 1 })
      gsap.set(split.words, { y: 40, opacity: 0 })

      tl = gsap.timeline()
      tl.to(
        split.words,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
        },
        0,
      )
      if (badge) {
        tl.to(
          badge,
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          0,
        )
      }
      tl.to(
        subhead,
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.3,
      )
      tl.to(
        ctas,
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.5,
      )
      if (stats) {
        tl.to(
          stats,
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          0.7,
        )
      }
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(run)

    return () => {
      cancelled = true
      tl?.kill()
      split?.revert()
      gsap.set(
        [headline, badge, subhead, ctas, stats].filter(Boolean),
        { clearProps: 'opacity,transform' },
      )
    }
  }, [badgeRef, headlineRef, subheadRef, ctasRef, statsRef])
}
