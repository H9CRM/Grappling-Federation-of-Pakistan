import { Gavel, GraduationCap, UserRound } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { Checklist, KeyFacts, Notice, SplitSection, Steps } from '@/components/blocks'
import { Card, IconTile } from '@/components/brand/card'
import { Button } from '@/components/brand/button'
import { Stagger } from '@/components/motion/primitives'
import { FaqList } from '@/components/faq-list'
import { faqSchema } from '@/components/seo'
import { faqById } from '@/content/faq'

const faq = faqById(['register-docs', 'profile', 'licence', 'women-kit'])

export default function Register() {
  return (
    <>
      <PageHero
        image="bjj-gi-1"
        eyebrow="Membership"
        title="Grappling Athlete Registration in Pakistan"
        lead="GFP registration gives you one athlete profile valid for all GFP-sanctioned events in the calendar year."
        crumbs={[{ label: 'Register', href: '/register' }]}
        seo={{
          title: 'Grappling Athlete Registration Pakistan | GFP Membership',
          description: 'Register as a GFP athlete, coach or referee: documents, fees, under-18 consent and licences.',
          path: '/register',
          schema: faqSchema(faq),
        }}
        actions={<Button to="/events" icon="arrow">See events open for entry</Button>}
      />

      <SplitSection eyebrow="Who" title="Membership types">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {[
            { icon: UserRound, t: 'Athlete', d: 'Compete in GFP-sanctioned events and earn national ranking points.' },
            { icon: GraduationCap, t: 'Coach', d: 'Register with the federation and enter athletes from your club.' },
            { icon: Gavel, t: 'Referee', d: 'Officiate GFP events after completing referee training.' },
          ].map((m, i) => (
            <Card key={m.t} className="p-7">
              <IconTile icon={m.icon} tone={i === 0 ? 'gold' : 'green'} />
              <h3 className="t-card mt-6 text-ink">{m.t}</h3>
              <p className="mt-2 text-steel">{m.d}</p>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="Before you start" title="What you need" tone="tint">
        <Checklist
          items={[
            'CNIC, or B-Form for under-18s',
            'A recent photo',
            'Your club name',
            'Parental consent if you are under 18',
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="How" title="How to register">
        <Steps
          items={[
            { title: 'Create your athlete profile', body: 'One profile, valid for every GFP-sanctioned event in the calendar year.' },
            { title: 'Upload your documents', body: 'CNIC or B-Form, photo, club and consent for under-18s.' },
            { title: 'Enter an event', body: 'Choose your style, age category and weight class on the event page.' },
            { title: 'Weigh in and compete', body: 'Check the weigh-in time on the event page before travelling.' },
          ]}
        />
        <Notice className="mt-10">
          Online registration opens through GFP’s competition platform with the first sanctioned event of the season.
          Fees in PKR are published with each event.
        </Notice>
      </SplitSection>

      <SplitSection eyebrow="International" title="UWW licence" tone="offwhite">
        <KeyFacts
          rows={[
            ['Who needs it', 'Athletes selected for UWW championships'],
            ['Validity', 'Current year only'],
            ['When to request', 'At least two months before the competition'],
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="FAQ" title="Registration questions">
        <FaqList items={faq} />
      </SplitSection>
    </>
  )
}
