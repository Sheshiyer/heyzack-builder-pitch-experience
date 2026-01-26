# 🏢 HeyZack Builder Pitch Experience

> An immersive, Apple-quality product showcase for HeyZack building automation, featuring scrollytelling, dynamic ecosystem visualizations, and AI-driven property assessments.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.29-FF0055)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Key Components](#-key-components)
- [Data Architecture](#-data-architecture)
- [Design System](#-design-system)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

HeyZack Builder Pitch Experience is a premium web application designed to showcase HeyZack's comprehensive building automation ecosystem to property managers, developers, and commercial real estate professionals. The experience emphasizes three core value pillars: **Security**, **Savings**, and **Comfort**.

### Key Highlights

- **128 Products** across 15 smart categories
- **Real-time ecosystem connections** showing product interoperability
- **Dynamic Three Pillars Analysis** for every product
- **AI-powered property assessment** via Gemini integration
- **Bilingual support** (English/French)
- **Apple-inspired design language** with glassmorphism and depth

---

## ✨ Features

### 🎨 Visual Excellence
- **Scroll-driven animations** using Framer Motion
- **Glassmorphism UI** with backdrop blur effects
- **3D product card decks** with stacking interactions
- **Smooth snap-scroll navigation** between sections
- **Responsive design** optimized for desktop and mobile

### 🔗 Ecosystem Intelligence
- **Connected Logic Partners** grid showing automated workflows
- **Dynamic partner identification** via keyword-based algorithms
- **4 curated connections per category** for focused storytelling
- **Impact metrics** for each automation scenario

### 📊 Data Visualization
- **Three Pillars Analysis** derived from product automations
- **Product catalog drawer** with detailed specifications
- **Category-specific enhancements** with custom animations
- **Real-time scene timeline** for multi-step automation flows

### 🤖 AI Integration
- **Gemini AI Assistant** for property assessments
- **Natural language property analysis**
- **Contextual product recommendations**

### 🌍 Internationalization
- **Bilingual content** (EN/FR)
- **Language switcher** in top-right corner
- **Consistent translations** across all components

---

## 🛠 Tech Stack

### Core Framework
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.8** - Type-safe development
- **Vite 6.2** - Lightning-fast build tool

### UI & Animation
- **Framer Motion 12.29** - Production-ready motion library
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **OGL** - Lightweight WebGL library for 3D effects

### AI & Data
- **Google Gemini AI** - Natural language processing
- **Dynamic JSON catalog** - 128 products with rich metadata

### Development Tools
- **Bun** - Fast JavaScript runtime (optional)
- **Autoprefixer** - CSS vendor prefixing
- **PostCSS** - CSS transformations

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heyzack-builder-pitch-experience
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
# or
bun run build
```

Preview production build:
```bash
npm run preview
```

---

## 📁 Project Structure

```
heyzack-builder-pitch-experience/
├── components/
│   ├── CategoryDrawer.tsx        # Product catalog modal
│   ├── CategoryNav.tsx            # Vertical navigation sidebar
│   ├── GeminiAssistant.tsx        # AI chat interface
│   ├── Hero.tsx                   # Landing section
│   ├── Icon.tsx                   # Lucide icon wrapper
│   ├── OrbitingPartners.tsx       # Animated orbital icons
│   ├── Pillars.tsx                # Three value pillars showcase
│   ├── ProductSpotlight.tsx       # Category product viewer
│   ├── ROICalculator.tsx          # Financial impact calculator
│   ├── SceneTimeline.tsx          # Automation sequence viewer
│   ├── interactive/               # Interactive UI elements
│   │   ├── AnimatedCounter.tsx
│   │   ├── AudioWaveform.tsx
│   │   ├── CircularGauge.tsx
│   │   ├── EnergyFlowMeter.tsx
│   │   ├── LiveAccessLog.tsx
│   │   ├── LockSequenceAnimation.tsx
│   │   ├── SensorPulseMap.tsx
│   │   ├── TemperatureDial.tsx
│   │   └── ZoneToggleGrid.tsx
│   └── motion/
│       └── index.tsx              # Reusable motion effects
├── utils/
│   ├── animations.ts              # Framer Motion variants
│   ├── categoryAnimations.ts     # Category-specific animations
│   ├── designTokens.ts           # Glass effects & shadows
│   └── interactiveElements.tsx   # Element renderer
├── data/
│   └── product_catalog.json      # 128 products with metadata
├── constants.tsx                  # Categories, connections, scenes
├── categoryEnhancements.tsx      # Visual themes per category
├── types.ts                       # TypeScript definitions
├── App.tsx                        # Main application component
└── index.tsx                      # Application entry point
```

---

## 🧩 Key Components

### Hero Section
Full-screen landing with animated tagline and gradient effects.

### Pillars Showcase
Three-column layout highlighting Security, Savings, and Comfort with metrics.

### Product Spotlight
Dynamic category viewer with:
- **Product Card Deck** - Stacked cards with auto-rotation
- **Category Name** - Large typography with gradient
- **Connected Logic Partners** - 4 cards showing ecosystem integrations
- **Product Catalog Button** - Opens detailed drawer

### Category Drawer
Side panel showing:
- **Product List** - Scrollable sidebar
- **Product Details** - Description, image, and metadata
- **Three Pillars Analysis** - Security, Savings, Comfort benefits
- **Automations** - Product-specific automation scenarios
- **Connected Scenes** - Ecosystem integration examples

### Scene Timeline
Visual flow diagram for multi-step automation sequences.

### ROI Calculator
Interactive tool for financial impact estimation.

### Gemini Assistant
AI-powered chat for property assessments and recommendations.

---

## 📊 Data Architecture

### Product Catalog Schema

```typescript
interface Product {
  id: string;                          // SKU
  name: Record<Language, string>;      // EN/FR names
  category: string;                    // Category ID
  sku: string;                         // Product code
  specs: string[];                     // Technical specs
  imageUrl: string;                    // Product image
  description: Record<Language, string>;
  automations?: string[];              // Automation scenarios
  connectedScenes?: string[];          // Integration examples
}
```

### Category Schema

```typescript
interface Category {
  id: string;
  name: Record<Language, string>;
  productCount: number;
  heroProductId: string;
  showcaseProductIds: string[];
  description: Record<Language, string>;
  connections: Connection[];           // Ecosystem links
}
```

### Connection Schema

```typescript
interface Connection {
  partnerId: string;                   // Related category
  label: Record<Language, string>;     // Short title
  description: Record<Language, string>;
  impactMetric: Record<Language, string>;
  scores?: {                           // Auto-calculated
    security: number;                  // 0-100
    savings: number;                   // 0-100
    comfort: number;                   // 0-100
  };
}
```

---

## 🎨 Design System

### Colors

```javascript
const colors = {
  primary: {
    blue: '#243984',     // Security
    pink: '#E82F89',     // Comfort
    emerald: '#10B981',  // Savings
  },
  neutral: {
    black: '#2E2D2C',
    grey: '#E9EDEF',
    slate: '#1e293b',
  }
};
```

### Typography

- **Headings**: Bold, uppercase, tracking-wide
- **Body**: Medium weight, relaxed leading
- **Labels**: Uppercase, extra tracking

### Effects

- **Glassmorphism**: `backdrop-blur-xl bg-white/10`
- **Shadows**: Layered depth shadows
- **Animations**: Spring physics, easing curves

---

## ⚡ Performance

### Optimization Strategies

1. **Code Splitting**
   - Manual chunks for vendor libraries
   - Lazy loading for interactive components
   - `React.lazy()` for route-based splitting

2. **Image Optimization**
   - Unsplash integration with query parameters
   - `object-contain` and `mix-blend` modes
   - Lazy loading via intersection observers

3. **Animation Performance**
   - `will-change` properties
   - GPU-accelerated transforms
   - Reduced motion respect

4. **Bundle Size**
   - Tree-shaking unused code
   - Vendor chunking (React, Framer Motion, UI libs)
   - Current: ~800KB main bundle (gzip: ~212KB)

### Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: 90+ (Performance)

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and test**
   ```bash
   npm run dev
   ```

3. **Type check and build**
   ```bash
   npx tsc --noEmit
   npm run build
   ```

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new component"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Convention

- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `docs:` - Documentation updates
- `style:` - Code style changes
- `perf:` - Performance improvements
- `test:` - Test additions/updates

---

## 📝 License

This project is proprietary software owned by HeyZack. All rights reserved.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Apple product pages
- **Icons**: Lucide React
- **Animation Library**: Framer Motion
- **AI Integration**: Google Gemini

---

## 📞 Contact

For questions or support, contact the HeyZack development team.

---

**Built with ❤️ for modern property management**
