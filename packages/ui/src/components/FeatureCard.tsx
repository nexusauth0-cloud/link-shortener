import { cn } from "../lib/utils"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  index?: number
}

export function FeatureCard({ icon, title, description, className, index = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border/50 bg-surface/30 p-6 transition-all duration-500",
        "hover:-translate-y-1 hover:border-primary/20 hover:bg-surface/60 hover:shadow-lg hover:shadow-primary/5",
        "before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:opacity-0 before:transition-opacity before:duration-500",
        "hover:before:opacity-100",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-300",
          "bg-primary/10 text-primary group-hover:bg-primary/15 group-hover:scale-110",
          index % 2 === 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary",
        )}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  )
}
