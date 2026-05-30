import { useRef, useState } from 'react'
import { faqs } from '../data.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'
import { gsap } from 'gsap'

export default function FAQ() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const listRef = useRef(null)
  // Single-open accordion — clicking a new question closes the previous one.
  const [openIndex, setOpenIndex] = useState(null)

  useEntranceTimeline({
    sectionRef,
    playOnce: true,
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
      if (items.length) gsap.set(items, { y: 24, opacity: 0 })

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
            duration: 0.55,
            stagger: 0.08,
            ease: 'power2.out',
          },
          0.4,
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
          {faqs.map((item, i) => {
            const open = openIndex === i
            const panelId = `faq-panel-${i}`
            const buttonId = `faq-button-${i}`
            return (
              <li
                key={item.q}
                className="overflow-hidden rounded-2xl border border-line bg-ink-card/60"
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full cursor-pointer items-start gap-4 px-5 py-4 text-left text-base font-semibold transition-colors hover:bg-ink-soft/40 sm:px-6 sm:py-5 sm:text-lg"
                  >
                    <span className="flex-1 leading-snug">{item.q}</span>
                    <span
                      aria-hidden
                      className={`mt-1.5 inline-block h-2 w-2 shrink-0 rotate-45 border-b-2 border-r-2 border-electric transition-transform duration-200 ${
                        open ? 'rotate-[225deg]' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="border-t border-line/60 px-5 pb-5 pt-3 text-base leading-relaxed text-mist-dim sm:px-6 sm:pb-6"
                >
                  {item.a}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
