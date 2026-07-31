'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Copy, Check, QrCode, BarChart3, Share2 } from 'lucide-react'
import { Button, Card } from '@nexuslinks/ui'

function genSlug(): string {
  const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 6 }, () => c[Math.floor(Math.random() * c.length)]).join('')
}

export function UrlDemo() {
  const [url, setUrl] = useState('')
  const [short, setShort] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const handleShorten = async () => {
    if (!url.trim()) return
    setLoading(true)
    setShort('')
    setCopied(false)
    await new Promise((r) => setTimeout(r, 1000))
    setShort(`nexus.links/${genSlug()}`)
    setLoading(false)
  }

  const copy = async () => {
    if (!short) return
    try {
      await navigator.clipboard.writeText(`https://${short}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Clipboard write failed:', e)
    }
  }

  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-display leading-display text-foreground font-bold tracking-tight">
            Try it now
          </h2>
          <p className="text-muted/60 mt-3 text-lg">Paste any URL and see Nexus Links in action.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="glass" className="relative mt-12 overflow-hidden p-5 sm:p-6">
            <div className="relative z-10 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="text-muted/40 pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Link className="h-4 w-4" />
                </div>
                <input
                  placeholder="Enter your long URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                  className="bg-surface/40 text-foreground placeholder:text-muted/30 focus:bg-surface/60 focus:ring-primary/15 h-11 w-full rounded-xl pl-11 pr-4 text-sm backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2"
                />
              </div>
              <Button
                onClick={handleShorten}
                disabled={!url.trim() || loading}
                size="lg"
                className="w-full sm:w-auto"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Shorten'
                )}
              </Button>
            </div>

            <AnimatePresence>
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 mt-4"
                >
                  <div className="bg-surface-light/30 h-10 animate-pulse rounded-xl" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {short && !loading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 mt-4"
                >
                  <div className="border-primary/20 from-primary/10 to-primary/5 rounded-xl border bg-gradient-to-br p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-muted/40 text-xs font-medium uppercase tracking-wider">
                          Your shortened URL
                        </p>
                        <p className="text-primary mt-0.5 truncate text-lg font-semibold">
                          https://{short}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setShowQr(!showQr)}
                          className="text-muted/50 hover:text-foreground hover:bg-surface/60 flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                          aria-label="QR code"
                        >
                          <QrCode className="h-4 w-4" />
                        </button>
                        <button
                          className="text-muted/50 hover:text-foreground hover:bg-surface/60 flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
                          aria-label="Share"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <Button variant={copied ? 'secondary' : 'primary'} size="sm" onClick={copy}>
                          {copied ? (
                            <span className="flex items-center gap-1.5">
                              <Check className="h-4 w-4" />
                              Copied
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <Copy className="h-4 w-4" />
                              Copy
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 pt-3">
                      <button className="text-muted/40 hover:text-muted/70 flex items-center gap-1.5 text-xs transition-colors">
                        <BarChart3 className="h-3.5 w-3.5" />
                        View Analytics
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showQr && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 flex justify-center"
                      >
                        <div className="bg-surface/40 rounded-xl p-4">
                          <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
                            <rect width="96" height="96" rx="6" fill="white" />
                            <rect x="36" y="36" width="24" height="24" rx="2" fill="#1a1a2e" />
                            <rect x="28" y="28" width="6" height="6" rx="1" fill="#1a1a2e" />
                            <rect x="62" y="28" width="6" height="6" rx="1" fill="#1a1a2e" />
                            <rect x="28" y="62" width="6" height="6" rx="1" fill="#1a1a2e" />
                            <rect x="62" y="62" width="6" height="6" rx="1" fill="#1a1a2e" />
                            <rect x="28" y="36" width="3" height="24" rx="1" fill="#1a1a2e" />
                            <rect x="65" y="36" width="3" height="24" rx="1" fill="#1a1a2e" />
                            <rect x="36" y="28" width="24" height="3" rx="1" fill="#1a1a2e" />
                            <rect x="36" y="65" width="24" height="3" rx="1" fill="#1a1a2e" />
                            <rect x="44" y="44" width="8" height="8" rx="1" fill="#1a1a2e" />
                            <rect x="44" y="36" width="3" height="3" rx="1" fill="#1a1a2e" />
                            <rect x="36" y="44" width="3" height="3" rx="1" fill="#1a1a2e" />
                            <rect x="57" y="44" width="3" height="3" rx="1" fill="#1a1a2e" />
                            <rect x="44" y="57" width="3" height="3" rx="1" fill="#1a1a2e" />
                          </svg>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
