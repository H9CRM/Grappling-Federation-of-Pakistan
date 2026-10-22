import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { inView, reveal } from '@/lib/motion'
import { Reveal, TextReveal } from '@/components/motion/primitives'

/** Eyebrow + H2 + optional lead. The H2 is a masked word reveal; the rule draws in. */
export function SectionHeading({ eyebrow, title, lead, align = 'left', dark = false, as = 'h2', className, children }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <motion.div
          className={cn('mb-4 flex items-center gap-3', align === 'center' && 'justify-center')}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <motion.span
            aria-hidden="true"
            className={cn('h-px w-8 origin-left', dark ? 'bg-gold' : 'bg-fed')}
            variants={reveal.rule}
          />
          <motion.span className={cn('t-eyebrow', dark ? 'text-fed-light' : 'text-fed')} variants={reveal.fade}>
            {eyebrow}
          </motion.span>
        </motion.div>
      )}
      <TextReveal
        as={as}
        text={title}
        className={cn(as === 'h1' ? 't-h1' : 't-h2', dark ? 'text-white' : as === 'h1' ? 'text-ink' : 'text-fed')}
      />
      {lead && (
        <Reveal as="p" delay={0.15} className={cn('t-lead mt-5', dark ? 'text-white/75' : 'text-ink/75')}>
          {lead}
        </Reveal>
      )}
      {children}
    </div>
  )
}

export function Section({ tone = 'white', className, children, id, tight = false, ...rest }) {
  return (
    <section
      id={id}
      className={cn(
        'relative',
        tight ? 'section-tight' : 'section',
        tone === 'white' && 'bg-white',
        tone === 'tint' && 'bg-tint',
        tone === 'offwhite' && 'bg-offwhite',
        tone === 'dark' && 'surface-arena on-dark',
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
