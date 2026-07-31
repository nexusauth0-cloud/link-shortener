'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface ShellContextValue {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebar: () => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
  notificationPanelOpen: boolean
  setNotificationPanelOpen: (v: boolean) => void
  userMenuOpen: boolean
  setUserMenuOpen: (v: boolean) => void
  workspaceSwitcherOpen: boolean
  setWorkspaceSwitcherOpen: (v: boolean) => void
  searchOpen: boolean
  setSearchOpen: (v: boolean) => void
}

const ShellContext = createContext<ShellContextValue | null>(null)

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [workspaceSwitcherOpen, setWorkspaceSwitcherOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  return (
    <ShellContext
      value={{
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        commandPaletteOpen,
        setCommandPaletteOpen,
        notificationPanelOpen,
        setNotificationPanelOpen,
        userMenuOpen,
        setUserMenuOpen,
        workspaceSwitcherOpen,
        setWorkspaceSwitcherOpen,
        searchOpen,
        setSearchOpen,
      }}
    >
      {children}
    </ShellContext>
  )
}

export function useShell() {
  const ctx = useContext(ShellContext)
  if (!ctx) throw new Error('useShell must be used within ShellProvider')
  return ctx
}
