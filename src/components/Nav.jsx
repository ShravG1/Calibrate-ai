import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Case Studies' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
]

// Inline lockup so the embedded Plus Jakarta Sans text renders.
function CalibrateLockup({ className = '' }) {
  return (
    <svg
      viewBox="0 0 580 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Calibrate"
      className={className}
    >
      <defs>
        <linearGradient id="nav-wg" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0" />
          <stop offset="20%" stopColor="#00ffcc" />
          <stop offset="50%" stopColor="#00aaff" />
          <stop offset="80%" stopColor="#0055ff" />
          <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nav-eg" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0" />
          <stop offset="20%" stopColor="#00ffcc" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#00aaff" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#0055ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nav-rg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ccff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00ccff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="nav-dga" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ffcc" />
          <stop offset="100%" stopColor="#00ffcc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nav-dgb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0055ff" />
          <stop offset="100%" stopColor="#0055ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nav-bgr" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b1830" />
          <stop offset="100%" stopColor="#060c18" />
        </radialGradient>
        <linearGradient id="nav-ul" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0" />
          <stop offset="15%" stopColor="#00ffcc" />
          <stop offset="75%" stopColor="#0044ff" />
          <stop offset="100%" stopColor="#0044ff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="nav-cc">
          <circle cx="60" cy="60" r="50" />
        </clipPath>
        <filter id="nav-gw">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nav-gs">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="nav-ul-glow" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="60" cy="60" r="58" fill="url(#nav-bgr)" />
      <circle cx="60" cy="60" r="56" fill="none" stroke="#0d1e38" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="url(#nav-rg)" strokeWidth="0.8" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#0a1828" strokeWidth="0.7" clipPath="url(#nav-cc)" />

      <path
        d="M 10 60 C 26 88, 44 88, 60 60 C 76 32, 94 32, 110 60"
        fill="none"
        stroke="url(#nav-eg)"
        strokeWidth="10"
        strokeLinecap="round"
        clipPath="url(#nav-cc)"
        transform="translate(0 13)"
      />
      <path
        d="M 10 60 C 26 88, 44 88, 60 60 C 76 32, 94 32, 110 60"
        fill="none"
        stroke="url(#nav-eg)"
        strokeWidth="10"
        strokeLinecap="round"
        clipPath="url(#nav-cc)"
        transform="translate(0 -13)"
      />

      <path
        d="M 10 60 C 26 88, 44 88, 60 60 C 76 32, 94 32, 110 60"
        fill="none"
        stroke="url(#nav-wg)"
        strokeWidth="4"
        strokeLinecap="round"
        clipPath="url(#nav-cc)"
        filter="url(#nav-gw)"
      />

      <circle cx="12" cy="60" r="8" fill="url(#nav-dga)" opacity="0.4" />
      <circle cx="12" cy="60" r="4" fill="#00ffcc" filter="url(#nav-gs)" />
      <circle cx="12" cy="60" r="1.8" fill="#fff" />
      <circle cx="108" cy="60" r="8" fill="url(#nav-dgb)" opacity="0.4" />
      <circle cx="108" cy="60" r="4" fill="#0055ff" filter="url(#nav-gs)" />
      <circle cx="108" cy="60" r="1.8" fill="#fff" />

      <text
        x="140"
        y="72"
        fontFamily="'Plus Jakarta Sans', 'DM Sans', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="56"
        fill="#ffffff"
        letterSpacing="-1"
      >
        Calibrate
      </text>

      <rect
        x="140"
        y="86"
        width="400"
        height="3"
        rx="1.5"
        fill="url(#nav-ul)"
        filter="url(#nav-ul-glow)"
      />
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? 'bg-ink/80 backdrop-blur-xl border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" aria-label="Calibrate" className="flex items-center">
            <CalibrateLockup className="block h-9 w-auto sm:h-10" />
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-mist-dim transition-colors hover:text-mist"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              data-cursor-magnetic="true"
              className="inline-flex items-center rounded-xl bg-mist px-3 py-2 text-xs font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Let’s talk
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="primary-nav-mobile"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-mist md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="primary-nav-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-mist-dim transition-colors hover:bg-ink-card hover:text-mist"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl bg-mist px-3 py-3 text-center text-base font-semibold text-ink"
                >
                  Let’s talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
