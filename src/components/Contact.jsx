import { useState } from 'react'
import Reveal from './Reveal.jsx'
import { contact } from '../data.jsx'
import { MailIcon, WhatsAppIcon, ArrowIcon, CheckIcon } from '../icons.jsx'

const fieldClass =
  'w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-mist placeholder:text-mist-dim/60 outline-none transition-colors focus:border-electric/50 focus:ring-2 focus:ring-electric/20'

export default function Contact() {
  const [form, setForm] = useState({ name: '', business: '', message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = `Free project enquiry — ${form.name || 'a friend'}`
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
        'Hi Shrav — I saw your site and I’d love to chat about a project.',
      )}`
    : null

  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-ink-card/70 p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-violet/15 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-electric/15 blur-[100px]" />

          <div className="relative grid gap-10 md:grid-cols-2">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
                  Let’s talk
                </p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Tell me what’s eating your time.
                </h2>
                <p className="mt-4 leading-relaxed text-mist-dim">
                  No pressure and no sales pitch. Send a quick message about
                  your business and what’s driving you mad, and I’ll come back
                  with honest thoughts on whether I can help.
                </p>

                <div className="mt-7 flex flex-col gap-3">
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
            </Reveal>

            <Reveal delay={0.1}>
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
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
                  <div>
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
                  <div>
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
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-electric to-violet px-6 py-3.5 text-base font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    Send it over
                    <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
