import { cn } from '../lib/utils'

interface ChipProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'accent'
  size?: 'sm' | 'md'
  onClick?: () => void
  active?: boolean
}

const variants = {
  default: 'text-muted hover:text-foreground hover:bg-surface border-border',
  primary: 'text-primary bg-primary/10 border-primary/20',
  accent: 'text-accent bg-accent/10 border-accent/20',
}

export function Chip({
  children,
  className,
  variant = 'default',
  size = 'sm',
  onClick,
  active,
}: ChipProps) {
  const Component = onClick ? 'button' : 'span'

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium leading-none transition-all duration-200',
        variants[variant],
        size === 'md' && 'px-3.5 py-1.5 text-sm',
        onClick && 'cursor-pointer',
        active && 'ring-primary/30 ring-1',
        className,
      )}
    >
      {children}
    </Component>
  )
}
