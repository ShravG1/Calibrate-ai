import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import MagneticButton from './MagneticButton.jsx'
import { ArrowIcon } from '../icons.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'

gsap.registerPlugin(SplitText)

export default function Pricing() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const part1Ref = useRef(null)
  const part2Ref = useRef(null)
  const part3Ref = useRef(null)
  const bodyRef = useRef(null)
  const ctaRef = useRef(null)

  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const eyebrow = eyebrowRef.current
      const part1 = part1Ref.current
      const part2 = part2Ref.current
      const part3 = part3Ref.current
      const body = bodyRef.current
      const cta = ctaRef.current
      if (!part1 || !part2 || !part3) return []

      const split1 = new SplitText(part1, { type: 'words', wordsClass: 'pricing-word', aria: 'auto' })
      const split2 = new SplitText(part2, { type: 'words', wordsClass: 'pricing-word', aria: 'auto' })
      const split3 = new SplitText(part3, { type: 'words', wordsClass: 'pricing-word', aria: 'auto' })

      const allWords = [...split1.words, ...split2.words, ...split3.words]
      gsap.set([eyebrow, body, cta], { opacity: 0 })
      gsap.set([part1, part2, part3], { opacity: 1 })
      gsap.set(allWords, { y: 40, opacity: 0, scale: 0.95 })
      gsap.set(body, { y: 20 })
      gsap.set(cta, { y: 0, scale: 0.95 })

      tl.to(eyebrow, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0)

      const batch = { duration: 0.7, ease: 'expo.out', stagger: 0.05 }
      tl.to(
        split1.words,
        { y: 0, opacity: 1, scale: 1, ...batch },
        0.2,
      )
      // 0.25s gap, then batch 2.
      tl.to(
        split2.words,
        { y: 0, opacity: 1, scale: 1, ...batch },
        '>0.25',
      )
      // 0.25s gap, then batch 3 (the gradient line).
      tl.to(
        split3.words,
        { y: 0, opacity: 1, scale: 1, ...batch },
        '>0.25',
      )
      // Body fades up once the verdict completes.
      tl.to(
        body,
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '>0.1',
      )
      // CTA enters 0.2s after body starts — they land near-together.
      tl.to(
        cta,
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)' },
        '<0.2',
      )

      return [
        () => split1.revert(),
        () => split2.revert(),
        () => split3.revert(),
      ]
    },
  })

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
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
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
          Right now I’m in the business of building a portfolio I’m genuinely
          proud of. That means I’m taking on select projects at little to no
          cost — depending on what’s involved and how much it lets me show.
          There’s no fixed price and no hard rule. Some things will be
          completely free. Some will cost a little. Either way it won’t be
          what an agency would charge you — not even close. The best thing to
          do is just tell me what you need. I’ll be straight with you about
          what’s possible and what it would involve. No pitch, no pressure.
        </p>
        <div ref={ctaRef} className="mt-10 flex justify-center">
          <MagneticButton
            href="#contact"
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
