import { cn } from '../lib/utils'

interface DividerProps {
  className?: string
}

export function Divider({ className }: DividerProps) {
  return <hr className={cn('bg-border h-px w-full border-none', className)} />
}
