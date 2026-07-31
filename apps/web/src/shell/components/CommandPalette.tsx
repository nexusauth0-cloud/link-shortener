'use client'

import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useShell } from '../shell-context'
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  QrCode,
  Settings,
  Users,
  Globe,
  Code2,
  CreditCard,
  Command,
  ArrowRight,
  Clock,
  Search,
} from 'lucide-react'

const pages = [
  { id: 'dashboard', label: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { id: 'links', label: 'Links', href: '/app/links', icon: Link2 },
  { id: 'analytics', label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { id: 'qr-studio', label: 'QR Studio', href: '/app/qr-studio', icon: QrCode },
  { id: 'domains', label: 'Domains', href: '/app/domains', icon: Globe },
  { id: 'api', label: 'API', href: '/app/api', icon: Code2 },
  { id: 'teams', label: 'Teams', href: '/app/teams', icon: Users },
  { id: 'billing', label: 'Billing', href: '/app/billing', icon: CreditCard },
  { id: 'settings', label: 'Settings', href: '/app/settings', icon: Settings },
]

const recentItems = [
  { id: 'r1', label: 'Link: summer-sale', sub: 'nexus.links/summer-sale', icon: Link2 },
  { id: 'r2', label: 'Campaign: Q3 Analytics', sub: 'Last viewed 2h ago', icon: BarChart3 },
  { id: 'r3', label: 'Domain: go.mybrand.com', sub: 'Last viewed yesterday', icon: Globe },
]

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useShell()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = query
    ? pages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : pages

  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [commandPaletteOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      navigate(filtered[selectedIndex].href)
      setCommandPaletteOpen(false)
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-border/20 bg-surface relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
          >
            <div className="border-border/10 flex items-center gap-3 border-b px-4">
              <Search className="text-muted/40 h-4 w-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, links, commands..."
                className="text-foreground placeholder:text-muted/30 h-12 flex-1 bg-transparent text-sm outline-none"
              />
              <kbd className="border-border/20 bg-surface/60 text-muted/30 hidden rounded-md border px-1.5 py-0.5 text-[10px] sm:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {!query && recentItems.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 px-2 py-1.5">
                    <Clock className="text-muted/30 h-3 w-3" />
                    <span className="text-muted/30 text-[10px] font-medium uppercase tracking-wider">
                      Recent
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    {recentItems.map((item) => (
                      <button
                        key={item.id}
                        className="text-muted/60 hover:bg-surface/50 hover:text-foreground flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <div className="flex-1">
                          <span className="text-foreground">{item.label}</span>
                          <span className="text-muted/40 ml-2 text-[11px]">{item.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filtered.length > 0 && (
                <div className="space-y-0.5">
                  {filtered.map((page, i) => (
                    <button
                      key={page.id}
                      onClick={() => {
                        navigate(page.href)
                        setCommandPaletteOpen(false)
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === selectedIndex
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted/60 hover:bg-surface/50 hover:text-foreground'
                      }`}
                    >
                      <page.icon className="h-4 w-4" />
                      <span className="flex-1">{page.label}</span>
                      <ArrowRight
                        className={cn(
                          'h-3.5 w-3.5 opacity-0 transition-opacity',
                          i === selectedIndex && 'opacity-100',
                        )}
                      />
                    </button>
                  ))}
                </div>
              )}

              {query && filtered.length === 0 && (
                <div className="px-3 py-8 text-center">
                  <p className="text-muted/40 text-sm">No results found</p>
                  <p className="text-muted/30 mt-1 text-xs">Try a different search term</p>
                </div>
              )}
            </div>

            <div className="border-border/10 flex items-center gap-4 border-t px-4 py-2">
              <span className="text-muted/30 flex items-center gap-1 text-[10px]">
                <Command className="h-3 w-3" />K <span className="text-muted/20">to open</span>
              </span>
              <span className="text-muted/30 flex items-center gap-1 text-[10px]">
                <span className="border-border/20 rounded border px-1 py-0.5 text-[9px]">↑↓</span>
                <span className="text-muted/20">navigate</span>
              </span>
              <span className="text-muted/30 flex items-center gap-1 text-[10px]">
                <span className="border-border/20 rounded border px-1 py-0.5 text-[9px]">↵</span>
                <span className="text-muted/20">open</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
