'use client'

import { motion, type Transition } from 'framer-motion'
import { Button } from '@nexuslinks/ui'

const fadeUp = (delay: number) => {
  const t: Transition = { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }
  return { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: t }
}

const companies = ['Vercel', 'Linear', 'Stripe', 'Notion', 'Arc']

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28">
      <div className="noise" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="animate-grid absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="bg-primary/8 absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full blur-[150px]" />
        <div className="bg-accent/5 absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full blur-[120px]" />
        <div className="bg-secondary/5 absolute -left-1/4 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px]" />

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="via-primary/20 animate-streak absolute h-[1px] w-[200px] bg-gradient-to-r from-transparent to-transparent"
            style={{
              top: `${15 + i * 10}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div {...fadeUp(0)}>
              <div className="border-primary/20 bg-primary/8 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
                  <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                </span>
                Now in public beta
              </div>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-hero leading-hero text-foreground font-bold tracking-tight"
            >
              Shorten links.
              <br />
              <span className="text-gradient from-primary via-secondary to-accent bg-gradient-to-r">
                Track everything.
              </span>
              <br />
              Own your traffic.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="text-muted/70 mt-6 max-w-lg text-lg leading-relaxed sm:text-xl"
            >
              Enterprise link management with real-time analytics, custom domains, AI insights, and
              team collaboration. Built for modern teams.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="xl" className="w-full sm:w-auto">
                Get Started Free
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
              <Button variant="secondary" size="xl" className="w-full sm:w-auto">
                View Demo
              </Button>
            </motion.div>

            <motion.div {...fadeUp(0.4)} className="text-muted/40 mt-4 text-sm">
              No credit card required &middot; Free tier included
            </motion.div>

            <motion.div {...fadeUp(0.5)} className="mt-12 pt-8">
              <p className="text-muted/30 mb-5 text-xs font-medium uppercase tracking-widest">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {companies.map((c) => (
                  <span
                    key={c}
                    className="text-muted/25 hover:text-muted/50 text-sm font-semibold transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="animate-float-slow">
              <div className="glass-card animate-pulse-glow overflow-hidden rounded-2xl">
                <div className="bg-surface/30 flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="bg-danger/50 h-2.5 w-2.5 rounded-full" />
                      <div className="bg-warning/50 h-2.5 w-2.5 rounded-full" />
                      <div className="bg-success/50 h-2.5 w-2.5 rounded-full" />
                    </div>
                    <span className="text-muted/50 text-xs">nexus.links/dashboard</span>
                  </div>
                  <span className="text-muted/40 flex items-center gap-1.5 text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-50" />
                      <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                    </span>
                    Live
                  </span>
                </div>

                <div className="p-5">
                  <div className="mb-5 grid grid-cols-4 gap-3">
                    {[
                      { label: 'Total Clicks', value: '2.4M', change: '+18.2%' },
                      { label: 'Visitors', value: '847K', change: '+12.5%' },
                      { label: 'Active Links', value: '12.3K', change: '+5.7%' },
                      { label: 'Revenue', value: '$89.2K', change: '+22.1%' },
                    ].map((s) => (
                      <div key={s.label} className="bg-surface/40 rounded-lg p-2.5">
                        <p className="text-muted/40 text-[10px] font-medium uppercase tracking-wider">
                          {s.label}
                        </p>
                        <p className="text-foreground mt-0.5 text-base font-bold">{s.value}</p>
                        <p className="text-success text-[10px]">{s.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <p className="text-muted/50 mb-2 text-xs font-medium">Clicks — Last 7 days</p>
                    <svg viewBox="0 0 400 80" className="w-full" fill="none">
                      <defs>
                        <linearGradient id="hg" x1="0" y1="0" x2="400" y2="0">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#22D3EE" />
                        </linearGradient>
                        <linearGradient id="ha" x1="0" y1="0" x2="0" y2="80">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 65 C20 60 40 55 60 50 C80 45 100 35 120 40 C140 45 160 25 180 30 C200 35 220 20 240 25 C260 30 280 15 300 18 C320 21 340 12 360 14 C380 16 400 10 400 10"
                        stroke="url(#hg)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 65 C20 60 40 55 60 50 C80 45 100 35 120 40 C140 45 160 25 180 30 C200 35 220 20 240 25 C260 30 280 15 300 18 C320 21 340 12 360 14 C380 16 400 10 L400 80 L0 80 Z"
                        fill="url(#ha)"
                      />
                      <circle
                        cx="300"
                        cy="18"
                        r="3.5"
                        fill="#7C3AED"
                        stroke="#050816"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted/50 mb-2 text-xs font-medium">Top Countries</p>
                      <div className="space-y-1.5">
                        {[
                          { country: 'United States', pct: 42 },
                          { country: 'United Kingdom', pct: 18 },
                          { country: 'Germany', pct: 12 },
                          { country: 'Japan', pct: 8 },
                        ].map((c) => (
                          <div key={c.country} className="flex items-center gap-2">
                            <span className="text-muted/60 w-24 truncate text-[11px]">
                              {c.country}
                            </span>
                            <div className="bg-surface h-1 flex-1 rounded-full">
                              <div
                                className="from-primary to-accent h-full rounded-full bg-gradient-to-r"
                                style={{ width: `${c.pct}%` }}
                              />
                            </div>
                            <span className="text-muted/50 text-[11px]">{c.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted/50 mb-2 text-xs font-medium">Devices</p>
                      <div className="space-y-1.5">
                        {[
                          { name: 'Desktop', pct: 64, color: 'bg-primary' },
                          { name: 'Mobile', pct: 28, color: 'bg-accent' },
                          { name: 'Tablet', pct: 8, color: 'bg-secondary' },
                        ].map((d) => (
                          <div key={d.name} className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${d.color}`} />
                            <span className="text-muted/60 flex-1 text-[11px]">{d.name}</span>
                            <span className="text-muted/50 text-[11px]">{d.pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="from-primary/5 via-accent/5 absolute -bottom-6 -left-6 -right-6 -z-10 h-full rounded-2xl bg-gradient-to-b to-transparent blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
