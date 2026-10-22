import { Link } from 'react-router'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { footerNav, org } from '@/content/site'
import { Logo } from '@/components/brand/logo'
import { SocialIcons } from '@/components/brand/social'

const year = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:py-20">
        <div>
          <Logo />
          <address className="mt-8 space-y-4 not-italic text-white/70">
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-fed-light" />
              <span>
                {org.address.street}, {org.address.locality}, {org.address.city}, {org.address.country}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 shrink-0 text-fed-light" />
              <a href={`mailto:${org.email}`} className="link-sweep hover:text-white">{org.email}</a>
            </p>
            {org.phone.verified && (
              <p className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-fed-light" />
                <a href={`tel:${org.phone.tel}`} className="link-sweep hover:text-white">{org.phone.display}</a>
              </p>
            )}
          </address>
          <a
            href={org.uwwProfile}
            target="_blank"
            rel="noreferrer"
            className="group/uww mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition-colors hover:border-white/25 hover:text-white"
          >
            <span className="font-semibold">Member federation of United World Wrestling</span>
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/uww:translate-x-0.5 group-hover/uww:-translate-y-0.5" />
          </a>
          <div className="mt-8">
            <p className="t-eyebrow text-white/50">Follow GFP</p>
            <SocialIcons className="mt-4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="t-eyebrow text-white/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="link-sweep text-[0.9375rem] text-white/75 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {org.name}</p>
          <ul className="flex gap-5">
            {org.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-sweep transition-colors hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
