'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { Button, Badge, Avatar } from '@nexuslinks/ui'
import { mockTeamMembers, mockActivity } from '../mock/data'
import { fadeInUp, stagger } from '@nexuslinks/ui'
import {
  Users,
  Mail,
  Shield,
  ShieldCheck,
  Eye,
  UserPlus,
  X,
  Activity,
  Clock,
  Building2,
  Check,
  ChevronDown,
} from 'lucide-react'

const roleOptions = ['Admin', 'Editor', 'Viewer'] as const

function MemberRow({
  member,
  onRoleChange,
  onRemove,
}: {
  member: {
    id: string
    name: string
    email: string
    role: string
    avatar: string
    status: string
    joined: string
  }
  onRoleChange: (role: string) => void
  onRemove: () => void
}) {
  const [showRoleMenu, setShowRoleMenu] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      className="hover:bg-surface/20 group flex items-center gap-4 rounded-xl px-4 py-3 transition-colors"
    >
      <Avatar initials={member.avatar} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-foreground text-sm font-medium">{member.name}</p>
        <p className="text-muted/40 text-xs">{member.email}</p>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowRoleMenu(!showRoleMenu)}
          className="text-muted/60 hover:bg-surface/30 hover:text-foreground flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
        >
          {member.role === 'Admin' ? (
            <ShieldCheck className="text-primary h-3 w-3" />
          ) : member.role === 'Editor' ? (
            <Shield className="text-accent h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
          {member.role}
          <ChevronDown className="h-3 w-3" />
        </button>
        <AnimatePresence>
          {showRoleMenu && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="border-border bg-surface absolute right-0 top-full z-10 mt-1 w-32 overflow-hidden rounded-lg border shadow-lg"
            >
              {roleOptions.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    onRoleChange(role)
                    setShowRoleMenu(false)
                  }}
                  className={`hover:bg-surface/30 flex w-full items-center gap-2 px-3 py-2 text-xs transition-colors ${
                    member.role === role ? 'text-primary' : 'text-muted/60'
                  }`}
                >
                  {member.role === role && <Check className="h-3 w-3" />}
                  {role}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
          member.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
        }`}
      >
        {member.status}
      </span>
      {member.status === 'pending' && (
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </motion.div>
  )
}

export default function WorkspacePage() {
  const [members, setMembers] = useState([...mockTeamMembers] as {
    id: string
    name: string
    email: string
    role: string
    avatar: string
    status: string
    joined: string
  }[])
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<(typeof roleOptions)[number]>('Viewer')
  const [toast, setToast] = useState<{ message: string } | null>(null)

  const showToast = (message: string) => {
    setToast({ message })
    setTimeout(() => setToast(null), 2500)
  }

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    const newMember = {
      id: `m${Date.now()}`,
      name: inviteEmail.split('@')[0] ?? 'Unknown',
      email: inviteEmail,
      role: inviteRole,
      avatar: inviteEmail.slice(0, 2).toUpperCase(),
      status: 'pending',
      joined: '—',
    }
    setMembers([...members, newMember])
    setInviteEmail('')
    setShowInvite(false)
    showToast(`Invitation sent to ${inviteEmail}`)
  }

  const handleRoleChange = (memberId: string, newRole: string) => {
    setMembers(members.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)))
    showToast('Role updated')
  }

  const handleRemove = (memberId: string) => {
    setMembers(members.filter((m) => m.id !== memberId))
    showToast('Member removed')
  }

  return (
    <PageLayout>
      <PageHeader title="Workspace" description="Manage your team and workspace settings" />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Users className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Team Members</p>
                <p className="text-foreground text-xl font-bold">
                  {members.filter((m) => m.status === 'active').length}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Building2 className="text-accent h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Workspace</p>
                <p className="text-foreground text-xl font-bold">Acme Corp</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-warning/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Clock className="text-warning h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Pending invites</p>
                <p className="text-foreground text-xl font-bold">
                  {members.filter((m) => m.status === 'pending').length}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="text-primary h-4 w-4" />
              <h2 className="text-foreground text-sm font-semibold">Members</h2>
              <Badge variant="default" className="text-[10px]">
                {members.length}
              </Badge>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowInvite(true)}>
              <UserPlus className="h-3.5 w-3.5" />
              Invite member
            </Button>
          </div>
          <div className="divide-border/5 divide-y">
            {members.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onRoleChange={(role) => handleRoleChange(member.id, role)}
                onRemove={() => handleRemove(member.id)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="text-accent h-4 w-4" />
            <h2 className="text-foreground text-sm font-semibold">Recent Activity</h2>
          </div>
          <div className="space-y-2">
            {mockActivity.map((a) => (
              <div
                key={a.id}
                className="hover:bg-surface/20 flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors"
              >
                <div className="bg-surface-elevated flex h-6 w-6 items-center justify-center rounded-full">
                  <span className="text-muted/50 text-[9px] font-medium">
                    {a.user
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <span className="text-muted/80">
                  <span className="text-foreground font-medium">{a.user}</span> {a.action}{' '}
                  <span className="text-primary/80 font-medium">{a.target}</span>
                </span>
                <span className="text-muted/40 ml-auto">{a.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showInvite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !showInvite && setShowInvite(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="border-border bg-surface w-full max-w-md rounded-xl border p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Invite member</h3>
                <button
                  onClick={() => setShowInvite(false)}
                  className="text-muted/40 hover:text-foreground rounded-lg p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">Role</label>
                  <div className="flex gap-2">
                    {roleOptions.map((role) => (
                      <button
                        key={role}
                        onClick={() => setInviteRole(role)}
                        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs transition-all ${
                          inviteRole === role
                            ? 'bg-primary text-white'
                            : 'bg-surface-elevated text-muted/50 hover:text-foreground'
                        }`}
                      >
                        {role === 'Admin' ? (
                          <ShieldCheck className="h-3 w-3" />
                        ) : role === 'Editor' ? (
                          <Shield className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={() => setShowInvite(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" className="flex-1" onClick={handleInvite}>
                    <Mail className="h-4 w-4" />
                    Send invite
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
