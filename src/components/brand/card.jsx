import { Link } from 'react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { reveal, spring } from '@/lib/motion'

const MotionLink = motion.create(Link)

/**
 * Surface card with spring lift, border emphasis and a pointer-tracked sheen.
 * Pass `to` to make the whole card a link. Works as a Stagger child (uses reveal.card).
 */
export function Card({ to, tone = 'light', className, children, cursor, ...rest }) {
  const base = cn(
    'group/card relative isolate flex flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-500',
    tone === 'light' && 'border-steel/15 bg-white shadow-card hover:border-fed/30 hover:shadow-card-hover',
    tone === 'tint' && 'border-fed/10 bg-tint/60 hover:border-fed/25 hover:bg-tint',
    tone === 'dark' && 'glass-dark text-white hover:border-white/25',
    className
  )

  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  const sheen = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      style={{
        background:
          tone === 'dark'
            ? 'radial-gradient(420px circle at var(--mx) var(--my), rgb(63 191 138 / 0.14), transparent 60%)'
            : 'radial-gradient(420px circle at var(--mx) var(--my), rgb(10 92 67 / 0.07), transparent 60%)',
      }}
    />
  )

  const props = {
    className: base,
    variants: reveal.card,
    whileHover: { y: -6 },
    whileTap: to ? { scale: 0.99 } : undefined,
    transition: spring.hover,
    onPointerMove,
    'data-cursor': cursor,
    ...rest,
  }

  if (to)
    return (
      <MotionLink to={to} {...props}>
        {sheen}
        {children}
      </MotionLink>
    )
  return (
    <motion.div {...props}>
      {sheen}
      {children}
    </motion.div>
  )
}

/** Icon tile that rotates/lifts when the parent card is hovered. */
export function IconTile({ icon: Icon, tone = 'green', className }) {
  return (
    <span
      className={cn(
        'inline-flex size-12 items-center justify-center rounded-xl transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover/card:-translate-y-0.5 group-hover/card:-rotate-6',
        tone === 'green' && 'bg-tint text-fed',
        tone === 'gold' && 'bg-gold text-ink',
        tone === 'dark' && 'bg-white/10 text-fed-light',
        className
      )}
    >
      <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
    </span>
  )
}
