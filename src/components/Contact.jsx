import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { contact } from '../data.jsx'
import { MailIcon, WhatsAppIcon, ArrowIcon, CheckIcon } from '../icons.jsx'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'
import { useAura } from '../hooks/useAura.js'

// Lazy-loaded — see MagneticButton.jsx for rationale. Same module is
// shared across both call sites via Vite's chunk graph.
const AuraCanvas = lazy(() => import('./AuraCanvas.jsx'))

gsap.registerPlugin(ScrollTrigger, SplitText)

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvzakgl'

const SUBHEAD_TEXT =
  'No pressure and no sales pitch. Send a quick message about your business and what’s driving you mad — I’ll come back with honest thoughts on whether we can help.'

const fieldClass =
  'w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-mist placeholder:text-mist-dim/60 outline-none transition-colors focus:border-electric/50 focus:ring-2 focus:ring-electric/20'

export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [submitHovered, setSubmitHovered] = useState(false)
  const reduce = useReducedMotion()

  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subheadRef = useRef(null)
  const fieldsRef = useRef(null)
  const submitRef = useRef(null)
  const footerRef = useRef(null)

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          message: form.message,
          _subject: `Project enquiry — ${form.name || 'a friend'}`,
        }),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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

  // Hover aura on the submit button — WebGL shader plasma via AuraCanvas.
  // Hook tracks cursor position in normalised (0..1) coords and feeds it
  // into the shader's uMouse uniform. Gated on form still mounted and
  // reduced-motion.
  const auraEnabled = status !== 'sent' && !reduce
  const submitMouseRef = useAura(submitRef, auraEnabled)

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

      let srOnly = null

      const split = new SplitText(headline, {
        type: 'words,chars',
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
      // Blank the visible textContent for the scrub typewriter. aria-label on a
      // <p> is a prohibited ARIA attribute (paragraphs aren't nameable), so
      // instead hide the animated node from AT and expose the full copy via an
      // sr-only sibling. Both are reverted on cleanup / reduced-motion.
      subhead.setAttribute('aria-hidden', 'true')
      srOnly = document.createElement('span')
      srOnly.className = 'sr-only'
      srOnly.textContent = SUBHEAD_TEXT
      subhead.parentNode.insertBefore(srOnly, subhead.nextSibling)
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

      // Scroll-scrubbed typewriter: proxy.chars maps to scroll progress so
      // chars appear/disappear in lockstep with scroll, both directions.
      const proxy = { chars: 0 }
      gsap.to(proxy, {
        chars: SUBHEAD_TEXT.length,
        ease: 'none',
        onUpdate() {
          subhead.textContent = SUBHEAD_TEXT.slice(0, Math.floor(proxy.chars))
        },
        // Trigger range tuned so anchor-jump to #contact lands on a completed
        // typewriter. After the nav offset, the subhead element sits around
        // 45-50% from viewport top (because of card padding + eyebrow +
        // headline above it), so `end: 'top 50%'` ensures progress clamps to
        // 1 at anchor landing. The wider start ('top 90%') keeps the
        // animation visible during natural scroll as the text enters view.
        scrollTrigger: {
          trigger: subhead,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 0.4,
        },
      })

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
        () => {
          if (subhead) {
            subhead.textContent = SUBHEAD_TEXT
            subhead.removeAttribute('aria-hidden')
          }
          if (srOnly) srOnly.remove()
        },
      ]
    },
  })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative px-5 py-12 sm:px-8 sm:py-16"
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
                className="mt-3 text-3xl font-semibold tracking-tight text-balance break-words sm:text-4xl"
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
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm font-medium transition-colors hover:border-electric/40"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-electric" />
                    Message me on WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div>
              {status === 'sent' ? (
                <div className="grid h-full place-items-center rounded-2xl border border-electric/30 bg-ink/60 p-8 text-center">
                  <div>
                    <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-electric/15 text-electric">
                      <CheckIcon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold">
                      Your message is on its way.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                      Thanks for getting in touch. I’ll come back to you
                      within a couple of days. If anything’s urgent, drop
                      me a line at {contact.email}.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  ref={fieldsRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Honeypot — Formspree silently discards submissions where
                      _gotcha is filled. Bots auto-fill every input; humans
                      never see this one. */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px' }}
                  />
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
                  {status === 'error' && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                      Something went wrong sending that. Try again, or email
                      me directly at {contact.email}.
                    </div>
                  )}
                  <button
                    ref={submitRef}
                    type="submit"
                    disabled={status === 'sending'}
                    data-cursor-magnetic="true"
                    onMouseEnter={() => setSubmitHovered(true)}
                    onMouseLeave={() => setSubmitHovered(false)}
                    className="group aura-host inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet px-6 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {auraEnabled && (
                      <Suspense fallback={null}>
                        <AuraCanvas
                          active={submitHovered}
                          mouseRef={submitMouseRef}
                        />
                      </Suspense>
                    )}
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {status === 'sending' ? 'Sending…' : 'Send it over'}
                      <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
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
