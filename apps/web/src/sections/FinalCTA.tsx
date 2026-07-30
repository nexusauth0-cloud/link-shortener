import { motion } from "framer-motion"
import { Container, Button, GlowBackground } from "@nexuslinks/ui"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <GlowBackground color="secondary" />
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-display font-bold leading-display tracking-tight text-foreground">
            Ready to simplify
            <br />
            <span className="text-gradient">your links?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-subtitle leading-subtitle text-muted">
            Join thousands of developers and teams who trust Nexus Links to manage, track, and
            optimize their links.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" className="w-full sm:w-auto">
              Get Started Free
            </Button>
            <Button variant="ghost" size="xl" className="w-full sm:w-auto">
              Talk to Sales &rarr;
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted/60">
            No credit card required &middot; Free tier included &middot; Start in 30 seconds
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
