import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ease, inView } from '@/lib/motion'
import { matSpec, rulesEdition } from '@/content/rules'

// Scale drawing of the UWW grappling mat (Art. 4). 1 SVG unit = 10 cm.
// 12 m square = 9 m circle + 1.5 m protection border each side.
// Circle r = 45 (9 m), central surface r = 35 (7 m), centre circle r = 5 inside + 1 band (1 m + 10 cm).
// The real passivity band is orange; it's drawn in brand gold so it reads as its own zone.

const zones = [
  {
    id: 'central',
    name: 'Central wrestling area',
    size: `${matSpec.centralDiameter} m diameter`,
    desc: 'Where the bout is fought. Bouts start and restart in the middle.',
    swatch: 'bg-tint border-fed/30',
  },
  {
    id: 'passivity',
    name: 'Passivity zone',
    size: `${matSpec.passivityWidth} m wide band`,
    desc: 'Orange on a real mat, part of the 9 m wrestling area. A foot here makes the referee call “ZONE”.',
    swatch: 'bg-gold border-gold-dark',
  },
  {
    id: 'protection',
    name: 'Protection area',
    size: `${matSpec.protectionWidth} m border`,
    desc: 'Same thickness as the mat, different colour. Stepping into it from standing gives the opponent 1 point.',
    swatch: 'bg-steel/25 border-steel/40',
  },
  {
    id: 'centre',
    name: 'Centre circle',
    size: `${matSpec.centreCircle} m inside, 10 cm band`,
    desc: 'The referee calls both grapplers here to start; neutral restarts have one foot on it.',
    swatch: 'bg-white border-fed',
  },
]

const draw = (delay, duration = 1.3) => ({
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration, ease: ease.expo, delay }, opacity: { duration: 0.2, delay } } },
})
const fade = (delay) => ({ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6, delay } } })
const pop = (delay) => ({
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 20, delay } },
})

export function MatDiagram({ className }) {
  const [active, setActive] = useState(null)
  const dim = (id) => (active && active !== id ? 0.22 : 1)
  const focusProps = (id) => ({
    onPointerEnter: () => setActive(id),
    onPointerLeave: () => setActive(null),
  })

  return (
    <figure className={cn('grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12', className)}>
      <div className="relative rounded-3xl border border-steel/15 bg-white p-4 shadow-card sm:p-6">
        <motion.svg
          viewBox="-14 -22 148 172"
          className="w-full"
          role="img"
          aria-labelledby="mat-title mat-desc"
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <title id="mat-title">UWW grappling competition mat, drawn to scale</title>
          <desc id="mat-desc">
            A 12 metre square: a 9 metre circle made of a 7 metre central wrestling area and a 1 metre passivity band,
            surrounded by a 1.5 metre protection area, with a 1 metre centre circle. Red starts on the left, blue on the right.
          </desc>
          <defs>
            <marker id="arr" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,0 L6,3 L0,6 z" fill="#0a5c43" />
            </marker>
            <radialGradient id="central-fill" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e6f0ec" />
            </radialGradient>
            <pattern id="prot-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="3" stroke="#5b6670" strokeOpacity="0.18" strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Frame 1 — protection area (square minus circle via even-odd) */}
          <motion.g variants={fade(0)} style={{ opacity: dim('protection') }} className="transition-opacity duration-300" {...focusProps('protection')}>
            <path
              d="M0,0 H120 V120 H0 Z M60,15 A45,45 0 1,0 60,105 A45,45 0 1,0 60,15 Z"
              fillRule="evenodd"
              fill="#5b6670"
              fillOpacity="0.14"
            />
            <path d="M0,0 H120 V120 H0 Z M60,15 A45,45 0 1,0 60,105 A45,45 0 1,0 60,15 Z" fillRule="evenodd" fill="url(#prot-hatch)" />
            <rect x="0" y="0" width="120" height="120" rx="1.5" fill="none" stroke="#5b6670" strokeOpacity="0.5" strokeWidth="0.5" />
          </motion.g>

          {/* Frame 2 — passivity band */}
          <motion.g variants={fade(0.25)} style={{ opacity: dim('passivity') }} className="transition-opacity duration-300" {...focusProps('passivity')}>
            <circle cx="60" cy="60" r="40" fill="none" stroke="#f2b705" strokeOpacity="0.62" strokeWidth="10" />
          </motion.g>

          {/* Frame 3 — central area + outlines */}
          <motion.g variants={fade(0.4)} style={{ opacity: dim('central') }} className="transition-opacity duration-300" {...focusProps('central')}>
            <circle cx="60" cy="60" r="35" fill="url(#central-fill)" />
          </motion.g>
          <motion.circle cx="60" cy="60" r="45" fill="none" stroke="#0a5c43" strokeWidth="0.7" variants={draw(0.3)} />
          <motion.circle cx="60" cy="60" r="35" fill="none" stroke="#0a5c43" strokeOpacity="0.6" strokeWidth="0.5" variants={draw(0.5)} />

          {/* Frame 4 — centre circle (1 m inside, 10 cm band) */}
          <motion.g variants={pop(0.9)} style={{ opacity: dim('centre'), originX: '60px', originY: '60px' }} className="transition-opacity duration-300" {...focusProps('centre')}>
            <circle cx="60" cy="60" r="5.5" fill="none" stroke="#0a5c43" strokeWidth="1" />
          </motion.g>

          {/* Frame 5 — red / blue starting sides */}
          <motion.g variants={pop(1.1)}>
            {/* in the protection area either side of the circle — red left, blue right (Art. 4) */}
            <rect x="2" y="56" width="11" height="8" rx="1.5" fill="#b3261e" />
            <text x="7.5" y="61.4" textAnchor="middle" fontSize="3.6" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">RED</text>
            <rect x="107" y="56" width="11" height="8" rx="1.5" fill="#1d4ed8" />
            <text x="112.5" y="61.4" textAnchor="middle" fontSize="3.4" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">BLUE</text>
          </motion.g>

          {/* Frame 6 — dimension lines */}
          <g fontFamily="Inter, sans-serif" fill="#0a5c43" fontWeight="600">
            {/* 9 m circle diameter (top) */}
            <motion.line x1="15" y1="-8" x2="105" y2="-8" stroke="#0a5c43" strokeWidth="0.45" markerStart="url(#arr)" markerEnd="url(#arr)" variants={draw(1.2, 0.9)} />
            <motion.line x1="15" y1="-11" x2="15" y2="60" stroke="#0a5c43" strokeOpacity="0.25" strokeWidth="0.3" strokeDasharray="1 1" variants={fade(1.2)} />
            <motion.line x1="105" y1="-11" x2="105" y2="60" stroke="#0a5c43" strokeOpacity="0.25" strokeWidth="0.3" strokeDasharray="1 1" variants={fade(1.2)} />
            <motion.text x="60" y="-11" textAnchor="middle" fontSize="4.6" variants={fade(1.5)}>9 m wrestling area</motion.text>

            {/* 7 m central diameter (inside, split around the centre circle) */}
            <motion.line x1="25" y1="72" x2="95" y2="72" stroke="#0a5c43" strokeWidth="0.4" markerStart="url(#arr)" markerEnd="url(#arr)" variants={draw(1.35, 0.9)} />
            <motion.text x="60" y="78" textAnchor="middle" fontSize="4" variants={fade(1.6)}>7 m central area</motion.text>

            {/* 1 m passivity + 1.5 m protection (right, below the blue marker) */}
            <motion.line x1="95" y1="84" x2="105" y2="84" stroke="#0a5c43" strokeWidth="0.4" markerStart="url(#arr)" markerEnd="url(#arr)" variants={draw(1.5, 0.6)} />
            <motion.text x="100" y="89.5" textAnchor="middle" fontSize="3.6" variants={fade(1.7)}>1 m</motion.text>
            <motion.line x1="105" y1="96" x2="120" y2="96" stroke="#0a5c43" strokeWidth="0.4" markerStart="url(#arr)" markerEnd="url(#arr)" variants={draw(1.6, 0.6)} />
            <motion.text x="112.5" y="101.5" textAnchor="middle" fontSize="3.6" variants={fade(1.8)}>1.5 m</motion.text>

            {/* 12 m overall (bottom) */}
            <motion.line x1="0" y1="130" x2="120" y2="130" stroke="#0a5c43" strokeWidth="0.45" markerStart="url(#arr)" markerEnd="url(#arr)" variants={draw(1.7, 1)} />
            <motion.text x="60" y="137.5" textAnchor="middle" fontSize="4.6" variants={fade(1.9)}>12 m including protection area</motion.text>
          </g>
        </motion.svg>
      </div>

      <figcaption>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {zones.map((z, i) => (
            <motion.li
              key={z.id}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.6, ease: ease.out, delay: 0.3 + i * 0.08 }}
            >
              <button
                type="button"
                onPointerEnter={() => setActive(z.id)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(z.id)}
                onBlur={() => setActive(null)}
                aria-pressed={active === z.id}
                className={cn(
                  'flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300',
                  active === z.id ? 'border-fed/40 bg-white shadow-card' : 'border-transparent hover:bg-white/70'
                )}
              >
                <span aria-hidden="true" className={cn('mt-1 size-5 shrink-0 rounded-md border-2', z.swatch)} />
                <span>
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-semibold text-ink">{z.name}</span>
                    <span className="font-display text-lg font-semibold text-fed tnum">{z.size}</span>
                  </span>
                  <span className="t-caption mt-1 block text-ink/70">{z.desc}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
        <p className="t-caption mt-4 px-4 text-steel">
          Drawn to scale from {rulesEdition.name} ({rulesEdition.edition}), Article 4.
        </p>
      </figcaption>
    </figure>
  )
}
