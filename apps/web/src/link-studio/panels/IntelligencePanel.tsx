'use client'

import { motion } from 'framer-motion'
import { ProgressScore } from '../components/ProgressScore'
import { SuggestionCard } from '../components/SuggestionCard'
import { Sparkles, Search, Globe, Zap, BrainCircuit, Lightbulb, ShieldCheck } from 'lucide-react'

const scores = [
  { label: 'Slug Quality', score: 92 },
  { label: 'SEO Score', score: 78 },
  { label: 'Brand Consistency', score: 88 },
  { label: 'Estimated CTR', score: 85 },
]

const suggestions = [
  {
    icon: BrainCircuit,
    title: 'Suggested alias: summer-sale-2026',
    description: 'More descriptive than auto-generated slug',
    action: 'Apply',
    variant: 'info' as const,
  },
  {
    icon: Search,
    title: 'HTTPS check passed',
    description: 'Destination URL uses secure connection',
    variant: 'success' as const,
  },
  {
    icon: Zap,
    title: 'Broken link scan',
    description: 'No broken links detected on the destination page',
    variant: 'success' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Spam risk: Low',
    description: 'Domain has clean reputation score',
    variant: 'success' as const,
  },
  {
    icon: Lightbulb,
    title: 'Add UTM parameters',
    description: 'Tracking params can improve campaign attribution',
    action: 'Add',
    variant: 'info' as const,
  },
  {
    icon: Globe,
    title: 'Custom domain available',
    description: 'Use go.mybrand.com for branded links',
    action: 'Set up',
    variant: 'warning' as const,
  },
]

export function IntelligencePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-full overflow-y-auto px-4 py-5"
    >
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="text-accent h-4 w-4" />
        <div>
          <h2 className="text-foreground text-base font-semibold">Link Intelligence</h2>
          <p className="text-muted/50 mt-0.5 text-xs">AI-powered analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-muted/40 text-[10px] font-medium uppercase tracking-wider">
          Quality Scores
        </p>
        {scores.map((s) => (
          <ProgressScore key={s.label} label={s.label} score={s.score} variant="compact" />
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-muted/40 text-[10px] font-medium uppercase tracking-wider">
          Intelligence
        </p>
        {suggestions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
          >
            <SuggestionCard {...s} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
