import { Fragment, useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { ease, inView, reveal, sequence, spring } from '@/lib/motion'

/**
 * Masked word-by-word heading reveal. Words stay real text (joined by real spaces), so crawlers and
 * screen readers read the heading once, as written.
 * `animateOnMount` is for above-the-fold heroes that are choreographed by a parent timeline.
 */
export function TextReveal({ text, as = 'h2', className, delay = 0, stagger = 0.045, animateOnMount = false }) {
  const Tag = motion[as]
  const words = text.split(' ')
  const trigger = animateOnMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: inView }

  return (
    <Tag className={className} {...trigger} variants={sequence(stagger, delay)}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '105%', rotate: 2 },
                show: { y: '0%', rotate: 0, transition: { duration: 0.85, ease: ease.expo } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  )
}

/** Scroll-triggered reveal with a named style from the motion vocabulary. */
export function Reveal({ as = 'div', type = 'text', delay = 0, className, children, ...rest }) {
  const Tag = motion[as]
  const v = reveal[type]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={{ hidden: v.hidden, show: { ...v.show, transition: { ...v.show.transition, delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that sequences children. Children use <Stagger.Item type="card" />. */
export function Stagger({ as = 'div', stagger = 0.08, delay = 0, className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={sequence(stagger, delay)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

Stagger.Item = function StaggerItem({ as = 'div', type = 'card', className, children, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag className={className} variants={reveal[type]} {...rest}>
      {children}
    </Tag>
  )
}

/** Clip-path wipe for images and feature panels. */
export function MaskReveal({ from = 'bottom', className, children, delay = 0 }) {
  const hidden = {
    bottom: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    center: 'inset(18% 18% 18% 18% round 24px)',
  }[from]
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
      viewport={inView}
      transition={{ duration: 1.1, ease: ease.expo, delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 1.4, ease: ease.expo, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Number that counts up once it enters the viewport. */
export function CountUp({ to, duration = 1.6, className, format }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const value = useMotionValue(format === 'year' ? Math.max(0, to - 40) : 0)
  const display = useTransform(value, (v) => Math.round(v).toLocaleString('en-US', { useGrouping: format !== 'year' }))

  useEffect(() => {
    if (!seen) return
    if (reduce) {
      value.set(to)
      return
    }
    const controls = animate(value, to, { duration, ease: ease.out })
    return () => controls.stop()
  }, [seen, reduce, to, duration, value])

  return (
    <span ref={ref} className={cn('tnum', className)}>
      {/* crawlers and screen readers get the final value; the animated digits are visual only */}
      <span className="sr-only">{to}</span>
      <motion.span aria-hidden="true">{display}</motion.span>
    </span>
  )
}

/** Scroll-linked vertical drift. Use sparingly on decorative layers. */
export function Parallax({ offset = 60, className, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [offset, -offset]), spring.soft)
  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  )
}

/** Thin progress bar pinned under the header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  )
}
