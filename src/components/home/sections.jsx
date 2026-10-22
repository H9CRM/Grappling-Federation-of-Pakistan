import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import {
  Award,
  BadgeCheck,
  Building2,
  Gavel,
  Medal,
  Trophy,
  UserRound,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, inView, reveal, sequence, spring } from '@/lib/motion'
import { events, isUpcoming, sortedEvents } from '@/content/events'
import { keyStats, styles, weightClasses, ageCategories } from '@/content/sport'
import { org } from '@/content/site'
import { faqById } from '@/content/faq'
import { Section, SectionHeading } from '@/components/layout/section'
import { ArrowLink, Button } from '@/components/brand/button'
import { Card, IconTile } from '@/components/brand/card'
import { CountUp, MaskReveal, Reveal, Stagger } from '@/components/motion/primitives'
import { ScrollHighlight, ScrollTimeline } from '@/components/motion/scroll-story'
import { EventCard } from '@/components/event-card'
import { FaqList } from '@/components/faq-list'
import { InstagramIcon } from '@/components/brand/social'
import { images as mediaImages, imageById, stockImages } from '@/content/media'
import { PhotoCredit } from '@/components/media/photo-credit'
import { assetPath } from '@/lib/urls'
import { clubs } from '@/content/clubs'

const todayInPakistan = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Karachi' })

/* 3 — Quick answer: the AEO answer, read at the reader's own scroll pace */
export function QuickAnswer() {
  return (
    <Section tone="white" className="overflow-hidden">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="In one sentence" title="What does the Grappling Federation of Pakistan do?" className="lg:sticky lg:top-32" />
        </div>
        <div className="lg:col-span-8">
          <ScrollHighlight
            className="font-display text-[clamp(1.75rem,1.2rem+2.2vw,3rem)] leading-[1.15] font-semibold text-ink"
            emphasis={['competitions', 'rankings,', 'affiliates', 'selects']}
            text="GFP organises grappling competitions under UWW International Grappling Rules, maintains national results and rankings, affiliates clubs, and selects athletes for UWW events such as the Asian Grappling Championships."
          />
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-steel/15 bg-steel/15 sm:grid-cols-2">
            {[
              { icon: Trophy, t: 'Competitions', d: 'National and regional Gi and No-Gi tournaments.' },
              { icon: Medal, t: 'Results & rankings', d: 'One national ranking across sanctioned events.' },
              { icon: Building2, t: 'Club affiliation', d: 'A national directory of affiliated clubs.' },
              { icon: Award, t: 'National team', d: 'Selection for UWW Asian and World events.' },
            ].map(({ icon: Icon, t, d }) => (
              <Stagger.Item key={t} type="fade" className="group/p flex gap-4 bg-white p-6 transition-colors duration-500 hover:bg-offwhite">
                <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-fed transition-transform duration-500 group-hover/p:scale-110" strokeWidth={1.75} />
                <div>
                  <p className="font-semibold text-ink">{t}</p>
                  <p className="t-caption mt-1 text-steel">{d}</p>
                </div>
              </Stagger.Item>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}

/* Stats band — viewport-triggered counters on ink, gold numerals (§5.5: gold on ink) */
export function StatsBand() {
  return (
    <section aria-label="Grappling in numbers" className="bg-ink text-white">
      <Stagger className="container-site grid grid-cols-1 gap-x-6 gap-y-10 py-16 min-[360px]:grid-cols-2 lg:grid-cols-4 lg:py-20" stagger={0.12}>
        {keyStats.map((s) => (
          <Stagger.Item key={s.label} type="text" className="border-l border-white/15 pl-5">
            <CountUp to={s.value} format={s.format} className="t-stat block text-gold" />
            <p className="t-caption mt-3 max-w-[16rem] text-white/70">{s.label}</p>
          </Stagger.Item>
        ))}
      </Stagger>
    </section>
  )
}

/* 4 — Upcoming events */
export function UpcomingEvents() {
  const list = sortedEvents().filter((event) => isUpcoming(event) && event.sortDate >= todayInPakistan).slice(0, 6)
  return (
    <Section tone="offwhite">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Calendar"
            title="Upcoming Grappling Tournaments in Pakistan"
            lead="Find confirmed dates, venues, divisions and entry information. Check each event page for its current registration status."
          />
          <Reveal type="fade" className="shrink-0">
            <ArrowLink to="/events">View the full calendar</ArrowLink>
          </Reveal>
        </div>
        {list.length ? <Stagger className={cn('mt-12 grid gap-5', list.length === 2 ? 'md:grid-cols-2' : list.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : '')}>
          {list.map((e) => <EventCard key={e.slug} event={e} />)}
        </Stagger> : <p className="mt-10 rounded-2xl border border-steel/20 bg-white p-7 text-steel">No future tournament date is currently confirmed. Browse the full calendar for past events and updates.</p>}
        <Reveal type="text" className="mt-8 rounded-2xl border border-dashed border-fed/30 bg-white/60 p-6 text-ink/75">
          GFP has run {events.filter((e) => e.organizer.startsWith('Grappling Federation') && !isUpcoming(e)).length}{' '}
          tournaments and fight nights since 2025. See the full calendar for past events, results and videos.
        </Reveal>
      </div>
    </Section>
  )
}

/* 5 — Choose your path */
const paths = [
  { icon: UserRound, who: 'Athletes', copy: 'Create your athlete profile once and use it for every GFP event.', to: '/register', cta: 'Register as an athlete' },
  { icon: Building2, who: 'Clubs', copy: 'Affiliate your gym to appear in the national club directory and enter club rankings.', to: '/clubs/affiliate', cta: 'Affiliate your club' },
  { icon: Gavel, who: 'Coaches & referees', copy: 'Train on the UWW International Grappling Rules and join the national officials’ pathway.', to: '/education', cta: 'See education pathways' },
  { icon: Users, who: 'Parents', copy: 'Find safe, affiliated clubs and youth divisions from U13 upwards.', to: '/youth', cta: 'Grappling for young athletes' },
]

export function ChoosePath() {
  return (
    <Section tone="white" className="overflow-hidden">
      {/* magnetic filings swing toward the cursor between the cards; faded at the edges */}
      <div className="container-site relative">
        <SectionHeading eyebrow="Start here" title="Start Here: Athletes, Clubs, Coaches and Parents" align="center" />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {paths.map((p, i) => (
            <Card key={p.who} to={p.to} className="p-7">
              <div className="flex items-center justify-between">
                <IconTile icon={p.icon} tone={i === 0 ? 'gold' : 'green'} />
                <span className="font-display text-sm font-semibold text-steel/60 tnum">0{i + 1}</span>
              </div>
              <h3 className="t-card mt-8 text-ink">{p.who}</h3>
              <p className="mt-3 text-[0.9375rem] text-steel">{p.copy}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-[0.9375rem] font-semibold text-fed">
                <span className="link-sweep pb-0.5 group-hover/card:bg-[length:100%_1px]">{p.cta}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover/card:translate-x-1">→</span>
              </span>
            </Card>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

/* 6 — What is grappling: Gi / No-Gi switch with shared-layout indicator */
export function WhatIsGrappling() {
  const [active, setActive] = useState(styles[0].id)
  const current = styles.find((s) => s.id === active)

  return (
    <Section tone="tint" className="overflow-hidden">
      <div aria-hidden="true" className="mat-grid absolute inset-0" />
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="The sport"
            title="What Is Grappling?"
            lead="Grappling is a combat sport without strikes in which athletes score by taking down, controlling and submitting an opponent with holds, joint locks and chokes."
          />

          <Reveal type="pop" delay={0.2} className="mt-10">
            <LayoutGroup id="style-tabs">
              <div role="tablist" aria-label="Competition styles" className="inline-flex rounded-full border border-fed/15 bg-white p-1 shadow-control">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    role="tab"
                    id={`tab-${s.id}`}
                    aria-selected={active === s.id}
                    aria-controls="style-panel"
                    onClick={() => setActive(s.id)}
                    className={cn(
                      'relative h-10 rounded-full px-5 text-[0.9375rem] font-semibold transition-colors',
                      active === s.id ? 'text-white' : 'text-fed hover:text-fed-dark'
                    )}
                  >
                    {active === s.id && (
                      <motion.span layoutId="style-pill" className="absolute inset-0 rounded-full bg-fed" transition={spring.layout} />
                    )}
                    <span className="relative">{s.alias}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </Reveal>

          <div id="style-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-6 min-h-[9.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: ease.out }}
              >
                <p className="t-card text-ink">
                  {current.name} <span className="font-normal text-steel">· {current.kit}</span>
                </p>
                <p className="mt-2 max-w-lg text-ink/75">{current.summary}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <Reveal type="fade" className="mt-4">
            <ArrowLink to="/what-is-grappling">Gi vs No-Gi, explained in full</ArrowLink>
          </Reveal>
        </div>

        {/* Photo follows the tab: No-Gi action ↔ Gi action. Wipes across on change. */}
        <StylePhoto styleId={current.id} />
      </div>
    </Section>
  )
}

const stylePhotos = { nogi: 'nogi-grappling', gi: 'bjj-gi-2' }

function StylePhoto({ styleId }) {
  const img = imageById(stylePhotos[styleId])
  return (
    <MaskReveal from="center" className="rounded-3xl shadow-float">
      <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={img.id}
            src={img.srcSmall}
            srcSet={`${img.srcSmall} ${img.smallWidth}w, ${img.src} ${img.width}w`}
            sizes="(min-width: 1024px) 600px, 100vw"
            alt={img.alt}
            width={img.width}
            height={img.height}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ clipPath: 'inset(0% 0% 0% 100%)', scale: 1.08 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.3 } }}
            transition={{ duration: 0.8, ease: ease.expo }}
          />
        </AnimatePresence>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={styleId}
              className="font-display text-2xl font-semibold text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: ease.out }}
            >
              {styleId === 'gi' ? 'Grappling Gi' : 'No-Gi Grappling'}
            </motion.span>
          </AnimatePresence>
          <PhotoCredit image={img} className="text-right" />
        </figcaption>
      </figure>
    </MaskReveal>
  )
}

/* 7 — Results snapshot (honest empty state until the first ranking is published) */
export function ResultsSnapshot() {
  return (
    <Section tone="white">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Results"
            title="Latest Results and National Rankings"
            lead="National rankings are updated after every GFP-sanctioned event. Every GFP event counts towards one national ranking."
          />
          <Reveal type="fade" delay={0.2} className="mt-8">
            <ArrowLink to="/results">How rankings work</ArrowLink>
          </Reveal>
        </div>
        <Reveal type="card" className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-steel/15 shadow-card">
            <div className="flex items-center justify-between bg-fed px-6 py-4 text-white">
              <p className="font-semibold">National ranking · Seniors</p>
              <p className="t-caption text-white/75">Last updated: not yet published</p>
            </div>
            <div className="relative">
              <table className="w-full text-left text-[0.9375rem]">
                <caption className="sr-only">National ranking preview</caption>
                <thead className="text-steel">
                  <tr className="border-b border-steel/15">
                    <th scope="col" className="px-3 py-3 sm:px-6 font-medium">Rank</th>
                    <th scope="col" className="px-3 py-3 sm:px-6 font-medium">Athlete</th>
                    <th scope="col" className="hidden px-3 py-3 sm:px-6 font-medium sm:table-cell">Club</th>
                    <th scope="col" className="px-3 py-3 sm:px-6 text-right font-medium">Points</th>
                  </tr>
                </thead>
                <tbody aria-hidden="true">
                  {[1, 2, 3, 4].map((n) => (
                    <tr key={n} className="border-b border-steel/10 even:bg-tint/50">
                      <td className="px-3 py-4 sm:px-6 font-display text-lg font-bold text-fed tnum">{n}</td>
                      <td className="px-3 py-4 sm:px-6"><span className="block h-2.5 w-32 rounded-full bg-steel/15" /></td>
                      <td className="hidden px-3 py-4 sm:px-6 sm:table-cell"><span className="block h-2.5 w-24 rounded-full bg-steel/10" /></td>
                      <td className="px-3 py-4 sm:px-6"><span className="ml-auto block h-2.5 w-10 rounded-full bg-steel/15" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-white/40 to-white/90 p-6">
                <p className="max-w-sm rounded-xl border border-steel/15 bg-white px-5 py-4 text-center text-[0.9375rem] text-ink/80 shadow-card">
                  The first national ranking will be published after the next GFP-sanctioned event.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

/* 8 + 9 — Recognition and Pakistan on the international mat (scroll-linked timeline) */
const milestones = [
  { date: '2007', title: 'UWW regulates grappling', body: 'United World Wrestling officially introduces grappling among its regulated wrestling styles.' },
  { date: '4–6 May 2024', title: 'Pakistan at the Asian Championships', body: 'Pakistan is one of six nations at the 2024 Asian Grappling Championships in Tagaytay, Philippines, where 222 competitors took part.' },
  { date: 'May 2025', title: 'Current UWW rules edition', body: 'The UWW International Grappling Rules (May 2025) govern every GFP-sanctioned event.' },
  { date: '6 July 2026', title: 'A dedicated UWW office', body: 'UWW opens a Grappling, MMA and Pankration office at the Maison du Sport International in Lausanne.' },
  { date: '23–29 Nov 2026', title: 'World Championships, Baku', body: 'U15, U17, U20 and Senior categories — the next international target for Pakistan’s national team.', highlight: true },
]

export function Recognition() {
  return (
    <Section tone="dark" className="grain overflow-hidden">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              dark
              eyebrow="Recognition"
              title="Recognition and Affiliations"
              lead="GFP is listed as a national federation by United World Wrestling, the international governing body for wrestling recognised by the International Olympic Committee."
            />
            <Reveal type="pop" delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Button href={org.uwwProfile} variant="onDark" icon="external">View the UWW record</Button>
              <Button to="/about/affiliations" variant="onDark" icon="arrow">Our affiliations</Button>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Reveal type="text">
            <h2 className="t-h2 mb-12 text-white">Pakistan on the International Mat</h2>
          </Reveal>
          <ScrollTimeline items={milestones} />
        </div>
      </div>
    </Section>
  )
}

/* 10 — Women and youth: two mask-revealed panels */
export function WomenYouth() {
  const youthImg = imageById('youth-grappling-armlock')
  return (
    <Section tone="white">
      <div className="container-site">
        <SectionHeading eyebrow="Community" title="Grappling for Women and Young Athletes" />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <MaskReveal from="bottom" className="rounded-3xl">
            <Link
              to="/women"
              data-cursor="View"
              className="group/w relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-fed p-8 text-white lg:p-10"
            >
              {/* Women's Gi match, 3rd Grapple Mania 2025 — graded into the brand green */}
              <img
                src={assetPath('/media/grapple-mania-3-2025-640.webp')}
                srcSet={`${assetPath('/media/grapple-mania-3-2025-640.webp')} 640w, ${assetPath('/media/grapple-mania-3-2025.webp')} 1024w`}
                sizes="(min-width: 1024px) 600px, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/w:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-fed-dark via-fed-dark/80 to-fed/30" />
              <p className="t-eyebrow relative text-gold">Women’s Wing</p>
              <p className="t-h3 relative mt-3 max-w-md text-white">
                Women-only classes, female coaches and women’s divisions.
              </p>
              <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Senior women’s weight classes">
                {weightClasses.women.map((w) => (
                  <li key={w} className="rounded-md bg-white/12 px-2.5 py-1 text-sm font-semibold tnum">{w} kg</li>
                ))}
              </ul>
              <span className="relative mt-8 inline-flex items-center gap-2 font-semibold">
                <span className="link-sweep pb-0.5">Explore the Women’s Wing</span>
                <span aria-hidden="true" className="transition-transform group-hover/w:translate-x-1">→</span>
              </span>
            </Link>
          </MaskReveal>
          <MaskReveal from="bottom" delay={0.12} className="rounded-3xl">
            <Link
              to="/youth"
              data-cursor="View"
              className="group/y relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-8 text-white lg:p-10"
            >
              {/* youth armlock practice (CC BY-SA — credit below, outside the link) graded into ink */}
              <img
                src={youthImg.srcSmall}
                srcSet={`${youthImg.srcSmall} ${youthImg.smallWidth}w, ${youthImg.src} ${youthImg.width}w`}
                sizes="(min-width: 1024px) 600px, 100vw"
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/y:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/25" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(40rem_24rem_at_100%_0%,rgb(242_183_5/0.18),transparent_60%)] origin-top-right transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/y:scale-125" />
              <p className="t-eyebrow relative text-gold">Youth</p>
              <p className="t-h3 relative mt-3 max-w-md text-white">
                No strikes, most action on the ground — one of the safest wrestling sports to practise.
              </p>
              <ul className="relative mt-6 flex flex-wrap gap-2" aria-label="Age categories">
                {ageCategories.slice(0, 4).map((a) => (
                  <li key={a.name} className="rounded-md bg-white/10 px-2.5 py-1 text-sm font-semibold">{a.name}</li>
                ))}
              </ul>
              <span className="relative mt-8 inline-flex items-center gap-2 font-semibold">
                <span className="link-sweep pb-0.5">Grappling for young athletes</span>
                <span aria-hidden="true" className="transition-transform group-hover/y:translate-x-1">→</span>
              </span>
            </Link>
            <PhotoCredit image={youthImg} className="absolute top-4 right-5 z-10" />
          </MaskReveal>
        </div>
      </div>
    </Section>
  )
}

/* 11 — Find a club */
const cities = [...new Set(clubs.map((c) => c.city))]

// Same arena surface as the hero/recognition sections, so the page keeps one visual rhythm:
// light → dark → light. Left: city bars sized by academy count. Right: a wall of the member
// academies' own logos in columns that drift in opposite directions as the page scrolls.
const cityCounts = cities
  .map((city) => ({ city, n: clubs.filter((c) => c.city === city).length }))
  .sort((a, b) => b.n - a.n)
const maxCount = Math.max(...cityCounts.map((c) => c.n))
const logoClubs = clubs.filter((c) => c.logo)

export function FindClub() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const soft = useSpring(scrollYProgress, spring.soft)
  const up = useTransform(soft, [0, 1], [60, -60])
  const down = useTransform(soft, [0, 1], [-60, 60])
  const cols = [0, 1, 2].map((k) => logoClubs.filter((_, i) => i % 3 === k))

  return (
    <section ref={ref} className="surface-arena grain section relative overflow-hidden">
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-20">
        <div>
          <SectionHeading
            dark
            eyebrow="Clubs"
            title="Find an Affiliated Grappling Club Near You"
            lead={`${clubs.length} member academies in ${cities.slice(0, -1).join(', ')} and ${cities.at(-1)} train and compete with GFP.`}
          />

          <ul className="mt-10 space-y-3" aria-label="Member academies by city">
            {cityCounts.map(({ city, n }, i) => (
              <li key={city}>
                <Link to="/clubs" className="group/city grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 rounded-lg py-1">
                  <span className="font-medium text-white/85 transition-colors group-hover/city:text-gold">{city}</span>
                  <span className="relative h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="absolute inset-y-0 left-0 origin-left rounded-full bg-gradient-to-r from-fed-light to-gold"
                      style={{ width: `${Math.max(8, (n / maxCount) * 100)}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={inView}
                      transition={{ duration: 1, ease: ease.expo, delay: 0.2 + i * 0.1 }}
                    />
                  </span>
                  <span className="font-display w-8 text-right text-xl font-bold text-white tnum">{n}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Reveal type="pop" delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button to="/clubs" size="lg">Find a club</Button>
            <Button to="/clubs/affiliate" size="lg" variant="onDark">Affiliate your gym</Button>
          </Reveal>
        </div>

        {/* logo wall — decorative (the names are in the directory), faded top and bottom */}
        <div
          aria-hidden="true"
          className="relative grid h-[26rem] grid-cols-3 gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)] lg:h-[32rem]"
        >
          {cols.map((col, k) => (
            <motion.div key={k} className="flex flex-col gap-4 pt-6" style={reduce ? undefined : { y: k === 1 ? down : up }}>
              {[...col, ...col].map((c, i) => (
                <Link
                  key={`${c.id}-${i}`}
                  to="/clubs"
                  tabIndex={-1}
                  className="group/logo flex aspect-square items-center justify-center rounded-2xl border border-white/10 bg-white p-3 shadow-float transition-transform duration-500 hover:-translate-y-1 hover:rotate-[-2deg]"
                >
                  <img src={c.logo} alt="" loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                </Link>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Media teaser — an endless photo carousel: GFP event photos interleaved with credited
   Gi / No-Gi photography. Prev/next + counter on desktop; finger-swipe on mobile. */
const rowGfp = mediaImages.filter((i) => !i.tags?.includes('Results'))
const rowStock = stockImages.filter((i) => /^(bjj-gi|nogi)/.test(i.id))
const carouselItems = Array.from({ length: Math.max(rowGfp.length, rowStock.length) }, (_, i) => [rowGfp[i], rowStock[i]])
  .flat()
  .filter(Boolean)

export function MediaTeaser() {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Media"
            title="From the Mat"
            lead="Event photography and fight-night video from GFP competitions — Gi and No-Gi, from Lahore to the national stage."
          />
          <Reveal type="fade" className="shrink-0">
            <ArrowLink to="/media">Photo & video gallery</ArrowLink>
          </Reveal>
        </div>
      </div>
      <Reveal type="fade" className="mt-10 lg:mt-12">
        <div className="container-site grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {carouselItems.slice(0, 6).map((img) => <figure key={img.id} className="overflow-hidden rounded-2xl border border-steel/15 bg-offwhite">
            <img src={img.srcSmall ?? img.src} srcSet={img.srcSmall ? `${img.srcSmall} ${img.smallWidth}w, ${img.src} ${img.width}w` : undefined} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw" alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="px-5 py-4 text-sm font-medium text-ink">{img.caption || (img.stock ? 'Grappling competition' : 'GFP event')}</figcaption>
          </figure>)}
        </div>
      </Reveal>
    </section>
  )
}

/* 13 — FAQ */
export function HomeFaq() {
  // Must match the FAQPage schema in pages/home.jsx (Google requires the Q&A to be visible)
  const items = faqById(['next-events', 'bjj', 'pwf', 'gi-nogi', 'striking', 'register-docs', 'format', 'find-club'])
  return (
    <Section tone="white">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" className="lg:sticky lg:top-32">
            <Reveal type="fade" delay={0.2} className="mt-8">
              <ArrowLink to="/faq">All questions</ArrowLink>
            </Reveal>
          </SectionHeading>
        </div>
        <div className="lg:col-span-8">
          <FaqList items={items} />
        </div>
      </div>
    </Section>
  )
}

/* 14 — Alerts */
export function Alerts() {
  const facebook = org.social.find((s) => s.label === 'Facebook')
  const instagram = org.social.find((s) => s.label === 'Instagram')
  return (
    // The card straddles the white → ink boundary so the page flows into the footer with no gap
    <Section tone="white" tight className="pt-0 pb-0 bg-[linear-gradient(to_bottom,transparent_50%,var(--color-ink)_50%)]">
      <div className="container-site">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gold px-8 py-12 text-ink shadow-float lg:px-14 lg:py-16"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: ease.expo }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(36rem_18rem_at_100%_0%,rgb(255_255_255/0.35),transparent_70%)]" />
          <motion.div
            className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center"
            initial="hidden"
            whileInView="show"
            viewport={inView}
            variants={sequence(0.1, 0.25)}
          >
            <div className="max-w-2xl">
              <motion.div variants={reveal.text} className="flex items-center gap-3">
                <BadgeCheck aria-hidden="true" className="size-5" />
                <span className="t-eyebrow">Tournament alerts</span>
              </motion.div>
              <motion.h2 variants={reveal.text} className="t-h2 mt-4 text-ink">Get Tournament Alerts</motion.h2>
              <motion.p variants={reveal.text} className="t-lead mt-4 text-ink/80">
                Entry deadlines, weigh-in times and results — announced first on GFP’s official channels. A GFP WhatsApp
                channel is launching soon.
              </motion.p>
            </div>
            <motion.div variants={reveal.pop} className="flex flex-wrap gap-3">
              <Button href={facebook.href} variant="solid" icon="external">Follow on Facebook</Button>
              <Button href={instagram.href} variant="ghost" className="border-2 border-ink/80 text-ink hover:bg-ink hover:text-gold" icon="external">
                <InstagramIcon className="size-[1.1em]" /> Instagram
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
