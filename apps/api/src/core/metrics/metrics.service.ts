export interface RequestMetrics {
  method: string
  route: string
  statusCode: number
  durationMs: number
}

export interface MetricLabelKey {
  method: string
  route: string
  statusCode: string
}

const HISTOGRAM_BUCKETS_MS = [5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000]

export class MetricsService {
  private readonly requests = new Map<string, number>()
  private readonly durations = new Map<string, Map<number, number>>()
  private readonly errors = new Map<string, number>()
  private readonly startedAt = Date.now()

  private labelKey(method: string, route: string, statusCode: number): string {
    return `${method} ${route} ${statusCode}`
  }

  recordRequest(metrics: RequestMetrics): void {
    const key = this.labelKey(metrics.method, metrics.route, metrics.statusCode)
    this.requests.set(key, (this.requests.get(key) ?? 0) + 1)

    let buckets = this.durations.get(key)
    if (!buckets) {
      buckets = new Map()
      this.durations.set(key, buckets)
    }
    for (const bucket of HISTOGRAM_BUCKETS_MS) {
      if (metrics.durationMs <= bucket) {
        buckets.set(bucket, (buckets.get(bucket) ?? 0) + 1)
      }
    }

    if (metrics.statusCode >= 500) {
      this.errors.set(key, (this.errors.get(key) ?? 0) + 1)
    }
  }

  getTotalRequests(): number {
    let total = 0
    for (const count of this.requests.values()) total += count
    return total
  }

  getTotalErrors(): number {
    let total = 0
    for (const count of this.errors.values()) total += count
    return total
  }

  getUptimeSeconds(): number {
    return Math.floor((Date.now() - this.startedAt) / 1000)
  }

  getMemoryUsageBytes(): number {
    return process.memoryUsage().rss
  }

  /**
   * Renders metrics in Prometheus text exposition format (0.0.4).
   */
  renderPrometheus(): string {
    const lines: string[] = []

    lines.push('# HELP nexus_http_requests_total Total HTTP requests processed')
    lines.push('# TYPE nexus_http_requests_total counter')
    for (const [key, count] of this.requests) {
      const [method, route, statusCode] = key.split(' ')
      lines.push(
        `nexus_http_requests_total{method="${method}",route="${route}",status="${statusCode}"} ${count}`,
      )
    }

    lines.push('# HELP nexus_http_request_duration_ms HTTP request duration in milliseconds')
    lines.push('# TYPE nexus_http_request_duration_ms histogram')
    for (const [key, buckets] of this.durations) {
      const [method, route, statusCode] = key.split(' ')
      for (const [bucket, count] of buckets) {
        lines.push(
          `nexus_http_request_duration_ms_bucket{method="${method}",route="${route}",status="${statusCode}",le="${bucket}"} ${count}`,
        )
      }
    }

    lines.push('# HELP nexus_http_errors_total Total HTTP 5xx errors')
    lines.push('# TYPE nexus_http_errors_total counter')
    for (const [key, count] of this.errors) {
      const [method, route, statusCode] = key.split(' ')
      lines.push(
        `nexus_http_errors_total{method="${method}",route="${route}",status="${statusCode}"} ${count}`,
      )
    }

    lines.push('# HELP nexus_process_uptime_seconds Process uptime in seconds')
    lines.push('# TYPE nexus_process_uptime_seconds gauge')
    lines.push(`nexus_process_uptime_seconds ${this.getUptimeSeconds()}`)

    lines.push('# HELP nexus_process_memory_bytes Process RSS memory in bytes')
    lines.push('# TYPE nexus_process_memory_bytes gauge')
    lines.push(`nexus_process_memory_bytes ${this.getMemoryUsageBytes()}`)

    return lines.join('\n')
  }
}
