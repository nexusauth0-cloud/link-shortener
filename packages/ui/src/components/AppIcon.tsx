import { cn } from '../lib/utils'

interface AppIconProps {
  size?: number
  className?: string
  variant?: 'default' | 'notification'
}

export function AppIcon({ size = 1024, className, variant = 'default' }: AppIconProps) {
  const actualSize = variant === 'notification' ? Math.min(size, 48) : size
  const glowSize = actualSize * 0.5

  return (
    <svg
      width={actualSize}
      height={actualSize}
      viewBox="0 0 1024 1024"
      className={cn('rounded-[22%]', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="icon-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#1a1040" />
          <stop offset="50%" stopColor="#0C1224" />
          <stop offset="100%" stopColor="#050816" />
        </radialGradient>
        <linearGradient id="icon-glow" x1="0" y1="0" x2="1024" y2="1024">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
        <linearGradient id="icon-ring1" x1="0" y1="0" x2="1024" y2="1024">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="icon-ring2" x1="1024" y1="0" x2="0" y2="1024">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
        </linearGradient>
        <filter id="icon-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#7C3AED" floodOpacity="0.3" />
        </filter>
      </defs>

      <rect width="1024" height="1024" rx="225" fill="url(#icon-bg)" />

      <circle cx="512" cy={512 - glowSize * 0.3} r={glowSize} fill="#7C3AED" opacity={0.08} />

      <g filter="url(#icon-shadow)">
        <circle
          cx="340"
          cy="340"
          r="180"
          stroke="url(#icon-ring1)"
          strokeWidth="18"
          opacity="0.5"
        />
        <circle
          cx="684"
          cy="340"
          r="180"
          stroke="url(#icon-ring2)"
          strokeWidth="18"
          opacity="0.5"
        />
        <circle
          cx="512"
          cy="640"
          r="180"
          stroke="url(#icon-ring1)"
          strokeWidth="18"
          opacity="0.5"
        />
      </g>

      <circle cx="512" cy="512" r="90" fill="url(#icon-glow)" />
      <circle cx="512" cy="512" r="36" fill="#050816" opacity="0.9" />
      <circle cx="512" cy="512" r="18" fill="url(#icon-glow)" />
    </svg>
  )
}
