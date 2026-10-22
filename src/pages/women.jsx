import { PageHero } from '@/components/layout/page-hero'
import { Checklist, CtaBand, Notice, SplitSection, Steps } from '@/components/blocks'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { weightClasses } from '@/content/sport'
import { FaqList } from '@/components/faq-list'
import { faqById } from '@/content/faq'
import { faqSchema } from '@/components/seo'

const faq = faqById(['women-kit', 'women-only-classes', 'choose-club'])

export default function Women() {
  return (
    <>
      <PageHero
        image="grapple-mania-3-2025"
        eyebrow="Women’s Wing"
        title="Women’s Grappling in Pakistan"
        lead="GFP’s Women’s Wing supports women-only classes, female coaches and women’s divisions at 53, 58, 64, 71 and 90 kg."
        crumbs={[{ label: 'Women’s Wing', href: '/women' }]}
        seo={{
          title: 'Women’s Grappling Pakistan | Self-Defence & BJJ for Women',
          description: 'Women-only grappling classes, women’s divisions, modest competition kit and safeguarding with the Grappling Federation of Pakistan.',
          path: '/women',
          schema: faqSchema(faq),
        }}
      />

      <SplitSection eyebrow="Divisions" title="Women’s weight classes">
        <Stagger as="ul" className="flex flex-wrap gap-3" stagger={0.05}>
          {weightClasses.women.map((w) => (
            <Stagger.Item as="li" key={w} type="pop" className="rounded-2xl border border-fed/20 bg-tint/60 px-6 py-4">
              <span className="t-stat block text-fed">{w}</span>
              <span className="t-caption text-steel">kg · Senior</span>
            </Stagger.Item>
          ))}
        </Stagger>
        <p className="t-caption mt-5 text-steel">U20 women also compete at {weightClasses.u20WomenExtra} kg.</p>
      </SplitSection>

      <SplitSection eyebrow="Kit" title="Kit and modesty" tone="tint">
        <Reveal type="text" className="t-lead text-ink/85">
          UWW rules allow long-sleeve rashguards and leggings under shorts, and the Gi style gives full coverage, which
          suits athletes who prefer modest competition wear.
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="First steps" title="How to begin training">
        <Steps items={[
          { title: 'Find a suitable club', body: 'Use the club directory, then contact the club to confirm its current women-only timetable, coach and trial-session arrangements.' },
          { title: 'Ask about the class', body: 'Check the training space, changing arrangements, equipment, coaching approach and how beginners are introduced to partner drills.' },
          { title: 'Learn at your pace', body: 'A first session should explain movement, safe tapping and how to stop a drill. Competition can come later if you choose.' },
        ]} />
      </SplitSection>

      <SplitSection eyebrow="Safety" title="Safeguarding and female officials">
        <Checklist
          items={[
            'Ask the club to confirm women-only sessions and the coach leading them',
            'Check the club’s changing arrangements and safeguarding contact',
            'Tell the coach about injuries or access needs before training',
            'Use the GFP contact page to report a concern or request guidance',
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="Clubs" title="Women-only clubs" tone="offwhite">
        <Notice>Clubs offering women-only classes will be listed here as they affiliate. Women’s Wing leadership will be published once verified.</Notice>
      </SplitSection>

      <SplitSection eyebrow="Competition" title="Moving from class to competition">
        <p className="t-lead text-ink/85">Women can enter Grappling (No-Gi) and Grappling Gi divisions where an event offers them. Review the event page for confirmed age and weight categories, weigh-in details, kit rules, entry deadline and registration route. If a division is not listed, contact the organiser before making travel plans.</p>
      </SplitSection>

      <SplitSection eyebrow="Questions" title="Women’s grappling FAQ" tone="tint">
        <FaqList items={faq} />
      </SplitSection>

      <CtaBand
        title="Start grappling in a safe, women-only space."
        primary={{ label: 'Find a club', to: '/clubs' }}
        secondary={{ label: 'Contact the Women’s Wing', to: '/contact' }}
      />
    </>
  )
}
