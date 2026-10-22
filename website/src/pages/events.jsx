import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/motion'
import { events, eventPath, isUpcoming, sortedEvents } from '@/content/events'
import { SITE_URL } from '@/content/site'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand, Notice } from '@/components/blocks'
import { EventCard } from '@/components/event-card'

const filters = [
  { id: 'all', label: 'All events', test: () => true },
  { id: 'upcoming', label: 'Upcoming', test: isUpcoming },
  { id: 'national', label: 'National', test: (e) => e.level === 'National' },
  { id: 'regional', label: 'Provincial & regional', test: (e) => ['Provincial', 'Regional'].includes(e.level) },
  { id: 'international', label: 'International', test: (e) => e.level === 'International' },
  { id: 'past', label: 'Past', test: (e) => !isUpcoming(e) },
]

export default function Events() {
  const [filter, setFilter] = useState('all')
  const list = sortedEvents().filter(filters.find((f) => f.id === filter).test)

  return (
    <>
      <PageHero
        image="inter-club-punjab-nogi-2026"
        eyebrow="Event calendar"
        title="Grappling Tournaments in Pakistan 2026"
        lead="Every GFP-sanctioned grappling tournament in 2026 is listed here with its date, city, style and registration status."
        crumbs={[{ label: 'Events', href: '/events' }]}
        seo={{
          title: 'Grappling Tournaments in Pakistan 2026 | GFP Event Calendar',
          description: 'All GFP grappling tournaments for 2026: national championship, provincial trials, Gi and No-Gi leagues and fight nights.',
          path: '/events',
          schema: {
            '@type': 'ItemList',
            itemListElement: events.map((e, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}${eventPath(e)}`, name: e.title })),
          },
        }}
      />

      <section className="section-tight bg-offwhite">
        <div className="container-site">
          <LayoutGroup id="event-filters">
            <div role="group" aria-label="Filter events" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'relative h-10 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors',
                    filter === f.id ? 'border-fed text-white' : 'border-steel/25 bg-white text-ink hover:border-fed hover:text-fed'
                  )}
                >
                  {filter === f.id && <motion.span layoutId="event-filter" className="absolute inset-0 rounded-full bg-fed" transition={spring.layout} />}
                  <span className="relative">{f.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <p className="t-caption mt-6 text-steel" aria-live="polite">
            {list.length} {list.length === 1 ? 'event' : 'events'}
          </p>

          <motion.ul layout className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((e) => (
                <motion.li
                  key={e.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={spring.layout}
                >
                  <EventCard event={e} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {list.length === 0 && (
            <p className="mt-6 rounded-2xl border border-dashed border-steel/30 p-8 text-center text-steel">No events match this filter yet.</p>
          )}

          <Notice className="mt-10">
            Dates, venues and fees are taken from GFP’s official announcements. Each event page links to the original
            post. A downloadable calendar PDF will follow once the 2027 calendar is confirmed.
          </Notice>
        </div>
      </section>

      <CtaBand
        title="Host a GFP-sanctioned event."
        body="Affiliated clubs and provincial associations can apply to host sanctioned tournaments."
        primary={{ label: 'Talk to the events team', to: '/contact' }}
        secondary={{ label: 'Club affiliation', to: '/clubs/affiliate' }}
      />
    </>
  )
}
