# Contributing to HeyZack Builder Pitch Experience

Thank you for your interest in contributing! This document provides guidelines and workflows for contributing to this project.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Autonomous Development](#autonomous-development)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites
- **Bun** 1.3.6+ ([Install](https://bun.sh))
- **Node.js** 18+ (for compatibility)
- **Git**
- **Gemini API Key** ([Get one](https://ai.google.dev/))

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd heyzack-builder-pitch-experience

# Install dependencies
bun install

# Create environment file
cp .env.local.template .env.local
# Add your Gemini API key to .env.local

# Start dev server
bun run dev
```

---

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `docs/*` - Documentation updates

### Workflow
1. Create feature branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Make changes, commit regularly:
   ```bash
   git add .
   git commit -m "feat: descriptive commit message"
   ```

3. Push and create pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

---

## Autonomous Development

This project uses an **autonomous coding agent workflow**. Read [AUTONOMOUS_WORKFLOW.md](AUTONOMOUS_WORKFLOW.md) for details.

### Task Management
- Check `todo.md` for pending tasks
- Review `memory.md` for project context and past decisions
- Update `todo.md` when starting/completing tasks
- Document breakthroughs in `memory.md`

### Workflow Pattern
1. Read `todo.md` → Find next task
2. Execute task autonomously
3. Mark task `[DONE]` in `todo.md`
4. Move completed task to `memory.md` with context
5. Repeat

**Benefits:**
- Clear task visibility
- Knowledge preservation
- Efficient execution
- Self-documenting progress

---

## Code Standards

### TypeScript
- Use strict type checking
- Define interfaces in `types.ts`
- Avoid `any` types - use `unknown` if necessary
- Export types for reusability

**Example:**
```typescript
// types.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  specs: string[];
  benefits: string[];
}

// component.tsx
import { Product } from './types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // ...
};
```

### React Components
- Use functional components with hooks
- Keep components small and focused (< 200 lines)
- Extract reusable logic into custom hooks
- Use descriptive prop names

**File Structure:**
```typescript
import React from 'react';
import { SomeType } from '../types';

interface ComponentProps {
  prop1: string;
  prop2: number;
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return <div>...</div>;
};

export default Component;
```

### Styling
- Use inline Tailwind-style classes
- Keep consistent spacing (8px grid system)
- Follow brand colors from design spec:
  - Blue: `#243984`
  - Pink: `#E82F89`
  - Black: `#2E2D2C`
  - Grey: `#E9EDEF`

### Constants
- Add new product data to `constants.tsx`
- Use `Record<Language, string>` for bilingual text
- Keep categories, pillars, scenes organized

---

## Component Guidelines

### Creating New Components

1. Create file in `components/` folder
2. Define TypeScript interface for props
3. Implement component logic
4. Export as default
5. Import and use in `App.tsx`

**Example:**
```typescript
// components/NewComponent.tsx
import React from 'react';
import { Language } from '../types';

interface NewComponentProps {
  lang: Language;
  title: string;
}

const NewComponent: React.FC<NewComponentProps> = ({ lang, title }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default NewComponent;
```

### Existing Components

**Core Components:**
- `Navbar.tsx` - Navigation with language toggle
- `Hero.tsx` - Landing hero section
- `Pillars.tsx` - 3-pillar value proposition
- `ProductSpotlight.tsx` - Individual product showcase
- `CategoryModal.tsx` - Full category product grid
- `SceneTimeline.tsx` - Automation workflow demos
- `ROICalculator.tsx` - Financial calculator
- `GeminiAssistant.tsx` - AI consultation interface
- `Icon.tsx` - Lucide icon wrapper

**Modify carefully** - these are interconnected.

---

## Testing

### Manual Testing Checklist
- [ ] All sections render without errors
- [ ] Language toggle works (EN ↔ FR)
- [ ] Navigation links scroll to correct sections
- [ ] Product spotlight shows correct hero products
- [ ] Category modal opens and displays all products
- [ ] ROI calculator computes correctly
- [ ] Gemini AI assistant responds (requires API key)
- [ ] Responsive design works on mobile/tablet
- [ ] No console errors

### Testing Commands
```bash
# Development mode (hot reload)
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

### Browser Testing
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Pull Request Process

### Before Submitting
1. ✅ Code follows style guidelines
2. ✅ All TypeScript types are defined
3. ✅ Manual testing completed
4. ✅ No console errors or warnings
5. ✅ Commit messages follow convention
6. ✅ `todo.md` updated (if applicable)
7. ✅ `memory.md` updated with breakthroughs

### Commit Message Convention
Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style (formatting, no logic change)
- `refactor:` Code refactoring
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Build process or tooling

**Examples:**
```
feat: add French translations for ROI calculator
fix: resolve language toggle state persistence
docs: update README with deployment instructions
refactor: extract scene timeline into smaller components
```

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested locally
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

### Review Process
1. Submit PR from feature branch to `develop`
2. Wait for automated checks (if CI/CD configured)
3. Address reviewer feedback
4. Squash and merge once approved

---

## Questions?

- **Project Planning**: Check `.context/plan.md`
- **Design Specs**: Check `.context/DesignSpec.md`
- **Branding Guidelines**: Check `.context/BRANDING_ASSETS.md`
- **Autonomous Workflow**: Check `AUTONOMOUS_WORKFLOW.md`
- **Deployment**: Check `DEPLOYMENT.md`

For additional questions, open an issue or contact the maintainers.

---

**Thank you for contributing to HeyZack Builder Pitch Experience!** 🚀
