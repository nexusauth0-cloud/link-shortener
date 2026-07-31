'use client'

import { useState } from 'react'
import { cn } from '@nexuslinks/ui'
import { Share2, Check } from 'lucide-react'

interface ShareButtonProps {
  url: string
  className?: string
}

export function ShareButton({ url, className }: ShareButtonProps) {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url })
        setShared(true)
        setTimeout(() => setShared(false), 1500)
      } catch {
        /* user dismissed share dialog */
      }
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 1500)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={cn(
        'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all',
        shared
          ? 'bg-success/10 text-success'
          : 'bg-surface/50 text-muted/60 hover:bg-surface/80 hover:text-foreground',
        className,
      )}
      aria-label={shared ? 'Shared' : 'Share link'}
    >
      {shared ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
      {shared ? 'Shared' : 'Share'}
    </button>
  )
}
