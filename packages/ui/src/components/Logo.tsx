import { cn } from '../lib/utils'

interface LogoProps {
  variant?: 'default' | 'horizontal' | 'symbol' | 'monochrome' | 'small'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizes = {
  sm: { symbol: 'h-6 w-6', text: 'text-sm', gap: 'gap-1.5' },
  md: { symbol: 'h-8 w-8', text: 'text-base', gap: 'gap-2' },
  lg: { symbol: 'h-10 w-10', text: 'text-lg', gap: 'gap-2.5' },
  xl: { symbol: 'h-12 w-12', text: 'text-xl', gap: 'gap-3' },
}

export function Logo({ variant = 'default', size = 'md', className }: LogoProps) {
  const s = sizes[size]

  if (variant === 'symbol') {
    return <LogoMark size={s.symbol} className={className} />
  }

  if (variant === 'small') {
    return <LogoMark size="h-5 w-5" simplified className={className} />
  }

  if (variant === 'monochrome') {
    return (
      <div className={cn('flex items-center', s.gap, className)}>
        <LogoMark size={s.symbol} monochrome />
        <span className={cn('text-foreground font-semibold tracking-tight', s.text)}>
          Nexus Links
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center', s.gap, className)}>
      <LogoMark size={s.symbol} />
      {(variant === 'default' || variant === 'horizontal') && (
        <div className="flex flex-col">
          <span className={cn('text-foreground font-semibold leading-none tracking-tight', s.text)}>
            Nexus
          </span>
          {variant === 'horizontal' && (
            <span className="text-muted/40 text-[10px] font-medium tracking-wider">LINKS</span>
          )}
        </div>
      )}
    </div>
  )
}

function LogoMark({
  size,
  monochrome,
  simplified,
  className,
}: {
  size: string
  monochrome?: boolean
  simplified?: boolean
  className?: string
}) {
  const fill = monochrome ? 'currentColor' : undefined
  const grad1 = monochrome ? 'currentColor' : 'url(#logo-primary)'
  const grad2 = monochrome ? 'currentColor' : 'url(#logo-accent)'

  return (
    <svg
      viewBox="0 0 32 32"
      className={cn(size, className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-primary" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <linearGradient id="logo-accent" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {simplified ? (
        <>
          <circle
            cx="16"
            cy="16"
            r="14"
            fill={fill ?? 'url(#logo-primary)'}
            opacity={monochrome ? 1 : 0.15}
          />
          <circle cx="16" cy="16" r="6" fill={fill ?? 'url(#logo-accent)'} />
          <circle cx="16" cy="16" r="2" fill={monochrome ? '#fff' : '#050816'} />
        </>
      ) : (
        <>
          <circle
            cx="11"
            cy="11"
            r="7"
            stroke={grad1}
            strokeWidth="2.5"
            opacity={monochrome ? 0.6 : 0.5}
          />
          <circle
            cx="21"
            cy="11"
            r="7"
            stroke={grad2}
            strokeWidth="2.5"
            opacity={monochrome ? 0.6 : 0.5}
          />
          <circle
            cx="16"
            cy="21"
            r="7"
            stroke={grad1}
            strokeWidth="2.5"
            opacity={monochrome ? 0.6 : 0.5}
          />
          <circle cx="16" cy="16" r="4" fill={fill ?? 'url(#logo-accent)'} />
          <circle cx="16" cy="16" r="1.5" fill={monochrome ? '#fff' : '#050816'} />
        </>
      )}
    </svg>
  )
}
