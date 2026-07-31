'use client'

import { motion } from 'framer-motion'
import { Container, Section, Card } from '@nexuslinks/ui'

const testimonials = [
  {
    quote:
      'Nexus Links replaced three tools for us. The analytics alone saved us from paying for a separate platform. Our click-through rate increased by 34% in the first month.',
    author: 'Sarah Chen',
    role: 'Marketing Director, GrowthBox',
    avatar: 'SC',
  },
  {
    quote:
      'As a developer, the API is a dream. Clean, well-documented, and the SDKs work out of the box. We integrated the entire link management system in an afternoon.',
    author: 'Marcus Rivera',
    role: 'Senior Engineer, StackFlow',
    avatar: 'MR',
  },
  {
    quote:
      'The custom domains alone are worth it. Our branded links have 3x the engagement of generic short links. The team collaboration features are a bonus.',
    author: 'Emily Nakamura',
    role: 'Growth Lead, Crestwave',
    avatar: 'EN',
  },
  {
    quote:
      'We manage over 50,000 links across multiple campaigns. Nexus Links handles it effortlessly. The geo-targeting feature was a game-changer for our global campaigns.',
    author: 'James Okafor',
    role: 'Head of Growth, Launchpad',
    avatar: 'JO',
  },
]

export function Testimonials() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(124,58,237,0.06),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Loved by teams worldwide
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            See what our customers are saying about Nexus Links.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card variant="glass" className="h-full p-6">
                <div className="mb-4 flex items-center gap-2">
                  {[...Array(5)].map((_, s) => (
                    <svg
                      key={s}
                      className="text-accent h-3.5 w-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-muted/80 mb-6 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex items-center gap-3">
                  <div className="from-primary to-accent flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">{t.author}</p>
                    <p className="text-muted/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
