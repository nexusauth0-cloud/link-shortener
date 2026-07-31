'use client'

import { cn } from '@nexuslinks/ui'
import { motion } from 'framer-motion'

interface ProgressScoreProps {
  label: string
  score: number
  maxScore?: number
  variant?: 'default' | 'compact'
  className?: string
}

function getColor(percent: number): string {
  if (percent >= 90) return 'bg-success'
  if (percent >= 70) return 'bg-accent'
  if (percent >= 50) return 'bg-warning'
  return 'bg-danger'
}

function getLabel(percent: number): string {
  if (percent >= 90) return 'Excellent'
  if (percent >= 70) return 'Good'
  if (percent >= 50) return 'Fair'
  return 'Needs work'
}

export function ProgressScore({
  label,
  score,
  maxScore = 100,
  variant = 'default',
  className,
}: ProgressScoreProps) {
  const percent = Math.min(Math.round((score / maxScore) * 100), 100)
  const barColor = getColor(percent)
  const statusLabel = getLabel(percent)

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2.5', className)}>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted/60">{label}</span>
            <span className={cn('font-medium', barColor.replace('bg-', 'text-'))}>{percent}%</span>
          </div>
          <div className="bg-surface mt-1 h-1.5 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn('h-full rounded-full', barColor)}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('border-border/10 bg-surface/30 rounded-xl border p-4', className)}>
      <div className="flex items-center justify-between">
        <span className="text-foreground text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-foreground text-2xl font-bold tracking-tight">{percent}</span>
          <span className="text-muted/40 text-xs">/ {maxScore}</span>
        </div>
      </div>
      <div className="bg-surface mt-3 h-2 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn('h-full rounded-full', barColor)}
        />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className={cn('text-xs font-medium', barColor.replace('bg-', 'text-'))}>
          {statusLabel}
        </span>
      </div>
    </div>
  )
}
