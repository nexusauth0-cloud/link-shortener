import { forwardRef } from 'react'
import { cn } from '../lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: 'default' | 'error' | 'success'
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, state = 'default', icon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="text-muted pointer-events-none absolute inset-y-0 left-3.5 flex items-center">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'bg-surface text-foreground placeholder:text-muted/50 h-9 w-full rounded-lg border px-3.5 text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            state === 'default' &&
              'border-border hover:border-border-hover focus:border-primary/60 focus:ring-primary/20',
            state === 'error' &&
              'border-danger/60 hover:border-danger focus:border-danger focus:ring-danger/20',
            state === 'success' &&
              'border-success/60 hover:border-success focus:border-success focus:ring-success/20',
            icon && 'pl-10',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="text-muted pointer-events-none absolute inset-y-0 right-3.5 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
export type { InputProps }
