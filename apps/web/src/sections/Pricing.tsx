'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Badge, Card } from '@nexuslinks/ui'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    desc: 'For individuals and side projects.',
    price: { monthly: 9, annually: 7 },
    highlights: [
      '5,000 links/mo',
      '1 custom domain',
      'Basic analytics',
      'QR codes',
      '7-day history',
    ],
  },
  {
    name: 'Pro',
    desc: 'For professionals and growing businesses.',
    price: { monthly: 29, annually: 24 },
    highlights: [
      '50,000 links/mo',
      '10 custom domains',
      'Advanced analytics',
      'Team up to 5',
      'API access',
      'UTM builder',
    ],
    popular: true,
  },
  {
    name: 'Business',
    desc: 'For teams with advanced needs.',
    price: { monthly: 79, annually: 66 },
    highlights: [
      '250,000 links/mo',
      'Unlimited domains',
      'Real-time analytics',
      'Team up to 20',
      'SSO & SAML',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    desc: 'For large organizations.',
    price: { monthly: 249, annually: 207 },
    highlights: [
      'Unlimited links',
      'Dedicated infra',
      'Custom integrations',
      'Unlimited team',
      'SLA guarantee',
      'Dedicated support',
    ],
  },
]

export function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <Section id="pricing" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.06),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Start free, scale as you grow. No hidden fees.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <span className={`text-sm ${!annual ? 'text-foreground' : 'text-muted/50'}`}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="bg-surface hover:bg-surface/80 relative h-6 w-11 rounded-full transition-colors"
            >
              <motion.div
                className="bg-primary shadow-primary/30 absolute left-0.5 top-0.5 h-5 w-5 rounded-full shadow-sm"
                animate={{ x: annual ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm ${annual ? 'text-foreground' : 'text-muted/50'}`}>
              Annually
              <span className="bg-success/15 text-success ml-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium">
                Save 20%
              </span>
            </span>
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <Card
                variant={plan.popular ? 'glass' : 'default'}
                hover={false}
                className={`h-full p-6 ${plan.popular ? 'border-primary/40 ring-primary/20 ring-1' : ''}`}
              >
                {plan.popular && (
                  <Badge
                    variant="primary"
                    className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px]"
                  >
                    Most Popular
                  </Badge>
                )}
                <div className="mb-4">
                  <h3 className="text-foreground text-base font-semibold">{plan.name}</h3>
                  <p className="text-muted/60 mt-1 text-xs">{plan.desc}</p>
                </div>
                <div className="mb-5">
                  <span className="text-foreground text-3xl font-bold tracking-tight">
                    ${annual ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-muted/50 ml-1 text-sm">/mo</span>
                </div>
                <button
                  className={`mb-5 w-full rounded-lg py-2.5 text-sm font-medium transition-all ${
                    plan.popular
                      ? 'bg-primary shadow-primary/30 hover:bg-primary/90 text-white shadow-sm'
                      : 'bg-surface/30 text-foreground hover:bg-surface/50'
                  }`}
                >
                  Get started
                </button>
                <ul className="space-y-2.5">
                  {plan.highlights.map((h) => (
                    <li key={h} className="text-muted/70 flex items-start gap-2 text-xs">
                      <Check className="text-success mt-px h-3.5 w-3.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
