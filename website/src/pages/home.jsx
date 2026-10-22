import { Seo, faqSchema } from '@/components/seo'
import { SITE_URL } from '@/content/site'
import { faqById } from '@/content/faq'
import { HomeHero } from '@/components/home/hero'
import {
  Alerts,
  ChoosePath,
  FindClub,
  HomeFaq,
  MediaTeaser,
  QuickAnswer,
  Recognition,
  ResultsSnapshot,
  StatsBand,
  UpcomingEvents,
  WhatIsGrappling,
  WomenYouth,
} from '@/components/home/sections'

// Section order follows strategy §4.3. The News section (#12) is omitted until the first
// dated posts exist — an empty news block hurts trust more than a missing one.
export default function Home() {
  return (
    <>
      <Seo
        title="Grappling Federation of Pakistan | UWW Grappling, Gi & No-Gi"
        description="The UWW-recognised national federation for grappling in Pakistan. Find 2026 tournaments, results, rankings, affiliated clubs and athlete registration."
        path="/"
        schema={[
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            name: 'Grappling Federation of Pakistan',
            alternateName: 'GFP',
            url: SITE_URL,
            inLanguage: 'en-PK',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          faqSchema(faqById(['next-events', 'bjj', 'pwf', 'gi-nogi', 'striking', 'register-docs', 'format', 'find-club'])),
        ]}
      />
      <HomeHero />
      <QuickAnswer />
      <StatsBand />
      <UpcomingEvents />
      <ChoosePath />
      <WhatIsGrappling />
      <ResultsSnapshot />
      <Recognition />
      <WomenYouth />
      <FindClub />
      <MediaTeaser />
      <HomeFaq />
      <Alerts />
    </>
  )
}
