'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@nexuslinks/ui'

const stats = [
  { end: 25000000, suffix: '+', label: 'Links created' },
  { end: 1800000000, suffix: '+', label: 'Clicks tracked' },
  { end: 190, suffix: '', label: 'Countries reached' },
  { end: 10000, suffix: '+', label: 'Teams onboard' },
]

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    let raf: number

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end])

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

export function LiveMetrics() {
  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.04),transparent_60%)]" />
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-center">
                <div className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-muted/60 mt-2 text-sm font-medium">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
