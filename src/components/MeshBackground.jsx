import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'

// Global ambient backdrop. Three slow-drifting colour blobs over a faint
// grid. Promoted to a fixed, app-level layer so it persists across sections;
// scroll moves each blob a different amount for a parallax feel.
const blobs = [
  {
    className: '-left-[12%] -top-[10%] h-[42rem] w-[42rem] bg-electric/20',
    animate: { x: [0, 80, -40, 0], y: [0, -60, 30, 0], scale: [1, 1.12, 1.04, 1] },
    duration: 28,
    parallax: -180,
  },
  {
    className: '-right-[14%] top-[18%] h-[38rem] w-[38rem] bg-violet/25',
    animate: { x: [0, -70, 50, 0], y: [0, 60, -30, 0], scale: [1, 1.08, 1.15, 1] },
    duration: 34,
    parallax: -320,
  },
  {
    className: 'left-[28%] top-[60%] h-[34rem] w-[34rem] bg-sky-400/15',
    animate: { x: [0, 60, -60, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 1, 1] },
    duration: 31,
    parallax: -120,
  },
]

const mask =
  'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)'

export default function MeshBackground() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const smooth = useSpring(scrollY, { stiffness: 60, damping: 24, mass: 0.6 })

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <ParallaxBlob key={i} blob={b} reduce={reduce} smooth={smooth} />
      ))}

      <div className="absolute inset-0 grain opacity-50" />
      <motion.div
        style={{
          backgroundImage:
            'linear-gradient(rgba(120,140,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,200,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: mask,
          WebkitMaskImage: mask,
          y: useTransform(smooth, (v) => v * -0.05),
        }}
        className="absolute inset-0"
      />
    </div>
  )
}

function ParallaxBlob({ blob, reduce, smooth }) {
  const y = useTransform(smooth, [0, 3000], [0, blob.parallax])
  return (
    <motion.div
      style={{ y: reduce ? 0 : y }}
      className={`absolute rounded-full blur-[120px] ${blob.className}`}
      animate={reduce ? undefined : blob.animate}
      transition={{
        duration: blob.duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  )
}
