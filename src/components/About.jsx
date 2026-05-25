import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useEntranceTimeline } from '../hooks/useEntranceTimeline.js'

gsap.registerPlugin(SplitText)

export default function About() {
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const paragraphsRef = useRef(null)
  const chipRef = useRef(null)

  useEntranceTimeline({
    sectionRef,
    build: (tl) => {
      const portrait = portraitRef.current
      const eyebrow = eyebrowRef.current
      const headline = headlineRef.current
      const paragraphs = paragraphsRef.current
        ? Array.from(paragraphsRef.current.children)
        : []
      const chip = chipRef.current
      if (!headline) return []

      const split = new SplitText(headline, {
        type: 'words',
        wordsClass: 'about-word',
        aria: 'auto',
      })

      gsap.set([portrait, eyebrow, chip].filter(Boolean), { opacity: 0 })
      gsap.set(headline, { opacity: 1 })
      gsap.set(split.words, { y: 30, opacity: 0 })
      if (paragraphs.length) gsap.set(paragraphs, { y: 18, opacity: 0 })
      if (chip) gsap.set(chip, { scale: 0.9 })

      tl.to(portrait, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
      tl.to(
        eyebrow,
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.1,
      )
      tl.to(
        split.words,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
        },
        0.2,
      )
      if (paragraphs.length) {
        tl.to(
          paragraphs,
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: 'power2.out',
          },
          '>-0.1',
        )
      }
      if (chip) {
        tl.to(
          chip,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.4)',
          },
          '>-0.1',
        )
      }

      return [() => split.revert()]
    },
  })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div ref={portraitRef} className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-electric/25 to-violet/25 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-line bg-ink-card">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(160deg, rgba(56,189,248,0.16), rgba(129,140,248,0.16))',
                }}
              />
              <div className="absolute inset-0 grid place-items-center p-8">
                <img
                  src="/calibrate-icon.svg"
                  alt="Calibrate"
                  className="h-32 w-32 drop-shadow-[0_0_30px_rgba(0,255,204,0.35)]"
                />
              </div>
              <span className="absolute bottom-3 left-3 rounded-full border border-line bg-ink/80 px-2.5 py-1 text-[10px] font-medium text-mist-dim backdrop-blur">
                Shrav · founder
              </span>
            </div>
          </div>

          <div>
            <p
              ref={eyebrowRef}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-electric"
            >
              The person behind Calibrate
            </p>
            <h2
              ref={headlineRef}
              className="mt-3 text-3xl font-semibold tracking-tight text-balance break-words sm:text-5xl"
            >
              Hi, I’m Shrav.
            </h2>
            <div
              ref={paragraphsRef}
              className="mt-5 space-y-4 text-lg leading-relaxed text-mist-dim"
            >
              <p>
                For the past two years I’ve been building apps, automations
                and dashboards — some for the company I work in, some on the
                side for anyone with a problem worth solving. Shift systems,
                data tools, customer facing apps — if it can be built or
                automated, I’ve probably had a go at it.
              </p>
              <p>
                Calibrate is me taking that external. I’m not an agency, I’m
                not a consultant in a suit — I’m someone who genuinely enjoys
                figuring out how to make a business run better, and right now
                I’m looking for the right projects to build a portfolio
                around.
              </p>
              <p>
                That’s the opportunity here. You get something real built for
                your business at little to no cost. I get a result I can point
                to. It’s a good deal for both of us — and I’ll make sure it
                stays that way.
              </p>
            </div>
            <div
              ref={chipRef}
              className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-ink-soft/70 px-3.5 py-1.5 text-xs font-medium text-mist-dim backdrop-blur"
            >
              <img
                src="/calibrate-icon.svg"
                alt=""
                width="20"
                height="20"
                className="h-5 w-5 rounded-md"
              />
              Shrav · founder of Calibrate
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
