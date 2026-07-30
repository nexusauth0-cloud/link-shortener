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
pnpm --filter @nexuslinks/api prisma generate

# 6. Run database migrations
pnpm --filter @nexuslinks/api prisma db push

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

## Project Structure

```
link-shortener/
├── apps/
│   ├── web/          # React + Vite frontend
│   └── api/          # Fastify backend
├── packages/
│   ├── ui/           # Shared UI components
│   ├── shared/       # Shared types & utilities
│   └── config/       # Shared configs (TS, ESLint)
├── prisma/           # Prisma schema
├── docker/           # Docker Compose configs
└── .github/          # CI workflows
```

## Docker Services

| Service    | Port | Credentials                      |
| ---------- | ---- | -------------------------------- |
| PostgreSQL | 5432 | `nexus` / `nexus`                |
| pgAdmin    | 5050 | `admin@nexuslinks.dev` / `admin` |
