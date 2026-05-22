import { motion, useReducedMotion } from 'framer-motion'

// Ambient gradient mesh — slow, drifting colour blobs behind the hero.
const blobs = [
  {
    className: '-left-[12%] -top-[20%] h-[38rem] w-[38rem] bg-electric/20',
    animate: { x: [0, 70, -30, 0], y: [0, -50, 30, 0], scale: [1, 1.12, 1.04, 1] },
    duration: 28,
  },
  {
    className: '-right-[14%] top-[6%] h-[34rem] w-[34rem] bg-violet/20',
    animate: { x: [0, -60, 40, 0], y: [0, 50, -25, 0], scale: [1, 1.08, 1.15, 1] },
    duration: 34,
  },
  {
    className: 'left-[28%] -bottom-[24%] h-[32rem] w-[32rem] bg-sky-400/15',
    animate: { x: [0, 50, -50, 0], y: [0, -35, 25, 0], scale: [1, 1.1, 1, 1] },
    duration: 31,
  },
]

const mask =
  'radial-gradient(ellipse 70% 60% at 50% 35%, #000 40%, transparent 100%)'

export default function MeshBackground() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${b.className}`}
          animate={reduce ? undefined : b.animate}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="absolute inset-0 grain opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(120,140,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,200,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  )
}
