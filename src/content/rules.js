// UWW International Grappling Rules (May 2025 edition) — read from the official PDF
// (cdn.uww.org/2025-05/grappling_rules_2025.pdf) on 29 Sept 2026. Article numbers cited so
// every line can be checked. GFP events follow these rules; update when UWW issues a new edition.

export const rulesEdition = { name: 'UWW International Grappling Rules', edition: 'May 2025' }

// Art. 4 — the mat (metres)
export const matSpec = {
  contestDiameter: 9, // wrestling area incl. passivity zone
  centralDiameter: 7, // central wrestling surface
  passivityWidth: 1, // orange band inside the 9 m circle
  protectionWidth: 1.5, // border of the same thickness around the circle
  centreCircle: 1, // inside diameter, with a 10 cm band
  notes: [
    'A new UWW-approved mat is obligatory for Championships and Cups; other international events use homologated mats.',
    'The protection area must be a different colour from the mat.',
    'The red grappler takes the left side and the blue grappler the right; both coaches sit on the same side.',
    'The mat is cleaned and disinfected before every grappling session.',
  ],
}

// Art. 22 — bout duration
export const boutDuration = [
  { ages: 'U13, U15 and Veterans', time: '1 × 4 minutes' },
  { ages: 'U17, U20 and Seniors', time: '1 × 5 minutes' },
]

// Art. 36 — technical points
export const scoring = [
  { action: 'Takedown', points: '2', detail: 'Standing to ground with top control held for 3 seconds.' },
  { action: 'Amplitude takedown', points: '3', detail: 'Lifting the opponent above your own waist while staying on your feet.' },
  { action: 'Fast takedown bonus', points: '+2', detail: 'Takedown secured within 3 seconds of a neutral restart.' },
  { action: 'Reversal', points: '2', detail: 'From bottom to top position, control held for 3 seconds.' },
  { action: 'Side mount', points: '3', detail: 'Chest to the opponent, past the guard, back within 45° of the mat — 3 seconds.' },
  { action: 'Full mount', points: '4', detail: 'Sitting on the torso facing the head, both knees down — 3 seconds.' },
  { action: 'Back mount', points: '4', detail: 'Chest to back with heels inside the thighs (or body triangle) — 3 seconds.' },
  { action: 'Attack', points: '1', detail: 'A submission attempt the opponent escapes after at least 3 seconds of real danger.' },
  { action: 'Opponent steps out', points: '1', detail: 'Opponent puts a whole foot in the protection area from standing.' },
  { action: 'Opponent’s caution', points: '1', detail: 'Every caution for passivity or an illegal action gives the opponent 1 point.' },
]

export const scoringNotes = [
  'Dominant positions progress Side mount → Full mount → Back mount; each scores once until the bottom grappler recovers guard, reverses or stands up.',
  'A grappler under a submission attack is not in control and cannot score position points.',
  'Wristlock attempts never score Attack points.',
]

// Art. 29, 37 — how a bout is won (classification points: winner – loser)
export const victories = [
  { type: 'Submission', cp: '5 – 0', detail: 'Opponent taps twice, says “tap/stop”, or the referee stops it for safety.' },
  { type: 'Disqualification / default', cp: '5 – 0', detail: 'Opponent banned, or unable to continue.' },
  { type: 'Technical superiority', cp: '4 – 0', detail: 'A 15-point lead ends the bout immediately.' },
  { type: 'Cautions', cp: '3 – 0', detail: 'Opponent receives 4 cautions.' },
  { type: 'Decision', cp: '3 – 0', detail: 'Ahead on points at the end of regular time.' },
  { type: 'Overtime', cp: '2 – 0', detail: '1-minute, submission-only round from back mount or armbar.' },
]

export const tieBreak = [
  'The grappler who scored the highest-value action wins.',
  'Then the grappler with fewer cautions.',
  'If still level: one minute of submission-only overtime, starting from back mount or an armbar position.',
]

// Art. 39–41 — passivity
export const passivity = [
  'Referee calls a verbal warning: “Red/Blue, action”.',
  'If passivity continues, the referee raises a fist and a 15-second timer starts.',
  'No activity in 15 seconds = 1 caution and 1 point to the opponent.',
  'The 4th caution (passivity and illegal actions combined) disqualifies the grappler.',
  'When a defending grappler puts a foot in the orange passivity zone the referee calls “ZONE” and both must work back to the centre.',
]

// Art. 42 — illegal actions
export const illegal = {
  caution: [
    'Grabbing the uniform in No-Gi (legal in Grappling Gi)',
    'Fingers towards the face or eyes',
    'Ignoring the referee, arguing, insulting or shouting',
    'Oily or sticky substances on the skin',
    'Pretending to be injured',
  ],
  cautionOrFour: [
    'Heel hooks (inside or outside)',
    'Neck cranks and spinal locks (crucifix, twister, can opener…)',
    'Slams and joint locks combined with throws',
    'Small-joint manipulation, or holding fewer than 4 fingers/toes',
    'Finger chokes on the throat; choking with the belt (Gi)',
  ],
  disqualification: [
    'Punches, kicks, knees, elbows or head butts',
    'Biting, hair-pulling, gouging or fish-hooking',
    'Spiking an opponent head- or neck-first',
    'Continuing a lock after the tap or the referee’s stop',
  ],
  youth: 'U13 and U15 may not use guillotines (except arm-in), footlocks (except the straight footlock), calf or bicep slicers, or kneebars.',
}

// Art. 5 — uniform
export const kit = {
  nogi: [
    'Tight-fitting red or blue rashguard (short or long sleeves), at least 60% of the assigned colour.',
    'Board shorts in the matching colour or black, white or grey, covering at least 2/3 of the thigh — no pockets or buttons.',
    'Leggings or compression shorts only underneath the board shorts.',
  ],
  gi: [
    'Red or blue Gi and belt at Championships; elsewhere white (red corner) or black (blue corner) with a red or blue belt.',
    'Cotton, in good condition; sleeves within 5 cm of the wrists, trousers to the ankles.',
    'Women wear a rashguard under the Gi; men do not.',
  ],
  all: [
    'No shoes, jewellery, piercings or under-wired bras; nails trimmed short.',
    'Long hair must be covered; soft ear guards and mouthguards are allowed.',
  ],
}

// Art. 8, 11 — competition system and weigh-in
export const competition = [
  { k: '8 or more athletes', v: 'Direct elimination; everyone beaten by a finalist enters repechage. Two bronze medals.' },
  { k: '6–7 athletes', v: 'Two pools, then semi-finals (1st A v 2nd B, 2nd A v 1st B). One bronze medal.' },
  { k: 'Fewer than 6', v: 'One Nordic pool: everyone grapples everyone.' },
  { k: 'Weigh-in', v: 'Morning of the category, 30 minutes, in rashguard and shorts, with medical check.' },
  { k: 'Rest', v: 'At least 20 minutes between an athlete’s bouts.' },
  { k: 'Officials', v: 'Each bout has a referee, a judge and a mat chairman — never from the athletes’ countries.' },
]

// Art. 7 — weight categories by age (kg)
export const weightsByAge = [
  { age: 'U13', ages: '12–13', male: '27, 30, 34, 38, 42, 46, 50, 55, 60, 66, 72, 90', female: '27, 30, 34, 38, 42, 46, 50, 72' },
  { age: 'U15', ages: '14–15', male: '29–32, 35, 38, 42, 47, 53, 59, 66, 73, 100', female: '28–30, 32, 34, 37, 40, 44, 48, 52, 57, 80' },
  { age: 'U17', ages: '16–17', male: '39–42, 46, 50, 54, 58, 63, 69, 76, 85, 110', female: '36–38, 40, 43, 46, 49, 52, 56, 60, 65, 90' },
  { age: 'U20', ages: '18–20', male: '58, 62, 66, 71, 77, 84, 92, 100, 130', female: '49, 53, 58, 64, 71, 90' },
  { age: 'Seniors', ages: '20+', male: '58, 62, 66, 71, 77, 84, 92, 100, 130', female: '53, 58, 64, 71, 90' },
  { age: 'Veterans', ages: '35–60', male: '62, 66, 71, 77, 84, 92, 100, 130', female: '—' },
]
