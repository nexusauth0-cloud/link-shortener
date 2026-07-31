'use client'

import { cn } from '@nexuslinks/ui'

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function AnimatedInput({ label, error, hint, className, id, ...props }: AnimatedInputProps) {
  return (
    <div className="group">
      {label && (
        <label htmlFor={id} className="text-muted/80 mb-1.5 block text-xs font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={cn(
            'bg-surface/40 text-foreground placeholder:text-muted/30 h-10 w-full rounded-xl px-3.5 text-sm backdrop-blur-sm transition-all duration-200',
            'ring-border/10 focus:ring-primary/20 outline-none ring-1 focus:ring-2',
            error && 'ring-danger/30 focus:ring-danger/30',
            className,
          )}
          {...props}
        />
        <div className="from-primary to-accent pointer-events-none absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r transition-transform duration-300 group-focus-within:scale-x-100" />
      </div>
      {error && <p className="text-danger mt-1 text-[11px]">{error}</p>}
      {hint && !error && <p className="text-muted/40 mt-1 text-[10px]">{hint}</p>}
    </div>
  )
}
