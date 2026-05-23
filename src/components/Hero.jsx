import { useRef } from 'react'
import { ArrowIcon } from '../icons.jsx'
import MagneticButton from './MagneticButton.jsx'
import { useHeroIntro } from '../hooks/useHeroIntro.js'

export default function Hero() {
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const ctasRef = useRef(null)
  const statsRef = useRef(null)

  useHeroIntro({ badgeRef, headlineRef, subheadRef, ctasRef, statsRef })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-20 sm:px-8"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Taking on three projects, completely free
        </div>

        <h1
          ref={headlineRef}
          className="mt-6 max-w-4xl text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[4rem]"
        >
          AI and automation for{' '}
          <span className="text-gradient">small businesses</span> that
          haven’t got time to waste.
        </h1>

        <p
          ref={subheadRef}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-dim sm:text-xl"
        >
          We take the repetitive, time-eating tasks off your plate — the rotas,
          the emails, the spreadsheets, the same questions answered ten times a
          day — and automate them. So you can get back to actually growing the
          business.
        </p>

        <div
          ref={ctasRef}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton
            href="#contact"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-violet px-7 py-4 text-base font-semibold text-ink glow-ring"
          >
            Get your free project
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-ink-soft/60 px-7 py-4 text-base font-semibold text-mist backdrop-blur transition-colors hover:border-electric/40"
          >
            See what I can build
          </a>
        </div>

        <div
          ref={statsRef}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-line pt-7"
        >
          {[
            ['Hours back', 'every single week'],
            ['Fewer mistakes', 'than doing it by hand'],
            ['Built for you', 'not off a shelf'],
          ].map(([big, small]) => (
            <div key={big}>
              <p className="text-sm font-bold text-mist sm:text-base">{big}</p>
              <p className="text-xs text-mist-dim sm:text-sm">{small}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
