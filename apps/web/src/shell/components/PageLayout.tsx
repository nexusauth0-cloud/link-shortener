'use client'

import { motion } from 'framer-motion'
import { cn } from '@nexuslinks/ui'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn('px-6 py-6 sm:px-8', className)}
    >
      {children}
    </motion.div>
  )
}
