import { forwardRef, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 select-none overflow-hidden group",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "glass-strong text-foreground hover:text-foreground hover:bg-surface-light/80 hover:scale-[1.02] active:scale-[0.98] border border-border/50",
        ghost:
          "text-muted hover:text-foreground hover:bg-surface/60 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-primary/30 text-primary-light hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] active:scale-[0.98]",
        danger:
          "bg-danger text-white hover:bg-danger/90 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-xs gap-1.5",
        md: "h-10 px-5 text-sm gap-2",
        lg: "h-12 px-7 text-sm gap-2",
        xl: "h-14 px-9 text-base gap-2.5",
        xxl: "h-16 px-10 text-lg gap-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, disabled, ...props }, ref) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      setRipples((prev) => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
      props.onClick?.(e)
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled}
        onClick={handleClick}
        {...props}
      >
        {variant === "primary" && !disabled && (
          <span className="pointer-events-none absolute -inset-full -skew-x-12 animate-shine opacity-0 transition-opacity group-hover:opacity-100">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </span>
        )}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="pointer-events-none absolute animate-fade-in rounded-full bg-white/15"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
