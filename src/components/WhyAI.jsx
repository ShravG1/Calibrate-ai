import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Reveal from './Reveal.jsx'
import { ClockIcon, ShieldIcon, ScaleIcon } from '../icons.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'

gsap.registerPlugin(SplitText)

const reasons = [
  {
    icon: ClockIcon,
    title: 'More time on what matters',
    body: 'Most business owners spend more time managing than building. Automation flips that — the repeat jobs get handled, and your focus goes where it actually counts.',
  },
  {
    icon: ShieldIcon,
    title: 'A business that runs itself',
    body: "The best systems don't need you watching over them. They run in the background, handle the jobs, and only come to you when something actually needs a human.",
  },
  {
    icon: ScaleIcon,
    title: 'Scale without the stress',
    body: "Twice the customers shouldn't mean twice the workload. The right systems grow with you quietly in the background — no extra overhead, no extra stress.",
  },
]

export default function WhyAI() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)

  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const eyebrow = eyebrowRef.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      if (!headline || !subhead) return []

      const split = new SplitText(headline, {
        type: 'words',
        wordsClass: 'why-word',
        aria: 'auto',
      })

      gsap.set(eyebrow, { opacity: 0 })
      gsap.set(headline, { opacity: 1 })
      gsap.set(split.words, { y: 30, opacity: 0 })
      gsap.set(subhead, { y: 20, opacity: 0 })

      tl.to(eyebrow, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)
      tl.to(
        split.words,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        },
        0.1,
      )
      tl.to(
        subhead,
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '>-0.2',
      )

      return [() => split.revert()]
    },
  })

  return (
    <section
      ref={sectionRef}
      id="why"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div>
          <p
            ref={eyebrowRef}
            className="max-w-2xl text-sm font-semibold leading-relaxed text-electric sm:text-base"
          >
            Getting in early is still an option. A year from now, it won’t feel
            like one.
          </p>
          <h2
            ref={headlineRef}
            className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            No tech knowledge needed. Just a business worth growing.
          </h2>
          <p
            ref={subheadRef}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim"
          >
            AI and automation sound like they’re for big companies with IT
            departments. They’re not. Here’s what it actually means for a small
            business like yours.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-line bg-ink-card/60 p-7 transition-colors hover:border-electric/30">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-electric/10 text-electric">
                  <r.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold">{r.title}</h3>
                <p className="mt-2.5 leading-relaxed text-mist-dim">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
