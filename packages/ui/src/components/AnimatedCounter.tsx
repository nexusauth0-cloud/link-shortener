import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  label?: string
  format?: boolean
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
  label,
  format = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOut * end))

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(end)
            }
          }

          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [end, duration])

  const formatCount = (n: number): string => {
    if (!format) return n.toString()
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
    return n.toLocaleString()
  }

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {prefix}
        {formatCount(count)}
        {suffix}
      </div>
      {label && <div className="mt-2 text-sm font-medium text-muted">{label}</div>}
    </div>
  )
}
