import { motion } from 'framer-motion'
import { ArrowIcon } from '../icons.jsx'
import MeshBackground from './MeshBackground.jsx'
import MagneticButton from './MagneticButton.jsx'

const ease = [0.22, 1, 0.36, 1]

function fade(delay) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  }
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      <MeshBackground />

      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          {...fade(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          Taking on three projects, completely free
        </motion.div>

        <motion.h1
          {...fade(0.08)}
          className="mt-6 max-w-4xl text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          AI and automation for{' '}
          <span className="text-gradient">small businesses</span> that
          haven’t got time to waste.
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-dim sm:text-xl"
        >
          I’m Shrav. I take the repetitive, time-eating tasks off your plate —
          the rotas, the emails, the spreadsheets, the same questions answered
          ten times a day — and automate them. So you can get back to actually
          growing the business.
        </motion.p>

        <motion.div
          {...fade(0.24)}
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
        </motion.div>

        <motion.div
          {...fade(0.34)}
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
        </motion.div>
      </div>
    </section>
  )
}
