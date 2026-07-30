import { motion } from "framer-motion"
import { Container, Button, GlowBackground } from "@nexuslinks/ui"

const trustBadges = [
  { label: "Trusted by 10,000+ developers" },
  { label: "99.9% uptime SLA" },
  { label: "GDPR compliant" },
  { label: "Open source" },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden pt-20 sm:pt-24 lg:pt-28">
      <GlowBackground color="primary" variant="blob" />

      <Container className="relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary-light">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Now in public beta
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-hero font-bold leading-hero tracking-tight text-foreground"
          >
            Shorten links.
            <br />
            <span className="text-gradient">Measure everything.</span>
            <br />
            Scale your reach.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-subtitle leading-subtitle text-muted"
          >
            Fast, reliable link management with real-time analytics, custom domains, and team
            collaboration. Built for modern developers and marketers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="xl" className="w-full sm:w-auto">
              Get Started Free
            </Button>
            <Button variant="secondary" size="xl" className="w-full sm:w-auto">
              View Documentation
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-4 text-sm text-muted/60"
          >
            No credit card required &middot; Free tier included &middot; Start in 30 seconds
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-sm text-muted/60"
              >
                <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {badge.label}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
