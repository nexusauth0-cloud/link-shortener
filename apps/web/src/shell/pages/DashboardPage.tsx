'use client'

import { PageLayout } from '../components/PageLayout'
import { PageHeader } from '../components/PageHeader'

export default function DashboardPage() {
  return (
    <PageLayout>
      <PageHeader title="Dashboard" description="Overview of your links and analytics" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Links', value: '12,345', change: '+12%' },
          { label: 'Total Clicks', value: '2.4M', change: '+18.2%' },
          { label: 'Active Domains', value: '5', change: '+2' },
          { label: 'Team Members', value: '8', change: '+1' },
        ].map((s) => (
          <div key={s.label} className="bg-surface/30 rounded-xl p-5">
            <p className="text-muted/50 text-xs font-medium">{s.label}</p>
            <p className="text-foreground mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
            <p className="text-success mt-0.5 text-xs font-medium">{s.change}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
