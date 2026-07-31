'use client'

import { cn } from '@nexuslinks/ui'
import { Link2, Plus } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  primaryAction?: { label: string; onClick?: () => void; href?: string }
  secondaryAction?: { label: string; onClick?: () => void; href?: string }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="bg-surface mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
        {icon ?? <Link2 className="text-muted/40 h-6 w-6" />}
      </div>
      <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      <p className="text-muted/60 mt-1.5 max-w-sm text-sm">{description}</p>
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {primaryAction &&
            (primaryAction.href ? (
              <a
                href={primaryAction.href}
                className="bg-primary shadow-primary/30 hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" />
                {primaryAction.label}
              </a>
            ) : (
              <button
                onClick={primaryAction.onClick}
                className="bg-primary shadow-primary/30 hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" />
                {primaryAction.label}
              </button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <a
                href={secondaryAction.href}
                className="border-border/40 bg-surface/30 text-foreground hover:bg-surface/50 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all"
              >
                {secondaryAction.label}
              </a>
            ) : (
              <button
                onClick={secondaryAction.onClick}
                className="text-foreground hover:bg-surface/50 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
              >
                {secondaryAction.label}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
