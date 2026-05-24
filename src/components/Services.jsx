import Reveal from './Reveal.jsx'
import ServiceCard from './ServiceCard.jsx'
import { services } from '../data.jsx'

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)',
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-electric">
            What’s possible. Here’s how we help.
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Most businesses have more to automate than they realise.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            Every business is different and none of this is off the shelf. These
            are starting points — the real solution gets shaped around what you
            actually need.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={Math.min(i * 0.06, 0.2)}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
