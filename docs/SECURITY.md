# Security — Nexus Links

> Security architecture, policies, and OWASP-aligned practices.

## Authentication

### Password Policy

| Requirement        | Value                                |
| ------------------ | ------------------------------------ |
| Minimum length     | 12 characters                        |
| Maximum length     | 128 characters                       |
| Character classes  | 3 of 4 (lower, upper, digit, symbol) |
| Password history   | 5 previous passwords blocked         |
| Max attempts       | 5 before 15-minute lockout           |
| Reset token expiry | 15 minutes                           |

### JWT

| Algorithm            | RS256 (asymmetric) |
| -------------------- | ------------------ |
| Access token TTL     | 15 minutes         |
| Refresh token TTL    | 7 days             |
| Signing key rotation | Every 90 days      |
| Key size             | 4096-bit RSA       |

Access tokens are signed but **not encrypted** — they contain no sensitive data beyond the user ID and issued-at timestamp.

### Session Management

- Refresh tokens stored in Redis (hashed) for server-side revocation
- User can view and revoke sessions from Settings
- On password change: all sessions invalidated
- On 2FA enable: all sessions invalidated
- Concurrent session limit: 25 per user

## Authorization (RBAC)

| Role   | Links | Analytics | Settings | Billing | Team   | API          |
| ------ | ----- | --------- | -------- | ------- | ------ | ------------ |
| Admin  | CRUD  | Read      | Full     | Full    | Manage | Full         |
| Editor | CRUD  | Read      | Self     | Read    | Read   | Links        |
| Viewer | Read  | Read      | Self     | Read    | Read   | Links (read) |

Role enforcement at API middleware level, not in application code.

## API Security

### Rate Limiting

```
POST /auth/login        → 5 req/min per IP
POST /auth/register     → 3 req/min per IP
POST /auth/forgot-password → 2 req/min per IP
/api-keys               → 10 req/min per user
All other endpoints     → Tier-based (see API_SPEC.md)
```

### CSRF Protection

- SameSite=Strict on all cookies
- No cookies for API authentication (Bearer tokens only)
- Idempotency keys on mutation endpoints (`Idempotency-Key` header)

### Request Validation

- All input validated with Zod schemas before reaching route handlers
- Content-Type enforced (JSON only for mutations)
- Body size limited (100KB per request)
- URL parameter length limited (2048 chars)

## Secrets Management

| Secret            | Storage              | Encryption       | Rotation  |
| ----------------- | -------------------- | ---------------- | --------- |
| Database password | Environment variable | AES-256 at rest  | 90 days   |
| JWT private key   | Environment variable | AES-256 at rest  | 90 days   |
| API key hash      | Database             | bcrypt (cost 12) | On rotate |
| Webhook secret    | Database             | AES-256          | On rotate |
| Redis password    | Environment variable | AES-256 at rest  | 90 days   |
| SMTP credentials  | Environment variable | AES-256 at rest  | 90 days   |

All secrets injected via environment variables, never committed to the repository. Production secrets managed through a secrets vault (HashiCorp Vault or similar).

## Webhook Security

- **Signing:** Each webhook request includes `X-Nexus-Signature` header (HMAC-SHA256)
- **Secret per webhook:** Each endpoint has its own signing secret
- **Retry:** 3 retries with exponential backoff (10s, 60s, 300s)
- **Timeout:** Webhooks must respond within 5 seconds
- **IP allowlist:** Webhook requests come from predictable IP ranges (documented)

## Data Protection

### At Rest

- Database encrypted at rest (RDS/Aurora encryption)
- Sensitive columns: `password_hash`, `two_factor_key`, `key_hash` — application-level encryption
- Backups encrypted with separate key

### In Transit

- TLS 1.3 minimum for all external connections
- Internal service communication: TLS within Kubernetes cluster
- Database connections: TLS required

## OWASP Top 10 Coverage

| #   | Risk                      | Mitigation                                                   |
| --- | ------------------------- | ------------------------------------------------------------ |
| A01 | Broken Access Control     | RBAC middleware, per-workspace data isolation                |
| A02 | Cryptographic Failures    | TLS 1.3, bcrypt for passwords, AES-256 for data at rest      |
| A03 | Injection                 | Prisma prevents SQL injection, Zod validates all input       |
| A04 | Insecure Design           | Threat modeling in design phase, ADRs for security decisions |
| A05 | Security Misconfiguration | Infrastructure as Code, automated security scanning          |
| A06 | Vulnerable Components     | Dependabot weekly, Snyk scanning in CI                       |
| A07 | Auth Failures             | Rate limiting, account lockout, 2FA support                  |
| A08 | Data Integrity            | Webhook signing, idempotency keys, audit logging             |
| A09 | Logging Failures          | Structured logging, centralized SIEM, audit trail            |
| A10 | SSRF                      | Outbound network restricted at infrastructure level          |

## Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## File Upload Policy

| Dimension      | Value                                  |
| -------------- | -------------------------------------- |
| Allowed types  | PNG, SVG, JPEG, WebP                   |
| Max file size  | 2MB                                    |
| Storage        | Object storage (non-executable bucket) |
| Scanning       | ClamAV scan on upload                  |
| Serving        | CDN with content-type enforcement      |
| EXIF stripping | Yes, all metadata removed              |

## Audit Logging

All security-relevant events logged to the audit log:

- Account creation, deletion
- Role changes
- API key creation, rotation, deletion
- Password changes
- 2FA enable/disable
- Login failures (excessive)
- Workspace membership changes
- Webhook creation/modification
- Billing plan changes

Logs are immutable (append-only) and retained for 3 years minimum.

## Incident Response

1. **Detection** — Automated alerts on anomaly patterns (unusual API traffic, multiple failed logins)
2. **Containment** — Revoke compromised tokens, isolate affected resources
3. **Eradication** — Rotate secrets, patch vulnerabilities
4. **Recovery** — Restore from clean backup if needed
5. **Post-mortem** — Document timeline, root cause, preventive measures

High-severity incidents: 15-minute response target during business hours, 1-hour on-call response.
