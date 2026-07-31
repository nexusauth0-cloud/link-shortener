'use client'

import { cn } from '@nexuslinks/ui'
import { BarChart3, Link2, ExternalLink, QrCode } from 'lucide-react'

interface LinkPreviewCardProps {
  shortUrl?: string
  destination?: string
  title?: string
  description?: string
  clicks?: number
  className?: string
}

export function LinkPreviewCard({
  shortUrl = 'nexus.links/abc123',
  destination = 'https://mycompany.com/product/launch',
  title = 'Product Launch — Summer 2026',
  description = 'Check out our latest product launch with exclusive early-bird pricing.',
  clicks = 0,
  className,
}: LinkPreviewCardProps) {
  return (
    <div
      className={cn('border-border/10 bg-surface/30 overflow-hidden rounded-xl border', className)}
    >
      <div className="border-border/10 bg-surface/20 flex items-center gap-2 border-b px-3 py-2">
        <Link2 className="text-primary h-3.5 w-3.5" />
        <span className="text-primary flex-1 truncate text-xs font-medium">{shortUrl}</span>
        <ExternalLink className="text-muted/30 h-3 w-3" />
      </div>
      <div className="p-3">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted/50 mt-0.5 text-xs">{description}</p>
        <p className="text-muted/40 mt-1 truncate text-[10px]">{destination}</p>
      </div>
      <div className="border-border/10 bg-surface/20 flex items-center gap-3 border-t px-3 py-2">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="text-muted/40 h-3 w-3" />
          <span className="text-muted/50 text-xs">{clicks.toLocaleString()} clicks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <QrCode className="text-muted/40 h-3 w-3" />
          <span className="text-muted/50 text-xs">QR</span>
        </div>
      </div>
    </div>
  )
}
