'use client'

import { cn } from '@nexuslinks/ui'
import { AlertTriangle, RefreshCw, MessageCircle } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="bg-warning/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
        <AlertTriangle className="text-warning h-6 w-6" />
      </div>
      <h3 className="text-foreground text-lg font-semibold">{title}</h3>
      <p className="text-muted/60 mt-1.5 max-w-sm text-sm">{description}</p>
      <div className="mt-6 flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-primary shadow-primary/30 hover:bg-primary/90 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        )}
        <a
          href="#"
          className="text-foreground hover:bg-surface/50 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
        >
          <MessageCircle className="h-4 w-4" />
          Contact support
        </a>
      </div>
    </div>
  )
}
