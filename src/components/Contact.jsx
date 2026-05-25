import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { contact } from '../data.jsx'
import { MailIcon, WhatsAppIcon, ArrowIcon, CheckIcon } from '../icons.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'

gsap.registerPlugin(ScrollTrigger, SplitText)

const SUBHEAD_TEXT =
  'No pressure and no sales pitch. Send a quick message about your business and what’s driving you mad — I’ll come back with honest thoughts on whether we can help.'

const fieldClass =
  'w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-mist placeholder:text-mist-dim/60 outline-none transition-colors focus:border-electric/50 focus:ring-2 focus:ring-electric/20'

export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', message: '' })
  const [sent, setSent] = useState(false)

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const fieldsRef = useRef(null)
  const submitRef = useRef(null)
  const footerRef = useRef(null)

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `Project enquiry — ${form.name || 'a friend'}`
    const body = [
      `Name: ${form.name}`,
      `Business: ${form.business}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const waHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
        'Hi — I saw your site and I’d love to chat about a project.',
      )}`
    : null

  // Mesh scrub — scale 1 → 1.15 as the user scrolls into Contact. Lives
  // outside the entrance timeline because it's a scrubbed effect, not a
  // one-shot. Skips on reduced motion.
  useScrollMeshScale(sectionRef)

  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const eyebrow = eyebrowRef.current
      const headline = headlineRef.current
      const subhead = subheadRef.current
      const fieldsContainer = fieldsRef.current
      const submit = submitRef.current
      const footer = footerRef.current

      if (!headline || !subhead) return []

      const split = new SplitText(headline, {
        type: 'chars',
        charsClass: 'contact-char',
        aria: 'auto',
      })
      const fields = fieldsContainer
        ? Array.from(fieldsContainer.querySelectorAll('[data-field]'))
        : []
      const allFormElements = submit ? [...fields, submit] : fields

      // Initial state.
      gsap.set(eyebrow, { opacity: 0, scale: 0.9 })
      gsap.set(headline, { opacity: 1 })
      gsap.set(split.chars, {
        y: 60,
        opacity: 0,
        scale: 0.7,
        filter: 'blur(8px)',
      })
      // Stash the subhead text so the typewriter can pull it out, then blank
      // the visible textContent. aria-label keeps screen readers happy.
      subhead.dataset.fullText = SUBHEAD_TEXT
      subhead.setAttribute('aria-label', SUBHEAD_TEXT)
      subhead.textContent = ''
      gsap.set(subhead, { opacity: 1 })
      if (allFormElements.length) {
        gsap.set(allFormElements, { y: 30, opacity: 0, scale: 0.96 })
      }
      if (footer) gsap.set(footer, { y: 15, opacity: 0 })

      tl.to(
        eyebrow,
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' },
        0,
      )
      // Cinematic char-by-char headline.
      tl.to(
        split.chars,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.025,
          ease: 'expo.out',
        },
        0.3,
      )

      // Typewriter subhead starting 0.4s after the headline begins.
      const intervals = []
      tl.call(
        () => {
          const text = subhead.dataset.fullText || ''
          if (!text) return
          let i = 0
          const id = setInterval(() => {
            i += 1
            subhead.textContent = text.slice(0, i)
            if (i >= text.length) clearInterval(id)
          }, 25)
          intervals.push(id)
        },
        null,
        0.7,
      )

      // Form cascade starting 0.3s after subhead begins (0.7 + 0.3 = 1.0).
      if (allFormElements.length) {
        tl.to(
          allFormElements,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
          },
          1.0,
        )
      }

      // Glow pulse on the submit button right as it lands.
      if (submit) {
        const submitLandsAt = 1.0 + fields.length * 0.12 + 0.6
        tl.fromTo(
          submit,
          { boxShadow: '0 0 0 0 rgba(0,255,204,0)' },
          {
            boxShadow: '0 0 50px 6px rgba(0,255,204,0.45)',
            duration: 0.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          submitLandsAt - 0.2,
        )
      }

      // Email + WhatsApp drift up after the form has landed.
      if (footer) {
        tl.to(
          footer,
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '>-0.2',
        )
      }

      return [
        () => split.revert(),
        () => intervals.forEach(clearInterval),
        () => {
          // Restore the subhead text in case it was wiped before the
          // typewriter finished (component unmount mid-animation).
          if (subhead && subhead.textContent !== SUBHEAD_TEXT) {
            subhead.textContent = SUBHEAD_TEXT
          }
        },
      ]
    },
  })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-card/70 p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-violet/15 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[100px]" />

          <div className="relative grid gap-10 md:grid-cols-2">
            <div>
              <p
                ref={eyebrowRef}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
              >
                Let’s talk
              </p>
              <h2
                ref={headlineRef}
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Tell me what’s eating your time.
              </h2>
              <p
                ref={subheadRef}
                className="mt-4 leading-relaxed text-mist-dim"
              >
                {SUBHEAD_TEXT}
              </p>

              <div ref={footerRef} className="mt-7 flex flex-col gap-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm font-medium transition-colors hover:border-electric/40"
                >
                  <MailIcon className="h-5 w-5 text-electric" />
                  {contact.email}
                </a>
                {waHref && (
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm font-medium transition-colors hover:border-electric/40"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-electric" />
                    Message me on WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div>
              {sent ? (
                <div className="grid h-full place-items-center rounded-2xl border border-electric/30 bg-ink/60 p-8 text-center">
                  <div>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-electric/15 text-electric">
                      <CheckIcon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold">
                      Your email’s ready to send
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                      I’ve opened your mail app with the details filled in.
                      Just hit send and I’ll be in touch soon. If nothing
                      opened, drop me a line at {contact.email}.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  ref={fieldsRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div data-field>
                    <label
                      htmlFor="c-name"
                      className="mb-1.5 block text-sm font-medium text-mist"
                    >
                      Your name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      className={fieldClass}
                      placeholder="Jordan Smith"
                    />
                  </div>
                  <div data-field>
                    <label
                      htmlFor="c-business"
                      className="mb-1.5 block text-sm font-medium text-mist"
                    >
                      Your business
                    </label>
                    <input
                      id="c-business"
                      type="text"
                      value={form.business}
                      onChange={update('business')}
                      className={fieldClass}
                      placeholder="The café on the corner"
                    />
                  </div>
                  <div data-field>
                    <label
                      htmlFor="c-message"
                      className="mb-1.5 block text-sm font-medium text-mist"
                    >
                      What’s taking up your time?
                    </label>
                    <textarea
                      id="c-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className={`${fieldClass} resize-none`}
                      placeholder="A line or two about the jobs you wish would just sort themselves out…"
                    />
                  </div>
                  <button
                    ref={submitRef}
                    type="submit"
                    data-cursor-magnetic="true"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet px-6 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Send it over
                    <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Scrubs --mesh-scale on <html> from 1 → 1.15 as the Contact section moves
// through the viewport. MeshBackground reads the var on its inner layer and
// scales accordingly. Cleared back to 1 on unmount.
function useScrollMeshScale(sectionRef) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const section = sectionRef.current
    if (!section) return

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const scale = 1 + self.progress * 0.15
        document.documentElement.style.setProperty(
          '--mesh-scale',
          scale.toFixed(4),
        )
      },
    })

    return () => {
      trigger.kill()
      document.documentElement.style.removeProperty('--mesh-scale')
    }
  }, [sectionRef])
}
