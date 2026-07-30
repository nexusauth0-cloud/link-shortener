# Deployment — Nexus Links

> Infrastructure, CI/CD, and operational runbooks.

## Container Architecture

```mermaid
graph TD
    subgraph "Docker Compose (Development)"
        Web[Vite Dev Server :5173]
        API[Fastify API :3001]
        DB[PostgreSQL :5432]
        Redis[Redis :6379]
    end

    subgraph "Production (Kubernetes)"
        LB[Load Balancer]
        WebP[React SPA - CDN]
        APIP[API Pods]
        DBCluster[PostgreSQL RDS]
        RedisCluster[ElastiCache]
        Worker[Background Workers]
        Queue[SQS / BullMQ]
    end
```

## Development (Docker Compose)

```yaml
# docker/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: nexuslinks
      POSTGRES_USER: nexuslinks
      POSTGRES_PASSWORD: development
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'

  api:
    build:
      context: ..
      dockerfile: docker/api.Dockerfile
    ports:
      - '3001:3001'
    environment:
      DATABASE_URL: postgres://nexuslinks:development@postgres:5432/nexuslinks
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

  web:
    build:
      context: ..
      dockerfile: docker/web.Dockerfile
    ports:
      - '5173:5173'
    depends_on:
      - api
```

## Environment Variables

| Variable          | Required | Description                           |
| ----------------- | -------- | ------------------------------------- |
| `DATABASE_URL`    | Yes      | PostgreSQL connection string          |
| `REDIS_URL`       | Yes      | Redis connection string               |
| `JWT_PRIVATE_KEY` | Yes      | RSA private key for token signing     |
| `JWT_PUBLIC_KEY`  | Yes      | RSA public key for token verification |
| `JWT_ACCESS_TTL`  | No       | Default: `15m`                        |
| `JWT_REFRESH_TTL` | No       | Default: `7d`                         |
| `SMTP_HOST`       | No       | Email sending                         |
| `SMTP_PORT`       | No       | Email sending                         |
| `SMTP_USER`       | No       | Email sending                         |
| `SMTP_PASS`       | No       | Email sending                         |
| `CORS_ORIGIN`     | No       | CORS allowed origins                  |
| `LOG_LEVEL`       | No       | Pino log level (default: `info`)      |
| `RATE_LIMIT_MAX`  | No       | Default: `100`                        |
| `NODE_ENV`        | No       | `development`, `production`, `test`   |

## CI/CD (GitHub Actions)

### Workflows

| Workflow   | Trigger            | Steps                                       |
| ---------- | ------------------ | ------------------------------------------- |
| CI         | Push to any branch | Lint → Typecheck → Test → Build             |
| Preview    | PR to main         | CI steps + Deploy to preview env            |
| Production | Push to main       | CI steps + Docker build + Deploy production |

### CI Pipeline

```yaml
# .github/workflows/ci.yml
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build

  docker:
    needs: quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t nexuslinks/api:${GITHUB_SHA} -f docker/api.Dockerfile .
      - run: docker push nexuslinks/api:${GITHUB_SHA}
```

## Production Deployment

### Infrastructure Stack

| Component      | Service               | Configuration                     |
| -------------- | --------------------- | --------------------------------- |
| Compute        | AWS EKS (Kubernetes)  | 3x t3.medium nodes (auto-scaled)  |
| Database       | AWS RDS PostgreSQL    | db.r6g.large, Multi-AZ, 100GB gp3 |
| Cache          | AWS ElastiCache Redis | cache.r6g.large, Cluster mode     |
| CDN            | CloudFront            | Global edge, HTTPS only           |
| Object Storage | S3                    | QR codes, exports, backups        |
| CI/CD          | GitHub Actions        | Self-hosted runner                |
| Monitoring     | Grafana + Prometheus  | PagerDuty alerts                  |
| Logging        | AWS CloudWatch        | 30-day retention                  |
| Secrets        | AWS Secrets Manager   | Automatic rotation                |

### Deployment Runbook

1. **Merge to main** — triggers CI pipeline
2. **Docker build** — `docker build -t nexuslinks/api:${SHA}`
3. **Push to ECR** — `docker push ${ECR_REPO}:${SHA}`
4. **K8s rollout** — `kubectl set image deployment/api api=${ECR_REPO}:${SHA}`
5. **Health check** — `kubectl rollout status deployment/api`
6. **Smoke test** — Automated POST/GET/DELETE on critical endpoints
7. **Rollback** — `kubectl rollout undo deployment/api`

### Zero-Downtime Deployments

- Pod disruption budgets: `minAvailable: 2`
- Readiness probes: `GET /health` (200 + db connection check)
- Graceful shutdown: 30-second drain before SIGTERM
- Rolling update: `maxSurge: 1`, `maxUnavailable: 0`

## Monitoring & Alerting

### Key Metrics

| Metric              | Warning   | Critical  |
| ------------------- | --------- | --------- |
| P95 API latency     | >500ms    | >2s       |
| Error rate          | >1%       | >5%       |
| DB connection count | >80% pool | >95% pool |
| CPU (API pods)      | >70%      | >90%      |
| Memory (API pods)   | >80%      | >95%      |
| Disk (DB)           | >70%      | >85%      |
| Redirect latency    | >50ms     | >100ms    |

### Logging

- Structured JSON logs via Pino
- Correlation ID on every request (via Fastify request ID)
- Log levels: `debug`, `info`, `warn`, `error`, `fatal`
- No sensitive data in logs (PII redaction middleware)

## Backups

| Data           | Frequency | Retention  | Recovery Point |
| -------------- | --------- | ---------- | -------------- |
| PostgreSQL     | Every 6h  | 30 days    | Point-in-time  |
| Redis (RDB)    | Every 1h  | 7 days     | 1 hour         |
| Uploaded files | Real-time | Indefinite | S3 versioning  |
| Audit logs     | Real-time | 3 years    | Append-only    |

### Disaster Recovery

| Scenario           | RTO    | RPO    | Action                   |
| ------------------ | ------ | ------ | ------------------------ |
| Single pod failure | <1min  | 0      | K8s self-heals           |
| AZ failure         | <5min  | <5s    | Multi-AZ DB, spread pods |
| Region failure     | <30min | <15min | DR region (warm standby) |
| Data corruption    | <2h    | <6h    | Point-in-time recovery   |
| Full disaster      | <4h    | <1h    | Cross-region restore     |

## Cloud Architecture

```mermaid
graph TB
    subgraph "us-east-1 (Primary)"
        CF[CloudFront] --> ALB[ALB]
        ALB --> EKS[EKS Cluster]
        EKS --> API1[API Pod]
        EKS --> API2[API Pod]
        EKS --> API3[API Pod]
        API1 --> RDS[(RDS Primary)]
        API1 --> Redis[(ElastiCache)]
        EKS --> Worker[Worker Pod]
        Worker --> SQS[SQS Queue]
        RDS -.-> RDSReplica[(RDS Replica)]
    end

    subgraph "eu-west-1 (DR)"
        CFDR[CloudFront] --> ALBDR[ALB]
        ALBDR --> EKSDR[EKS Cluster]
        RDS -.-> RDSDR[(RDS Standby)]
    end

    CF -.-> |Failover| CFDR
```

## Cost Estimates

| Service        | Monthly (Est.) | Notes                   |
| -------------- | -------------- | ----------------------- |
| EKS            | $150           | Control plane + 3 nodes |
| RDS            | $400           | db.r6g.large, Multi-AZ  |
| ElastiCache    | $200           | cache.r6g.large         |
| CloudFront     | $50            | Variable by traffic     |
| S3             | $20            | QR codes + exports      |
| GitHub Actions | $0             | Public repo             |
| Monitoring     | $50            | Grafana Cloud           |
| **Total**      | **~$870**      | Baseline infrastructure |
