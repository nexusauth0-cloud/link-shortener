import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow-md hover:shadow-primary/20',
        secondary:
          'bg-surface-elevated text-foreground hover:bg-surface-elevated/80 border border-border hover:border-border-hover active:bg-surface-elevated/60',
        ghost: 'text-muted hover:text-foreground hover:bg-surface',
        outline:
          'border border-border text-foreground hover:bg-surface hover:border-border-hover active:bg-surface-elevated',
        gradient:
          'bg-gradient-to-r from-primary to-secondary text-white shadow-sm hover:shadow-md hover:shadow-primary/20',
        danger: 'bg-danger text-white hover:bg-danger/90 active:bg-danger/80',
        icon: 'h-9 w-9 p-0 text-muted hover:text-foreground hover:bg-surface rounded-lg',
      },
      size: {
        sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
        md: 'h-9 px-4 text-sm gap-2 rounded-lg',
        lg: 'h-10 px-5 text-sm gap-2 rounded-lg',
        xl: 'h-12 px-6 text-base gap-2.5 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export type { ButtonProps }
