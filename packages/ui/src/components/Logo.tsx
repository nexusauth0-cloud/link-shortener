interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nexus Links logo"
      >
        <rect width="32" height="32" rx="8" fill="url(#logo-gradient)" />
        <path
          d="M9 16L14 11L19 16L14 21L9 16Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 11L19 16L14 21"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.5"
        />
        <circle cx="14" cy="16" r="1.5" fill="white" />
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="32" y2="32">
            <stop stopColor="#7C3AED" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Nexus
          <span className="text-primary">Links</span>
        </span>
      )}
    </a>
  )
}
