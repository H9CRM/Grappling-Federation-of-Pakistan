import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'
import { Stagger } from '@/components/motion/primitives'

// Wrap each search word in <mark> (case-insensitive); plain string when there's nothing to mark.
function Highlight({ text, words }) {
  if (!words.length) return text
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return text.split(re).map((part, i) =>
    i % 2 ? <mark key={i} className="rounded-sm bg-gold/45 px-0.5 text-inherit">{part}</mark> : part
  )
}

// Accessible disclosure list (button[aria-expanded] → region) with Motion height + icon morph.
export function FaqList({ items, className, dark = false, highlight = '' }) {
  const words = highlight.trim().split(/\s+/).filter((w) => w.length > 1)
  const [open, setOpen] = useState(null)
  const uid = useId()

  return (
    <Stagger stagger={0.05} className={cn('divide-y', dark ? 'divide-white/10' : 'divide-steel/15', className)}>
      {items.map((f) => {
        const isOpen = open === f.id
        const btnId = `${uid}-${f.id}-q`
        const panelId = `${uid}-${f.id}-a`
        return (
          <Stagger.Item key={f.id} type="text">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className={cn(
                  'group/faq flex w-full items-start justify-between gap-6 py-5 text-left font-sans text-[1.0625rem] font-semibold tracking-normal transition-colors lg:py-6 lg:text-lg',
                  dark ? 'text-white hover:text-fed-light' : 'text-ink hover:text-fed'
                )}
              >
                <span><Highlight text={f.q} words={words} /></span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={spring.layout}
                  className={cn(
                    'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
                    isOpen
                      ? 'border-fed bg-fed text-white'
                      : dark
                        ? 'border-white/20 group-hover/faq:border-white/50'
                        : 'border-steel/30 group-hover/faq:border-fed'
                  )}
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                    className={cn('max-w-3xl pr-12 pb-6', dark ? 'text-white/75' : 'text-ink/75')}
                  >
                    <Highlight text={f.a} words={words} />
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </Stagger.Item>
        )
      })}
    </Stagger>
  )
}
