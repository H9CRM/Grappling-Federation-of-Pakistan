import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, sequence, spring } from '@/lib/motion'
import { imageById } from '@/content/media'
import { TextReveal } from '@/components/motion/primitives'
import { breadcrumbSchema, Seo } from '@/components/seo'
import { PhotoCredit } from '@/components/media/photo-credit'

const frame = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
}

/**
 * Inner-page hero. Choreography: surface → breadcrumb → eyebrow → H1 (masked words) → lead →
 * actions, while the optional photo panel wipes in from below and drifts on scroll.
 * `image` is a media id from content/media.js. Also emits the page's <Seo> + BreadcrumbList.
 */
export function PageHero({ eyebrow, title, lead, crumbs = [], seo, actions, aside, image }) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs]
  const extraSchema = seo?.schema ? (Array.isArray(seo.schema) ? seo.schema : [seo.schema]) : []
  const photo = image ? imageById(image) : null

  return (
    <header className="surface-arena grain relative overflow-hidden pt-[calc(var(--header-h)+var(--bar-h)+2rem)] pb-16 lg:pt-[calc(var(--header-h)+var(--bar-h)+3rem)] lg:pb-24">
      {seo && <Seo {...seo} image={seo.image ?? photo?.src} schema={[breadcrumbSchema(trail), ...extraSchema]} />}

      {/* texture: fine mat grid fading out to the right, plus a low green horizon line */}
      <div aria-hidden="true" className="mat-grid pointer-events-none absolute inset-0 opacity-30 invert" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fed-light/40 to-transparent" />

      <motion.div className="container-site relative" initial="hidden" animate="show" variants={sequence(0.1, 0.1)}>
          <motion.nav aria-label="Breadcrumb" variants={frame}>
            <ol className="t-caption flex flex-wrap items-center gap-1 text-white/60">
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  {i < trail.length - 1 ? (
                    <>
                      <Link to={c.href} className="link-sweep transition-colors hover:text-white">
                        {c.label}
                      </Link>
                      <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                    </>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </motion.nav>

          <div
            className={cn(
              'mt-10 grid gap-10 lg:mt-12',
              photo
                ? 'items-end lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_30rem]'
                : 'items-end lg:grid-cols-[minmax(0,1fr)_auto]'
            )}
          >
            <div className="max-w-3xl">
              {eyebrow && (
                <motion.p variants={frame} className="t-eyebrow mb-5 text-fed-light">
                  {eyebrow}
                </motion.p>
              )}
              <TextReveal as="h1" text={title} animateOnMount delay={0.25} className="t-h1 text-white" />
              {lead && (
                <motion.p variants={frame} className="t-lead mt-6 max-w-2xl text-white/75">
                  {lead}
                </motion.p>
              )}
              {actions && (
                <motion.div variants={frame} className="mt-8 flex flex-wrap gap-3">
                  {actions}
                </motion.div>
              )}
            </div>
            {aside && <motion.div variants={frame}>{aside}</motion.div>}
            {photo && <HeroPhoto photo={photo} />}
          </div>
      </motion.div>
    </header>
  )
}

function HeroPhoto({ photo }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, 60]), spring.soft)
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12])

  return (
    <motion.div ref={ref} className="relative" style={reduce ? undefined : { y }}>
      {/* offset outline frame — a quiet nod to the mat's protection border */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3 -bottom-3 hidden h-full w-full rounded-[28px] border border-fed-light/25 lg:block"
        variants={{ hidden: { opacity: 0, x: -12, y: -12 }, show: { opacity: 1, x: 0, y: 0, transition: { delay: 1, duration: 0.9, ease: ease.out } } }}
      />
    <motion.figure
      className="relative"
      variants={{
        hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0% round 28px)' },
        show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)', transition: { duration: 1.2, ease: ease.expo, delay: 0.35 } },
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-white/10 bg-surface shadow-float lg:aspect-[5/4]">
        <motion.img
          src={photo.srcSmall ?? photo.src}
          srcSet={photo.srcSmall ? `${photo.srcSmall} ${photo.smallWidth}w, ${photo.src} ${photo.width}w` : undefined}
          sizes="(min-width: 1280px) 480px, (min-width: 1024px) 416px, 100vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={reduce ? undefined : { scale: imgScale }}
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 1.6, ease: ease.expo, delay: 0.35 }}
        />
        {/* brand grade: ink at the bottom for the caption, faint green wash for cohesion */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-fed/20 mix-blend-normal" />
        <motion.figcaption
          className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5"
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { delay: 1.1, duration: 0.6, ease: ease.out } } }}
        >
          <span aria-hidden="true" className="mt-1.5 h-8 w-0.5 shrink-0 rounded-full bg-gold" />
          <span className="flex flex-col gap-1">
            {/* stock photos are illustrative, so they carry a credit rather than an event caption */}
            {!photo.stock && <span className="text-sm leading-snug font-medium text-white/85">{photo.caption}</span>}
            <PhotoCredit image={photo} />
          </span>
        </motion.figcaption>
      </div>
    </motion.figure>
    </motion.div>
  )
}
