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
          <a href="#top" className="flex items-center gap-2.5">
            <img
              src="/idlemode-logo.svg"
              alt="Idlemode"
              width="32"
              height="32"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-display text-base font-medium tracking-[0.04em]">
              <span className="text-mist">IDLE</span>
              <span className="text-electric">MODE</span>
            </span>
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
        <p>© {new Date().getFullYear()} Idlemode. All rights reserved.</p>
        <a href={`mailto:${contact.email}`} className="hover:text-mist">
          {contact.email}
        </a>
      </div>
    </footer>
  )
}
