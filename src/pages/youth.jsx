import { PageHero } from '@/components/layout/page-hero'
import { Checklist, CtaBand, Notice, SplitSection, Steps } from '@/components/blocks'
import { Reveal, Stagger } from '@/components/motion/primitives'
import { ageCategories } from '@/content/sport'
import { FaqList } from '@/components/faq-list'
import { faqById } from '@/content/faq'
import { faqSchema } from '@/components/seo'

const faq = faqById(['kids-safe', 'register-docs'])

export default function Youth() {
  return (
    <>
      <PageHero
        image="youth-grappling-armlock"
        eyebrow="Youth"
        title="Kids Grappling and BJJ in Pakistan"
        lead="Youth grappling teaches control, movement and safe partner practice without striking. Parents should check the coach, class format and safeguards before enrolling."
        crumbs={[{ label: 'Youth', href: '/youth' }]}
        seo={{
          title: 'Kids Grappling & BJJ Classes Pakistan | GFP Youth',
          description: 'Youth grappling in Pakistan: age groups, safety and safeguarding, kids’ clubs, youth events and schools.',
          path: '/youth',
          schema: faqSchema(faq),
        }}
      />

      <SplitSection eyebrow="For parents" title="The short answer">
        <Reveal type="text" className="rounded-2xl border-l-4 border-gold bg-offwhite p-6 t-lead text-ink/85 lg:p-8">
          Grappling can be an introduction to combat sport for children when sessions are age-appropriate and supervised.
          Ask the club about coach qualifications, first aid, safeguarding, class size and how children learn to tap and stop.
          Under-18s need parental consent for GFP registration.
        </Reveal>
      </SplitSection>

      <SplitSection eyebrow="First session" title="What your child can expect">
        <Steps items={[
          { title: 'Arrival and introduction', body: 'Meet the coach, describe any injuries or support needs, and ask how beginners are paired for drills.' },
          { title: 'Movement before competition', body: 'Early sessions can focus on balance, falling safely, positions and controlled partner work rather than hard sparring.' },
          { title: 'Clear stop signals', body: 'Children should learn to tap, release immediately when a partner taps, and tell the coach if they feel uncomfortable.' },
        ]} />
      </SplitSection>

      <SplitSection eyebrow="Age groups" title="Youth age categories" tone="tint">
        <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ageCategories.slice(0, 4).map((a) => (
            <Stagger.Item key={a.name} type="pop" className="rounded-xl border border-steel/15 bg-white p-5 text-center shadow-control">
              <p className="font-display text-3xl font-bold text-fed">{a.name}</p>
              <p className="t-caption mt-1 text-steel">{a.ages ? `Ages ${a.ages}` : 'Youth'}</p>
            </Stagger.Item>
          ))}
        </Stagger>
      </SplitSection>

      <SplitSection eyebrow="Safety" title="Safety and safeguarding">
        <Checklist
          items={[
            'Confirm the coach and safeguarding contact directly with the club',
            'Ask how first aid and emergency contacts are handled',
            'Check supervision, changing arrangements and parent access',
            'Review event age, weight and technique restrictions before competition',
          ]}
        />
      </SplitSection>

      <SplitSection eyebrow="For parents" title="Questions to ask a club" tone="tint">
        <p className="t-lead text-ink/85">Does the club have a beginner class for your child’s age? Who supervises it? How are partners matched? Can you observe a session? What is the process for reporting a concern? A club should be able to answer these clearly before you commit.</p>
      </SplitSection>

      <SplitSection eyebrow="Schools & events" title="Youth events and schools" tone="offwhite">
        <Notice>Youth events and schools programmes will be listed here once scheduled. Schools interested in grappling can contact the secretariat.</Notice>
      </SplitSection>

      <SplitSection eyebrow="FAQ" title="Parents’ questions">
        <FaqList items={faq} />
      </SplitSection>

      <CtaBand
        title="Find a safe, affiliated club for your child."
        primary={{ label: 'Find a club', to: '/clubs' }}
      />
    </>
  )
}
