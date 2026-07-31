import { cn } from '../lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  fullWidth?: boolean
}

export function Section({ children, className, id, fullWidth }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 sm:py-20 lg:py-24',
        fullWidth ? '' : 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </section>
  )
}
