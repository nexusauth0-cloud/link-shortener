'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { Button, Badge, Spinner } from '@nexuslinks/ui'
import { mockInvoices, mockUsage, mockPlan, mockUser } from '../mock/data'
import { fadeInUp, stagger } from '@nexuslinks/ui'
import {
  CreditCard,
  Receipt,
  TrendingUp,
  Zap,
  Check,
  X,
  Download,
  ArrowUpRight,
  Building2,
  Plus,
  FileText,
} from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 9,
    desc: 'For individuals getting started',
    features: [
      '1,000 links/month',
      '10,000 clicks/month',
      '3 custom domains',
      'Basic analytics',
      'Community support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    desc: 'For growing businesses',
    features: [
      '10,000 links/month',
      '100,000 clicks/month',
      '10 custom domains',
      'Advanced analytics',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Business',
    price: 79,
    desc: 'For teams and enterprises',
    features: [
      'Unlimited links',
      '1,000,000 clicks/month',
      '50 custom domains',
      'Real-time analytics',
      'Priority support',
      'Team collaboration',
      'API access',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 249,
    desc: 'For large organizations',
    features: [
      'Everything in Business',
      'Unlimited clicks',
      'Unlimited domains',
      'SSO & SAML',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    popular: false,
  },
]

function UsageBar({
  label,
  used,
  limit,
  color,
}: {
  label: string
  used: number
  limit: number
  color: string
}) {
  const percentage = Math.min((used / limit) * 100, 100)
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-muted/60 text-xs">{label}</span>
        <span className="text-muted/40 text-xs">
          {used.toLocaleString()} / {limit.toLocaleString()}
        </span>
      </div>
      <div className="bg-surface-elevated h-2 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

export default function BillingPage() {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(mockPlan.name)
  const [upgrading, setUpgrading] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)

  const handleUpgrade = (planName: string) => {
    setSelectedPlan(planName)
    setUpgrading(true)
    setTimeout(() => {
      setUpgrading(false)
      setShowUpgrade(false)
    }, 1200)
  }

  return (
    <PageLayout>
      <PageHeader title="Billing" description="Manage your subscription and billing details" />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        <motion.div
          variants={fadeInUp}
          className="from-primary/10 to-accent/10 rounded-xl bg-gradient-to-br p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="text-primary h-5 w-5" />
                <h2 className="text-foreground text-lg font-bold">{mockPlan.name} Plan</h2>
                <Badge variant="default" className="text-[10px] capitalize">
                  {mockPlan.status}
                </Badge>
              </div>
              <p className="text-foreground mt-1 text-2xl font-bold">
                ${mockPlan.price}
                <span className="text-muted/50 text-sm font-normal">/{mockPlan.interval}</span>
              </p>
              <p className="text-muted/40 mt-0.5 text-xs">Next billing: {mockPlan.nextBilling}</p>
            </div>
            <Button variant="primary" size="md" onClick={() => setShowUpgrade(true)}>
              Upgrade plan
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <TrendingUp className="text-primary h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Monthly spend</p>
                <p className="text-foreground text-xl font-bold">${mockPlan.price}.00</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Building2 className="text-accent h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Team members</p>
                <p className="text-foreground text-xl font-bold">{mockUsage.teamMembers}</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="bg-success/10 flex h-10 w-10 items-center justify-center rounded-xl">
                <Globe className="text-success h-5 w-5" />
              </div>
              <div>
                <p className="text-muted/50 text-xs">Custom domains</p>
                <p className="text-foreground text-xl font-bold">{mockUsage.domains}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
          <h3 className="text-foreground mb-4 text-sm font-semibold">Usage</h3>
          <div className="space-y-5">
            <UsageBar
              label="Links"
              used={mockUsage.linksUsed}
              limit={mockUsage.linksLimit}
              color="#7C3AED"
            />
            <UsageBar
              label="Clicks"
              used={mockUsage.clicksUsed}
              limit={mockUsage.clicksLimit}
              color="#22D3EE"
            />
            <UsageBar
              label="Team Members"
              used={mockUsage.teamMembers}
              limit={mockUsage.teamLimit}
              color="#22C55E"
            />
            <UsageBar
              label="Custom Domains"
              used={mockUsage.domains}
              limit={mockUsage.domainsLimit}
              color="#A855F7"
            />
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="text-primary h-4 w-4" />
                <h3 className="text-foreground text-sm font-semibold">Invoices</h3>
              </div>
              <Button variant="ghost" size="sm">
                <FileText className="h-3.5 w-3.5" />
                View all
              </Button>
            </div>
            <div className="space-y-2">
              {mockInvoices.slice(0, 4).map((inv) => (
                <div
                  key={inv.id}
                  className="hover:bg-surface/20 flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors"
                >
                  <div className="bg-surface-elevated flex h-8 w-8 items-center justify-center rounded-lg">
                    <Receipt className="text-muted/50 h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground text-sm">{inv.plan} Plan</span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                          inv.status === 'paid'
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-muted/40 text-xs">
                      {inv.date} · {inv.amount}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="text-accent h-4 w-4" />
                <h3 className="text-foreground text-sm font-semibold">Payment Methods</h3>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setShowAddPayment(true)}>
                <Plus className="h-3.5 w-3.5" />
                Add method
              </Button>
            </div>
            <div className="bg-surface-elevated/50 rounded-lg px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
                    <CreditCard className="text-primary h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-muted/40 text-xs">Expires 12/28</p>
                  </div>
                </div>
                <Badge variant="default" className="text-[10px]">
                  Default
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => !upgrading && setShowUpgrade(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="border-border bg-surface w-full max-w-2xl rounded-xl border p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Choose a plan</h3>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-muted/40 hover:text-foreground rounded-lg p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-4">
                {plans.map((plan) => (
                  <button
                    key={plan.name}
                    onClick={() => handleUpgrade(plan.name)}
                    disabled={
                      upgrading || (plan.name === selectedPlan && plan.name === mockPlan.name)
                    }
                    className={`relative rounded-xl border p-4 text-left transition-all ${
                      selectedPlan === plan.name && plan.name !== mockPlan.name
                        ? 'border-primary/50 bg-primary/5'
                        : plan.name === mockPlan.name
                          ? 'border-border/20 bg-surface/30 opacity-60'
                          : 'border-border/10 bg-surface/20 hover:border-border/30'
                    } ${plan.popular ? 'ring-primary/30 ring-1' : ''}`}
                  >
                    {plan.popular && (
                      <span className="bg-primary absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[9px] font-medium text-white">
                        Popular
                      </span>
                    )}
                    <p className="text-foreground text-sm font-semibold">{plan.name}</p>
                    <p className="text-foreground mt-1 text-lg font-bold">
                      ${plan.price}
                      <span className="text-muted/40 text-xs font-normal">/mo</span>
                    </p>
                    <p className="text-muted/40 mt-1 text-[10px]">{plan.desc}</p>
                    <div className="mt-3 space-y-1.5">
                      {plan.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-1.5">
                          <Check className="text-success h-3 w-3" />
                          <span className="text-muted/60 text-[10px]">{f}</span>
                        </div>
                      ))}
                    </div>
                    {upgrading && selectedPlan === plan.name && (
                      <div className="text-primary mt-3 flex items-center gap-2 text-xs">
                        <Spinner size="sm" />
                        Upgrading...
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddPayment(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="border-border bg-surface w-full max-w-md rounded-xl border p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-foreground text-lg font-semibold">Add payment method</h3>
                <button
                  onClick={() => setShowAddPayment(false)}
                  className="text-muted/40 hover:text-foreground rounded-lg p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-muted/60 mb-1.5 block text-xs font-medium">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                    />
                  </div>
                  <div>
                    <label className="text-muted/60 mb-1.5 block text-xs font-medium">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-muted/60 mb-1.5 block text-xs font-medium">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    placeholder={mockUser.name}
                    className="bg-surface-elevated text-foreground focus:ring-primary h-10 w-full rounded-lg px-3 text-sm outline-none transition-all focus:ring-1"
                  />
                </div>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => {
                    setShowAddPayment(false)
                  }}
                >
                  <Plus className="h-4 w-4" />
                  Add card
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  )
}

function Globe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}
