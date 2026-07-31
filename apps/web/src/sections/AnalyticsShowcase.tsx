'use client'

import { motion } from 'framer-motion'
import { Container, Card, Badge } from '@nexuslinks/ui'

const campaigns = [
  { name: 'Summer Sale 2026', clicks: 45.2, budget: '$12,400' },
  { name: 'Product Launch', clicks: 28.7, budget: '$8,200' },
  { name: 'Newsletter Q3', clicks: 18.3, budget: '$4,100' },
  { name: 'Social Campaign', clicks: 12.1, budget: '$3,800' },
]

const recentVisitors = [
  { country: 'US', city: 'New York', time: '2m ago', page: '/summer-sale' },
  { country: 'UK', city: 'London', time: '4m ago', page: '/docs-api' },
  { country: 'DE', city: 'Berlin', time: '7m ago', page: '/launch-week' },
  { country: 'JP', city: 'Tokyo', time: '12m ago', page: '/bio-link' },
  { country: 'BR', city: 'São Paulo', time: '15m ago', page: '/partner' },
]

export function AnalyticsShowcase() {
  return (
    <section id="analytics" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(124,58,237,0.06),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Enterprise analytics at your fingertips
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Real-time data. Beautiful visualizations. Actionable insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card hover={false} variant="glass" className="overflow-hidden p-0">
            <div className="bg-surface/30 px-5 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="bg-danger/50 h-2.5 w-2.5 rounded-full" />
                    <div className="bg-warning/50 h-2.5 w-2.5 rounded-full" />
                    <div className="bg-success/50 h-2.5 w-2.5 rounded-full" />
                  </div>
                  <span className="text-foreground text-sm font-medium">Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-surface text-muted/60 rounded-md px-2.5 py-1 text-xs">
                    7D
                  </span>
                  <span className="text-muted/40 px-2.5 py-1 text-xs">30D</span>
                  <span className="text-muted/40 px-2.5 py-1 text-xs">All</span>
                  <Badge variant="primary" className="text-[10px]">
                    Live
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Total Clicks', value: '2,456,890', change: '+18.2%' },
                  { label: 'Unique Visitors', value: '847,230', change: '+12.5%' },
                  { label: 'Active Links', value: '12,345', change: '+5.7%' },
                  { label: 'Countries', value: '189', change: '+12' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-surface/30 hover:bg-surface/50 rounded-xl p-4 transition-colors"
                  >
                    <p className="text-muted/50 text-xs font-medium uppercase tracking-wider">
                      {s.label}
                    </p>
                    <p className="text-foreground mt-1.5 text-2xl font-bold tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-success mt-0.5 text-xs font-medium">{s.change}</p>
                  </div>
                ))}
              </div>

              <div className="mb-6 grid gap-6 lg:grid-cols-2">
                <div className="bg-surface/20 rounded-xl p-4">
                  <p className="text-muted/50 mb-3 text-xs font-medium">
                    Click Volume — Last 7 days
                  </p>
                  <svg viewBox="0 0 500 140" className="w-full" fill="none">
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="500" y2="0">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#22D3EE" />
                      </linearGradient>
                      <linearGradient id="ca" x1="0" y1="0" x2="0" y2="140">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 120 C35 115 70 100 100 95 C130 90 160 70 190 75 C220 80 250 50 280 55 C310 60 340 30 370 35 C400 40 430 20 460 22 C480 24 500 15 500 20"
                      stroke="url(#cg)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 120 C35 115 70 100 100 95 C130 90 160 70 190 75 C220 80 250 50 280 55 C310 60 340 30 370 35 C400 40 430 20 460 22 C480 24 500 15 500 20 L500 140 L0 140 Z"
                      fill="url(#ca)"
                    />
                    <circle
                      cx="370"
                      cy="35"
                      r="4.5"
                      fill="#7C3AED"
                      stroke="#050816"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>

                <div className="bg-surface/20 rounded-xl p-4">
                  <p className="text-muted/50 mb-3 text-xs font-medium">Traffic Sources</p>
                  <div className="space-y-3">
                    {[
                      { source: 'Direct', pct: 42, color: '#7C3AED' },
                      { source: 'Social', pct: 28, color: '#22D3EE' },
                      { source: 'Search', pct: 18, color: '#A855F7' },
                      { source: 'Email', pct: 8, color: '#22C55E' },
                      { source: 'Referral', pct: 4, color: '#EF4444' },
                    ].map((s) => (
                      <div key={s.source}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-muted/60">{s.source}</span>
                          <span className="text-muted/80 font-medium">{s.pct}%</span>
                        </div>
                        <div className="bg-surface h-1.5 overflow-hidden rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="bg-surface/20 rounded-xl p-4">
                  <p className="text-muted/50 mb-3 text-xs font-medium">Top Campaigns</p>
                  <div className="space-y-3">
                    {campaigns.map((c) => (
                      <div
                        key={c.name}
                        className="bg-surface/30 hover:bg-surface/50 flex items-center justify-between rounded-lg p-3 transition-colors"
                      >
                        <div>
                          <p className="text-foreground text-sm font-medium">{c.name}</p>
                          <p className="text-muted/50 text-xs">{c.budget}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-foreground text-sm font-semibold">{c.clicks}K</p>
                          <p className="text-muted/50 text-xs">clicks</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface/20 rounded-xl p-4">
                  <p className="text-muted/50 mb-3 text-xs font-medium">Recent Visitors</p>
                  <div className="space-y-2">
                    {recentVisitors.map((v, i) => (
                      <div
                        key={i}
                        className="bg-surface/30 hover:bg-surface/50 flex items-center justify-between rounded-lg p-2.5 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="bg-primary/15 text-primary flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium">
                            {v.country}
                          </div>
                          <div>
                            <p className="text-foreground text-xs">{v.city}</p>
                            <p className="text-muted/50 text-[10px]">{v.page}</p>
                          </div>
                        </div>
                        <span className="text-muted/40 text-[10px]">{v.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}
