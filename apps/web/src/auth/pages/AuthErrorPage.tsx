'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AlertTriangle, RefreshCw, MessageCircle } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'
import { AuthCard } from '../components/AuthCard'

export default function AuthErrorPage() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuthCard>
          <div className="flex flex-col items-center text-center">
            <div className="bg-warning/10 mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
              <AlertTriangle className="text-warning h-7 w-7" />
            </div>
            <h2 className="text-foreground text-lg font-bold">Something went wrong</h2>
            <p className="text-muted/60 mt-2 text-sm leading-relaxed">
              We couldn&apos;t complete your request. This might be a temporary issue.
            </p>

            <div className="mt-8 flex w-full flex-col gap-3">
              <Link
                to="/login"
                className="bg-primary shadow-primary/30 hover:bg-primary/90 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </Link>
              <Link
                to="#"
                className="bg-surface/30 text-foreground hover:bg-surface/50 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
              >
                <MessageCircle className="h-4 w-4" />
                Contact support
              </Link>
            </div>
          </div>
        </AuthCard>
      </motion.div>
    </AuthLayout>
  )
}
