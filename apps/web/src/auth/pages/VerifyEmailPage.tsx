'use client'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@nexuslinks/ui'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [verified, setVerified] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setIsVerifying(false)
      setVerified(true)
    }, 2500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true)
      return
    }
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(t)
  }, [resendTimer])

  const handleResend = () => {
    setCanResend(false)
    setResendTimer(60)
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {isVerifying ? (
          <motion.div
            key="verifying"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AuthCard>
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <svg className="h-14 w-14" viewBox="0 0 56 56" fill="none">
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="#7C3AED"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={150}
                      strokeDashoffset={150}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                      className="opacity-20"
                    />
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="#7C3AED"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray={150}
                      strokeDashoffset={150}
                      animate={{ strokeDashoffset: 37.5 }}
                      transition={{ duration: 2, ease: 'easeInOut' }}
                    />
                    <motion.path
                      d="M18 28l7 7 13-13"
                      stroke="#22C55E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: verified ? 1 : 0 }}
                      transition={{ duration: 0.5, delay: 2 }}
                    />
                  </svg>
                </div>
                <h2 className="text-foreground text-lg font-bold">Verifying your email</h2>
                <p className="text-muted/60 mt-2 text-sm">
                  Please wait while we confirm your email address...
                </p>
                <Loader2 className="text-primary mt-6 h-5 w-5 animate-spin" />
              </div>
            </AuthCard>
          </motion.div>
        ) : verified ? (
          <motion.div
            key="verified"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AuthCard>
              <div className="flex flex-col items-center text-center">
                <div className="bg-success/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <CheckCircle2 className="text-success h-7 w-7" />
                </div>
                <h2 className="text-foreground text-lg font-bold">Email verified</h2>
                <p className="text-muted/60 mt-2 text-sm">
                  Your email has been verified successfully.
                </p>
                <Link
                  to="/login"
                  className="bg-primary shadow-primary/30 hover:bg-primary/90 mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
                >
                  Continue to sign in
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="mt-6 pt-6">
                  <p className="text-muted/50 text-xs">Didn&apos;t receive the email?</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={!canResend}
                    onClick={handleResend}
                    className="mt-2"
                  >
                    {canResend ? 'Resend email' : `Resend in ${resendTimer}s`}
                  </Button>
                </div>
              </div>
            </AuthCard>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AuthLayout>
  )
}
