import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { services } from '../data.jsx'
import { useServicesPin } from '../hooks/useServicesPin.js'

export default function Services() {
  const reduce = useReducedMotion()
  const [pinned, setPinned] = useState(false)
  const [active, setActive] = useState(0)
  const pinRef = useRef(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setPinned(mq.matches && !reduce)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  useServicesPin({
    enabled: pinned,
    sectionRef: pinRef,
    count: services.length,
    onActiveChange: setActive,
  })

  return (
    <section id="services" className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            AI &amp; automation services — here’s how I help.
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Most businesses have more to automate than they realise.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            Every business is different and none of this is off the shelf. These
            are starting points — the real solution gets shaped around what you
            actually need.
          </p>
        </Reveal>
      </div>

      {pinned ? (
        <div ref={pinRef} className="relative mt-16 h-[360vh]">
          <div className="sticky top-0 grid h-screen place-items-center overflow-hidden px-5 sm:px-8">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
              <article
                key={s.id}
                data-card-index={i}
                className="col-start-1 row-start-1 mx-auto w-full max-w-4xl"
              >
                {Icon && (
                  <Icon
                    className="services-icon h-[72px] w-[72px] text-electric"
                    strokeWidth={1.4}
                  />
                )}
                <p className="services-eyebrow mt-6 text-xs font-bold uppercase tracking-[0.22em] text-electric/80 sm:text-sm">
                  {String(i + 1).padStart(2, '0')} OF {String(services.length).padStart(2, '0')} · {s.category.toUpperCase()}
                </p>
                <h3 className="services-title mt-4 text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                  {s.title}
                </h3>
                <p className="services-summary mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim sm:text-xl">
                  {s.summary}
                </p>
                <ul className="mt-7 max-w-2xl space-y-3">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="services-bullet flex gap-3 text-base leading-relaxed text-mist sm:text-lg"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_8px_rgba(0,255,204,0.55)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
              )
            })}

            <div
              aria-hidden
              className="pointer-events-none absolute right-5 top-1/2 col-start-1 row-start-1 flex -translate-y-1/2 flex-col items-center gap-3 lg:right-8"
            >
              {services.map((_, i) => (
                <span
                  key={i}
                  className={`block rounded-full transition-all duration-300 ease-out ${
                    i === active
                      ? 'h-3 w-3 bg-electric shadow-[0_0_12px_rgba(0,255,204,0.55)]'
                      : 'h-2 w-2 bg-mist-dim/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-4xl space-y-4 px-5 pb-24 sm:px-8 sm:pb-32">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={Math.min(i * 0.06, 0.18)}>
              <article className="rounded-3xl border border-line bg-ink-card/60 p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-electric/80">
                  {String(i + 1).padStart(2, '0')} · {s.category.toUpperCase()}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-mist-dim">{s.summary}</p>
                <ul className="mt-4 space-y-2.5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-mist-dim"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-electric" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}
