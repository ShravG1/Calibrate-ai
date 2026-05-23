import Reveal from './Reveal.jsx'
import { ClockIcon, ShieldIcon, ScaleIcon } from '../icons.jsx'

const reasons = [
  {
    icon: ClockIcon,
    title: 'It saves you time',
    body: 'Anything you do the same way every day — chasing rotas, sending emails, copying numbers between spreadsheets — a computer can do in the background while you get on with real work.',
  },
  {
    icon: ShieldIcon,
    title: 'It makes fewer mistakes',
    body: 'People get tired, distracted, interrupted. A well-built system does the boring bits the same careful way every single time. No missed shifts, no typos in the payroll.',
  },
  {
    icon: ScaleIcon,
    title: 'It grows with you',
    body: 'Twice the customers shouldn’t mean twice the admin. Once a task is automated, it handles ten jobs or a thousand without you hiring extra hands to keep up.',
  },
]

export default function WhyAI() {
  return (
    <section id="why" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            Why bother with AI
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            You don’t need to understand the tech. You just need it to work.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            “AI” and “automation” sound complicated. They’re not, really. It
            just means handing the repetitive jobs to software so your time
            goes where it matters. Here’s the honest version.
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
