# HeyZack Product Showcase Pitch Deck — Design Specification

**Project:** HeyZack Builder Product Showcase  
**Target Platform:** Web (Desktop-first, tablet/mobile responsive)  
**Design System Version:** 1.0  
**Last Updated:** 2026-01-26

---

## TABLE OF CONTENTS

1. [Design Philosophy](#design-philosophy)
2. [Brand Identity Integration](#brand-identity-integration)
3. [Design Tokens & System](#design-tokens--system)
4. [Typography](#typography)
5. [Color System](#color-system)
6. [Layout & Grid](#layout--grid)
7. [Component Specifications](#component-specifications)
8. [Animation & Motion](#animation--motion)
9. [Section Design Details](#section-design-details)
10. [Responsive Behavior](#responsive-behavior)
11. [Accessibility Standards](#accessibility-standards)
12. [Asset Specifications](#asset-specifications)

---

## DESIGN PHILOSOPHY

### Core Principles

**1. Premium but Approachable**
- **Context:** Targeting builders/developers who expect professional, high-quality presentation
- **Execution:** Glassmorphism UI with depth, subtle shadows, refined animations
- **Avoid:** Overly playful consumer-style design; maintain sophistication

**2. Data-Driven Storytelling**
- **Context:** Builders make decisions based on ROI, specs, and proof points
- **Execution:** Integrate charts, data visualizations, and quantitative claims throughout
- **Avoid:** Pure marketing fluff; every claim must be backed by data or context

**3. Immersive Scrollytelling**
- **Context:** Web-based pitch deck designed for self-guided exploration or guided demo
- **Execution:** Full-height sections with scroll-triggered animations, parallax effects
- **Avoid:** Slidedeck-style pagination (though print PDF export should chunk naturally)

**4. Product-Centric Design**
- **Context:** Showcasing 128 products across 15 categories — one hero product per category
- **Execution:** Large 3D renders/high-quality photos, single product spotlight per screen, "View Full Category" modal for complete listings
- **Avoid:** Overwhelming users with too many products at once; carousel fatigue

**5. Builder-Focused UX**
- **Context:** Audience is time-poor, detail-oriented, ROI-focused, bilingual (EN/FR)
- **Execution:** Clear navigation, jump-to-section menu, language toggle (EN/FR), downloadable resources
- **Avoid:** Forcing linear consumption; enable non-linear exploration and instant language switching

---

## BRAND IDENTITY INTEGRATION

### HeyZack Brand Assets (from product_catalog.json)

**Brand Name:** HeyZack  
**Tagline:** "AI Automation for Residential & Commercial Buildings"  
**Positioning:** 50/50 B2B/B2C smart building platform

**Visual Identity:**
- **Logo:** Stylized pink 'Z' mark
- **Primary Colors:**
  - Blue: `#243984` (primary brand color)
  - Pink: `#E82F89` (accent, secondary brand color)
  - Black: `#2E2D2C` (text, depth)
  - Grey: `#E9EDEF` (backgrounds, neutral)
- **Gradient:** Blue-to-Pink (signature brand gradient)
- **Typography:** Modern sans-serif, clean, tech-forward

**Brand Personality:**
- **Attributes:** Intelligent, reliable, innovative, accessible
- **Tone:** Professional but not stuffy; confident but not arrogant
- **Voice:** Clear, direct, benefit-focused

**Design Application:**

- **Primary CTA buttons:** Use blue-to-pink gradient
- **Section accents:** Alternate blue and pink highlights
- **Data visualizations:** Incorporate blue/pink color scale
- **Hero imagery:** Ensure branding is subtle but present (logo watermark, gradient overlays)

---

## DESIGN TOKENS & SYSTEM

### Color Tokens

```css
/* tokens.css */

/* Brand Colors */
--heyzack-blue-primary: #243984;
--heyzack-pink-primary: #E82F89;
--heyzack-black: #2E2D2C;
--heyzack-grey: #E9EDEF;

/* Extended Palette */
--heyzack-blue-light: #3D57B3; /* 20% lighter */
--heyzack-blue-dark: #1A2A60; /* 20% darker */
--heyzack-pink-light: #F048A0; /* 20% lighter */
--heyzack-pink-dark: #C2256E; /* 20% darker */

/* Neutral Scale (for UI elements) */
--neutral-50: #FAFBFC;
--neutral-100: #F5F6F7;
--neutral-200: #E9EDEF; /* heyzack-grey */
--neutral-300: #D0D4D9;
--neutral-400: #A8ADB5;
--neutral-500: #7D8390;
--neutral-600: #5A5F6B;
--neutral-700: #3E434D;
--neutral-800: #2E2D2C; /* heyzack-black */
--neutral-900: #1A1918;

/* Semantic Colors */
--color-success: #10B981; /* Green for energy savings, positive metrics */
--color-warning: #F59E0B; /* Amber for alerts, attention */
--color-error: #EF4444; /* Red for errors, critical info */
--color-info: #3B82F6; /* Blue for informational callouts */

/* Pillar-Specific Colors */
--pillar-savings: #10B981; /* Green for SAVINGS pillar (💰) */
--pillar-security: #3B82F6; /* Blue for SECURITY pillar (🔒) */
--pillar-comfort: #F59E0B; /* Warm amber for COMFORT pillar (✨) */

/* Glassmorphism Background */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
--glass-backdrop: blur(10px);

/* Gradients */
--gradient-brand: linear-gradient(135deg, var(--heyzack-blue-primary) 0%, var(--heyzack-pink-primary) 100%);
--gradient-brand-subtle: linear-gradient(135deg, rgba(36, 57, 132, 0.1) 0%, rgba(232, 47, 137, 0.1) 100%);
--gradient-overlay-dark: linear-gradient(180deg, rgba(46, 45, 44, 0) 0%, rgba(46, 45, 44, 0.8) 100%);
```

### Spacing Scale (8px grid system)

```css
/* Spacing Tokens */
--spacing-xs: 4px;   /* 0.5 * base */
--spacing-sm: 8px;   /* 1 * base */
--spacing-md: 16px;  /* 2 * base */
--spacing-lg: 24px;  /* 3 * base */
--spacing-xl: 32px;  /* 4 * base */
--spacing-2xl: 48px; /* 6 * base */
--spacing-3xl: 64px; /* 8 * base */
--spacing-4xl: 96px; /* 12 * base */
--spacing-5xl: 128px; /* 16 * base */
```

### Border Radius Scale

```css
/* Border Radius Tokens */
--radius-sm: 4px;   /* Buttons, badges */
--radius-md: 8px;   /* Cards, inputs */
--radius-lg: 12px;  /* Modal, large cards */
--radius-xl: 16px;  /* Hero sections, images */
--radius-2xl: 24px; /* Feature cards */
--radius-full: 9999px; /* Pills, avatars */
```

### Shadow Scale

```css
/* Shadow Tokens (subtle elevation) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-glass: var(--glass-shadow); /* Glassmorphism-specific */
```

---

## TYPOGRAPHY

### Font Stack

**Primary Font:** Inter (Google Fonts)  
**Fallback:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

**Rationale:** Inter is a modern, highly legible sans-serif optimized for screens. Aligns with HeyZack's "clean, tech-forward" brand personality.

**Font Weights Used:**
- 400 (Regular) — Body text
- 500 (Medium) — UI labels, captions
- 600 (Semi-Bold) — Subheadings, emphasis
- 700 (Bold) — Headings
- 800 (Extra-Bold) — Hero headlines (optional, for maximum impact)

### Typography Scale

```css
/* Type Tokens */

/* Display (Hero Headlines) */
--font-size-display: 72px;
--line-height-display: 1.1;
--letter-spacing-display: -0.02em;
--font-weight-display: 800;

/* H1 (Section Titles) */
--font-size-h1: 48px;
--line-height-h1: 1.2;
--letter-spacing-h1: -0.01em;
--font-weight-h1: 700;

/* H2 (Subsection Titles) */
--font-size-h2: 36px;
--line-height-h2: 1.3;
--letter-spacing-h2: -0.005em;
--font-weight-h2: 700;

/* H3 (Card Titles, Category Names) */
--font-size-h3: 28px;
--line-height-h3: 1.4;
--font-weight-h3: 600;

/* H4 (Product Names, Subheadings) */
--font-size-h4: 20px;
--line-height-h4: 1.5;
--font-weight-h4: 600;

/* Body Large (Subheads, Intro Paragraphs) */
--font-size-body-lg: 18px;
--line-height-body-lg: 1.6;
--font-weight-body-lg: 400;

/* Body (Standard Paragraph Text) */
--font-size-body: 16px;
--line-height-body: 1.6;
--font-weight-body: 400;

/* Body Small (Product Specs, Fine Print) */
--font-size-body-sm: 14px;
--line-height-body-sm: 1.5;
--font-weight-body-sm: 400;

/* Caption (Labels, Metadata) */
--font-size-caption: 12px;
--line-height-caption: 1.4;
--font-weight-caption: 500;
--text-transform-caption: uppercase;
--letter-spacing-caption: 0.05em;
```

### Typography Usage Guidelines

| Element | Font Size | Weight | Line Height | Use Case |
|---------|-----------|--------|-------------|----------|
| **Hero Headline** | 72px | 800 | 1.1 | Screen 1.1 hero, major section intros |
| **Section Title** | 48px | 700 | 1.2 | Each of 8 major sections |
| **Subsection Title** | 36px | 700 | 1.3 | Pillar intros, category titles |
| **Card Title** | 28px | 600 | 1.4 | Product cards, feature cards |
| **Product Name** | 20px | 600 | 1.5 | Individual product listings |
| **Subhead** | 18px | 400 | 1.6 | Supporting copy under headlines |
| **Body Text** | 16px | 400 | 1.6 | Paragraph content, descriptions |
| **Specs** | 14px | 400 | 1.5 | Product specifications, fine print |
| **Label** | 12px | 500 | 1.4 | Form labels, tags, metadata |

**Special Typography Treatments:**

- **Gradient Text (Hero Headlines):** Apply `background: var(--gradient-brand); -webkit-background-clip: text; -webkit-text-fill-color: transparent;`
- **Stat Numbers (Counters):** Use Extra-Bold (800) at 48-72px, tabular-nums font-feature-settings
- **Bullet Points:** Use custom styled bullets (HeyZack pink checkmarks or blue dots) instead of default

---

## COLOR SYSTEM

### Color Application Strategy

**Background Layers:**
1. **Base Background:** White (`#FFFFFF`) or very light neutral (`--neutral-50`)
2. **Section Alternating:** Alternate between white and subtle gradient background (`--gradient-brand-subtle`)
3. **Glassmorphism Overlays:** Use `--glass-bg` with `backdrop-filter: blur(10px)` for floating cards

**Text Hierarchy:**
- **Primary Text:** `--neutral-800` (HeyZack black) — High contrast for readability
- **Secondary Text:** `--neutral-600` — Product specs, supporting copy
- **Tertiary Text:** `--neutral-500` — Captions, metadata, timestamps
- **Link Text:** `--heyzack-blue-primary` (hover: `--heyzack-blue-dark`)

**Accent Colors:**
- **Primary Accent (CTA, Key Highlights):** Blue-to-Pink gradient (`--gradient-brand`)
- **Secondary Accent (Data Viz, Icons):** Alternate blue and pink (`--heyzack-blue-primary`, `--heyzack-pink-primary`)
- **Semantic (Savings, Alerts):** Success green for savings, warning amber for alerts

### Color Accessibility

- **Minimum Contrast Ratios:** 4.5:1 for body text, 3:1 for large text (WCAG AA)
- **Link Underlines:** Always underline links in body text (not just color-coded)
- **Focus States:** 2px solid blue outline with 2px offset for keyboard navigation
- **Color + Icon:** Never rely on color alone (e.g., green checkmark + "Verified" text)

---

## LAYOUT & GRID

### Page Structure

**Full-Height Sections:**
- Each major section occupies 100vh (viewport height)
- Content vertically centered (with padding top/bottom for breathing room)
- Horizontal centering via max-width container

**Container Widths:**
```css
/* Container Tokens */
--container-sm: 640px;  /* Single-column content (intro text) */
--container-md: 768px;  /* Two-column layouts */
--container-lg: 1024px; /* Standard content width */
--container-xl: 1280px; /* Wide layouts (product grids, dashboards) */
--container-2xl: 1536px; /* Full-bleed with side padding */
```

**Default Container:**
- Width: `--container-xl` (1280px)
- Padding: `--spacing-xl` (32px) on left/right
- Margin: `0 auto` (centered)

### Grid System (12-column)

**Desktop (≥1024px):**
- 12 columns with 24px gutters
- Column width: fluid (based on container width)
- Use for product grids (3-4 items per row), feature cards (2-3 per row)

**Tablet (768px - 1023px):**
- 8 columns with 16px gutters
- Product grids: 2 items per row
- Feature cards: 1-2 per row

**Mobile (< 768px):**
- Single column
- Full-width cards with 16px side padding

### Section Layouts

**Hero Section (1.1):**
```
┌─────────────────────────────────────┐
│                                     │
│          [Background Image]         │
│                                     │
│       ┌─────────────────────┐      │
│       │  Hero Headline      │      │
│       │  (Gradient Text)    │      │
│       │  Subhead            │      │
│       │  [Scroll Indicator] │      │
│       └─────────────────────┘      │
│                                     │
└─────────────────────────────────────┘
```

**Two-Column Layout (Pillar Proof Points):**
```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   [Visual/Chart]     │   Headline           │
│                      │   Body Copy          │
│                      │   • Bullet 1         │
│                      │   • Bullet 2         │
│                      │   [CTA Button]       │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**Product Grid (Category Showcase):**
```
┌─────────┬─────────┬─────────┬─────────┐
│ Product │ Product │ Product │ Product │
│  Card   │  Card   │  Card   │  Card   │
│   1     │   2     │   3     │   4     │
└─────────┴─────────┴─────────┴─────────┘
```

---

## COMPONENT SPECIFICATIONS

### 1. Hero Component

**Visual Hierarchy:**
- Background: Full-bleed image or video (apartment building, dusk lighting)
- Overlay: Dark gradient (`--gradient-overlay-dark`) for text contrast
- Headline: Display size (72px), gradient text effect
- Subhead: Body-large (18px), white text
- Scroll Indicator: Animated bouncing arrow or "Scroll to explore" text

**Dimensions:**
- Height: 100vh
- Content max-width: 800px (centered)
- Vertical alignment: 60% from top (not perfectly centered, slight upward bias)

**Interactions:**
- Scroll indicator fades out after user scrolls 10% of page
- Background image has subtle parallax effect (slower scroll speed)

### 2. Product Spotlight (Hero Product Display)

**Structure:**
```html
<div class="product-spotlight">
  <div class="spotlight-image">[Large 3D Render or High-Res Photo]</div>
  <div class="spotlight-content">
    <span class="category-badge">[Category Name]</span>
    <h3 class="product-name">[Product Name]</h3>
    <p class="product-sku">SKU: [Product Code]</p>
    <div class="product-specs">
      <span class="spec-item">[Spec 1]</span>
      <span class="spec-item">[Spec 2]</span>
      <!-- Key specs, 3-5 items -->
    </div>
    <ul class="product-benefits">
      <li>✓ [Builder Benefit 1]</li>
      <li>✓ [Builder Benefit 2]</li>
      <li>✓ [Builder Benefit 3]</li>
    </ul>
    <button class="btn-secondary">View Full Category (9 products) →</button>
  </div>
</div>
```

**Layout:**
- Two-column split: 50% image / 50% content (desktop)
- Single column stack: image top, content bottom (mobile)
- Max-width: `--container-xl` (1280px)

**Styling:**
- Image container: White or subtle gradient background, `--radius-xl` (16px)
- Image: Max-height 600px, object-fit contain, centered
- Content: Left-aligned text, generous spacing
- Specs: Pills (rounded, neutral background, 12px text)
- Benefits: Checkmarks in brand colors (blue/pink alternating)

**Hover/Interaction:**
- Image: Subtle 3D rotation on mouse move (if 3D model available)
- "View Full Category" button: Opens modal with grid of all products in category

**Badge (Category Tag):**
- Position: Top of content area (not overlaying image)
- Background: Subtle pink/blue gradient
- Text: 14px, uppercase, medium weight
- Padding: 6px 12px
- Border-radius: `--radius-sm` (4px)

### 3. CTA Button (Primary)

**Structure:**
```html
<button class="btn-primary">
  [Button Text]
  <span class="btn-icon">→</span>
</button>
```

**Styling:**
- Background: `--gradient-brand` (blue-to-pink)
- Text: White, 16px, bold (600)
- Padding: 14px 28px (medium size)
- Border-radius: `--radius-md` (8px)
- Shadow: `--shadow-md`
- Transition: 0.2s ease

**Hover State:**
- Scale: 1.05
- Shadow: `--shadow-lg`
- Background: Slightly brighter gradient (10% lighter)
- Icon slides right 4px

**Sizes:**
- Small: 12px text, 10px 20px padding
- Medium: 16px text, 14px 28px padding (default)
- Large: 18px text, 16px 32px padding

**Variants:**
- **Primary:** Gradient background (blue-to-pink)
- **Secondary:** Transparent background, gradient border, gradient text
- **Outline:** Neutral border, no fill

### 4. Stat Counter (Animated Number)

**Structure:**
```html
<div class="stat-counter">
  <span class="stat-number" data-target="128">0</span>
  <span class="stat-label">Compatible Devices</span>
</div>
```

**Styling:**
- Number: 48px, Extra-Bold (800), gradient text (`--gradient-brand`)
- Label: 14px, Medium (500), `--neutral-600`, uppercase
- Alignment: Center (default) or left (in grid layouts)

**Animation:**
- Trigger: When element enters viewport (Intersection Observer)
- Duration: 1.5s
- Easing: Ease-out
- Format: Comma-separated thousands (e.g., 1,280)

### 5. Category Modal (Full Product Grid)

**Structure:**
```html
<div class="category-modal" role="dialog" aria-modal="true">
  <div class="modal-overlay" onClick="closeModal()"></div>
  <div class="modal-content">
    <button class="modal-close" aria-label="Close">✕</button>
    <h2 class="modal-title">[Category Name] — All Products</h2>
    <div class="product-grid">
      <div class="product-card-mini">[Product 1]</div>
      <div class="product-card-mini">[Product 2]</div>
      <!-- All products in category -->
    </div>
  </div>
</div>
```

**Behavior:**
- Triggered by "View Full Category" button on product spotlight screen
- Overlay darkens background (80% opacity black)
- Modal animates in from center (scale + fade)
- ESC key closes modal
- Click outside modal closes
- Scroll within modal (not page)

**Product Card Mini (within modal):**
- Compact grid: 3 columns (desktop), 2 (tablet), 1 (mobile)
- Each card: Small image (150px), name, key spec, price/link
- Hover: Shadow lift + border accent

**Modal Styling:**
- Max-width: 1100px
- Background: White with `--radius-xl`
- Shadow: `--shadow-2xl`
- Padding: `--spacing-2xl` (48px)
- Close button: Top-right, 32px circle, hover turns pink

### 6. ROI Calculator

**Structure:**
```html
<div class="roi-calculator">
  <div class="calculator-inputs">
    <label>Number of Units
      <input type="number" min="10" max="500" value="100">
    </label>
    <label>Market Segment
      <select>
        <option>Affordable</option>
        <option>Mid-Range</option>
        <option>Luxury</option>
      </select>
    </label>
    <label>Include Common Areas?
      <input type="checkbox">
    </label>
  </div>
  <div class="calculator-results">
    <div class="result-item">
      <span class="result-label">Total System Cost</span>
      <span class="result-value">$280,000</span>
    </div>
    <!-- More result items -->
  </div>
  <button class="btn-secondary">Download Full ROI Model</button>
</div>
```

**Styling:**
- Container: Glassmorphism card (`--glass-bg`, blur, shadow)
- Inputs: White background, `--neutral-200` border, `--radius-md`
- Results: Grid layout (2 columns), large numbers (36px, bold, gradient)
- Labels: 12px, uppercase, `--neutral-600`
- Values: 36px, Bold (700), gradient text for positive numbers

**Interaction:**
- Real-time calculation (no submit button)
- Results animate on change (number counter effect)
- Download button opens modal with Excel/PDF options

### 7. Scene Timeline

**Structure:**
```html
<div class="scene-timeline">
  <div class="timeline-header">
    <h3>[Scene Name]</h3>
    <p>[Scene Description]</p>
  </div>
  <div class="timeline-steps">
    <div class="timeline-step" data-time="0:00">
      <div class="step-marker">1</div>
      <div class="step-content">
        <h4>Resident taps "Leaving" button</h4>
        <span class="step-product">Scene Control Panel</span>
      </div>
    </div>
    <!-- More steps -->
  </div>
  <div class="timeline-savings">
    <span class="savings-label">Average Energy Savings</span>
    <span class="savings-value">$0.80/day</span>
  </div>
</div>
```

**Styling:**
- Timeline connector: Vertical line (`--heyzack-blue-light`, 2px)
- Step markers: Circle (32px), gradient background, white number
- Step content: Left-aligned, 16px body text
- Product tags: Pink pill (`--heyzack-pink-primary`, 12px, white text)

**Animation:**
- Steps fade in sequentially (0.3s stagger)
- Timeline connector "draws" from top to bottom (SVG stroke animation)
- Trigger: On scroll into viewport

### 8. Language Toggle

**Structure:**
```html
<div class="language-toggle" role="navigation" aria-label="Language Selector">
  <button class="lang-btn" data-lang="en" aria-pressed="true">
    🇬🇧 EN
  </button>
  <button class="lang-btn" data-lang="fr" aria-pressed="false">
    🇫🇷 FR
  </button>
</div>
```

**Positioning:**
- Fixed position: Top-right corner (16px from top, 16px from right)
- Z-index: 1000 (always on top)
- Sticky (remains visible on scroll)

**Styling:**
- Container: Horizontal flexbox, glassmorphism background (`--glass-bg`), `--radius-full` (pill shape)
- Buttons: 14px text, 8px vertical padding, 12px horizontal padding
- Active state: Background `--gradient-brand`, white text, bold
- Inactive state: Transparent background, `--neutral-700` text, regular weight
- Transition: 0.2s ease (background, color)

**Interaction:**
- Click switches language instantly (no page reload)
- Updates all text content via i18n library
- Preserves scroll position and UI state
- Visual feedback: Active button has gradient fill
- Keyboard accessible: Tab to focus, Enter/Space to activate

**Mobile Adaptation:**
- Position: Top-right, but smaller (12px text)
- Flags only (hide "EN"/"FR" text labels)

### 9. Testimonial Card

**Structure:**
```html
<div class="testimonial-card">
  <blockquote class="testimonial-quote">
    "[Quote text]"
  </blockquote>
  <div class="testimonial-author">
    <img src="[headshot]" alt="[Name]" class="author-image">
    <div class="author-info">
      <span class="author-name">[Full Name]</span>
      <span class="author-title">[Title, Company]</span>
    </div>
  </div>
</div>
```

**Styling:**
- Quote: 18px, italic, `--neutral-700`, smart quotes ("")
- Author image: 64px circle, grayscale (default), color (hover)
- Author name: 16px, bold, `--neutral-800`
- Author title: 14px, regular, `--neutral-600`
- Card background: White, subtle shadow, `--radius-lg`

---

## ANIMATION & MOTION

### Animation Principles

1. **Purposeful, Not Decorative:** Every animation serves a function (guide attention, indicate state, smooth transitions)
2. **Subtle and Fast:** Duration 0.2-0.6s for most interactions (avoid slow, "showy" animations)
3. **Scroll-Triggered:** Major animations triggered by viewport intersection (not on page load)
4. **Performance First:** Use `transform` and `opacity` (GPU-accelerated), avoid animating `width`, `height`, `top`, `left`

### Animation Timing Functions

```css
/* Timing Tokens */
--timing-fast: 0.2s;       /* Button hovers, simple toggles */
--timing-base: 0.3s;       /* Card hovers, transitions */
--timing-slow: 0.6s;       /* Section reveals, complex animations */

--easing-smooth: cubic-bezier(0.4, 0.0, 0.2, 1); /* Default ease-in-out */
--easing-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce effect */
--easing-sharp: cubic-bezier(0.4, 0.0, 0.6, 1); /* Quick deceleration */
```

### Key Animations

**1. Fade-In on Scroll (Default Section Entry)**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- Duration: 0.6s
- Easing: `--easing-smooth`
- Trigger: Element enters viewport (Intersection Observer, 20% threshold)

**2. Stat Counter (Animated Number)**
- JavaScript-driven (use CountUp.js or custom implementation)
- Duration: 1.5s
- Easing: Ease-out
- Trigger: On viewport entry

**3. Gradient Text Shimmer (Hero Headline)**
```css
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.hero-headline {
  background: linear-gradient(90deg, var(--heyzack-blue-primary) 0%, var(--heyzack-pink-primary) 50%, var(--heyzack-blue-primary) 100%);
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
}
```

**4. Product Card Hover Lift**
```css
.product-card {
  transition: transform 0.3s var(--easing-smooth), box-shadow 0.3s var(--easing-smooth);
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-xl);
}
```

**5. Button Press Effect**
```css
.btn-primary:active {
  transform: scale(0.95);
  transition: transform 0.1s var(--easing-sharp);
}
```

**6. Carousel Slide Transition**
- Use CSS `transform: translateX()` for slides
- Duration: 0.5s
- Easing: `--easing-smooth`
- Add `will-change: transform` for performance hint

**7. Scene Timeline Step Reveal**
- Stagger: 0.2s per step
- Fade-in + slide-in from left (20px offset)
- Timeline connector animates simultaneously (SVG stroke-dasharray)

### Parallax Scrolling

**Hero Background:**
- Background image scrolls at 0.5x speed (half of normal scroll)
- Implemented via `transform: translateY()` tied to scroll position
- Disabled on mobile (performance)

**Section Overlays:**
- Foreground content scrolls at 1x (normal speed)
- Background gradient/image scrolls at 0.7x
- Creates depth illusion

### Performance Optimization

- Use `will-change: transform` sparingly (only for actively animating elements)
- Debounce scroll listeners (16ms = 60fps)
- Use `requestAnimationFrame` for scroll-based animations
- Disable complex animations on low-end devices (via media query or feature detection)

---

## SECTION DESIGN DETAILS

### Section 1: Hero (Screen 1.1)

**Visual Composition:**
- **Background:** Full-bleed photo of modern apartment building at dusk, lights glowing (conveys "smart" feeling)
- **Overlay:** Dark gradient (0% opacity at top, 60% opacity at bottom) for text legibility
- **Headline:** "The Smart Building Platform That Pays For Itself"
  - Font: Display (72px), Extra-Bold, gradient text effect
  - Position: Centered, 40% from top
- **Subhead:** "128 devices. 15 categories. One seamless system for multifamily builders."
  - Font: Body-large (18px), white, positioned below headline
- **Scroll Indicator:** Animated downward arrow or "Scroll to explore" text
  - Position: Bottom-center, 32px from bottom
  - Animation: Gentle bounce (infinite loop)

**Interactions:**
- Background has subtle parallax scroll (0.5x speed)
- Headline shimmer animation (continuous gradient shift)
- Scroll indicator fades out after user scrolls 10%

### Section 2: Solution Overview (Screens 2.1-2.3)

**Screen 2.1: The HeyZack Difference**
- **Layout:** Centered content, max-width 1024px
- **Animation:** 15 category icons arranged in circle, animate inward and converge into HeyZack logo
- **3 Pillar Cards:** Horizontal row (3 columns)
  - **SAVINGS Card:** Green accent (`--pillar-savings`), 💰 icon, headline "Cut energy costs 30-50%"
  - **SECURITY Card:** Blue accent (`--pillar-security`), 🔒 icon, headline "24/7 protection, zero blind spots"
  - **COMFORT Card:** Warm amber accent (`--pillar-comfort`), ✨ icon, headline "Automated perfection, every day"
  - Card styling: Glassmorphism background, icon (64px), headline (28px), 2-line description
  - Hover: Card lifts, pillar-specific colored border glow
- **Language Toggle:** Visible top-right (EN/FR flags)

**Screen 2.2: By The Numbers**
- **Layout:** 3x2 grid (6 stat counters)
- **Stats:** Animated counter numbers (48px, bold, gradient text)
- **Animation:** Staggered reveal (0.2s delay per stat)

**Screen 2.3: How It Works**
- **Visual:** Apartment floor plan illustration (living room, bedroom, entry)
- **Interactive:** Hover product icons to reveal tooltips with specs
- **Callout Box:** "Open protocols" message (glassmorphism card, bottom-right)

### Section 3: Pillar Deep Dives (Screens 3.X)

**Template Structure (Repeated for Each Pillar):**

**Intro Screen (3.1.1, 3.2.1, 3.3.1):**
- Hero image related to pillar (e.g., energy dashboard, security camera, smart home hub)
- Headline (48px, bold)
- Supporting copy (18px, 2-3 paragraphs)
- Product category badges (pink pills, listed below)

**Proof Screen (3.1.2, 3.2.2, 3.3.2):**
- Two-column layout (50/50 split)
- LEFT: Data visualization (chart, comparison table, or mockup)
- RIGHT: Headline + bullet points + product spotlight card

**Product Spotlight Card (Within Proof Screens):**
- Structure: Small card (glassmorphism), 300px width
- Content: Product image (thumbnail), name, key spec, link to category
- Position: Floating over or adjacent to main content

### Section 4: Category Showcase (15 Screens)

**Template (Reused for All 15 Categories):**

**Layout:**
- Top: Category name (36px, bold) + product count badge ("9 products")
- Middle: Product Spotlight (single hero product, large image + detailed specs)
- Bottom: Integration callout box + "View Full Category" CTA

**Product Spotlight (Hero Product):**
- **Single product display** (not carousel): One representative product per category
- Layout: 50/50 split (image left, specs/benefits right)
- Image: Large 3D render or high-quality photo (600px height, contained)
- Specs: 3-5 key specifications in pill format
- Benefits: 3-4 builder-focused bullet points with checkmarks
- CTA button: "View Full Category" opens modal with all products

**Example Categories & Hero Products:**
1. Camera & Doorbell (9 products) → Hero: Video Door Bell Battery powered
2. Smart Sensors (13 products) → Hero: Smart Humidity & Temperature sensor
3. Smart Control Panel (6 products) → Hero: 5" Touch smart voice control panel
4. Smart Switch (5 products) → Hero: 3 Gang Display Light switch
5. Smart DIY Breaker (5 products) → Hero: Smart 2 Gang Dry Contact Switch
6. Smart Climatisation (14 products) → Hero: Smart Radiator Valve Zigbee
7. Smart Music Control System (3 products) → Hero: Bluetooth ceiling speakers
8. Smart Door Lock (10 products) → Hero: Door Lock with lock body and monitoring
9. Smart Door Lock Body (3 products) → Hero: Square 5050 mortise
10. Smart Circuit Breaker (2 products) → Hero: 2P Breaker Zigbee with power monitoring
11. Smart Gateway (4 products) → Hero: Matter gateway
12. Curtain, Shutter, Garage (29 products) → Hero: Smart Shutter Motor (25 Zigbee)
13. Smart Lighting & Dimming (18 products) → Hero: Zigbee Intelligent LED driver
14. Smart Accessories (5 products) → Hero: Smart PD Power Strip
15. Pet Accessories (2 products) → Hero: Smart Pet feeder

**Integration Callout:**
- Background: Subtle gradient box (blue or pink, pillar-specific)
- Text: "Works with [other categories] for [scene name]"
- Link: Jump to Section 5 (Connected Scenes)

**Language Support:**
- All text (category name, specs, benefits, callouts) available in EN/FR
- Language toggle always visible (top-right, fixed position)

### Section 5: Connected Scenes (5 Screens)

**Screen 5.1: Scenes Intro**
- Visual: Timeline arc (6 AM to 11 PM) with 5 scene icons along curve
- Animation: Icons pop in sequentially on scroll

**Screens 5.2-5.6: Individual Scenes**
- Layout: Two-column (60/40 split)
- LEFT: Animated timeline (vertical) showing automation steps
- RIGHT: Scene details (name, description, products list, savings)
- Timeline animation: Steps reveal with stagger, connecting line "draws" down

### Section 6: Builder Benefits

**Screen 6.1: ROI Calculator**
- Layout: Centered card (glassmorphism), max-width 800px
- Inputs: 3 fields (units, market, common areas)
- Results: 2x2 grid of key metrics (system cost, savings, payback, NPV)
- CTA: "Download detailed ROI model" button

**Screen 6.2: Installation Timeline**
- Visual: Horizontal Gantt chart (phases along timeline)
- Phases: Design → Order → Install → Commission → Training
- Duration labels: "1 week", "3 weeks", etc.

**Screen 6.3: Future-Proof Guarantee**
- Visual: Timeline (2024-2034) with technology milestones
- Proof points: OTA updates, Matter support, modular design
- Animation: Timeline progresses left-to-right on scroll

### Section 7: Social Proof

**Screen 7.1: Case Studies**
- Layout: 3 cards (horizontal row)
- Each card: Project photo (top), builder name + location, challenge/solution/result bullets
- Hover: Card scales slightly, shadow lifts

**Screen 7.2: Testimonials**
- Layout: Carousel (1 testimonial at a time, centered)
- Each testimonial: Quote + headshot + name + title + company
- Navigation: Pagination dots, auto-advance (8s per slide)

### Section 8: Call to Action

**Screen 8.1: Next Steps**
- Visual: 3-step process diagram (horizontal)
- Steps: "Schedule Demo" → "Site Assessment" → "Pilot Project"
- Each step: Icon (64px), title, 1-line description
- CTA Button: "Schedule Demo" (large, gradient, prominent)

**Screen 8.2: Contact & Resources**
- Layout: Split (60/40)
- LEFT: Contact form (name, company, project size, message)
- RIGHT: Resource download grid (PDF catalog, spec sheets, ROI Excel, BIM models)
- Footer: HeyZack logo, social links, copyright

---

## RESPONSIVE BEHAVIOR

### Breakpoints

```css
/* Breakpoint Tokens */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape / small desktop */
--breakpoint-xl: 1280px;  /* Standard desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### Desktop (≥1024px)

- Full design as specified above
- All animations enabled
- Parallax scrolling active
- 3-4 product cards per row
- Two-column layouts for proof points
- Full ROI calculator (all inputs visible)

### Tablet (768px - 1023px)

- Reduce font sizes by 10% (e.g., 72px display → 64px)
- Product cards: 2 per row
- Two-column layouts become single-column (stack vertically)
- Simplify animations (reduce or disable parallax)
- Navigation: Hamburger menu for jump-to-section

### Mobile (< 768px)

- Reduce font sizes by 20% (e.g., 72px display → 56px)
- Product spotlight: Single-column stack (image top, content below)
- All layouts single-column
- Disable parallax scrolling (performance)
- ROI calculator: Simplified (fewer inputs, accordion for results)
- Scene timeline: Horizontal scroll instead of vertical
- Category modals: Full-screen takeover (not floating modal)
- Navigation: Sticky header with hamburger menu
- Language toggle: Flag icons only (hide "EN"/"FR" text)

### Touch Interactions (Tablet/Mobile)

- Increase tap target size (minimum 44px x 44px)
- Add `:active` states (scale down on press)
- Enable swipe gestures for carousels
- Remove hover states (replace with tap-to-reveal)

---

## ACCESSIBILITY STANDARDS

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Text on background: Minimum 4.5:1 (body text), 3:1 (large text 24px+)
- UI components: Minimum 3:1 (buttons, form inputs)
- Test all color combinations with WebAIM Contrast Checker

**Keyboard Navigation:**
- All interactive elements accessible via Tab key
- Focus indicator: 2px solid blue outline with 2px offset
- Skip-to-content link (hidden, visible on focus)
- Logical tab order (follows visual flow)

**Screen Reader Support:**
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Alt text for all images (descriptive, not decorative)
- ARIA labels for icon-only buttons (`aria-label="Previous product"`)
- ARIA live regions for dynamic content (stat counters, ROI calculator results)
- Heading hierarchy (no skipped levels: H1 → H2 → H3, not H1 → H3)

**Forms:**
- Labels associated with inputs (`<label for="...">`)
- Error messages linked to fields (`aria-describedby`)
- Required fields marked (`required` attribute + visual indicator)
- Clear focus states on all inputs

**Internationalization (i18n):**
- All text content translatable (EN/FR)
- `lang` attribute set correctly (`<html lang="en">` or `<html lang="fr">`)
- Text direction preserved (both EN and FR are LTR, no RTL concerns)
- Number/date formatting respects locale (e.g., "1,280" vs "1 280")

**Animation Considerations:**
- Respect `prefers-reduced-motion` media query (disable/simplify animations)
- No auto-playing videos with audio (or muted by default)
- Avoid flashing/strobing effects (seizure risk)

**Testing Tools:**
- axe DevTools (automated accessibility testing)
- NVDA or JAWS (screen reader testing on Windows)
- VoiceOver (screen reader testing on macOS/iOS)
- Keyboard-only navigation testing

---

## ASSET SPECIFICATIONS

### Image Formats

- **Product Photos:** WebP (primary), PNG (fallback), 1:1 aspect ratio
- **Hero Background:** JPEG (compressed), 2560x1440px (desktop), 1920x1080px (tablet), 1080x1920px (mobile portrait)
- **Icons:** SVG (scalable, optimized with SVGO)
- **Logos:** SVG (HeyZack logo, partner logos)

### Image Optimization

- Compression: 80% quality (imperceptible loss, 50-70% file size reduction)
- Responsive images: Use `<picture>` element with multiple sources
- Lazy loading: `loading="lazy"` attribute for below-fold images
- Blur placeholders: Low-res base64 placeholder while image loads

### Icon System

- **Library:** Heroicons (line style) or Lucide Icons
- **Size:** 24px default (scale to 16px, 32px, 64px as needed)
- **Color:** Inherit from text color (use `currentColor` in SVG)
- **Stroke Width:** 2px (consistent across all icons)

### Video Assets (Optional)

- **Hero Background Video:** MP4 (H.264 codec), 1920x1080px, 30fps, max 10MB
- **Scene Animations:** MP4 or Lottie JSON (prefer Lottie for lightweight, scalable)
- **Autoplay:** Muted, looped, no controls (background video only)

### Data Visualization

- **Charts:** Use Recharts (React) or Chart.js (vanilla JS)
- **Colors:** Blue/pink scale (derived from brand colors)
- **Accessibility:** Patterns + colors (not color alone), data table fallback

---

## DESIGN DELIVERABLES

### For Development Handoff

- [ ] Figma file with all screens (35-40 artboards)
- [ ] Design tokens (tokens.css file)
- [ ] Component library (documented in Storybook or Figma components)
- [ ] Asset export package (all images, icons, videos)
- [ ] 15 hero product renders/photos (one per category, high-resolution)
- [ ] Animation specifications (Lottie files or detailed CSS keyframes)
- [ ] Responsive breakpoint mockups (desktop, tablet, mobile)
- [ ] Accessibility checklist (contrast ratios, ARIA labels)
- [ ] i18n content files (EN and FR copy in JSON format)
- [ ] Language toggle component spec

### For Stakeholder Review

- [ ] Interactive Figma prototype (clickable flow, key interactions)
- [ ] PDF export (static version for email/print)
- [ ] Design system documentation (this DesignSpec.md)

---

**Design Spec Version:** 1.0  
**Last Updated:** 2026-01-26  
**Next Review:** After Phase 4 (asset creation) completion  
**Status:** ✅ DRAFT COMPLETE — Ready for visual asset creation and development
