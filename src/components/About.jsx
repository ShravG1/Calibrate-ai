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
                    src="/idlemode-logo.svg"
                    alt="Idlemode"
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
                Meet the founder
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Hi, I’m Shrav.
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-mist-dim">
                <p>
                  I’ve spent the last few years building AI and automation
                  inside my own company — rotas, customer messages, dashboards,
                  the lot. The kind of work that quietly gives you your evenings
                  back.
                </p>
                <p>
                  It worked well enough that I wanted to do it for other people
                  too. That’s what Idlemode is: the same hands-on help, offered
                  to small businesses that don’t have a tech team and don’t
                  want one.
                </p>
                <p>
                  No jargon, no big agency runaround. You talk to me, I build
                  the thing, and I explain it in plain English. That’s the whole
                  deal.
                </p>
              </div>
              <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur">
                <img
                  src="/idlemode-logo.svg"
                  alt=""
                  width="20"
                  height="20"
                  className="h-5 w-5 rounded-md"
                />
                Shrav · founder of Idlemode
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
