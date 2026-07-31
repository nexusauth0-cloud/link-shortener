import { motion } from 'framer-motion'
import { cn } from '@nexuslinks/ui'

interface PasswordStrengthProps {
  password: string
}

function getStrength(password: string): {
  score: number
  label: string
  color: string
  width: string
} {
  if (!password) return { score: 0, label: '', color: '', width: '0%' }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { score: 0, label: 'Weak', color: 'bg-danger', width: '16%' },
    { score: 1, label: 'Weak', color: 'bg-danger', width: '16%' },
    { score: 2, label: 'Fair', color: 'bg-warning', width: '33%' },
    { score: 3, label: 'Good', color: 'bg-yellow-500', width: '50%' },
    { score: 4, label: 'Strong', color: 'bg-success', width: '66%' },
    { score: 5, label: 'Excellent', color: 'bg-emerald-400', width: '83%' },
    { score: 6, label: 'Excellent', color: 'bg-emerald-400', width: '100%' },
  ]

  return map[score]!
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { label, color, width } = getStrength(password)

  if (!password) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mt-2 space-y-1.5"
    >
      <div className="bg-surface flex h-1 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={cn('rounded-full transition-colors duration-300', color)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted/50 text-[11px] font-medium">Password strength</span>
        <span
          className={cn('text-[11px] font-medium', {
            'text-danger': label === 'Weak',
            'text-warning': label === 'Fair',
            'text-yellow-500': label === 'Good',
            'text-success': label === 'Strong',
            'text-emerald-400': label === 'Excellent',
          })}
        >
          {label}
        </span>
      </div>
      {password.length < 8 && (
        <p className="text-muted/40 text-[10px]">At least 8 characters required</p>
      )}
      {password.length >= 8 && !/[A-Z]/.test(password) && (
        <p className="text-muted/40 text-[10px]">Add an uppercase letter</p>
      )}
      {password.length >= 8 && !/[0-9]/.test(password) && (
        <p className="text-muted/40 text-[10px]">Add a number</p>
      )}
      {password.length >= 8 && !/[^A-Za-z0-9]/.test(password) && (
        <p className="text-muted/40 text-[10px]">Add a special character</p>
      )}
    </motion.div>
  )
}
