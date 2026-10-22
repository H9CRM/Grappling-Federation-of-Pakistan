import { motion } from 'motion/react'
import { ArrowUpRight, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import { ease, inView } from '@/lib/motion'
import { allOfficers, leadership, org, SITE_URL } from '@/content/site'
import { events, isUpcoming } from '@/content/events'
import { PageHero } from '@/components/layout/page-hero'
import { SectionHeading } from '@/components/layout/section'
import { Notice } from '@/components/blocks'
import { Card } from '@/components/brand/card'
import { SocialIcons } from '@/components/brand/social'
import { CountUp, Reveal, Stagger } from '@/components/motion/primitives'
import { assetPath } from '@/lib/urls'

const initials = (n) => n.split(' ').filter((p) => /^[A-Z]/.test(p)).slice(0, 2).map((p) => p[0]).join('')
const gfpEventsHeld = events.filter((e) => e.organizer.startsWith(org.name) && !isUpcoming(e)).length

export default function Leadership() {
  const featured = allOfficers.filter((o) => o.featured)

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Leadership of the Grappling Federation of Pakistan"
        lead={`GFP is led by President ${org.president} and a team of office-bearers in Lahore and Rawalpindi.`}
        crumbs={[{ label: 'About', href: '/about' }, { label: 'Leadership', href: '/about/leadership' }]}
        seo={{
          title: 'GFP Leadership | President, General Secretary and Office-bearers',
          description: `Meet the leadership of the Grappling Federation of Pakistan: President ${org.president}, General Secretary Faiz Alam Faizi and office-bearers in Lahore and Rawalpindi.`,
          path: '/about/leadership',
          image: featured[0]?.photo,
          schema: allOfficers.map((o) => ({
            '@type': 'Person',
            name: o.name,
            jobTitle: o.role,
            ...(o.photo ? { image: `${SITE_URL}${o.photo}` } : {}),
            worksFor: { '@id': `${SITE_URL}/#organization` },
          })),
        }}
      />

      {/* About this federation */}
      <section className="section-tight bg-white">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <SectionHeading eyebrow="About this federation" title={`${org.name} (${org.shortName})`} />
            <Reveal type="text" as="p" className="t-lead mt-6 text-ink/80">{org.about}</Reveal>
            <Stagger as="dl" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { k: 'Members', v: org.stats.members },
                { k: 'Academies', v: org.stats.academies },
                { k: 'Events held', v: gfpEventsHeld, note: 'since 2025' },
                { k: 'Established', v: org.established, format: 'year' },
              ].map((s) => (
                <Stagger.Item key={s.k} type="pop" className="rounded-2xl border border-steel/15 bg-offwhite p-5 text-center">
                  <dt className="sr-only">{s.k}</dt>
                  <dd>
                    <CountUp to={s.v} format={s.format} className="t-stat block text-fed" />
                    <span className="t-caption mt-2 block text-steel">{s.k}{s.note && <span className="block text-[0.75rem]">{s.note}</span>}</span>
                  </dd>
                </Stagger.Item>
              ))}
            </Stagger>
          </div>

          {/* Contact information */}
          <Reveal type="card" className="h-fit rounded-2xl bg-ink p-7 text-white shadow-float lg:sticky lg:top-28">
            <p className="t-eyebrow text-fed-light">Contact information</p>
            <dl className="mt-6 space-y-5">
              {[
                { icon: MapPin, k: 'Headquarters', v: `${org.address.street}, ${org.address.locality}, ${org.address.city}` },
                { icon: UserRound, k: 'President', v: org.president },
                { icon: Mail, k: 'Email', v: org.email, href: `mailto:${org.email}` },
                { icon: Phone, k: 'Phone', v: org.phone.display, href: `tel:${org.phone.tel}` },
              ].map(({ icon: Icon, k, v, href }) => (
                <div key={k} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/8 text-fed-light">
                    <Icon aria-hidden="true" className="size-[1.1rem]" />
                  </span>
                  <div className="min-w-0">
                    <dt className="t-eyebrow text-[0.6875rem] text-white/50">{k}</dt>
                    <dd className="mt-1 break-words text-white/90">
                      {href ? <a href={href} className="link-sweep hover:text-white">{v}</a> : v}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-7 border-t border-white/10 pt-6">
              <p className="t-eyebrow text-[0.6875rem] text-white/50">Connect with us</p>
              <SocialIcons className="mt-3" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured: President + General Secretary */}
      <section className="section-tight surface-arena grain relative overflow-hidden">
        <div className="container-site relative">
          <SectionHeading dark eyebrow="Executive" title="Federation leadership" />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((o, i) => (
              <motion.figure
                key={o.name}
                className="group/lead glass-dark relative flex items-center gap-6 overflow-hidden rounded-3xl p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.8, ease: ease.out, delay: i * 0.12 }}
              >
                <motion.div
                  className="relative size-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-gold/70 sm:size-36"
                  initial={{ clipPath: 'inset(100% 0 0 0 round 16px)' }}
                  whileInView={{ clipPath: 'inset(0% 0 0 0 round 16px)' }}
                  viewport={inView}
                  transition={{ duration: 1, ease: ease.expo, delay: 0.2 + i * 0.12 }}
                >
                  <img src={assetPath(o.photo)} alt={`${o.name}, ${o.role} of the Grappling Federation of Pakistan`} width="320" height="320" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/lead:scale-105" />
                </motion.div>
                <figcaption>
                  <p className="t-eyebrow text-gold">{o.role}</p>
                  <p className="t-h3 mt-2 text-white">{o.name}</p>
                  <p className="t-caption mt-2 text-white/60">{o.region}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* All office-bearers by region */}
      <section className="section-tight bg-white">
        <div className="container-site">
          {leadership.groups.map((g, gi) => (
            <div key={g.region} className={gi ? 'mt-14' : ''}>
              <Reveal type="text" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="t-h3 text-fed">{g.region}</h2>
                <span className="t-caption text-steel">
                  {g.label} · {g.officers.length} {g.officers.length === 1 ? 'office-bearer' : 'office-bearers'}
                </span>
              </Reveal>
              <Stagger as="ul" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
                {g.officers.map((o) => (
                  <li key={o.name}>
                    <Card className="flex-row items-center gap-4 p-4">
                      {o.photo ? (
                        <img src={assetPath(o.photo)} alt={o.name} width="56" height="56" loading="lazy" decoding="async" className="size-14 shrink-0 rounded-full object-cover ring-2 ring-tint transition-transform duration-500 group-hover/card:scale-105" />
                      ) : (
                        <span aria-hidden="true" className="font-display flex size-14 shrink-0 items-center justify-center rounded-full bg-tint text-lg font-bold text-fed">{initials(o.name)}</span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink">{o.name}</span>
                        <span className="t-caption block text-steel">{o.role}</span>
                      </span>
                    </Card>
                  </li>
                ))}
              </Stagger>
            </div>
          ))}

          <Notice className="mt-14">
            Office-bearers as published on the{' '}
            <a className="prose-link" href={leadership.sourceUrl} target="_blank" rel="noreferrer">federation’s profile</a> ({leadership.asOf}).
            United World Wrestling’s national-federation directory still lists an earlier record ({org.uwwRecord.president}, {org.uwwRecord.secretaryGeneral}, {org.uwwRecord.city});
            the federation is updating it with UWW.
          </Notice>
        </div>
      </section>

      <section className="section-tight bg-offwhite">
        <div className="container-site grid gap-5 md:grid-cols-2">
          <Card className="p-7">
            <h2 className="t-card text-ink">Committees</h2>
            <p className="mt-2 text-steel">Referees, Coaches, Women’s Wing, Youth and Athletes committees — members to be announced.</p>
          </Card>
          <Card className="p-7">
            <h2 className="t-card text-ink">Governance documents</h2>
            <p className="mt-2 text-steel">Constitution and policies are published as they are approved.</p>
            <a href={assetPath('/policies/code-of-conduct')} className="mt-5 inline-flex items-center gap-1 font-semibold text-fed">
              <span className="link-sweep pb-0.5">Read our policies</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </Card>
        </div>
      </section>
    </>
  )
}
