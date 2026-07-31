'use client'

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@nexuslinks/ui'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'
import { OAuthButtons } from '../components/OAuthButtons'
import { loginSchema, type LoginFormData } from '../schemas/auth'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (_data: LoginFormData) => {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setIsLoading(false)
    setSuccess(true)
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
            <h2 className="text-foreground text-xl font-bold">Welcome back</h2>
            <p className="text-muted/60 mt-2 text-sm">Redirecting to your dashboard...</p>
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
                <h1 className="text-foreground text-xl font-bold">Sign in to Nexus</h1>
                <p className="text-muted/60 mt-1.5 text-sm">Enter your credentials to continue</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="bg-surface/40 text-primary accent-primary h-4 w-4 rounded"
                    />
                    <span className="text-muted/60 text-xs">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/80 text-xs font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
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
                      Signing in...
                    </span>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="bg-border/10 h-px w-full" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-surface/60 text-muted/40 px-3 text-[11px]">
                    or continue with
                  </span>
                </div>
              </div>

              <OAuthButtons />

              <p className="text-muted/50 mt-6 text-center text-xs">
                Don&apos;t have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Create one
                </Link>
              </p>
            </AuthCard>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  )
}
