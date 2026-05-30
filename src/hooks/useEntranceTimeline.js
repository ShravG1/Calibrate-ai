import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared boilerplate for section entrance + exit choreography. Skips entirely
// on prefers-reduced-motion. Waits for fonts.ready before measuring/splitting
// so the choreography doesn't jump when fonts arrive a few frames late.
//
// Two scroll-trigger modes:
//   - default: scrubbed entrance. Animation maps to scroll position from
//     top 75% → top 35%. Good for short timelines where every element is
//     visible during the scrub window.
//   - playOnce: triggered entrance. When the section first enters at
//     top 80%, the entire build() timeline plays through once. Better for
//     staggered cascades (FAQ items, etc.) where the user shouldn't have
//     to scroll perfectly to "see" the animation, and where partial scrub
//     states look glitchy.
//
// noExit skips the trailing fade-out for terminal sections (e.g. Contact)
// that shouldn't dissolve as the user reaches them.
//
// `build(tl, section)` constructs the entry timeline. It may return an
// array of cleanup callbacks which run alongside the gsap.context revert.
export function useEntranceTimeline({
  sectionRef,
  build,
  playOnce = false,
  noExit = false,
  deps = [],
}) {
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
        const entryScrollTrigger = playOnce
          ? {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
              invalidateOnRefresh: true,
            }
          : {
              trigger: section,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.4,
              invalidateOnRefresh: true,
            }
        const entryTl = gsap.timeline({ scrollTrigger: entryScrollTrigger })
        const result = build(entryTl, section)
        if (Array.isArray(result)) cleanups = result

        if (noExit) return

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
              start: 'top -5%',
              end: 'top -45%',
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
