import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { spring } from '@/lib/motion'

// A halo that trails the native cursor (which stays visible — usability first).
// Mounted only for fine pointers with hover and when reduced motion is off.
// Elements can opt into a label with data-cursor="View" (cards, images).

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, summary, label, [data-cursor]'

function useFinePointer() {
  const [fine, setFine] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return fine
}

export function CursorHalo() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  if (!fine || reduce) return null
  return <Halo />
}

function Halo() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, spring.follow)
  const sy = useSpring(y, spring.follow)
  const [state, setState] = useState({ visible: false, mode: 'idle', label: '' })

  useEffect(() => {
    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null
      const label = el?.getAttribute('data-cursor') || ''
      const isText = el?.matches('input, textarea, select')
      const mode = !el ? 'idle' : isText ? 'text' : label ? 'label' : 'hover'
      setState((s) => (s.visible && s.mode === mode && s.label === label ? s : { visible: true, mode, label }))
    }
    const onLeave = () => setState((s) => ({ ...s, visible: false }))
    const onDown = () => setState((s) => ({ ...s, mode: s.mode === 'idle' ? 'press' : s.mode }))
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [x, y])

  const size = { idle: 28, press: 20, hover: 52, label: 76, text: 6 }[state.mode]

  return (
    <motion.div
      aria-hidden="true"
      className="cursor-halo"
      style={{ x: sx, y: sy }}
      animate={{ opacity: state.visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white"
        animate={{
          width: size,
          height: size,
          backgroundColor: state.mode === 'label' ? 'rgba(255,255,255,1)' : state.mode === 'hover' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
          borderWidth: state.mode === 'text' ? 0 : 1,
        }}
        transition={spring.layout}
      >
        <AnimatePresence>
          {state.mode === 'label' && (
            <motion.span
              key={state.label}
              className="text-[11px] font-semibold tracking-wider text-black uppercase"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
