import { Award, MapPinned, Trophy } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { Checklist, Notice, SplitSection, Steps } from '@/components/blocks'
import { Card, IconTile } from '@/components/brand/card'
import { Button } from '@/components/brand/button'
import { Stagger } from '@/components/motion/primitives'
import { FaqList } from '@/components/faq-list'
import { faqById } from '@/content/faq'

export default function ClubAffiliate() {
  return (
    <>
      <PageHero
        image="senior-inter-club-punjab-2026"
        eyebrow="For gyms"
        title="Affiliate Your Gym with GFP"
        lead="Affiliated clubs appear in the national directory, earn club ranking points and can host sanctioned events."
        crumbs={[{ label: 'Clubs', href: '/clubs' }, { label: 'Affiliate', href: '/clubs/affiliate' }]}
        seo={{
          title: 'Affiliate Your Gym with GFP | Grappling Club Affiliation',
          description: 'Benefits, requirements, fees and steps for affiliating a grappling or BJJ club with the Grappling Federation of Pakistan.',
          path: '/clubs/affiliate',
        }}
        actions={<Button to="/contact">Start your application</Button>}
      />

      <SplitSection eyebrow="Benefits" title="What affiliation gives your club">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {[
            { icon: MapPinned, t: 'National directory', d: 'A listing with a “GFP Affiliated” badge, found by city and style.' },
            { icon: Trophy, t: 'Club rankings', d: 'Your athletes’ results earn club ranking points.' },
            { icon: Award, t: 'Host events', d: 'Apply to host GFP-sanctioned tournaments.' },
          ].map((b) => (
            <Card key={b.t} className="p-7">
              <IconTile icon={b.icon} />
              <h3 className="t-card mt-6 text-ink">{b.t}</h3>
              <p className="mt-2 text-steel">{b.d}</p>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="Requirements" title="What you need" tone="tint">
        <Checklist items={['A registered coach', 'A safe matted training area', 'First aid provision', 'A named safeguarding lead']} />
        <Notice className="mt-8">Affiliation fees will be published here once approved.</Notice>
      </SplitSection>

      <SplitSection eyebrow="Steps" title="How to affiliate">
        <Steps
          items={[
            { title: 'Contact the secretariat', body: 'Tell us your club name, city, styles taught and head coach.' },
            { title: 'Submit your documents', body: 'Coach registration, safeguarding lead and photos of your matted area.' },
            { title: 'Get listed', body: 'Once approved, your club appears in the national directory.' },
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="FAQ" title="Affiliation questions" tone="offwhite">
        <FaqList items={faqById(['affiliate', 'rankings'])} />
      </SplitSection>
    </>
  )
}
