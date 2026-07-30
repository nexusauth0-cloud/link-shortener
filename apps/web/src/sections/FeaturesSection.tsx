import { motion } from "framer-motion"
import { Container, Section, FeatureCard } from "@nexuslinks/ui"
import {
  Zap,
  BarChart3,
  Globe,
  Code2,
  Users,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    description:
      "Redirects in milliseconds with global edge caching. Your links load instantly anywhere in the world.",
    accent: "from-primary to-secondary",
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Advanced Analytics",
    description:
      "Track clicks, geographic data, devices, and referrers in real-time with beautiful dashboards.",
    accent: "from-secondary to-primary",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Custom Domains",
    description:
      "Use your own domain for branded short links. Boost trust and recognition with every click.",
    accent: "from-accent to-primary",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "API First",
    description:
      "Integrate link shortening into your workflow with our powerful REST API and SDKs.",
    accent: "from-primary to-accent",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description:
      "Shared workspaces, role-based access, and audit logs for teams of any size.",
    accent: "from-secondary to-accent",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant, encrypted links, password protection, and link expiration controls.",
    accent: "from-accent to-secondary",
  },
]

export function FeaturesSection() {
  return (
    <Section id="features" className="relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Everything you need to manage links
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Powerful features packed into a simple, fast interface.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={i}
                accent={feature.accent}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
