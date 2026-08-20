# DigitallyDefined Page Template Guide

## Overview

This guide ensures all pages on the DigitallyDefined platform maintain consistent brand aesthetics following our **Soft Brutalism** design language.

---

## Quick Start

1. **Copy the template**: Duplicate `src/pages/PageTemplate.jsx` when creating a new page
2. **Replace placeholder content** with your actual content
3. **Keep the structure**: Maintain the section classes for consistent styling
4. **Add to router**: Register your new page in your routing configuration

---

## Brand Aesthetic Guidelines

### Visual Principles

- **Sharp edges only** — No rounded corners (`border-radius: 0`)
- **Bold borders** — 1px solid black (#000) on all major elements
- **High contrast** — Black text on cream/white, white text on dark sections
- **Geometric language** — Flat, abstract, no human silhouettes or forms
- **No gradients** — Solid colors only
- **Minimal shadows** — Hard-edged shadows only (no blur)

### Color Palette

| Name | Hex Code | Usage |
|------|----------|-------|
| Cream (Background) | `#FFFCF9` | Default page background |
| White (Surface) | `#FFFFFF` | Cards, content blocks |
| Ink (Text) | `#111111` | Primary text, borders |
| Orange (Accent) | `#F18B25` | CTAs, highlights, labels |
| Blue (Secondary) | `#47B7D4` | Secondary accents, info |
| Red (Alerts) | `#8B1A0A` | Error states only |

### Typography

- **Headings**: Inter font, weight 800-900, tight letter-spacing (-0.03em to -0.05em)
- **Body**: DM Sans, weight 400-500, line-height 1.6-1.7
- **Labels/Eyebrows**: Uppercase, bold (900), wide letter-spacing (0.12em), small (0.66-0.72rem)

---

## Section Components

### 1. Page Hero (`page-hero`)

The top section of every page. Two variants available:

```jsx
// Standard hero (cream background)
<section className="page-hero">
  <span className="label label--orange">Your label</span>
  <h1>Your headline</h1>
  <p>Lead paragraph</p>
  <div className="action-row">
    <a href="/link" className="btn btn--primary">CTA →</a>
  </div>
</section>

// Dark variant (ink background)
<section className="page-hero page-hero--ink">
  {/* same structure */}
</section>
```

### 2. Story Sections

Main content blocks with alternating backgrounds:

```jsx
// Cream background
<section className="story-section story-section--cream">
  <div className="story-heading">
    <span className="label label--blue">Label</span>
    <h2>Heading</h2>
    <p>Supporting text</p>
  </div>
  {/* content */}
</section>

// White background
<section className="story-section story-section--white">
  {/* same structure */}
</section>

// Dark/Ink background (white text)
<section className="story-section story-section--ink">
  {/* same structure */}
</section>
```

### 3. Grid Layouts

**Three-column grid:**
```jsx
<div className="story-grid story-grid--three">
  <article className="story-card">
    <span className="story-card__number">01</span>
    <h3>Title</h3>
    <p>Description</p>
  </article>
  {/* repeat */}
</div>
```

**Four-column grid:**
```jsx
<div className="story-grid story-grid--four">
  {/* cards */}
</div>
```

**Card variants:**
- `story-card` — default white
- `story-card--blue` — blue background
- `story-card--orange` — orange background

### 4. Split Story Layout

Two-column layout with text on left, visual/content on right:

```jsx
<div className="split-story">
  <div className="story-heading story-heading--left">
    {/* left column content */}
  </div>
  <div className="advantage-list">
    {/* right column content */}
  </div>
</div>
```

### 5. Asset Grid

Bordered grid for showcasing digital asset types:

```jsx
<div className="asset-grid">
  <article className="asset-card">
    <span>PROPERTY 01</span>
    <h3>Asset Type</h3>
    <p>Description</p>
  </article>
  {/* repeat */}
</div>
```

### 6. Expectation Strip

Three-column orange strip for "What this is/is not":

```jsx
<section className="expectation-strip">
  <div>
    <strong>What this is</strong>
    <p>Description</p>
  </div>
  <div>
    <strong>What this is not</strong>
    <p>Description</p>
  </div>
  <div>
    <strong>What comes next</strong>
    <p>Description</p>
  </div>
</section>
```

### 7. Ticker Strip

Blue horizontal strip for principles/taglines:

```jsx
<section className="ticker">
  <span>PRINCIPLE ONE</span>
  <span>PRINCIPLE TWO</span>
  <span>PRINCIPLE THREE</span>
</section>
```

### 8. Legacy Section

Blue background section for mission/vision statements:

```jsx
<section className="legacy-section">
  <div className="legacy-section__copy">
    <span className="label label--orange">Label</span>
    <h2>Mission statement</h2>
    <p>Supporting text</p>
  </div>
  <div className="legacy-stack">
    <div>
      <span>01</span>
      <strong>Step Name</strong>
      <small>Brief description</small>
    </div>
    {/* repeat */}
  </div>
</section>
```

### 9. Final CTA

Black background final call-to-action:

```jsx
<section className="final-cta">
  <span className="label label--blue">Label</span>
  <h2>Final CTA headline</h2>
  <div className="action-row">
    <a href="/link" className="btn btn--outline">Action 1 →</a>
    <a href="/link" className="btn btn--primary btn--large">Action 2 →</a>
  </div>
  <p className="microcopy">Small print or reassurance</p>
</section>
```

---

## Button Classes

```jsx
// Primary button (orange background)
<a href="/link" className="btn btn--primary">Button Text</a>

// Outline button (transparent with border)
<a href="/link" className="btn btn--outline">Button Text</a>

// Dark button (black background)
<a href="/link" className="btn btn--dark">Button Text</a>

// Light button (white background)
<a href="/link" className="btn btn--light">Button Text</a>

// Small variant
<a href="/link" className="btn btn--primary btn--sm">Button Text</a>

// Large variant
<a href="/link" className="btn btn--primary btn--large">Button Text</a>
```

---

## Label Classes

```jsx
// Orange label
<span className="label label--orange">Label Text</span>

// Blue label
<span className="label label--blue">Label Text</span>
```

---

## Common Patterns

### Path/Step List

```jsx
<div className="path-list">
  {steps.map(([number, title, copy, href, cta]) => (
    <article className="path-step" key={number}>
      <span className="path-step__number">{number}</span>
      <div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <a href={href} className="btn btn--primary">{cta} →</a>
    </article>
  ))}
</div>
```

### Advantage List

```jsx
<div className="advantage-list">
  {advantages.map(([title, copy], index) => (
    <div className="advantage-row" key={title}>
      <span>{String(index + 1).padStart(2, '0')}</span>
      <div>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
    </div>
  ))}
</div>
```

### Philosophy Strip

```jsx
<section className="philosophy-strip">
  <span>PRINCIPLE ONE</span><i aria-hidden="true">•</i>
  <span>PRINCIPLE TWO</span><i aria-hidden="true">•</i>
  <span>PRINCIPLE THREE</span><i aria-hidden="true">•</i>
  <span>PRINCIPLE FOUR</span>
</section>
```

---

## System Diagram

For showing workflows or processes:

```jsx
<div className="system-diagram">
  <div className="system-node system-node--orange">
    <small>YOU</small>
    <strong>Your role</strong>
  </div>
  <div className="system-arrow">↓</div>
  <div className="system-node system-node--black">
    <small>AI ASSISTANCE</small>
    <strong>What AI does</strong>
  </div>
  <div className="system-arrow">↓</div>
  <div className="system-node system-node--blue">
    <small>AUTOMATION</small>
    <strong>Automated systems</strong>
  </div>
</div>
```

Node variants:
- `system-node--orange` — orange background
- `system-node--blue` — blue background
- `system-node--black` — black background (white text)

---

## Voice & Tone Guidelines

### Do:
- ✅ Be direct and practical
- ✅ Focus on actionable outcomes
- ✅ Acknowledge real challenges (caregiving, career gaps, retirement anxiety)
- ✅ Emphasize privacy and faceless strategies
- ✅ Use "you" and "your" to address the reader
- ✅ Keep sentences clear and concise

### Don't:
- ❌ Use hype or get-rich-quick language
- ❌ Promise overnight success or income guarantees
- ❌ Demand constant visibility or social media presence
- ❌ Talk down to the audience
- ❌ Use vague motivational platitudes

### Example Voice:
> "You do not need another pile of ideas. You need a sequence that respects your time, privacy, experience, and actual financial goal."

---

## File Structure

```
src/
├── pages/
│   ├── PageTemplate.jsx    ← Copy this for new pages
│   ├── Home.jsx
│   ├── About.jsx
│   └── ...
├── components/
│   ├── Layout/
│   │   └── SiteLayout.jsx  ← Wraps all pages with nav + footer
│   ├── BrandNav.jsx        ← Navigation component
│   ├── BrandFooter.jsx     ← Footer component
│   └── ui/                 ← Reusable UI components
│       ├── DDHero.jsx
│       ├── DDLabel.jsx
│       └── ...
└── styles/
    └── global.css          ← All CSS classes defined here
```

---

## Accessibility

- Always include `aria-label` on icon-only buttons
- Use semantic HTML (`<article>`, `<section>`, `<nav>`, etc.)
- Ensure sufficient color contrast (all brand colors meet WCAG AA)
- Include descriptive alt text for images (or empty alt="" for decorative icons)
- Use focus-visible styles for keyboard navigation

---

## Responsive Design

All sections use responsive utilities:
- `clamp()` for fluid typography and spacing
- Mobile-first grid layouts
- Hamburger menu for mobile navigation
- Stacked layouts on small screens

Test your page at these breakpoints:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1100px (max content width)

---

## Examples

See these existing pages for reference:
- `Home.jsx` — Full homepage with all section types
- `About.jsx` — Mission-focused page with simpler structure
- `Pricing.jsx` — Pricing table layout
- `Contact.jsx` — Form-heavy page

---

## Need Help?

1. Check `src/styles/global.css` for all available CSS classes
2. Review `src/config/theme.js` for design tokens
3. Look at existing pages in `src/pages/` for implementation examples
4. The `PageTemplate.jsx` file contains commented sections explaining each part

---

**Remember**: Every page should feel like part of the same family. Consistency builds trust and reinforces the DigitallyDefined brand identity.
