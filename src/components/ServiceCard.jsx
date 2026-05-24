import { useId, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { PlusIcon, CheckIcon } from '../icons.jsx'

export default function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const Icon = service.icon

  const cardRef = useRef(null)
  const reduce = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const spring = { stiffness: 150, damping: 18, mass: 0.5 }
  const sRotateX = useSpring(rotateX, spring)
  const sRotateY = useSpring(rotateY, spring)

  const handleTilt = (e) => {
    if (reduce || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rotateY.set(px * 7)
    rotateX.set(-py * 5)
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      style={{
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformPerspective: 1100,
      }}
      className={`group relative overflow-hidden rounded-3xl border bg-ink-card/60 transition-colors ${
        open ? 'border-electric/40' : 'border-line hover:border-electric/25'
      }`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-electric/10 blur-3xl transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-start gap-5 p-6 text-left sm:p-7"
      >
        <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-electric/20 to-violet/20 p-3 text-electric">
          <Icon className="h-7 w-7" />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-widest text-mist-dim/60">
              0{index + 1}
            </span>
            <h3 className="text-xl font-bold sm:text-2xl">{service.title}</h3>
          </span>
          <p className="mt-2 leading-relaxed text-mist-dim">
            {service.summary}
          </p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-electric">
            {open ? 'Show less' : 'What this looks like'}
          </span>
        </span>

        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-mist"
        >
          <PlusIcon className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 border-t border-line px-6 py-6 sm:px-7">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-electric/15 text-electric">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-relaxed text-mist-dim">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
