import { motion } from "framer-motion"
import { Container, Section, TestimonialCard } from "@nexuslinks/ui"

const testimonials = [
  {
    avatar: "SM",
    name: "Sarah Mitchell",
    role: "Head of Marketing",
    company: "ScaleUp Inc.",
    quote:
      "Nexus Links transformed how we track campaign performance. The analytics are incredibly detailed and the team collaboration features are a game-changer.",
    rating: 5,
  },
  {
    avatar: "AK",
    name: "Alex Kim",
    role: "Senior Engineer",
    company: "DevPath",
    quote:
      "The API is a dream to work with. We integrated link shortening into our platform in hours, not days. The documentation is excellent.",
    rating: 5,
  },
  {
    avatar: "JR",
    name: "Jessica Rivera",
    role: "Growth Lead",
    company: "Launchpad",
    quote:
      "Custom domains and the dashboard analytics alone are worth it. Our click-through rates increased 40% after switching to branded links.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <Section id="solutions">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title text-foreground">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted">
            See what our customers have to say about Nexus Links.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
