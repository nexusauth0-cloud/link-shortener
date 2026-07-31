'use client'

import { useEffect } from 'react'
import { useShell } from '../shell-context'
import { Bell, Search, Plus, Keyboard } from 'lucide-react'
import { UserMenu } from './UserMenu'
import { NotificationPanel } from './NotificationPanel'

export function Topbar() {
  const { setCommandPaletteOpen, notificationPanelOpen, setNotificationPanelOpen, setSearchOpen } =
    useShell()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setCommandPaletteOpen])

  return (
    <header className="border-border/10 bg-surface/40 sticky top-0 z-20 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-2xl">
      <button
        onClick={() => setSearchOpen(true)}
        className="bg-surface/50 text-muted/40 hover:bg-surface/80 hover:text-muted/60 flex flex-1 items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm transition-all"
      >
        <Search className="h-4 w-4" />
        <span>Search links, pages, commands...</span>
        <div className="border-border/20 bg-surface/60 text-muted/30 ml-auto flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px]">
          <Keyboard className="h-3 w-3" />K
        </div>
      </button>

      <button className="bg-primary shadow-primary/30 hover:bg-primary/90 flex h-8 items-center gap-1.5 rounded-xl px-3.5 text-xs font-medium text-white shadow-sm transition-all">
        <Plus className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Create</span>
      </button>

      <button
        onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
        className="text-muted/50 hover:bg-surface/50 hover:text-foreground relative rounded-xl p-2 transition-all"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        <span className="bg-primary ring-surface absolute right-1.5 top-1.5 h-2 w-2 rounded-full ring-2" />
      </button>
      <NotificationPanel />
      <UserMenu />
    </header>
  )
}
