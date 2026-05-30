import { contact } from '../data.jsx'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Case Studies' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

function CalibrateWordmark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Calibrate"
      className={className}
    >
      <defs>
        <linearGradient id="footer-underline" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00ffcc" stopOpacity="0" />
          <stop offset="15%" stopColor="#00ffcc" />
          <stop offset="75%" stopColor="#0044ff" />
          <stop offset="100%" stopColor="#0044ff" stopOpacity="0" />
        </linearGradient>
        <filter id="footer-lineGlow" x="-10%" y="-200%" width="120%" height="500%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <text
        x="0"
        y="72"
        fontFamily="'Plus Jakarta Sans', 'DM Sans', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="68"
        fill="#ffffff"
        letterSpacing="-1"
      >
        Calibrate
      </text>
      <rect
        x="0"
        y="88"
        width="480"
        height="3"
        rx="1.5"
        fill="url(#footer-underline)"
        filter="url(#footer-lineGlow)"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <a href="#top" aria-label="Calibrate" className="block">
            <CalibrateWordmark className="block h-9 w-auto" />
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-dim">
            AI and automation for small businesses — built by a real person you
            can actually get hold of.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist-dim transition-colors hover:text-mist"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-line pt-6 text-xs text-mist-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2025 Calibrate. All rights reserved.</p>
        <a href={`mailto:${contact.email}`} className="hover:text-mist">
          {contact.email}
        </a>
      </div>
    </footer>
  )
}
