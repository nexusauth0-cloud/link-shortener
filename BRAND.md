# Nexus Links — Brand Guidelines

**Version 1.0** · July 2026

---

## Mission

Give every link on the internet the power of a full analytics platform.

## Vision

A world where every shared link is measurable, brandable, and intelligent.

## Brand Philosophy

Nexus Links exists at the intersection of **developer tooling** and **consumer-grade design**. We believe infrastructure should feel premium. We ship for the engineer who cares about typography, the marketer who demands real-time data, and the designer who notices the 0.5s animation curve.

**Three pillars:**

- **Radical clarity** — No feature should need a manual.
- **Deliberate craft** — Every pixel, every transition, every micro-interaction is intentional.
- **Quiet confidence** — We don't shout. We perform.

---

## Voice & Tone

| Context        | Tone                                                              |
| -------------- | ----------------------------------------------------------------- |
| UI copy        | Short, direct, human. No "leverage", "synergize", "utilize"       |
| Error messages | Helpful, not blameful. "Something went wrong" not "Invalid input" |
| Empty states   | Encouraging, actionable. "Create your first link"                 |
| Marketing      | Confident, technical, minimal adjectives                          |
| Documentation  | Precise, example-driven, developer-first                          |

**Never:** corporate buzzwords, emoji in UI, exclamation marks in error states, generic AI language.

---

## Logo System

### Primary Logo

The Nexus Links mark is an abstract **constellation node** — three intersecting rings forming a nexus point. It represents connection, network flow, and the center of a distributed system.

```
[SVG: Three overlapping rings with gradient fill]
```

**Clear space:** Minimum 50% of the logo height on all sides.

**Minimum size:** 32px (symbol only), 120px (horizontal lockup).

### Logo Variants

| Variant        | Usage                                                    |
| -------------- | -------------------------------------------------------- |
| **Primary**    | Dark backgrounds. Full gradient (primary → accent).      |
| **Horizontal** | Top nav, email headers. Symbol + "Nexus Links" wordmark. |
| **Symbol**     | Favicon, app icon, avatar, loading states.               |
| **Monochrome** | One-color applications, print, embossing.                |
| **Small**      | 24px and below. Simplified geometry.                     |

### Don'ts

- Do not stretch, skew, or rotate the mark.
- Do not apply drop shadows.
- Do not place on busy backgrounds without the glass utility.
- Do not replace the symbol with a generic link chain icon.

---

## Color System

### Base Palette

| Token                      | Hex                      | Usage                      |
| -------------------------- | ------------------------ | -------------------------- |
| `--color-bg`               | `#050816`                | Page backgrounds           |
| `--color-surface`          | `#0C1224`                | Cards, sidebars, dropdowns |
| `--color-surface-elevated` | `#131C34`                | Modals, hover states       |
| `--color-foreground`       | `#FFFFFF`                | Primary text               |
| `--color-muted`            | `#94A3B8`                | Secondary text, labels     |
| `--color-border`           | `rgba(255,255,255,0.08)` | Dividers, card outlines    |

### Accent Palette

| Token               | Hex       | Usage                                       |
| ------------------- | --------- | ------------------------------------------- |
| `--color-primary`   | `#7C3AED` | Buttons, links, active states, primary CTAs |
| `--color-secondary` | `#A855F7` | Secondary actions, hover accents            |
| `--color-accent`    | `#22D3EE` | Highlights, badges, data viz                |
| `--color-success`   | `#22C55E` | Positive metrics, confirmations             |
| `--color-warning`   | `#F59E0B` | Expiration warnings, attention              |
| `--color-danger`    | `#EF4444` | Errors, destructive actions                 |

### Alpha Values

| Token        | Value                    | Usage                         |
| ------------ | ------------------------ | ----------------------------- |
| Primary / 10 | `rgba(124,58,237,0.10)`  | Active nav, subtle highlights |
| Primary / 20 | `rgba(124,58,237,0.20)`  | Hover overlays                |
| Surface / 60 | `rgba(12,18,36,0.60)`    | Glass backgrounds             |
| Border / 10  | `rgba(255,255,255,0.01)` | Subtle structural lines       |

---

## Gradients

### Signature: Aurora

```
background: linear-gradient(135deg, #7C3AED 0%, #22D3EE 100%)
```

Used for: Logo, primary buttons, active indicators, app icon.

### Secondary: Dusk

```
background: linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)
```

Used for: Secondary CTAs, badge fills.

### Mesh

```
background:
  radial-gradient(ellipse at 30% 20%, rgba(124,58,237,0.12) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 10%, rgba(34,211,238,0.06) 0%, transparent 40%),
  radial-gradient(ellipse at 50% 90%, rgba(168,85,247,0.06) 0%, transparent 40%)
```

Used for: Auth layout, hero sections, shell background.

### Glass

```
background: color-mix(in srgb, var(--color-surface) 70%, transparent);
backdrop-filter: blur(20px);
border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
```

---

## Typography

### Font Stack

**Headings / Display:** `Inter`, `SF Pro Display`, system sans-serif
**Body / UI:** `Inter`, `SF Pro Text`, system sans-serif
**Code:** `JetBrains Mono`, `SF Mono`, `Fira Code`, monospace

### Type Scale

| Token      | Size     | Weight | Line Height | Tracking | Usage              |
| ---------- | -------- | ------ | ----------- | -------- | ------------------ |
| Display XL | 5.5rem   | 700    | 1.05        | -0.03em  | Hero headline      |
| Display L  | 4rem     | 700    | 1.1         | -0.03em  | Section hero       |
| Heading 1  | 3rem     | 700    | 1.2         | -0.03em  | Page titles        |
| Heading 2  | 2.25rem  | 700    | 1.25        | -0.02em  | Section headings   |
| Heading 3  | 1.5rem   | 600    | 1.3         | -0.01em  | Card titles        |
| Body L     | 1.125rem | 400    | 1.5         | 0        | Lead paragraphs    |
| Body       | 1rem     | 400    | 1.6         | 0        | Default UI text    |
| Small      | 0.875rem | 500    | 1.5         | 0        | Input labels, meta |
| Caption    | 0.75rem  | 500    | 1.4         | +0.02em  | Badges, timestamps |

### Line Length

- Body text: 65–75 characters
- UI labels: 20–30 characters
- Code: unlimited (scroll)

---

## Spacing System

### Scale

| Token   | Rem     | Px   | Usage                          |
| ------- | ------- | ---- | ------------------------------ |
| Space 1 | 0.25rem | 4px  | Icons, gaps in inline elements |
| Space 2 | 0.5rem  | 8px  | Input padding, small gaps      |
| Space 3 | 0.75rem | 12px | Button padding, card padding   |
| Space 4 | 1rem    | 16px | Section padding, form spacing  |
| Space 5 | 1.5rem  | 24px | Card padding, modal padding    |
| Space 6 | 2rem    | 32px | Major sections                 |
| Space 7 | 3rem    | 48px | Page sections                  |
| Space 8 | 4rem    | 64px | Hero spacing                   |
| Space 9 | 6rem    | 96px | Large page sections            |

### Layout

- Max content width: 1200px
- Sidebar collapsed: 64px
- Sidebar expanded: 224px
- Topbar height: 56px

---

## Motion Language

### Duration Tokens

| Token      | ms  | Usage                               |
| ---------- | --- | ----------------------------------- |
| Instant    | 100 | Hover states, color transitions     |
| Fast       | 150 | Dropdowns, tooltips, small elements |
| Medium     | 200 | Modals, sidebar collapse            |
| Slow       | 300 | Page transitions, card entrances    |
| Expressive | 500 | Hero animations, onboarding         |

### Easing Curves

| Token           | Curve                                             | Usage                      |
| --------------- | ------------------------------------------------- | -------------------------- |
| **Default**     | `cubic-bezier(0.16, 1, 0.3, 1)`                   | UI motion, cards, modals   |
| **Ease out**    | `cubic-bezier(0, 0, 0.2, 1)`                      | Elements entering viewport |
| **Ease in out** | `cubic-bezier(0.4, 0, 0.2, 1)`                    | Accordion, drawer          |
| **Spring**      | `{ type: "spring", stiffness: 400, damping: 30 }` | Micro-interactions         |

### Animation Principles

1. **Purposeful** — Every animation serves a function. No decoration.
2. **Fast** — UI animations complete in < 300ms. Never make the user wait.
3. **Consistent** — Same easing, same duration for similar interactions.
4. **Subtle** — Low opacity changes (0 → 1), small Y translations (8–24px).
5. **Reduced motion** — Respect `prefers-reduced-motion: reduce`.

### Reusable Variants

| Variant        | Properties                                          |
| -------------- | --------------------------------------------------- |
| `fadeIn`       | `opacity: 0 → 1`, `duration: 0.3`                   |
| `fadeInUp`     | `opacity: 0 → 1, y: 20 → 0`, `duration: 0.4`        |
| `scaleIn`      | `opacity: 0 → 1, scale: 0.96 → 1`, `duration: 0.15` |
| `slideInRight` | `x: 20 → 0`, `duration: 0.2`                        |
| `stagger`      | Children stagger by `0.04s` each                    |

---

## Illustration Style

Nexus Links does not use stock illustrations. Every visual is built from the design system itself:

- **Glass cards** with backdrop blur
- **Abstract geometric nodes** (circles, arcs, connection lines)
- **Analytics widgets** (mini charts, stats, progress bars)
- **Connection lines** between nodes (SVG paths with dash animation)
- **Floating UI elements** (cards hovering with shadow)
- **Particle fields** (subtle, slow-moving dots)
- **Light streaks** (diagonal gradient lines)

### Illustration Principles

- Dark background. Always.
- Purple → cyan gradient for active elements.
- Static elements use `opacity: 0.06–0.15`.
- No photographic elements.
- No cartoon characters.
- No literal link chain imagery.

---

## Component Principles

| Principle           | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| **Glass first**     | Cards, modals, sidebars use `background: surface/60 + backdrop-blur-xl`     |
| **No borders**      | Avoid explicit `border` classes. Use subtle `bg-border/10` dividers instead |
| **Purple glow**     | Active elements have a subtle `shadow-primary/20`                           |
| **Keyboard first**  | Every interactive element must be keyboard accessible                       |
| **Dark only**       | No light mode. Every component ships dark-only                              |
| **Rounded corners** | `12px` (xl) for cards, `8px` (lg) for buttons, `4px` (sm) for badges        |

---

## Brand Assets

| Asset          | Format    | Size      | Location                  |
| -------------- | --------- | --------- | ------------------------- |
| App Icon       | SVG       | 1024×1024 | `brand/app-icon.svg`      |
| Favicon        | SVG       | 32×32     | `brand/favicon.svg`       |
| OG Image       | PNG       | 1200×630  | `brand/og-image.png`      |
| Social Avatar  | SVG       | 400×400   | `brand/social-avatar.svg` |
| Loading Screen | Component | —         | Shell loading state       |
| 404 Page       | Component | —         | Routes to `/404`          |

---

## File Structure

```
brand/
├── BRAND.md                    # This document
├── app-icon.svg                # App icon (1024x1024)
├── favicon.svg                 # Favicon (32x32)
├── social-avatar.svg           # Social media avatar
├── og-template.tsx             # OG image component
└── assets/
    ├── logo-primary.svg
    ├── logo-horizontal.svg
    ├── logo-symbol.svg
    └── logo-monochrome.svg
```
