import { useRef } from 'react'
import { ArrowIcon } from '../icons.jsx'
import MagneticButton from './MagneticButton.jsx'
import { useHeroIntro } from '../hooks/useHeroIntro.js'
import { useHeroExit } from '../hooks/useHeroExit.js'

export default function Hero() {
  const sectionRef = useRef(null)
  const badgeRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const ctasRef = useRef(null)

  useHeroIntro({ badgeRef, headlineRef, subheadRef, ctasRef })
  useHeroExit({ badgeRef, headlineRef, subheadRef, ctasRef, sectionRef })

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center px-5 pt-28 pb-20 sm:px-8"
    >
      {/* Radial darkening behind the text — cushions the brightened shader
          so the headline and subhead stay legible. Edges stay transparent
          so the plasma still reads at the corners of the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-5xl">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Portfolio building — flexible pricing
        </div>

        <h1
          ref={headlineRef}
          className="mt-6 max-w-4xl text-[2.75rem] font-bold leading-[1.02] tracking-tight text-balance break-words sm:text-[3.75rem] lg:text-[5rem]"
        >
          Less admin. <span className="text-gradient">More momentum.</span>
        </h1>

        <p
          ref={subheadRef}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-dim sm:text-xl"
        >
          Calibrate is an AI &amp; automation consultancy for UK small
          businesses. I take the admin, the repetition and the noise off your
          plate — so your time goes where it actually matters.
        </p>

        <div
          ref={ctasRef}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <MagneticButton
            href="#contact"
            aura
            data-cursor-magnetic="true"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-electric to-violet px-7 py-4 text-base font-semibold text-ink glow-ring"
          >
            Let’s talk
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </MagneticButton>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line bg-ink-soft/60 px-7 py-4 text-base font-semibold text-mist backdrop-blur transition-colors hover:border-electric/40"
          >
            See the services
          </a>
        </div>
      </div>
    </section>
  )
}
