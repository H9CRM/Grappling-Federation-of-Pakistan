import { useDeferredValue, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ChevronDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease, spring } from '@/lib/motion'
import { FaqList } from '@/components/faq-list'

// Searchable, filterable FAQ: topic chips + free-text search + quick "filter words".
// Shows `initial` answers, then "Show more" reveals `step` more at a time.

const QUICK_WORDS = ['weight', 'kids', 'women', 'points', 'submission', 'kit', 'fee', 'licence', 'referee', 'Lahore', 'heel hook', 'UWW']

const normalise = (s) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, "'")

export function FaqExplorer({ items, initial = 30, step = 20, className }) {
  const topics = useMemo(() => {
    const counts = items.reduce((m, f) => ({ ...m, [f.topic]: (m[f.topic] || 0) + 1 }), {})
    return ['All', ...Object.keys(counts).sort((a, b) => counts[b] - counts[a])].map((t) => ({ t, n: t === 'All' ? items.length : counts[t] }))
  }, [items])

  const [topic, setTopic] = useState('All')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(initial)
  const q = useDeferredValue(query)

  const filtered = useMemo(() => {
    const words = normalise(q).split(/\s+/).filter(Boolean)
    return items.filter(
      (f) =>
        (topic === 'All' || f.topic === topic) &&
        words.every((w) => normalise(`${f.q} ${f.a} ${f.topic}`).includes(w))
    )
  }, [items, topic, q])

  const shown = filtered.slice(0, limit)
  const remaining = filtered.length - shown.length
  const reset = () => setLimit(initial)

  return (
    <div className={className}>
      {/* search */}
      <div className="relative max-w-2xl">
        <label htmlFor="faq-search" className="sr-only">Search the FAQ</label>
        <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-steel" />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); reset() }}
          placeholder={`Search ${items.length} questions — try “weight classes” or “heel hook”`}
          className="h-14 w-full rounded-full border border-steel/30 bg-white pr-12 pl-13 text-base text-ink shadow-control transition-[border-color,box-shadow] outline-none placeholder:text-steel/70 focus-visible:border-fed focus-visible:shadow-[0_0_0_4px_rgb(10_92_67/0.15)] focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        <AnimatePresence>
          {query && (
            <motion.button
              type="button"
              aria-label="Clear search"
              onClick={() => { setQuery(''); reset() }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-steel hover:bg-tint hover:text-fed"
            >
              <X className="size-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* quick filter words */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="t-caption mr-1 text-steel">Popular:</span>
        {QUICK_WORDS.map((w) => {
          const on = normalise(query) === normalise(w)
          return (
            <button
              key={w}
              type="button"
              aria-pressed={on}
              onClick={() => { setQuery(on ? '' : w); reset() }}
              className={cn(
                'h-8 rounded-full border px-3 text-sm transition-colors',
                on ? 'border-gold-dark bg-gold font-semibold text-ink' : 'border-steel/25 bg-white text-ink/75 hover:border-fed hover:text-fed'
              )}
            >
              {w}
            </button>
          )
        })}
      </div>

      {/* topics */}
      <LayoutGroup id="faq-explorer-topics">
        <div role="group" aria-label="Filter by topic" className="-mx-[var(--gutter)] mt-6 flex gap-2 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]">
          {topics.map(({ t, n }) => (
            <button
              key={t}
              type="button"
              aria-pressed={topic === t}
              onClick={() => { setTopic(t); reset() }}
              className={cn(
                'relative h-10 shrink-0 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors',
                topic === t ? 'border-fed text-white' : 'border-steel/25 bg-white text-ink hover:border-fed hover:text-fed'
              )}
            >
              {topic === t && <motion.span layoutId="faq-explorer-pill" className="absolute inset-0 rounded-full bg-fed" transition={spring.layout} />}
              <span className="relative">
                {t} <span className="ml-1 opacity-60 tnum">{n}</span>
              </span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <p className="t-caption mt-4 text-steel" aria-live="polite">
        {filtered.length === items.length
          ? `Showing ${shown.length} of ${items.length} questions`
          : `${filtered.length} ${filtered.length === 1 ? 'question matches' : 'questions match'}${q ? ` “${q}”` : ''}${topic !== 'All' ? ` in ${topic}` : ''}`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-fed/30 bg-white p-8 text-center">
          <p className="t-card text-ink">No answers found.</p>
          <p className="mt-2 text-steel">Try fewer words, another topic — or ask us directly on the Contact page.</p>
        </div>
      ) : (
        // key forces a fresh stagger when the filter changes
        <FaqList key={`${topic}|${q}`} items={shown} highlight={q} className="mt-2" />
      )}

      {remaining > 0 && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <motion.button
            type="button"
            onClick={() => setLimit((l) => l + step)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={spring.press}
            className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-fed px-6 font-semibold text-fed transition-colors hover:bg-fed hover:text-white"
          >
            Show more questions
            <ChevronDown aria-hidden="true" className="size-4" />
          </motion.button>
          <motion.span
            key={remaining}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="t-caption text-steel tnum"
          >
            {remaining} more
          </motion.span>
        </div>
      )}
    </div>
  )
}
