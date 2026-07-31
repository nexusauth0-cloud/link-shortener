'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useShell } from '../shell-context'
import {
  Search,
  ArrowRight,
  Globe,
  Link2,
  BarChart3,
  Command,
  Clock,
  TrendingUp,
} from 'lucide-react'

const suggestedActions = [
  { id: 's1', label: 'Create new short link', icon: Link2, action: 'Create' },
  { id: 's2', label: 'View analytics', icon: BarChart3, action: 'View' },
  { id: 's3', label: 'Add custom domain', icon: Globe, action: 'Configure' },
  { id: 's4', label: 'Invite team member', icon: TrendingUp, action: 'Invite' },
]

const recentSearches = [
  { id: 'r1', label: 'summer-sale', sub: 'nexus.links/summer-sale' },
  { id: 'r2', label: 'campaign Q3', sub: 'View analytics' },
  { id: 'r3', label: 'domain settings', sub: 'Settings' },
]

export function GlobalSearch() {
  const { searchOpen, setSearchOpen } = useShell()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [searchOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSearchOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-border/20 bg-surface relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
          >
            <div className="border-border/10 flex items-center gap-3 border-b px-4">
              <Search className="text-muted/40 h-4 w-4" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search links, pages, analytics..."
                className="text-foreground placeholder:text-muted/30 h-12 flex-1 bg-transparent text-sm outline-none"
              />
              <kbd className="border-border/20 bg-surface/60 text-muted/30 hidden rounded-md border px-1.5 py-0.5 text-[10px] sm:inline">
                ESC
              </kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {!query && (
                <>
                  <div className="mb-2">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Clock className="text-muted/30 h-3 w-3" />
                      <span className="text-muted/30 text-[10px] font-medium uppercase tracking-wider">
                        Recent searches
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {recentSearches.map((item) => (
                        <button
                          key={item.id}
                          className="hover:bg-surface/50 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                        >
                          <Clock className="text-muted/30 h-4 w-4" />
                          <div className="flex-1">
                            <span className="text-foreground text-sm">{item.label}</span>
                            <span className="text-muted/40 ml-2 text-xs">{item.sub}</span>
                          </div>
                          <ArrowRight className="text-muted/30 h-3.5 w-3.5" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <Command className="text-muted/30 h-3 w-3" />
                      <span className="text-muted/30 text-[10px] font-medium uppercase tracking-wider">
                        Suggested actions
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {suggestedActions.map((action) => (
                        <button
                          key={action.id}
                          className="hover:bg-surface/50 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors"
                        >
                          <div className="bg-primary/10 flex h-7 w-7 items-center justify-center rounded-lg">
                            <action.icon className="text-primary h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1">
                            <span className="text-foreground text-sm">{action.label}</span>
                          </div>
                          <span className="text-muted/40 text-xs">{action.action}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {query && (
                <div className="px-3 py-8 text-center">
                  <Search className="text-muted/30 mx-auto mb-2 h-6 w-6" />
                  <p className="text-muted/40 text-sm">Search results for &ldquo;{query}&rdquo;</p>
                  <p className="text-muted/30 mt-1 text-xs">Press enter to search all links</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
