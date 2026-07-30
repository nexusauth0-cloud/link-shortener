import { motion } from "framer-motion"
import { Container, Section, Card } from "@nexuslinks/ui"
import { Link, BarChart3, Settings } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: <Link className="h-6 w-6" />,
    title: "Paste your URL",
    description:
      "Enter any long URL into Nexus Links. Our system validates and prepares it for shortening in milliseconds.",
  },
  {
    number: "02",
    icon: <Settings className="h-6 w-6" />,
    title: "Customize your link",
    description:
      "Add a custom slug, set expiration, enable password protection, and choose your branded domain.",
  },
  {
    number: "03",
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track everything",
    description:
      "Monitor clicks, geographic data, device types, and referrers in real-time from your dashboard.",
  },
]

export function HowItWorks() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title text-foreground">
            How it works
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted">
            Three simple steps to start tracking your links.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card className="relative p-8 text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div className="absolute right-4 top-4 text-4xl font-bold text-primary/10">
                  {step.number}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{step.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
