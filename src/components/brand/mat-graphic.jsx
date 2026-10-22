import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'

// The UWW competition mat, to scale (§1.6): a 12 m square = 9 m circle + 1.5 m protection
// border; the outer 1 m of the circle is the passivity zone. 1 unit = 10 cm.
// The real passivity band is orange; per brand rules (§5.3) it is rendered in green here.

const draw = (delay, duration = 1.6) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: ease.expo, delay }, opacity: { duration: 0.2, delay } } },
})

export function MatGraphic({ className, delay = 0, tone = 'dark', scrollLinked = true }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useSpring(useTransform(scrollY, [0, 1200], [0, 40]), spring.soft)
  const line = tone === 'dark' ? 'rgb(255 255 255 / 0.22)' : 'rgb(10 92 67 / 0.28)'
  const strong = tone === 'dark' ? '#3fbf8a' : '#0a5c43'

  return (
    <motion.svg
      viewBox="-2 -2 124 124"
      className={cn('overflow-visible', className)}
      initial="hidden"
      animate="show"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mat-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={strong} stopOpacity="0.28" />
          <stop offset="70%" stopColor={strong} stopOpacity="0.04" />
          <stop offset="100%" stopColor={strong} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Frame 1: protection area */}
      <motion.rect x="0" y="0" width="120" height="120" rx="2" fill="none" stroke={line} strokeOpacity="0.6" strokeWidth="0.3" strokeDasharray="1 1.5" variants={draw(delay, 1.8)} />

      <motion.g style={scrollLinked && !reduce ? { rotate, originX: '60px', originY: '60px' } : undefined}>
        {/* Frame 2: glow + passivity band */}
        <motion.circle
          cx="60" cy="60" r="45" fill="url(#mat-glow)"
          variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: ease.expo, delay: delay + 0.2 } } }}
          style={{ originX: '60px', originY: '60px' }}
        />
        <motion.circle cx="60" cy="60" r="40" fill="none" stroke={strong} strokeOpacity="0.16" strokeWidth="10" variants={draw(delay + 0.35, 1.8)} />
        {/* Frame 3: contest area outlines */}
        <motion.circle cx="60" cy="60" r="45" fill="none" stroke={strong} strokeWidth="0.5" variants={draw(delay + 0.5)} />
        <motion.circle cx="60" cy="60" r="35" fill="none" stroke={line} strokeWidth="0.35" variants={draw(delay + 0.65)} />
        {/* measurement ticks every 10° on the outer edge */}
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i * Math.PI) / 18
          const r1 = 46.5
          const r2 = i % 9 === 0 ? 50 : 48
          return (
            <motion.line
              key={i}
              x1={60 + r1 * Math.cos(a)} y1={60 + r1 * Math.sin(a)}
              x2={60 + r2 * Math.cos(a)} y2={60 + r2 * Math.sin(a)}
              stroke={i % 9 === 0 ? strong : line} strokeWidth="0.35"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: delay + 0.9 + i * 0.015 } } }}
            />
          )
        })}
      </motion.g>

      {/* Frame 4: centre circle + starting marks (corners) */}
      <motion.circle cx="60" cy="60" r="5" fill="none" stroke={strong} strokeWidth="0.6" variants={draw(delay + 0.9, 1)} />
      <motion.g variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: delay + 1.3, duration: 0.6 } } }}>
        <line x1="55" y1="60" x2="52" y2="60" stroke={strong} strokeWidth="0.6" />
        <line x1="65" y1="60" x2="68" y2="60" stroke={strong} strokeWidth="0.6" />
      </motion.g>
    </motion.svg>
  )
}
