import Reveal from './Reveal.jsx'
import MagneticButton from './MagneticButton.jsx'
import { ArrowIcon } from '../icons.jsx'

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            Portfolio building — flexible pricing
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Real work. Honest pricing.{' '}
            <span className="text-gradient">No agency markup.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mist-dim sm:text-xl">
            Right now I’m in the business of building a portfolio I’m genuinely
            proud of. That means I’m taking on select projects at little to no
            cost — depending on what’s involved and how much it lets me show.
            There’s no fixed price and no hard rule. Some things will be
            completely free. Some will cost a little. Either way it won’t be
            what an agency would charge you — not even close. The best thing to
            do is just tell me what you need. I’ll be straight with you about
            what’s possible and what it would involve. No pitch, no pressure.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton
              href="#contact"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-violet px-7 py-4 text-base font-semibold text-ink glow-ring"
            >
              Tell us what you need
              <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
