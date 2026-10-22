import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useLenis } from 'lenis/react'
import { ArrowUp } from 'lucide-react'
import { spring } from '@/lib/motion'

// Floating "back to top" button. Appears after ~one screen of scrolling; a gold ring shows
// how far down the page you are. Uses Lenis for the glide when smooth scrolling is on.
const R = 22

export function BackToTop() {
  const lenis = useLenis()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [show, setShow] = useState(false)

  // plain passive listener: show/hide never depends on animation frames
  useEffect(() => {
    const update = () => setShow(window.scrollY > window.innerHeight * 0.9)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) })
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    // move focus to the top of the page for keyboard and screen-reader users
    document.getElementById('main')?.focus({ preventScroll: true })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="to-top"
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          data-cursor=""
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={spring.press}
          className="group/top fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex size-13 items-center justify-center rounded-full bg-ink text-white shadow-float ring-1 ring-white/10 transition-colors hover:bg-fed sm:right-6 sm:bottom-6"
        >
          {/* scroll-progress ring */}
          <svg viewBox="0 0 52 52" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="26" cy="26" r={R} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="2.5" />
            <motion.circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke="#f2b705"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp aria-hidden="true" className="relative size-5 transition-transform duration-300 group-hover/top:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
