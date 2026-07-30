import { motion } from "framer-motion"
import { Container, AnimatedCounter } from "@nexuslinks/ui"

const stats = [
  { end: 25000000, suffix: "+", label: "Links created" },
  { end: 1500000000, suffix: "+", label: "Total clicks" },
  { end: 50000, suffix: "+", label: "Developers" },
  { end: 190, suffix: "", label: "Countries reached" },
]

export function StatsSection() {
  return (
    <section className="relative border-y border-border/20 py-24">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
