import { motion, type Transition } from "framer-motion"
import { Container, Button, Card, Badge } from "@nexuslinks/ui"

const trustedCompanies = [
  "Vercel",
  "Linear",
  "Stripe",
  "Notion",
  "Raycast",
]

const fadeUp = (delay: number) => {
  const transition: Transition = {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1],
  }
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition,
  }
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24 sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora-1 absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="animate-aurora-2 absolute -bottom-1/4 -right-1/4 h-[700px] w-[700px] rounded-full bg-secondary/10 blur-[100px]" />
        <div className="animate-aurora-3 absolute left-1/3 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent/5 blur-[90px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 mesh-gradient" />

      <Container className="relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <motion.div {...fadeUp(0)}>
              <Badge variant="gradient" className="mb-8">
                <span className="relative mr-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Now in public beta
              </Badge>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-hero font-bold leading-hero tracking-tight text-foreground"
            >
              Shorten links.
              <br />
              <span className="text-gradient">Measure everything.</span>
              <br />
              Scale your reach.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted/80 sm:text-xl"
            >
              Fast, reliable link management with real-time analytics, custom domains, and team
              collaboration. Built for modern developers and marketers.
            </motion.p>

            <motion.div
              {...fadeUp(0.3)}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
            >
              <Button size="xxl" className="w-full sm:w-auto">
                Get Started Free
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
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
              <Button variant="secondary" size="xxl" className="w-full sm:w-auto">
                View Documentation
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.4)}
              className="mt-6 text-sm text-muted/50"
            >
              No credit card required &middot; Free tier included
            </motion.div>

            <motion.div
              {...fadeUp(0.5)}
              className="mt-12 border-t border-border/30 pt-8"
            >
              <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted/40">
                Trusted by teams at
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {trustedCompanies.map((company) => (
                  <span
                    key={company}
                    className="text-sm font-semibold text-muted/30 transition-colors hover:text-muted/50"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as Transition["ease"] }}
            className="relative hidden lg:block"
          >
            <div className="animate-float-slow">
              <Card className="overflow-hidden p-0" hover={false} glass>
                <div className="border-b border-border/40 bg-surface/30 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                        <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
                      </div>
                      <span className="ml-3 text-xs text-muted/50">nexus.links/dashboard</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted/40">
                      <span>Last 7 days</span>
                      <Badge variant="success" className="text-[10px]">+18.2%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6 grid grid-cols-4 gap-4">
                    {[
                      { label: "Total Clicks", value: "24,560", change: "+18.2%" },
                      { label: "Active Links", value: "1,234", change: "+5.7%" },
                      { label: "Countries", value: "89", change: "+12" },
                      { label: "Live Now", value: "127", change: "+8" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg bg-surface/40 p-3">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted/40">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-lg font-bold text-foreground">{stat.value}</p>
                        <p className="text-[11px] text-success">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6">
                    <p className="mb-3 text-xs font-medium text-muted/60">Clicks over time</p>
                    <svg
                      viewBox="0 0 400 120"
                      className="w-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="line-gradient" x1="0" y1="0" x2="400" y2="0">
                          <stop offset="0%" stopColor="#7C3AED" />
                          <stop offset="100%" stopColor="#38BDF8" />
                        </linearGradient>
                        <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="120">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 100 C40 90 60 80 80 75 C100 70 120 55 140 50 C160 45 180 30 200 35 C220 40 240 20 260 25 C280 30 300 15 320 18 C340 21 360 10 400 15"
                        stroke="url(#line-gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 100 C40 90 60 80 80 75 C100 70 120 55 140 50 C160 45 180 30 200 35 C220 40 240 20 260 25 C280 30 300 15 320 18 C340 21 360 10 400 15 L400 120 L0 120 Z"
                        fill="url(#area-gradient)"
                      />
                      <circle cx="300" cy="15" r="4" fill="#7C3AED" stroke="#050816" strokeWidth="2" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/30 pt-4">
                    <div className="flex items-center gap-4 text-xs text-muted/40">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Desktop 64%
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-secondary" />
                        Mobile 28%
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        Tablet 8%
                      </span>
                    </div>
                    <span className="text-xs text-muted/30">Updated just now</span>
                  </div>
                </div>
              </Card>
            </div>

            <div className="absolute -bottom-4 -left-4 -right-4 -z-10 h-full rounded-xl bg-gradient-to-b from-primary/5 via-secondary/5 to-transparent blur-2xl" />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
