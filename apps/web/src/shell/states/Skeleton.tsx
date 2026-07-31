'use client'

import { cn } from '@nexuslinks/ui'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('bg-surface/50 animate-pulse rounded-lg', className)} />
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-4 flex-1" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-16" />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-surface/30 rounded-xl p-5">
          <Skeleton className="mb-3 h-4 w-3/4" />
          <Skeleton className="mb-2 h-8 w-1/2" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="bg-surface/30 rounded-xl p-5">
      <Skeleton className="mb-4 h-4 w-1/4" />
      <div className="flex items-end gap-2" style={{ height: 160 }}>
        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
          <div key={i} className="flex-1">
            <div className="bg-surface/50 animate-pulse rounded-md" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}
