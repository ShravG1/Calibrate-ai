import Reveal from './Reveal.jsx'
import { CheckIcon, ArrowIcon } from '../icons.jsx'

const included = [
  'A real project, properly built — not a demo or a trial',
  'We scope it together so it solves a problem you actually have',
  'Honest advice on what’s worth automating and what isn’t',
  'No invoice at the end, and no obligation to carry on',
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-electric/25 bg-ink-card/70 p-7 sm:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-violet/15 blur-[100px]" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-electric/30 bg-electric/10 px-3.5 py-1.5 text-xs font-semibold text-electric">
                Early phase — limited spots
              </span>

              <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Three projects.{' '}
                <span className="text-gradient">Completely free.</span> No
                catch.
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
                I’m early into doing this externally, and I’d rather build a
                portfolio of work I’m genuinely proud of than rush to charge.
                So right now I’m taking on three projects at no cost. You get
                the full thing built; I get a real result to show. After these
                three, everything moves to paid — but these ones are on me.
              </p>

              <div className="mt-9 grid gap-8 sm:grid-cols-[1.4fr_1fr] sm:items-center">
                <ul className="space-y-3.5">
                  {included.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-electric/15 text-electric">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-relaxed text-mist">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl border border-line bg-ink/60 p-6 text-center">
                  <p className="text-sm text-mist-dim">Your cost</p>
                  <p className="mt-1 text-5xl font-bold tracking-tight">
                    £0
                  </p>
                  <p className="mt-1 text-sm text-mist-dim">
                    for the first three
                  </p>
                  <a
                    href="#contact"
                    className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet px-5 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Claim a spot
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              <p className="mt-7 text-sm text-mist-dim">
                Genuinely no strings — if it’s useful and you want to keep
                working together afterwards, brilliant. If not, you keep what’s
                been built and we part as friends.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
