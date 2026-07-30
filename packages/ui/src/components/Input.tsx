import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Input({ className, icon, rightIcon, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "h-12 w-full rounded-xl border border-border/60 bg-surface/40 px-4 text-sm text-foreground",
          "placeholder:text-muted/40 backdrop-blur-sm transition-all duration-300",
          "focus:border-primary/40 focus:bg-surface/60 focus:outline-none focus:ring-2 focus:ring-primary/15 focus:shadow-lg focus:shadow-primary/5",
          "hover:border-border-light",
          icon && "pl-12",
          rightIcon && "pr-12",
          className,
        )}
        {...props}
      />
      {rightIcon && (
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted">
          {rightIcon}
        </div>
      )}
    </div>
  )
}
