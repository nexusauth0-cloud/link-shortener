# Architecture Decision Records — Nexus Links

> ADRs document important technical decisions and their rationale.

## What is an ADR?

An Architecture Decision Record (ADR) captures a decision that has lasting impact on the codebase, architecture, or process. ADRs help future team members understand _why_ something was done a certain way.

### When to write an ADR

- Choosing a framework or library
- Designing a system boundary or API contract
- Deciding on a data model or migration strategy
- Setting a policy or convention
- Changing an existing decision

### ADR Template

```markdown
# ADR-{NUMBER}: {Title}

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

Why is this decision needed? What constraints or considerations exist?

## Decision

What was decided?

## Consequences

What tradeoffs, risks, or benefits come with this decision?

## Alternatives Considered

What other options were explored? Why were they rejected?
```

---

## ADR-001: Monorepo with pnpm and Turborepo

**Status:** Accepted

### Context

The project includes a React frontend, Fastify backend, shared UI library, and configuration packages. We needed a build system that:

- Supports parallel task execution
- Caches output across developers and CI
- Manages dependency graphs automatically
- Minimizes CI time

### Decision

Use **pnpm workspaces** for package management and **Turborepo** for task orchestration.

### Consequences

- **Positive:** Cached builds reduce CI from ~10min to ~2min on cache hits
- **Positive:** Dependency graph ensures packages build in correct order
- **Positive:** Single source of truth for lint/typecheck/test commands
- **Negative:** Learning curve for team members unfamiliar with monorepos
- **Negative:** Some tooling (eslint, prettier) needs root-level configuration

### Alternatives Considered

| Option                    | Why Rejected                                          |
| ------------------------- | ----------------------------------------------------- |
| Nx                        | More powerful but heavier; Turborepo covers our needs |
| Single repo (no monorepo) | Would require manual coordination between packages    |
| Yarn workspaces           | pnpm has better disk usage and strictness             |

---

## ADR-002: Dark-First Design System with Tailwind v4

**Status:** Accepted

### Context

The product targets developers and marketing teams who work late hours. We wanted a premium aesthetic that differentiates from competitors (Bitly, Rebrandly) while maintaining accessibility.

### Decision

Build a dark-first design system using Tailwind CSS v4 with CSS custom properties for brand tokens. All components live in `packages/ui`.

### Consequences

- **Positive:** Unique visual identity in a crowded market
- **Positive:** CSS custom properties make theming trivial (future light mode)
- **Positive:** Tailwind v4 `@theme` directive gives first-class DX
- **Negative:** Some accessibility edge cases with dark backgrounds need extra attention
- **Negative:** Light mode is a separate effort (deferred to post-MVP)

---

## ADR-003: Mock-First Prototype Architecture

**Status:** Accepted

### Context

We needed to build a complete, navigable application to demonstrate the product vision to investors and early users — before any backend code was written.

### Decision

Build the entire frontend prototype with **all data mocked locally** in `apps/web/src/mock/data.ts`. Every page, route, modal, and interaction works without a server.

### Consequences

- **Positive:** Immediate feedback loop — changes visible in seconds
- **Positive:** Design and product decisions validated before backend investment
- **Positive:** Frontend architecture proven before API contracts are finalized
- **Negative:** Mock data can drift from real API shapes
- **Negative:** Frontend team will need to replace mock calls with API client layer

---

## ADR-004: Framer Motion for All Animations

**Status:** Accepted

### Context

The product spec calls for "premium feel" with page transitions, micro-interactions, and animated data visualizations. We needed a motion library that works with React 19 and supports spring physics.

### Decision

Use **Framer Motion** for all animation in the application. Extract common animation presets into `packages/ui/src/lib/animations.ts` for reuse.

### Consequences

- **Positive:** Consistent animation language (brand easing curve, timing)
- **Positive:** `AnimatePresence` handles enter/exit transitions cleanly
- **Positive:** Spring physics make UI feel natural and responsive
- **Negative:** Adds ~40KB to the vendor bundle (acceptable for the value)
- **Negative:** Reduced motion support requires explicit handling (we do this)

---

## ADR-005: React Router v7 with Flat Route Config

**Status:** Accepted

### Context

The application has ~20 routes across landing, auth, and authenticated app sections. We needed a routing solution that supports nested layouts and lazy loading.

### Decision

Use **React Router v7** with a flat, explicit route configuration in `App.tsx`. Nested routes under `/app` use `<Outlet>` in the AppShell component.

### Consequences

- **Positive:** All routes visible in a single file — easy to understand the navigation map
- **Positive:** Nested `<Outlet>` pattern gives clean separation of shell vs. page content
- **Negative:** As the app grows, we may need to extract route config to a separate file
- **Negative:** No built-in code splitting by route (we handle this with `React.lazy`)

---

## ADR-006: Session-Based Refresh Token Storage in Redis

**Status:** Proposed

### Context

We need a session management system that supports:

- Token revocation (per session, per user)
- Concurrent session limits
- Viewing active sessions from Settings

### Decision

Store refresh token hashes in Redis with a TTL matching the token expiry. Access tokens remain stateless (JWT).

### Consequences

- **Positive:** Immediate revocation — delete the Redis key
- **Positive:** Session listing and management via Redis SCAN
- **Positive:** No DB load for token validation
- **Negative:** Redis becomes a critical dependency — if Redis is down, no one can refresh
- **Negative:** Token statefulness means we lose some JWT benefits

---

## ADR-007: Prisma as ORM with PostgreSQL

**Status:** Accepted

### Context

We needed an ORM that provides type safety, migration management, and good DX for complex queries (especially time-series analytics).

### Decision

Use **Prisma** with **PostgreSQL 16**. Prisma handles migrations, type generation, and query building.

### Consequences

- **Positive:** Full type safety — Prisma generates TypeScript types from schema
- **Positive:** Migration system is robust and well-documented
- **Positive:** PostgreSQL handles our analytics time-series needs well
- **Negative:** Some complex queries need raw SQL (which Prisma supports)
- **Negative:** N+1 queries can sneak in if not careful with relation loading

---

## Template for New ADRs

```markdown
# ADR-{NEXT}: {Title}

## Status

[Proposed | Accepted | Deprecated | Superseded]

## Context

## Decision

## Consequences

## Alternatives Considered
```
