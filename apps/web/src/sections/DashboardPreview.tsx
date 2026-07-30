import { motion } from "framer-motion"
import { Container, Card, Badge } from "@nexuslinks/ui"

const topLinks = [
  { url: "nexus.links/sale-2026", clicks: 12450, change: "+12%", trend: "up" },
  { url: "nexus.links/launch-week", clicks: 8320, change: "+8%", trend: "up" },
  { url: "nexus.links/docs-api", clicks: 6540, change: "+23%", trend: "up" },
  { url: "nexus.links/partner-offer", clicks: 4210, change: "-2%", trend: "down" },
]

const devices = [
  { name: "Desktop", value: 64, color: "bg-primary" },
  { name: "Mobile", value: 28, color: "bg-secondary" },
  { name: "Tablet", value: 8, color: "bg-accent" },
]

function CircularProgress({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-surface-lighter/30" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="text-primary"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  )
}

export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Beautiful analytics, built-in
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Understand every click with a dashboard designed for clarity.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card hover={false} className="overflow-hidden p-0" borderAnimation>
            <div className="border-b border-border/30 bg-surface/30 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-danger/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-warning/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-success/50" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Analytics Dashboard</span>
                </div>
                <Badge variant="gradient" className="text-[10px]">Live</Badge>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Total Clicks", value: "2,456,890", change: "+18.2%" },
                  { label: "Active Links", value: "12,345", change: "+5.7%" },
                  { label: "Countries", value: "189", change: "+12" },
                  { label: "Live Visitors", value: "247", change: "+8.3%" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-border/30 bg-surface/30 p-4 transition-colors hover:bg-surface/50">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted/50">{stat.label}</p>
                    <p className="mt-1.5 text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
                    <p className="mt-0.5 text-xs font-medium text-success">{stat.change}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8 grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">Clicks over time</p>
                    <div className="flex gap-2">
                      <span className="rounded-md bg-surface-light/40 px-2.5 py-1 text-xs text-muted/60">7D</span>
                      <span className="rounded-md px-2.5 py-1 text-xs text-muted/40 transition-colors hover:text-muted/60">30D</span>
                      <span className="rounded-md px-2.5 py-1 text-xs text-muted/40 transition-colors hover:text-muted/60">All</span>
                    </div>
                  </div>
                  <svg viewBox="0 0 500 160" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="chart-gradient-2" x1="0" y1="0" x2="500" y2="0">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#38BDF8" />
                      </linearGradient>
                      <linearGradient id="area-gradient-2" x1="0" y1="0" x2="0" y2="160">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 140 C30 130 50 125 70 115 C90 105 110 95 130 100 C150 105 170 80 190 75 C210 70 230 55 250 60 C270 65 290 45 310 50 C330 55 350 30 370 35 C390 40 410 25 430 28 C450 31 470 20 500 25"
                      stroke="url(#chart-gradient-2)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0 140 C30 130 50 125 70 115 C90 105 110 95 130 100 C150 105 170 80 190 75 C210 70 230 55 250 60 C270 65 290 45 310 50 C330 55 350 30 370 35 C390 40 410 25 430 28 C450 31 470 20 500 25 L500 160 L0 160 Z"
                      fill="url(#area-gradient-2)"
                    />
                    <circle cx="370" cy="35" r="5" fill="#7C3AED" stroke="#050816" strokeWidth="2.5" />
                  </svg>
                </div>

                <div>
                  <p className="mb-4 text-sm font-medium text-foreground">Devices</p>
                  <div className="flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <CircularProgress value={64} size={160} />
                      <div className="absolute text-center">
                        <p className="text-3xl font-bold text-foreground">64%</p>
                        <p className="text-xs text-muted/50">Desktop</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {devices.map((device) => (
                      <div key={device.name} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${device.color}`} />
                          <span className="text-muted/70">{device.name}</span>
                        </span>
                        <span className="font-medium text-foreground">{device.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-sm font-medium text-foreground">Traffic Sources</p>
                  <div className="space-y-3">
                    {[
                      { source: "Direct", percentage: 42 },
                      { source: "Social", percentage: 28 },
                      { source: "Search", percentage: 18 },
                      { source: "Email", percentage: 8 },
                      { source: "Referral", percentage: 4 },
                    ].map((source) => (
                      <div key={source.source}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-muted/70">{source.source}</span>
                          <span className="font-medium text-foreground">{source.percentage}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-surface-lighter/30">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${source.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-sm font-medium text-foreground">Top Links</p>
                  <div className="space-y-3">
                    {topLinks.map((link) => (
                      <div
                        key={link.url}
                        className="rounded-xl border border-border/30 bg-surface/30 p-3.5 transition-all duration-200 hover:bg-surface/50 hover:border-border/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate text-sm font-medium text-foreground">{link.url}</span>
                          <span className={`ml-2 shrink-0 text-xs font-medium ${link.trend === "up" ? "text-success" : "text-danger"}`}>
                            {link.change}
                          </span>
                        </div>
                        <span className="mt-0.5 block text-xs text-muted/50">
                          {link.clicks.toLocaleString()} clicks
                        </span>
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
