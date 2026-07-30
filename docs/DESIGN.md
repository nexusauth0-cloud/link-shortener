# Design Language — Nexus Links

> Design-system tokens and principles. See [BRAND.md](./BRAND.md) for brand identity and logo usage.

## Design Philosophy

**Dark-first, glass-based, motion-native.** Every surface suggests depth through blur and light. Every transition communicates intent. The interface feels like a living dashboard, not a static page.

## Color System

### Theme Tokens

| Token                      | Hex                      | Role                         |
| -------------------------- | ------------------------ | ---------------------------- |
| `--color-bg`               | `#050816`                | Deep space background        |
| `--color-surface`          | `#0C1224`                | Card and panel surface       |
| `--color-surface-elevated` | `#131C34`                | Hover, elevated, modal       |
| `--color-primary`          | `#7C3AED`                | Actions, active nav, CTAs    |
| `--color-secondary`        | `#A855F7`                | Secondary accent             |
| `--color-accent`           | `#22D3EE`                | Data viz, highlights         |
| `--color-success`          | `#22C55E`                | Success states               |
| `--color-warning`          | `#F59E0B`                | Warning states               |
| `--color-danger`           | `#EF4444`                | Destructive actions          |
| `--color-info`             | `#3B82F6`                | Informational                |
| `--color-foreground`       | `#FFFFFF`                | Primary text                 |
| `--color-muted`            | `#94A3B8`                | Secondary text, placeholders |
| `--color-border`           | `rgba(255,255,255,0.08)` | Default borders              |
| `--color-border-hover`     | `rgba(255,255,255,0.12)` | Hover borders                |
| `--color-border-active`    | `rgba(255,255,255,0.16)` | Active/focus borders         |

### Gradient Direction

- Primary gradient: `from-primary to-secondary` (purple → light purple)
- Brand gradient: `from-primary to-accent` (purple → cyan)
- Accent gradient: `from-accent to-primary` (cyan → purple)

## Typography

### Font Stack

```
Inter (variable), system-ui, -apple-system, sans-serif
```

Monospace for code and data:

```
JetBrains Mono (variable), 'Fira Code', monospace
```

### Type Scale

| Token      | Size                            | Line Height | Weight | Usage                |
| ---------- | ------------------------------- | ----------- | ------ | -------------------- |
| `hero`     | clamp(3.5rem, 9vw, 5.5rem)      | 1.05        | 700    | Landing page hero    |
| `display`  | clamp(2.5rem, 6vw, 4rem)        | 1.1         | 700    | Section headers      |
| `heading`  | clamp(2rem, 4vw, 3rem)          | 1.2         | 600    | Page titles          |
| `title`    | clamp(1.5rem, 3vw, 2.25rem)     | 1.25        | 600    | Subheaders           |
| `subtitle` | clamp(1.125rem, 1.5vw, 1.35rem) | 1.5         | 500    | Section descriptions |
| `body`     | 1rem                            | 1.6         | 400    | Body text            |
| `small`    | 0.875rem                        | 1.5         | 400    | Secondary text       |
| `caption`  | 0.75rem                         | 1.4         | 500    | Labels, metadata     |

### Letter Spacing

- Tight (`-0.03em`): large headers (hero, display, heading)
- Normal (`0em`): body, small
- Wide (`0.02em`): uppercase labels
- Wider (`0.05em`): All-caps section headers

## Spacing

| Token           | Value | Usage                    |
| --------------- | ----- | ------------------------ |
| `--spacing-xs`  | 4px   | Inline icon gaps         |
| `--spacing-sm`  | 8px   | Related elements         |
| `--spacing-md`  | 12px  | Described element groups |
| `--spacing-lg`  | 16px  | Unrelated elements       |
| `--spacing-xl`  | 24px  | Section inner padding    |
| `--spacing-2xl` | 32px  | Section gaps             |
| `--spacing-3xl` | 48px  | Page sections            |
| `--spacing-4xl` | 64px  | Major sections           |

## Radius

| Token          | Value | Usage                |
| -------------- | ----- | -------------------- |
| `--radius-sm`  | 6px   | Inputs, small badges |
| `--radius-md`  | 8px   | Buttons, cards       |
| `--radius-lg`  | 12px  | Modals, panels       |
| `--radius-xl`  | 16px  | Large containers     |
| `--radius-2xl` | 20px  | Hero sections        |

## Shadows and Glass

### Glass Effect

```css
.glass {
  background: color-mix(in srgb, var(--color-surface) 70%, transparent);
  backdrop-filter: blur(20px);
  border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
}
```

### Glow Effects

```css
.glow-primary {
  box-shadow:
    0 0 30px color-mix(in srgb, var(--color-primary) 20%, transparent),
    0 0 60px color-mix(in srgb, var(--color-primary) 10%, transparent);
}
```

## Motion Language

### Principles

1. **Purposeful.** Every animation communicates a state change.
2. **Fast.** UI animations complete in 150–300ms.
3. **Natural.** Use spring physics for enter, subtle easing for exit.
4. **Reduced motion.** Respect `prefers-reduced-motion` at all times.

### Timing

| Motion           | Duration  | Easing                               |
| ---------------- | --------- | ------------------------------------ |
| Page transitions | 300ms     | `cubic-bezier(0.16, 1, 0.3, 1)`      |
| Modal enter      | 200ms     | Spring (stiffness: 400, damping: 30) |
| Modal exit       | 150ms     | Ease-out                             |
| Dropdowns        | 150ms     | `cubic-bezier(0.16, 1, 0.3, 1)`      |
| Hover            | 200ms     | Ease-in-out                          |
| Loading skeleton | 2s (loop) | Ease-in-out                          |

### Entry Patterns

| Pattern            | Usage                           | Properties                      |
| ------------------ | ------------------------------- | ------------------------------- |
| `fadeInUp`         | Cards, sections after page load | y: 24 → 0, opacity: 0 → 1       |
| `fadeIn`           | Overlay content                 | opacity: 0 → 1                  |
| `scaleIn`          | Modals, dialogs                 | scale: 0.95 → 1, opacity: 0 → 1 |
| `slideInRight`     | Side panels                     | x: 20 → 0                       |
| `stagger`          | Lists of children               | Each child delayed by 40ms      |
| `counterAnimation` | Number changes                  | Opacity and y translate         |

## Responsive Breakpoints

| Breakpoint | Width       | Layout Changes                     |
| ---------- | ----------- | ---------------------------------- |
| Mobile     | <640px      | Single column, stacked nav         |
| Tablet     | 640–1024px  | 2-column, collapsed sidebar        |
| Desktop    | 1024–1440px | Full layout, expanded sidebar      |
| Wide       | >1440px     | Max-width containers, multi-column |

## Component Principles

1. **Every component has a single responsibility.**
2. **Every component handles loading, empty, error, and success states.**
3. **Every interactive element has a focus ring.** (2px solid primary, 2px offset)
4. **No hardcoded colors.** All color references through CSS custom properties.
5. **Support reduced motion.** Wrap animations in `@media (prefers-reduced-motion: reduce)`.

## Accessibility Rules

- All interactive elements are keyboard accessible
- Focus order matches visual order
- Color is never the sole indicator of state
- Text contrast exceeds WCAG AA (4.5:1 normal, 3:1 large)
- Form inputs have associated labels
- Icon buttons have `aria-label`
- Images have meaningful `alt` text

## Motion Language Detail

```typescript
// Brand easing curve
const brandEasing: [number, number, number, number] = [0.16, 1, 0.3, 1]
// Spring for enter animations
const springTransition = { type: 'spring', stiffness: 400, damping: 30 }
// Fast exit
const fastTransition = { duration: 0.15, ease: 'easeOut' }
```

## Illustration Style

- **Geometric, vector-based** — no raster illustrations
- **Gradient fills** using brand palette (purple → cyan)
- **Minimal detail** — communicate the idea, not a scene
- **Consistent stroke weight** — 2px for all illustrated elements
- **Dark background preferred** — illustrations are designed for the dark theme
