import { cn } from '../lib/utils'

interface AvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 'h-6 w-6 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-10 w-10 text-sm',
  xl: 'h-12 w-12 text-base',
}

export function Avatar({ src, alt = '', initials, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn('rounded-full object-cover', sizeMap[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'from-primary to-secondary flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white',
        sizeMap[size],
        className,
      )}
      aria-label={alt}
    >
      {initials ?? '?'}
    </div>
  )
}
