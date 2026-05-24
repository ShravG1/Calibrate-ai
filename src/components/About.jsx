import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <Reveal>
            <div className="relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-electric/25 to-violet/25 blur-2xl" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-line bg-ink-card">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(160deg, rgba(56,189,248,0.16), rgba(129,140,248,0.16))',
                  }}
                />
                <div className="absolute inset-0 grid place-items-center p-8">
                  <img
                    src="/calibrate-icon.svg"
                    alt="Calibrate"
                    className="h-32 w-32 drop-shadow-[0_0_30px_rgba(0,255,204,0.35)]"
                  />
                </div>
                <span className="absolute bottom-3 left-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[10px] font-medium text-mist-dim backdrop-blur">
                  Shrav · founder
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
                The person behind Calibrate
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Hi, I’m Shrav.
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-mist-dim">
                <p>
                  For the past two years I’ve been building apps, automations
                  and dashboards — some for the company I work in, some on the
                  side for anyone with a problem worth solving. Shift systems,
                  data tools, customer facing apps — if it can be built or
                  automated, I’ve probably had a go at it.
                </p>
                <p>
                  Calibrate is me taking that external. I’m not an agency, I’m
                  not a consultant in a suit — I’m someone who genuinely enjoys
                  figuring out how to make a business run better, and right now
                  I’m looking for the right projects to build a portfolio
                  around.
                </p>
                <p>
                  That’s the opportunity here. You get something real built for
                  your business at little to no cost. I get a result I can point
                  to. It’s a good deal for both of us — and I’ll make sure it
                  stays that way.
                </p>
              </div>
              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur">
                <img
                  src="/calibrate-icon.svg"
                  alt=""
                  width="20"
                  height="20"
                  className="h-5 w-5 rounded-md"
                />
                Shrav · founder of Calibrate
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
