'use client'

import { useState } from 'react'
import { AnimatedInput } from '../components/AnimatedInput'
import { motion } from 'framer-motion'
import { Save, Send, Copy, RotateCcw, Plus, ChevronDown, EyeOff, Eye } from 'lucide-react'
import { Button } from '@nexuslinks/ui'

const tags = ['marketing', 'campaign', 'product', 'social', 'email', 'partner']
const folders = ['Campaigns', 'Products', 'Social', 'Email', 'Internal']

export function CreateLinkPanel() {
  const [url, setUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [folder, setFolder] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [showUtm, setShowUtm] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="h-full overflow-y-auto px-4 py-5"
    >
      <div className="mb-5">
        <h2 className="text-foreground text-base font-semibold">Create Link</h2>
        <p className="text-muted/50 mt-0.5 text-xs">Configure your intelligent link</p>
      </div>

      <div className="space-y-4">
        <AnimatedInput
          label="Destination URL"
          id="dest-url"
          type="url"
          placeholder="https://mycompany.com/product"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <AnimatedInput
          label="Custom Alias"
          id="alias"
          placeholder="summer-sale-2026"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          hint="Leave empty for auto-generated slug"
        />

        <AnimatedInput
          label="Title"
          id="title"
          placeholder="Product Launch — Summer 2026"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label htmlFor="desc" className="text-muted/80 mb-1.5 block text-xs font-medium">
            Description
          </label>
          <textarea
            id="desc"
            rows={2}
            placeholder="Brief description of this link..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-surface/40 text-foreground placeholder:text-muted/30 ring-border/10 focus:ring-primary/20 h-20 w-full resize-none rounded-xl px-3.5 py-2.5 text-sm outline-none ring-1 transition-all duration-200 focus:ring-2"
          />
        </div>

        <div>
          <label className="text-muted/80 mb-1.5 block text-xs font-medium">Tags</label>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                  selectedTags.includes(t)
                    ? 'bg-primary/15 text-primary'
                    : 'bg-surface/40 text-muted/50 hover:bg-surface/60 hover:text-foreground'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-muted/80 mb-1.5 block text-xs font-medium">Folder</label>
          <div className="relative">
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="bg-surface/40 text-foreground ring-border/10 focus:ring-primary/20 h-10 w-full appearance-none rounded-xl px-3.5 pr-8 text-sm outline-none ring-1 transition-all focus:ring-2"
            >
              <option value="">No folder</option>
              {folders.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown className="text-muted/40 pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-muted/50 hover:text-foreground flex items-center gap-1.5 text-xs font-medium transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Advanced options
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4 overflow-hidden"
          >
            <div>
              <label className="text-muted/80 mb-1.5 block text-xs font-medium">
                Password Protection
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Set a password for this link"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-surface/40 text-foreground placeholder:text-muted/30 ring-border/10 focus:ring-primary/20 h-10 w-full rounded-xl pl-3.5 pr-10 text-sm outline-none ring-1 transition-all focus:ring-2"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted/40 absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <AnimatedInput label="Expiration Date" id="expiration" type="date" />

            <AnimatedInput label="Campaign" id="campaign" placeholder="Q3 2026 Launch" />

            <AnimatedInput
              label="Notes"
              id="notes"
              placeholder="Internal notes about this link..."
            />
          </motion.div>
        )}

        <div className="border-border/10 border-t pt-4">
          <button
            onClick={() => setShowUtm(!showUtm)}
            className="text-muted/50 hover:text-foreground flex items-center gap-1.5 text-xs font-medium transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            UTM Parameters
          </button>

          {showUtm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-3 space-y-3 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-3">
                <AnimatedInput label="Source" id="utm-source" placeholder="newsletter" />
                <AnimatedInput label="Medium" id="utm-medium" placeholder="email" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AnimatedInput label="Campaign" id="utm-campaign" placeholder="summer-launch" />
                <AnimatedInput label="Term" id="utm-term" placeholder="conversion" />
              </div>
              <AnimatedInput label="Content" id="utm-content" placeholder="hero-banner" />
              <div className="bg-surface/20 rounded-lg px-3 py-2">
                <p className="text-muted/40 text-[10px]">Generated URL</p>
                <p className="text-muted/60 mt-0.5 truncate text-xs">
                  {url ? `${url}?utm_source=...&utm_medium=...` : 'Enter a URL to preview'}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <Button size="sm" className="flex-1 justify-center gap-1.5">
          <Send className="h-3.5 w-3.5" />
          Publish
        </Button>
        <Button variant="outline" size="sm" className="flex-1 justify-center gap-1.5">
          <Save className="h-3.5 w-3.5" />
          Draft
        </Button>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-muted/50 flex-1 justify-center gap-1.5">
          <Copy className="h-3.5 w-3.5" />
          Duplicate
        </Button>
        <Button variant="ghost" size="sm" className="text-muted/50 flex-1 justify-center gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </motion.div>
  )
}
