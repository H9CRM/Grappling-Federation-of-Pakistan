import { ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import { eventPath, statusMeta } from '@/content/events'
import { Badge } from '@/components/brand/badge'
import { Card } from '@/components/brand/card'

export function EventCard({ event, tone = 'light' }) {
  const status = statusMeta[event.status]
  const dark = tone === 'dark'
  return (
    <Card to={eventPath(event)} tone={tone} cursor="View" className="h-full p-6 lg:p-7">
      <div className="flex items-start justify-between gap-3">
        <Badge tone={dark && status.tone === 'outline' ? 'dark' : status.tone}>{status.label}</Badge>
        <span className={dark ? 't-eyebrow text-white/50' : 't-eyebrow text-steel'}>{event.level}</span>
      </div>

      <h3 className={`t-card mt-6 ${dark ? 'text-white' : 'text-ink'}`}>{event.title}</h3>

      <dl className={`mt-5 space-y-2 text-[0.9375rem] ${dark ? 'text-white/70' : 'text-steel'}`}>
        <div className="flex items-center gap-2.5">
          <dt className="sr-only">Date</dt>
          <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
          <dd className="tnum">{event.dateLabel}</dd>
        </div>
        <div className="flex items-center gap-2.5">
          <dt className="sr-only">Location</dt>
          <MapPin aria-hidden="true" className="size-4 shrink-0" />
          <dd>{event.venue ?? `${event.city}, ${event.country}`}</dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between pt-7">
        <ul className="flex flex-wrap gap-1.5">
          {event.styles.map((s) => (
            <li
              key={s}
              className={`rounded-md px-2 py-0.5 text-xs font-semibold ${dark ? 'bg-white/10 text-white/80' : 'bg-tint text-fed'}`}
            >
              {s}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className={`flex size-10 items-center justify-center rounded-full border transition-all duration-500 group-hover/card:rotate-[-45deg] ${
            dark
              ? 'border-white/20 group-hover/card:border-gold group-hover/card:bg-gold group-hover/card:text-ink'
              : 'border-steel/25 group-hover/card:border-fed group-hover/card:bg-fed group-hover/card:text-white'
          }`}
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Card>
  )
}
