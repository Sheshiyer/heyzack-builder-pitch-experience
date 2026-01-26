import type { Variants } from 'framer-motion';
import type { CategoryId } from '../categoryEnhancements';

type ParticleShape = 'circle' | 'square' | 'triangle' | 'star' | 'wave';

// ============================================================================
// ANIMATION DEFAULTS
// ============================================================================

export const ANIMATION_DEFAULTS = {
  SLOW_DURATION: 4,
  MEDIUM_DURATION: 3,
  FAST_DURATION: 2,
  PARTICLE_BASE_DURATION: 5,
  ORBITAL_SPEEDS: {
    SLOW: 18,
    MEDIUM: 14,
    FAST: 11
  }
} as const;

// ============================================================================
// ICON ANIMATIONS - Category-Specific
// ============================================================================

/**
 * Creates category-specific icon animation variants
 * Each category has a unique animation reflecting its purpose
 */
export function createIconAnimation(categoryId: CategoryId): Variants {
  switch (categoryId) {
    // =======================================================================
    // SECURITY PILLAR - Gentle pulse and protective motions
    // =======================================================================

    case 'camera-doorbell':
      return {
        animate: {
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    case 'door-lock':
      return {
        animate: {
          scale: [1, 1.08, 1],
          filter: [
            'drop-shadow(0 0 10px rgba(36, 57, 132, 0.3))',
            'drop-shadow(0 0 20px rgba(36, 57, 132, 0.6))',
            'drop-shadow(0 0 10px rgba(36, 57, 132, 0.3))'
          ],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    case 'gateway':
      return {
        animate: {
          scale: [1, 1.06, 1],
          rotate: [0, 3, 0, -3, 0],
          boxShadow: [
            '0 0 20px rgba(36, 57, 132, 0.2)',
            '0 0 30px rgba(36, 57, 132, 0.4)',
            '0 0 20px rgba(36, 57, 132, 0.2)'
          ],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // SAVINGS PILLAR - Energy glow and efficiency pulse
    // =======================================================================

    case 'sensors':
      return {
        animate: {
          scale: [1, 1.15, 1],
          boxShadow: [
            '0 0 20px rgba(16, 185, 129, 0.3)',
            '0 0 40px rgba(16, 185, 129, 0.6)',
            '0 0 20px rgba(16, 185, 129, 0.3)'
          ],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    case 'circuit-breaker':
      return {
        animate: {
          scale: [1, 1.1, 1],
          filter: [
            'brightness(1) drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))',
            'brightness(1.2) drop-shadow(0 0 25px rgba(16, 185, 129, 0.5))',
            'brightness(1) drop-shadow(0 0 15px rgba(16, 185, 129, 0.3))'
          ],
          transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    case 'diy-breaker':
      return {
        animate: {
          scale: [1, 1.08, 1],
          rotateZ: [0, 2, 0, -2, 0],
          boxShadow: [
            '0 0 15px rgba(16, 185, 129, 0.3)',
            '0 0 30px rgba(16, 185, 129, 0.5)',
            '0 0 15px rgba(16, 185, 129, 0.3)'
          ],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Climate
    // =======================================================================

    case 'climatisation':
      return {
        animate: {
          rotate: 360,
          transition: { duration: 8, repeat: Infinity, ease: 'linear' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Lighting
    // =======================================================================

    case 'lighting':
      return {
        animate: {
          filter: [
            'brightness(1) drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))',
            'brightness(1.3) drop-shadow(0 0 20px rgba(245, 158, 11, 0.6))',
            'brightness(1) drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))'
          ],
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Music
    // =======================================================================

    case 'music-control':
      return {
        animate: {
          y: [0, -5, 0, 5, 0],
          scale: [1, 1.05, 1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Curtain/Shutter
    // =======================================================================

    case 'curtain-shutter':
      return {
        animate: {
          scaleY: [1, 0.95, 1, 1.05, 1],
          opacity: [1, 0.9, 1],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Control Panel
    // =======================================================================

    case 'control-panel':
      return {
        animate: {
          scale: [1, 1.08, 1],
          boxShadow: [
            '0 0 20px rgba(20, 184, 166, 0.3)',
            '0 0 40px rgba(20, 184, 166, 0.5)',
            '0 0 20px rgba(20, 184, 166, 0.3)'
          ],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // COMFORT PILLAR - Switch
    // =======================================================================

    case 'switch':
      return {
        animate: {
          rotateY: [0, 180, 360],
          scale: [1, 1.02, 1],
          transition: { duration: 6, repeat: Infinity, ease: 'linear' }
        }
      };

    // =======================================================================
    // UTILITY CATEGORIES
    // =======================================================================

    case 'accessories':
      return {
        animate: {
          rotate: [0, 5, 0, -5, 0],
          scale: [1, 1.03, 1],
          opacity: [0.95, 1, 0.95],
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    case 'pet-accessories':
      return {
        animate: {
          y: [0, -5, 0, 5, 0],
          rotate: [0, -3, 0, 3, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      };

    // =======================================================================
    // DEFAULT - Gentle pulse
    // =======================================================================

    default:
      return {
        animate: {
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
      };
  }
}

// ============================================================================
// PARTICLE ANIMATIONS - Natural drift motion
// ============================================================================

/**
 * Generates random drift animation for individual particles
 * Creates natural-looking particle motion with variation
 */
export function createParticleAnimation(
  shape: ParticleShape,
  index: number
): {
  x: number[];
  y: number[];
  rotate?: number[];
  scale: number[];
  opacity: number[];
} {
  // Use index as seed for consistent randomness
  const seed = index * 0.1;

  // Generate random path coordinates with natural variation
  const generatePath = (points: number = 4) => {
    return Array.from({ length: points }, (_, i) => {
      const angle = (i / points) * Math.PI * 2 + seed;
      return Math.sin(angle) * (30 + index * 5); // Vary amplitude by index
    });
  };

  const xPath = generatePath(4);
  const yPath = generatePath(4).map(v => v * 0.8); // Slightly different y pattern

  // Shape-specific behavior
  switch (shape) {
    case 'circle':
      // No rotation for circles
      return {
        x: xPath,
        y: yPath,
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.6, 0.3],
      };

    case 'square':
      // Full rotation for squares
      return {
        x: xPath,
        y: yPath,
        rotate: [0, 360],
        scale: [0.8, 1.1, 0.8],
        opacity: [0.3, 0.5, 0.3],
      };

    case 'triangle':
      // Full rotation with slight scale variation
      return {
        x: xPath,
        y: yPath,
        rotate: [0, 360],
        scale: [0.7, 1.2, 0.7],
        opacity: [0.3, 0.6, 0.3],
      };

    case 'star':
      // Twinkling effect (rapid scale + rotation)
      return {
        x: xPath.map(v => v * 0.6), // Less horizontal movement
        y: yPath.map(v => v * 0.6),
        rotate: [0, 180, 360],
        scale: [0.6, 1.4, 0.6], // More dramatic scale
        opacity: [0.2, 0.8, 0.2], // Twinkle effect
      };

    case 'wave':
      // Flowing motion (horizontal emphasis)
      return {
        x: xPath.map(v => v * 1.5), // More horizontal movement
        y: yPath.map(v => v * 0.5), // Less vertical movement
        rotate: [0, 90, 180, 270, 360],
        scale: [0.9, 1.1, 0.9],
        opacity: [0.4, 0.7, 0.4],
      };

    default:
      return {
        x: xPath,
        y: yPath,
        scale: [0.8, 1.2, 0.8],
        opacity: [0.3, 0.6, 0.3],
      };
  }
}

// ============================================================================
// ORBITAL PATH - Configuration for orbital motion
// ============================================================================

/**
 * Calculates orbital motion configuration for OrbitingPartners
 * Returns starting angle and duration for staggered orbital animation
 */
export function createOrbitalPath(
  distance: number,
  speed: number,
  index: number,
  total: number
): { startAngle: number; duration: number } {
  // Evenly distribute starting positions around the circle
  const angleStep = 360 / total;
  const startAngle = index * angleStep;

  return {
    startAngle,
    duration: speed
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export type { ParticleShape };
