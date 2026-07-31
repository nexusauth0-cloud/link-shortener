'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section } from '@nexuslinks/ui'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How does the free plan work?',
    a: 'The free plan gives you 1,000 links per month with basic analytics and QR codes. No credit card required. You can upgrade anytime.',
  },
  {
    q: 'Can I use my own domain?',
    a: 'Yes. Starter plan includes 1 custom domain, Pro includes 10, Business and Enterprise have unlimited custom domains.',
  },
  {
    q: 'How long do you retain analytics data?',
    a: 'Starter retains 7 days, Pro retains 90 days, Business retains 12 months, and Enterprise retains data indefinitely with custom retention policies.',
  },
  {
    q: 'Do you offer team collaboration?',
    a: 'Yes. Pro includes up to 5 team members, Business includes up to 20, and Enterprise has unlimited team members with role-based access control.',
  },
  {
    q: 'Can I integrate with my existing stack?',
    a: 'Absolutely. We offer REST APIs with SDKs for JavaScript, Python, Go, Rust, and more. We also have native integrations with Zapier, Make, and n8n.',
  },
  {
    q: 'What about data security and compliance?',
    a: 'We are SOC 2 Type II compliant, GDPR compliant, and encrypt all data at rest (AES-256) and in transit (TLS 1.3). Enterprise plans include SSO and audit logs.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,211,238,0.03),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl"
        >
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="hover:text-foreground flex w-full items-center justify-between py-4 text-left transition-colors"
              >
                <span className="text-foreground pr-4 text-sm font-medium">{faq.q}</span>
                <ChevronDown
                  className={`text-muted/50 h-4 w-4 shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-muted/60 pb-4 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
