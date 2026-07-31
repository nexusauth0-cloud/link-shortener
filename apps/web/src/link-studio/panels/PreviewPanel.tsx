'use client'

import { motion } from 'framer-motion'
import { CopyButton } from '../components/CopyButton'
import { ShareButton } from '../components/ShareButton'
import { LinkPreviewCard } from '../components/LinkPreviewCard'
import { Smartphone, Monitor, Globe, ExternalLink, Download, QrCode } from 'lucide-react'

export function PreviewPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex h-full flex-col overflow-y-auto px-4 py-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-base font-semibold">Live Preview</h2>
          <p className="text-muted/50 mt-0.5 text-xs">Updates in real-time</p>
        </div>
        <div className="flex items-center gap-1.5">
          <CopyButton text="https://nexus.links/abc123" />
          <ShareButton url="https://nexus.links/abc123" />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <div className="border-border/10 bg-surface/20 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm font-medium">Short URL</span>
            </div>
            <ExternalLink className="text-muted/30 h-3.5 w-3.5" />
          </div>
          <p className="text-primary mt-2 text-lg font-semibold tracking-tight">
            nexus.links/abc123
          </p>
          <p className="text-muted/50 mt-0.5 text-xs">https://nexus.links/abc123</p>
        </div>

        <div className="border-border/10 bg-surface/20 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <QrCode className="text-primary h-4 w-4" />
              <span className="text-foreground text-sm font-medium">QR Code</span>
            </div>
            <button className="text-muted/50 hover:text-foreground flex items-center gap-1 text-xs font-medium transition-colors">
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
          <div className="mt-3 flex justify-center">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <rect width="120" height="120" rx="8" fill="white" />
              <rect x="30" y="30" width="60" height="60" rx="4" fill="#1a1a2e" />
              <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#1a1a2e" />
              <rect x="92" y="20" width="8" height="8" rx="1.5" fill="#1a1a2e" />
              <rect x="20" y="92" width="8" height="8" rx="1.5" fill="#1a1a2e" />
              <rect x="92" y="92" width="8" height="8" rx="1.5" fill="#1a1a2e" />
              <rect x="20" y="30" width="5" height="60" rx="1.5" fill="#1a1a2e" />
              <rect x="95" y="30" width="5" height="60" rx="1.5" fill="#1a1a2e" />
              <rect x="30" y="20" width="60" height="5" rx="1.5" fill="#1a1a2e" />
              <rect x="30" y="95" width="60" height="5" rx="1.5" fill="#1a1a2e" />
              <rect x="50" y="50" width="20" height="20" rx="3" fill="#1a1a2e" />
              <rect x="50" y="30" width="5" height="8" rx="1" fill="#1a1a2e" />
              <rect x="30" y="50" width="8" height="5" rx="1" fill="#1a1a2e" />
              <rect x="82" y="50" width="8" height="5" rx="1" fill="#1a1a2e" />
              <rect x="50" y="82" width="5" height="8" rx="1" fill="#1a1a2e" />
            </svg>
          </div>
        </div>

        <LinkPreviewCard />

        <div className="border-border/10 bg-surface/20 rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <Smartphone className="text-primary h-4 w-4" />
            <span className="text-foreground text-sm font-medium">Mobile Preview</span>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="border-border/20 bg-bg w-[200px] overflow-hidden rounded-2xl border-2">
              <div className="border-border/10 bg-surface/30 border-b px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="bg-danger/50 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-warning/50 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-success/50 h-1.5 w-1.5 rounded-full" />
                  </div>
                  <div className="bg-surface/50 h-3 flex-1 rounded" />
                </div>
              </div>
              <div className="p-3">
                <div className="mb-2 flex items-center gap-2">
                  <div className="bg-primary/20 h-4 w-4 rounded" />
                  <div className="bg-surface/40 h-3 flex-1 rounded" />
                </div>
                <div className="bg-foreground/10 mb-1.5 h-3 w-3/4 rounded" />
                <div className="bg-surface/30 mb-3 h-2 w-full rounded" />
                <div className="bg-surface/30 mb-2 h-2 w-5/6 rounded" />
                <div className="bg-primary/10 flex items-center justify-center rounded-lg py-2">
                  <div className="bg-primary/30 h-3 w-16 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-border/10 bg-surface/20 rounded-xl border p-4">
          <div className="flex items-center gap-2">
            <Monitor className="text-primary h-4 w-4" />
            <span className="text-foreground text-sm font-medium">Social Preview</span>
          </div>
          <div className="border-border/10 mt-3 overflow-hidden rounded-xl border">
            <div className="from-primary/20 to-accent/20 aspect-[2/1] bg-gradient-to-br" />
            <div className="p-3">
              <p className="text-foreground text-xs font-semibold">Product Launch — Summer 2026</p>
              <p className="text-muted/50 mt-0.5 text-[10px]">
                Check out our latest product launch with exclusive early-bird pricing...
              </p>
              <p className="text-muted/30 mt-1 text-[10px]">nexus.links/abc123</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
