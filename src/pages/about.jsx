import { Landmark, Map, Scale, Users } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { SplitSection, CtaBand, Notice } from '@/components/blocks'
import { Card, IconTile } from '@/components/brand/card'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { ScrollTimeline } from '@/components/motion/scroll-story'
import { disciplines, styles } from '@/content/sport'
import { faqs } from '@/content/faq'
import { Section, SectionHeading } from '@/components/layout/section'
import { FaqExplorer } from '@/components/faq-explorer'

const history = [
  { date: '2007', title: 'Grappling joins UWW', body: 'United World Wrestling introduces grappling among its regulated wrestling styles.' },
  { date: 'May 2024', title: 'Asian Championships debut', body: 'Pakistan competes at the 2024 Asian Grappling Championships in Tagaytay, Philippines.' },
  { date: '2025', title: 'Warrior Grappling League', body: 'GFP’s Gi and No-Gi league is held at Punjab College, Lahore.' },
  { date: 'Nov 2026', title: 'World Championships target', body: 'The national team prepares for the UWW World Championships in Baku.', highlight: true },
]

export default function About() {
  return (
    <>
      <PageHero
        image="ift-grappling-pass"
        eyebrow="About GFP"
        title="About the Grappling Federation of Pakistan"
        lead="The Grappling Federation of Pakistan is the national federation responsible for developing grappling, in both Gi and No-Gi styles, across Pakistan’s provinces and territories."
        crumbs={[{ label: 'About', href: '/about' }]}
        seo={{
          title: 'About GFP | Grappling Federation of Pakistan History',
          description: 'Who we are, what we do and how grappling is governed in Pakistan under United World Wrestling rules.',
          path: '/about',
          schema: { '@type': 'AboutPage', name: 'About the Grappling Federation of Pakistan' },
        }}
      />

      <SplitSection eyebrow="Mission" title="Our mission">
        <Reveal type="text" className="t-lead text-ink/85">
          <p>
            GFP applies the UWW International Grappling Rules, which UWW introduced in 2007 to regulate submission
            grappling, Brazilian Jiu-Jitsu, luta livre, catch wrestling and related styles.
          </p>
          <p className="mt-5">
            We exist to give Pakistani grapplers a fair, safe and recognised pathway — from a first club tournament to
            selection for UWW Asian and World Championships.
          </p>
        </Reveal>
      </SplitSection>

      <section className="section-tight surface-arena grain relative overflow-hidden">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-eyebrow text-fed-light">History</p>
            <Reveal as="h2" type="text" className="t-h2 mt-3 text-white">Milestones</Reveal>
            <Notice tone="dark" className="mt-8">GFP’s founding year will be added once it is documented.</Notice>
          </div>
          <div className="lg:col-span-8">
            <ScrollTimeline items={history} />
          </div>
        </div>
      </section>

      <SplitSection eyebrow="Scope" title="Styles we govern" tone="tint">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {styles.map((s) => (
            <Card key={s.id} className="p-7">
              <p className="t-eyebrow text-fed">{s.alias}</p>
              <h3 className="t-card mt-3 text-ink">{s.name}</h3>
              <p className="mt-1 text-sm font-medium text-steel">{s.kit}</p>
              <p className="mt-4 text-ink/75">{s.summary}</p>
            </Card>
          ))}
        </Stagger>
        <Reveal type="text" className="mt-10">
          <p className="font-semibold text-ink">UWW grappling brings together:</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <li key={d} className="rounded-full border border-fed/20 bg-white px-3.5 py-1.5 text-sm font-medium text-fed">{d}</li>
            ))}
          </ul>
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="Structure" title="How GFP is organised">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {[
            { icon: Landmark, t: 'International', d: 'Member federation of United World Wrestling for the grappling style.', to: '/about/affiliations' },
            { icon: Users, t: 'Executive', d: 'Led by President Aqeel Ahmed Jamil and General Secretary Faiz Alam Faizi, supported by committees.', to: '/about/leadership' },
            { icon: Map, t: 'Provinces', d: 'Provincial associations organise regional events and nominate athletes.', to: '/about/associations' },
            { icon: Scale, t: 'Governance', d: 'Anti-doping, safeguarding, conduct and complaints policies.', to: '/policies/safeguarding' },
          ].map((c) => (
            <Card key={c.t} to={c.to} className="p-7">
              <IconTile icon={c.icon} />
              <h3 className="t-card mt-6 text-ink">{c.t}</h3>
              <p className="mt-2 text-steel">{c.d}</p>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <Section tone="tint" id="faq" className="scroll-mt-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions about GFP and grappling"
            lead={`${faqs.length} answers on the federation, the rules, competing, kit, safety and clubs. Search, filter by topic, or tap a popular word.`}
          />
          <FaqExplorer items={faqs} className="mt-10" />
        </div>
      </Section>

      <CtaBand
        title="Compete under recognised rules."
        body="Register once and your athlete profile is valid for every GFP-sanctioned event in the calendar year."
        primary={{ label: 'Register as an athlete', to: '/register' }}
        secondary={{ label: 'See events', to: '/events' }}
      />
    </>
  )
}
