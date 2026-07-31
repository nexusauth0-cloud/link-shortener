'use client'

import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@nexuslinks/ui'

interface VerificationCodeInputProps {
  length?: number
  onComplete: (code: string) => void
  disabled?: boolean
}

export function VerificationCodeInput({
  length = 6,
  onComplete,
  disabled = false,
}: VerificationCodeInputProps) {
  const [codes, setCodes] = useState<string[]>(Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

  const handleChange = useCallback(
    (index: number, value: string) => {
      if (disabled) return
      if (!/^\d*$/.test(value)) return
      const digit = value.slice(-1)
      const newCodes = [...codes]
      newCodes[index] = digit
      setCodes(newCodes)

      if (digit && index < length - 1) {
        inputsRef.current[index + 1]?.focus()
      }

      if (newCodes.every((c) => c !== '') && onComplete) {
        onComplete(newCodes.join(''))
      }
    },
    [codes, length, onComplete, disabled],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return
      if (e.key === 'Backspace' && !codes[index] && index > 0) {
        const newCodes = [...codes]
        newCodes[index - 1] = ''
        setCodes(newCodes)
        inputsRef.current[index - 1]?.focus()
      }
    },
    [codes, disabled],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      const newCodes = [...codes]
      pasted.split('').forEach((char, i) => {
        if (i < length) newCodes[i] = char
      })
      setCodes(newCodes)
      const nextEmpty = newCodes.findIndex((c) => c === '')
      const focusIdx = nextEmpty === -1 ? length - 1 : nextEmpty
      inputsRef.current[focusIdx]?.focus()

      if (newCodes.every((c) => c !== '') && onComplete) {
        onComplete(newCodes.join(''))
      }
    },
    [codes, length, onComplete, disabled],
  )

  return (
    <div className="flex items-center justify-center gap-2">
      {codes.map((code, index) => (
        <motion.div
          key={index}
          animate={focusedIndex === index ? { scale: 1.04 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <input
            ref={(el) => {
              inputsRef.current[index] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={code}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={disabled}
            aria-label={`Digit ${index + 1}`}
            className={cn(
              'text-foreground h-12 w-10 rounded-xl text-center text-lg font-semibold outline-none transition-all duration-200',
              'bg-surface/40 backdrop-blur-sm',
              'focus:bg-surface/60 focus:ring-primary/15 focus:ring-2',
              'disabled:opacity-40',
              code && 'border-primary/40 bg-primary/5',
            )}
          />
        </motion.div>
      ))}
    </div>
  )
}
