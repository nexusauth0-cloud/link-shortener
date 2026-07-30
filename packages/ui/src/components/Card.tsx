import { cn } from "../lib/utils"

interface CardProps {
  children?: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  glass?: boolean
  borderAnimation?: boolean
}

export function Card({
  children,
  className,
  hover = true,
  glow = false,
  glass = true,
  borderAnimation = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-500",
        glass && "glass-card",
        !glass && "border border-border/40 bg-surface/30",
        hover &&
          "hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
        glow && "animate-glow-soft",
        borderAnimation && "animate-border-glow",
        className,
      )}
    >
      {children}
    </div>
  )
}
