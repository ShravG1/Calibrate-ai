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
        // Enter: tight cascade as section approaches centre.
        // Each element uses an explicit fromTo so scrub is clean in both directions.
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(eyebrow, { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0)
          .fromTo(part1,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.05)
          .fromTo(part2,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.1)
          .fromTo(part3,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.15)
          .fromTo(body,    { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.2)
          .fromTo(cta,     { y: 24, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.25)

        // Exit: lift all elements away as section scrolls past viewport top.
        // Explicit fromTo so GSAP's internal state from enter doesn't bleed in.
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'top -50%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
          .fromTo(els, { y: 0, opacity: 1 }, { y: -60, opacity: 0, stagger: 0.02, ease: 'power1.in' }, 0)
      }, section)
    }

    // Defer until fonts + one rAF so Services' 548vh pin height is measured correctly
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
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          ref={eyebrowRef}
          className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
        >
          Portfolio building — flexible pricing
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
            Tell us what you need
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
