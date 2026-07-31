'use client'

import { Link } from 'react-router-dom'
import { BrandIllustration } from '@nexuslinks/ui'

export function NotFoundPage() {
  return (
    <div className="bg-bg flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <BrandIllustration variant="error" size="lg" />
      </div>
      <h1 className="text-foreground text-6xl font-bold tracking-tight">404</h1>
      <p className="text-muted/60 mt-3 text-lg">This page doesn&apos;t exist.</p>
      <p className="text-muted/40 mt-1 text-sm">
        The link you followed may be broken or the page has been removed.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link
          to="/"
          className="bg-primary shadow-primary/30 hover:bg-primary/90 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all"
        >
          Go home
        </Link>
        <Link
          to="/app"
          className="text-foreground hover:bg-surface/50 rounded-xl px-5 py-2.5 text-sm font-medium transition-all"
        >
          Dashboard
        </Link>
      </div>
    </div>
  )
}
