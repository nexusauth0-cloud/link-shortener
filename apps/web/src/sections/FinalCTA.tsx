'use client'

import { motion } from 'framer-motion'
import { Container, Button } from '@nexuslinks/ui'

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(34,211,238,0.06),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Ready to own your links?
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Join 25,000+ teams who trust Nexus Links for their link management. Start free, no
            credit card required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="primary" className="shadow-primary/25 shadow-lg">
              Start building for free
            </Button>
            <Button size="lg" variant="ghost">
              Talk to sales
            </Button>
          </div>
          <p className="text-muted/40 mt-5 text-xs">
            Free plan includes 1,000 links/month · No credit card required · Cancel anytime
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
