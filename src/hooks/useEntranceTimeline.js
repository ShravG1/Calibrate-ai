import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared boilerplate for "play once when the section enters at 80%" entrance
// timelines. Skips entirely on prefers-reduced-motion (content stays in its
// natural visible state). Waits for fonts.ready before measuring/splitting so
// the choreography doesn't jump when fonts arrive a few frames late.
//
// `build(tl, section)` constructs the timeline. It may return an array of
// cleanup callbacks (e.g. clearInterval handles) which run alongside the
// gsap.context revert on unmount.
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        const result = build(tl, section)
        if (Array.isArray(result)) cleanups = result
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
