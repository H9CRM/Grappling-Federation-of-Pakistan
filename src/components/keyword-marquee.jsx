import { Link } from 'react-router'
import { cn } from '@/lib/utils'

// Broadcast-style topic ticker ("lower third") that sits along the bottom edge of the dark
// stats band on the home page — the scoreboard look makes a sports ticker feel native there.
// Every item is a descriptive internal link (strategy §4.5): it reinforces the search terms GFP
// targets (SEO), the entity + place names AI engines match on (GEO) and the questions people
// ask (AEO) — high on the page, without hidden text or keyword stuffing.
// Loop: the list renders twice and the track translates -50%; the copy is aria-hidden.

const topics = [
  { label: 'Grappling Federation of Pakistan', to: '/about' },
  { label: 'Grappling tournaments 2026', to: '/events' },
  { label: 'No-Gi grappling Lahore', to: '/events' },
  { label: 'Beach Grappling Championship', to: '/events/2026/beach-grappling-nogi-championship' },
  { label: 'UWW grappling rules', to: '/rules' },
  { label: 'Grappling weight classes', to: '/rules#weights' },
  { label: 'Grappling & BJJ clubs', to: '/clubs' },
  { label: 'Athlete registration', to: '/register' },
  { label: 'What is grappling?', to: '/what-is-grappling' },
  { label: 'Gi vs No-Gi', to: '/what-is-grappling' },
  { label: 'Women’s grappling Pakistan', to: '/women' },
  { label: 'Kids grappling & BJJ', to: '/youth' },
  { label: 'Referee courses', to: '/education' },
  { label: 'National rankings', to: '/results' },
  { label: 'Grappling FAQ', to: '/faq' },
]

export function KeywordMarquee({ className }) {
  return (
    <nav aria-label="Explore grappling in Pakistan" className={cn('relative border-t border-white/10', className)}>
      {/* fixed label, like a broadcast ticker */}
      <span className="inline-flex items-center gap-2 bg-gold px-4 py-3 text-[0.75rem] font-bold tracking-[0.14em] text-ink uppercase sm:px-5">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-ink" />
        Explore
      </span>

      <div className="container-site py-3">
        <ul
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          {topics.map((it, i) => {
            return (
              <li key={i} className="flex items-center">
                <Link
                  to={it.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {it.label}
                </Link>
                <span aria-hidden="true" className="size-1 shrink-0 rotate-45 bg-fed-light/60" />
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
