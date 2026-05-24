import Reveal from './Reveal.jsx'
import { ClockIcon, ShieldIcon, ScaleIcon } from '../icons.jsx'

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
  return (
    <section id="why" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="max-w-2xl text-sm font-semibold leading-relaxed text-electric sm:text-base">
            Getting in early is still an option. A year from now, it won’t feel
            like one.
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            No tech knowledge needed. Just a business worth growing.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            AI and automation sound like they’re for big companies with IT
            departments. They’re not. Here’s what it actually means for a small
            business like yours.
          </p>
        </Reveal>

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
