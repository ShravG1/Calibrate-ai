import { useEffect, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

// Global ambient backdrop. Three slow-drifting colour blobs over a faint
// grid. Promoted to a fixed, app-level layer so it persists across sections.
// Each blob has its own parallax rate (foreground ~3x background), a unique
// scroll-linked scale + rotation target so they breathe independently, and
// optional opacity range so the dominant hue shifts teal → blue down the page.
const blobs = [
  {
    // Electric teal — top-left, mid layer. Fades as we scroll → blue takes over.
    className: '-left-[12%] -top-[10%] h-[42rem] w-[42rem] bg-electric/20',
    animate: { x: [0, 80, -40, 0] },
    duration: 28,
    parallax: -220,
    scaleTo: 1.18,
    rotateTo: 8,
    opacityRange: [1, 0.62],
  },
  {
    // Violet — top-right, foreground (fastest parallax).
    className: '-right-[14%] top-[18%] h-[38rem] w-[38rem] bg-violet/25',
    animate: { x: [0, -70, 50, 0] },
    duration: 34,
    parallax: -360,
    scaleTo: 1.22,
    rotateTo: -6,
    opacityRange: null,
  },
  {
    // Sky blue — bottom-centre, background (slowest parallax). Intensifies
    // toward the bottom — completes the teal → blue dominance shift.
    className: 'left-[28%] top-[60%] h-[34rem] w-[34rem] bg-sky-400/15',
    animate: { x: [0, 60, -60, 0] },
    duration: 31,
    parallax: -120,
    scaleTo: 1.12,
    rotateTo: 12,
    opacityRange: [0.6, 1],
  },
]

const mask =
  'radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 100%)'

function useDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return desktop
}

export default function MeshBackground() {
  const reduce = useReducedMotion()
  const desktop = useDesktop()
  // Rich motion (scale, rotation, hue shift) is desktop-only and gated on
  // reduced-motion. Parallax keeps running on mobile at half differential.
  const richMotion = !reduce && desktop

  const { scrollY, scrollYProgress } = useScroll()
  const smoothY = useSpring(scrollY, {
    stiffness: 60,
    damping: 24,
    mass: 0.6,
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.5,
  })
  const gridY = useTransform(smoothY, (v) => v * -0.05)

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Inner scale layer — Contact's ScrollTrigger writes --mesh-scale on
          the root, this layer reads it and zooms the mesh in as the user
          scrolls into Contact. Grain sits outside this layer so it stays
          pixel-pinned regardless of the Contact zoom. */}
      <div
        className="absolute inset-0"
        style={{
          transform: 'scale(var(--mesh-scale, 1))',
          transformOrigin: 'center',
          transition: 'transform 0s',
        }}
      >
        {blobs.map((b, i) => (
          <ParallaxBlob
            key={i}
            blob={b}
            reduce={reduce}
            richMotion={richMotion}
            parallaxScale={desktop ? 1 : 0.5}
            smoothY={smoothY}
            smoothProgress={smoothProgress}
          />
        ))}

        <motion.div
          style={{
            backgroundImage:
              'linear-gradient(rgba(120,140,200,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,140,200,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: mask,
            WebkitMaskImage: mask,
            y: reduce ? 0 : gridY,
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Static grain — film/print texture. Outside the scale layer so the
          Contact zoom doesn't blur it. No motion, no perf cost on reduced
          motion. */}
      <div
        className="absolute inset-0 grain"
        style={{ opacity: 0.75 }}
        aria-hidden
      />
    </div>
  )
}

function ParallaxBlob({
  blob,
  reduce,
  richMotion,
  parallaxScale,
  smoothY,
  smoothProgress,
}) {
  // All hooks called unconditionally so React's hook order stays stable
  // across reduced-motion / viewport switches.
  const y = useTransform(
    smoothY,
    [0, 3000],
    [0, blob.parallax * parallaxScale],
  )
  const scale = useTransform(smoothProgress, [0, 1], [1, blob.scaleTo])
  const rotate = useTransform(smoothProgress, [0, 1], [0, blob.rotateTo])
  const opacity = useTransform(
    smoothProgress,
    [0, 1],
    blob.opacityRange || [1, 1],
  )

  if (reduce) {
    return (
      <div className={`absolute rounded-full blur-[120px] ${blob.className}`} />
    )
  }

  return (
    <motion.div
      style={{
        y,
        scale: richMotion ? scale : 1,
        rotate: richMotion ? rotate : 0,
        opacity: richMotion && blob.opacityRange ? opacity : 1,
        willChange: 'transform',
      }}
      className={`absolute rounded-full blur-[120px] ${blob.className}`}
      animate={blob.animate}
      transition={{
        duration: blob.duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  )
}
