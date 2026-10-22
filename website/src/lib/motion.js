// GFP motion vocabulary. One set of easings/springs so every interaction feels related.
// Rule of thumb: tweens for reveals (directed, calm), springs for anything the user touches.

export const ease = {
  out: [0.22, 1, 0.36, 1], // default reveal
  expo: [0.16, 1, 0.3, 1], // masks, large surfaces
  inOut: [0.65, 0, 0.35, 1], // page transitions
}

export const spring = {
  press: { type: 'spring', stiffness: 520, damping: 30, mass: 0.6 }, // buttons, taps
  hover: { type: 'spring', stiffness: 300, damping: 24 }, // cards, lifts
  layout: { type: 'spring', stiffness: 380, damping: 34 }, // indicators, shared layout
  follow: { stiffness: 420, damping: 36, mass: 0.5 }, // cursor, pointer-linked values
  soft: { stiffness: 90, damping: 22, mass: 0.8 }, // scroll-linked smoothing
}

export const dur = { fast: 0.25, base: 0.6, slow: 0.9 }

// Viewport settings used by every scroll-triggered reveal
export const inView = { once: true, margin: '0px 0px -12% 0px' }

// Container that choreographs children in sequence ("frames")
export const sequence = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

// Distinct reveal styles — pick by content type, don't default to one everywhere.
export const reveal = {
  // Paragraphs / supporting copy: a short, quiet rise
  text: {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: ease.out } },
  },
  // Cards: lift from slightly lower with a touch of scale
  card: {
    hidden: { opacity: 0, y: 32, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: ease.out } },
  },
  // Badges, chips, CTAs: settle in on a spring
  pop: {
    hidden: { opacity: 0, scale: 0.92, y: 8 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
  },
  // Horizontal entries for list rows / timelines
  slide: {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: ease.out } },
  },
  // Decorative lines/rules drawing across
  rule: {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.1, ease: ease.expo } },
  },
  // Plain opacity — for elements that shouldn't move (tables, dense data)
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8, ease: ease.out } },
  },
}
