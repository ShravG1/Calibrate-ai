import { useRef } from 'react'
import { faqs } from '../data.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'
import { gsap } from 'gsap'

export default function FAQ() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const listRef = useRef(null)

  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const eyebrow = eyebrowRef.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      const items = listRef.current
        ? Array.from(listRef.current.children)
        : []
      if (!headline) return []

      gsap.set([eyebrow, headline, subhead].filter(Boolean), {
        y: 16,
        opacity: 0,
      })
      if (items.length) gsap.set(items, { y: 20, opacity: 0 })

      tl.to(eyebrow, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      tl.to(
        headline,
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.1,
      )
      tl.to(
        subhead,
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.2,
      )
      if (items.length) {
        tl.to(
          items,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: 'power2.out',
          },
          0.3,
        )
      }

      return []
    },
  })

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="relative px-5 py-12 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
        >
          Common questions
        </p>
        <h2
          ref={headlineRef}
          id="faq-heading"
          className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl"
        >
          The stuff people usually ask first.
        </h2>
        <p
          ref={subheadRef}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim"
        >
          Short, honest answers to the questions that come up on most first
          calls. If yours isn't here, just ask.
        </p>

        <ul ref={listRef} className="mt-10 space-y-3">
          {faqs.map((item) => (
            <li
              key={item.q}
              className="overflow-hidden rounded-2xl border border-line bg-ink-card/60"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-start gap-4 px-5 py-4 text-base font-semibold transition-colors hover:bg-ink-soft/40 sm:px-6 sm:py-5 sm:text-lg">
                  <span className="flex-1 leading-snug">{item.q}</span>
                  <span
                    aria-hidden
                    className="mt-1.5 inline-block h-2 w-2 shrink-0 rotate-45 border-b-2 border-r-2 border-electric transition-transform duration-200 group-open:rotate-[225deg]"
                  />
                </summary>
                <div className="border-t border-line/60 px-5 pb-5 pt-3 text-base leading-relaxed text-mist-dim sm:px-6 sm:pb-6">
                  {item.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
