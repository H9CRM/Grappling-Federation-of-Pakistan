import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { Ban, Clock, Octagon, ShieldAlert, Trophy, Timer, TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'
import { styles, ageCategories } from '@/content/sport'
import {
  boutDuration,
  competition,
  illegal,
  kit,
  passivity,
  rulesEdition,
  scoring,
  scoringNotes,
  tieBreak,
  victories,
  weightsByAge,
} from '@/content/rules'
import { org } from '@/content/site'
import { faqById } from '@/content/faq'
import { faqSchema } from '@/components/seo'
import { PageHero } from '@/components/layout/page-hero'
import { Section, SectionHeading } from '@/components/layout/section'
import { Checklist, KeyFacts, Notice, SplitSection, Steps } from '@/components/blocks'
import { Button } from '@/components/brand/button'
import { Card, IconTile } from '@/components/brand/card'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { FaqList } from '@/components/faq-list'
import { MatDiagram } from '@/components/mat-diagram'

const faq = faqById(['bout-length', 'how-to-win', 'striking', 'heel-hooks', 'gi-nogi', 'weights', 'format', 'women-kit'])

const toc = [
  ['glance', 'At a glance'],
  ['mat', 'The mat'],
  ['scoring', 'Scoring'],
  ['winning', 'How to win'],
  ['weights', 'Weight classes'],
  ['format', 'Competition format'],
  ['passivity', 'Passivity'],
  ['illegal', 'Illegal actions'],
  ['kit', 'Kit'],
  ['faq', 'FAQ'],
]

const jump = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

export default function Rules() {
  return (
    <>
      <PageHero
        image="nogi-taking-the-back"
        eyebrow="Rulebook"
        title="UWW Grappling Rules and Weight Classes"
        lead={`GFP events follow the ${rulesEdition.name} (${rulesEdition.edition} edition). Here is everything an athlete, coach or parent needs, in plain language.`}
        crumbs={[{ label: 'Rules', href: '/rules' }]}
        seo={{
          title: 'UWW Grappling Rules & Weight Classes | GFP Pakistan',
          description:
            'Grappling rules in plain language: scoring, bout length, how to win, weight classes for every age, the 9 m mat, passivity, illegal holds and kit — from the UWW May 2025 rulebook.',
          path: '/rules',
          schema: [
            faqSchema(faq),
            {
              '@type': 'Article',
              headline: 'UWW Grappling Rules and Weight Classes',
              about: 'Grappling competition rules',
              isBasedOn: org.uwwRulesPdf,
              publisher: { '@type': 'SportsOrganization', name: org.name },
            },
          ],
        }}
        actions={<Button href={org.uwwRulesPdf} icon="external">Official rules PDF</Button>}
      />

      {/* On this page — answer engines and people both benefit from explicit section anchors */}
      <nav aria-label="On this page" className="border-b border-steel/10 bg-white">
        <ul className="container-site flex gap-2 overflow-x-auto py-4 [scrollbar-width:none]">
          {toc.map(([id, label]) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                onClick={jump(id)}
                className="inline-flex h-9 items-center rounded-full border border-steel/20 px-3.5 text-sm font-medium text-ink/80 transition-colors hover:border-fed hover:text-fed"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section tone="white" tight id="glance" className="scroll-mt-24">
        <div className="container-site">
          <SectionHeading eyebrow="At a glance" title="Grappling rules in 60 seconds" />
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Timer, t: '5-minute bouts', d: 'One period for U17, U20 and Seniors; 4 minutes for U13, U15 and Veterans.' },
              { icon: Trophy, t: 'Submission wins', d: 'A tap ends the bout at once. So does a 15-point lead.' },
              { icon: Ban, t: 'No strikes', d: 'Points come from takedowns, reversals, dominant positions and attacks.' },
              { icon: Octagon, t: '9 m mat', d: 'A 7 m central area, 1 m passivity zone and 1.5 m protection border.' },
            ].map((c) => (
              <Card key={c.t} className="p-6">
                <IconTile icon={c.icon} />
                <h3 className="t-card mt-5 text-ink">{c.t}</h3>
                <p className="mt-2 text-[0.9375rem] text-steel">{c.d}</p>
              </Card>
            ))}
          </Stagger>
        </div>
      </Section>

      <SplitSection eyebrow="Styles" title="Two competition styles" tone="offwhite">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {styles.map((s) => (
            <Card key={s.id} className="p-7">
              <p className="t-eyebrow text-fed">{s.alias}</p>
              <h3 className="t-card mt-2 text-ink">{s.name}</h3>
              <p className="mt-1 text-sm font-medium text-steel">{s.kit}</p>
              <p className="mt-4 text-ink/75">{s.summary}</p>
            </Card>
          ))}
        </Stagger>
      </SplitSection>

      <Section tone="tint" id="mat" className="scroll-mt-24 overflow-hidden">
        <div aria-hidden="true" className="mat-grid absolute inset-0" />
        <div className="container-site relative">
          <SectionHeading
            eyebrow="Article 4"
            title="The competition mat"
            lead="The competition mat is 9 metres in diameter — a 7 m central wrestling area ringed by a 1 m passivity zone — with a 1.5 m protection border around it. Hover or tap a zone to highlight it."
          />
          <MatDiagram className="mt-12" />
        </div>
      </Section>

      <SplitSection eyebrow="Article 36" title="How points are scored" id="scoring">
        <Reveal type="fade" className="overflow-hidden rounded-2xl border border-steel/15 bg-white shadow-card">
          <table className="w-full text-left text-[0.9375rem]">
            <caption className="sr-only">Technical points in UWW grappling</caption>
            <thead className="bg-fed text-white">
              <tr>
                <th scope="col" className="px-5 py-3.5 font-semibold">Action</th>
                <th scope="col" className="px-5 py-3.5 text-center font-semibold">Points</th>
                <th scope="col" className="hidden px-5 py-3.5 font-semibold sm:table-cell">What counts</th>
              </tr>
            </thead>
            <tbody>
              {scoring.map((s) => (
                <tr key={s.action} className="border-t border-steel/10 align-top even:bg-tint/40">
                  <th scope="row" className="px-5 py-3.5 font-semibold text-ink">
                    {s.action}
                    <span className="mt-1 block text-[0.8125rem] font-normal text-steel sm:hidden">{s.detail}</span>
                  </th>
                  <td className="px-5 py-3.5 text-center">
                    <span className="font-display inline-flex min-w-10 justify-center rounded-lg bg-tint px-2 py-0.5 text-xl font-bold text-fed tnum">{s.points}</span>
                  </td>
                  <td className="hidden px-5 py-3.5 text-ink/75 sm:table-cell">{s.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Checklist items={scoringNotes} className="mt-8" />
      </SplitSection>

      <SplitSection eyebrow="Articles 29 & 37" title="How a bout is won" tone="offwhite" id="winning">
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {victories.map((v) => (
            <Card key={v.type} className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="t-card text-ink">{v.type}</h3>
                <span className="font-display shrink-0 rounded-lg bg-gold px-2 py-0.5 text-sm font-bold text-ink tnum" title="Classification points: winner – loser">
                  {v.cp}
                </span>
              </div>
              <p className="mt-2 text-[0.9375rem] text-steel">{v.detail}</p>
            </Card>
          ))}
        </Stagger>
        <p className="t-caption mt-4 text-steel">Gold badges show classification points (winner – loser), used to rank athletes across a competition.</p>
        <h3 className="t-h3 mt-12 text-fed">If the score is tied</h3>
        <Steps className="mt-6" items={tieBreak.map((t) => ({ title: t }))} />
        <h3 className="t-h3 mt-12 text-fed">Bout length</h3>
        <KeyFacts className="mt-6" rows={boutDuration.map((b) => [b.ages, b.time])} />
      </SplitSection>

      <WeightsByAge />

      <SplitSection eyebrow="Article 7" title="Age categories" tone="offwhite">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ageCategories.map((a) => (
            <Stagger.Item key={a.name} type="pop" className="rounded-xl border border-steel/15 bg-white p-5 shadow-control">
              <p className="font-display text-2xl font-bold text-fed">{a.name}</p>
              <p className="t-caption mt-1 text-steel">Ages {a.ages}</p>
            </Stagger.Item>
          ))}
        </Stagger>
        <p className="t-caption mt-4 text-steel">
          Age is set by year of birth. U15, U17 and U20 athletes may compete one year early with medical and parental
          authorisation.
        </p>
      </SplitSection>

      <SplitSection eyebrow="Articles 8, 11 & 15" title="Competition format" id="format">
        <KeyFacts rows={competition.map((c) => [c.k, c.v])} />
      </SplitSection>

      <SplitSection eyebrow="Articles 39–41" title="Passivity and stalling" tone="tint" id="passivity">
        <Steps items={passivity.map((p) => ({ title: p }))} />
      </SplitSection>

      <Section tone="white" id="illegal" className="scroll-mt-24">
        <div className="container-site">
          <SectionHeading eyebrow="Article 42" title="Illegal actions" lead="Each caution gives the opponent 1 point; four cautions lose the bout." />
          <Stagger className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { icon: TriangleAlert, t: '1 caution', tone: 'border-gold-dark/40', list: illegal.caution },
              { icon: ShieldAlert, t: '1 caution — or 4 if it injures', tone: 'border-signal/30', list: illegal.cautionOrFour },
              { icon: Ban, t: 'Immediate disqualification', tone: 'border-signal/60', list: illegal.disqualification },
            ].map((col) => (
              <Card key={col.t} className={cn('border-t-4 p-6', col.tone)}>
                <div className="flex items-center gap-3">
                  <col.icon aria-hidden="true" className="size-5 text-ink" />
                  <h3 className="t-card text-ink">{col.t}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-[0.9375rem] text-ink/80">
                  {col.list.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-steel/50" />
                      {x}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Stagger>
          <Notice className="mt-8">
            <strong className="text-ink">Youth restrictions:</strong> {illegal.youth}
          </Notice>
        </div>
      </Section>

      <SplitSection eyebrow="Article 5" title="Kit and appearance" tone="offwhite" id="kit">
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['Grappling (No-Gi)', kit.nogi],
            ['Grappling Gi', kit.gi],
          ].map(([t, list]) => (
            <Card key={t} className="p-6">
              <h3 className="t-card text-ink">{t}</h3>
              <Checklist items={list} className="mt-4 text-[0.9375rem]" />
            </Card>
          ))}
        </div>
        <h3 className="t-h3 mt-10 text-fed">For everyone</h3>
        <Checklist items={kit.all} className="mt-4" />
      </SplitSection>

      <SplitSection eyebrow="FAQ" title="Rules questions" tone="tint" id="faq">
        <FaqList items={faq} />
        <p className="t-caption mt-8 flex items-center gap-2 text-steel">
          <Clock aria-hidden="true" className="size-4" /> Source: {rulesEdition.name}, {rulesEdition.edition}. If this page and
          the official PDF differ, the PDF applies.
        </p>
      </SplitSection>
    </>
  )
}

/** Weight classes for every age group: age tabs × male/female, chips animate on switch. */
function WeightsByAge() {
  const [age, setAge] = useState('Seniors')
  const row = weightsByAge.find((w) => w.age === age)
  return (
    <Section tone="tint" id="weights" className="scroll-mt-24">
      <div className="container-site">
        <SectionHeading eyebrow="Article 7" title="Weight classes by age" lead="The same categories apply to Grappling and Grappling Gi. Seniors may move up one category, except into the heaviest." />
        <LayoutGroup id="age-tabs">
          <div role="tablist" aria-label="Age category" className="mt-10 -mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
            <div className="inline-flex rounded-full border border-fed/15 bg-white p-1 shadow-control">
              {weightsByAge.map((w) => (
                <button
                  key={w.age}
                  role="tab"
                  id={`age-${w.age}`}
                  aria-selected={age === w.age}
                  aria-controls="age-panel"
                  onClick={() => setAge(w.age)}
                  className={cn('relative h-10 shrink-0 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors sm:px-5', age === w.age ? 'text-white' : 'text-fed')}
                >
                  {age === w.age && <motion.span layoutId="age-pill" className="absolute inset-0 rounded-full bg-fed" transition={spring.layout} />}
                  <span className="relative">{w.age}</span>
                </button>
              ))}
            </div>
          </div>
        </LayoutGroup>

        <div id="age-panel" role="tabpanel" aria-labelledby={`age-${age}`} className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            [age === 'Seniors' || age === 'U20' || age === 'Veterans' ? 'Men' : 'Boys', row.male],
            [age === 'Seniors' || age === 'U20' || age === 'Veterans' ? 'Women' : 'Girls', row.female],
          ].map(([label, list]) => (
            <div key={label} className="rounded-2xl border border-steel/15 bg-white p-6 shadow-card">
              <p className="flex items-baseline justify-between">
                <span className="t-card text-ink">{label}</span>
                <span className="t-caption text-steel">Ages {row.ages}</span>
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={age + label}
                  className="mt-4 flex flex-wrap gap-2"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  variants={{ show: { transition: { staggerChildren: 0.025 } } }}
                >
                  {list === '—' ? (
                    <li className="text-steel">No veterans categories for women in the current rules.</li>
                  ) : (
                    list.split(', ').map((w) => (
                      <motion.li
                        key={w}
                        variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: ease.out } } }}
                        className="font-display rounded-lg border border-fed/20 bg-tint/60 px-3 py-1 text-lg font-semibold text-fed tnum"
                      >
                        {w} kg
                      </motion.li>
                    ))
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
