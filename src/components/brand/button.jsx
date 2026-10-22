import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/motion'

// Button hierarchy (§5.5): gold = primary action ("Register"), green outline = secondary
// ("Find a club"), ghost for tertiary. Gold always carries ink text.
const buttonVariants = cva(
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-[10px] px-5 text-[1rem] font-semibold tracking-[0.02em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 select-none disabled:pointer-events-none disabled:opacity-50 lg:text-[1.0625rem]',
  {
    variants: {
      variant: {
        primary: 'bg-gold text-ink shadow-control hover:bg-gold-dark hover:shadow-gold',
        secondary: 'border-2 border-fed text-fed hover:bg-fed hover:text-white',
        solid: 'bg-fed text-white shadow-control hover:bg-fed-dark',
        onDark: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
        ghost: 'px-3 text-fed hover:bg-tint',
      },
      size: {
        md: 'h-11',
        lg: 'h-12 px-6 lg:h-14 lg:px-7',
        sm: 'h-9 min-h-9 px-3.5 text-sm lg:text-sm',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

const MotionLink = motion.create(Link)

export function Button({ to, href, variant, size, icon = 'arrow', className, children, ...props }) {
  const Icon = icon === 'external' ? ArrowUpRight : icon === 'arrow' ? ArrowRight : null
  const content = (
    <>
      {/* soft sheen that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover/btn:left-full group-hover/btn:opacity-100"
      />
      <span className="relative inline-flex items-center gap-2">{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className={cn(
            'relative size-[1.1em] shrink-0 transition-transform duration-300 ease-[var(--ease-out-quint)]',
            icon === 'external' ? 'group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5' : 'group-hover/btn:translate-x-1'
          )}
        />
      )}
    </>
  )
  const motionProps = { whileHover: { y: -1 }, whileTap: { scale: 0.97, y: 0 }, transition: spring.press }
  const cls = cn(buttonVariants({ variant, size }), className)

  if (to) return <MotionLink to={to} className={cls} {...motionProps} {...props}>{content}</MotionLink>
  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <motion.a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...motionProps} {...props}>
        {content}
      </motion.a>
    )
  }
  return <motion.button className={cls} {...motionProps} {...props}>{content}</motion.button>
}

/** Inline text link with sweeping underline and directional arrow. */
export function ArrowLink({ to, href, className, children, dark = false }) {
  const cls = cn(
    'group/al inline-flex items-center gap-1.5 font-semibold',
    dark ? 'text-fed-light' : 'text-fed',
    className
  )
  const inner = (
    <>
      <span className="link-sweep pb-0.5">{children}</span>
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover/al:translate-x-1" />
    </>
  )
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    )
  return (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  )
}
