import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { ease, inView, spring } from '@/lib/motion'

/**
 * Statement text whose words brighten as the reader scrolls through it.
 * Scroll-linked, so the pace is the reader's — used once, for the core "what we do" answer.
 */
export function ScrollHighlight({ text, className, emphasis = [] }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const hot = emphasis.some((e) => w.toLowerCase().startsWith(e))
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} reduce={reduce} hot={hot}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ progress, range, reduce, hot, children }) {
  const opacity = useTransform(progress, range, [1, 1])
  return (
    <motion.span style={reduce ? undefined : { opacity }} className={cn(hot && 'text-fed')}>
      {children}{' '}
    </motion.span>
  )
}

/** Vertical timeline whose rail fills as it scrolls; nodes light up as they pass the rail head. */
export function ScrollTimeline({ items, dark = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, spring.soft)

  return (
    <ol ref={ref} className="relative ml-3 space-y-12 border-l-0 pl-10 lg:ml-0 lg:space-y-16">
      <span aria-hidden="true" className={cn('absolute top-2 bottom-2 left-0 w-px', dark ? 'bg-white/12' : 'bg-steel/20')} />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-fed-light via-fed-light to-gold"
        style={{ scaleY: fill }}
      />
      {items.map((it, i) => (
        <motion.li
          key={i}
          className="relative"
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span
            aria-hidden="true"
            className={cn(
              'absolute top-1.5 -left-[2.84rem] flex size-4 items-center justify-center rounded-full border-2',
              dark ? 'border-fed-light bg-ink' : 'border-fed bg-white'
            )}
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 20, delay: 0.1 } } }}
          >
            <span className={cn('size-1.5 rounded-full', it.highlight ? 'bg-gold' : dark ? 'bg-fed-light' : 'bg-fed')} />
          </motion.span>
          <motion.p
            className={cn('t-eyebrow tnum', it.highlight ? 'text-gold' : dark ? 'text-fed-light' : 'text-fed')}
            variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } } }}
          >
            {it.date}
          </motion.p>
          <motion.h3
            className={cn('t-h3 mt-2', dark ? 'text-white' : 'text-ink')}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out, delay: 0.08 } } }}
          >
            {it.title}
          </motion.h3>
          <motion.p
            className={cn('mt-2 max-w-xl', dark ? 'text-white/70' : 'text-ink/70')}
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay: 0.18 } } }}
          >
            {it.body}
          </motion.p>
        </motion.li>
      ))}
    </ol>
  )
}
