import { cn } from '../lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'feature' | 'pricing' | 'analytics'
  hover?: boolean
}

const cardVariants = {
  default: 'bg-surface border border-border',
  glass: 'bg-surface/60 backdrop-blur-xl border border-border',
  feature: 'bg-surface border border-border hover:border-border-hover hover:bg-surface-elevated/50',
  pricing:
    'bg-surface border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
  analytics: 'bg-surface-elevated border border-border',
}

export function Card({ children, className, variant = 'default', hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-200',
        cardVariants[variant],
        hover && 'hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
    >
      {children}
    </div>
  )
}
