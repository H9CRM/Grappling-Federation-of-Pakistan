import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Play, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'
import { Stagger } from '@/components/motion/primitives'
import { Button } from '@/components/brand/button'
import { assetPath } from '@/lib/urls'
import { FacebookIcon } from '@/components/brand/social'

// Players are created only after the visitor presses play. Every preview uses the
// same frame; object-contain preserves the full portrait or landscape footage.

const embedSrc = (v) => {
  if (v.type === 'youtube') return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`
  if (v.type === 'instagram') return `${v.url.replace(/\/?$/, '/')}embed/`
  if (v.type === 'facebook')
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false&autoplay=true`
  return null
}

export function VideoGallery({ items, columns = 4 }) {
  return (
    <Stagger
      className={cn(
        'grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2',
        columns >= 3 && 'lg:grid-cols-3',
        columns >= 4 && 'xl:grid-cols-4'
      )}
    >
      {items.map((v) => (
        <Stagger.Item key={v.id} className="min-w-0">
          <VideoCard video={v} />
        </Stagger.Item>
      ))}
    </Stagger>
  )
}

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  return (
    <figure className="group/v flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-steel/15 bg-white shadow-card transition-shadow duration-500 hover:shadow-card-hover">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
        {playing && video.type === 'file' ? (
          <video controls autoPlay playsInline preload="metadata" poster={video.poster} aria-label={video.title} className="absolute inset-0 h-full w-full object-contain">
            <source src={video.src} type="video/mp4" />
          </video>
        ) : playing ? (
          <motion.iframe
            key="player"
            src={embedSrc(video)}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <motion.button
                key="poster"
                type="button"
                onClick={() => setPlaying(true)}
                data-cursor="Play"
                aria-label={`Play video: ${video.title}`}
                className="absolute inset-0 flex items-center justify-center overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold"
                exit={{ opacity: 0 }}
              >
                {video.poster ? (
                  <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
                ) : (
                  // No public poster frame for Facebook reels: branded placeholder with the mat motif
                  <span aria-hidden="true" className="surface-arena absolute inset-0">
                    <span className="mat-grid absolute inset-0 opacity-40 invert" />
                    <img src={assetPath('/brand/gfp-logo-96.webp')} alt="" width="40" height="40" loading="lazy" className="absolute top-4 left-4 size-10 rounded-full" />
                    <span className="absolute top-5 right-4 flex items-center gap-1.5 text-xs font-semibold text-white/70">
                      <FacebookIcon className="size-3.5" /> Reel
                    </span>
                    <span className="font-display absolute inset-x-4 bottom-4 text-left text-xl leading-tight font-semibold text-white">
                      {video.title}
                    </span>
                  </span>
                )}
                <span className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                <motion.span
                  className="relative flex size-16 items-center justify-center rounded-full bg-gold text-ink shadow-gold"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={spring.press}
                >
                  <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
                </motion.span>
          </motion.button>
        )}
      </div>
      <figcaption className="flex flex-1 flex-col p-5">
        <p className="min-w-0 font-semibold text-ink">{video.title}</p>
        {video.meta && <p className="t-caption mt-1 text-steel">{video.meta}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-3 text-sm">
          {video.url && <a href={video.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-semibold text-fed underline underline-offset-4">Open original post</a>}
          {video.src && <a href={video.src} download className="inline-flex min-h-11 items-center font-semibold text-fed underline underline-offset-4">Download video</a>}
        </div>
      </figcaption>
    </figure>
  )
}

/** Live Facebook Page feed (Page Plugin), loaded only after the visitor opts in. */
export function FacebookFeed({ pageUrl }) {
  const [load, setLoad] = useState(false)
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(pageUrl)}&tabs=timeline&width=500&height=720&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`

  return (
    <div className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-2xl border border-steel/15 bg-white shadow-card">
      <AnimatePresence mode="wait" initial={false}>
        {load ? (
          <motion.iframe
            key="feed"
            src={src}
            title="Grappling Federation of Pakistan on Facebook"
            width="500"
            height="720"
            className="block h-[720px] w-full"
            allow="encrypted-media; picture-in-picture; web-share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: ease.out }}
          />
        ) : (
          <motion.div key="gate" exit={{ opacity: 0 }} className="flex h-[420px] flex-col items-center justify-center p-8 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-fed text-white">
              <FacebookIcon className="size-8" />
            </span>
            <p className="t-card mt-6 text-ink">Latest posts and videos from Facebook</p>
            <p className="t-caption mt-2 flex max-w-xs items-start gap-2 text-steel">
              <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-fed" />
              Loading the feed connects to Facebook, which may set cookies.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button onClick={() => setLoad(true)} variant="solid" icon={null}>Load Facebook feed</Button>
              <Button href={pageUrl} variant="ghost" icon="external">Open Facebook</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
