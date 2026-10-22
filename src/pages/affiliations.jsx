import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { SplitSection, Notice, KeyFacts } from '@/components/blocks'
import { Card } from '@/components/brand/card'
import { Button } from '@/components/brand/button'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { org } from '@/content/site'

const uwwLinks = [
  { t: 'GFP on the UWW national federations directory', href: org.uwwProfile },
  { t: 'UWW International Grappling Rules (May 2025, PDF)', href: org.uwwRulesPdf },
  { t: 'UWW Grappling & Pankration Committee', href: org.uwwCommittee },
]

export default function Affiliations() {
  return (
    <>
      <PageHero
        eyebrow="Affiliations"
        title="UWW Member Federation for Grappling"
        lead="GFP is listed as a national federation by United World Wrestling, the international governing body for wrestling recognised by the International Olympic Committee."
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Affiliations', href: '/about/affiliations' }]}
        seo={{
          title: 'GFP Affiliations | UWW Member Federation for Grappling',
          description: 'How the Grappling Federation of Pakistan is affiliated to United World Wrestling, and its national status.',
          path: '/about/affiliations',
        }}
        actions={<Button href={org.uwwProfile} icon="external">View the UWW record</Button>}
      />

      <SplitSection eyebrow="International" title="United World Wrestling">
        <Reveal type="text" className="t-lead text-ink/85">
          UWW’s Grappling & Pankration Committee promotes Grappling, Pankration and Amateur MMA worldwide, and supports
          referee training and athlete development.
        </Reveal>
        <Stagger className="mt-10 grid gap-3">
          {uwwLinks.map((l) => (
            <Card key={l.href} className="p-0">
              <a href={l.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 px-6 py-5">
                <span className="font-semibold text-ink group-hover/card:text-fed">{l.t}</span>
                <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 text-fed transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
              </a>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="National" title="Pakistan Sports Board and POA" tone="tint">
        <KeyFacts
          rows={[
            ['Pakistan Sports Board', 'Affiliation status to be confirmed'],
            ['Pakistan Olympic Association', 'Affiliation status to be confirmed'],
          ]}
        />
        <Notice className="mt-6">
          GFP publishes its national affiliation status only once it is formally confirmed. New PSB affiliations must
          meet the criteria of the PSB Constitution 2022.
        </Notice>
      </SplitSection>

      <SplitSection eyebrow="Related bodies" title="How GFP relates to other federations">
        <Stagger className="grid gap-5 md:grid-cols-2">
          <Card className="p-7">
            <h3 className="t-card text-ink">Pakistan Wrestling Federation</h3>
            <p className="mt-3 text-ink/75">
              Olympic freestyle and Greco-Roman wrestling in Pakistan is governed by the Pakistan Wrestling Federation,
              while GFP is responsible for UWW grappling. The two are partners under the same international body.
            </p>
          </Card>
          <Card className="p-7">
            <h3 className="t-card text-ink">Pakistan Ju-Jitsu Federation</h3>
            <p className="mt-3 text-ink/75">
              Ju-jitsu is a separate sport governed internationally by the Ju-Jitsu International Federation (JJIF).
              Grappling is governed by United World Wrestling.
            </p>
          </Card>
        </Stagger>
      </SplitSection>
    </>
  )
}
