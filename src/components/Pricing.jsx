import { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton.jsx'
import { ArrowIcon } from '../icons.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const part1Ref = useRef(null)
  const part2Ref = useRef(null)
  const part3Ref = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const section = sectionRef.current
    const eyebrow = eyebrowRef.current
    const part1 = part1Ref.current
    const part2 = part2Ref.current
    const part3 = part3Ref.current
    const body = bodyRef.current
    const cta = ctaRef.current
    if (!section || !eyebrow || !part1 || !part2 || !part3 || !body || !cta) return

    const els = [eyebrow, part1, part2, part3, body, cta]

    // Pre-hide before layout settles so there's no flash
    gsap.set(els, { y: 24, opacity: 0 })

    let cancelled = false
    let ctx

    const run = () => {
      if (cancelled || !sectionRef.current) return

      ctx = gsap.context(() => {
        // Play-once entrance — triggered when the section enters at top 80%,
        // then runs to completion. Previously this was a scrubbed timeline
        // tied to the top 60% → top 40% scroll window, which left the
        // headline ("Real work. Honest pricing. No agency markup.") visibly
        // mid-cascade at any partial scroll position.
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
          },
        })
          .to(eyebrow, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }, 0)
          .to(part1,   { y: 0, opacity: 1, duration: 0.5,  ease: 'power2.out' }, 0.08)
          .to(part2,   { y: 0, opacity: 1, duration: 0.5,  ease: 'power2.out' }, 0.16)
          .to(part3,   { y: 0, opacity: 1, duration: 0.5,  ease: 'power2.out' }, 0.24)
          .to(body,    { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.32)
          .to(cta,     { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.4)
      }, section)
    }

    // Defer until fonts settle so the pin distance is measured correctly
    const fontsReady = document.fonts?.ready ?? Promise.resolve()
    fontsReady.then(run)

    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
        >
          Discovery is free — builds are quoted up front
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance break-words sm:text-5xl">
          <span ref={part1Ref} className="inline-block">Real work.</span>{' '}
          <span ref={part2Ref} className="inline-block">Honest pricing.</span>{' '}
          <span ref={part3Ref} className="inline-block text-gradient">
            No agency markup.
          </span>
        </h2>
        <p
          ref={bodyRef}
          className="mt-6 text-lg leading-relaxed text-mist-dim sm:text-xl"
        >
          Right now I'm in the business of building a portfolio I'm genuinely
          proud of. That means I'm taking on select projects at little to no
          cost — depending on what's involved and how much it lets me show.
          There's no fixed price and no hard rule. Some things will be
          completely free. Some will cost a little. Either way it won't be
          what an agency would charge you — not even close. The best thing to
          do is just tell me what you need. I'll be straight with you about
          what's possible and what it would involve. No pitch, no pressure.
        </p>
        <div ref={ctaRef} className="mt-10 flex justify-center">
          <MagneticButton
            href="#contact"
            aura
            data-cursor-magnetic="true"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-violet px-7 py-4 text-base font-semibold text-ink glow-ring"
          >
            Let’s talk
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
