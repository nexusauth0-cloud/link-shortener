'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Button } from '@nexuslinks/ui'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../schemas/auth'

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsLoading(false)
    setEmailSubmitted(data.email)
    setSent(true)
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <AuthCard>
              <div className="flex flex-col items-center text-center">
                <div className="bg-success/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <CheckCircle2 className="text-success h-7 w-7" />
                </div>
                <h2 className="text-foreground text-lg font-bold">Check your email</h2>
                <p className="text-muted/60 mt-2 text-sm leading-relaxed">
                  We sent a password reset link to{' '}
                  <span className="text-foreground font-medium">{emailSubmitted}</span>
                </p>
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 mt-6 flex items-center gap-1.5 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to sign in
                </Link>
              </div>
            </AuthCard>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <AuthCard>
              <div className="mb-8">
                <h1 className="text-foreground text-xl font-bold">Reset your password</h1>
                <p className="text-muted/60 mt-1.5 text-sm">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-muted/80 mb-1.5 block text-xs font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    {...register('email')}
                    className="bg-surface/40 text-foreground placeholder:text-muted/30 focus:border-primary/40 focus:bg-surface/60 focus:ring-primary/15 h-10 w-full rounded-xl px-3.5 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  />
                  {errors.email && (
                    <p className="text-danger mt-1 text-[11px]">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full justify-center"
                  size="lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send reset link'
                  )}
                </Button>
              </form>

              <Link
                to="/login"
                className="text-muted/50 hover:text-muted/80 mt-6 flex items-center justify-center gap-1.5 text-xs font-medium transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to sign in
              </Link>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
