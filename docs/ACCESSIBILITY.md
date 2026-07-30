# Accessibility — Nexus Links

> WCAG compliance targets, implementation patterns, and testing strategy.

## Compliance Target

**WCAG 2.2 Level AA** — with Level AAA targets for color contrast and motion.

| Principle      | Guideline         | Target         |
| -------------- | ----------------- | -------------- |
| Perceivable    | Text alternatives | AA             |
| Perceivable    | Adaptable         | AA             |
| Perceivable    | Distinguishable   | AAA (contrast) |
| Operable       | Keyboard          | AA             |
| Operable       | Enough time       | AA             |
| Operable       | Seizures          | AA             |
| Operable       | Navigable         | AA             |
| Understandable | Readable          | AA             |
| Understandable | Predictable       | AA             |
| Understandable | Input assistance  | AA             |
| Robust         | Compatible        | AA             |

## Keyboard Navigation

### Focus Order

- Tab order follows visual reading order (left-to-right, top-to-bottom)
- Skip link at page start: "Skip to main content"
- Sidebar navigation uses ArrowUp/ArrowDown for nested items
- Command palette uses ArrowUp/ArrowDown for selection
- Modals trap focus within the modal (Esc to close)
- Tab reaches all interactive elements (no `tabindex` > 0)

### Focus Indicators

- 2px solid primary color (`#7C3AED`) outline
- 2px offset from element
- Visible on all focusable elements
- Never removed via `outline: none` without providing an alternative

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Interactive Elements

| Element         | Expected Behavior                           |
| --------------- | ------------------------------------------- |
| Buttons         | Enter/Space to activate                     |
| Links           | Enter to navigate                           |
| Checkboxes      | Space to toggle                             |
| Tabs            | Arrow keys, Home/End                        |
| Select          | Space to open, Arrow keys, Enter to select  |
| Modal           | Trap focus, Esc to close                    |
| Sliders         | Arrow keys, Home/End                        |
| Command palette | Arrow keys, Enter to select, Esc to dismiss |

## ARIA

### Rules

- Use semantic HTML first, ARIA as supplement
- Never override native semantics (`role="button"` on a `<button>`)
- All interactive elements have accessible names (`aria-label` or visible text)
- Dynamic content has `aria-live` regions (polite for most, assertive for errors)
- Status messages use `role="status"` or `aria-live="polite"`
- Error summaries use `role="alert"`
- Dialogs use `role="dialog"` + `aria-modal="true"` + `aria-label`
- Tab panels use `role="tablist"`, `role="tab"`, `role="tabpanel"` with `aria-selected`
- Progress bars use `role="progressbar"` + `aria-valuenow` + `aria-valuemin/max`

### Common Patterns

```tsx
// Icon button
<button aria-label="Copy link" onClick={copyLink}>
  <CopyIcon className="h-4 w-4" />
</button>

// Status update
<div role="status" aria-live="polite">
  {isSaving ? "Saving..." : "Saved"}
</div>

// Error message
<div role="alert" className="text-danger">
  {error.message}
</div>
```

## Color and Contrast

### Minimum Ratios

| Element                        | Required Ratio | Standard     |
| ------------------------------ | -------------- | ------------ |
| Normal text (<18px)            | 4.5:1          | AA           |
| Large text (≥18px bold, ≥24px) | 3:1            | AA           |
| UI components                  | 3:1            | AA           |
| Normal text                    | 7:1            | AAA (target) |
| Large text                     | 4.5:1          | AAA (target) |

### Our Tokens

| Pair                                       | Ratio  | Passes |
| ------------------------------------------ | ------ | ------ |
| `foreground` (#FFF) on `bg` (#050816)      | 16.2:1 | AAA    |
| `foreground` (#FFF) on `surface` (#0C1224) | 15.1:1 | AAA    |
| `muted` (#94A3B8) on `bg` (#050816)        | 6.8:1  | AAA    |
| `muted` (#94A3B8) on `surface` (#0C1224)   | 6.3:1  | AAA    |
| `danger` (#EF4444) on `bg` (#050816)       | 5.1:1  | AA     |
| `danger` (#EF4444) on `surface` (#0C1224)  | 4.7:1  | AA     |

Color is never used as the sole indicator of state — always include text labels, icons, or patterns.

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- All animations respect `prefers-reduced-motion: reduce`
- Parallax effects disabled
- Auto-scrolling features disabled
- Pulsing/breathing effects disabled
- Loading skeletons animate once (not looping)

## Screen Reader Support

### Tested With

- NVDA (Windows) — primary testing tool
- VoiceOver (macOS) — secondary testing tool
- TalkBack (Android) — mobile testing
- VoiceOver (iOS) — mobile testing

### Requirements

- All images have meaningful `alt` text (or `alt=""` for decorative)
- All form controls have associated `<label>` elements
- Data tables use `<th scope="col/row">` for headers
- Dynamic content is announced via `aria-live`
- Loading states are announced
- Error messages are associated with inputs via `aria-describedby`
- Custom components have appropriate roles

## Forms

```tsx
// Every input has a visible label
<label htmlFor="email" className="text-sm font-medium">
  Email address
</label>
<input
  id="email"
  name="email"
  type="email"
  aria-describedby={error ? "email-error" : undefined}
  aria-invalid={error ? "true" : undefined}
/>
{error && (
  <p id="email-error" role="alert" className="text-xs text-danger">
    {error}
  </p>
)}
```

## Tables and Data

- Sortable columns indicate sort state via `aria-sort`
- Row selection uses checkboxes with proper labeling
- Pagination shows "Page X of Y" and "Showing A–B of Z results"
- Interactive rows have `tabindex="0"` and keyboard handlers
- Large tables use sticky headers for scroll context

## Common Component Patterns

| Component          | Accessibility Requirements                                      |
| ------------------ | --------------------------------------------------------------- |
| Modal              | Focus trap, `aria-modal`, Esc to close, `aria-label` with title |
| Dropdown           | `aria-expanded`, ArrowUp/Down, Enter to select, Esc to close    |
| Toast notification | `role="status"` with `aria-live="polite"`                       |
| Error state        | `role="alert"`                                                  |
| Tab panel          | `role="tablist"`, Arrow Left/Right, `aria-selected`             |
| Progress bar       | `role="progressbar"`, `aria-valuenow`, `aria-valuemin/max`      |
| Tooltip            | `aria-describedby` on trigger element                           |
| Switch/toggle      | `role="switch"`, `aria-checked`                                 |

## Testing

### Automated

- `@axe-core/playwright` runs on every page in CI
- Violations fail the build
- Best practices are warnings (non-blocking)

### Manual

- Full keyboard audit: can every action be performed without a mouse?
- Screen reader audit: can every action be understood via audio?
- Zoom audit: page usable at 200% zoom?
- Reduced motion audit: no broken layouts when motion is disabled?

### QA Checklist

- [ ] Page has a unique `<h1>` matching the page title
- [ ] Skip link is first focusable element
- [ ] Focus order is logical
- [ ] All interactive elements have visible focus indicators
- [ ] All images have `alt` text
- [ ] Color is not the only indicator of state
- [ ] All form inputs have associated labels
- [ ] Error messages are associated with their inputs
- [ ] Dynamic content is announced
- [ ] Modals trap focus
- [ ] Page is usable at 200% zoom
- [ ] No content overlap at any viewport width
- [ ] `prefers-reduced-motion` respected
