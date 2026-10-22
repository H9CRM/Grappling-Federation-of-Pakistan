import { motion } from 'motion/react'
import { Check, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, inView, reveal, sequence } from '@/lib/motion'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { Button } from '@/components/brand/button'

/** Numbered process — rows slide in and the connector draws down. */
export function Steps({ items, className }) {
  return (
    <motion.ol
      className={cn('relative space-y-0', className)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      variants={sequence(0.12)}
    >
      {items.map((s, i) => (
        <motion.li key={i} variants={reveal.slide} className="relative flex gap-6 pb-10 last:pb-0">
          {i < items.length - 1 && (
            <motion.span
              aria-hidden="true"
              className="absolute top-12 bottom-0 left-6 w-px origin-top bg-fed/25"
              variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.8, ease: ease.expo, delay: 0.2 } } }}
            />
          )}
          <span className="font-display relative flex size-12 shrink-0 items-center justify-center rounded-full border border-fed/25 bg-white text-lg font-bold text-fed shadow-control tnum">
            {i + 1}
          </span>
          <div className="pt-2.5">
            <h3 className="t-card text-ink">{s.title}</h3>
            {s.body && <p className="mt-2 max-w-2xl text-ink/75">{s.body}</p>}
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}

export function Checklist({ items, className, dark = false }) {
  return (
    <Stagger as="ul" stagger={0.06} className={cn('space-y-3', className)}>
      {items.map((t) => (
        <Stagger.Item as="li" key={t} type="text" className="flex gap-3">
          <span className={cn('mt-1 flex size-5 shrink-0 items-center justify-center rounded-full', dark ? 'bg-fed-light/20 text-fed-light' : 'bg-tint text-fed')}>
            <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className={dark ? 'text-white/80' : 'text-ink/85'}>{t}</span>
        </Stagger.Item>
      ))}
    </Stagger>
  )
}

/** Key facts table (definition list) — for event and entity pages. */
export function KeyFacts({ rows, className }) {
  return (
    <Reveal type="fade" className={cn('overflow-hidden rounded-2xl border border-steel/15 bg-white shadow-card', className)}>
      <dl className="divide-y divide-steel/10">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-6 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
            <dt className="t-caption font-semibold text-steel">{k}</dt>
            <dd className={cn('text-ink', !v && 'text-steel italic')}>{v || 'To be confirmed'}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}

/** Transparent status note — used wherever data is pending verification. */
export function Notice({ children, className, tone = 'info' }) {
  return (
    <Reveal
      type="text"
      className={cn(
        'flex gap-3 rounded-xl border px-5 py-4 text-[0.9375rem]',
        tone === 'info' && 'border-fed/20 bg-tint/60 text-ink/85',
        tone === 'dark' && 'border-white/10 bg-white/5 text-white/75',
        className
      )}
    >
      <Info aria-hidden="true" className={cn('mt-0.5 size-4 shrink-0', tone === 'dark' ? 'text-fed-light' : 'text-fed')} />
      <div>{children}</div>
    </Reveal>
  )
}

export function CtaBand({ title, body, primary, secondary }) {
  return (
    <section className="bg-offwhite py-12 lg:py-16">
      <div className="container-site">
        <motion.div
          className="surface-arena relative overflow-hidden rounded-3xl px-8 py-12 lg:px-14 lg:py-16"
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="t-h2 text-white">{title}</h2>
              {body && <p className="t-lead mt-4 text-white/75">{body}</p>}
            </div>
            <div className="flex flex-wrap gap-3">
              {primary && <Button to={primary.to} href={primary.href} size="lg" icon={primary.href ? 'external' : 'arrow'}>{primary.label}</Button>}
              {secondary && (
                <Button to={secondary.to} href={secondary.href} size="lg" variant="onDark" icon={secondary.href ? 'external' : 'arrow'}>
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/** Two-column prose section: sticky heading left, content right. */
export function SplitSection({ eyebrow, title, children, tone = 'white', id }) {
  return (
    <section id={id} className={cn('section-tight scroll-mt-24', tone === 'tint' ? 'bg-tint' : tone === 'offwhite' ? 'bg-offwhite' : 'bg-white')}>
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {eyebrow && <p className="t-eyebrow mb-3 text-fed">{eyebrow}</p>}
            <Reveal as="h2" type="text" className="t-h2 text-fed">{title}</Reveal>
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}
