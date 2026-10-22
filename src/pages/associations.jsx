import { PageHero } from '@/components/layout/page-hero'
import { SplitSection, Notice, Steps, CtaBand } from '@/components/blocks'
import { Card } from '@/components/brand/card'
import { Stagger } from '@/components/motion/primitives'

const regions = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad Capital Territory', 'Gilgit-Baltistan', 'Azad Jammu & Kashmir']

export default function Associations() {
  return (
    <>
      <PageHero
        image="bjj-gi-4"
        eyebrow="Structure"
        title="Provincial Grappling Associations in Pakistan"
        lead="Each affiliated association organises regional events and nominates athletes for GFP national championships."
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Associations', href: '/about/associations' }]}
        seo={{
          title: 'Provincial Grappling Associations in Pakistan | GFP',
          description: 'Provincial and regional grappling associations affiliated to the Grappling Federation of Pakistan, and how to form one.',
          path: '/about/associations',
        }}
      />

      <SplitSection eyebrow="Regions" title="Associations by region">
        <Notice className="mb-8">
          Association affiliations are being verified. Each card will list office-bearers, contact details, clubs and
          events once confirmed.
        </Notice>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {regions.map((r) => (
            <Card key={r} className="p-6">
              <h3 className="t-card text-ink">{r}</h3>
              <p className="t-caption mt-2 text-steel">Affiliation pending</p>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="Get involved" title="How to form an association" tone="tint">
        <Steps
          items={[
            { title: 'Bring clubs together', body: 'Gather the grappling clubs in your province or region that want to organise together.' },
            { title: 'Nominate office-bearers', body: 'Agree a president, general secretary and a safeguarding lead.' },
            { title: 'Apply to GFP', body: 'Write to the GFP secretariat with your office-bearers, member clubs and planned events.' },
          ]}
        />
      </SplitSection>

      <CtaBand
        title="Start an association in your region."
        primary={{ label: 'Contact the secretariat', to: '/contact' }}
      />
    </>
  )
}
