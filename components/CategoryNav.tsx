import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useSpring, useInView } from 'framer-motion';
import { CATEGORIES } from '../constants';
import Icon from './Icon';
import { rotate360, scaleIn } from '../utils/animations';
import { springConfigs } from '../utils/designTokens';

interface CategoryNavProps {
  activeCategoryId: string | null;
  onNavigate: (categoryId: string) => void;
}

interface NavItemProps {
  item: { id: string; label: string; icon: string };
  isActive: boolean;
  shouldReduceMotion: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, shouldReduceMotion, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`
        group relative transition-all duration-300
        flex items-center justify-center overflow-hidden shrink-0
        /* Mobile Size */
        w-10 h-10 rounded-xl
        /* Desktop Size */
        md:w-12 md:h-12 md:rounded-2xl
        /* Focus styles */
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        ${isActive
          ? 'bg-gradient-to-br from-[#243984] to-[#E82F89] shadow-lg md:scale-110'
          : 'bg-white/5 hover:bg-white/10 md:hover:scale-105'
        }
      `}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      variants={shouldReduceMotion ? undefined : scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
    >
      {/* Glow effect on hover/active */}
      <div className={`
        absolute inset-0 bg-gradient-to-br from-[#243984] to-[#E82F89] opacity-0
        group-hover:opacity-20 transition-opacity duration-300
        ${isActive ? 'opacity-100' : ''}
      `} />

      {/* Icon with micro-interactions */}
      <motion.div
        className={`relative z-10 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
          }`}
        variants={shouldReduceMotion ? undefined : rotate360}
        animate={isActive && !shouldReduceMotion ? "animate" : "initial"}
      >
        <Icon name={item.icon} size={20} />
      </motion.div>

      {/* Tooltip (Desktop Only) */}
      <div className={`
        hidden md:block
        absolute left-full ml-4 px-4 py-2 rounded-xl
        bg-slate-900 text-white text-sm font-semibold whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none shadow-xl
        z-50
      `}>
        {item.label}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-slate-900" />
        </div>
      </div>

      {/* Active indicator dot (Mobile only) */}
      {isActive && (
        <motion.div
          className="md:hidden absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full bg-opacity-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : springConfigs.bouncy}
        />
      )}
    </motion.button>
  );
};

const CategoryNav: React.FC<CategoryNavProps> = ({ activeCategoryId, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  // Combine static and dynamic items
  const navItems = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'pillars', label: 'Pillars', icon: 'Layers' },
    ...CATEGORIES.map(c => ({
      id: c.id,
      label: c.name.en,
      icon: getCategoryIconName(c.id)
    }))
  ];

  // Spring animations for smooth glow follower
  const glowY = useSpring(12, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : springConfigs.snappy);

  // NEW: Springs for next and previous glows
  const glowNextY = useSpring(72, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : springConfigs.snappy);
  const glowPrevY = useSpring(-48, shouldReduceMotion ? { stiffness: 1000, damping: 100 } : springConfigs.snappy);

  useEffect(() => {
    // Determine active index
    const index = navItems.findIndex(item => item.id === activeCategoryId);
    const newIndex = index >= 0 ? index : 0;
    setActiveIndex(newIndex);

    // Calculate Y position (12px padding + index * 60px spacing)
    const baseY = 12 + newIndex * 60;
    glowY.set(baseY);

    // Set next glow position (only if not last item)
    if (newIndex < navItems.length - 1) {
      glowNextY.set(baseY + 60);
    }

    // Set previous glow position (only if not first item)
    if (newIndex > 0) {
      glowPrevY.set(baseY - 60);
    }
  }, [activeCategoryId, navItems.length]);

  const handleClick = (categoryId: string) => {
    onNavigate(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`
      fixed z-50 transition-all duration-500
      /* Mobile: Bottom center, Horizontal, scaled down, consistent 1em margin */
      bottom-6 left-4 right-4 mx-auto max-w-[400px]
      /* Desktop: Left side, Vertically Centered, auto width, 1em margin with overflow handling */
      md:top-1/2 md:-translate-y-1/2 md:right-auto md:left-4 md:bottom-auto md:w-auto md:max-w-none md:mx-0
      md:max-h-[calc(100vh-4rem)]
    `}>
      <div
        className={`
          backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.15)] relative
          /* Mobile shape */
          rounded-2xl p-2 flex overflow-x-auto no-scrollbar items-center gap-1
          /* Desktop shape with scrollable overflow */
          md:flex-col md:rounded-3xl md:p-3 md:overflow-y-auto md:overflow-x-visible md:gap-3 md:justify-start
          md:max-h-full
          /* Custom scrollbar styling */
          md:scrollbar-thin md:scrollbar-track-transparent md:scrollbar-thumb-white/20 md:hover:scrollbar-thumb-white/30
        `}
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        {/* Three-tier glow system (desktop only) */}
        {!shouldReduceMotion && (
          <>
            {/* PREVIOUS GLOW (15% intensity) - Fading trail */}
            {activeIndex > 0 && (
              <motion.div
                className="absolute pointer-events-none rounded-2xl hidden md:block"
                style={{
                  left: '12px',
                  y: glowPrevY,
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, rgba(36, 57, 132, 0.06) 0%, rgba(232, 47, 137, 0.06) 100%)',
                  boxShadow: '0 0 20px rgba(232, 47, 137, 0.075), 0 0 40px rgba(36, 57, 132, 0.045)',
                  filter: 'blur(8px)',
                  transform: 'scale(1.1)',
                  willChange: 'transform'
                }}
              />
            )}

            {/* ACTIVE GLOW (100% intensity) - Main glow with trailing blur */}
            <motion.div
              className="absolute pointer-events-none rounded-2xl hidden md:block"
              style={{
                left: '12px',
                y: glowY,
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, rgba(36, 57, 132, 0.4) 0%, rgba(232, 47, 137, 0.4) 100%)',
                boxShadow: '0 0 20px rgba(232, 47, 137, 0.5), 0 0 40px rgba(36, 57, 132, 0.3)',
                filter: 'blur(8px)',
                transform: 'scale(1.3)',
                willChange: 'transform'
              }}
            />

            {/* Trailing blur on active glow */}
            <motion.div
              className="absolute pointer-events-none rounded-2xl hidden md:block"
              style={{
                left: '12px',
                y: glowY,
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, rgba(36, 57, 132, 0.2) 0%, rgba(232, 47, 137, 0.2) 100%)',
                boxShadow: '0 0 20px rgba(232, 47, 137, 0.25), 0 0 40px rgba(36, 57, 132, 0.15)',
                filter: 'blur(12px)',
                transform: 'scale(1.5)',
                willChange: 'transform',
                transition: 'all 0.05s'
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />

            {/* NEXT GLOW (35% intensity) - Preview "where you're going" */}
            {activeIndex < navItems.length - 1 && (
              <motion.div
                className="absolute pointer-events-none rounded-2xl hidden md:block"
                style={{
                  left: '12px',
                  y: glowNextY,
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, rgba(36, 57, 132, 0.14) 0%, rgba(232, 47, 137, 0.14) 100%)',
                  boxShadow: '0 0 20px rgba(232, 47, 137, 0.175), 0 0 40px rgba(36, 57, 132, 0.105)',
                  filter: 'blur(8px)',
                  transform: 'scale(1.15)',
                  willChange: 'transform'
                }}
              />
            )}
          </>
        )}

        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <NavItem
              key={item.id}
              item={item}
              isActive={isActive}
              shouldReduceMotion={shouldReduceMotion}
              onClick={() => handleClick(item.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

// Helper function to get appropriate icon name for each category
const getCategoryIconName = (categoryId: string) => {
  const iconMap: Record<string, string> = {
    'camera-doorbell': 'Camera',
    'sensors': 'Activity',
    'climatisation': 'Thermometer',
    'lighting': 'Lightbulb',
    'curtain-shutter': 'Blinds', // Verify if Blinds exists in standard sets, usually Blinds or VenetianMask? Assuming Blinds or similar if used before.
    'circuit-breaker': 'Zap',
    'door-lock': 'Lock',
    'control-panel': 'Monitor',
    'gateway': 'Wifi',
    'diy-breaker': 'Settings',
    'music-control': 'Music',
    'switch': 'ToggleRight',
    'accessories': 'Plug',
    'pet-accessories': 'PawPrint'
  };

  return iconMap[categoryId] || 'Box';
};

export default CategoryNav;
