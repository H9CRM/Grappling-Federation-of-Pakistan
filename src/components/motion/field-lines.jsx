import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * "Magnetic filings" vector field: a grid of short strokes that swing to point at the cursor,
 * like iron filings around a magnet. With no pointer nearby the filings drift on a slow
 * ambient flow, so the section stays alive on touch devices too.
 *
 * Performance: one <canvas>, DPR-aware, draws only while the section is on screen, eases
 * each filing's angle (no snapping) and batches strokes by opacity bucket.
 * Reduced motion: a single static frame, no animation loop.
 *
 * Place inside a `relative` parent; it fills it and ignores pointer events.
 */
export function FieldLines({
  color = '15 23 32', // "r g b" — ink by default; use '255 255 255' on dark sections
  spacing = 26,
  length = 12,
  radius = 280,
  minAlpha = 0.1,
  maxAlpha = 0.85,
  lineWidth = 1.4,
  className,
}) {
  const canvasRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    let w = 0, h = 0, dpr = 1, points = [], raf = 0, visible = false, t = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const build = () => {
      const r = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width; h = r.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      points = []
      for (let x = spacing / 2; x < w; x += spacing)
        for (let y = spacing / 2; y < h; y += spacing)
          points.push({ x, y, a: ambient(x, y, 0), k: minAlpha })
    }

    // slow, smooth pseudo-field so idle filings look like they're following field lines
    const ambient = (x, y, time) => Math.sin(x * 0.006 + time * 0.35) * 0.9 + Math.cos(y * 0.008 - time * 0.25) * 0.9

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      ctx.lineWidth = lineWidth
      ctx.lineCap = 'round'
      // bucket by opacity (8 levels) so we stroke ~8 paths per frame, not thousands
      const buckets = Array.from({ length: 8 }, () => new Path2D())
      for (const p of points) {
        const half = (length * (0.75 + p.k * 0.5)) / 2
        const cx = Math.cos(p.a) * half, sy = Math.sin(p.a) * half
        // clamp: easing can undershoot minAlpha by a hair, which would index bucket -1
        const b = Math.max(0, Math.min(7, Math.floor(((p.k - minAlpha) / (maxAlpha - minAlpha)) * 8)))
        buckets[b].moveTo(p.x - cx, p.y - sy)
        buckets[b].lineTo(p.x + cx, p.y + sy)
      }
      buckets.forEach((path, i) => {
        ctx.strokeStyle = `rgb(${color} / ${minAlpha + ((maxAlpha - minAlpha) * (i + 0.5)) / 8})`
        ctx.stroke(path)
      })
    }

    const step = () => {
      t += 1 / 60
      for (const p of points) {
        const dx = pointer.x - p.x, dy = pointer.y - p.y
        const d = Math.hypot(dx, dy)
        const near = pointer.active && d < radius
        const target = near ? Math.atan2(dy, dx) : ambient(p.x, p.y, t)
        // ease along the shortest arc (filings are symmetric, so wrap at π)
        let diff = target - p.a
        diff = ((diff + Math.PI / 2) % Math.PI + Math.PI) % Math.PI - Math.PI / 2
        p.a += diff * (near ? 0.18 : 0.04)
        const kTarget = near ? minAlpha + (maxAlpha - minAlpha) * (1 - d / radius) ** 1.4 : minAlpha
        p.k += (kTarget - p.k) * 0.12
      }
      draw()
      raf = visible ? requestAnimationFrame(step) : 0
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = pointer.x >= -radius && pointer.y >= -radius && pointer.x <= w + radius && pointer.y <= h + radius
    }
    const onLeave = () => { pointer.active = false }

    // resizing a canvas clears it, so always paint a frame straight after (re)building
    const rebuild = () => { build(); draw() }
    rebuild()
    if (reduce) return

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(step)
    })
    io.observe(host)
    const ro = new ResizeObserver(rebuild)
    ro.observe(host)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect(); ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [color, spacing, length, radius, minAlpha, maxAlpha, lineWidth, reduce])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('pointer-events-none absolute inset-0', className)} />
}
