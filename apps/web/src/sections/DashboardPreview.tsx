import { motion } from "framer-motion"
import { Container, Card, Badge } from "@nexuslinks/ui"

const chartData = [
  { day: "Mon", clicks: 1240 },
  { day: "Tue", clicks: 1830 },
  { day: "Wed", clicks: 2100 },
  { day: "Thu", clicks: 1950 },
  { day: "Fri", clicks: 2780 },
  { day: "Sat", clicks: 1520 },
  { day: "Sun", clicks: 980 },
]

const topLinks = [
  { url: "nexus.links/sale-2026", clicks: 12450, change: "+12%" },
  { url: "nexus.links/launch-week", clicks: 8320, change: "+8%" },
  { url: "nexus.links/docs-api", clicks: 6540, change: "+23%" },
  { url: "nexus.links/partner-offer", clicks: 4210, change: "-2%" },
]

const maxClicks = Math.max(...chartData.map((d) => d.clicks))

export function DashboardPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="text-center">
          <h2 className="text-title font-bold leading-title text-foreground">
            Beautiful analytics, built-in
          </h2>
          <p className="mt-3 text-subtitle leading-subtitle text-muted">
            Understand every click with a dashboard designed for clarity.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative mt-16"
        >
          <Card className="overflow-hidden p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Clicks over time</h3>
                    <p className="text-xs text-muted">Last 7 days</p>
                  </div>
                  <Badge variant="primary">+18.2%</Badge>
                </div>

                <div className="flex items-end gap-2 sm:gap-3">
                  {chartData.map((d) => (
                    <div key={d.day} className="group relative flex flex-1 flex-col items-center">
                      <div className="mb-2 text-xs text-muted/60 opacity-0 transition-opacity group-hover:opacity-100">
                        {d.clicks.toLocaleString()}
                      </div>
                      <div
                        className="w-full rounded-md bg-gradient-to-t from-primary/80 to-primary/30 transition-all duration-300 hover:from-primary hover:to-primary/50"
                        style={{
                          height: `${(d.clicks / maxClicks) * 160}px`,
                          minHeight: "12px",
                        }}
                      />
                      <div className="mt-2 text-xs text-muted/60">{d.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-medium text-foreground">Top links</h3>
                <div className="space-y-3">
                  {topLinks.map((link) => (
                    <div
                      key={link.url}
                      className="rounded-lg border border-border/50 bg-surface/30 p-3 transition-colors hover:bg-surface/60"
                    >
                      <div className="truncate text-sm font-medium text-foreground">
                        {link.url}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted">
                          {link.clicks.toLocaleString()} clicks
                        </span>
                        <span
                          className={`text-xs font-medium ${
                            link.change.startsWith("+") ? "text-success" : "text-danger"
                          }`}
                        >
                          {link.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/30 pt-6 sm:grid-cols-4">
              {[
                { label: "Total clicks", value: "24,560", change: "+18.2%" },
                { label: "Active links", value: "1,234", change: "+5.7%" },
                { label: "Countries", value: "89", change: "+12" },
                { label: "Devices", value: "4,567", change: "+8.3%" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-muted">{stat.label}</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">{stat.value}</p>
                  <p className="text-xs text-success">{stat.change}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  )
}
