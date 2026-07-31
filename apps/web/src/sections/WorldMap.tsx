'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@nexuslinks/ui'

const cities = [
  { name: 'New York', country: 'US', count: '2,450', active: true },
  { name: 'London', country: 'UK', count: '1,820', active: true },
  { name: 'Berlin', country: 'DE', count: '890', active: false },
  { name: 'Tokyo', country: 'JP', count: '1,230', active: true },
  { name: 'Sydney', country: 'AU', count: '670', active: false },
  { name: 'São Paulo', country: 'BR', count: '540', active: false },
]

export function WorldMap() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_60%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Global reach in real-time
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Your links reach every corner of the world. Track them all.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="glass" className="overflow-hidden p-6 sm:p-8">
            <div className="relative mx-auto aspect-[2/1] max-w-4xl">
              <svg viewBox="0 0 800 400" className="h-full w-full" fill="none">
                <defs>
                  <radialGradient id="dot-glow">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g opacity="0.15">
                  <path
                    d="M100 200 L400 150 L700 180 L600 250 L300 280 L100 200Z"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <path
                    d="M150 180 L350 100 L650 160 L500 220 L250 240 L150 180Z"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </g>
                <g>
                  <circle cx="160" cy="155" r="4" fill="#7C3AED" opacity="0.9" />
                  <circle cx="160" cy="155" r="12" fill="url(#dot-glow)" opacity="0.4" />
                  <circle cx="200" cy="160" r="3" fill="#22D3EE" opacity="0.7" />
                  <circle cx="350" cy="110" r="4" fill="#7C3AED" opacity="0.9" />
                  <circle cx="350" cy="110" r="12" fill="url(#dot-glow)" opacity="0.4" />
                  <circle cx="380" cy="130" r="3" fill="#22D3EE" opacity="0.7" />
                  <circle cx="500" cy="140" r="3" fill="#A855F7" opacity="0.6" />
                  <circle cx="550" cy="170" r="4" fill="#7C3AED" opacity="0.9" />
                  <circle cx="550" cy="170" r="12" fill="url(#dot-glow)" opacity="0.4" />
                  <circle cx="600" cy="200" r="3" fill="#22D3EE" opacity="0.7" />
                  <circle cx="620" cy="230" r="3" fill="#A855F7" opacity="0.6" />
                  <circle cx="300" cy="260" r="3" fill="#A855F7" opacity="0.5" />
                  <circle cx="180" cy="220" r="3" fill="#22D3EE" opacity="0.6" />
                  <circle cx="680" cy="150" r="3" fill="#7C3AED" opacity="0.5" />
                </g>
                <g opacity="0.15">
                  <path
                    d="M160 155 L350 110"
                    stroke="#7C3AED"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                  <path
                    d="M350 110 L550 170"
                    stroke="#7C3AED"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                  <path
                    d="M160 155 L550 170"
                    stroke="#22D3EE"
                    strokeWidth="0.5"
                    strokeDasharray="3 6"
                    className="animate-pulse"
                  />
                  <path
                    d="M350 110 L300 260"
                    stroke="#A855F7"
                    strokeWidth="0.5"
                    strokeDasharray="3 6"
                    className="animate-pulse"
                  />
                </g>
              </svg>

              <div className="absolute left-[18%] top-[35%] -translate-x-1/2 -translate-y-1/2">
                <span className="border-primary/30 bg-primary/10 text-primary shadow-primary/20 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium shadow-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                    <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  2,450 live
                </span>
              </div>
              <div className="absolute left-[44%] top-[25%] -translate-x-1/2 -translate-y-1/2">
                <span className="border-accent/30 bg-accent/10 text-accent shadow-accent/20 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium shadow-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                    <span className="bg-accent relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  1,230 live
                </span>
              </div>
              <div className="absolute left-[69%] top-[40%] -translate-x-1/2 -translate-y-1/2">
                <span className="border-secondary/30 bg-secondary/10 text-secondary shadow-secondary/20 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium shadow-lg">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="bg-secondary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                    <span className="bg-secondary relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  670 live
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6">
              <p className="text-muted/50 mb-4 text-xs font-medium uppercase tracking-wider">
                Top cities by clicks
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {cities.map((city) => (
                  <div
                    key={city.name}
                    className="bg-surface/30 hover:bg-surface/50 rounded-lg p-3 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${city.active ? 'bg-success' : 'bg-muted/30'}`}
                      />
                      <span className="text-foreground text-sm font-medium">{city.name}</span>
                    </div>
                    <p className="text-muted/50 mt-1 text-xs">{city.country}</p>
                    <p className="text-muted/70 mt-0.5 text-xs font-medium">{city.count} clicks</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </Section>
  )
}
