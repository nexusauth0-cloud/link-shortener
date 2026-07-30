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
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Advanced Analytics",
    description:
      "Track clicks, geographic data, devices, and referrers in real-time with beautiful dashboards.",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Custom Domains",
    description:
      "Use your own domain for branded short links. Boost trust and recognition with every click.",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "API First",
    description:
      "Integrate link shortening into your workflow with our powerful REST API and SDKs.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Team Collaboration",
    description:
      "Shared workspaces, role-based access, and audit logs for teams of any size.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant, encrypted links, password protection, and link expiration controls.",
  },
]

export function FeaturesSection() {
  return (
    <Section id="features">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title text-foreground">
            Everything you need to manage links
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted">
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
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} index={i} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
