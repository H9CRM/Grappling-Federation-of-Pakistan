import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Dialog } from 'radix-ui'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, inView, spring } from '@/lib/motion'
import { eventPath, findEvent } from '@/content/events'
import { FacebookIcon, InstagramIcon } from '@/components/brand/social'
import { org } from '@/content/site'
import { PhotoCredit } from './photo-credit'

/**
 * Masonry gallery. Thumbnails mask-reveal on scroll; clicking morphs the image into a
 * lightbox (shared layoutId). Arrow keys / swipe navigate, Esc closes, focus is trapped.
 * `withSocialTiles` appends "more on Instagram/Facebook" tiles so a small gallery still reads as complete.
 */
export function ImageGallery({ items, withSocialTiles = true }) {
  const [index, setIndex] = useState(null)
  const open = index !== null

  const go = useCallback((dir) => setIndex((i) => (i + dir + items.length) % items.length), [items.length])

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
        {items.map((img, i) => (
          <motion.li
            key={img.id}
            initial={{ opacity: 0, clipPath: 'inset(12% 0% 0% 0% round 16px)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 16px)' }}
            viewport={inView}
            transition={{ duration: 0.9, ease: ease.expo, delay: (i % 3) * 0.08 }}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="View"
              className="group/g relative block w-full overflow-hidden rounded-2xl bg-ink text-left shadow-card"
            >
              <motion.img
                layoutId={`gallery-${img.id}`}
                src={img.srcSmall ?? img.src}
                srcSet={img.srcSmall ? `${img.srcSmall} ${img.smallWidth}w, ${img.src} ${img.width}w` : undefined}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                alt={img.alt}
                width={img.width}
                height={img.height}
                // Not lazy: Chrome's lazy-loading misfires inside CSS columns and leaves blank tiles.
                // Low priority keeps these from competing with above-the-fold images.
                fetchPriority="low"
                decoding="async"
                className="h-auto w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover/g:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 transition-opacity duration-500 group-hover/g:opacity-100 group-focus-visible/g:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover/g:translate-y-0 group-hover/g:opacity-100 group-focus-visible/g:translate-y-0 group-focus-visible/g:opacity-100">
                <span className="text-sm font-semibold text-white">{img.caption}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur">
                  <Maximize2 aria-hidden="true" className="size-4" />
                </span>
              </span>
              <span className="sr-only">Open image: {img.caption}</span>
            </button>
            {img.credit && <div className="px-2 pt-2"><PhotoCredit image={img} dark={false} /></div>}
          </motion.li>
        ))}
        {withSocialTiles &&
          org.social.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease: ease.out, delay: 0.1 + i * 0.08 }}
            >
              <SocialTile social={s} />
            </motion.li>
          ))}
      </ul>

      <Lightbox items={items} index={index} open={open} onClose={() => setIndex(null)} go={go} />
    </>
  )
}

function SocialTile({ social }) {
  const Icon = social.label === 'Instagram' ? InstagramIcon : FacebookIcon
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="Open"
      className={cn(
        'group/st relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-card',
        social.label === 'Instagram' ? 'surface-arena' : 'bg-fed'
      )}
    >
      <span aria-hidden="true" className="absolute -top-16 -right-16 size-48 rounded-full border border-white/10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/st:scale-125" />
      <span aria-hidden="true" className="absolute -top-8 -right-8 size-32 rounded-full border border-white/10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/st:scale-150" />
      <Icon className="relative size-8" />
      <span className="relative">
        <span className="t-eyebrow block text-white/60">More on {social.label}</span>
        <span className="t-h3 mt-2 block">{social.label === 'Instagram' ? 'Reels & posters' : 'Photos & fight nights'}</span>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
          <span className="link-sweep pb-0.5">{social.handle}</span>
          <span aria-hidden="true" className="transition-transform group-hover/st:translate-x-1">→</span>
        </span>
      </span>
    </a>
  )
}

function Lightbox({ items, index, open, onClose, go }) {
  const [dir, setDir] = useState(0)
  const img = index !== null ? items[index] : null
  const event = img?.event ? findEvent(img.event.year, img.event.slug) : null
  const many = items.length > 1

  const step = useCallback(
    (d) => {
      setDir(d)
      go(d)
    },
    [go]
  )

  useEffect(() => {
    if (!open || !many) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, many, step])

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && img && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              forceMount
              aria-describedby={undefined}
              className="fixed inset-0 z-[81] flex flex-col items-center justify-center p-4 outline-none sm:p-8"
              onClick={(e) => e.target === e.currentTarget && onClose()}
            >
              <Dialog.Title className="sr-only">{img.caption}</Dialog.Title>

              <div className="pointer-events-none relative flex max-h-[calc(100svh-9rem)] w-full max-w-5xl flex-1 items-center justify-center">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.img
                    key={img.id}
                    layoutId={`gallery-${img.id}`}
                    src={img.src}
                    alt={img.alt}
                    custom={dir}
                    initial={dir ? { opacity: 0, x: dir * 60 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    exit={dir ? { opacity: 0, x: dir * -60 } : undefined}
                    transition={spring.layout}
                    drag={many ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) step(1)
                      else if (info.offset.x > 80) step(-1)
                    }}
                    className="pointer-events-auto max-h-full max-w-full cursor-grab rounded-xl object-contain shadow-float active:cursor-grabbing"
                  />
                </AnimatePresence>
              </div>

              <motion.div
                className="mt-5 flex w-full max-w-5xl items-center justify-between gap-4 text-white"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                exit={{ opacity: 0 }}
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{img.caption}</p>
                  {event && (
                    <Link to={eventPath(event)} onClick={onClose} className="link-sweep t-caption text-fed-light">
                      View event: {event.shortTitle}
                    </Link>
                  )}
                  {img.sourceUrl && <a href={img.sourceUrl} target="_blank" rel="noreferrer" className="t-caption block text-fed-light underline underline-offset-4">View original Facebook post</a>}
                  {img.credit && <PhotoCredit image={img} />}
                </div>
                {many && (
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="t-caption tnum mr-2 text-white/60">
                      {index + 1} / {items.length}
                    </span>
                    <NavButton label="Previous image" onClick={() => step(-1)}><ChevronLeft className="size-5" /></NavButton>
                    <NavButton label="Next image" onClick={() => step(1)}><ChevronRight className="size-5" /></NavButton>
                  </div>
                )}
              </motion.div>

              <Dialog.Close asChild>
                <motion.button
                  className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full border border-white/20 bg-ink/50 text-white backdrop-blur hover:border-white/50 sm:top-6 sm:right-6"
                  aria-label="Close gallery"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="size-5" aria-hidden="true" />
                </motion.button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
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
      className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-gold hover:bg-gold hover:text-ink"
    >
      {children}
    </motion.button>
  )
}
