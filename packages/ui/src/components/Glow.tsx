import { cn } from '../lib/utils'

interface GlowProps {
  className?: string
  color?: 'primary' | 'accent' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const colorMap = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  secondary: 'bg-secondary',
}

const sizeMap = {
  sm: 'h-[200px] w-[200px] blur-[80px]',
  md: 'h-[400px] w-[400px] blur-[120px]',
  lg: 'h-[600px] w-[600px] blur-[160px]',
}

export function Glow({ className, color = 'primary', size = 'md', children }: GlowProps) {
  return (
    <div className={cn('pointer-events-none absolute -z-10', className)}>
      <div className={cn('rounded-full opacity-20', colorMap[color], sizeMap[size])} />
      {children}
    </div>
  )
}
