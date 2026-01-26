/**
 * Motion Components Library
 * Reusable motion components for consistent animations across the app
 */

import React from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
  Variant
} from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import { createGlassEffect, depthShadows } from '../../utils/designTokens';

/**
 * GlassCard Component
 * Glassmorphism card with hover animations
 *
 * @example
 * <GlassCard intensity="medium" className="p-6">
 *   <h3>Card Content</h3>
 * </GlassCard>
 */
interface GlassCardProps {
  intensity?: 'light' | 'medium' | 'strong';
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  intensity = 'medium',
  children,
  className = ''
}) => {
  const glassStyles = createGlassEffect(intensity);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{
        ...glassStyles,
        borderRadius: '1rem'
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.02,
              boxShadow: depthShadows.elevated,
              transition: { duration: 0.3 }
            }
      }
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * FloatingElement Component
 * Gentle floating motion for ambient animations
 *
 * @example
 * <FloatingElement duration={6} amplitude={10}>
 *   <div>Floating content</div>
 * </FloatingElement>
 */
interface FloatingElementProps {
  children: React.ReactNode;
  duration?: number;
  amplitude?: number;
  className?: string;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 6,
  amplitude = 10,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        shouldReduceMotion
          ? {}
          : {
              y: [-amplitude, amplitude, -amplitude],
              transition: {
                duration,
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }
      }
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer Component
 * Parent container for sequential reveal animations
 *
 * @example
 * <StaggerContainer staggerDelay={0.1}>
 *   <motion.div variants={fadeInUp}>Item 1</motion.div>
 *   <motion.div variants={fadeInUp}>Item 2</motion.div>
 * </StaggerContainer>
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.1,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Create custom stagger variant with configurable delay
  const customStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={customStaggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

/**
 * ParallaxLayer Component
 * Scroll-based depth effect for creating parallax motion
 *
 * @example
 * <ParallaxLayer depth={0.5}>
 *   <img src="background.jpg" alt="Parallax background" />
 * </ParallaxLayer>
 */
interface ParallaxLayerProps {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  depth = 0.5,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Transform scroll position based on depth
  const y = useTransform(
    scrollY,
    [0, 1000],
    shouldReduceMotion ? [0, 0] : [0, -1000 * depth]
  );

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

/**
 * FadeInView Component
 * Intersection observer reveal with fade-in animation
 *
 * @example
 * <FadeInView delay={0.2}>
 *   <h2>This fades in when scrolled into view</h2>
 * </FadeInView>
 */
interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true, // Only animate once when it comes into view
    margin: '-100px' // Trigger animation 100px before element is in view
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};
