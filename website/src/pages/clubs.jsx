import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { clubs, clubsSource } from '@/content/clubs'
import { SITE_URL } from '@/content/site'
import { Card } from '@/components/brand/card'
import { Badge } from '@/components/brand/badge'
import { ArrowUpRight, MapPin, Search, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/motion'
import { PageHero } from '@/components/layout/page-hero'
import { Checklist, CtaBand, SplitSection } from '@/components/blocks'
import { Button } from '@/components/brand/button'
import { Reveal } from '@/components/motion/primitives'

// Cities come from the data, most clubs first
const counts = clubs.reduce((m, c) => ({ ...m, [c.city]: (m[c.city] || 0) + 1 }), {})
const cities = ['All cities', ...Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b))]

export default function Clubs() {
  const [city, setCity] = useState(cities[0])
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const list = clubs.filter(
    (c) =>
      (city === cities[0] || c.city === city) &&
      (!q || [c.name, c.city, c.address, c.desc].some((f) => f?.toLowerCase().includes(q)))
  )

  return (
    <>
      <PageHero
        image="bjj-class-practice"
        eyebrow="Club directory"
        title="Grappling and BJJ Clubs in Pakistan"
        lead={`${clubs.length} member academies across ${cities.length - 1} cities — from Lahore to Quetta — train and compete with the Grappling Federation of Pakistan.`}
        crumbs={[{ label: 'Clubs', href: '/clubs' }]}
        seo={{
          title: 'Grappling & BJJ Clubs in Pakistan | GFP Affiliated Gyms',
          description: `GFP member grappling, MMA and martial arts academies in ${cities.slice(1).join(', ')}.`,
          path: '/clubs',
          schema: {
            '@type': 'ItemList',
            name: 'Grappling Federation of Pakistan member academies',
            numberOfItems: clubs.length,
            itemListElement: clubs.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SportsActivityLocation',
                name: c.name,
                address: { '@type': 'PostalAddress', addressLocality: c.city, addressCountry: 'PK' },
                memberOf: { '@id': `${SITE_URL}/#organization` },
              },
            })),
          },
        }}
        actions={<Button to="/clubs/affiliate">Affiliate your gym</Button>}
      />

      <section className="section-tight bg-offwhite">
        <div className="container-site">
          <LayoutGroup id="city-filter">
            <div role="group" aria-label="Filter by city" className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
              {cities.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={city === c}
                  onClick={() => setCity(c)}
                  className={cn(
                    'relative h-10 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors',
                    city === c ? 'border-fed text-white' : 'border-steel/25 bg-white text-ink hover:border-fed hover:text-fed'
                  )}
                >
                  {city === c && <motion.span layoutId="city-pill" className="absolute inset-0 rounded-full bg-fed" transition={spring.layout} />}
                  <span className="relative">
                    {c}
                    {c !== cities[0] && <span className="ml-1.5 opacity-60 tnum">{counts[c]}</span>}
                  </span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <label className="relative mt-5 block max-w-md">
            <span className="sr-only">Search clubs by name, area or style</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-steel" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, area or style — e.g. DHA, kickboxing"
              className="h-12 w-full rounded-full border border-steel/30 bg-white pr-4 pl-11 text-[0.9375rem] text-ink shadow-control transition-[border-color,box-shadow] outline-none placeholder:text-steel/70 focus-visible:border-fed focus-visible:shadow-[0_0_0_4px_rgb(10_92_67/0.15)] focus-visible:outline-none"
            />
          </label>

          <p className="t-caption mt-6 text-steel" aria-live="polite">
            {list.length} member {list.length === 1 ? 'academy' : 'academies'}
            {city !== cities[0] && ` in ${city}`} · Source:{' '}
            <a className="prose-link" href={clubsSource.href} target="_blank" rel="noreferrer">{clubsSource.label}</a>
          </p>

          <motion.ul layout className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((c) => (
                <motion.li
                  key={c.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={spring.layout}
                >
                  <ClubCard club={c} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {list.length === 0 && (
            <Reveal type="card" className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-fed/30 bg-white px-6 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-tint text-fed">
                <MapPin aria-hidden="true" className="size-6" />
              </span>
              <p className="t-card mt-6 text-ink">No member academies match “{query}”{city !== cities[0] && ` in ${city}`}.</p>
              <p className="mt-3 max-w-md text-steel">Try another area or style — or ask your gym to affiliate with GFP.</p>
              <Button to="/clubs/affiliate" variant="secondary" className="mt-8">Affiliate a gym</Button>
            </Reveal>
          )}
        </div>
      </section>

      <SplitSection eyebrow="Why it matters" title="Why train at an affiliated club?">
        <Checklist
          items={[
            'Coaches registered with the federation',
            'A safeguarding lead and first aid on site',
            'Athletes can enter GFP national rankings',
            'Clubs earn club ranking points and can host sanctioned events',
          ]}
        />
      </SplitSection>

      <CtaBand
        title="Run a grappling or BJJ gym?"
        body="Affiliated clubs appear in the national directory, earn club ranking points and can host sanctioned events."
        primary={{ label: 'Affiliate your gym', to: '/clubs/affiliate' }}
      />
    </>
  )
}

function ClubCard({ club: c }) {
  const initial = c.name.replace(/^The /, '').charAt(0)
  return (
    <Card className="h-full" cursor={c.profile ? 'View' : undefined}>
      {/* cover: the club's own photo, or a brand gradient with its monogram */}
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        {c.cover ? (
          <img
            src={c.cover}
            alt={`${c.name}, ${c.city}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/card:scale-[1.06]"
          />
        ) : (
          <div aria-hidden="true" className="surface-arena grid h-full w-full place-items-center">
            <span className="mat-grid absolute inset-0 opacity-30 invert" />
            <span className="font-display relative text-6xl font-bold text-white/15">{initial}</span>
          </div>
        )}
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <Badge tone="dark" className="absolute top-3 right-3 bg-ink/60 backdrop-blur">Member academy</Badge>
      </div>

      <div className="relative flex flex-1 flex-col p-6 pt-9">
        {/* logo overlaps the cover edge */}
        <span className="absolute -top-8 left-6 flex size-16 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-card transition-transform duration-500 group-hover/card:-rotate-3">
          {c.logo ? (
            <img src={c.logo} alt={`${c.name} logo`} loading="lazy" decoding="async" className="h-full w-full object-contain p-0.5" />
          ) : (
            <span aria-hidden="true" className="font-display flex h-full w-full items-center justify-center bg-tint text-2xl font-bold text-fed">{initial}</span>
          )}
        </span>

        <h3 className="t-card text-ink">{c.name}</h3>
        <p className="mt-1.5 flex items-start gap-1.5 text-[0.9375rem] text-steel">
          <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
          <span>{c.address ?? c.city}</span>
        </p>
        {c.desc && <p className="t-caption mt-3 text-ink/75">{c.desc}</p>}
        {c.note && <p className="t-caption mt-2 font-medium text-fed">{c.note}</p>}

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="inline-flex items-center gap-1.5 text-sm text-steel tnum">
            <Users aria-hidden="true" className="size-4" /> {c.fighters} registered {c.fighters === 1 ? 'fighter' : 'fighters'}
          </span>
          {c.profile && (
            <a
              href={c.profile}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-fed"
              aria-label={`${c.name} profile on Boltmore`}
            >
              <span className="link-sweep pb-0.5">Profile</span>
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}
