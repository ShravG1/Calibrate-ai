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
            What I do
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Five ways I can take work off your hands.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-dim">
            Every business is different, so nothing here is one-size-fits-all.
            Tap any card to see the kind of thing that’s possible — then we’ll
            shape it around what you actually need.
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
