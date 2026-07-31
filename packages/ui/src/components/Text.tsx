import { cn } from '../lib/utils'

type Variant =
  | 'display-xl'
  | 'display-l'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'body-lg'
  | 'body'
  | 'small'
  | 'caption'

type Weight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
type Color = 'foreground' | 'muted' | 'primary' | 'accent' | 'success' | 'danger'

interface TextProps {
  children: React.ReactNode
  variant?: Variant
  as?: React.ElementType
  weight?: Weight
  color?: Color
  className?: string
  align?: 'left' | 'center' | 'right'
}

const variantStyles: Record<Variant, string> = {
  'display-xl': 'text-display-xl font-bold leading-display-xl tracking-tight',
  'display-l': 'text-display-l font-bold leading-display-l tracking-tight',
  'heading-1': 'text-heading-1 font-semibold leading-heading-1 tracking-tight',
  'heading-2': 'text-heading-2 font-semibold leading-heading-2 tracking-tight',
  'heading-3': 'text-heading-3 font-semibold leading-heading-3',
  'body-lg': 'text-body-lg leading-body',
  body: 'text-body leading-body',
  small: 'text-small leading-body',
  caption: 'text-caption leading-caption tracking-wide uppercase',
}

const weightStyles: Record<Weight, string> = {
  light: 'font-light',
  regular: 'font-regular',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorStyles: Record<Color, string> = {
  foreground: 'text-foreground',
  muted: 'text-muted',
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  danger: 'text-danger',
}

const defaultTags: Record<Variant, React.ElementType> = {
  'display-xl': 'h1',
  'display-l': 'h2',
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'body-lg': 'p',
  body: 'p',
  small: 'p',
  caption: 'span',
}

export function Text({
  children,
  variant = 'body',
  as,
  weight,
  color,
  className,
  align,
}: TextProps) {
  const Tag = as ?? defaultTags[variant]

  return (
    <Tag
      className={cn(
        variantStyles[variant],
        weight && weightStyles[weight],
        color ? colorStyles[color] : 'text-foreground',
        align && `text-${align}`,
        className,
      )}
    >
      {children}
    </Tag>
  )
}
