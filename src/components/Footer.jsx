import { contact } from '../data.jsx'

const links = [
  { href: '#why', label: 'Why AI' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Case Studies' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="#top" className="flex items-center gap-2.5 font-extrabold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-electric to-violet text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 4h4.4C16.6 4 19 6.3 19 9.8c0 2.6-1.4 4.6-3.7 5.5L20 21h-4.9l-3.2-4.4H11V12h.7c1.7 0 2.7-.8 2.7-2.2S13.4 7.6 11.7 7.6H11V21H8z" />
              </svg>
            </span>
            Shrav
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-dim">
            AI and automation for small businesses — built by a real person you
            can actually get hold of.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
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
        <p>© {new Date().getFullYear()} Shrav. All rights reserved.</p>
        <a href={`mailto:${contact.email}`} className="hover:text-mist">
          {contact.email}
        </a>
      </div>
    </footer>
  )
}
