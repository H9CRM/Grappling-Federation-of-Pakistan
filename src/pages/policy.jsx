import { Link, useParams } from 'react-router'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { spring } from '@/lib/motion'
import { findPolicy, policies } from '@/content/policies'
import { org } from '@/content/site'
import { PageHero } from '@/components/layout/page-hero'
import { Notice } from '@/components/blocks'
import { Reveal, Stagger } from '@/components/motion/primitives'
import NotFound from './not-found'

export default function Policy() {
  const { policy } = useParams()
  const p = findPolicy(policy)
  if (!p) return <NotFound />

  return (
    <>
      <PageHero
        eyebrow="Policies"
        title={p.title}
        crumbs={[{ label: 'Policies', href: '/policies' }, { label: p.title, href: `/policies/${p.slug}` }]}
        seo={{
          title: `${p.title} | Grappling Federation of Pakistan`,
          description: p.summary[0],
          path: `/policies/${p.slug}`,
        }}
      />

      <section className="section-tight bg-white">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <nav aria-label="Policies" className="lg:col-span-3">
            <ul className="-mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] pb-2 lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:px-0">
              {policies.map((x) => (
                <li key={x.slug} className="shrink-0">
                  <Link
                    to={`/policies/${x.slug}`}
                    aria-current={x.slug === p.slug ? 'page' : undefined}
                    className={cn('relative block rounded-lg px-4 py-2.5 text-[0.9375rem] font-medium transition-colors', x.slug === p.slug ? 'text-fed' : 'text-ink/70 hover:text-ink')}
                  >
                    {x.slug === p.slug && <motion.span layoutId="policy-nav" className="absolute inset-0 rounded-lg bg-tint" transition={spring.layout} />}
                    <span className="relative">{x.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="max-w-3xl lg:col-span-9">
            <h2 className="t-h3 text-fed">Plain-language summary</h2>
            <Stagger className="mt-6 space-y-5">
              {p.summary.map((s) => (
                <Stagger.Item key={s} type="text" as="p" className="t-lead text-ink/85">{s}</Stagger.Item>
              ))}
            </Stagger>
            {p.status === 'draft' && (
              <Notice className="mt-10">The full policy document will be published here once approved. Last reviewed: pending.</Notice>
            )}
            <Reveal type="fade" className="mt-8 text-ink/80">
              Questions or reports: <a className="prose-link" href={`mailto:${org.email}`}>{org.email}</a>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
