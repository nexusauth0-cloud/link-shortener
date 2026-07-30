interface TestimonialCardProps {
  avatar: string
  name: string
  role: string
  company: string
  quote: string
  rating?: number
}

export function TestimonialCard({
  avatar,
  name,
  role,
  company,
  quote,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="group rounded-xl border border-border/50 bg-surface/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-light hover:bg-surface/50 hover:shadow-lg">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }, (_, i) => (
          <svg
            key={i}
            className="h-4 w-4 text-warning"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <blockquote className="mb-6 text-sm leading-relaxed text-muted">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
          {avatar}
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{name}</div>
          <div className="text-xs text-muted">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  )
}
