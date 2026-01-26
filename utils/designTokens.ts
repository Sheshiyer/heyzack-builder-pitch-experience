/**
 * Design Tokens
 * Enhanced design system for glassmorphism, depth shadows, and animation configs
 */

/**
 * Glassmorphism Effects
 * Three levels of glass intensity for different UI layers
 */
export const glassEffects = {
  light: {
    background: 'rgba(255, 255, 255, 0.15)',
    blur: 'blur(40px)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px rgba(31, 38, 135, 0.1)',
    css: `
      backdrop-filter: blur(40px) saturate(180%);
      -webkit-backdrop-filter: blur(40px) saturate(180%);
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3);
    `
  },
  medium: {
    background: 'rgba(255, 255, 255, 0.25)',
    blur: 'blur(60px)',
    border: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 12px 40px rgba(31, 38, 135, 0.15)',
    css: `
      backdrop-filter: blur(60px) saturate(180%);
      -webkit-backdrop-filter: blur(60px) saturate(180%);
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4);
    `
  },
  strong: {
    background: 'rgba(255, 255, 255, 0.35)',
    blur: 'blur(80px)',
    border: 'rgba(255, 255, 255, 0.4)',
    shadow: '0 16px 48px rgba(31, 38, 135, 0.2)',
    css: `
      backdrop-filter: blur(80px) saturate(180%);
      -webkit-backdrop-filter: blur(80px) saturate(180%);
      background: rgba(255, 255, 255, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 16px 48px rgba(31, 38, 135, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.5);
    `
  }
};

/**
 * Depth Shadows
 * Layered shadows for creating depth and elevation
 */
export const depthShadows = {
  float: '0 4px 20px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.05)',
  elevated: '0 12px 40px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
  deep: '0 24px 80px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)',

  // Brand-colored shadows for CTAs and highlights
  brandBlue: '0 8px 32px rgba(36, 57, 132, 0.3), 0 2px 8px rgba(36, 57, 132, 0.2)',
  brandPink: '0 8px 32px rgba(232, 47, 137, 0.3), 0 2px 8px rgba(232, 47, 137, 0.2)',
  brandGradient: '0 8px 32px rgba(36, 57, 132, 0.2), 0 8px 32px rgba(232, 47, 137, 0.2)'
};

/**
 * Spring Animation Configurations
 * Presets for different animation feels
 */
export const springConfigs = {
  gentle: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 20
  },
  snappy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30
  },
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25
  },
  veryBouncy: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 20
  }
};

/**
 * Brand Colors
 * HeyZack brand color palette
 */
export const brandColors = {
  primary: {
    blue: '#243984',
    pink: '#E82F89',
    gradient: 'linear-gradient(135deg, #243984 0%, #E82F89 100%)'
  },
  neutral: {
    black: '#0F172A',
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
      950: '#020617'
    }
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6'
  }
};

/**
 * Typography Scale
 * Responsive typography sizes
 */
export const typography = {
  display: {
    fontSize: 'clamp(3rem, 8vw, 5.5rem)',
    lineHeight: '1.05',
    fontWeight: '800',
    letterSpacing: '-0.02em'
  },
  h1: {
    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
    lineHeight: '1.1',
    fontWeight: '800',
    letterSpacing: '-0.02em'
  },
  h2: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.01em'
  },
  h3: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    lineHeight: '1.3',
    fontWeight: '600',
    letterSpacing: '-0.01em'
  },
  body: {
    large: {
      fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    medium: {
      fontSize: '1rem',
      lineHeight: '1.6',
      fontWeight: '400'
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: '1.5',
      fontWeight: '400'
    }
  }
};

/**
 * Spacing System
 * 8px grid system
 */
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
  '5xl': '8rem',   // 128px
};

/**
 * Border Radius
 */
export const borderRadius = {
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px'
};

/**
 * Animation Durations
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 1.0,
  slowest: 2.0
};

/**
 * Easing Functions
 */
export const easings = {
  // Custom cubic-bezier curves
  easeInOutCustom: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  easeOutQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  easeInOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],

  // Named easings
  linear: 'linear' as const,
  easeIn: 'easeIn' as const,
  easeOut: 'easeOut' as const,
  easeInOut: 'easeInOut' as const
};

/**
 * Z-Index Layers
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70
};

/**
 * Breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

/**
 * Helper function to create glass effect styles
 */
export const createGlassEffect = (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
  const effect = glassEffects[intensity];
  return {
    backdropFilter: effect.blur,
    WebkitBackdropFilter: effect.blur,
    background: effect.background,
    border: `1px solid ${effect.border}`,
    boxShadow: effect.shadow
  };
};

/**
 * Helper function to create depth shadow
 */
export const createDepthShadow = (level: keyof typeof depthShadows = 'float') => {
  return {
    boxShadow: depthShadows[level]
  };
};
