'use client'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle2, Users } from 'lucide-react'
import { Button } from '@nexuslinks/ui'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'
import { PasswordStrength } from '../components/PasswordStrength'
import { inviteSchema, type InviteFormData } from '../schemas/auth'

export default function InvitePage() {
  const { token } = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    mode: 'onChange',
  })

  const password = watch('password', '')

  const onSubmit = async (_data: InviteFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsLoading(false)
    setSuccess(true)
  }

  if (!token) {
    return (
      <AuthLayout>
        <AuthCard>
          <div className="text-center">
            <h2 className="text-foreground text-lg font-bold">Invalid invitation</h2>
            <p className="text-muted/60 mt-2 text-sm">
              This invitation link has expired or is invalid.
            </p>
          </div>
        </AuthCard>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {success ? (
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
            <h2 className="text-foreground text-xl font-bold">Welcome to the team</h2>
            <p className="text-muted/60 mt-2 text-sm">
              Your account is ready. Redirecting to your workspace...
            </p>
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
              <div className="mb-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Users className="text-primary h-6 w-6" />
                  </div>
                </div>
                <h1 className="text-foreground text-xl font-bold">You&apos;re invited</h1>
                <p className="text-muted/60 mt-1.5 text-sm">
                  Your team at <span className="text-foreground font-medium">Acme Corp</span> uses
                  Nexus Links.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-muted/80 mb-1.5 block text-xs font-medium">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    {...register('name')}
                    className="bg-surface/40 text-foreground placeholder:text-muted/30 focus:border-primary/40 focus:bg-surface/60 focus:ring-primary/15 h-10 w-full rounded-xl px-3.5 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
                  />
                  {errors.name && (
                    <p className="text-danger mt-1 text-[11px]">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-muted/80 mb-1.5 block text-xs font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Create a password"
                      {...register('password')}
                      className="bg-surface/40 text-foreground placeholder:text-muted/30 focus:border-primary/40 focus:bg-surface/60 focus:ring-primary/15 h-10 w-full rounded-xl px-3.5 pr-10 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted/40 hover:text-muted/70 absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-danger mt-1 text-[11px]">{errors.password.message}</p>
                  )}
                  <PasswordStrength password={password} />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="text-muted/80 mb-1.5 block text-xs font-medium"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Re-enter password"
                      {...register('confirmPassword')}
                      className="bg-surface/40 text-foreground placeholder:text-muted/30 focus:border-primary/40 focus:bg-surface/60 focus:ring-primary/15 h-10 w-full rounded-xl px-3.5 pr-10 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="text-muted/40 hover:text-muted/70 absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-danger mt-1 text-[11px]">{errors.confirmPassword.message}</p>
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
                      Joining workspace...
                    </span>
                  ) : (
                    'Accept invitation'
                  )}
                </Button>
              </form>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
