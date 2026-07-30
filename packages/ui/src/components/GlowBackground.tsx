import { cn } from "../lib/utils"

interface GlowBackgroundProps {
  className?: string
  color?: "primary" | "secondary" | "accent"
  variant?: "blob" | "radial" | "gradient"
  children?: React.ReactNode
}

const colorMap = {
  primary: "from-primary/20 via-primary/5 to-transparent",
  secondary: "from-secondary/20 via-secondary/5 to-transparent",
  accent: "from-accent/20 via-accent/5 to-transparent",
}

export function GlowBackground({
  className,
  color = "primary",
  variant = "radial",
  children,
}: GlowBackgroundProps) {
  if (variant === "blob") {
    return (
      <div className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
        <div
          className={cn(
            "animate-blob absolute -left-1/2 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-30 blur-3xl",
            colorMap[color],
          )}
        />
        <div
          className={cn(
            "animate-blob absolute -right-1/2 top-1/3 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl",
            colorMap[color],
          )}
          style={{ animationDelay: "-2s" }}
        />
        {children}
      </div>
    )
  }

  return (
    <div className={cn("pointer-events-none absolute inset-0 -z-10", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
          colorMap[color],
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl",
          color === "primary" && "bg-primary/10",
          color === "secondary" && "bg-secondary/10",
          color === "accent" && "bg-accent/10",
        )}
      />
      {children}
    </div>
  )
}
