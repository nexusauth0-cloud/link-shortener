'use client'

import { useShell } from '../shell-context'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertTriangle, Info, TrendingUp, Users, Bell } from 'lucide-react'

const notifications = [
  {
    id: 'n1',
    type: 'success',
    icon: CheckCircle2,
    title: 'Link created',
    desc: 'summer-sale is now live',
    time: '2m ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'warning',
    icon: AlertTriangle,
    title: 'Domain expiring',
    desc: 'go.mybrand.com expires in 7 days',
    time: '15m ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'analytics',
    icon: TrendingUp,
    title: 'Campaign milestone',
    desc: 'Q3 campaign reached 100K clicks',
    time: '1h ago',
    unread: false,
  },
  {
    id: 'n4',
    type: 'team',
    icon: Users,
    title: 'Team member joined',
    desc: 'Alex joined Marketing Team',
    time: '3h ago',
    unread: false,
  },
  {
    id: 'n5',
    type: 'system',
    icon: Info,
    title: 'System update',
    desc: 'New API version v2.1 available',
    time: '5h ago',
    unread: false,
  },
  {
    id: 'n6',
    type: 'analytics',
    icon: TrendingUp,
    title: 'Traffic spike detected',
    desc: 'Your links are receiving 2x traffic',
    time: '6h ago',
    unread: false,
  },
]

const typeStyles: Record<string, string> = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  analytics: 'bg-accent/10 text-accent',
  team: 'bg-primary/10 text-primary',
  system: 'bg-muted/10 text-muted/60',
}

export function NotificationPanel() {
  const { notificationPanelOpen, setNotificationPanelOpen } = useShell()

  return (
    <AnimatePresence>
      {notificationPanelOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setNotificationPanelOpen(false)} />
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="border-border/20 bg-surface absolute right-4 top-full z-50 mt-1 w-80 overflow-hidden rounded-xl border shadow-xl shadow-black/30"
          >
            <div className="border-border/10 flex items-center justify-between border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="text-foreground h-4 w-4" />
                <span className="text-foreground text-sm font-semibold">Notifications</span>
                <span className="bg-primary/15 text-primary rounded-md px-1.5 py-0.5 text-[10px] font-medium">
                  2 new
                </span>
              </div>
              <button
                onClick={() => setNotificationPanelOpen(false)}
                className="text-muted/40 hover:text-foreground rounded-lg p-1 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <button
                  key={n.id}
                  className={`hover:bg-surface/30 flex w-full gap-3 px-4 py-3 text-left transition-colors ${
                    n.unread ? 'bg-primary/[0.02]' : ''
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${typeStyles[n.type]}`}
                  >
                    <n.icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${n.unread ? 'text-foreground font-semibold' : 'text-muted/80 font-medium'}`}
                      >
                        {n.title}
                      </span>
                      {n.unread && (
                        <span className="bg-primary h-1.5 w-1.5 shrink-0 rounded-full" />
                      )}
                    </div>
                    <p className="text-muted/50 mt-0.5 truncate text-xs">{n.desc}</p>
                    <p className="text-muted/30 mt-0.5 text-[10px]">{n.time}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-border/10 border-t p-2">
              <button className="text-muted/50 hover:bg-surface/50 hover:text-foreground w-full rounded-lg py-1.5 text-center text-xs font-medium transition-colors">
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
