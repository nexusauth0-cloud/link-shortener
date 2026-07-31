import { cn } from '../lib/utils'

interface BrandIllustrationProps {
  variant?: 'empty' | 'analytics' | 'nodes' | 'network' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function BrandIllustration({
  variant = 'nodes',
  size = 'md',
  className,
}: BrandIllustrationProps) {
  const s = size === 'sm' ? 'h-32 w-32' : size === 'lg' ? 'h-64 w-64' : 'h-48 w-48'

  if (variant === 'analytics') {
    return (
      <svg viewBox="0 0 200 200" className={cn(s, className)} fill="none">
        <rect x="20" y="80" width="40" height="100" rx="4" fill="#7C3AED" opacity="0.3" />
        <rect x="70" y="50" width="40" height="130" rx="4" fill="#A855F7" opacity="0.5" />
        <rect x="120" y="30" width="40" height="150" rx="4" fill="#22D3EE" opacity="0.4" />
        <rect x="170" y="90" width="20" height="90" rx="4" fill="#7C3AED" opacity="0.2" />
        <circle cx="100" cy="20" r="4" fill="#22D3EE" opacity="0.6" />
        <circle cx="100" cy="20" r="8" fill="#22D3EE" opacity="0.15" />
      </svg>
    )
  }

  if (variant === 'network') {
    return (
      <svg viewBox="0 0 200 200" className={cn(s, className)} fill="none">
        <circle cx="40" cy="50" r="6" fill="#7C3AED" opacity="0.6" />
        <circle cx="160" cy="40" r="6" fill="#22D3EE" opacity="0.6" />
        <circle cx="100" cy="80" r="6" fill="#A855F7" opacity="0.6" />
        <circle cx="60" cy="140" r="6" fill="#7C3AED" opacity="0.6" />
        <circle cx="140" cy="150" r="6" fill="#22D3EE" opacity="0.6" />
        <circle cx="100" cy="170" r="6" fill="#A855F7" opacity="0.6" />
        <line
          x1="40"
          y1="50"
          x2="160"
          y2="40"
          stroke="#7C3AED"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="160"
          y1="40"
          x2="100"
          y2="80"
          stroke="#22D3EE"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="40"
          y1="50"
          x2="100"
          y2="80"
          stroke="#7C3AED"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="80"
          x2="60"
          y2="140"
          stroke="#A855F7"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="150"
          stroke="#22D3EE"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="60"
          y1="140"
          x2="140"
          y2="150"
          stroke="#7C3AED"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 4"
        />
        <line
          x1="60"
          y1="140"
          x2="100"
          y2="170"
          stroke="#A855F7"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="140"
          y1="150"
          x2="100"
          y2="170"
          stroke="#22D3EE"
          strokeWidth="1"
          opacity="0.15"
          strokeDasharray="4 4"
        />
      </svg>
    )
  }

  if (variant === 'error') {
    return (
      <svg viewBox="0 0 200 200" className={cn(s, className)} fill="none">
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="#EF4444"
          strokeWidth="2"
          opacity="0.3"
          strokeDasharray="8 8"
        />
        <circle cx="100" cy="100" r="40" stroke="#EF4444" strokeWidth="1.5" opacity="0.2" />
        <line
          x1="85"
          y1="85"
          x2="115"
          y2="115"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="115"
          y1="85"
          x2="85"
          y2="115"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="100" cy="100" r="80" stroke="#EF4444" strokeWidth="1" opacity="0.1" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 200" className={cn(s, className)} fill="none">
      <circle cx="70" cy="60" r="20" stroke="#7C3AED" strokeWidth="2" opacity="0.4" />
      <circle cx="130" cy="60" r="20" stroke="#22D3EE" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="120" r="20" stroke="#A855F7" strokeWidth="2" opacity="0.4" />
      <circle cx="100" cy="100" r="8" fill="#7C3AED" opacity="0.8" />
      <circle cx="100" cy="100" r="3" fill="#050816" />
      <line x1="82" y1="75" x2="94" y2="95" stroke="#7C3AED" strokeWidth="1.5" opacity="0.3" />
      <line x1="118" y1="75" x2="106" y2="95" stroke="#22D3EE" strokeWidth="1.5" opacity="0.3" />
      <line x1="108" y1="118" x2="105" y2="110" stroke="#A855F7" strokeWidth="1.5" opacity="0.3" />
      <line x1="92" y1="118" x2="95" y2="110" stroke="#A855F7" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}
