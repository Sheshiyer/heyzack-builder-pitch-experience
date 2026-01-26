# Plan & Design Spec Update Summary

**Date:** 2026-01-26  
**Status:** ✅ UPDATED — Incorporating client-validated product structure

---

## KEY CHANGES MADE

### 1. ✅ Confirmed 3 Benefit Pillars

**Updated from hypothesis to validated pillars:**

| Pillar | Icon | Headline | Color |
|--------|------|----------|-------|
| **SAVINGS** | 💰 | "Cut energy costs 30-50%" | Green (`--pillar-savings: #10B981`) |
| **SECURITY** | 🔒 | "24/7 protection, zero blind spots" | Blue (`--pillar-security: #3B82F6`) |
| **COMFORT** | ✨ | "Automated perfection, every day" | Warm Amber (`--pillar-comfort: #F59E0B`) |

**Impact on Plan:**
- Section 3 (Pillar Deep Dives) now uses correct pillar names and benefits
- Scene automations mapped to pillars (e.g., Energy Curtailment = SAVINGS)
- ROI calculator emphasizes savings metrics

**Impact on Design Spec:**
- Added pillar-specific color tokens
- Pillar cards styled with unique color accents
- Icons specified: 💰, 🔒, ✨

---

### 2. ✅ Product Showcase Strategy: ONE Hero Product Per Category

**Changed from:** Product carousels (3-4 products per screen)  
**Changed to:** Single hero product spotlight per category

**Rationale:**
- Clearer focus (not overwhelming)
- Faster page load (fewer images per screen)
- More impactful presentation (large 3D render, detailed specs)
- "View Full Category" modal provides access to all 128 products

**15 Hero Products Identified:**

| # | Category | Hero Product | Count |
|---|----------|--------------|-------|
| 1 | Camera and Doorbell | Video Door Bell Battery powered | 9 products |
| 2 | Smart Sensors | Smart Humidity & Temperature sensor | 13 products |
| 3 | Smart Control Panel | 5" Touch smart voice control panel | 6 products |
| 4 | Smart Switch | 3 Gang Display Light switch | 5 products |
| 5 | Smart DIY Breaker | Smart 2 Gang Dry Contact Switch | 5 products |
| 6 | Smart Climatisation | Smart Radiator Valve Zigbee | 14 products |
| 7 | Smart Music Control System | Bluetooth ceiling speakers | 3 products |
| 8 | Smart Door Lock | Door Lock with lock body and monitoring | 10 products |
| 9 | Smart Door Lock Body | Square 5050 mortise | 3 products |
| 10 | Smart Circuit Breaker | 2P Breaker Zigbee with power monitoring | 2 products |
| 11 | Smart Gateway | Matter gateway | 4 products |
| 12 | Curtain, Shutter and Garage Door Controllers | Smart Shutter Motor (25 Zigbee) | 29 products |
| 13 | Smart lighting System and Dimming Controller | Zigbee Intelligent LED driver | 18 products |
| 14 | Smart Accessorries | Smart PD Power Strip | 5 products |
| 15 | Pet Accesories | Smart Pet feeder | 2 products |

**Component Changes:**
- **Removed:** `<CategoryCarousel>` component
- **Added:** `<ProductSpotlight>` — Large hero product display
- **Added:** `<CategoryModal>` — Modal overlay with full product grid

**Layout Changes (Section 4):**
- 50/50 split: Large product image (left) + detailed specs/benefits (right)
- Image: 600px height, 3D render or high-quality photo
- Specs: 3-5 key specifications in pill format
- Benefits: 3-4 builder-focused bullets with checkmarks
- CTA: "View Full Category" button opens modal

---

### 3. ✅ EN/FR Language Switching

**Added bilingual support throughout:**

**UI Component:**
- Fixed position language toggle (top-right corner)
- Flag icons: 🇬🇧 EN | 🇫🇷 FR
- Active state: Gradient background, white text
- Instant switching (no page reload)
- Preserves scroll position and UI state

**Technical Implementation:**
- **Library:** react-i18next or next-intl
- **Data Structure:**
  - `locales/en/copy.json` — All EN text
  - `locales/fr/copy.json` — All FR translations
- **Scope:** All copy translatable (headlines, body, UI labels, product specs, CTAs)

**Design Considerations:**
- Language toggle always visible (sticky, z-index: 1000)
- Mobile: Flag icons only (hide "EN"/"FR" text to save space)
- Accessibility: `aria-pressed` state, `role="navigation"`
- Number formatting: Respects locale (e.g., "1,280" EN vs "1 280" FR)

**Content Requirements:**
- ~4000 words of copy to translate (EN → FR)
- Product specs: Translate descriptions, keep technical specs in original format
- UI labels: All buttons, links, error messages

---

## RESOURCE IMPACT

### Updated Estimates

**Personnel:**
- Added: FR Translator (12 hours, $800-1,500)
- Increased: Product Specialist (8h → 10h, for hero product selection)
- Increased: Front-End Developer (40h → 44h, for i18n integration)
- Increased: QA Tester (8h → 10h, for FR content testing)

**Total Hours:** 144 hours (without 3D artist) or 164 hours (with 3D artist)  
**Previous:** 134 hours (10-hour increase due to i18n and hero product curation)

**External Budget:**
- Added: Professional FR translation ($800-1,500)
- Total Range: $0 (DIY) to $23,000 (fully outsourced)
- Previous: $0 to $19,000 (4K increase for translation and additional 3D renders)

---

## DESIGN SPEC CHANGES

### New Components

1. **`<ProductSpotlight>`** — Replaces product carousels
   - Large image container (600px height)
   - Detailed specs section (pills)
   - Builder benefits list (checkmarks)
   - "View Full Category" CTA

2. **`<CategoryModal>`** — New modal component
   - Full-screen overlay (darkened background)
   - Grid of all products in category (3 columns desktop)
   - Compact product cards (mini version)
   - ESC key and click-outside to close

3. **`<LanguageToggle>`** — New navigation component
   - Fixed top-right position
   - Flag icons (🇬🇧 🇫🇷)
   - Glassmorphism background
   - Active state gradient fill

### Updated Design Tokens

**New Color Tokens:**
```css
/* Pillar-Specific Colors */
--pillar-savings: #10B981;   /* Green for SAVINGS pillar */
--pillar-security: #3B82F6;  /* Blue for SECURITY pillar */
--pillar-comfort: #F59E0B;   /* Warm amber for COMFORT pillar */
```

### Updated Section Designs

**Section 2.1 (The HeyZack Difference):**
- Pillar cards now have unique color accents (green, blue, amber)
- Icons specified: 💰, 🔒, ✨
- Language toggle visible (top-right)

**Section 4 (Category Showcase):**
- Completely redesigned from carousel to spotlight
- One hero product per screen (15 screens total)
- Modal access to full category (128 products total)

---

## NEXT STEPS (UNCHANGED)

1. **Immediate Actions:**
   - [ ] Review updated plan with HeyZack team
   - [ ] Select 15 hero products (confirm choices or adjust)
   - [ ] Commission 3D renders/photos for 15 hero products
   - [ ] Prepare EN copy for translation

2. **Phase 1 Kickoff:**
   - [ ] Begin 3 pillar content extraction (SAVINGS, SECURITY, COMFORT)
   - [ ] Map products to pillar benefits
   - [ ] Design automation scenes highlighting pillars

3. **Translation Workflow:**
   - [ ] Finalize all EN copy
   - [ ] Send to professional FR translator
   - [ ] Review FR translations for technical accuracy
   - [ ] Implement in `locales/fr/copy.json`

---

## FILES UPDATED

1. ✅ **plan.md** — Updated with:
   - Correct 3 pillars (SAVINGS, SECURITY, COMFORT)
   - Single hero product strategy
   - EN/FR language support
   - Component changes (removed carousel, added spotlight + modal)
   - Increased resource estimates

2. ✅ **DesignSpec.md** — Updated with:
   - Pillar-specific color tokens
   - `<ProductSpotlight>` component spec
   - `<CategoryModal>` component spec
   - `<LanguageToggle>` component spec
   - Section 4 redesign (spotlight layouts)
   - i18n accessibility requirements

---

**Version:** 1.1  
**Status:** ✅ READY FOR REVIEW  
**Next Review:** After hero product selection and translation scoping
