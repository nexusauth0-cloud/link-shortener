'use client'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { AuthLayout } from '../components/AuthLayout'

export default function AuthSuccessPage() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="mb-6">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <motion.circle
              cx="40"
              cy="40"
              r="36"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="opacity-20"
            />
            <motion.path
              d="M28 40l8 8 16-16"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h1 className="text-foreground text-2xl font-bold">All set!</h1>
          <p className="text-muted/60 mt-3 text-sm leading-relaxed">
            Your account has been successfully set up.
            <br />
            You&apos;re ready to start managing your links.
          </p>

          <Link
            to="/app"
            className="bg-primary shadow-primary/25 hover:bg-primary/90 mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white shadow-lg transition-all"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  )
}
