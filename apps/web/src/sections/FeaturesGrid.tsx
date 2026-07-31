'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@nexuslinks/ui'
import {
  BrainCircuit,
  Globe,
  QrCode,
  Lock,
  Code2,
  Users,
  Tag,
  Timer,
  Split,
  MapPin,
  Target,
  MousePointerClick,
} from 'lucide-react'

const features = [
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: 'AI Analytics',
    desc: 'Machine learning insights that predict click patterns and optimize your link strategy automatically.',
    accent: 'from-primary to-accent',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Custom Domains',
    desc: 'Use your own domain for branded links. Increase trust and click-through rates.',
    accent: 'from-accent to-primary',
  },
  {
    icon: <QrCode className="h-5 w-5" />,
    title: 'QR Codes',
    desc: 'Generate beautiful QR codes for every link. Download in multiple formats.',
    accent: 'from-secondary to-primary',
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: 'Password Protection',
    desc: 'Secure sensitive links with passwords and expiration dates.',
    accent: 'from-primary to-secondary',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'Developer API',
    desc: 'RESTful API with SDKs for Node.js, Python, Go, and more. Integrate in minutes.',
    accent: 'from-accent to-secondary',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Team Collaboration',
    desc: 'Shared workspaces, roles, permissions, and audit logs for your entire team.',
    accent: 'from-secondary to-accent',
  },
  {
    icon: <Tag className="h-5 w-5" />,
    title: 'UTM Builder',
    desc: 'Built-in UTM parameter builder for campaign tracking. No more manual tagging.',
    accent: 'from-primary to-accent',
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: 'Link Expiration',
    desc: 'Set automatic expiration dates for time-sensitive campaigns and promotions.',
    accent: 'from-accent to-primary',
  },
  {
    icon: <Split className="h-5 w-5" />,
    title: 'A/B Testing',
    desc: 'Split traffic between multiple destinations to optimize your conversion rates.',
    accent: 'from-secondary to-primary',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Geo Targeting',
    desc: 'Route users to different URLs based on their geographic location.',
    accent: 'from-primary to-secondary',
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Retargeting Pixels',
    desc: 'Embed Facebook, Google, and LinkedIn pixels on your links for audience retargeting.',
    accent: 'from-accent to-secondary',
  },
  {
    icon: <MousePointerClick className="h-5 w-5" />,
    title: 'Click Heatmaps',
    desc: 'Visual heatmaps showing where and when your audience clicks most.',
    accent: 'from-secondary to-accent',
  },
]

export function FeaturesGrid() {
  return (
    <Section id="features" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.04),transparent_50%)]" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-heading leading-heading text-foreground font-bold tracking-tight">
            Everything you need to own your links
          </h2>
          <p className="text-muted/60 mt-4 text-lg">
            Twelve powerful features. One platform. Infinite possibilities.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface/30 hover:bg-surface/50 hover:shadow-primary/5 group relative overflow-hidden rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="from-primary/[0.03] absolute inset-0 rounded-xl bg-gradient-to-br to-transparent" />
              </div>
              <div
                className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${f.accent} text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
              >
                {f.icon}
              </div>
              <h3 className="text-foreground mb-1.5 text-sm font-semibold">{f.title}</h3>
              <p className="text-muted/60 text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
