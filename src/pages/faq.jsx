import { faqs } from '@/content/faq'
import { faqSchema } from '@/components/seo'
import { PageHero } from '@/components/layout/page-hero'
import { FaqExplorer } from '@/components/faq-explorer'
import { CtaBand } from '@/components/blocks'

export default function Faq() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Grappling FAQ: Rules, Registration and Clubs"
        lead={`${faqs.length} short, direct answers about GFP, the sport, competing, kit, safety and member clubs — searchable.`}
        crumbs={[{ label: 'FAQ', href: '/faq' }]}
        seo={{
          title: 'Grappling FAQ Pakistan | Rules, Registration, Clubs | GFP',
          description: `${faqs.length} answers about grappling in Pakistan: GFP, Gi vs No-Gi, scoring, weight classes, registration, kit, safety, women’s and youth grappling.`,
          path: '/faq',
          // the /faq page is the canonical home for every answer, so it carries the full FAQPage schema
          schema: faqSchema(faqs),
        }}
      />

      <section className="section-tight bg-white">
        <div className="container-site">
          <FaqExplorer items={faqs} />
        </div>
      </section>

      <CtaBand title="Didn’t find your answer?" primary={{ label: 'Contact the federation', to: '/contact' }} />
    </>
  )
}
