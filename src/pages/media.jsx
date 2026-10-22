import { Download, Film, Images } from 'lucide-react'
import { facebookPageUrl, images, stockImages, videos } from '@/content/media'
import { PhotoCredit } from '@/components/media/photo-credit'
import { org } from '@/content/site'
import { absoluteUrl, assetPath } from '@/lib/urls'
import { PageHero } from '@/components/layout/page-hero'
import { Section, SectionHeading } from '@/components/layout/section'
import { CtaBand } from '@/components/blocks'
import { Button } from '@/components/brand/button'
import { SocialCards, InstagramIcon } from '@/components/brand/social'
import { Reveal } from '@/components/motion/primitives'
import { ImageGallery } from '@/components/media/image-gallery'
import { FacebookFeed, VideoGallery } from '@/components/media/video-gallery'

export default function Media() {
  const instagram = org.social.find((s) => s.label === 'Instagram')

  return (
    <>
      <PageHero
        image="facebook-122309375390206468"
        eyebrow="Media"
        title="Grappling Photos and Videos from Pakistan"
        lead="Event photography, result cards and fight-night video from GFP competitions — plus the latest posts from our official channels."
        crumbs={[{ label: 'Media', href: '/media' }]}
        seo={{
          title: 'GFP Media | Grappling Photos & Videos Pakistan',
          description: 'Photo and video gallery of the Grappling Federation of Pakistan: events, results, fight nights and official social channels.',
          path: '/media',
          schema: {
            '@type': 'ImageGallery',
            name: 'GFP photo gallery',
            image: images.map((i) => ({ '@type': 'ImageObject', contentUrl: absoluteUrl(i.src), caption: i.caption, width: i.width, height: i.height })),
          },
        }}
        actions={
          <>
            <Button href="#photos" icon={null} onClick={jump('photos')}>
              <Images aria-hidden="true" className="size-[1.1em]" /> Photos
            </Button>
            <Button href="#videos" variant="onDark" icon={null} onClick={jump('videos')}>
              <Film aria-hidden="true" className="size-[1.1em]" /> Videos
            </Button>
          </>
        }
      />

      <Section tone="offwhite" tight>
        <div className="container-site">
          <SectionHeading eyebrow="Official channels" title="Follow the Federation" lead="Event announcements, posters, reels and results are posted first on GFP’s official pages." />
          <Reveal type="card" delay={0.1} className="mt-10">
            <SocialCards />
          </Reveal>
        </div>
      </Section>

      <Section tone="white" id="photos">
        <div className="container-site">
          <SectionHeading eyebrow="Gallery" title="Photo Gallery" lead="Select an image to view it full size. Use the arrow keys or swipe to move between photos." />
          <div className="mt-12">
            <ImageGallery items={images} />
          </div>
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="container-site">
          <SectionHeading eyebrow="The sport" title="Grappling in Focus" lead="Illustrative Gi, No-Gi and training photography. These licensed images do not depict GFP events; photographer credit appears with each image." />
          <div className="mt-12"><ImageGallery items={stockImages} withSocialTiles={false} /></div>
        </div>
      </Section>

      <Section tone="tint" id="videos">
        <div aria-hidden="true" className="mat-grid absolute inset-0" />
        <div className="container-site relative">
          <SectionHeading eyebrow="Video" title="Video Gallery" lead="Fight-night highlights and event reels from GFP’s official channels." />

          {videos.length > 0 && (
            <div className="mt-12">
              <VideoGallery items={videos} />
            </div>
          )}

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_500px]">
            <Reveal type="text" className="lg:pt-6">
              <h3 className="t-h3 text-ink">{videos.length ? 'More on our channels' : 'Watch on our channels'}</h3>
              <p className="mt-4 max-w-xl text-ink/75">
                GFP’s fight-night videos and reels are published on Facebook and Instagram. Load the live Facebook feed
                here, or open Instagram for the latest reels.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={instagram.href} variant="secondary" icon="external">
                  <InstagramIcon className="size-[1.1em]" /> Reels on Instagram
                </Button>
              </div>
            </Reveal>
            <Reveal type="card" delay={0.1}>
              <FacebookFeed pageUrl={facebookPageUrl} />
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="white" tight>
        <div className="container-site grid items-center gap-10 lg:grid-cols-[auto_1fr]">
          <Reveal type="pop">
            <img src={assetPath('/brand/gfp-logo-192.webp')} width="144" height="144" alt="Grappling Federation of Pakistan crest" className="size-36 rounded-full shadow-card" loading="lazy" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Press" title="Media Kit and Press Accreditation" lead="Journalists can download official GFP logos and event photos for editorial use, with credit to the Grappling Federation of Pakistan." />
            <Reveal type="pop" delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <Button href={assetPath(org.logo)} download="gfp-logo.png" variant="solid" icon={null}>
                <Download aria-hidden="true" className="size-[1.1em]" /> Download logo (PNG)
              </Button>
              <Button to="/contact" variant="ghost">Request press accreditation</Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="offwhite" tight id="credits">
        <div className="container-site">
          <h2 className="t-h3 text-fed">Photo credits</h2>
          <p className="mt-3 max-w-2xl text-[0.9375rem] text-ink/75">
            Event photos are from GFP’s official channels. Illustrative grappling photography is used under Creative
            Commons licences from Wikimedia Commons:
          </p>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2 lg:grid-cols-3">
            {stockImages.map((img) => (
              <li key={img.id} className="text-ink/80">
                <span className="text-ink">{img.alt.split(/[.—]/)[0]}</span> — <PhotoCredit image={img} dark={false} className="text-[0.8125rem]" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Have photos or video from a GFP event?"
        body="Send them to the secretariat with the photographer’s name so we can credit them in the gallery."
        primary={{ label: 'Send media', to: '/contact' }}
      />
    </>
  )
}

// In-page anchors: let Lenis-aware native scroll handle it without a route change.
const jump = (id) => (e) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
