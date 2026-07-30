import { cn } from "../lib/utils"

interface CardProps {
  children?: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-surface/40 backdrop-blur-sm",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:border-border-light hover:bg-surface/60 hover:shadow-lg",
        glow && "animate-glow",
        className,
      )}
    >
      {children}
    </div>
  )
}
