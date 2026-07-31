'use client'

import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShell } from '../shell-context'
import { User, Settings, CreditCard, Key, LogOut, ChevronRight } from 'lucide-react'

export function UserMenu() {
  const { userMenuOpen, setUserMenuOpen } = useShell()

  return (
    <div className="relative">
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="from-primary to-accent hover:shadow-primary/20 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white shadow-sm transition-all hover:shadow-md"
      >
        JD
      </button>

      <AnimatePresence>
        {userMenuOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="border-border/20 bg-surface absolute right-0 top-full z-50 mt-1 w-56 overflow-hidden rounded-xl border shadow-xl shadow-black/30"
            >
              <div className="border-border/10 border-b px-4 py-3">
                <p className="text-foreground text-sm font-medium">Jane Doe</p>
                <p className="text-muted/50 text-xs">jane@company.com</p>
              </div>

              <div className="p-1.5">
                {[
                  { label: 'Profile', icon: User, href: '/app/settings' },
                  { label: 'Workspace Settings', icon: Settings, href: '/app/settings/workspace' },
                  { label: 'Billing', icon: CreditCard, href: '/app/billing' },
                  { label: 'API Keys', icon: Key, href: '/app/settings/api-keys' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setUserMenuOpen(false)}
                    className="text-muted/60 hover:bg-surface/50 hover:text-foreground flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    <ChevronRight className="text-muted/30 h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>

              <div className="border-border/10 border-t p-1.5">
                <button className="text-danger/70 hover:bg-danger/10 hover:text-danger flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
