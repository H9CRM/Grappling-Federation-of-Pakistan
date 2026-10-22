import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/motion'
import { org } from '@/content/site'

// Lucide dropped brand icons, so these are drawn in the same 24px / 2px-stroke style.
export function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const icons = { Facebook: FacebookIcon, Instagram: InstagramIcon }

/** Round icon buttons — footer, contact card, compact spots. */
export function SocialIcons({ dark = true, className }) {
  return (
    <ul className={cn('flex gap-2', className)}>
      {org.social.map((s) => {
        const Icon = icons[s.label]
        return (
          <li key={s.label}>
            <motion.a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${org.shortName} on ${s.label}`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={spring.press}
              className={cn(
                'flex size-10 items-center justify-center rounded-full border transition-colors duration-300',
                dark
                  ? 'border-white/15 text-white/80 hover:border-gold hover:bg-gold hover:text-ink'
                  : 'border-steel/25 text-fed hover:border-fed hover:bg-fed hover:text-white'
              )}
            >
              <Icon className="size-[1.125rem]" />
            </motion.a>
          </li>
        )
      })}
    </ul>
  )
}

/** Large follow cards — media page, home. */
export function SocialCards({ className }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {org.social.map((s) => {
        const Icon = icons[s.label]
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Follow"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.hover}
            className={cn(
              'group/sc relative flex items-center gap-5 overflow-hidden rounded-2xl p-6 text-white shadow-card transition-shadow duration-500 hover:shadow-card-hover',
              s.label === 'Instagram' ? 'bg-ink' : 'bg-fed'
            )}
          >
            <span aria-hidden="true" className="absolute -right-10 -bottom-12 size-40 rounded-full bg-white/5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/sc:scale-150" />
            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-transform duration-500 group-hover/sc:-rotate-6">
              <Icon className="size-7" />
            </span>
            <span className="relative flex-1">
              <span className="t-eyebrow block text-white/60">Follow on {s.label}</span>
              <span className="mt-1 block font-semibold">{s.handle}</span>
              <span className="t-caption mt-1 block text-white/65">{s.blurb}</span>
            </span>
            <ArrowUpRight aria-hidden="true" className="relative size-5 shrink-0 transition-transform duration-300 group-hover/sc:translate-x-0.5 group-hover/sc:-translate-y-0.5" />
          </motion.a>
        )
      })}
    </div>
  )
}
