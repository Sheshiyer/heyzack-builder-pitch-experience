
import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Language } from '../types';
import Icon from './Icon';
import DarkVeil from './DarkVeil';
import {
  staggerContainer,
  scaleIn,
  fadeInUp,
  elasticEntrance,
  gradientShift,
  glassFloat,
  bounce
} from '../utils/animations';
import { createGlassEffect } from '../utils/designTokens';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const contentY = useTransform(scrollY, [0, 1000], [0, 150]);
  const orbY1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const orbY2 = useTransform(scrollY, [0, 1000], [0, -100]);

  // Fade out scroll indicator as user scrolls
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Container variants for staggered children
  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Badge animation
  const badgeVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Headline word-by-word reveal
  const headlineVariants = shouldReduceMotion ? {} : fadeInUp;

  // Gradient text shimmer
  const gradientTextVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.6
      }
    }
  };

  // Subheadline with letter spacing expansion
  const subheadlineVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, y: 20, letterSpacing: '0.05em' },
    visible: {
      opacity: 1,
      y: 0,
      letterSpacing: 'normal',
      transition: {
        delay: 0.6,
        duration: 0.7
      }
    }
  };

  // CTA buttons with elastic easing
  const ctaVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.9,
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Layer 1: DarkVeil Background */}
      <div className="absolute inset-0 z-0 opacity-80">
        <DarkVeil />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950 pointer-events-none z-0" />

      {/* Layer 3: Floating glass orbs */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-[300px] h-[300px] rounded-full pointer-events-none"
            style={{
              ...createGlassEffect('light'),
              y: orbY1,
              willChange: 'transform'
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
              scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-[200px] h-[200px] rounded-full pointer-events-none"
            style={{
              ...createGlassEffect('light'),
              y: orbY2,
              willChange: 'transform'
            }}
            animate={{
              rotate: -360,
              scale: [1, 1.15, 1]
            }}
            transition={{
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </>
      )}

      {/* Layer 4: Content with parallax */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        style={{ y: shouldReduceMotion ? 0 : contentY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge with animation */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
          variants={badgeVariants}
        >
          <Icon name="Zap" size={16} className="text-[#E82F89]" />
          <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Next Generation Automation</span>
        </motion.div>

        {/* Main headline with stagger */}
        <motion.h1
          className="text-6xl md:text-[5.5rem] font-[800] text-white leading-[1.05] mb-8 tracking-tighter"
          variants={headlineVariants}
        >
          {lang === 'en' ? (
            <>The Smart Building Platform <br/>
            <motion.span
              className="gradient-text"
              variants={gradientTextVariants}
              style={{
                backgroundImage: 'linear-gradient(135deg, #243984 0%, #E82F89 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              That Pays For Itself
            </motion.span></>
          ) : (
            <>La plateforme intelligente <br/>
            <motion.span
              className="gradient-text"
              variants={gradientTextVariants}
              style={{
                backgroundImage: 'linear-gradient(135deg, #243984 0%, #E82F89 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
              animate={shouldReduceMotion ? {} : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              qui s'autofinance
            </motion.span></>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed"
          variants={subheadlineVariants}
        >
          {lang === 'en'
            ? '128 devices. 14 categories. One seamless AI ecosystem for residential builders.'
            : '128 appareils. 14 catégories. Un écosystème IA fluide pour les promoteurs.'}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={ctaVariants}
        >
          <motion.button
            className="btn-primary text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_30px_rgba(232,47,137,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E82F89]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            aria-label={lang === 'en' ? 'Explore product catalog' : 'Explorer le catalogue de produits'}
          >
            {lang === 'en' ? 'Explore catalog' : 'Explorer le catalogue'}
          </motion.button>
          <motion.button
            className="flex items-center gap-3 bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            aria-label={lang === 'en' ? 'Book a product demo' : 'Réserver une démo produit'}
          >
            <span>{lang === 'en' ? 'Book a demo' : 'Réserver une démo'}</span>
            <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator with bounce and fade */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30"
        style={{ opacity: shouldReduceMotion ? 1 : scrollIndicatorOpacity }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <motion.span
          className="text-[10px] font-bold uppercase tracking-[0.3em]"
          animate={shouldReduceMotion ? {} : {
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {lang === 'en' ? 'SCROLL TO DISCOVER' : 'DÉFILER'}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default Hero;
