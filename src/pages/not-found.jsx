import { motion } from 'motion/react'
import { ease } from '@/lib/motion'
import { Seo } from '@/components/seo'
import { Button } from '@/components/brand/button'

export default function NotFound() {
  return (
    <section className="surface-arena grain relative flex min-h-[80svh] items-center overflow-hidden pt-[var(--header-h)]">
      <Seo title="Page not found | Grappling Federation of Pakistan" description="This page could not be found." path="/404" noindex />
      <div aria-hidden="true" className="mat-grid absolute inset-0 opacity-30 invert" />
      <motion.div
        className="container-site relative text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: ease.out, delay: 0.3 }}
      >
        <p className="t-stat text-gold">404</p>
        <h1 className="t-h1 mt-4 text-white">Out of bounds.</h1>
        <p className="t-lead mx-auto mt-4 max-w-md text-white/70">This page has stepped off the mat. Let’s get you back to the centre.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/">Back to home</Button>
          <Button to="/events" variant="onDark">See events</Button>
        </div>
      </motion.div>
    </section>
  )
}
