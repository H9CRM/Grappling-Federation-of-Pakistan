import { PageHero } from '@/components/layout/page-hero'
import { KeyFacts, Notice, SplitSection, Steps } from '@/components/blocks'
import { ArrowLink } from '@/components/brand/button'
import { Reveal } from '@/components/motion/primitives'

export default function Results() {
  return (
    <>
      <PageHero
        image="bjj-gi-5"
        eyebrow="Results & rankings"
        title="Grappling Results and National Rankings"
        lead="Every GFP event counts towards one national ranking, updated after every GFP-sanctioned event."
        crumbs={[{ label: 'Results', href: '/results' }]}
        seo={{
          title: 'Grappling Results & National Rankings Pakistan | GFP',
          description: 'National grappling rankings for Pakistan: how ranking points work, club rankings, results archive and international results.',
          path: '/results',
        }}
      />

      <SplitSection eyebrow="Method" title="How rankings work">
        <Steps
          items={[
            { title: 'Compete at a sanctioned event', body: 'Only GFP-sanctioned events count towards the national ranking.' },
            { title: 'Earn points for 1st, 2nd and 3rd place', body: 'Podium finishes earn ranking points.' },
            { title: 'Points stay in their division', body: 'Points count only in the style, age category and weight class where they were earned. Gi and No-Gi are ranked separately.' },
            { title: 'Rankings refresh after every event', body: 'Each table shows its last-updated date.' },
          ]}
        />
        <Notice className="mt-10">The points table per placing will be published with the first ranking.</Notice>
      </SplitSection>

      <SplitSection eyebrow="Tables" title="National rankings" tone="tint">
        <Reveal type="card" className="rounded-2xl border border-steel/15 bg-white p-8 text-center shadow-card lg:p-12">
          <p className="t-card text-ink">The first national ranking is not yet published.</p>
          <p className="mx-auto mt-3 max-w-md text-steel">
            It will appear here after the next GFP-sanctioned event, with Gi and No-Gi tables, filters and club rankings.
          </p>
          <ArrowLink to="/events" className="mt-6">See upcoming events</ArrowLink>
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="International" title="International results">
        <KeyFacts
          rows={[
            ['Event', '2024 UWW Asian Grappling Championships'],
            ['Venue', 'Tagaytay, Philippines · 4–6 May 2024'],
            ['Field', '222 competitors from six nations'],
            ['Pakistan', 'Represented by Muhammad Ovais Shah'],
            ['Weight class', null],
          ]}
        />
        <Reveal type="fade" className="mt-6">
          <ArrowLink href="https://uww.org/event/senior-u20-u17-u15-veteran-asian-grappling-championships">
            Full results on uww.org
          </ArrowLink>
        </Reveal>
      </SplitSection>
    </>
  )
}
