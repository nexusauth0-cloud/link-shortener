'use client'

import { cn } from '@nexuslinks/ui'
import { ChevronRight, type LucideIcon } from 'lucide-react'

interface SuggestionCardProps {
  icon: LucideIcon
  title: string
  description: string
  action?: string
  variant?: 'success' | 'warning' | 'info' | 'default'
  onClick?: () => void
  className?: string
}

const variantStyles = {
  success: 'border-success/20 bg-success/5',
  warning: 'border-warning/20 bg-warning/5',
  info: 'border-accent/20 bg-accent/5',
  default: 'border-border/10 bg-surface/30',
}

const iconStyles = {
  success: 'text-success bg-success/10',
  warning: 'text-warning bg-warning/10',
  info: 'text-accent bg-accent/10',
  default: 'text-primary bg-primary/10',
}

export function SuggestionCard({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  onClick,
  className,
}: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'hover:bg-surface/50 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all',
        variantStyles[variant],
        className,
      )}
    >
      <div
        className={cn(
          'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
          iconStyles[variant],
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-medium">{title}</p>
        <p className="text-muted/60 mt-0.5 text-xs">{description}</p>
      </div>
      {action && (
        <div className="flex shrink-0 items-center gap-1">
          <span className="text-muted/40 text-xs">{action}</span>
          <ChevronRight className="text-muted/30 h-3 w-3" />
        </div>
      )}
    </button>
  )
}
