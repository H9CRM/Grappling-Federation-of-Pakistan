import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'
import { PhotoCredit } from '@/components/media/photo-credit'

/**
 * Endless photo carousel.
 * - Loop: the list renders 3× and the track sits in the middle copy; after every move it
 *   silently re-centres, so it never runs out in either direction.
 * - Desktop: previous / next buttons, counter + progress, gentle autoplay (pauses on hover,
 *   focus, drag, off-screen, hidden tab, reduced motion).
 * - Touch: finger drag with flick momentum and snap-to-card; no scrollbar, no buttons.
 *   `touch-action: pan-y` keeps vertical page scrolling working while swiping sideways.
 */
export function InfiniteCarousel({ items, label = 'Photo highlights', autoPlay = 5000, className, controlsSlot }) {
  const N = items.length
  const loop = [...items, ...items, ...items]
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)
  const pos = useRef(N) // index in the tripled list (middle copy = N … 2N-1)
  const anim = useRef(null)
  const stepPx = useRef(0)
  const dragged = useRef(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const inView = useInView(viewportRef, { margin: '-20% 0px' })
  const reduce = useReducedMotion()

  const wrap = (i) => ((i % N) + N) % N

  // measure one card + gap; keep the current card in place on resize
  useLayoutEffect(() => {
    const measure = () => {
      const first = trackRef.current?.children[0]
      if (!first) return
      const gap = parseFloat(getComputedStyle(trackRef.current).columnGap) || 0
      stepPx.current = first.getBoundingClientRect().width + gap
      x.set(-pos.current * stepPx.current)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [x])

  const recentre = useCallback(
    (i) => {
      let j = i
      if (j >= 2 * N) j -= N
      if (j < N) j += N
      if (j !== i) x.set(-j * stepPx.current)
      pos.current = j
    },
    [N, x]
  )

  const goTo = useCallback(
    (i) => {
      const target = Math.max(0, Math.min(3 * N - 1, i))
      pos.current = target
      setActive(wrap(target))
      anim.current?.stop()
      anim.current = animate(x, -target * stepPx.current, {
        ...(reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 34, mass: 0.9 }),
        onComplete: () => recentre(target),
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [N, x, reduce, recentre]
  )

  const next = useCallback(() => goTo(pos.current + 1), [goTo])
  const prev = useCallback(() => goTo(pos.current - 1), [goTo])

  // autoplay
  useEffect(() => {
    if (!autoPlay || reduce || paused || !inView) return
    const id = setInterval(() => document.visibilityState === 'visible' && next(), autoPlay)
    return () => clearInterval(id)
  }, [autoPlay, reduce, paused, inView, next])

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
  }

  return (
    <div className={className}>
      {/* controls row (desktop only): counter, progress, prev/next */}
      <div className="container-site mb-8 hidden items-center justify-between gap-6 md:flex">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg font-semibold text-ink tnum" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} <span className="text-steel/60">/ {String(N).padStart(2, '0')}</span>
          </span>
          <span className="relative h-0.5 w-40 overflow-hidden rounded-full bg-steel/15" aria-hidden="true">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-fed"
              animate={{ width: `${((active + 1) / N) * 100}%` }}
              transition={{ duration: 0.5, ease: ease.out }}
            />
          </span>
          {controlsSlot}
        </div>
        <div className="flex gap-2">
          <NavButton label="Previous photo" onClick={prev}><ArrowLeft className="size-5" /></NavButton>
          <NavButton label="Next photo" onClick={next}><ArrowRight className="size-5" /></NavButton>
        </div>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="overflow-hidden rounded-none outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <motion.ul
          ref={trackRef}
          className="flex w-max cursor-grab gap-4 pl-[var(--gutter)] active:cursor-grabbing lg:gap-5 min-[80rem]:pl-[max(var(--gutter),calc((100vw-80rem)/2+var(--gutter)))]"
          style={{ x, touchAction: 'pan-y' }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.12}
          onDragStart={() => {
            anim.current?.stop()
            dragged.current = true
            setPaused(true)
          }}
          onDragEnd={(_, info) => {
            // snap to the nearest card, carrying some of the flick's momentum
            const raw = -x.get() / stepPx.current - info.velocity.x / (stepPx.current * 3)
            goTo(Math.round(raw))
            setTimeout(() => { dragged.current = false; setPaused(false) }, 50)
          }}
          onClickCapture={(e) => {
            // a drag should never open the card's link
            if (dragged.current) { e.preventDefault(); e.stopPropagation() }
          }}
        >
          {loop.map((img, i) => {
            const copy = i < N || i >= 2 * N
            const logical = i % N
            return (
              <li
                key={`${img.id}-${i}`}
                aria-hidden={copy || undefined}
                aria-roledescription="slide"
                aria-label={copy ? undefined : `${logical + 1} of ${N}`}
                className="w-[78vw] shrink-0 select-none sm:w-[56vw] md:w-[40vw] lg:w-[24rem] xl:w-[26rem]"
              >
                <Slide img={img} tabbable={!copy} />
              </li>
            )
          })}
        </motion.ul>
      </div>
    </div>
  )
}

function Slide({ img, tabbable }) {
  const inner = (
    <>
      <img
        src={img.srcSmall ?? img.src}
        srcSet={img.srcSmall ? `${img.srcSmall} ${img.smallWidth}w, ${img.src} ${img.width}w` : undefined}
        sizes="(min-width: 1280px) 416px, (min-width: 1024px) 384px, (min-width: 768px) 40vw, 78vw"
        alt={img.alt}
        draggable="false"
        loading="eager"
        fetchPriority="low"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/slide:scale-[1.05]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
      <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
        <span
          className={cn(
            'w-fit rounded-full px-2.5 py-0.5 text-[0.6875rem] font-bold tracking-wider uppercase',
            img.stock ? 'bg-white/15 text-white' : 'bg-gold text-ink'
          )}
        >
          {img.stock ? (img.id.startsWith('nogi') ? 'No-Gi' : 'Gi') : 'GFP event'}
        </span>
        <span className="line-clamp-2 text-[0.9375rem] leading-snug font-semibold text-white transition-transform duration-500 group-hover/slide:-translate-y-0.5">
          {img.stock ? (img.id.startsWith('nogi') ? 'No-Gi grappling' : 'Grappling Gi') : img.caption}
        </span>
      </span>
    </>
  )
  const cls = 'group/slide relative block aspect-[4/5] overflow-hidden rounded-2xl bg-ink shadow-card'
  const to = img.event ? `/events/${img.event.year}/${img.event.slug}` : img.stock ? null : '/media'

  return (
    <figure>
      {to ? (
        <Link to={to} className={cls} data-cursor="View" draggable="false" tabIndex={tabbable ? undefined : -1}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
      {/* credit sits outside the card link so links never nest */}
      <figcaption className="mt-2 min-h-4 px-1">{img.stock && <PhotoCredit image={img} dark={false} tabbable={tabbable} />}</figcaption>
    </figure>
  )
}

function NavButton({ label, onClick, children }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={spring.press}
      className="flex size-12 items-center justify-center rounded-full border border-steel/25 bg-white text-ink shadow-control transition-colors hover:border-fed hover:bg-fed hover:text-white"
    >
      {children}
    </motion.button>
  )
}
