import { motion } from "framer-motion"
import { Button } from "@nexuslinks/ui"
import { Card } from "@nexuslinks/ui"
import { Link, Copy, Check, QrCode } from "lucide-react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function InteractiveDemo() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  const handleShorten = async () => {
    if (!url.trim()) return
    setIsLoading(true)
    setShortUrl("")
    setCopied(false)

    await new Promise((resolve) => setTimeout(resolve, 1200))

    const slug = generateSlug()
    setShortUrl(`nexus.links/${slug}`)
    setIsLoading(false)
  }

  const handleCopy = async () => {
    if (!shortUrl) return
    try {
      await navigator.clipboard.writeText(`https://${shortUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Try it yourself
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Paste any URL and see Nexus Links in action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="relative mt-12 overflow-hidden p-6 sm:p-8" borderAnimation>
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted/40">
                    <Link className="h-4 w-4" />
                  </div>
                  <input
                    placeholder="Enter your long URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                    className="h-12 w-full rounded-xl border border-border/60 bg-surface/40 pl-11 pr-4 text-sm text-foreground placeholder:text-muted/30 backdrop-blur-sm transition-all duration-300 focus:border-primary/40 focus:bg-surface/60 focus:outline-none focus:ring-2 focus:ring-primary/15"
                  />
                </div>
              </div>
              <Button
                onClick={handleShorten}
                disabled={!url.trim() || isLoading}
                size="lg"
                className="w-full shrink-0 sm:w-auto"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Shortening...
                  </span>
                ) : (
                  "Shorten"
                )}
              </Button>
            </div>

            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 mt-6"
                >
                  <div className="h-12 animate-pulse rounded-lg bg-surface-light/40" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {shortUrl && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative z-10 mt-6"
                >
                  <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted/40">
                          Your shortened URL
                        </p>
                        <p className="mt-1 truncate text-xl font-semibold text-primary-light">
                          https://{shortUrl}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowQr(!showQr)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/40 text-muted/50 transition-all duration-200 hover:border-border-light hover:text-foreground hover:bg-surface/60"
                          aria-label="Show QR code"
                        >
                          <QrCode className="h-4 w-4" />
                        </button>
                        <Button
                          variant={copied ? "secondary" : "primary"}
                          size="md"
                          onClick={handleCopy}
                        >
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
                  </div>

                  <AnimatePresence>
                    {showQr && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 flex justify-center"
                      >
                        <div className="rounded-xl border border-border/40 bg-surface/40 p-5">
                          <svg
                            width="120"
                            height="120"
                            viewBox="0 0 120 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect width="120" height="120" rx="8" fill="white" />
                            <rect x="45" y="45" width="30" height="30" rx="2" fill="#1a1a2e" />
                            <rect x="35" y="35" width="8" height="8" rx="1" fill="#1a1a2e" />
                            <rect x="77" y="35" width="8" height="8" rx="1" fill="#1a1a2e" />
                            <rect x="35" y="77" width="8" height="8" rx="1" fill="#1a1a2e" />
                            <rect x="77" y="77" width="8" height="8" rx="1" fill="#1a1a2e" />
                            <rect x="35" y="45" width="4" height="30" rx="1" fill="#1a1a2e" />
                            <rect x="81" y="45" width="4" height="30" rx="1" fill="#1a1a2e" />
                            <rect x="45" y="35" width="30" height="4" rx="1" fill="#1a1a2e" />
                            <rect x="45" y="81" width="30" height="4" rx="1" fill="#1a1a2e" />
                            <rect x="55" y="55" width="10" height="10" rx="1" fill="#1a1a2e" />
                            <rect x="55" y="45" width="4" height="4" rx="1" fill="#1a1a2e" />
                            <rect x="45" y="55" width="4" height="4" rx="1" fill="#1a1a2e" />
                            <rect x="71" y="55" width="4" height="4" rx="1" fill="#1a1a2e" />
                            <rect x="55" y="71" width="4" height="4" rx="1" fill="#1a1a2e" />
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
