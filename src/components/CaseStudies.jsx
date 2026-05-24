import Reveal from './Reveal.jsx'
import { caseStudies } from '../data.jsx'

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

export default function CaseStudies() {
  return (
    <section id="work" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            Case studies
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Real projects, written up properly.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            The first finished projects will land here — each one written up
            with the problem it solved, what was built, and the result it
            delivered. No vague promises, just the actual outcomes.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.id} delay={i * 0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-card/60">
                <div className="relative m-3 grid aspect-[16/10] place-items-center rounded-2xl border-2 border-dashed border-line/80 bg-ink-soft/40">
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
                  <span className="absolute left-3 top-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[10px] font-semibold text-mist-dim backdrop-blur">
                    {cs.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-2">
                  <h3 className="text-lg font-bold">{cs.title}</h3>
                  <Field label="The problem">{cs.problem}</Field>
                  <Field label="The solution">{cs.solution}</Field>
                  <Field label="The outcome">{cs.outcome}</Field>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
