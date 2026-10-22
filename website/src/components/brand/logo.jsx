import { cn } from '@/lib/utils'

// Official GFP crest (supplied Sept 2026), pre-cropped to a circular badge in public/brand/.
// Sized with explicit width/height so it never causes layout shift.
// `tight`: hide the subtitle between lg and xl, where the desktop nav needs the room (header only)
export function Logo({ className, compact = false, size = 40, tight = false }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <img
        src="/brand/gfp-logo-96.webp"
        srcSet="/brand/gfp-logo-96.webp 96w, /brand/gfp-logo-192.webp 192w"
        sizes={`${size}px`}
        width={size}
        height={size}
        alt=""
        decoding="async"
        className="shrink-0 rounded-full shadow-[0_0_0_2px_rgb(255_255_255/0.15)]"
        style={{ width: size, height: size }}
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.375rem] font-bold tracking-[0.04em] uppercase">GFP</span>
          <span className={cn('mt-0.5 hidden text-[0.6875rem] font-medium tracking-[0.08em] uppercase opacity-70 sm:block', tight && 'lg:hidden xl:block')}>
            Grappling Federation of Pakistan
          </span>
        </span>
      )}
    </span>
  )
}
