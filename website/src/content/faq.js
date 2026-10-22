// Answer-first FAQs (< 60 words each) per strategy §4.4. Used on /faq, home and topic pages.
import { events, isUpcoming, sortedEvents } from './events.js'
import { clubs } from './clubs.js'

export const faqs = [
  {
    id: 'what-is-gfp',
    topic: 'Federation',
    q: 'What is the Grappling Federation of Pakistan?',
    a: 'GFP is the national federation for grappling in Pakistan, listed by United World Wrestling (UWW) as its member federation for the sport. It runs Gi and No-Gi competitions and registers athletes, clubs, coaches and referees.',
  },
  {
    id: 'bjj',
    topic: 'Sport',
    q: 'Is grappling the same as Brazilian Jiu-Jitsu?',
    a: 'No. Brazilian Jiu-Jitsu is one of several styles UWW grappling brings together, alongside submission wrestling, catch wrestling and luta livre.',
  },
  {
    id: 'pwf',
    topic: 'Federation',
    q: 'Is GFP the same as the Pakistan Wrestling Federation?',
    a: 'No. The Pakistan Wrestling Federation governs Olympic freestyle and Greco-Roman wrestling, while GFP governs UWW grappling.',
  },
  {
    id: 'jujitsu',
    topic: 'Federation',
    q: 'How is grappling different from ju-jitsu?',
    a: 'Grappling is governed internationally by United World Wrestling. Ju-jitsu is governed by the Ju-Jitsu International Federation (JJIF) and in Pakistan by the Pakistan Ju-Jitsu Federation. They are separate sports with separate rules.',
  },
  {
    id: 'gi-nogi',
    topic: 'Sport',
    q: 'What is the difference between Gi and No-Gi?',
    a: 'Gi athletes wear a kimono that can be gripped, while No-Gi athletes wear a rashguard and shorts.',
  },
  {
    id: 'striking',
    topic: 'Sport',
    q: 'Is striking allowed in grappling?',
    a: 'No. Points come from takedowns, positional control and submissions.',
  },
  {
    id: 'register-docs',
    topic: 'Registration',
    q: 'What do I need to register as an athlete?',
    a: 'Your CNIC (or B-Form for under-18s), a recent photo, your club name, and parental consent if you are under 18.',
  },
  {
    id: 'profile',
    topic: 'Registration',
    q: 'Do I need to register separately for every event?',
    a: 'No. GFP registration gives you one athlete profile valid for all GFP-sanctioned events in the calendar year. You still enter each event’s divisions.',
  },
  {
    id: 'licence',
    topic: 'Registration',
    q: 'Do I need a UWW licence?',
    a: 'Only for international competition. A UWW international licence is valid for the current year only and must be requested at least two months before the competition.',
  },
  {
    id: 'format',
    topic: 'Competition',
    q: 'How many matches will I get at a GFP event?',
    a: 'Divisions with five or fewer athletes use a round-robin (Nordic) format, so every athlete gets multiple matches. Larger divisions use direct elimination with repechage, as in UWW rules.',
  },
  {
    id: 'weights',
    topic: 'Competition',
    q: 'What are the senior weight classes?',
    a: 'Senior men compete at 58, 62, 66, 71, 77, 84, 92, 100 and 130 kg. Senior women compete at 53, 58, 64, 71 and 90 kg.',
  },
  {
    id: 'rankings',
    topic: 'Competition',
    q: 'How do national rankings work?',
    a: 'Athletes earn ranking points for 1st, 2nd and 3rd place. Points count only in the style, age category and weight class where they were earned, and rankings are updated after every GFP-sanctioned event.',
  },
  {
    id: 'women-kit',
    topic: 'Community',
    q: 'Can women compete in modest kit?',
    a: 'Yes. UWW rules allow long-sleeve rashguards and leggings under shorts, and the Gi style gives full coverage.',
  },
  {
    id: 'kids-safe',
    topic: 'Community',
    q: 'Is grappling safe for children?',
    a: 'Grappling has no strikes and most action takes place on the ground, which is why UWW’s rulebook describes it as one of the safest wrestling sports to practise. Choose an affiliated club with a safeguarding lead.',
  },
  {
    id: 'affiliate',
    topic: 'Clubs',
    q: 'How does my gym become affiliated?',
    a: 'Affiliated clubs need a registered coach, a safe matted area, first aid provision and a safeguarding lead. Affiliated clubs appear in the national directory, earn club ranking points and can host sanctioned events.',
  },
]

// ---- Expanded library (Sept 2026). Sources: UWW International Grappling Rules (May 2025,
// article numbers in comments), the GFP strategy report, and the events/clubs data files.
faqs.push(
  // Federation
  { id: 'who-leads', topic: 'Federation', q: 'Who leads the Grappling Federation of Pakistan?', a: 'GFP is led by President Aqeel Ahmed Jamil and General Secretary Faiz Alam Faizi, with office-bearers in Lahore and Rawalpindi. The full list is on the Leadership page.' },
  { id: 'where-based', topic: 'Federation', q: 'Where is GFP based?', a: 'GFP’s headquarters is in Lahore, at 12 UGF Central Plaza, Barkat Market. Most GFP tournaments and fight nights are held in Lahore.' },
  { id: 'contact-gfp', topic: 'Federation', q: 'How do I contact GFP?', a: 'Use the form on the Contact page, email grappling.pk@gmail.com or call +92 300 4318826. Choose a topic — events, registration, clubs, media or safeguarding — so your message reaches the right person.' },
  { id: 'uww-recognised', topic: 'Federation', q: 'Is GFP recognised by United World Wrestling?', a: 'Yes. United World Wrestling lists GFP in its national-federation directory as Pakistan’s member federation for the grappling style.' },
  { id: 'psb-status', topic: 'Federation', q: 'Is GFP affiliated with the Pakistan Sports Board?', a: 'GFP publishes its Pakistan Sports Board and Pakistan Olympic Association status only once it is formally confirmed. New PSB affiliations must meet the criteria of the PSB Constitution 2022.' },
  { id: 'mma-link', topic: 'Federation', q: 'Does GFP deal with MMA?', a: 'GFP governs grappling. UWW’s Grappling & Pankration Committee also promotes Amateur MMA, and some GFP fight nights have included MMA bouts alongside grappling divisions.' },
  { id: 'pmmaf', topic: 'Federation', q: 'How is GFP different from Pakistan’s MMA federations?', a: 'PMMAF and PakMMAF are mixed martial arts bodies; GFP governs UWW grappling, which has no strikes. GFP has co-organised events with PMMAF, such as IFT Pass Session 3 in 2025.' },
  { id: 'bjj-federation', topic: 'Federation', q: 'Is GFP a Brazilian Jiu-Jitsu federation?', a: 'No. Brazilian Jiu-Jitsu is one of the styles that UWW grappling brings together, and GFP runs grappling under UWW rules. BJJ athletes can compete in GFP’s Gi and No-Gi divisions.' },
  { id: 'associations-exist', topic: 'Federation', q: 'Are there provincial grappling associations?', a: 'Yes. Provincial and regional associations organise local events — for example, the Grappling Association of Balochistan ran the Quetta Grappling Championship 2024. See the Associations page.' },
  { id: 'uww-since', topic: 'Federation', q: 'When did UWW start governing grappling?', a: 'United World Wrestling officially introduced grappling among its regulated wrestling styles in 2007.' },
  { id: 'follow-gfp', topic: 'Federation', q: 'Where can I follow GFP’s news?', a: 'Event announcements, posters, reels and results are posted on GFP’s Facebook and Instagram pages, and every event is listed on this website’s Events page.' },

  // Sport
  { id: 'styles-included', topic: 'Sport', q: 'Which styles does UWW grappling include?', a: 'Submission grappling (Gi and No-Gi), submission wrestling, Brazilian Jiu-Jitsu, luta livre, catch wrestling, Lancashire wrestling, shoot wrestling and combat wrestling.' },
  { id: 'submission-def', topic: 'Sport', q: 'What counts as a submission?', a: 'A grappler submits by tapping the opponent or the mat at least twice, or by saying “tap” or “stop”. Below Senior Championships the referee may also stop a hold to protect an athlete.' },
  { id: 'guard-def', topic: 'Sport', q: 'What is the guard?', a: 'The guard is when the bottom grappler uses one or both legs to control the opponent and block a dominant position. UWW rules define closed, open and half guard.' },
  { id: 'dominant-positions', topic: 'Sport', q: 'What are the dominant positions in grappling?', a: 'Side mount (3 points), full mount (4 points) and back mount (4 points), each held with control for 3 seconds.' },
  { id: 'vs-freestyle', topic: 'Sport', q: 'How is grappling different from freestyle wrestling?', a: 'Both are UWW styles, but in grappling you can win by submission — joint locks and chokes — and much of the bout is fought on the ground.' },
  { id: 'ancient', topic: 'Sport', q: 'Is grappling an ancient sport?', a: 'UWW describes grappling as the modern wrestling style closest to Ancient Greek wrestling, or Pále, practised at the ancient Olympic Games.' },

  // Competition (UWW Art. 8, 11, 14–15, 23, 26, 28–30, 36–41)
  { id: 'takedown-points', topic: 'Competition', q: 'How many points is a takedown?', a: 'Two points, when the action starts standing and ends on the ground with top control held for 3 seconds. Lifting the opponent above your waist first makes it a 3-point amplitude takedown.' },
  { id: 'fast-takedown', topic: 'Competition', q: 'What is a fast takedown?', a: 'A takedown secured within 3 seconds of a neutral restart earns 2 extra points on top of the takedown value.' },
  { id: 'reversal-points', topic: 'Competition', q: 'How many points is a reversal?', a: 'Two points for going from bottom to top with 3 seconds of control, plus the dominant-position points if you land directly in one.' },
  { id: 'attack-point', topic: 'Competition', q: 'What is an Attack point?', a: 'One point for a submission attempt that put the opponent in real danger for at least 3 seconds before they escaped. Wristlock attempts never score it.' },
  { id: 'step-out', topic: 'Competition', q: 'What happens if I step out of the mat?', a: 'If you put a whole foot in the protection area from standing without completing a takedown, your opponent gets 1 point and the bout restarts in the centre.' },
  { id: 'tech-superiority', topic: 'Competition', q: 'What is technical superiority?', a: 'A 15-point lead. The bout ends as soon as the action finishes, and the leader wins by technical superiority.' },
  { id: 'overtime', topic: 'Competition', q: 'How does overtime work?', a: 'If points and tie-break criteria are level, there is one minute of submission-only overtime, starting from a back mount or armbar position. The attacker must submit to win.' },
  { id: 'tie-score', topic: 'Competition', q: 'What happens if the score is tied?', a: 'The grappler who scored the highest-value action wins. If still level, the one with fewer cautions wins; otherwise the bout goes to overtime.' },
  { id: 'four-cautions', topic: 'Competition', q: 'What happens after four cautions?', a: 'The fourth caution — for passivity, illegal actions or both combined — disqualifies the grappler, who loses the bout.' },
  { id: 'passivity', topic: 'Competition', q: 'What is passivity in grappling?', a: 'Stalling. After a verbal warning the referee starts a 15-second clock; if the grappler still doesn’t work, they receive a caution and the opponent gets 1 point.' },
  { id: 'zone-call', topic: 'Competition', q: 'What does the referee mean by “ZONE”?', a: 'It means the defending grappler has a foot in the orange passivity zone at the edge of the mat. Both grapplers must work back towards the centre without stopping.' },
  { id: 'officials', topic: 'Competition', q: 'Who officiates a grappling bout?', a: 'A referee, a judge and a mat chairman. None of them may be from the same country as the grapplers in the bout.' },
  { id: 'rest-between', topic: 'Competition', q: 'How much rest do I get between bouts?', a: 'At least 20 minutes from the end of your previous bout.' },
  { id: 'classification-points', topic: 'Competition', q: 'What are classification points?', a: 'Points given for each win, used to rank athletes across a competition: 5 for a submission, 4 for technical superiority, 3 for a decision, 2 for an overtime win.' },
  { id: 'brackets', topic: 'Competition', q: 'How are grappling brackets organised?', a: 'By direct elimination. Everyone beaten by a finalist goes into repechage, and the two repechage winners each take a bronze medal.' },
  { id: 'six-seven', topic: 'Competition', q: 'What happens if only 6 or 7 athletes enter a category?', a: 'They are split into two pools. The top two in each pool meet in cross-over semi-finals, and only one bronze medal is awarded.' },
  { id: 'move-up', topic: 'Competition', q: 'Can I compete in a higher weight class?', a: 'Senior athletes may choose the next category up from their weigh-in weight, except the heaviest: men must weigh under 130 kg and women under 90 kg.' },
  { id: 'u15-weights', topic: 'Competition', q: 'What are the U15 weight classes?', a: 'Boys: 29–32, 35, 38, 42, 47, 53, 59, 66, 73 and 100 kg. Girls: 28–30, 32, 34, 37, 40, 44, 48, 52, 57 and 80 kg.' },
  { id: 'u17-weights', topic: 'Competition', q: 'What are the U17 weight classes?', a: 'Boys: 39–42, 46, 50, 54, 58, 63, 69, 76, 85 and 110 kg. Girls: 36–38, 40, 43, 46, 49, 52, 56, 60, 65 and 90 kg.' },
  { id: 'u13-weights', topic: 'Competition', q: 'What are the U13 weight classes?', a: 'Boys: 27, 30, 34, 38, 42, 46, 50, 55, 60, 66, 72 and 90 kg. Girls: 27, 30, 34, 38, 42, 46, 50 and 72 kg.' },
  { id: 'veterans', topic: 'Competition', q: 'Are there veterans categories?', a: 'Yes. Veterans aged 35–60 compete in divisions A to E, in men’s categories from 62 to 130 kg, with 4-minute bouts.' },
  { id: 'age-rule', topic: 'Competition', q: 'How is my age category decided?', a: 'By your year of birth. U15, U17 and U20 athletes may compete one year early with medical and parental authorisation.' },
  { id: 'weigh-in', topic: 'Competition', q: 'When is the weigh-in?', a: 'On the morning of your category. It lasts 30 minutes, includes a medical check, and you weigh in wearing a rashguard and shorts.' },

  // Kit (Art. 5)
  { id: 'grab-uniform', topic: 'Kit', q: 'Can you grab the uniform in grappling?', a: 'Not in No-Gi — intentionally grabbing the uniform earns a caution. In Grappling Gi, gripping the kimono is legal.' },
  { id: 'nogi-kit', topic: 'Kit', q: 'What do I wear for No-Gi grappling?', a: 'A tight red or blue rashguard with short or long sleeves, and board shorts covering at least two-thirds of the thigh. Leggings or compression shorts may go underneath.' },
  { id: 'gi-colour', topic: 'Kit', q: 'What colour Gi do I need?', a: 'At Championships, red or blue Gi and belt to match your corner. At other events a white Gi (red corner) or black Gi (blue corner) with a red or blue belt is allowed.' },
  { id: 'jewellery', topic: 'Kit', q: 'Can I wear jewellery or shoes on the mat?', a: 'No. Shoes, rings, necklaces, piercings and under-wired bras are not allowed, and nails must be trimmed short.' },
  { id: 'protection-gear', topic: 'Kit', q: 'Can I wear a mouthguard or ear guards?', a: 'Yes. Mouthguards and soft, UWW-approved ear guards without metal or hard shells are allowed. Long hair must be covered.' },

  // Safety (Art. 26, 29, 42, 46)
  { id: 'dq-actions', topic: 'Safety', q: 'What gets a grappler disqualified?', a: 'Strikes, biting, hair-pulling, gouging, spiking an opponent head-first, or keeping a lock on after the tap or the referee’s stop.' },
  { id: 'kids-banned', topic: 'Safety', q: 'Which techniques are banned for children?', a: 'U13 and U15 may not use guillotines (except arm-in), footlocks other than the straight footlock, calf or bicep slicers, or kneebars.' },
  { id: 'bleeding', topic: 'Safety', q: 'What happens if an athlete is bleeding?', a: 'The referee stops the bout for treatment. If treatment time adds up to more than 4 minutes in one bout, that athlete loses by injury.' },
  { id: 'unconscious', topic: 'Safety', q: 'What happens if a grappler loses consciousness?', a: 'The referee stops the bout and the opponent wins by submission. If it was caused by a blow to the head, the athlete is withdrawn from the rest of the competition for medical care.' },
  { id: 'doping', topic: 'Safety', q: 'Does GFP test for doping?', a: 'GFP follows UWW anti-doping rules, and any athlete selected for international competition may be tested.' },
  { id: 'report-concern', topic: 'Safety', q: 'How do I report a safeguarding concern?', a: 'Contact the GFP secretariat in confidence through the Contact page, choosing “Safeguarding” as the topic.' },

  // Events
  { id: 'entry-fee', topic: 'Events', q: 'How much does it cost to enter a GFP event?', a: 'Each event page lists its own fee. Recent GFP events have charged PKR 500, with a PKR 1,000 late entry for the Defence Day Fight Night.' },
  { id: 'results-where', topic: 'Events', q: 'Where are GFP results published?', a: 'On each event’s page — the Summer Fights Challenge 2026 result card is there — and on GFP’s official social channels. National rankings follow the next sanctioned event.' },
  { id: 'worlds-2026', topic: 'Events', q: 'When are the 2026 Grappling World Championships?', a: 'UWW holds the Grappling, Amateur MMA and Pankration World Championships in Baku, 23–29 November 2026, for U15, U17, U20 and Seniors.' },
  { id: 'asian-2024', topic: 'Events', q: 'Has Pakistan competed at the Asian Grappling Championships?', a: 'Yes. Pakistan was one of six nations at the 2024 Asian Grappling Championships in Tagaytay, Philippines, represented by Muhammad Ovais Shah.' },
  { id: 'host-event', topic: 'Events', q: 'Can my club host a GFP event?', a: 'Affiliated clubs and provincial associations can apply to host GFP-sanctioned events. Contact the events team through the Contact page.' },

  // Community / clubs / registration / education
  { id: 'kids-start-age', topic: 'Community', q: 'From what age can children start grappling?', a: 'Competition categories start at U13 (ages 12–13), but many clubs teach younger children — UMAF in Lahore, for example, lists classes from age 5.' },
  { id: 'women-only-classes', topic: 'Community', q: 'Are there women-only grappling classes?', a: 'GFP’s Women’s Wing supports women-only classes and female coaches. Clubs offering women-only sessions will be listed as they affiliate.' },
  { id: 'choose-club', topic: 'Clubs', q: 'How do I choose a good grappling club?', a: 'Look for a registered coach, a safe matted area, first aid on site and a named safeguarding lead — the requirements for GFP affiliation.' },
  { id: 'under-18', topic: 'Registration', q: 'Can under-18s register with GFP?', a: 'Yes. Under-18s register with a B-Form instead of a CNIC and need parental consent.' },
  { id: 'licence-insurance', topic: 'Registration', q: 'What does the UWW licence cover?', a: 'It lets you compete in UWW-calendar events and also acts as insurance for medical and hospital costs if you are injured at an international competition abroad.' },
  { id: 'become-referee', topic: 'Education', q: 'How do I become a grappling referee?', a: 'Study the UWW International Grappling Rules, attend a GFP referee seminar, then officiate under supervision at sanctioned events. Register your interest on the Education page.' },
  { id: 'coach-register', topic: 'Education', q: 'Do coaches need to register with GFP?', a: 'Yes, for affiliated clubs. A registered coach is one of the requirements for GFP club affiliation, and registered coaches can enter athletes in events.' }
)

// Rules answers — UWW International Grappling Rules (May 2025), Art. 22, 29, 42
faqs.push(
  {
    id: 'bout-length',
    topic: 'Competition',
    q: 'How long is a grappling match?',
    a: 'Under UWW rules a bout is one period of 5 minutes for U17, U20 and Seniors, and 4 minutes for U13, U15 and Veterans. A submission or a 15-point lead ends it early.',
  },
  {
    id: 'how-to-win',
    topic: 'Competition',
    q: 'How do you win a grappling match?',
    a: 'By submission, by a 15-point lead (technical superiority), by points at the end of time, or if the opponent gets 4 cautions or is disqualified. A tie goes to the higher-value action, then fewer cautions, then a 1-minute submission-only overtime.',
  },
  {
    id: 'heel-hooks',
    topic: 'Competition',
    q: 'Are heel hooks allowed in UWW grappling?',
    a: 'No. Inside and outside heel hooks, neck cranks, slams and small-joint manipulation are illegal. U13 and U15 athletes are also barred from guillotines (except arm-in), most footlocks, slicers and kneebars.',
  }
)

// Data-driven answers (AEO): regenerated from events/clubs so they never go stale.
const upcoming = sortedEvents().filter(isUpcoming)
const gfpPast = events.filter((e) => e.organizer.startsWith('Grappling Federation') && !isUpcoming(e))
const clubCities = [...new Set(clubs.map((c) => c.city))]
const list = (xs) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}` : xs[0])

faqs.push(
  {
    id: 'next-events',
    topic: 'Competition',
    q: 'What grappling events are coming up in Pakistan?',
    a: `${list(upcoming.map((e) => `${e.shortTitle} (${e.dateLabel}, ${e.city})`))}. Full details and registration are on the GFP events page.`,
  },
  {
    id: 'events-held',
    topic: 'Federation',
    q: 'What events has the Grappling Federation of Pakistan organised?',
    a: `GFP has organised ${gfpPast.length} grappling tournaments and fight nights since 2025, including ${list(gfpPast.slice(0, 4).map((e) => e.shortTitle))}, mostly in Lahore.`,
  },
  {
    id: 'find-club',
    topic: 'Clubs',
    q: 'Where can I train grappling in Pakistan?',
    a: `GFP lists ${clubs.length} member academies in ${list(clubCities)}. Most are in Lahore, including VCL Gym and Akhara MMA & Fitness Studio, which host GFP events.`,
  }
)

export const faqById = (ids) => ids.map((id) => faqs.find((f) => f.id === id)).filter(Boolean)
