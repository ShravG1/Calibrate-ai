import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// One "beat" per card. The timeline's virtual time is scrubbed by scroll
// progress, so durations here are relative to the beat unit — not seconds.
const BEAT = 1
const DISSOLVE = 0.3

// Pinned-scroll storytelling timeline for the Services section.
// Caller passes the tall scroll-container ref (which establishes the pin
// distance via its CSS height); the sticky child stays at top:0 while the
// container scrolls past, and ScrollTrigger maps that scroll into timeline
// progress 0→1. All per-card entrance + cross-dissolve choreography is
// expressed as positioned tweens on a single timeline.
export function useServicesPin({ enabled, sectionRef, count, onActiveChange }) {
  useLayoutEffect(() => {
    if (!enabled) return
    const section = sectionRef.current
    if (!section) return
    const cards = Array.from(section.querySelectorAll('[data-card-index]'))
    if (cards.length === 0) return

    let lastIdx = -1
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const eyebrow = card.querySelector('.services-eyebrow')
        const title = card.querySelector('.services-title')
        const summary = card.querySelector('.services-summary')
        const bullets = card.querySelectorAll('.services-bullet')
        gsap.set(card, { opacity: i === 0 ? 1 : 0 })
        gsap.set([eyebrow, title], { x: -40, opacity: 0 })
        gsap.set(summary, { y: 20, opacity: 0 })
        gsap.set(bullets, { y: 10, opacity: 0 })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.min(count - 1, Math.floor(self.progress * count))
            if (idx !== lastIdx) {
              lastIdx = idx
              onActiveChange?.(idx)
            }
          },
        },
      })

      cards.forEach((card, i) => {
        const eyebrow = card.querySelector('.services-eyebrow')
        const title = card.querySelector('.services-title')
        const summary = card.querySelector('.services-summary')
        const bullets = card.querySelectorAll('.services-bullet')
        const start = i * BEAT

        if (i > 0) {
          // Cross-dissolve: previous card fades out as this one fades in.
          tl.to(
            cards[i - 1],
            { opacity: 0, duration: DISSOLVE, ease: 'power1.inOut' },
            start - DISSOLVE,
          )
          tl.fromTo(
            card,
            { opacity: 0 },
            { opacity: 1, duration: DISSOLVE, ease: 'power1.inOut' },
            start - DISSOLVE,
          )
        }
        tl.fromTo(
          [eyebrow, title],
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.05 },
          start,
        )
        tl.fromTo(
          summary,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          start + 0.2,
        )
        tl.fromTo(
          bullets,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.06 },
          start + 0.5,
        )
      })

      // Lock the timeline length so each card — especially the last — gets
      // the full dwell of its beat before progress reaches 1.
      tl.to({}, { duration: 0.0001 }, count * BEAT)
    }, section)

    return () => ctx.revert()
  }, [enabled, sectionRef, count, onActiveChange])
}
