'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@nexuslinks/ui'
import { useShell } from '../shell-context'
import { Check, ChevronDown, Plus, Building2, Users, Workflow, Sparkles } from 'lucide-react'

const workspaces = [
  { id: 'personal', label: 'Personal Workspace', icon: Building2, members: 1 },
  { id: 'marketing', label: 'Marketing Team', icon: Users, members: 8 },
  { id: 'dev', label: 'Development', icon: Workflow, members: 12 },
  { id: 'enterprise', label: 'Enterprise', icon: Sparkles, members: 24 },
]

export function WorkspaceSwitcher() {
  const { workspaceSwitcherOpen, setWorkspaceSwitcherOpen } = useShell()
  const [active, setActive] = useState<(typeof workspaces)[number]>(workspaces[0]!)

  return (
    <div className="relative">
      <button
        onClick={() => setWorkspaceSwitcherOpen(!workspaceSwitcherOpen)}
        className="hover:bg-surface/50 flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all"
      >
        <div className="from-primary to-accent flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white">
          {active.label[0]}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-foreground truncate text-sm font-medium">{active.label}</p>
          <p className="text-muted/40 text-[10px]">{active.members} members</p>
        </div>
        <ChevronDown className="text-muted/40 h-3.5 w-3.5" />
      </button>

      <AnimatePresence>
        {workspaceSwitcherOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-border/20 bg-surface absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border shadow-xl shadow-black/30"
          >
            <div className="p-1.5">
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActive(ws)
                    setWorkspaceSwitcherOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-colors',
                    active.id === ws.id ? 'bg-primary/10' : 'hover:bg-surface/50',
                  )}
                >
                  <div className="from-primary to-accent flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white">
                    {ws.label[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm font-medium">{ws.label}</p>
                    <p className="text-muted/40 text-[10px]">{ws.members} members</p>
                  </div>
                  {active.id === ws.id && <Check className="text-primary h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
            <div className="border-border/10 border-t p-1.5">
              <button className="text-muted/50 hover:bg-surface/50 hover:text-foreground flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors">
                <Plus className="h-4 w-4" />
                Create workspace
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
