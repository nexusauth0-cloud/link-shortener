import { cn } from "../lib/utils"
import { Badge } from "./Badge"
import { buttonVariants } from "./Button"

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
  href: string
}

interface PricingCardProps {
  tier: PricingTier
  className?: string
}

export function PricingCard({ tier, className }: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
        tier.popular
          ? "border-primary/40 bg-primary/5 shadow-xl shadow-primary/10 hover:shadow-primary/20"
          : "border-border/50 bg-surface/30 hover:border-border-light hover:bg-surface/50",
        className,
      )}
    >
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="primary">Most Popular</Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
        <p className="mt-1 text-sm text-muted">{tier.description}</p>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">{tier.price}</span>
          {tier.price !== "Custom" && (
            <span className="text-sm text-muted">/month</span>
          )}
        </div>
      </div>

      <a
        href={tier.href}
        className={cn(
          buttonVariants({ variant: tier.popular ? "primary" : "secondary" }),
          "mb-8 w-full",
        )}
      >
        {tier.cta}
      </a>

      <ul className="space-y-3">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-muted">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
