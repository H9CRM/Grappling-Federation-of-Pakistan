import { useParams } from 'react-router'
import { eventPath, findEvent, isUpcoming, statusMeta } from '@/content/events'
import { org, SITE_URL } from '@/content/site'
import { absoluteUrl } from '@/components/seo'

// "2:00 PM" → "14:00:00"
const to24h = (t) => {
  const [, h, m, ap] = t.match(/(\d+):(\d+)\s*(AM|PM)/i)
  const hh = (Number(h) % 12) + (ap.toUpperCase() === 'PM' ? 12 : 0)
  return `${String(hh).padStart(2, '0')}:${m}:00`
}
import { weightClasses } from '@/content/sport'
import { PageHero } from '@/components/layout/page-hero'
import { KeyFacts, Notice, SplitSection, CtaBand } from '@/components/blocks'
import { Badge } from '@/components/brand/badge'
import { ArrowLink, Button } from '@/components/brand/button'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { ImageGallery } from '@/components/media/image-gallery'
import { images, videos } from '@/content/media'
import { VideoGallery } from '@/components/media/video-gallery'
import NotFound from './not-found'

export default function EventDetail() {
  const { year, slug } = useParams()
  const e = findEvent(year, slug)
  if (!e) return <NotFound />

  const status = statusMeta[e.status]
  const resultImg = e.resultsImage ? images.find((i) => i.id === e.resultsImage) : null
  const isPast = !isUpcoming(e)
  const eventVideos = videos.filter((v) => v.event === e.slug)
  const heroImg = images.find((i) => i.event?.slug === e.slug && !i.tags?.includes('Results'))
  // UWW format + weight classes are shown only where UWW rules are known to apply
  const uwwFormat = e.uwwRules
  const fee = e.entryFee?.match(/PKR\s*([\d,]+)/)?.[1]?.replace(/,/g, '')
  const schema = {
    '@type': 'SportsEvent',
    name: e.title,
    description: e.summary,
    sport: 'Grappling',
    url: `${SITE_URL}${eventPath(e)}`,
    image: absoluteUrl(heroImg?.src ?? resultImg?.src ?? '/og-image.jpg'),
    ...(e.startDate ? { startDate: e.time ? `${e.startDate}T${to24h(e.time)}+05:00` : e.startDate, endDate: e.endDate ?? e.startDate } : {}),
    eventStatus: e.previousStartDate ? 'https://schema.org/EventRescheduled' : 'https://schema.org/EventScheduled',
    ...(e.previousStartDate ? { previousStartDate: e.previousStartDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: e.venue ?? e.city,
      address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: e.country === 'Pakistan' ? 'PK' : e.country },
    },
    organizer: e.organizer.startsWith(org.name)
      ? { '@type': 'SportsOrganization', name: org.name, url: SITE_URL }
      : { '@type': 'Organization', name: e.organizer },
    ...(fee && isUpcoming(e)
      ? { offers: { '@type': 'Offer', price: fee, priceCurrency: 'PKR', availability: 'https://schema.org/InStock', url: `${SITE_URL}${eventPath(e)}` } }
      : {}),
    ...(eventVideos.length
      ? { subjectOf: eventVideos.map((v) => ({ '@type': 'VideoObject', name: v.title, description: v.meta, embedUrl: v.url, ...(v.poster ? { thumbnailUrl: absoluteUrl(v.poster) } : {}) })) }
      : {}),
  }

  return (
    <>
      <PageHero
        image={heroImg?.id}
        eyebrow={`${e.level} · ${e.year}`}
        title={e.title}
        lead={e.summary}
        crumbs={[{ label: 'Events', href: '/events' }, { label: e.shortTitle, href: eventPath(e) }]}
        seo={{
          title: `${e.title}, ${e.city} | Grappling Tournament`,
          description: `${e.dateLabel} · ${e.venue ?? e.city}. ${e.summary}`.slice(0, 158),
          path: eventPath(e),
          schema,
        }}
        actions={
          <>
            <Badge tone={status.tone === 'outline' ? 'dark' : status.tone} className="h-11 px-4">{status.label}</Badge>
            {e.externalUrl && <Button href={e.externalUrl} variant="onDark" icon="external">Official event page</Button>}
          </>
        }
      />

      <SplitSection eyebrow="At a glance" title="Key facts">
        <KeyFacts
          rows={[
            ['Dates', e.time ? `${e.dateLabel} · ${e.time}` : e.dateLabel],
            ['City', `${e.city}, ${e.country}`],
            ['Venue', e.venue],
            ['Organiser', e.organizer],
            ['Styles', e.styles.join(' · ')],
            ['Divisions', e.divisions ?? e.ages?.join(' · ')],
            ...(isPast ? [] : [['Weigh-in', null]]),
            ['Entry fee', e.level === 'International' ? 'Not applicable — national team selection' : e.entryFee],
            ...(e.registrationDeadline ? [['Registration deadline', e.registrationDeadline]] : []),
          ]}
        />
        {e.note && <Notice className="mt-6">{e.note}</Notice>}
        {e.selection && <Notice className="mt-6">{e.selection}</Notice>}
        {e.source && (
          <Reveal type="fade" className="mt-6">
            <ArrowLink href={e.source}>See the original announcement</ArrowLink>
          </Reveal>
        )}
      </SplitSection>

      {/* UWW format + weight classes only apply to GFP- or UWW-run events, not partner gym events */}
      {uwwFormat && (
      <SplitSection eyebrow="Format" title="Format and guaranteed matches" tone="tint">
        <Reveal type="text" className="t-lead text-ink/85">
          Divisions with 5 or fewer athletes use a round-robin (Nordic) format, so every athlete gets multiple matches;
          larger divisions use direct elimination with repechage, as in UWW rules.
        </Reveal>
      </SplitSection>
      )}

      {uwwFormat && (
      <SplitSection eyebrow="Divisions" title="Senior weight classes">
        <div className="grid gap-8 md:grid-cols-2">
          {[['Men', weightClasses.men], ['Women', weightClasses.women]].map(([label, list]) => (
            <div key={label}>
              <h3 className="t-card text-ink">{label}</h3>
              <Stagger as="ul" stagger={0.03} className="mt-4 flex flex-wrap gap-2">
                {list.map((w) => (
                  <Stagger.Item as="li" type="pop" key={w} className="rounded-lg border border-fed/20 bg-tint/60 px-3 py-1.5 font-display text-lg font-semibold text-fed tnum">
                    {w} kg
                  </Stagger.Item>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
        <Reveal type="fade" className="mt-8">
          <ArrowLink to="/rules">Full rules, kit and age categories</ArrowLink>
        </Reveal>
      </SplitSection>
      )}

      <SplitSection eyebrow={resultImg ? 'Results' : 'Live'} title={resultImg ? 'Official result card' : 'Brackets and results'} tone="offwhite">
        {resultImg ? (
          <div className="max-w-md">
            <ImageGallery items={[resultImg]} withSocialTiles={false} />
          </div>
        ) : isPast ? (
          <Notice>Official results for this event have not been published on the website yet.</Notice>
        ) : (
          <Notice>
            Brackets, live scoring and results will be published through Smoothcomp for GFP-sanctioned events. Results are
            posted within 48 hours of the event.
          </Notice>
        )}
      </SplitSection>

      {eventVideos.length > 0 && (
        <SplitSection eyebrow="Video" title="From the event">
          <VideoGallery items={eventVideos} columns={2} />
        </SplitSection>
      )}

      <CtaBand
        title={e.level === 'International' ? 'Aiming for national team selection?' : 'Compete at the next GFP event.'}
        body="Register once and your athlete profile works for every GFP-sanctioned event this year."
        primary={{ label: 'Register as an athlete', to: '/register' }}
        secondary={{ label: 'All events', to: '/events' }}
      />
    </>
  )
}
