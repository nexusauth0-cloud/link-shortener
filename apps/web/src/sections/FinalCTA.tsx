import { motion } from "framer-motion"
import { Container, Button, Section, GlowBackground } from "@nexuslinks/ui"

export function FinalCTA() {
  return (
    <Section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <GlowBackground color="primary" variant="blob" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-display font-bold leading-display tracking-tight text-foreground">
            Ready to simplify
            <br />
            <span className="text-gradient">your links?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted/70">
            Join thousands of developers and teams who trust Nexus Links to manage, track, and
            optimize their links.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xxl" className="w-full sm:w-auto">
              Get Started Free
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
            <Button variant="ghost" size="xxl" className="w-full sm:w-auto">
              Talk to Sales &rarr;
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted/40">
            No credit card required &middot; Free tier included &middot; Start in 30 seconds
          </p>
        </motion.div>
      </Container>
    </Section>
  )
}
