import { BookOpen, ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand, Checklist, Notice, SplitSection, Steps } from '@/components/blocks'
import { Card } from '@/components/brand/card'
import { Stagger } from '@/components/motion/primitives'
import { org } from '@/content/site'
import { FaqList } from '@/components/faq-list'
import { faqById } from '@/content/faq'
import { faqSchema } from '@/components/seo'

const faq = faqById(['become-referee', 'coach-register'])

export default function Education() {
  return (
    <>
      <PageHero
        image="amaar-vs-yashin-2026"
        eyebrow="Education"
        title="Grappling Referee and Coach Courses in Pakistan"
        lead="GFP referees are trained on the UWW International Grappling Rules, covering scoring, passivity, illegal holds and the roles of referee, judge and mat chairman."
        crumbs={[{ label: 'Education', href: '/education' }]}
        seo={{
          title: 'Grappling Referee & Coach Courses Pakistan | GFP Education',
          description: 'Referee and coach pathways, upcoming courses and UWW rules resources from the Grappling Federation of Pakistan.',
          path: '/education',
          schema: faqSchema(faq),
        }}
      />

      <SplitSection eyebrow="Officials" title="Referee pathway">
        <Steps
          items={[
            { title: 'Learn the rules', body: 'Study the UWW International Grappling Rules (May 2025 edition).' },
            { title: 'Attend a referee seminar', body: 'Scoring, passivity, illegal holds, and the referee, judge and mat chairman roles.' },
            { title: 'Officiate under supervision', body: 'Gain mat time at GFP-sanctioned events.' },
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="On the mat" title="What an official needs to understand" tone="offwhite">
        <p className="t-lead text-ink/85">A referee must recognise legal scoring actions, submissions, passivity, boundary situations and when to stop a bout for safety. The referee, judge and mat chairman work together. Read the current UWW rules before attending a seminar; practical evaluation and appointment details should be confirmed with GFP.</p>
      </SplitSection>

      <SplitSection eyebrow="Coaches" title="Coach pathway" tone="tint">
        <Steps
          items={[
            { title: 'Register as a coach', body: 'Coach registration is required for affiliated clubs.' },
            { title: 'Safeguarding and first aid', body: 'Essential training for anyone coaching under-18s.' },
            { title: 'Competition coaching', body: 'Corner rules, weigh-ins and entering athletes.' },
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="Preparation" title="Before you coach at an event">
        <Checklist items={[
          'Read the event’s age, weight, kit, weigh-in and entry instructions',
          'Review permitted techniques for each athlete’s age category',
          'Have an emergency contact and injury information available',
          'Know who to contact about safeguarding or a rules question',
        ]} />
      </SplitSection>

      <SplitSection eyebrow="Calendar" title="Upcoming courses">
        <Notice>No courses are scheduled yet. Register your interest and we’ll contact you when the first seminar is announced.</Notice>
      </SplitSection>

      <SplitSection eyebrow="Resources" title="Resources" tone="offwhite">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {[
            { t: 'UWW International Grappling Rules (PDF)', href: org.uwwRulesPdf },
            { t: 'UWW Grappling & Pankration Committee', href: org.uwwCommittee },
          ].map((r) => (
            <Card key={r.t} className="p-0">
              <a href={r.href} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-6">
                <BookOpen aria-hidden="true" className="size-6 shrink-0 text-fed" />
                <span className="flex-1 font-semibold text-ink group-hover/card:text-fed">{r.t}</span>
                <ExternalLink aria-hidden="true" className="size-4 text-steel" />
              </a>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="Questions" title="Education FAQ">
        <FaqList items={faq} />
      </SplitSection>

      <CtaBand
        title="Register your interest in a course."
        primary={{ label: 'Contact us', to: '/contact' }}
      />
    </>
  )
}
