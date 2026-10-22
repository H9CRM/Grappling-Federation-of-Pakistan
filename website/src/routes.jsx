import { lazy } from 'react'
import { Navigate } from 'react-router'
import { SiteLayout } from '@/components/layout/site-layout'
import Home from '@/pages/home'
import { events, eventPath } from '@/content/events'
import { policies } from '@/content/policies'

// Shared by the browser router (App.jsx) and the prerenderer (entry-server.jsx).
// Home is eager (LCP); every other page is code-split.
const page = (load) => lazy(load)
const About = page(() => import('@/pages/about'))
const Leadership = page(() => import('@/pages/leadership'))
const Affiliations = page(() => import('@/pages/affiliations'))
const Associations = page(() => import('@/pages/associations'))
const Events = page(() => import('@/pages/events'))
const EventDetail = page(() => import('@/pages/event-detail'))
const Results = page(() => import('@/pages/results'))
const Register = page(() => import('@/pages/register'))
const Clubs = page(() => import('@/pages/clubs'))
const ClubAffiliate = page(() => import('@/pages/club-affiliate'))
const Education = page(() => import('@/pages/education'))
const Rules = page(() => import('@/pages/rules'))
const WhatIsGrappling = page(() => import('@/pages/what-is-grappling'))
const Women = page(() => import('@/pages/women'))
const Youth = page(() => import('@/pages/youth'))
const Faq = page(() => import('@/pages/faq'))
const Contact = page(() => import('@/pages/contact'))
const Policy = page(() => import('@/pages/policy'))
const Media = page(() => import('@/pages/media'))
const NotFound = page(() => import('@/pages/not-found'))

export const routes = [
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'about/leadership', element: <Leadership /> },
      { path: 'about/affiliations', element: <Affiliations /> },
      { path: 'about/associations', element: <Associations /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:year/:slug', element: <EventDetail /> },
      { path: 'results', element: <Results /> },
      { path: 'rankings', element: <Navigate to="/results" replace /> },
      { path: 'register', element: <Register /> },
      { path: 'clubs', element: <Clubs /> },
      { path: 'clubs/affiliate', element: <ClubAffiliate /> },
      { path: 'education', element: <Education /> },
      { path: 'rules', element: <Rules /> },
      { path: 'what-is-grappling', element: <WhatIsGrappling /> },
      { path: 'women', element: <Women /> },
      { path: 'youth', element: <Youth /> },
      { path: 'faq', element: <Faq /> },
      { path: 'media', element: <Media /> },
      { path: 'contact', element: <Contact /> },
      { path: 'policies', element: <Navigate to="/policies/safeguarding" replace /> },
      { path: 'policies/:policy', element: <Policy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

// Every indexable URL, with sitemap hints. Redirect-only routes are excluded.
export const sitePages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/events', priority: 0.9, changefreq: 'weekly' },
  { path: '/register', priority: 0.9, changefreq: 'monthly' },
  { path: '/about', priority: 0.8 },
  { path: '/about/leadership', priority: 0.6 },
  { path: '/about/affiliations', priority: 0.7 },
  { path: '/about/associations', priority: 0.5 },
  { path: '/results', priority: 0.8, changefreq: 'weekly' },
  { path: '/clubs', priority: 0.8 },
  { path: '/clubs/affiliate', priority: 0.6 },
  { path: '/rules', priority: 0.8 },
  { path: '/what-is-grappling', priority: 0.8 },
  { path: '/women', priority: 0.7 },
  { path: '/youth', priority: 0.7 },
  { path: '/education', priority: 0.6 },
  { path: '/media', priority: 0.6, changefreq: 'weekly' },
  { path: '/faq', priority: 0.7 },
  { path: '/contact', priority: 0.6 },
  ...events.map((e) => ({ path: eventPath(e), priority: 0.7, lastmod: e.sortDate })),
  ...policies.map((p) => ({ path: `/policies/${p.slug}`, priority: 0.3, changefreq: 'yearly' })),
]
