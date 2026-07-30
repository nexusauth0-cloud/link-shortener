'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PageLayout } from '../shell/components/PageLayout'
import { PageHeader } from '../shell/components/PageHeader'
import { mockAnalytics } from '../mock/data'
import { fadeInUp, stagger } from '@nexuslinks/ui'
import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  TrendingDown,
  Clock,
  Filter,
  RefreshCcw,
  Circle,
  MousePointerClick,
  Link2,
  Users,
} from 'lucide-react'

type TimeRange = '7d' | '30d' | '90d'

const timeRanges: TimeRange[] = ['7d', '30d', '90d']
const campaigns = ['All Campaigns', 'Summer Sale', 'Q3 Launch', 'Newsletter', 'Social']
const countries = ['All Countries', 'US', 'UK', 'DE', 'JP', 'BR', 'CA', 'FR', 'AU']

function StatCard({
  label,
  value,
  change,
  icon: Icon,
  positive,
}: {
  label: string
  value: string
  change: string
  icon: React.ElementType
  positive?: boolean
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-surface/30 hover:bg-surface/40 rounded-xl p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/10"
    >
      <div className="flex items-center justify-between">
        <p className="text-muted/50 text-xs font-medium">{label}</p>
        <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
          <Icon className="text-primary h-4 w-4" />
        </div>
      </div>
      <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">{value}</p>
      <div className="mt-1 flex items-center gap-1">
        {positive !== undefined &&
          (positive ? (
            <TrendingUp className="text-success h-3 w-3" />
          ) : (
            <TrendingDown className="text-danger h-3 w-3" />
          ))}
        <span
          className={
            positive ? 'text-success text-xs font-medium' : 'text-danger text-xs font-medium'
          }
        >
          {change}
        </span>
        <span className="text-muted/30 text-[10px]">vs last period</span>
      </div>
    </motion.div>
  )
}

function ClickChart({ data }: { data: { date: string; clicks: number }[] }) {
  const maxClicks = Math.max(...data.map((d) => d.clicks))
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">Clicks Over Time</h3>
      <div className="flex items-end gap-2" style={{ height: 160 }}>
        {data.map((d, i) => (
          <div
            key={d.date}
            className="group relative flex flex-1 flex-col items-center justify-end"
          >
            <span className="text-muted/30 mb-1 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
              {d.clicks.toLocaleString()}
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(d.clicks / maxClicks) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="from-primary/60 to-primary hover:from-primary/80 hover:to-primary w-full rounded-t-md bg-gradient-to-t transition-all duration-200"
              style={{ minHeight: 4 }}
            />
            <span className="text-muted/30 mt-1.5 text-[10px]">{d.date}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function TrafficPie({
  sources,
}: {
  sources: { source: string; percentage: number; color: string }[]
}) {
  let cumulative = 0
  const segments = sources.map((s) => {
    const start = cumulative
    cumulative += s.percentage
    return { ...s, start, end: cumulative }
  })
  const radius = 80
  const cx = 100
  const cy = 100
  const total = sources.reduce((a, s) => a + s.percentage, 0)

  function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
    const angleRad = ((angleDeg - 90) * Math.PI) / 180
    return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
  }

  function describeArc(startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, radius, startAngle)
    const end = polarToCartesian(cx, cy, radius, endAngle)
    const largeArc = endAngle - startAngle > 180 ? 1 : 0
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y} Z`
  }

  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">Traffic Sources</h3>
      <div className="flex items-center gap-6">
        <svg width="200" height="200" viewBox="0 0 200 200" className="shrink-0">
          {segments.map((s, i) => (
            <motion.path
              key={s.source}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              d={describeArc((s.start / total) * 360, (s.end / total) * 360)}
              fill={s.color}
              className="transition-opacity hover:opacity-80"
            />
          ))}
          <circle cx={cx} cy={cy} r={45} fill="#0c1224" />
        </svg>
        <div className="space-y-3">
          {sources.map((s) => (
            <div key={s.source} className="flex items-center gap-2">
              <Circle className="h-2.5 w-2.5" style={{ color: s.color }} fill={s.color} />
              <span className="text-muted/60 text-xs">{s.source}</span>
              <span className="text-foreground text-xs font-semibold">{s.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function DeviceBar({
  devices,
}: {
  devices: { device: string; percentage: number; color: string }[]
}) {
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">Devices</h3>
      <div className="space-y-4">
        {devices.map((d, i) => {
          const Icon =
            d.device === 'Desktop' ? Monitor : d.device === 'Mobile' ? Smartphone : Tablet
          return (
            <div key={d.device}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="text-muted/40 h-3.5 w-3.5" />
                  <span className="text-muted/60 text-xs">{d.device}</span>
                </div>
                <span className="text-foreground text-xs font-semibold">{d.percentage}%</span>
              </div>
              <div className="bg-surface-elevated h-2 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full"
                  style={{ background: d.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function BrowserBar({
  browsers,
}: {
  browsers: { browser: string; percentage: number; color: string }[]
}) {
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">Browsers</h3>
      <div className="space-y-4">
        {browsers.map((b, i) => (
          <div key={b.browser}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-muted/60 text-xs">{b.browser}</span>
              <span className="text-foreground text-xs font-semibold">{b.percentage}%</span>
            </div>
            <div className="bg-surface-elevated h-2 overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.percentage}%` }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: b.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function CountriesTable({
  countries,
}: {
  countries: { country: string; code: string; clicks: number }[]
}) {
  const maxClicks = Math.max(...countries.map((c) => c.clicks))
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <h3 className="text-foreground mb-4 text-sm font-semibold">Top Countries</h3>
      <div className="space-y-2">
        {countries.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="hover:bg-surface/30 flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
          >
            <span className="text-muted/50 w-8 text-xs font-medium">{c.code}</span>
            <div className="flex-1">
              <div className="bg-surface-elevated h-2 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(c.clicks / maxClicks) * 100}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="from-primary to-accent h-full rounded-full bg-gradient-to-r"
                />
              </div>
            </div>
            <span className="text-foreground w-20 text-right text-xs font-semibold">
              {c.clicks.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function RealtimePanel({
  visitors,
}: {
  visitors: { country: string; page: string; time: string }[]
}) {
  const [pulsing, setPulsing] = useState(true)
  return (
    <motion.div variants={fadeInUp} className="bg-surface/30 rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="text-accent h-4 w-4" />
          <h3 className="text-foreground text-sm font-semibold">Real-Time</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div
              className={`bg-success absolute h-full w-full rounded-full ${pulsing ? 'animate-ping' : ''}`}
              style={{ animationDuration: '2s' }}
            />
            <div className="bg-success h-1.5 w-1.5 rounded-full" />
          </div>
          <span className="text-success text-[10px] font-medium">LIVE</span>
          <button
            onClick={() => setPulsing(!pulsing)}
            className="text-muted/40 hover:text-foreground ml-1 rounded-md p-1 transition-colors"
            aria-label="Toggle live mode"
          >
            <RefreshCcw className="h-3 w-3" />
          </button>
        </div>
      </div>
      <div className="space-y-1">
        {visitors.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="hover:bg-surface/20 flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors"
          >
            <span className="text-muted/40 w-6">{v.country}</span>
            <span className="text-muted/80 flex-1">{v.page}</span>
            <span className="text-muted/40">{v.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function FilterBar({
  timeRange,
  setTimeRange,
  campaign,
  setCampaign,
  country,
  setCountry,
}: {
  timeRange: TimeRange
  setTimeRange: (v: TimeRange) => void
  campaign: string
  setCampaign: (v: string) => void
  country: string
  setCountry: (v: string) => void
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Filter className="text-muted/40 h-4 w-4" />
      <div className="bg-surface/40 flex gap-1 rounded-lg p-0.5">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              timeRange === range
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted/50 hover:text-foreground'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
      <div className="bg-border/20 h-5 w-px" />
      <select
        value={campaign}
        onChange={(e) => setCampaign(e.target.value)}
        className="bg-surface/40 text-muted/60 hover:text-foreground h-8 rounded-lg px-3 text-xs outline-none transition-colors"
      >
        {campaigns.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="bg-surface/40 text-muted/60 hover:text-foreground h-8 rounded-lg px-3 text-xs outline-none transition-colors"
      >
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function AnalyticsPage() {
  const analytics = mockAnalytics
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [campaign, setCampaign] = useState('All Campaigns')
  const [country, setCountry] = useState('All Countries')

  return (
    <PageLayout>
      <PageHeader title="Analytics" description="Track performance across all your links" />

      <FilterBar
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        campaign={campaign}
        setCampaign={setCampaign}
        country={country}
        setCountry={setCountry}
      />

      <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Clicks"
            value={(analytics.totalClicks / 1000).toFixed(1) + 'M'}
            change={analytics.clicksChange + '%'}
            icon={MousePointerClick}
            positive
          />
          <StatCard
            label="Total Links"
            value={analytics.totalLinks.toLocaleString()}
            change={analytics.linksChange + '%'}
            icon={Link2}
            positive
          />
          <StatCard
            label="Countries"
            value={analytics.totalCountries.toString()}
            change={analytics.countriesChange + '%'}
            icon={Globe}
            positive
          />
          <StatCard
            label="Visitors"
            value={(analytics.totalVisitors / 1000).toFixed(1) + 'K'}
            change={analytics.visitorsChange + '%'}
            icon={Users}
            positive
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ClickChart data={analytics.clicksByDay} />
          </div>
          <RealtimePanel visitors={analytics.realtimeVisitors} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <TrafficPie sources={analytics.trafficSources} />
          <CountriesTable countries={analytics.topCountries} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DeviceBar devices={analytics.devices} />
          <BrowserBar browsers={analytics.browsers} />
        </div>
      </motion.div>
    </PageLayout>
  )
}
