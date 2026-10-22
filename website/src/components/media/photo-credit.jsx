import { cn } from '@/lib/utils'

/** Attribution for Creative Commons photos (required by CC BY / BY-SA). Renders nothing for GFP's own media. */
// `tabbable={false}` for decorative duplicates (e.g. carousel loop copies) that are aria-hidden
export function PhotoCredit({ image, className, dark = true, tabbable = true }) {
  if (!image?.credit) return null
  const { creator, license, licenseUrl, source } = image.credit
  const link = cn('underline decoration-current/40 underline-offset-2 transition-colors', dark ? 'hover:text-white' : 'hover:text-ink')
  return (
    <span className={cn('text-[0.6875rem] leading-snug', dark ? 'text-white/55' : 'text-steel', className)}>
      Photo:{' '}
      <a href={source} target="_blank" rel="noreferrer" className={link} tabIndex={tabbable ? undefined : -1}>{creator}</a>
      {' · '}
      <a href={licenseUrl} target="_blank" rel="noreferrer license" className={link} tabIndex={tabbable ? undefined : -1}>{license}</a>
    </span>
  )
}
