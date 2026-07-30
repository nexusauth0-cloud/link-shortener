'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { Button, Badge, Spinner } from '@nexuslinks/ui'
import { mockApiKeys, mockWebhooks } from '../mock/data'
import { fadeInUp, stagger } from '@nexuslinks/ui'
import {
  Key,
  Plus,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Code2,
  Terminal,
  Webhook,
  Send,
  ToggleLeft,
  ToggleRight,
  Play,
  X,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react'

const sdkTabs = [
  { id: 'curl', label: 'cURL', icon: Terminal },
  { id: 'javascript', label: 'JavaScript', icon: Code2 },
  { id: 'python', label: 'Python', icon: Code2 },
  { id: 'go', label: 'Go', icon: Code2 },
]

const sdkExamples: Record<string, string> = {
  curl: `curl -X POST https://api.nexuslinks.com/v1/links \\
  -H "Authorization: Bearer nx_sk_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "destination": "https://example.com",
    "alias": "my-link",
    "tags": ["marketing"]
  }'`,
  javascript: `import { NexusClient } from '@nexuslinks/sdk'

const client = new NexusClient({
  apiKey: 'nx_sk_...'
})

const link = await client.links.create({
  destination: 'https://example.com',
  alias: 'my-link',
})`,
  python: `from nexuslinks import NexusClient

client = NexusClient(api_key="nx_sk_...")

link = client.links.create(
    destination="https://example.com",
    alias="my-link",
    tags=["marketing"]
)`,
  go: `package main

import (
  "github.com/nexuslinks/sdk-go"
)

func main() {
  client := nexus.NewClient("nx_sk_...")
  
  link, err := client.Links.Create(&nexus.Link{
    Destination: "https://example.com",
    Alias: "my-link",
  })
}`,
}

const playgroundEndpoints = [
  { method: 'GET', path: '/v1/links', desc: 'List all links' },
  { method: 'POST', path: '/v1/links', desc: 'Create a link' },
  { method: 'GET', path: '/v1/links/:id', desc: 'Get link details' },
  { method: 'PATCH', path: '/v1/links/:id', desc: 'Update a link' },
  { method: 'DELETE', path: '/v1/links/:id', desc: 'Delete a link' },
  { method: 'GET', path: '/v1/analytics', desc: 'Get analytics' },
]

function ApiKeyCard({
  k,
  onDelete,
  onRotate,
  showKey,
  toggleShowKey,
}: {
  k: (typeof mockApiKeys)[0]
  onDelete: () => void
  onRotate: () => void
  showKey: boolean
  toggleShowKey: () => void
}) {
  const [copied, setCopied] = useState(false)
  const copyKey = () => {
    navigator.clipboard?.writeText(k.key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Key className="text-primary h-4 w-4" />
            <span className="text-foreground text-sm font-semibold">{k.name}</span>
            <Badge variant="default" className="text-[10px]">
              {k.permissions}
            </Badge>
          </div>
          <p className="text-muted/40 mt-0.5 text-xs">
            Created {k.created} &middot; Last used {k.lastUsed}
          </p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={copyKey}>
            {copied ? (
              <Check className="text-success h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={onRotate}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="text-danger h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="bg-bg/50 flex items-center gap-2 rounded-lg px-3 py-2">
        <code
          className={`flex-1 font-mono text-xs ${showKey ? 'text-foreground' : 'text-muted/20'}`}
        >
          {showKey ? k.key : k.key.slice(0, 12) + '••••••••••••••••'}
        </code>
        <button onClick={toggleShowKey} className="text-muted/40 hover:text-foreground">
          {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        </button>
      </div>
    </motion.div>
  )
}

function WebhookCard({ w, onToggle }: { w: (typeof mockWebhooks)[0]; onToggle: () => void }) {
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${
              w.status === 'active' ? 'bg-success/10' : 'bg-muted/10'
            }`}
          >
            <Webhook
              className={`h-4 w-4 ${w.status === 'active' ? 'text-success' : 'text-muted/40'}`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-sm font-semibold">{w.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  w.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted/40'
                }`}
              >
                {w.status}
              </span>
            </div>
            <code className="text-muted/40 mt-1 block text-xs">{w.url}</code>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-muted/30 text-[10px]">Events: {w.events.join(', ')}</span>
              <span className="text-muted/30 text-[10px]">Last: {w.lastTriggered}</span>
            </div>
          </div>
        </div>
        <button onClick={onToggle} className="text-muted/40 hover:text-foreground">
          {w.status === 'active' ? (
            <ToggleRight className="text-success h-5 w-5" />
          ) : (
            <ToggleLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default function DeveloperHubPage() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [webhooks, setWebhooks] = useState(mockWebhooks)
  const [activeSdkTab, setActiveSdkTab] = useState('curl')
  const [showCreateKey, setShowCreateKey] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPerms, setNewKeyPerms] = useState('Full Access')
  const [playgroundEndpoint, setPlaygroundEndpoint] = useState<
    (typeof playgroundEndpoints)[number]
  >(playgroundEndpoints[0] as (typeof playgroundEndpoints)[number])
  const [playgroundResponse, setPlaygroundResponse] = useState<string | null>(null)
  const [playgroundLoading, setPlaygroundLoading] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return
    const newKey = {
      id: `k${Date.now()}`,
      name: newKeyName,
      key: `nx_sk_${Math.random().toString(36).slice(2, 16)}`,
      created: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      lastUsed: 'Never',
      permissions: newKeyPerms,
    }
    setApiKeys([newKey, ...apiKeys])
    setNewKeyName('')
    setShowCreateKey(false)
    showToast('API key created successfully')
  }

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
    showToast('API key deleted')
  }

  const handleRotateKey = (id: string) => {
    setApiKeys(
      apiKeys.map((k) =>
        k.id === id
          ? { ...k, key: `nx_sk_${Math.random().toString(36).slice(2, 16)}`, lastUsed: 'Just now' }
          : k,
      ),
    )
    showToast('API key rotated')
  }

  const handleToggleWebhook = (id: string) => {
    setWebhooks(
      webhooks.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'active' ? ('inactive' as const) : ('active' as const) }
          : w,
      ),
    )
  }

  const handlePlayground = () => {
    setPlaygroundLoading(true)
    setPlaygroundResponse(null)
    setTimeout(() => {
      setPlaygroundResponse(
        JSON.stringify(
          {
            success: true,
            data: {
              id: 'link_' + Math.random().toString(36).slice(2, 10),
              destination: 'https://example.com',
              alias: 'my-link',
              clicks: 0,
              createdAt: new Date().toISOString(),
            },
          },
          null,
          2,
        ),
      )
      setPlaygroundLoading(false)
    }, 800)
  }

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <PageLayout>
      <PageHeader title="Developer Hub" description="Manage API keys, webhooks, and integrations" />

      <div className="mb-8">
        <div className="border-border/10 flex items-center gap-2 border-b">
          {sdkTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSdkTab(tab.id)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium transition-all ${
                  activeSdkTab === tab.id
                    ? 'border-primary text-primary'
                    : 'text-muted/50 hover:text-foreground border-transparent'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            )
          })}
        </div>
        <div className="bg-surface/30 relative mt-2 overflow-hidden rounded-xl">
          <pre className="text-muted/80 overflow-x-auto p-4 text-xs leading-relaxed">
            <code>{sdkExamples[activeSdkTab]}</code>
          </pre>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(sdkExamples[activeSdkTab]!)
              showToast('Copied to clipboard')
            }}
            className="text-muted/40 hover:bg-surface/50 hover:text-foreground absolute right-2 top-2 rounded-lg p-1.5 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="text-primary h-4 w-4" />
              <h2 className="text-foreground text-sm font-semibold">API Keys</h2>
              <Badge variant="default" className="text-[10px]">
                {apiKeys.length} keys
              </Badge>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowCreateKey(true)}>
              <Plus className="h-3.5 w-3.5" />
              Create key
            </Button>
          </div>
          <div className="space-y-3">
            {apiKeys.map((k) => (
              <ApiKeyCard
                key={k.id}
                k={k}
                onDelete={() => handleDeleteKey(k.id)}
                onRotate={() => handleRotateKey(k.id)}
                showKey={visibleKeys[k.id] ?? false}
                toggleShowKey={() => toggleKeyVisibility(k.id)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Webhook className="text-accent h-4 w-4" />
              <h2 className="text-foreground text-sm font-semibold">Webhooks</h2>
              <Badge variant="default" className="text-[10px]">
                {webhooks.length} endpoints
              </Badge>
            </div>
            <Button variant="secondary" size="sm">
              <Plus className="h-3.5 w-3.5" />
              Add webhook
            </Button>
          </div>
          <div className="space-y-3">
            {webhooks.map((w) => (
              <WebhookCard key={w.id} w={w} onToggle={() => handleToggleWebhook(w.id)} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Play className="text-success h-4 w-4" />
            <h2 className="text-foreground text-sm font-semibold">API Playground</h2>
          </div>
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {playgroundEndpoints.map((ep) => (
                <button
                  key={ep.path}
                  onClick={() => {
                    setPlaygroundEndpoint(ep)
                    setPlaygroundResponse(null)
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-all ${
                    playgroundEndpoint.path === ep.path
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted/50 hover:bg-surface/20 hover:text-foreground'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      ep.method === 'GET'
                        ? 'text-success'
                        : ep.method === 'POST'
                          ? 'text-accent'
                          : ep.method === 'DELETE'
                            ? 'text-danger'
                            : 'text-warning'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-mono">{ep.path}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handlePlayground}
                disabled={playgroundLoading}
              >
                {playgroundLoading ? <Spinner size="sm" /> : <Send className="h-3.5 w-3.5" />}
                Send request
              </Button>
              <span className="text-muted/40 text-xs">{playgroundEndpoint.desc}</span>
            </div>
            {playgroundResponse && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 overflow-hidden"
              >
                <pre className="bg-surface-elevated text-success/80 overflow-x-auto rounded-lg p-3 text-xs leading-relaxed">
                  {playgroundResponse}
                </pre>
              </motion.div>
            )}
            {playgroundLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface-elevated mt-3 flex items-center gap-2 rounded-lg p-3"
              >
                <Spinner size="sm" />
                <span className="text-muted/40 text-xs">Sending request...</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showCreateKey && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !showCreateKey && setShowCreateKey(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="border-border bg-surface w-full max-w-md rounded-xl border p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Create API Key</h3>
                <button
                  onClick={() => setShowCreateKey(false)}
                  className="text-muted/40 hover:text-foreground rounded-lg p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">Key name</label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Production Key"
                    className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                    Permissions
                  </label>
                  <div className="flex gap-2">
                    {['Full Access', 'Read Only', 'Links Only'].map((perm) => (
                      <button
                        key={perm}
                        onClick={() => setNewKeyPerms(perm)}
                        className={`rounded-lg px-3 py-2 text-xs transition-all ${
                          newKeyPerms === perm
                            ? 'bg-primary text-white'
                            : 'bg-surface-elevated text-muted/50 hover:text-foreground'
                        }`}
                      >
                        {perm}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    onClick={() => setShowCreateKey(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="md" className="flex-1" onClick={handleCreateKey}>
                    Create key
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
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-xl ${
              toast.type === 'success'
                ? 'bg-success/20 text-success border-success/20 border'
                : 'bg-danger/20 text-danger border-danger/20 border'
            }`}
          >
            {toast.type === 'success' ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}
