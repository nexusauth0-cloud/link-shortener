import { cn } from "../lib/utils"

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "gradient"
}

const variants = {
  default: "bg-surface-light text-muted border-border",
  primary: "bg-primary/10 text-primary-light border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  gradient:
    "bg-gradient-to-r from-primary/20 to-secondary/10 text-primary-light border-primary/20",
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
