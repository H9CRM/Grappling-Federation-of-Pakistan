import { cn } from '@/lib/utils'

// Badges always carry words, never colour alone (§5.8).
const tones = {
  gold: 'bg-gold text-ink',
  red: 'bg-signal text-white',
  green: 'bg-fed text-white',
  outline: 'border border-fed/30 text-fed bg-white',
  muted: 'bg-offwhite text-steel border border-steel/20',
  dark: 'border border-white/15 bg-white/5 text-white/85',
}

export function Badge({ tone = 'outline', live = false, className, children }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[0.8125rem] font-semibold tracking-wide whitespace-nowrap',
        tones[tone],
        className
      )}
    >
      {live && (
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  )
}
