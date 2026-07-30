# Nexus Links

Fast, modern URL shortener built with React, Fastify, Prisma, and PostgreSQL.

## Stack

| Layer    | Technology                      |
| -------- | ------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend  | Fastify 5, TypeScript           |
| Database | PostgreSQL 16 via Prisma        |
| Infra    | Docker Compose, pnpm, Turbo     |

## Prerequisites

- Node.js >= 20
- pnpm >= 10
- Docker & Docker Compose (for PostgreSQL)

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/nexusauth0-cloud/link-shortener.git
cd link-shortener

# 2. Install dependencies
pnpm install

# 3. Start PostgreSQL
docker compose -f docker/docker-compose.yml up -d

# 4. Copy environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 5. Generate Prisma client
pnpm --filter @nexuslinks/api exec prisma generate

# 6. Run database migrations
pnpm --filter @nexuslinks/api exec prisma db push

# 7. Start development servers
pnpm dev
```

This starts both the API (http://localhost:3001) and web (http://localhost:5173) simultaneously.

## Scripts

| Script           | Description                    |
| ---------------- | ------------------------------ |
| `pnpm dev`       | Start all services in dev mode |
| `pnpm build`     | Build all packages             |
| `pnpm lint`      | Lint all packages              |
| `pnpm format`    | Format code with Prettier      |
| `pnpm typecheck` | Run TypeScript checks          |

## API

Base URL: `http://localhost:3001/api/v1`

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | `/health`      | Health check    |
| GET    | `/api/v1/health` | Health check |

### Health Response

```json
{
  "status": "ok",
  "service": "nexus-links-api",
  "version": "0.1.0",
  "environment": "development",
  "uptime": 123,
  "timestamp": "2026-07-30T15:00:00.000Z"
}
```

### Swagger

Interactive API documentation is available at `http://localhost:3001/docs`.

## Project Structure

```
link-shortener/
├── apps/
│   ├── web/              # React + Vite frontend
│   └── api/              # Fastify backend
│       └── src/
│           ├── config/   # Environment validation (Zod)
│           ├── plugins/  # Fastify plugins (Prisma, CORS, Helmet, etc.)
│           ├── routes/   # Route definitions
│           ├── controllers/  # Request handlers
│           ├── services/     # Business logic
│           ├── repositories/ # Data access
│           ├── schemas/      # Request/response schemas
│           ├── middlewares/  # Error handler, auth
│           ├── errors/       # Custom error classes
│           ├── types/        # Shared types
│           └── utils/        # Utilities
├── packages/
│   ├── ui/              # Shared UI components
│   ├── shared/          # Shared types & utilities
│   └── config/          # Shared configs (TS, ESLint)
├── prisma/              # Prisma schema
├── docker/              # Docker Compose configs
└── .github/             # CI workflows
```

## Docker Services

| Service    | Port | Credentials                      |
| ---------- | ---- | -------------------------------- |
| PostgreSQL | 5433 | `nexus` / `nexus`                |
| pgAdmin    | 5050 | `admin@nexuslinks.dev` / `admin` |
