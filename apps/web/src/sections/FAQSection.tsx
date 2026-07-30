import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Container, Section } from "@nexuslinks/ui"
import { cn } from "@nexuslinks/ui"

const faqs = [
  {
    q: "What is Nexus Links?",
    a: "Nexus Links is a modern link management platform that lets you create, track, and optimize short links. With real-time analytics, custom domains, and team collaboration, it's built for developers and marketers who need reliable link infrastructure.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes! Our free plan includes 1,000 links and 10,000 clicks per month with basic analytics. No credit card required to get started.",
  },
  {
    q: "Can I use my own domain?",
    a: "Absolutely. Custom domains are available on our Pro plan and above. You can use your own domain for branded short links, increasing trust and click-through rates.",
  },
  {
    q: "How does the API work?",
    a: "Our REST API allows you to create, manage, and track links programmatically. We provide SDKs for popular languages and detailed documentation to help you integrate quickly.",
  },
  {
    q: "Is Nexus Links secure?",
    a: "Yes. We use encryption at rest and in transit, offer password-protected links, link expiration, and are SOC 2 compliant. Enterprise plans include SSO and audit logs.",
  },
  {
    q: "Can I migrate from another service?",
    a: "Yes, we provide tools and documentation to help you migrate your existing links from other platforms. Our support team can assist with bulk migrations.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-title font-bold leading-title tracking-tight text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-subtitle leading-subtitle text-muted/70">
            Everything you need to know about Nexus Links.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div
                className={cn(
                  "border-b border-border/30 transition-colors duration-300",
                  openIndex === i && "border-border/60",
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={cn(
                    "flex w-full items-center justify-between py-5 text-left transition-all duration-300",
                    openIndex === i ? "text-foreground" : "text-muted/70 hover:text-foreground",
                  )}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-base font-medium">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      openIndex === i && "rotate-180 text-primary",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key={`answer-${i}`}
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-muted/70">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
