'use client'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@nexuslinks/ui'
import { useShell } from '../shell-context'
import { primaryNav, secondaryNav, footerNav, type NavItem } from '../navigation'
import { ChevronDown, PanelLeftClose, PanelLeft, Plus } from 'lucide-react'

function NavItemLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const location = useLocation()
  const [expanded, setExpanded] = useState(
    () => item.children?.some((c) => location.pathname === c.href) ?? false,
  )
  const isActive = location.pathname === item.href
  const isChildActive = item.children?.some((c) => location.pathname === c.href)

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
            collapsed && 'justify-center px-2',
            isActive || isChildActive
              ? 'bg-primary/10 text-primary'
              : 'text-muted/60 hover:bg-surface/50 hover:text-foreground',
          )}
        >
          <item.icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200',
                  expanded && 'rotate-180',
                )}
              />
            </>
          )}
          {expanded && collapsed && (
            <span className="bg-primary/30 absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {expanded && !collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-border/20 ml-3 mt-1 space-y-0.5 border-l pl-2">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    to={child.href ?? '#'}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-all duration-200',
                      location.pathname === child.href
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted/50 hover:text-foreground',
                    )}
                  >
                    <div
                      className={cn(
                        'h-1 w-1 rounded-full',
                        location.pathname === child.href ? 'bg-primary' : 'bg-muted/30',
                      )}
                    />
                    {child.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      to={item.href ?? '#'}
      className={cn(
        'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200',
        collapsed && 'justify-center px-2',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted/60 hover:bg-surface/50 hover:text-foreground',
      )}
    >
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="bg-primary absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <item.icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
      {item.badge && !collapsed && (
        <span className="bg-primary/15 text-primary rounded-md px-1.5 py-0.5 text-[10px] font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useShell()

  return (
    <>
      <aside
        className={cn(
          'border-border/10 bg-surface/40 fixed left-0 top-0 z-30 flex h-full flex-col border-r backdrop-blur-2xl transition-all duration-300',
          sidebarCollapsed ? 'w-16' : 'w-56',
        )}
      >
        <div
          className={cn(
            'border-border/10 flex h-14 items-center border-b',
            sidebarCollapsed ? 'justify-center' : 'justify-between px-4',
          )}
        >
          <Link to="/app" className="flex items-center gap-2">
            <div className="from-primary to-accent flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white">
              N
            </div>
            {!sidebarCollapsed && (
              <span className="text-foreground text-sm font-semibold">Nexus</span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button
              onClick={toggleSidebar}
              className="text-muted/40 hover:bg-surface/50 hover:text-foreground rounded-lg p-1.5 transition-colors"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          )}
        </div>

        {sidebarCollapsed && (
          <button
            onClick={toggleSidebar}
            className="text-muted/40 hover:bg-surface/50 hover:text-foreground mx-auto mt-2 rounded-lg p-1.5 transition-colors"
            aria-label="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        )}

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-0.5">
            {primaryNav.map((item) => (
              <NavItemLink key={item.id} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>

          {!sidebarCollapsed && <div className="bg-border/10 my-3 h-px" />}

          <div className="space-y-0.5">
            {secondaryNav.map((item) => (
              <NavItemLink key={item.id} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>

          {!sidebarCollapsed && <div className="bg-border/10 my-3 h-px" />}

          <div className="space-y-0.5">
            {footerNav.map((item) => (
              <NavItemLink key={item.id} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>
        </nav>

        {!sidebarCollapsed && (
          <div className="border-border/10 border-t p-3">
            <button className="from-primary/10 to-accent/10 text-muted/60 hover:from-primary/20 hover:to-accent/20 hover:text-foreground flex w-full items-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2 text-xs transition-all">
              <Plus className="h-3.5 w-3.5" />
              New link
            </button>
          </div>
        )}
      </aside>

      {sidebarCollapsed && (
        <button className="bg-primary shadow-primary/30 hover:bg-primary/90 fixed bottom-4 left-4 z-30 flex h-9 w-9 items-center justify-center rounded-xl shadow-lg transition-all">
          <Plus className="h-4 w-4 text-white" />
        </button>
      )}
    </>
  )
}
