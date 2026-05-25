import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useAura } from '../hooks/useAura.js'
import AuraCanvas from './AuraCanvas.jsx'

// Anchor that drifts gently toward the cursor while hovered, then springs
// back. With `aura={true}` it also mounts an R3F shader plasma surface
// (AuraCanvas) over the button's gradient — see Phase 2E pivot.
export default function MagneticButton({
  children,
  className = '',
  strength = 0.32,
  aura = false,
  ...props
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 260, damping: 18, mass: 0.4 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  const mouseRef = useAura(ref, aura && !reduce)
  const auraActive = aura && !reduce

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  const onEnter = () => setHovered(true)
  const onLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={reduce ? undefined : { scale: 1.04 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={spring}
      className={aura ? `${className} aura-host` : className}
      {...props}
    >
      {auraActive && <AuraCanvas active={hovered} mouseRef={mouseRef} />}
      {aura ? (
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {children}
        </span>
      ) : (
        children
      )}
    </motion.a>
  )
}
