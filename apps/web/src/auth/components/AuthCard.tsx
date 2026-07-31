import { cn } from '@nexuslinks/ui'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        'bg-surface/60 w-full max-w-[420px] rounded-2xl p-8 backdrop-blur-xl',
        'shadow-[0_0_80px_rgba(124,58,237,0.06)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
