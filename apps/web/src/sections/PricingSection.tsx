import { motion } from "framer-motion"
import { Container, Section, PricingCard } from "@nexuslinks/ui"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started with link management.",
    features: [
      "1,000 links/month",
      "10,000 clicks/month",
      "Basic analytics",
      "Standard domains",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
    href: "/signup",
  },
  {
    name: "Pro",
    price: "$29",
    description: "For professionals and growing teams.",
    features: [
      "50,000 links/month",
      "500,000 clicks/month",
      "Advanced analytics",
      "Custom domains (3)",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
    href: "/signup",
  },
  {
    name: "Business",
    price: "$99",
    description: "For organizations with advanced needs.",
    features: [
      "Unlimited links",
      "5,000,000 clicks/month",
      "Real-time analytics",
      "Custom domains (10)",
      "Team collaboration",
      "SSO & SAML",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    popular: false,
    href: "/contact",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large-scale deployments and custom requirements.",
    features: [
      "Everything in Business",
      "Unlimited clicks",
      "Unlimited domains",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Account manager",
    ],
    cta: "Contact Us",
    popular: false,
    href: "/contact",
  },
]

export function PricingSection() {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted">
            Start free, upgrade when you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
