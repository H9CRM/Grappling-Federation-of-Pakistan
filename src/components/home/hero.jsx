import { Link } from 'react-router'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { org } from '@/content/site'
import { imageById } from '@/content/media'
import { Button } from '@/components/brand/button'
import { PhotoCredit } from '@/components/media/photo-credit'

export function HomeHero() {
  const image = imageById('nogi-grappling')
  return <section aria-labelledby="hero-title" className="bg-ink text-white">
    <div className="container-site grid items-center gap-10 py-14 sm:py-20 lg:min-h-[42rem] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:py-24">
      <div className="max-w-[42rem]">
        <a href={org.uwwProfile} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"><ShieldCheck className="size-4 text-fed-light" aria-hidden="true" />UWW member federation for grappling</a>
        <h1 id="hero-title" className="mt-8 font-display text-[clamp(3rem,5.8vw,5.6rem)] leading-[.98] font-bold tracking-[.005em]">Grappling across Pakistan.</h1>
        <p className="mt-6 max-w-[37rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-white/85">The Grappling Federation of Pakistan organises Gi and No-Gi competitions and connects athletes, clubs, coaches and referees across the country.</p>
        <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap"><Button to="/clubs" size="lg" className="min-h-14 w-full sm:w-auto">Find a club</Button><Button to="/events" variant="onDark" size="lg" className="min-h-14 w-full sm:w-auto">View event information</Button></div>
        <p className="mt-6 text-sm text-white/70">Looking to compete? <Link to="/register" className="font-semibold text-white underline decoration-gold underline-offset-4 hover:text-gold">Read registration information <ArrowRight className="inline size-4" aria-hidden="true" /></Link></p>
      </div>
      <figure className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-surface shadow-float">
        <img src={image.srcSmall} srcSet={`${image.srcSmall} ${image.smallWidth}w, ${image.src} ${image.width}w`} sizes="(min-width: 1024px) 48vw, 100vw" alt={image.alt} width={image.width} height={image.height} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full object-cover" />
        <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-5 py-3 text-sm text-white/75"><span>Illustrative No-Gi grappling photography</span><PhotoCredit image={image} /></figcaption>
      </figure>
    </div>
  </section>
}
