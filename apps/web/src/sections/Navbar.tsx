'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button, Logo, cn } from '@nexuslinks/ui'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Developers', href: '#developers' },
  { label: 'Pricing', href: '#pricing' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'glass' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted/70 hover:bg-surface hover:text-foreground rounded-lg px-4 py-2 text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/login"
            className="text-muted/70 hover:text-foreground text-sm font-medium transition-colors"
          >
            Sign in
          </a>
          <Button size="sm">Get Started</Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-muted/70 flex items-center justify-center rounded-lg p-2 md:hidden"
          aria-label={open ? 'Close' : 'Menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface/95 overflow-hidden backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-muted/70 hover:bg-surface-elevated hover:text-foreground block rounded-lg px-4 py-3 text-sm transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <hr className="my-2" />
              <a
                href="/login"
                className="text-muted/70 hover:text-foreground block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              >
                Sign in
              </a>
              <Button className="mt-2 w-full" size="sm">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
