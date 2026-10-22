// Member academies as listed by GFP's own admins on its Boltmore federation profile
// (boltmore.com/public/federations/1, checked 29 Sept 2026). Addresses, descriptions and
// registered-fighter counts come from each academy's own Boltmore page; logos and cover photos
// are the clubs' own uploads (downloaded with approval). Self-reported: confirm each club's
// affiliation status before marking it `verified`.

export const clubsSource = {
  label: 'GFP federation profile on Boltmore',
  href: 'https://boltmore.com/public/federations/1',
  checked: 'September 2026',
}

const BM = 'https://boltmore.com/public/academies/'

const club = (c) => ({
  logo: c.id && c.hasLogo ? `/media/clubs/${c.id}-logo.webp` : null,
  cover: c.id && c.hasCover ? `/media/clubs/${c.id}-cover.webp` : null,
  verified: false,
  ...c,
})

export const clubs = [
  club({
    id: 'school-of-martial-arts', name: 'The School of Martial Arts', city: 'Lahore', fighters: 26,
    address: '12 UGF Central Plaza, Barkat Market, Lahore', hasLogo: true, hasCover: true,
    profile: `${BM}the-school-of-martial-arts-1`,
  }),
  club({
    id: 'uma-altaf-tafu', name: 'UMA — Altaf Tafu', city: 'Lahore', fighters: 35,
    address: '14 Madina Colony, Walton, Lahore', hasCover: true,
    note: 'Competes at GFP inter-club championships.',
    profile: `${BM}uma-altaf-tafu-22`,
  }),
  club({
    id: 'as-suffa-mma-jhelum', name: 'As-Suffa MMA Jhelum', city: 'Jhelum', fighters: 22,
    hasLogo: true, hasCover: true, note: 'Competed at the Inter Club Punjab No-Gi Championship 2026.',
    profile: `${BM}as-suffa-mma-jhelum-7`,
  }),
  club({
    id: 'vcl-gym', name: 'VCL Gym', city: 'Lahore', fighters: 15,
    address: 'M Block Civic Centre, Model Town, Lahore', hasLogo: true,
    desc: 'Physical fitness centre and home of the Vehshi Championship League — MMA, pro wrestling and fitness.',
    note: 'Host venue: Summer Fights Challenge, Grappling Challenge and Senior Inter Club Punjab 2026.',
    profile: `${BM}vcl-gym-2`,
  }),
  club({
    id: 'shaheen-mma', name: 'Shaheen MMA', city: 'Lahore', fighters: 13,
    address: 'Charid Pind, DHA, Lahore', hasLogo: true, hasCover: true,
    profile: `${BM}shaheen-mma-11`,
  }),
  club({
    id: 'sherazi-martial-arts', name: 'Sherazi Martial Arts Club', city: 'Lahore', fighters: 7,
    address: 'Sher Shah Colony, Raiwind Road, Lahore', desc: 'Mixed martial arts and kickboxing.',
    profile: `${BM}sherazi-martial-arts-club-21`,
  }),
  club({
    id: 'maf-club', name: 'MAF Club (Martial Arts and Fitness Club)', city: 'Lahore', fighters: 4,
    address: 'Hunza Block, Allama Iqbal Town and A Block, Sabzazar, Lahore',
    desc: 'Founded by Rafique Siddique, gold medallist at the 5th Asian Indoor and Martial Arts Games, Ashgabat 2017.',
    note: 'Venue of GFP open-mat grappling camps.',
    profile: `${BM}maf-club-martialarts-and-fitness-club-17`,
  }),
  club({
    id: 'akhara-mma', name: 'Akhara MMA & Fitness Studio', city: 'Lahore', fighters: 3,
    address: 'Plot 51, Block C, PIA Road, Lahore', hasLogo: true, hasCover: true,
    desc: 'MMA, grappling, kickboxing, Muay Thai, karate, taekwondo, self-defence and yoga.',
    note: 'Host venue: Inter Club Punjab No-Gi 2026 and Defence Day Fight Night 2026.',
    profile: `${BM}akhara-mma-fitness-studio-30`,
  }),
  club({
    id: 'revival-pro-wrestling', name: 'Revival Pro Wrestling (RPW)', city: 'Lahore', fighters: 3,
    address: 'Sports Board Coaching Centre, Lahore', hasLogo: true, hasCover: true,
    profile: `${BM}revival-pro-wrestling-8`,
  }),
  club({
    id: 'salaar-sports-academy', name: 'Salaar Sports Academy', city: 'Quetta', fighters: 3,
    address: 'Kasi Road, Tin Town, Quetta', hasLogo: true, hasCover: true, desc: 'Kickboxing and combat sports.',
    profile: `${BM}salaar-sports-academy-12`,
  }),
  club({
    id: 'headquarters-mma-multan', name: 'The Headquarters MMA and Fitness Studio', city: 'Multan', fighters: 1,
    address: '26-A Model Town, B Block Market, Multan', hasLogo: true, hasCover: true,
    profile: `${BM}the-headquarters-mma-and-fitness-studio-5`,
  }),
  club({
    id: 'ninja-training-center', name: 'Ninja Training Center Gujrat', city: 'Gujrat', fighters: 1,
    address: 'Ladies and Children Park, Gujrat', desc: 'Training martial arts in Gujrat since July 2008.',
    profile: `${BM}ninja-training-center-gujrat-10`,
  }),
  club({
    id: 'umaf', name: 'Ultimate Martial Arts and Fitness (UMAF)', city: 'Lahore', fighters: 1,
    address: 'Ghazi Pul, Muslimabad, Taj Bagh, Lahore', hasLogo: true, hasCover: true,
    desc: 'Karate and fitness for ages 5 and up.',
    profile: `${BM}ultimate-martial-arts-and-fitness-umaf-15`,
  }),
  club({
    id: 'pakistan-karate-gymnastic-center', name: 'Pakistan Karate & Gymnastic Center', city: 'Lahore', fighters: 1,
    address: 'Ferozwala Sports Complex, Lahore', desc: 'Sports karate, gymnastics and martial arts.',
    note: 'Host venue: Ramadan Fight Night 2026 and Grapple Mania 2025.',
    profile: `${BM}pakistan-karate-gymnastic-center-14`,
  }),
  club({
    id: 'kakar-boxing-club', name: 'Kakar Boxing Club', city: 'Lahore', fighters: 1,
    address: 'Jilani Park, Race Course, Lahore', desc: 'Boxing coaching.',
    profile: `${BM}kakar-boxing-club-6`,
  }),
  club({
    id: 'pak-warrior-mma', name: 'Pak Warrior MMA Club', city: 'Lahore', fighters: 1,
    address: 'Green Town, Lahore', hasLogo: true, desc: 'MMA, boxing, taekwondo, kickboxing and gymnastics.',
    profile: `${BM}pak-warrior-mma-club-24`,
  }),
  club({
    id: 'blue-angels-martial-arts', name: 'Blue Angels Martial Arts', city: 'Lahore', fighters: 1,
    address: 'Shalamar Garden, Lahore', hasLogo: true, hasCover: true,
    profile: `${BM}blue-angels-martial-arts-27`,
  }),
]
