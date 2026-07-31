interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-bg flex min-h-screen flex-col lg:flex-row">
      <div className="noise relative flex flex-col justify-between overflow-hidden px-6 py-10 lg:flex lg:w-1/2 lg:px-12 lg:py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(124,58,237,0.12),transparent_50%),radial-gradient(ellipse_at_70%_10%,rgba(34,211,238,0.06),transparent_40%),radial-gradient(ellipse_at_50%_90%,rgba(168,85,247,0.06),transparent_40%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 flex items-center gap-2">
          <div className="from-primary to-accent flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white">
            N
          </div>
          <span className="text-foreground text-sm font-semibold">nexus</span>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="mx-auto max-w-md">
            <AuthIllustration />
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" />
              <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
            </span>
            <span className="text-muted/50 text-xs">All systems operational</span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 py-8 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.04),transparent_50%)]" />
        {children}
      </div>
    </div>
  )
}

function AuthIllustration() {
  const features = [
    { value: '2.4M', label: 'Links created today' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '190+', label: 'Countries served' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground text-4xl font-bold leading-tight tracking-tight">
          Enterprise link
          <br />
          <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
            management
          </span>
        </h1>
        <p className="text-muted/60 mt-4 text-sm leading-relaxed">
          The most advanced link management platform for teams who need reliability, analytics, and
          scale.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {features.map((f) => (
          <div key={f.label} className="bg-surface/30 rounded-xl p-3">
            <p className="text-foreground text-base font-bold tracking-tight">{f.value}</p>
            <p className="text-muted/50 mt-0.5 text-[10px]">{f.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <div className="flex -space-x-2">
          {['SC', 'MR', 'EN', 'JO'].map((initials, i) => (
            <div
              key={i}
              className="border-bg from-primary to-accent flex h-7 w-7 items-center justify-center rounded-full border-2 bg-gradient-to-br text-[9px] font-semibold text-white"
            >
              {initials}
            </div>
          ))}
        </div>
        <p className="text-muted/50 text-xs">
          Trusted by <span className="text-foreground font-medium">12,000+</span> teams
        </p>
      </div>
    </div>
  )
}
