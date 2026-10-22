import socialArchive from './socialArchive.json'
import { assetPath } from '@/lib/urls'

// Gallery manifest. Files live in public/media/ (optimised WebP; each photo has a full-size
// version and a `-640` version for cards/heroes). Only add media GFP owns or has permission to
// publish — never images pulled from search results.
//
// Photos below are cover frames of GFP's own public Facebook reels (downloaded with approval,
// 28 Sept 2026). They show athletes, including minors in the background: confirm photo consent
// under GFP's safeguarding policy before launch.

// `-640` files fit inside 640×640, so portrait images are narrower than 640px.
const photo = (id, width, height, caption, alt, extra = {}) => ({
  id,
  src: assetPath(`/media/${id}.webp`),
  srcSmall: assetPath(`/media/${id}-640.webp`),
  smallWidth: Math.round(width * Math.min(1, 640 / Math.max(width, height))),
  width,
  height,
  caption,
  alt,
  ...extra,
})

const socialPhoto = (id, width, height, caption, alt) => ({
  id: `facebook-${id}`,
  src: assetPath(`/media/social/facebook-${id}.webp`),
  srcSmall: assetPath(`/media/social/facebook-${id}-640.webp`),
  smallWidth: Math.round(width * Math.min(1, 640 / Math.max(width, height))),
  width,
  height,
  caption,
  alt,
  sourceUrl: `https://www.facebook.com/photo.php?fbid=${id}`,
  tags: ['Official Facebook'],
})

export const images = [
  photo(
    'ebad-vs-abdul-rehman-2026', 1088, 624,
    'Ebad Nasir (VCL) vs Abdul Rehman (UMAF) — Summer Fights Challenge 2026',
    'Two No-Gi grapplers scramble for a takedown on a red and blue mat as spectators film from the edge of the mat at VCL Gym, Lahore.',
    { event: { year: 2026, slug: 'summer-fights-challenge-vcl-lahore' }, tags: ['Match'] }
  ),
  photo(
    'amaar-vs-yashin-2026', 785, 1400,
    'Amaar OBI vs Yashin Khan — Summer Fights Challenge 2026',
    'A referee stands between two No-Gi grapplers before a match at the Summer Fights Challenge 2026 in Lahore.',
    { event: { year: 2026, slug: 'summer-fights-challenge-vcl-lahore' }, tags: ['Match'] }
  ),
  photo(
    'grapple-mania-3-2025', 640, 360,
    'Women’s Gi match — 3rd Grapple Mania 2025, Lahore',
    'Two women in Gi, one wearing a white belt, face each other with a referee on a red and blue mat, with young athletes watching from the side.',
    { tags: ['Women', 'Gi'] }
  ),
  photo(
    'inter-club-punjab-nogi-2026', 848, 478,
    'Inter Club Punjab Grappling No-Gi Championship 2026 — Akhara MMA, Lahore',
    'Officials lean in to watch two grapplers on the ground during a No-Gi match at Akhara MMA & Fitness Studio, Lahore.',
    { event: { year: 2026, slug: 'inter-club-punjab-grappling-nogi-championship' }, tags: ['Match'] }
  ),
  photo(
    'ift-grappling-pass', 720, 1280,
    'IFT MMA & Grappling Pass — athletes and officials',
    'Athletes and officials gather on the cage mat at the IFT MMA & Grappling Pass event.',
    { tags: ['Event'] }
  ),
  photo(
    'senior-inter-club-punjab-2026', 478, 850,
    'Senior Inter Club Punjab Grappling Championship 2026 — VCL Gym',
    'Guests and officials at the Senior Inter Club Punjab Grappling Championship 2026, VCL Gym, Lahore.',
    { event: { year: 2026, slug: 'senior-inter-club-punjab-grappling-championship' }, tags: ['Event'] }
  ),
  socialPhoto('122188831760206468', 1080, 1080, '3rd National Grappling Championship 2025 poster', 'GFP poster for the 3rd National Grappling Championship 2025.'),
  socialPhoto('122309375168206468', 960, 1280, 'Athlete with medal at a GFP event', 'Adult grappling athlete displays a medal at a GFP event.'),
  socialPhoto('122309375216206468', 960, 1280, 'GFP event participants', 'Two adult participants stand together at a GFP grappling event.'),
  socialPhoto('122309375294206468', 1536, 2048, 'Certificate presentation at a GFP event', 'Two adults present a certificate on the mat at a GFP event.'),
  socialPhoto('122309375390206468', 2048, 1536, 'Champion with belt and medal', 'Adult competitor celebrates with a championship belt and medal at a GFP event.'),
  socialPhoto('122309437814206468', 768, 1376, 'Pakistan Defense Day Grappling Fight Night 2026 poster', 'GFP poster announcing the Pakistan Defense Day Grappling Fight Night 2026.'),
  socialPhoto('122312381486206468', 687, 1024, '1st Beach Grappling No-Gi Championship 2026 poster', 'GFP poster for the 1st Beach Grappling No-Gi Championship planned for November 2026 in Lahore.'),
  socialPhoto('122315885636206468', 928, 1152, 'Pakistan Defense Day Grappling Fight Night 2026 result card', 'GFP result card listing divisions and medalists for the Pakistan Defense Day Grappling Fight Night 2026.'),
  ...socialArchive.map((reel) => ({
    id: `${reel.id}-still`,
    src: assetPath(reel.poster),
    srcSmall: assetPath(reel.poster),
    width: reel.width,
    height: reel.height,
    smallWidth: reel.width,
    caption: reel.caption,
    alt: reel.alt,
    sourceUrl: reel.sourceUrl,
    tags: ['Official social reel still'],
  })),
  {
    id: 'summer-fights-2026-results',
    src: assetPath('/media/summer-fights-challenge-2026-results.webp'),
    width: 335,
    height: 597,
    alt: 'Result card for the Summer Fights Challenge 2026 at VCL Gym, Lahore, listing gold and silver medallists across grappling, MMA, boxing and kickboxing weight classes.',
    caption: 'Summer Fights Challenge 2026 — result card',
    event: { year: 2026, slug: 'summer-fights-challenge-vcl-lahore' },
    tags: ['Results'],
  },
]

// Openly licensed grappling photography (Wikimedia Commons, via Openverse; downloaded with
// approval 29 Sept 2026). Illustrative only — never captioned as GFP events. CC BY / BY-SA
// require the credit + licence link, which render wherever the photo appears and on /media.
const LICENSES = {
  'by 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'by-sa 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'by-sa 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
}
const stock = (id, width, height, smallWidth, alt, creator, license, source) => ({
  id,
  src: assetPath(`/media/cc/${id}.webp`),
  srcSmall: assetPath(`/media/cc/${id}-640.webp`),
  width,
  height,
  smallWidth,
  alt,
  caption: alt,
  stock: true,
  credit: { creator, license: `CC ${license.toUpperCase()}`, licenseUrl: LICENSES[license], source },
})

const LODES = 'Alejandro Martín Lodes'
const BONICA = 'Mark Bonica'
export const stockImages = [
  stock('bjj-gi-1', 1600, 900, 640, 'Two Gi grapplers battle for position on a blue competition mat at an open-air jiu-jitsu tournament.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525771'),
  stock('bjj-gi-2', 1600, 900, 640, 'A Gi grappler drives for a pass while spectators watch from the edge of an outdoor mat.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525775'),
  stock('bjj-gi-3', 1280, 720, 640, 'Gi grapplers scramble on a beach tournament mat under red and white canopies.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525770'),
  stock('bjj-gi-4', 1280, 720, 640, 'A coach kneels at the mat edge as two grapplers compete beside the sea.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525772'),
  stock('bjj-gi-5', 1280, 720, 640, 'A referee raises the winner’s hand after a Gi match at an outdoor tournament.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525777'),
  stock('bjj-gi-6', 1280, 720, 640, 'A white-Gi grappler works a takedown on a black-Gi opponent in front of a crowd.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525776'),
  stock('bjj-gi-7', 1280, 720, 640, 'A Gi grappler lifts a leg to escape guard during a tournament match.', LODES, 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=90525774'),
  stock('nogi-grappling', 1280, 914, 640, 'Two No-Gi grapplers in shorts fight for control on the ground in a training hall.', BONICA, 'by 2.0', 'https://commons.wikimedia.org/w/index.php?curid=69216322'),
  stock('nogi-taking-the-back', 1280, 954, 640, 'A grappler takes an opponent’s back on the mat — a key control position.', BONICA, 'by 2.0', 'https://commons.wikimedia.org/w/index.php?curid=69216339'),
  stock('youth-grappling-armlock', 1280, 748, 640, 'A young grappler practises an armlock with a training partner at a youth class.', 'Scott LaPierre', 'by-sa 2.0', 'https://commons.wikimedia.org/w/index.php?curid=20421934'),
  stock('womens-jiu-jitsu-championship', 933, 1400, 426, 'A female jiu-jitsu champion in a white Gi holds her championship belt.', 'Antonin H.', 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=74311133'),
  stock('bjj-class-practice', 1280, 960, 640, 'Students in Gi practise techniques in pairs during a jiu-jitsu class.', 'Jeremiahmac', 'by-sa 4.0', 'https://commons.wikimedia.org/w/index.php?curid=171087070'),
]

export const imageById = (id) => images.find((i) => i.id === id) ?? stockImages.find((i) => i.id === id)

const reelEvents = {
  'facebook-reel-1556103776124272': 'summer-fights-challenge-vcl-lahore',
  'facebook-reel-1324356802578632': 'summer-fights-challenge-vcl-lahore',
  'facebook-reel-1059330276658913': 'summer-fights-challenge-vcl-lahore',
  'facebook-reel-2188316431987014': 'summer-fights-challenge-vcl-lahore',
  'facebook-reel-1755100392307391': 'inter-club-punjab-grappling-nogi-championship',
  'facebook-reel-1069981299123637': 'senior-inter-club-punjab-grappling-championship',
}

export const videos = socialArchive.map((reel) => ({
  id: reel.id,
  type: 'file',
  src: assetPath(reel.src),
  poster: assetPath(reel.poster),
  url: reel.sourceUrl,
  title: reel.title,
  meta: `Saved from ${reel.platform === 'facebook' ? 'Facebook' : 'Instagram'} · Open original for context`,
  event: reelEvents[reel.id] ?? null,
  vertical: reel.height > reel.width,
}))

export const facebookPageUrl = 'https://www.facebook.com/grapplingfederationofpakistan'
