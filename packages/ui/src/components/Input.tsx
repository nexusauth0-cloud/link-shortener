import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: React.ReactNode
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
          {icon}
        </div>
      )}
      <input
        className={cn(
          "h-12 w-full rounded-xl border border-border bg-surface/60 px-4 text-sm text-foreground placeholder:text-muted/60 transition-all duration-200",
          "focus:border-primary/50 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20",
          "hover:border-border-light",
          icon && "pl-12",
          className,
        )}
        {...props}
      />
    </div>
  )
}
