import { cn } from '../lib/utils'

interface GradientBackgroundProps {
  className?: string
  variant?: 'primary' | 'accent' | 'mesh'
}

export function GradientBackground({ className, variant = 'primary' }: GradientBackgroundProps) {
  if (variant === 'mesh') {
    return (
      <div
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          'bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,60,235,0.12),transparent)]',
          'bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(0,229,255,0.06),transparent)]',
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        variant === 'primary' &&
          'bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(124,58,237,0.1),transparent)]',
        variant === 'accent' &&
          'bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(0,229,255,0.06),transparent)]',
        className,
      )}
    />
  )
}
