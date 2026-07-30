'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { Button, Badge, Spinner } from '@nexuslinks/ui'
import { mockSessions, mockConnectedAccounts, mockUser } from '../mock/data'
import {
  User,
  Palette,
  Bell,
  Shield,
  Save,
  Moon,
  Sun,
  MonitorIcon,
  Globe,
  Check,
  X,
  Smartphone,
  Laptop,
  AlertTriangle,
  Key,
  Trash2,
  Eye,
  EyeOff,
} from 'lucide-react'

type SettingsTab = 'profile' | 'appearance' | 'notifications' | 'security'

const tabs: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
]

const toggleOptions = [
  { id: 'link_created', label: 'Link created', desc: 'When a new short link is created' },
  { id: 'click_milestone', label: 'Click milestones', desc: 'When a link reaches a milestone' },
  { id: 'team_invite', label: 'Team invites', desc: 'When someone joins your workspace' },
  { id: 'domain_expiry', label: 'Domain expiry', desc: '7 days before domain expires' },
  { id: 'weekly_report', label: 'Weekly report', desc: 'Weekly analytics summary' },
  { id: 'product_updates', label: 'Product updates', desc: 'New features and improvements' },
]

const themeOptions = [
  { id: 'dark', label: 'Dark', icon: Moon, desc: 'Dark mode (current)' },
  { id: 'light', label: 'Light', icon: Sun, desc: 'Coming soon' },
  { id: 'system', label: 'System', icon: MonitorIcon, desc: 'Follow system preference' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [name, setName] = useState(mockUser.name)
  const [email, setEmail] = useState(mockUser.email)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    link_created: true,
    click_milestone: true,
    team_invite: true,
    domain_expiry: true,
    weekly_report: false,
    product_updates: true,
  })
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [sessions, setSessions] = useState(mockSessions)
  const [toast, setToast] = useState<{ message: string } | null>(null)

  const showToast = (message: string) => {
    setToast({ message })
    setTimeout(() => setToast(null), 2500)
  }

  const handleSaveProfile = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      showToast('Profile saved')
      setTimeout(() => setSaved(false), 2000)
    }, 800)
  }

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return
    setPasswordChanged(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    showToast('Password updated')
    setTimeout(() => setPasswordChanged(false), 2000)
  }

  const handleEndSession = (sessionId: string) => {
    setSessions(sessions.filter((s) => s.id !== sessionId))
    showToast('Session ended')
  }

  const toggleNotification = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <PageLayout>
      <PageHeader title="Settings" description="Manage your account and preferences" />

      <div className="flex gap-8">
        <div className="hidden w-48 shrink-0 lg:block">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted/60 hover:bg-surface/30 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full max-w-md rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                      />
                    </div>
                    <div>
                      <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full max-w-md rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleSaveProfile}
                      disabled={saving}
                    >
                      {saving ? (
                        <Spinner size="sm" />
                      ) : saved ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      {saving ? 'Saving...' : saved ? 'Saved!' : 'Save changes'}
                    </Button>
                  </div>
                </div>

                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">Connected Accounts</h3>
                  <div className="space-y-3">
                    {mockConnectedAccounts.map((acct) => (
                      <div
                        key={acct.provider}
                        className="bg-surface-elevated/50 flex items-center justify-between rounded-lg px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                            <Globe className="text-primary h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-foreground text-sm font-medium">{acct.provider}</p>
                            <p className="text-muted/40 text-xs">{acct.email}</p>
                          </div>
                        </div>
                        <Badge
                          variant={acct.connected ? 'default' : 'accent'}
                          className="text-[10px]"
                        >
                          {acct.connected ? 'Connected' : 'Not connected'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-danger mb-4 text-sm font-semibold">Danger Zone</h3>
                  <p className="text-muted/40 mb-3 text-xs">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="danger" size="md" onClick={() => setShowDeleteConfirm(true)}>
                    <Trash2 className="h-4 w-4" />
                    Delete account
                  </Button>
                </div>

                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="border-danger/20 bg-danger/5 rounded-xl border p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="text-danger h-5 w-5 shrink-0" />
                        <div>
                          <p className="text-foreground text-sm font-semibold">Are you sure?</p>
                          <p className="text-muted/60 mt-1 text-xs">
                            This will permanently delete your account and all links. This cannot be
                            undone.
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                setShowDeleteConfirm(false)
                                showToast('Account deletion requested')
                              }}
                            >
                              Yes, delete my account
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowDeleteConfirm(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">Theme</h3>
                  <div className="flex gap-3">
                    {themeOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <button
                          key={option.id}
                          onClick={() => option.id !== 'light' && setTheme(option.id)}
                          className={`flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                            theme === option.id
                              ? 'border-primary/30 bg-primary/5'
                              : option.id === 'light'
                                ? 'border-border/10 bg-surface/20 cursor-not-allowed opacity-50'
                                : 'border-border/10 bg-surface/20 hover:border-border/30'
                          }`}
                          disabled={option.id === 'light'}
                        >
                          <Icon
                            className="h-6 w-6"
                            style={{ color: theme === option.id ? '#7C3AED' : undefined }}
                          />
                          <span className="text-foreground text-xs font-medium">
                            {option.label}
                          </span>
                          <span className="text-muted/30 text-[10px]">{option.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">
                    Notification Preferences
                  </h3>
                  <div className="space-y-3">
                    {toggleOptions.map((opt) => (
                      <div
                        key={opt.id}
                        className="hover:bg-surface/20 flex items-center justify-between rounded-lg px-4 py-3 transition-colors"
                      >
                        <div>
                          <p className="text-foreground text-sm">{opt.label}</p>
                          <p className="text-muted/40 text-xs">{opt.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotification(opt.id)}
                          className={`relative h-6 w-10 rounded-full transition-colors ${
                            notifications[opt.id] ? 'bg-primary' : 'bg-surface-elevated'
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                              notifications[opt.id] ? 'translate-x-[18px]' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">Change Password</h3>
                  <div className="max-w-sm space-y-4">
                    <div>
                      <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                        Current password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 pr-10 text-sm outline-none transition-all focus:ring-1"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-muted/40 hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                        New password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                      />
                    </div>
                    <div>
                      <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                        Confirm new password
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleChangePassword}
                      disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                    >
                      {passwordChanged ? (
                        <>
                          <Check className="h-4 w-4" /> Password updated
                        </>
                      ) : (
                        'Update password'
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">Active Sessions</h3>
                  <div className="space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="bg-surface-elevated/50 flex items-center justify-between rounded-lg px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-surface-elevated flex h-8 w-8 items-center justify-center rounded-lg">
                            {session.device.includes('iPhone') ||
                            session.device.includes('Mobile') ? (
                              <Smartphone className="text-muted/60 h-4 w-4" />
                            ) : (
                              <Laptop className="text-muted/60 h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-foreground text-sm">
                              {session.device}
                              {session.current && (
                                <Badge variant="default" className="ml-2 text-[10px]">
                                  Current
                                </Badge>
                              )}
                            </p>
                            <p className="text-muted/40 text-xs">
                              {session.location} · {session.ip} · {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEndSession(session.id)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface/30 rounded-xl p-6">
                  <h3 className="text-foreground mb-4 text-sm font-semibold">
                    Two-Factor Authentication
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground text-sm">2FA is not enabled</p>
                      <p className="text-muted/40 text-xs">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Key className="h-3.5 w-3.5" />
                      Enable
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-success/20 border-success/20 fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 shadow-xl"
          >
            <Check className="text-success h-4 w-4" />
            <span className="text-success text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
