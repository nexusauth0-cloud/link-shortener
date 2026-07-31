import { cn } from '../lib/utils'

interface SpinnerProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[2.5px]',
}

export function Spinner({ className, size = 'md' }: SpinnerProps) {
  return (
    <div
      className={cn(
        'border-muted/20 border-t-foreground animate-spin rounded-full',
        sizeMap[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
