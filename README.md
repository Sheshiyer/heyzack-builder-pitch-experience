<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# HeyZack Builder Pitch Experience

> Interactive product showcase platform for multifamily residential developers

[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-000000?style=flat&logo=bun)](https://bun.sh)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

## Overview

An immersive scrollytelling pitch deck showcasing HeyZack's comprehensive smart building automation platform. Features 128 products across 15 categories, AI-powered property consultation, and bilingual support (EN/FR).

### Key Features

- 🏢 **3 Core Pillars**: Savings, Security, Comfort
- 📦 **15 Product Categories**: Complete ecosystem showcase with hero products
- 🤖 **Gemini AI Assistant**: Property consultation and ROI guidance
- 💰 **ROI Calculator**: Financial impact modeling for builders
- 🌍 **Bilingual**: Full English/French language support
- 🎨 **Snap-scroll Navigation**: Immersive section-by-section experience

## Tech Stack

- **Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Package Manager**: Bun 1.3.6+
- **AI Integration**: Google Gemini AI
- **Icons**: Lucide React
- **Styling**: Tailwind CSS (via inline styles)

## Prerequisites

- **Bun**: 1.3.6 or higher ([Install Bun](https://bun.sh))
- **Node.js**: 18+ (for compatibility)
- **Gemini API Key**: Get yours at [ai.google.dev](https://ai.google.dev/)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heyzack-builder-pitch-experience
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment**
   ```bash
   cp .env.local.template .env.local
   # Edit .env.local and add your Gemini API key
   ```

## Development

**Run development server:**
```bash
bun run dev
```

The app will be available at `http://localhost:5173`

**Other commands:**
```bash
bun run build      # Build for production
bun run preview    # Preview production build
```

## Project Structure

```
heyzack-builder-pitch-experience/
├── components/           # React components
│   ├── CategoryModal.tsx
│   ├── GeminiAssistant.tsx
│   ├── Hero.tsx
│   ├── Icon.tsx
│   ├── Navbar.tsx
│   ├── Pillars.tsx
│   ├── ProductSpotlight.tsx
│   ├── ROICalculator.tsx
│   └── SceneTimeline.tsx
├── .context/            # Project documentation & planning
│   ├── plan.md
│   ├── DesignSpec.md
│   ├── BRANDING_ASSETS.md
│   └── UPDATE_SUMMARY.md
├── App.tsx              # Main app component
├── constants.tsx        # Product data & categories
├── types.ts            # TypeScript definitions
├── index.tsx           # App entry point
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
├── todo.md             # Development task tracker
└── memory.md           # Project knowledge base
```

## Product Categories

1. Camera and Doorbell (9 products)
2. Smart Sensors (13 products)
3. Smart Climatisation (14 products)
4. Smart Lighting (18 products)
5. Curtain & Shutter (29 products)
6. Circuit Breaker (2 products)
7. Smart Door Lock (10 products)
8. Control Panel (6 products)
9. Smart Gateway (4 products)
10. DIY Breaker (5 products)
11. Music Control (3 products)
12. Smart Switch (5 products)
13. Lock Body (3 products)
14. Accessories (5 products)
15. Pet Accessories (2 products)

**Total**: 128 products

## Autonomous Development Workflow

This project follows an autonomous coding agent workflow:

### Task Management
- **todo.md**: Current and pending tasks
- **memory.md**: Completed tasks with context, breakthroughs, and solutions

### Workflow
1. Read `todo.md` for next task
2. Execute task autonomously
3. Update `todo.md` (mark `[DONE]`)
4. Move completed task to `memory.md` with full context
5. Repeat until all tasks complete

**No status requests, no confirmations** - pure execution until completion.

## Contributing

1. Check `todo.md` for pending tasks
2. Review `memory.md` for project context
3. Follow existing code patterns
4. Update documentation as needed

## License

Proprietary - HeyZack Platform

## Resources

- [View in AI Studio](https://ai.studio/apps/temp/1)
- [Gemini API Documentation](https://ai.google.dev/)
- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev/)
