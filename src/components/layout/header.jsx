import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Dialog } from 'radix-ui'
import { ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { announcement, primaryNav } from '@/content/site'
import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/brand/button'

export function SiteHeader() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState(null)
  useEffect(() => { setMobileOpen(false); setExpanded(null) }, [pathname])
  return <header className="sticky top-0 z-50 border-b border-steel/15 bg-white text-ink shadow-control">
    {announcement.enabled && <Link to={announcement.href} className="block bg-fed-dark px-5 py-2 text-center text-xs font-medium text-white sm:text-sm"><span className="font-bold text-gold">{announcement.label}: </span>{announcement.shortText}</Link>}
    <div className="container-site flex min-h-[4.75rem] items-center justify-between gap-5">
      <Link to="/" aria-label="Grappling Federation of Pakistan home" className="shrink-0 rounded-lg text-ink"><Logo tight /></Link>
      <nav aria-label="Main" className="hidden lg:block"><ul className="flex items-center gap-1">{primaryNav.map((item) => <li key={item.label}>{item.children ? <DesktopDisclosure item={item} /> : <Link to={item.href} aria-current={pathname === item.href ? 'page' : undefined} className="nav-link">{item.label}</Link>}</li>)}</ul></nav>
      <div className="flex items-center gap-2">
        <Link to="/contact" className="nav-link hidden xl:inline-flex">Contact</Link>
        <Button to="/clubs" size="sm" variant="solid" className="hidden sm:inline-flex">Find a club</Button>
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild><button type="button" aria-label="Open menu" className="flex size-12 items-center justify-center rounded-lg border border-steel/25 lg:hidden"><Menu aria-hidden="true" /></button></Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/45" />
            <Dialog.Content aria-describedby={undefined} className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto bg-white text-ink shadow-float">
              <div className="flex min-h-20 items-center justify-between border-b border-steel/15 px-6"><Dialog.Title className="font-display text-2xl font-bold">Explore GFP</Dialog.Title><Dialog.Close asChild><button type="button" className="flex min-h-11 items-center gap-2 rounded-lg px-2 font-semibold"><X size={20} aria-hidden="true" />Close</button></Dialog.Close></div>
              <nav aria-label="Mobile" className="flex-1 px-6 py-5">
                <ul className="divide-y divide-steel/15">{primaryNav.map((item) => <li key={item.label}>{item.children ? <>
                  <button type="button" aria-expanded={expanded === item.label} aria-controls={`mobile-${item.label}`} onClick={() => setExpanded(expanded === item.label ? null : item.label)} className="flex min-h-14 w-full items-center justify-between text-left text-lg font-semibold">{item.label}<ChevronDown className={cn('size-5 transition-transform', expanded === item.label && 'rotate-180')} /></button>
                  {expanded === item.label && <ul id={`mobile-${item.label}`} className="mb-3 border-l-2 border-fed pl-4">{item.children.map((child) => <li key={child.href}><Link to={child.href} onClick={() => setMobileOpen(false)} aria-current={pathname === child.href ? 'page' : undefined} className="block rounded-lg py-3 text-base hover:text-fed">{child.label}</Link></li>)}</ul>}
                </> : <Link to={item.href} onClick={() => setMobileOpen(false)} aria-current={pathname === item.href ? 'page' : undefined} className="flex min-h-14 items-center text-lg font-semibold hover:text-fed">{item.label}</Link>}</li>)}</ul>
                <div className="mt-8 grid gap-3"><Button to="/clubs" onClick={() => setMobileOpen(false)} size="lg" variant="solid">Find a club</Button><Button to="/register" onClick={() => setMobileOpen(false)} size="lg" variant="secondary">Registration information</Button><Link to="/contact" onClick={() => setMobileOpen(false)} className="py-3 text-center font-semibold text-fed">Contact the federation</Link></div>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  </header>
}

function DesktopDisclosure({ item }) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const root = useRef(null)
  const button = useRef(null)
  useEffect(() => {
    if (!open) return
    const outside = (event) => { if (!root.current?.contains(event.target)) setOpen(false) }
    const escape = (event) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])
  return <div ref={root} className="relative" onBlur={(event) => { if (!root.current?.contains(event.relatedTarget)) setOpen(false) }}>
    <button ref={button} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className="nav-link gap-1">{item.label}<ChevronDown aria-hidden="true" className={cn('size-4 transition-transform', open && 'rotate-180')} /></button>
    {open && <ul id={id} className="absolute top-full left-1/2 w-80 -translate-x-1/2 rounded-2xl border border-steel/15 bg-white p-2 shadow-float">{item.children.map((child) => <li key={child.href}><Link to={child.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 hover:bg-tint"><strong className="block text-sm text-ink">{child.label}</strong><span className="mt-1 block text-xs text-steel">{child.desc}</span></Link></li>)}</ul>}
  </div>
}
