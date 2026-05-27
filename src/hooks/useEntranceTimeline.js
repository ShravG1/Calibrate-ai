import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared boilerplate for section entrance + exit choreography. Skips entirely
// on prefers-reduced-motion. Waits for fonts.ready before measuring/splitting
// so the choreography doesn't jump when fonts arrive a few frames late.
//
// Split into TWO ScrollTriggers so anchor-jumps land on fully-revealed
// content. A single scrub timeline from 'top 90%' → 'bottom 10%' would
// leave the timeline at ~44% progress when an anchor link lands the
// section top at ~10% from viewport top — meaning form fields / cards /
// footer hidden when the user arrives. Instead:
//
//   Entry  — top 85% → top 55%, scrub 0.4. Completes before the anchor
//            landing position, so anchor-jumps see fully-revealed content.
//   Exit   — top 5% → top -40%, scrub 0.4. Only fires once the section is
//            actually scrolling past the top of the viewport.
//
// `build(tl, section)` constructs the entry timeline. It may return an
// array of cleanup callbacks which run alongside the gsap.context revert.
export function useEntranceTimeline({ sectionRef, build, deps = [] }) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    if (!section) return

    let cancelled = false
    let ctx
    let cleanups = []

    const start = () => {
      if (cancelled || !sectionRef.current) return
      ctx = gsap.context(() => {
        const entryTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        })
        const result = build(entryTl, section)
        if (Array.isArray(result)) cleanups = result

        // Exit: fade SplitText spans out as the section scrolls past the
        // viewport top. Querying after build() so spans exist.
        const words = Array.from(
          section.querySelectorAll('[class*="-word"],[class*="-char"]'),
        )
        if (words.length) {
          gsap.to(words, {
            y: -24,
            opacity: 0,
            stagger: { amount: 0.3, from: 'end' },
            ease: 'power1.in',
            scrollTrigger: {
              trigger: section,
              start: 'top 5%',
              end: 'top -40%',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          })
        }
      }, section)
    }

    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(start)

    return () => {
      cancelled = true
      cleanups.forEach((fn) => {
        try {
          fn()
        } catch {
          /* ignore */
        }
      })
      ctx?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
