import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useAura } from '../hooks/useAura.js'

// Anchor that drifts gently toward the cursor while hovered, then springs
// back. With `aura={true}` it also renders the Phase 2E hover aura — a
// slowly-rotating conic gradient + a cursor-following radial spotlight.
export default function MagneticButton({
  children,
  className = '',
  strength = 0.32,
  aura = false,
  ...props
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useAura(ref, aura)

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={spring}
      className={aura ? `${className} aura-host` : className}
      {...props}
    >
      {aura ? (
        <>
          <span aria-hidden className="aura-conic" />
          <span aria-hidden className="aura-radial" />
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </motion.a>
  )
}
