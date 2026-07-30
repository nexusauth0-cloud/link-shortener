# Performance — Nexus Links

> Performance budgets, optimization strategies, and Core Web Vitals targets.

## Performance Budgets

| Metric                       | Budget         | Measurement                  |
| ---------------------------- | -------------- | ---------------------------- |
| Total bundle size (JS)       | <200KB gzipped | Webpack/Vite bundle analyzer |
| First Contentful Paint       | <1.5s          | Lighthouse, RUM              |
| Largest Contentful Paint     | <2.5s          | Lighthouse, RUM              |
| First Input Delay            | <100ms         | RUM                          |
| Cumulative Layout Shift      | <0.1           | Lighthouse, RUM              |
| Time to Interactive          | <3.5s          | Lighthouse                   |
| API P95 latency              | <200ms         | Datadog, Prometheus          |
| Redirect latency (P99)       | <50ms          | Application metrics          |
| Lighthouse Performance score | >90            | CI gate                      |

## Frontend Optimization

### Bundle Optimization

- **Code splitting** by route — every app page is a lazy-loaded chunk
- **Tree shaking** — lucide-react icons imported individually, not as barrel
- **CSS cleanup** — Tailwind purges unused classes in production
- **Font subsetting** — Inter and JetBrains Mono subsetted to Latin
- **Dynamic imports** — heavy components (charts, QR generation) loaded on interaction

### Lazy Loading Strategy

```typescript
// Each route is a lazy-loaded chunk
const AnalyticsPage = lazy(() => import('./analytics/AnalyticsPage'))
const QRStudioPage = lazy(() => import('./qr-studio/QRStudioPage'))

// Heavy components loaded on interaction
const QRCode = lazy(() => import('./components/QRCode'))
const Chart = lazy(() => import('./components/Chart'))
```

### Image Optimization

- All images served via CDN with `?format=webp` and `?width=` parameters
- Maximum image dimensions: 2000px on longest side
- LQIP (Low Quality Image Placeholder) for hero images
- `loading="lazy"` for below-fold images
- `<picture>` element with WebP fallback

### Rendering Optimization

- No unnecessary re-renders — `React.memo` on expensive components
- `useMemo` for computed values, `useCallback` for handlers passed to children
- Virtualized lists (`@tanstack/virtual`) for link tables with 100+ items
- Debounced search inputs (300ms)
- Off-main-thread QR generation if needed (Web Worker)

## Backend Optimization

### API Optimization

| Strategy             | Implementation                     |
| -------------------- | ---------------------------------- |
| Response compression | `@fastify/compress` (Brotli)       |
| Connection pooling   | PgBouncer (transaction mode)       |
| Keep-alive           | HTTP/2, connection reuse           |
| Payload size limits  | 100KB request body limit           |
| Partial responses    | `?fields=id,alias,clicks` (future) |
| Batch operations     | `POST /v1/links/bulk`              |

### Database Optimization

- **Index all query patterns** — see DATABASE.md for index list
- **Materialized views** for analytics aggregations (refresh every 15min)
- **Read replicas** for analytics dashboard queries
- **Query timeouts** — 5s for dashboard, 50ms for redirects
- **Connection limits** — 20 connections per API pod
- **Batch inserts** for click ingestion (every 5 seconds, batch size 1000)

### Caching

| Cache Layer | Strategy                                   | TTL          | Invalidation                 |
| ----------- | ------------------------------------------ | ------------ | ---------------------------- |
| DNS         | Short TTL (60s) on custom domains          | 60s          | DNS record update            |
| CDN         | Static assets cache-busted by content hash | 1 year       | New deployment               |
| CDN         | API responses                              | 0s (dynamic) | N/A                          |
| Redis       | Link redirects                             | 5min         | On link update               |
| Redis       | Session data                               | 15min        | On logout                    |
| Redis       | Analytics aggregates                       | 1h           | Background refresh           |
| Application | Hot links LRU cache                        | 30s          | Least recently used eviction |

### Worker Offloading

Work to move off the main request path:

- Click event ingestion (batch + async write)
- Analytics aggregation (cron schedule, not on-demand)
- Webhook delivery (queue + retry)
- Email sending (queue)
- QR code generation (on first request, then cache)

## Core Web Vitals

### Current Targets

| Metric | Target | Measurement Method         |
| ------ | ------ | -------------------------- |
| LCP    | <2.5s  | Lighthouse, CrUX           |
| FID    | <100ms | RUM (Performance Observer) |
| CLS    | <0.1   | Lighthouse, CrUX           |
| INP    | <200ms | RUM (Event Timing API)     |

### Optimization by Page

| Page         | LCP Element       | Strategy                                      |
| ------------ | ----------------- | --------------------------------------------- |
| Landing page | Hero heading text | Eliminate layout shift, preload font          |
| Login        | Form container    | Minimal JS, immediate render                  |
| Dashboard    | Stats cards       | Static shell, hydrate card values after paint |
| Analytics    | Chart area        | Skeleton placeholder, chart renders last      |
| Link Studio  | 3-panel layout    | CSS Grid layout, individual panel loading     |

### Monitoring

- Real User Monitoring (RUM) via `web-vitals` library
- Synthetic monitoring via Lighthouse CI on every PR
- Alert on regression >10% for any Core Web Vital
- Public status page at `status.nexuslinks.com`

## Performance Testing

| Test Type            | Tool              | Frequency            | Threshold                       |
| -------------------- | ----------------- | -------------------- | ------------------------------- |
| Lighthouse CI        | Lighthouse        | Every PR             | Score > 90                      |
| Load test (API)      | k6                | Weekly               | P95 < 200ms                     |
| Load test (redirect) | k6                | Weekly               | P99 < 50ms                      |
| Bundle size          | Vite analyzer     | Every PR             | JS < 200KB gzip                 |
| Memory leak          | Clinic.js         | Monthly              | No leak > 5% per hour           |
| DB query perf        | `EXPLAIN ANALYZE` | Schema change review | Seq scan on large tables = fail |

## Bundle Analysis

Current production bundle sizes:

| Chunk         | Size (gzip) | Contents                       |
| ------------- | ----------- | ------------------------------ |
| `main`        | ~45KB       | React, React Router, app shell |
| `landing`     | ~35KB       | Landing page sections          |
| `auth`        | ~15KB       | Auth pages                     |
| `analytics`   | ~25KB       | Charts, analytics components   |
| `link-studio` | ~20KB       | Link Studio page               |
| `qr-studio`   | ~15KB       | QR Studio page                 |
| `billing`     | ~12KB       | Billing page                   |
| `vendor`      | ~40KB       | Framer Motion                  |

Target: Keep any single chunk under 50KB gzipped. If a chunk exceeds this, split further by sub-section.
