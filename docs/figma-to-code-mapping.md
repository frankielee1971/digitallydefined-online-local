# Figma-to-Code Mapping Document
## DigitallyDefined Design System

**Purpose:** This document maps Figma design tokens, components, and layouts to their code equivalents in the DigitallyDefined frontend (marketing site + dashboard). This ensures design-to-code consistency and provides a reference for UI development.

**Generated:** Automatically from design system sync

---

## 1. DESIGN TOKENS

### Color Tokens

| Figma Name | Hex Value | Code Variable | Usage |
|------------|-----------|---------------|-------|
| `--color-bg-bone` | `#FFFCF9` | `--bone` in global.css | Background |
| `--color-text-ink` | `#2D3748` | `--ink` in global.css | Body text, headings |
| `--color-accent-orange` | `#F18B25` | `--dd-orange` in global.css | CTAs, logo, primary accents |
| `--color-accent-blue` | `#47B7D4` | `--dd-blue` in global.css | Secondary buttons, highlights |
| `--color-alert-red` | `#C20F0A` | `--dd-red` in global.css | Errors, warnings |
| `--color-border-black` | `#000000` | `--black` in global.css | Borders, frames |
| `--color-bg-white` | `#FFFFFF` | `--white` in global.css | Card backgrounds |

### Typography Tokens

| Figma Name | Code Equivalent | Font Family | Weight | Size (px) | Line Height |
|------------|-----------------|-------------|--------|-----------|-------------|
| `type-heading-1` | `h1` | Inter, system-ui | 900 | Clamp(36-60px) | 1.15 |
| `type-heading-2` | `h2` | Inter, system-ui | 900 | Clamp(28-40px) | 1.15 |
| `type-heading-3` | `h3` | Inter, system-ui | 900 | 24px | 1.2 |
| `type-body` | body | DM Sans, system-ui | 400 | 16px | 1.7 |
| `type-body-sm` | small | DM Sans, system-ui | 400 | 14px | 1.5 |
| `type-label` | label | Inter, system-ui | 700 | 12-14px | 1 |
| `type-button` | button | Inter, system-ui | 700 | 14px | 1 |

### Spacing Tokens

| Figma Name | Code Variable | Value (px) | Usage |
|------------|---------------|------------|-------|
| `space-xs` | `--space-xs` | 8 | Micro spacing |
| `space-sm` | `--space-sm` | 16 | Small spacing |
| `space-md` | `--space-md` | 24 | Medium spacing |
| `space-lg` | `--space-lg` | 32 | Large spacing |
| `space-xl` | `space-xl` | 48 | Extra large spacing |
| `space-2xl` | `--space-2xl` | 64 | Section spacing |

### Border Tokens

| Figma Name | Code Variable | Value | Usage |
|------------|---------------|-------|-------|
| `border-thin` | `--border` | 1px solid black | Card borders |
| `border-thick` | `--border-thick` | 2px solid black | Hero borders, strong separation |

### Shadow Tokens

| Figma Name | Code Variable | Value | Usage |
|------------|---------------|-------|-------|
| `shadow-card` | Default CSS shadow | `0 4px 12px rgba(0,0,0,0.08)` | Card hover |

---

## 2. COMPONENT MAPPINGS

### Button

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| Primary (`btn-primary`) | `Button` with `variant="default"` | `variant="default", size="default"` | `bg-orange text-white border border-orange` |
| Secondary (`btn-secondary`) | `Button` with `variant="secondary"` | `variant="secondary", size="default"` | `bg-blue text-white border border-blue` |
| Outline (`btn-outline`) | `Button` with `variant="outline"` | `variant="outline", size="default"` | `border-black bg-transparent text-black` |
| Small (`btn-sm`) | `Button` with `size="sm"` | `size="sm"` | Reduced padding |
| Full Width | Wrapper with `className="w-full"` | N/A | 100% width |

### Card

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| Basic Card | `Card` with nested components | N/A | `border border-black bg-bone rounded-0` |
| Dark Card | `Card` with `className="section--dark"` | Custom class override | Dark background, white text |
| Hover Effect | `HoverCard` from animations | N/A | Subtle lift on hover |
| Card Header | `CardHeader` | N/A | Padding at top |
| Card Title | `CardTitle` | N/A | Uppercase, bold |
| Card Description | `CardDescription` | N/A | Secondary text |
| Card Content | `CardContent` | N/A | Main content area |
| Card Footer | `CardFooter` | N/A | Bottom content area |

### Input

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| Basic Input | `Input` | N/A | `2px solid black border` |
| Search Input | `Input` with `variant="search"` | `variant="search"` | Placed icon on left |
| Disabled | `Input` with `disabled` prop | `disabled` | Grayed out, no focus |

### Avatar

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| Default Size | `Avatar` with `AvatarImage`/`AvatarFallback` | N/A | 40px circle, border |
| Small | `Avatar` with `size="sm"` | `size="sm"` | 28px |
| Large | `Avatar` with `size="lg"` | `size="lg"` | 48px |

### Separator

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| Horizontal Separator | `Separator` | N/A | 2px solid black horizontal line |
| Vertical Separator | `Separator` with `vertical={true}` | `vertical={true}` | 2px solid black vertical line |

### Layout Wrapper

| Figma State | Code Component | Props | Class/Style |
|-------------|---------------|-------|-------------|
| SiteLayout (Marketing) | `SiteLayout` in components/Layout | N/A | `BrandNav` + `main` + `BrandFooter` |
| Dashboard Layout | `Layout` in dashboard components | N/A | Sidebar + top bar + main content |

---

## 3. PAGE LAYOUTS

### Home Page (Marketing)

| Figma Section | Code Component | Notes |
|---------------|---------------|-------|
| Hero (Dark) | `section.hero.hero--dark` with `FadeIn` | Dark background, white text, orange accent |
| Stats Strip | `.stats-strip` with individual `.stat` elements | Orange numbers, divider lines |
| Let's Get Real | `.section` with heading + card content | Large heading, card with primary color |
| What You Build | `.section` with `.card` grid (3 columns) | Cards with icons and CTAs |
| Own Your Power | `section.section--dark` with CTA button | Dark section, orange border |
| Proof/Credibility | Grid of 3 bordered cards | Trust signals section |
| Quiz + CTA | Card with quiz + community CTA | Two-column layout |
| Email Signup | `EmailSignup` component | Form with orange submit |

### Dashboard Page (Marketing)

| Figma Element | Code Component | Notes |
|---------------|---------------|-------|
| Hero (Dark) | Dark hero section with command center text | Similar to marketing hero but different copy |
| CTA | Large "Get the Dashboard" button | Links to dashboard subdomain |

### Dashboard App (Dashboard)

| Figma Element | Code Component | Notes |
|---------------|---------------|-------|
| Sidebar | Sidebar with nav items | Dark theme, orange accents |
| Top Bar | Top bar with title, notifications | Dark theme |
| Main Content | Main content area with cards | Card layout with data displays |
| Profile Header | User profile section at bottom of sidebar | Avatar, email, plan info |

---

## 4. ICON SYSTEM

| Figma Name | Code Component | Usage |
|------------|---------------|-------|
| `icon-home` | `<Icon name="Home" />` | Navigation, sections |
| `icon-quiz` | `<Icon name="Target" />` | Quiz feature |
| `icon-calculator` | `<Icon name="DollarSign" />` | Calculator tool |
| `icon-scorecard` | `<Icon name="Chart" />` | Scorecard feature |
| `icon-content` | `<Icon name="Book" />` | Content features |
| `icon-build` | `<Icon name="Building" />` | Build tools |
| `icon-community` | `<Icon name="Users" />` | Community section |
| `icon-settings` | `<Icon name="Settings" />` | Settings/navigation |
| `icon-menu` | `<Icon name="Menu" />` | Mobile menu |
| `icon-close` | `<Icon name="X" />` | Close buttons |
| `icon-check` | `<Icon name="Check" />` | Success indicators |
| `icon-alert` | `<Icon name="Alert" />` | Warnings/errors |

---

## 5. ANIMATION MAP

| Figma Animation | Code Component | Trigger |
|----------------|---------------|---------|
| Page fade-in | `<FadeIn>` wrapper | Component mount |
| Slide-in left | `<SlideInLeft>` | Scroll reveal |
| Slide-in right | `<SlideInRight>` | Scroll reveal |
| Slide-in bottom | `<SlideInBottom>` | Scroll reveal |
| Card hover lift | `<HoverCard>` | Mouse hover |
| Button hover | `<HoverButton>` | Hover state |
| Live indicator pulse | `motion.div` with scale animation | Realtime status |

---

## 6. RESPONSIVE BREAKPOINTS

| Figma Breakpoint | CSS Media Query | Behavior |
|-----------------|-----------------|----------|
| Mobile (default) | `max-width: 767px` | Single column, stacked layout |
| Tablet | `min-width: 768px` and `max-width: 1023px` | Two-column grids, visible desktop nav |
| Desktop | `min-width: 1024px` | Full-width layout, max-width constraints |

---

## 7. IMPLEMENTATION NOTES

### Brand Consistency Checklist
- ✅ All buttons use `variant` prop from ShadCN Button
- ✅ All cards use `border-black` with `border-thin` or `border-thick`
- ✅ No rounded corners anywhere (`border-radius: 0`)
- ✅ Headings are uppercase (`text-transform: uppercase`)
- ✅ Orange (#F18B25) is the primary button color
- ✅ Body text uses DM Sans, headings use Inter
- ✅ Background is bone (#FFFCF9), not pure white

### Performance Considerations
- All animations use `framer-motion` with `useMotionValue` where appropriate
- Icons are imported from `lucide-react` (tree-shakeable)
- Critical CSS is inlined in global.css
- Lazy-load non-critical components

### Accessibility
- All components follow ARIA patterns from Radix UI
- Keyboard navigation is supported
- Focus states are visible
- Color contrast meets WCAG AA standards

---

## 8. CHANGE LOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-30 | Initial release: All design tokens, component mappings, and layout specifications documented |

---

**Note:** This document should be updated whenever design changes occur in Figma that require code changes. Use this as the single source of truth for design-to-code mapping.
