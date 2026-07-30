import { motion } from "framer-motion"
import { Container, Section, Card, Badge } from "@nexuslinks/ui"

const testimonials = [
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Head of Marketing",
    company: "ScaleUp Inc.",
    quote:
      "Nexus Links transformed how we track campaign performance. The analytics are incredibly detailed and the team collaboration features are a game-changer.",
    rating: 5,
  },
  {
    initials: "AK",
    name: "Alex Kim",
    role: "Senior Engineer",
    company: "DevPath",
    quote:
      "The API is a dream to work with. We integrated link shortening into our platform in hours, not days. The documentation is excellent.",
    rating: 5,
  },
  {
    initials: "JR",
    name: "Jessica Rivera",
    role: "Growth Lead",
    company: "Launchpad",
    quote:
      "Custom domains and the dashboard analytics alone are worth it. Our click-through rates increased 40% after switching to branded links.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <Section id="solutions" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            See what our customers have to say about Nexus Links.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="flex h-full flex-col p-6" borderAnimation>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }, (_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4 text-warning"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <Badge variant="success" className="text-[10px]">Verified</Badge>
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-muted/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border/20 pt-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-semibold text-white shadow-lg">
                    {t.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{t.name}</span>
                      <svg className="h-3.5 w-3.5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-xs text-muted/50">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
