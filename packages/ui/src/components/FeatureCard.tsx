import { cn } from "../lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  index?: number
  accent?: string
}

export function FeatureCard({ icon, title, description, className, index = 0, accent }: FeatureCardProps) {
  const iconBg = accent
    ? `bg-gradient-to-br ${accent} bg-opacity-10 text-white`
    : index % 2 === 0
      ? "bg-primary/10 text-primary"
      : "bg-secondary/10 text-secondary"

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/40 bg-surface/30 p-6 transition-all duration-500",
        "hover:-translate-y-1 hover:border-primary/20 hover:bg-surface/50 hover:shadow-xl hover:shadow-primary/5",
        className,
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent" />
      </div>
      <div
        className={cn(
          "mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
          iconBg,
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted/70">{description}</p>
    </div>
  )
}
