import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'motion/react'

// Lenis handles page-level smooth scrolling; Motion handles element-level animation.
// Skipped entirely for users who prefer reduced motion.
export function SmoothScroll({ children }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return children

  return (
    <ReactLenis root options={{ lerp: 0.1, anticipate: true }}>
      {children}
    </ReactLenis>
  )
}
