import { forwardRef } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/25 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-surface text-foreground hover:bg-surface-light border border-border hover:border-border-light hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "text-muted hover:text-foreground hover:bg-surface/80",
        outline:
          "border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60",
        danger:
          "bg-danger text-white hover:bg-danger/90",
      },
      size: {
        sm: "h-9 px-4 text-sm gap-1.5",
        md: "h-10 px-5 text-sm gap-2",
        lg: "h-12 px-7 text-base gap-2",
        xl: "h-14 px-9 text-lg gap-2.5",
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
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  ),
)
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
