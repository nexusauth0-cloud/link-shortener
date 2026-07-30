import { motion } from "framer-motion"
import { Container, Section, Card, Badge } from "@nexuslinks/ui"
import { Link, BarChart3, Settings } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: <Link className="h-6 w-6" />,
    title: "Paste your URL",
    description:
      "Enter any long URL into Nexus Links. Our system validates and prepares it for shortening in milliseconds.",
    color: "from-primary to-secondary",
  },
  {
    number: "02",
    icon: <Settings className="h-6 w-6" />,
    title: "Customize your link",
    description:
      "Add a custom slug, set expiration, enable password protection, and choose your branded domain.",
    color: "from-secondary to-accent",
  },
  {
    number: "03",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track everything",
    description:
      "Monitor clicks, geographic data, device types, and referrers in real-time from your dashboard.",
    color: "from-accent to-primary",
  },
]

export function HowItWorks() {
  return (
    <Section className="relative overflow-hidden">
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
            How it works
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Three simple steps to start tracking your links.
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-[calc(100%+2rem)] bg-gradient-to-r from-border/0 via-border/50 to-border/0 md:block" />
              )}
              <Card className="relative p-8 text-center" borderAnimation>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary shadow-lg shadow-primary/5">
                  {step.icon}
                </div>
                <div className="absolute right-4 top-4 text-5xl font-black text-primary/[0.04] select-none">
                  {step.number}
                </div>
                <Badge variant="default" className="mb-4">{step.number}</Badge>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted/70">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
