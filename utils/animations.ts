import { Variants } from 'framer-motion';

/**
 * Animation Variants Library
 * Reusable animation configurations for consistent motion design across the app
 */

// Subtle entrance from below with fade
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
    }
  }
};

// Staggered children animation container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Gentle floating effect for glass cards
export const glassFloat: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Parallax scroll effect (to be used with useScroll)
export const parallaxScroll = (depth: number = 0.5) => ({
  initial: { y: 0 },
  animate: (scrollY: number) => ({
    y: scrollY * depth
  })
});

// Animated gradient shift
export const gradientShift: Variants = {
  initial: {
    backgroundPosition: '0% 50%'
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Scale and fade entrance
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Elastic bounce entrance
export const elasticEntrance: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  }
};

// Breathing pulse animation
export const breathingPulse: Variants = {
  initial: {
    opacity: 0.3,
    scale: 1
  },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Rotate 360 degrees
export const rotate360: Variants = {
  initial: {
    rotate: 0
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Staggered grid entrance (wave pattern)
export const gridWave = (row: number, col: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: (row * 0.1) + (col * 0.05),
      duration: 0.5,
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
});

// Shimmer effect (for text gradients)
export const shimmer: Variants = {
  initial: {
    backgroundPosition: '-200% 0'
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// 3D rotation on hover
export const rotate3D = {
  initial: {
    rotateX: 0,
    rotateY: 0
  },
  hover: {
    rotateX: 5,
    rotateY: 10,
    transition: {
      duration: 0.3
    }
  }
};

// Bounce animation (for scroll indicators)
export const bounce: Variants = {
  initial: {
    y: 0
  },
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Particle flow along path (for connection lines)
export const particleFlow = (duration: number = 3): Variants => ({
  initial: {
    offsetDistance: '0%',
    opacity: 0
  },
  animate: {
    offsetDistance: '100%',
    opacity: [0, 1, 1, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: 'linear'
    }
  }
});

/**
 * Spring configurations for different animation feels
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
  }
};

/**
 * Transition presets
 */
export const transitionPresets = {
  fast: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  medium: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  slow: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  verySlow: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }
};
