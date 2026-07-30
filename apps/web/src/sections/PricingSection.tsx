import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Section, Badge, PricingCard } from "@nexuslinks/ui"
import { cn } from "@nexuslinks/ui"

type BillingCycle = "monthly" | "yearly"

const monthlyTiers = [
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
      "Team collaboration (5 seats)",
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
      "Unlimited clicks & domains",
      "Unlimited team seats",
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

const yearlyTiers = monthlyTiers.map((tier) => {
  if (tier.price === "Custom" || tier.price === "$0") return tier
  const monthly = Number.parseInt(tier.price.replace("$", ""))
  const yearlyPrice = Math.round(monthly * 10)
  return {
    ...tier,
    price: `$${yearlyPrice}`,
    description: tier.description + " Save 2 months.",
  }
})

export function PricingSection() {
  const [billing, setBilling] = useState<BillingCycle>("monthly")

  const tiers = billing === "monthly" ? monthlyTiers : yearlyTiers

  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Start free, upgrade when you grow. No hidden fees.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-12 flex items-center justify-center gap-4"
        >
          <button
            onClick={() => setBilling("monthly")}
            className={cn(
              "text-sm font-medium transition-colors",
              billing === "monthly" ? "text-foreground" : "text-muted/50 hover:text-muted/70",
            )}
          >
            Monthly
          </button>
          <div
            className="relative flex h-7 w-12 cursor-pointer items-center rounded-full border border-border/50 bg-surface/60 transition-colors hover:bg-surface-light/60"
            onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setBilling(billing === "monthly" ? "yearly" : "monthly")}
            aria-label={`Switch to ${billing === "monthly" ? "yearly" : "monthly"} billing`}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25 transition-all duration-300",
                billing === "yearly" ? "translate-x-6" : "translate-x-1",
              )}
            />
          </div>
          <button
            onClick={() => setBilling("yearly")}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors",
              billing === "yearly" ? "text-foreground" : "text-muted/50 hover:text-muted/70",
            )}
          >
            Yearly
            <Badge variant="success" className="text-[10px]">Save 17%</Badge>
          </button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name + billing}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <PricingCard tier={tier} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
