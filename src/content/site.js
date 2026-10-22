// Single source of truth for federation identity (NAP, leadership, socials).
// 29 Sept 2026: the federation confirmed its leadership and contact details as published on
// its own Boltmore profile (boltmore.com/public/federations/1). Note: UWW's directory still
// lists different office-bearers and an Islamabad address — ask UWW to update its record so
// the two match (strategy §1.2).

export const SITE_URL = 'https://www.gfp.org.pk' // TODO: replace once the domain is registered (strategy Phase 0)

export const org = {
  name: 'Grappling Federation of Pakistan',
  shortName: 'GFP',
  urduName: 'گریپلنگ فیڈریشن آف پاکستان',
  tagline: 'The official home of grappling in Pakistan.',
  // Federation-confirmed contact details (Boltmore profile). Street address is the one on GFP's
  // Facebook page (same building as The School of Martial Arts).
  email: 'grappling.pk@gmail.com',
  address: {
    street: '12 UGF Central Plaza',
    locality: 'Barkat Market',
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    countryCode: 'PK',
  },
  phone: { display: '+92 300 4318826', tel: '+923004318826', verified: true },
  president: 'Aqeel Ahmed Jamil',
  // Self-reported on the federation's Boltmore profile
  established: 2016,
  stats: { members: 9, academies: 17 },
  about:
    'The Grappling Federation of Pakistan is the governing body for grappling sports in Pakistan. Committed to the promotion and development of submission wrestling, Brazilian Jiu-Jitsu (BJJ) and No-Gi grappling, GFP organises national championships, talent-identification programmes and international participation. Led by experienced martial artists and certified referees, the federation aims to raise grappling standards across the country and represent Pakistan on the global stage.',
  // UWW's directory record (different office-bearers; see note at top of file)
  uwwRecord: { president: 'Aoun Abbas', secretaryGeneral: 'Warda Abbas', city: 'Islamabad', email: 'PAK3@uww.org' },
  boltmoreProfile: 'https://boltmore.com/public/federations/1',
  uwwProfile: 'https://uww.org/about-uww/national-federations/grappling-federation-pakistan',
  uwwRulesPdf: 'https://cdn.uww.org/2025-05/grappling_rules_2025.pdf',
  uwwCommittee: 'https://uww.org/about-uww/committee/grappling-pankration-committee',
  logo: '/brand/gfp-logo-384.png',
  social: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/grapplingfederationofpakistan',
      handle: 'grapplingfederationofpakistan',
      blurb: 'Event announcements, results and fight-night videos',
    },
    // Existing handle is misspelt ("fedration"); swap when the corrected handle is registered.
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/grappling_fedration__pakistan/',
      handle: '@grappling_fedration__pakistan',
      blurb: 'Posters, reels and behind-the-scenes from the mat',
    },
  ],
}

// Federation leadership as published on GFP's Boltmore profile (confirmed by the federation,
// 29 Sept 2026). Role titles corrected from the profile's typos ("Presedent", "Refree",
// "General Sect."). Photos are the leaders' own profile pictures from that page.
export const leadership = {
  source: 'GFP federation profile',
  sourceUrl: 'https://boltmore.com/public/federations/1',
  asOf: 'September 2026',
  groups: [
    {
      region: 'Lahore, Punjab',
      label: 'Headquarters',
      officers: [
        { name: 'Aqeel Ahmed Jamil', role: 'President', photo: '/media/leaders/aqeel-ahmed-jamil.webp', featured: true },
        { name: 'Faiz Alam Faizi', role: 'General Secretary', photo: '/media/leaders/faiz-alam-faizi.webp', featured: true },
        { name: 'Syed Muhammad Shafiq', role: 'Director IT' },
        { name: 'Jibran Khan', role: 'Chief Referee', photo: '/media/leaders/jibran-khan.webp' },
        { name: 'Abid Hussain', role: 'President, Lahore' },
        { name: 'Rafique Siddique', role: 'General Secretary, Lahore' },
      ],
    },
    {
      region: 'Rawalpindi, Punjab',
      label: 'Rawalpindi Division',
      officers: [{ name: 'Muhammad Ali', role: 'General Secretary, Rawalpindi Division', photo: '/media/leaders/muhammad-ali.webp' }],
    },
  ],
}

export const allOfficers = leadership.groups.flatMap((g) => g.officers.map((o) => ({ ...o, region: g.region })))

export const announcement = {
  enabled: true,
  label: 'International',
  text: '2026 UWW Grappling, Amateur MMA & Pankration World Championships · Baku · 23–29 November',
  shortText: 'World Championships · Baku · 23–29 Nov 2026',
  href: '/events/2026/uww-grappling-world-championships-baku',
}

export const primaryNav = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About & History', href: '/about', desc: 'Mission, styles and how GFP is organised' },
      { label: 'Leadership', href: '/about/leadership', desc: 'Office-bearers and committees' },
      { label: 'Affiliations', href: '/about/affiliations', desc: 'UWW membership and national status' },
      { label: 'Provincial Associations', href: '/about/associations', desc: 'Regional structure' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Results', href: '/results' },
  { label: 'Clubs', href: '/clubs' },
  { label: 'Rules', href: '/rules' },
  {
    label: 'Community',
    href: '/women',
    children: [
      { label: "Women's Wing", href: '/women', desc: 'Women-only classes and divisions' },
      { label: 'Youth', href: '/youth', desc: 'Kids and junior grappling' },
      { label: 'Education', href: '/education', desc: 'Referee and coach pathways' },
      { label: 'What Is Grappling?', href: '/what-is-grappling', desc: 'Gi vs No-Gi explained' },
      { label: 'Media', href: '/media', desc: 'Photo and video gallery' },
    ],
  },
]

export const footerNav = [
  {
    title: 'Federation',
    links: [
      { label: 'About & History', href: '/about' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Affiliations', href: '/about/affiliations' },
      { label: 'Provincial Associations', href: '/about/associations' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Compete',
    links: [
      { label: 'Events', href: '/events' },
      { label: 'Results & Rankings', href: '/results' },
      { label: 'Athlete Registration', href: '/register' },
      { label: 'Rules & Weight Classes', href: '/rules' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Find a Club', href: '/clubs' },
      { label: 'Affiliate Your Gym', href: '/clubs/affiliate' },
      { label: "Women's Wing", href: '/women' },
      { label: 'Youth', href: '/youth' },
      { label: 'Education', href: '/education' },
      { label: 'Photos & Videos', href: '/media' },
    ],
  },
  {
    title: 'Policies',
    links: [
      { label: 'Anti-Doping', href: '/policies/anti-doping' },
      { label: 'Safeguarding', href: '/policies/safeguarding' },
      { label: 'Code of Conduct', href: '/policies/code-of-conduct' },
      { label: 'Complaints', href: '/policies/complaints' },
      { label: 'Privacy', href: '/policies/privacy' },
    ],
  },
]
