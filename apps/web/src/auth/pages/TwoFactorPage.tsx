'use client'

import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@nexuslinks/ui'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'
import { VerificationCodeInput } from '../components/VerificationCodeInput'

export default function TwoFactorPage() {
  const [step, setStep] = useState<'code' | 'loading' | 'success' | 'error'>('code')
  const [timer, setTimer] = useState(300)

  useEffect(() => {
    if (timer <= 0) return
    const t = setTimeout(() => setTimer(timer - 1), 1000)
    return () => clearTimeout(t)
  }, [timer])

  const handleComplete = useCallback(async (_code: string) => {
    setStep('loading')
    await new Promise((r) => setTimeout(r, 1500))
    setStep('success')
  }, [])

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60)
    const sec = s % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {step === 'code' && (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AuthCard>
              <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <svg
                      className="text-primary h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </div>
                </div>
                <h1 className="text-foreground text-xl font-bold">Two-factor authentication</h1>
                <p className="text-muted/60 mt-2 text-sm">
                  Enter the 6-digit code from your authenticator app.
                </p>
              </div>

              <VerificationCodeInput length={6} onComplete={handleComplete} />

              <div className="mt-4 text-center">
                <span className="text-muted/40 text-xs">
                  Code expires in{' '}
                  <span className="text-muted/60 font-medium">{formatTime(timer)}</span>
                </span>
              </div>

              <div className="mt-8 space-y-3">
                <Button variant="outline" className="w-full justify-center text-sm" size="lg">
                  Use recovery code instead
                </Button>
              </div>

              <Link
                to="/login"
                className="text-muted/50 hover:text-muted/80 mt-4 block text-center text-xs transition-colors"
              >
                Back to sign in
              </Link>
            </AuthCard>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthCard>
              <div className="flex flex-col items-center py-6 text-center">
                <Loader2 className="text-primary mb-4 h-8 w-8 animate-spin" />
                <p className="text-muted/60 text-sm">Verifying code...</p>
              </div>
            </AuthCard>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="bg-success/10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
              <CheckCircle2 className="text-success h-8 w-8" />
            </div>
            <h2 className="text-foreground text-xl font-bold">Authenticated</h2>
            <p className="text-muted/60 mt-2 text-sm">Redirecting to dashboard...</p>
          </motion.div>
        )}

        {step === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AuthCard>
              <div className="flex flex-col items-center text-center">
                <div className="bg-danger/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <AlertCircle className="text-danger h-7 w-7" />
                </div>
                <h2 className="text-foreground text-lg font-bold">Invalid code</h2>
                <p className="text-muted/60 mt-2 text-sm">
                  The code you entered is incorrect or expired.
                </p>
                <Button
                  onClick={() => setStep('code')}
                  className="mt-6 w-full justify-center"
                  size="lg"
                >
                  Try again
                </Button>
              </div>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
