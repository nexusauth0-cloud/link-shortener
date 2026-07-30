# Brand Identity — Nexus Links

> Full brand guidelines. See also [DESIGN.md](./DESIGN.md) for design-language implementation.

## Logo

### Primary Logo

- **Form:** Abstract constellation node — three intersecting rings with gradient fill
- **Colors:** Purple (`#7C3AED`) to Cyan (`#22D3EE`) gradient
- **Usage:** App icon, favicon, loading screen, primary brand mark

### Logo Variants

| Variant    | Description                            | When to Use                          |
| ---------- | -------------------------------------- | ------------------------------------ |
| Primary    | Full logo with mark + wordmark         | Website header, app shell, marketing |
| Horizontal | Logo + "Nexus Links" side by side      | Social media, email signatures       |
| Symbol     | Constellation mark only (no text)      | Favicon, mobile app icon, avatar     |
| Monochrome | Single-color version                   | Dark backgrounds, print, watermarks  |
| Small      | Compact version for constrained spaces | Topbar, sidebar (collapsed)          |

### Logo Misuse

- Do not recolor the gradient to flat colors
- Do not rotate the constellation mark
- Do not add drop shadows or effects
- Do not place on low-contrast backgrounds
- Minimum clear space: 16px on all sides

## Brand Voice

| Attribute      | Description                                            |
| -------------- | ------------------------------------------------------ |
| Tone           | Confident, warm, precise                               |
| Personality    | The engineer who also gives good presentations         |
| Energy         | Professional but not corporate, smart but not arrogant |
| Target feeling | "This team has thought of everything."                 |

## Writing Style

- **Active voice.** "Create a link" not "Links can be created by..."
- **Short sentences.** One idea per sentence.
- **Technical but accessible.** Define jargon on first use.
- **Use "you"** not "the user."
- **Error messages** are helpful, not blaming.
- **Success messages** are celebratory, not excessive.

### Examples

- ✅ "Your link is ready. Copy it or generate a QR code."
- ✅ "This alias is already taken. Try a variation like `/summer-sale-2026`."
- ❌ "Username must be alphanumeric." → ✅ "Use letters and numbers only."

## Color Usage

| Token              | Color        | Hex       | Usage                           |
| ------------------ | ------------ | --------- | ------------------------------- |
| `bg`               | Dark Navy    | `#050816` | Page backgrounds                |
| `surface`          | Deep Blue    | `#0C1224` | Cards, panels                   |
| `surface-elevated` | Lighter Blue | `#131C34` | Elevated surfaces, hover states |
| `primary`          | Purple       | `#7C3AED` | Actions, links, active states   |
| `secondary`        | Light Purple | `#A855F7` | Secondary accents               |
| `accent`           | Cyan         | `#22D3EE` | Highlights, badges, data viz    |
| `success`          | Green        | `#22C55E` | Positive states                 |
| `warning`          | Amber        | `#F59E0B` | Warning states                  |
| `danger`           | Red          | `#EF4444` | Destructive actions             |
| `foreground`       | White        | `#FFFFFF` | Primary text                    |
| `muted`            | Slate        | `#94A3B8` | Secondary text                  |

## Iconography

- Use **Lucide** for all interface icons
- Consistent 16px for inline, 20px for section headers, 24px for empty states
- Stroke width: 1.5px (default Lucide)
- No filled variants — outline only
- Custom illustrations use the same stroke style as Lucide for consistency

## Naming Conventions

### Product

- **Nexus Links** (two words, capitalized)
- **nexuslinks** (single word, lowercase — domains, social handles)
- Never abbreviate to "NL" or "NX"

### Features

- **Link Studio** (not "Link Creator" or "Create Link")
- **Developer Hub** (not "Developers" or "API Dashboard")
- **Smart Slugs** (AI-powered alias suggestions)
- **Intelligence Panel** (AI insights panel in Link Studio)

## Social Media Identity

| Platform  | Handle        | Bio                                                                               |
| --------- | ------------- | --------------------------------------------------------------------------------- |
| X/Twitter | `@nexuslinks` | Intelligent link management for teams. API-first, AI-powered, privacy-respecting. |
| GitHub    | `nexuslinks`  | Open-source SDKs and community tools                                              |
| LinkedIn  | `Nexus Links` | Enterprise-grade link infrastructure                                              |

## Open Graph

- **OG image:** Gradient purple-to-cyan background with centered constellation mark
- **Title format:** `{page title} — Nexus Links`
- **Description:** 120–155 characters, includes value proposition
- **No branding overlays on OG images** — clean, minimal aesthetic
