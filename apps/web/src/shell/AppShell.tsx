'use client'

import { Outlet } from 'react-router-dom'
import { cn } from '@nexuslinks/ui'
import { ShellProvider, useShell } from './shell-context'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { CommandPalette } from './components/CommandPalette'
import { GlobalSearch } from './components/GlobalSearch'
import { ToastProvider } from './components/ToastProvider'

function ShellInner() {
  const { sidebarCollapsed } = useShell()

  return (
    <div className="bg-bg relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.06),transparent_50%)]" />

      <Sidebar />

      <div
        className={cn('relative transition-all duration-300', sidebarCollapsed ? 'ml-16' : 'ml-56')}
      >
        <Topbar />

        <div className="relative">
          <div className="relative">
            <Outlet />
          </div>
        </div>
      </div>

      <CommandPalette />
      <GlobalSearch />
      <ToastProvider />
    </div>
  )
}

export function AppShell() {
  return (
    <ShellProvider>
      <ShellInner />
    </ShellProvider>
  )
}
