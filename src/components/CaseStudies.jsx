import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { caseStudies } from '../data.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

function Field({ label, children }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-electric/80">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-mist-dim">{children}</p>
    </div>
  )
}

function CaseStudyCard({ cs }) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-card/60 transition duration-300 hover:-translate-y-0.5 hover:border-electric/40"
    >
      <div
        className={`relative m-3 ${cs.aspect || 'aspect-[16/10]'} overflow-hidden rounded-2xl border border-line/60 bg-black`}
      >
        {cs.image ? (
          <img
            src={cs.image}
            alt={cs.imageAlt || cs.title}
            width={cs.imageWidth}
            height={cs.imageHeight}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-2 px-4 text-center text-mist-dim/70">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="9" cy="10" r="2" />
                <path d="m4 18 5-5 4 4 3-3 4 4" />
              </svg>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em]">
                image coming soon
              </span>
            </div>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[10px] font-semibold text-mist-dim backdrop-blur">
          {cs.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 pb-5 pt-1">
        <h3 className="text-lg font-bold">{cs.title}</h3>
        <Field label="The problem">{cs.problem}</Field>
        <Field label="The solution">{cs.solution}</Field>
        <Field label="The outcome">{cs.outcome}</Field>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const topRowRef = useRef(null)
  const bottomRowRef = useRef(null)

  // Entrance for the section header + the top row of cards (rota + eBay).
  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const eyebrow = eyebrowRef.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      const topCards = topRowRef.current
        ? Array.from(topRowRef.current.children)
        : []
      if (!headline || !subhead) return []

      const split = new SplitText(headline, {
        type: 'words',
        wordsClass: 'case-word',
        aria: 'auto',
      })

      gsap.set(eyebrow, { opacity: 0 })
      gsap.set(headline, { opacity: 1 })
      gsap.set(split.words, { y: 20, opacity: 0 })
      gsap.set(subhead, { y: 15, opacity: 0 })
      if (topCards.length) gsap.set(topCards, { y: 30, opacity: 0 })

      tl.to(eyebrow, { opacity: 1, duration: 0.35, ease: 'power2.out' }, 0)
      tl.to(
        split.words,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
        },
        0.05,
      )
      tl.to(
        subhead,
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '>-0.2',
      )
      if (topCards.length) {
        tl.to(
          topCards,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
          },
          '>-0.1',
        )
      }

      return [() => split.revert()]
    },
  })

  // Separate trigger for the bottom row (VAT + Layers). Lives in its own
  // useLayoutEffect because it triggers on the row itself, not the section,
  // so the matching cascade plays when those cards actually scroll into view.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const row = bottomRowRef.current
    if (!row) return
    const cards = Array.from(row.children)
    if (!cards.length) return

    let ctx
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(() => {
      if (!bottomRowRef.current) return
      ctx = gsap.context(() => {
        gsap.set(cards, { y: 30, opacity: 0 })
        gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        }).to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.12,
          ease: 'power2.out',
        })
      }, row)
    })

    return () => ctx?.revert()
  }, [])

  // Split the four cards into two rows so each row gets its own animation
  // trigger — bottom row was previously animating before being visible.
  const topCards = caseStudies.slice(0, 2)
  const bottomCards = caseStudies.slice(2)

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative px-5 py-12 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <p
            ref={eyebrowRef}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
          >
            Case studies
          </p>
          <h2
            ref={headlineRef}
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-balance break-words sm:text-5xl"
          >
            Real projects, written up properly.
          </h2>
          <p
            ref={subheadRef}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim"
          >
            Four shipped projects spanning operations, finance, hospitality
            and consumer apps — the problem each one solved, what was built,
            and the result it delivered. Some details and figures are blurred
            where they belong to a client.
          </p>
        </div>

        <div ref={topRowRef} className="mt-6 grid gap-5 md:grid-cols-2">
          {topCards.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
        <div ref={bottomRowRef} className="mt-5 grid gap-5 md:grid-cols-2">
          {bottomCards.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  )
}
