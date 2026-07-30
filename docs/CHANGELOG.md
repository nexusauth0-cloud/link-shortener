# Changelog — Nexus Links

> All notable changes to Nexus Links. Follows [Keep a Changelog](https://keepachangelog.com/) format.

## [Unreleased]

### Added

- Interactive prototype: Analytics page with SVG charts, filters, and real-time visitor panel
- Interactive prototype: QR Studio with color pickers, patterns, frame styles, and export dialog
- Interactive prototype: Developer Hub with API keys, webhooks, SDK examples, and API playground
- Interactive prototype: Workspace page with team member management and activity feed
- Interactive prototype: Settings page with profile, appearance, notifications, and security tabs
- Interactive prototype: Billing page with plan overview, usage meters, invoices, and payment methods
- Complete mock data system (users, links, analytics, team, billing, notifications)
- All app routes wired to real page components (8 new pages)

### Changed

- App.tsx: replaced 6 placeholder routes with full page implementations
- Navigation: all sidebar and command palette routes now point to real pages

### Fixed

- Badge variant types aligned with design system (removed `secondary` references)
- Avatar component API matches package interface (`initials` prop)
- Workspace member state type widened to avoid discriminated union conflicts
- Lint warnings: unused imports removed across all new pages

## [0.2.0] — 2026-07-25

### Added

- Brand identity system: BRAND.md, 5-variant Logo component, AppIcon, BrandIllustration
- Expanded animation library: 18 Framer Motion presets with brand easing curves
- Loading screen with animated constellation node
- 404 Not Found page with brand illustration
- OG image template
- CSS tokens: 17 color variables, 14 keyframes, glass/glow/noise utility classes
- BrandIllustration component (5 variants: hero, analytics, qr, links, dashboard)
- EmptyStateIllustration component (5 variants: links, analytics, qr, search, general)

### Changed

- Refined design tokens: adjusted color palette, added font-size clamp functions
- Index.css: consolidated all keyframes and utility classes into single file
- Logo component: extracted to shared `@nexuslinks/ui` package

## [0.1.0] — 2026-07-20

### Added

- Landing page: all 12 sections (Hero, URL Demo, Live Metrics, Analytics, Features, World Map, Developer, Pricing, Testimonials, FAQ, CTA, Footer)
- Authentication pages: login, register, forgot password, reset password, verify email, 2FA, invite, auth success, auth error
- Authentication components: AuthLayout, AuthCard, PasswordStrength, OAuthButtons, VerificationCodeInput, AuthIllustration
- App shell: AppShell, Sidebar (collapsible with nested menus), Topbar (sticky glass with search/notifications/user menu)
- Shell components: CommandPalette (Ctrl+K), GlobalSearch, NotificationPanel, UserMenu, WorkspaceSwitcher
- State components: EmptyState, ErrorState, Skeleton, LoadingScreen, PageLayout, PageHeader
- Link Studio: 3-panel split layout (CreateLinkPanel, PreviewPanel, IntelligencePanel)
- Link Studio components: AnimatedInput, ProgressScore, SuggestionCard, CopyButton, ShareButton, LinkPreviewCard
- Dashboard page with stat cards
- Tailwind v4 theme with 17 brand color tokens, glass/glow/noise utilities
- Shared UI package: Button, Input, Badge, Card, Modal, Avatar, Spinner, Tooltip, Divider, Grid, Chip, Text, Container, Section, Glow, GradientBackground
- Monorepo setup with Turborepo, pnpm workspaces
- Initial documentation: README

### Architecture

- React 19 + TypeScript 5 + Vite 6
- Tailwind CSS v4 with `@theme` directive
- Framer Motion for all animations
- React Router v7 for routing
- Zod for validation schemas
- No backend — all data mocked locally
