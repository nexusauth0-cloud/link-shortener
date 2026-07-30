# API Specification — Nexus Links

> OpenAPI 3.1 spec is maintained at `apps/api/openapi.yaml`. This document summarizes the API surface, conventions, and design decisions.

## Base URL

```
https://api.nexuslinks.com/v1
```

For development:

```
http://localhost:3001/v1
```

## Authentication

All API requests (except public endpoints) require a Bearer token:

```
Authorization: Bearer nx_sk_...
```

Tokens are either:

- **OAuth2 access tokens** (from login flow) — 15-minute expiry
- **API keys** (from Developer Hub) — long-lived, configurable expiry

### Public Endpoints

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /{alias}` — Link redirect (no auth, follows redirect)

## Error Format

All errors return a consistent JSON envelope:

```json
{
  "error": {
    "code": "ALIAS_TAKEN",
    "message": "This alias is already in use in your workspace.",
    "details": {
      "suggested": ["summer-sale-2026", "summer-sale-v2"]
    },
    "requestId": "req_a1b2c3d4"
  }
}
```

### HTTP Status Codes

| Code | Meaning                    |
| ---- | -------------------------- |
| 200  | Success                    |
| 201  | Created                    |
| 204  | No content (delete)        |
| 400  | Bad request (validation)   |
| 401  | Unauthenticated            |
| 403  | Forbidden (RBAC)           |
| 404  | Not found                  |
| 409  | Conflict (duplicate alias) |
| 422  | Unprocessable entity       |
| 429  | Rate limited               |
| 500  | Internal server error      |

## Pagination

Cursor-based pagination for all list endpoints.

**Request:**

```
GET /v1/links?cursor=abc123&limit=50
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "def456",
    "hasMore": true,
    "total": 1234
  }
}
```

| Parameter | Type    | Default | Description                          |
| --------- | ------- | ------- | ------------------------------------ |
| `cursor`  | string  | —       | Opaque cursor from previous response |
| `limit`   | integer | 20      | Max items (1–100)                    |

## Filtering

Query parameter format: `filter[key]=value`

```
GET /v1/links?filter[status]=active&filter[tag]=marketing
```

Supported filter keys vary by endpoint. Common filters:

| Filter          | Type     | Example                       |
| --------------- | -------- | ----------------------------- |
| `status`        | enum     | `active`, `draft`, `archived` |
| `tag`           | string   | Exact tag match               |
| `campaign`      | string   | Campaign ID                   |
| `domain`        | string   | Domain ID                     |
| `folder`        | string   | Folder ID                     |
| `createdAfter`  | ISO date | `2026-01-01T00:00:00Z`        |
| `createdBefore` | ISO date | `2026-07-01T00:00:00Z`        |

## Sorting

```
GET /v1/links?sort=-clicks
```

Prefix with `-` for descending. Default sort is `-createdAt`.

| Sort field  | Description       |
| ----------- | ----------------- |
| `createdAt` | Creation date     |
| `clicks`    | Total click count |
| `alias`     | Alphabetical      |
| `updatedAt` | Last update       |

## Rate Limiting

| Tier       | Requests/second | Burst  |
| ---------- | --------------- | ------ |
| Free       | 10              | 20     |
| Pro        | 100             | 200    |
| Business   | 500             | 1000   |
| Enterprise | Custom          | Custom |

Rate limit headers returned:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1625097600
```

## Endpoints

### Authentication

| Method | Path                    | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/auth/register`        | Create account                |
| POST   | `/auth/login`           | Sign in                       |
| POST   | `/auth/logout`          | Sign out (invalidate session) |
| POST   | `/auth/refresh`         | Refresh access token          |
| POST   | `/auth/forgot-password` | Send reset email              |
| POST   | `/auth/reset-password`  | Reset password with token     |
| POST   | `/auth/verify-email`    | Verify email address          |
| POST   | `/auth/2fa/setup`       | Enable 2FA                    |
| POST   | `/auth/2fa/verify`      | Verify 2FA code               |

### Links

| Method | Path                   | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/links`               | List links (paginated, filterable) |
| POST   | `/links`               | Create a link                      |
| GET    | `/links/:id`           | Get link details                   |
| PATCH  | `/links/:id`           | Update a link                      |
| DELETE | `/links/:id`           | Soft delete a link                 |
| POST   | `/links/:id/restore`   | Restore deleted link               |
| POST   | `/links/:id/duplicate` | Duplicate a link                   |
| POST   | `/links/:id/qr`        | Generate QR code                   |
| POST   | `/links/bulk`          | Bulk create links                  |

**Create Link Request:**

```json
{
  "destination": "https://shop.example.com/summer-sale",
  "alias": "summer-sale",
  "title": "Summer Sale 2026",
  "description": "50% off everything",
  "password": "secret123",
  "expiresAt": "2026-09-01T00:00:00Z",
  "domainId": "dom_abc123",
  "campaignId": "cmp_def456",
  "folderId": "fld_ghi789",
  "tags": ["marketing", "campaign"],
  "utm": {
    "source": "twitter",
    "medium": "social",
    "campaign": "summer-2026",
    "term": "shoes",
    "content": "hero-banner"
  },
  "isDraft": false
}
```

### Analytics

| Method | Path                                | Description              |
| ------ | ----------------------------------- | ------------------------ |
| GET    | `/analytics/overview`               | Workspace overview stats |
| GET    | `/analytics/links/:id`              | Link-specific analytics  |
| GET    | `/analytics/links/:id/clicks`       | Click time series        |
| GET    | `/analytics/links/:id/countries`    | Geographic breakdown     |
| GET    | `/analytics/links/:id/devices`      | Device breakdown         |
| GET    | `/analytics/links/:id/referrers`    | Referrer breakdown       |
| GET    | `/analytics/workspace/:id/realtime` | Real-time visitors       |

### QR Codes

| Method | Path                     | Description                  |
| ------ | ------------------------ | ---------------------------- |
| GET    | `/qr-codes`              | List QR codes                |
| POST   | `/qr-codes`              | Generate QR code             |
| GET    | `/qr-codes/:id`          | Get QR code details          |
| DELETE | `/qr-codes/:id`          | Delete QR code               |
| GET    | `/qr-codes/:id/download` | Download image (PNG/SVG/PDF) |

### Domains

| Method | Path                  | Description            |
| ------ | --------------------- | ---------------------- |
| GET    | `/domains`            | List custom domains    |
| POST   | `/domains`            | Add custom domain      |
| POST   | `/domains/:id/verify` | Trigger verification   |
| DELETE | `/domains/:id`        | Remove domain          |
| PATCH  | `/domains/:id`        | Update domain settings |

### API Keys

| Method | Path                   | Description    |
| ------ | ---------------------- | -------------- |
| GET    | `/api-keys`            | List API keys  |
| POST   | `/api-keys`            | Create API key |
| DELETE | `/api-keys/:id`        | Delete API key |
| POST   | `/api-keys/:id/rotate` | Rotate API key |

### Webhooks

| Method | Path                 | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/webhooks`          | List webhook endpoints |
| POST   | `/webhooks`          | Create webhook         |
| PATCH  | `/webhooks/:id`      | Update webhook         |
| DELETE | `/webhooks/:id`      | Delete webhook         |
| POST   | `/webhooks/:id/test` | Send test event        |

### Workspace

| Method | Path                     | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/workspace`             | Get workspace details |
| PATCH  | `/workspace`             | Update workspace      |
| GET    | `/workspace/members`     | List members          |
| POST   | `/workspace/invite`      | Invite member         |
| PATCH  | `/workspace/members/:id` | Update member role    |
| DELETE | `/workspace/members/:id` | Remove member         |
| GET    | `/workspace/activity`    | Recent activity       |

### Billing

| Method | Path                           | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/billing/plan`                | Current plan details  |
| POST   | `/billing/plan`                | Change/upgrade plan   |
| GET    | `/billing/invoices`            | List invoices         |
| GET    | `/billing/invoices/:id`        | Invoice details       |
| GET    | `/billing/payment-methods`     | List payment methods  |
| POST   | `/billing/payment-methods`     | Add payment method    |
| DELETE | `/billing/payment-methods/:id` | Remove payment method |

### Settings

| Method | Path                      | Description               |
| ------ | ------------------------- | ------------------------- |
| GET    | `/settings/profile`       | Get profile               |
| PATCH  | `/settings/profile`       | Update profile            |
| PATCH  | `/settings/password`      | Change password           |
| GET    | `/settings/sessions`      | List active sessions      |
| DELETE | `/settings/sessions/:id`  | End session               |
| GET    | `/settings/notifications` | Get notification prefs    |
| PATCH  | `/settings/notifications` | Update notification prefs |

## Webhook Events

| Event             | Description                  | Payload                    |
| ----------------- | ---------------------------- | -------------------------- |
| `link.created`    | A new link was created       | Link object                |
| `link.updated`    | Link was modified            | Link object (before/after) |
| `link.deleted`    | Link was soft-deleted        | Link ID                    |
| `link.expired`    | Link passed its expiration   | Link object                |
| `click.tracked`   | A link received a click      | Click object               |
| `click.milestone` | Link reached click milestone | Link ID, count             |

## Versioning

- **URI versioning:** `/v1/`, `/v2/`
- **Deprecation header:** `Sunset: Sat, 01 Jan 2027 00:00:00 GMT`
- **Migration window:** 6 months minimum between deprecation and removal
- **Changelog:** Published at `https://developers.nexuslinks.com/changelog`

## OpenAPI Strategy

- Single `openapi.yaml` file in the API package
- Auto-generated TypeScript types via `openapi-typescript`
- API route validation via `@fastify/swagger`
- Developer Portal at `https://developers.nexuslinks.com` (hosted OpenAPI + SDK docs)
- Examples for every endpoint with realistic mock data
