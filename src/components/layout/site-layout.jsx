import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { useLenis } from 'lenis/react'
import { org, SITE_URL } from '@/content/site'
import { SiteHeader } from './header'
import { SiteFooter } from './footer'
import { BackToTop } from '@/components/back-to-top'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'SportsOrganization'],
  '@id': `${SITE_URL}/#organization`,
  name: org.name,
  alternateName: [org.shortName, org.urduName],
  description:
    'The national federation for grappling in Pakistan, listed by United World Wrestling as its member federation for the sport. Runs Gi and No-Gi tournaments and registers athletes, clubs, coaches and referees.',
  sport: 'Grappling',
  foundingDate: String(org.established),
  employee: { '@type': 'Person', name: org.president, jobTitle: 'President' },
  url: SITE_URL,
  logo: `${SITE_URL}${org.logo}`,
  image: `${SITE_URL}/og-image.jpg`,
  areaServed: { '@type': 'Country', name: 'Pakistan' },
  knowsAbout: ['Grappling', 'No-Gi grappling', 'Grappling Gi', 'Submission wrestling', 'Brazilian Jiu-Jitsu', 'UWW International Grappling Rules'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'secretariat',
    email: org.email,
    areaServed: 'PK',
    availableLanguage: ['English', 'Urdu'],
  },
  email: org.email,
  ...(org.phone.verified ? { telephone: org.phone.tel } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${org.address.street}, ${org.address.locality}`,
    addressLocality: org.address.city,
    addressRegion: org.address.region,
    addressCountry: org.address.countryCode,
  },
  memberOf: { '@type': 'SportsOrganization', name: 'United World Wrestling', url: 'https://uww.org' },
  sameAs: [org.uwwProfile, ...org.social.map((s) => s.href)],
}

function ScrollReset() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])
  return null
}

function PageFallback() {
  return <div className="surface-arena min-h-[70svh]" />
}

export function SiteLayout() {
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-lg bg-gold px-4 py-2 font-semibold text-ink shadow-float transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <SiteHeader />

        <main
          id="main"
          tabIndex={-1}
          className="outline-none"
          key={location.pathname}
        >
          <ScrollReset />
          <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
        </main>

      <SiteFooter />
      <BackToTop />
    </>
  )
}
