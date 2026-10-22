// Policy summaries. Only the anti-doping line is taken from the strategy; the others are
// plain-language outlines awaiting the federation's approved documents (`status: 'draft'`).

export const policies = [
  {
    slug: 'anti-doping',
    title: 'Anti-Doping Policy',
    status: 'draft',
    summary: [
      'GFP follows UWW anti-doping rules, and any athlete selected for international competition may be tested.',
      'Athletes are responsible for everything they take. Check medicines and supplements before competing, and declare any therapeutic use in advance.',
    ],
  },
  {
    slug: 'safeguarding',
    title: 'Safeguarding Policy',
    status: 'draft',
    summary: [
      'Every athlete, especially under-18s and women, should be able to train and compete safely.',
      'Affiliated clubs appoint a safeguarding lead, and under-18 registrations require parental consent.',
      'Concerns can be raised in confidence with the GFP secretariat.',
    ],
  },
  {
    slug: 'code-of-conduct',
    title: 'Code of Conduct',
    status: 'draft',
    summary: [
      'Athletes, coaches, referees and officials are expected to show respect on and off the mat, follow the UWW International Grappling Rules and accept officials’ decisions through the proper appeal route.',
    ],
  },
  {
    slug: 'complaints',
    title: 'Complaints Procedure',
    status: 'draft',
    summary: [
      'Complaints about events, officials or member clubs can be sent to the GFP secretariat in writing. Include the event, date, people involved and what happened.',
    ],
  },
  {
    slug: 'privacy',
    title: 'Privacy Notice',
    status: 'draft',
    summary: [
      'GFP collects the personal data needed to register athletes, clubs and officials and to run events. Athlete profiles are published only with consent.',
    ],
  },
]

export const findPolicy = (slug) => policies.find((p) => p.slug === slug)
