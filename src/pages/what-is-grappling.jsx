import { PageHero } from '@/components/layout/page-hero'
import { CtaBand, Checklist, SplitSection, Steps } from '@/components/blocks'
import { Reveal } from '@/components/motion/primitives'
import { faqSchema } from '@/components/seo'
import { faqById } from '@/content/faq'
import { FaqList } from '@/components/faq-list'

const faq = faqById(['gi-nogi', 'bjj', 'jujitsu'])

const compare = [
  { sport: 'Grappling', body: 'United World Wrestling', win: 'Points or submission', kit: 'Rashguard/shorts or Gi' },
  { sport: 'Freestyle wrestling', body: 'United World Wrestling (PWF in Pakistan)', win: 'Points or fall — no submissions', kit: 'Singlet' },
  { sport: 'Brazilian Jiu-Jitsu', body: 'One of the styles UWW grappling brings together', win: 'Points or submission', kit: 'Gi or No-Gi' },
  { sport: 'Ju-jitsu', body: 'JJIF (Pakistan Ju-Jitsu Federation)', win: 'Separate JJIF rules', kit: 'Ju-jitsu gi' },
]

export default function WhatIsGrappling() {
  return (
    <>
      <PageHero
        image="nogi-grappling"
        eyebrow="Explainer"
        title="What Is Grappling? Gi vs No-Gi Explained"
        lead="Grappling is a combat sport without strikes in which athletes score by taking down, controlling and submitting an opponent with holds, joint locks and chokes."
        crumbs={[{ label: 'What is grappling', href: '/what-is-grappling' }]}
        seo={{
          title: 'What Is Grappling? Gi vs No-Gi Explained | GFP Pakistan',
          description: 'What grappling is, how Gi and No-Gi differ, and how grappling compares with wrestling, BJJ and ju-jitsu.',
          path: '/what-is-grappling',
          schema: faqSchema(faq),
        }}
      />

      <SplitSection eyebrow="Definition" title="Two styles, one sport">
        <Reveal type="text" className="t-lead text-ink/85">
          UWW recognises two styles: Grappling, in rashguard and shorts (No-Gi), and Grappling Gi, in a kimono. Grappling
          differs from freestyle wrestling because athletes can win by submission, and it differs from ju-jitsu under the
          JJIF because it is governed internationally by United World Wrestling.
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="The bout" title="What happens in a grappling match?" tone="offwhite">
        <p className="t-lead text-ink/85">A bout starts standing. Athletes may take an opponent down, improve position on the ground and attempt a legal submission. The referee awards points for defined actions and can stop the bout for a submission, a rules infringement or safety. The permitted techniques and bout time depend on the age category, so competitors should read the current event rules.</p>
      </SplitSection>

      <SplitSection eyebrow="Gi or No-Gi" title="Which style should a beginner try?">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-steel/15 bg-white p-6 shadow-card"><h3 className="t-card text-fed">Grappling Gi</h3><p className="mt-3 text-ink/80">Athletes wear a kimono. Grips on the Gi are part of movement and control. Ask a club whether it provides a loan Gi for a trial class.</p></div>
          <div className="rounded-2xl border border-steel/15 bg-white p-6 shadow-card"><h3 className="t-card text-fed">Grappling (No-Gi)</h3><p className="mt-3 text-ink/80">Athletes wear a rashguard and shorts. Clothing grips are not used, so control relies more on body position and movement.</p></div>
        </div>
      </SplitSection>

      <SplitSection eyebrow="Compare" title="Grappling, wrestling, BJJ and ju-jitsu" tone="tint">
        <Reveal type="fade" className="overflow-x-auto rounded-2xl border border-steel/15 bg-white shadow-card">
          <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
            <caption className="sr-only">Comparison of grappling with related sports</caption>
            <thead className="bg-fed text-white">
              <tr>
                {['Sport', 'Governed by', 'How you win', 'Kit'].map((h) => (
                  <th key={h} scope="col" className="px-5 py-3.5 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((r) => (
                <tr key={r.sport} className="border-t border-steel/10 even:bg-tint/50">
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">{r.sport}</th>
                  <td className="px-5 py-4 text-ink/80">{r.body}</td>
                  <td className="px-5 py-4 text-ink/80">{r.win}</td>
                  <td className="px-5 py-4 text-ink/80">{r.kit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="Why grapple" title="Benefits">
        <Checklist
          items={[
            'No strikes — most action takes place on the ground',
            'Builds strength, flexibility and problem-solving under pressure',
            'Clear weight classes and age categories from U13 to veterans',
            'Modest kit options, including the Gi and long-sleeve rashguards',
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="Get started" title="How to start" tone="offwhite">
        <Steps
          items={[
            { title: 'Find an affiliated club', body: 'Train with a registered coach in a safe, matted space.' },
            { title: 'Learn the basics', body: 'Takedowns, control positions and safe tapping.' },
            { title: 'Enter your first event', body: 'Register once with GFP and enter any sanctioned tournament.' },
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="Questions" title="Grappling FAQ" tone="tint">
        <FaqList items={faq} />
      </SplitSection>

      <CtaBand
        title="Find a club near you."
        primary={{ label: 'Find a club', to: '/clubs' }}
        secondary={{ label: 'Read the rules', to: '/rules' }}
      />
    </>
  )
}
