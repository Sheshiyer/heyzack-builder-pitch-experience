
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { motion, useReducedMotion, Variants, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Category, Product, Language } from '../types';
import { HERO_PRODUCTS, CATEGORIES, ALL_PRODUCTS } from '../constants';
import Icon from './Icon';
import { fadeInUp, breathingPulse, staggerContainer } from '../utils/animations';
import { createGlassEffect, depthShadows } from '../utils/designTokens';
import { CATEGORY_ENHANCEMENTS, CategoryId } from '../categoryEnhancements';
import { renderInteractiveElement } from '../utils/interactiveElements';
import { createIconAnimation } from '../utils/categoryAnimations';
import RadicalElements from './RadicalElements';
import OrbitingPartners from './OrbitingPartners';

interface CategorySpotlightProps {
  lang: Language;
  category: Category;
  onViewAll: () => void;
}

const CategorySpotlight: React.FC<CategorySpotlightProps> = ({ lang, category, onViewAll }) => {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [expandedStat, setExpandedStat] = useState<number | null>(null);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Refs for scroll and intersection observers
  const sectionRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);

  // Scroll animations - use layoutEffect to ensure ref is attached
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Get enhancement configuration for this category
  const enhancement = CATEGORY_ENHANCEMENTS[category.id as CategoryId];

  // Performance optimization: Determine particle count based on device
  const getOptimalParticleCount = useCallback(() => {
    if (prefersReducedMotion) return 0;
    if (typeof window === 'undefined') return 20;

    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const isMobile = window.innerWidth < 768;

    if (isLowEnd) return 10;
    if (isMobile) return 15;
    return 40;
  }, [prefersReducedMotion]);

  // Debounced hover handler
  const debouncedSetHoveredPartner = useCallback((partnerId: string | null) => {
    setHoveredPartner(partnerId);
  }, []);

  // Get showcase products or fallback to hero
  const showcaseProducts = ALL_PRODUCTS.filter(p => category.showcaseProductIds?.includes(p.id));
  const activeProducts = showcaseProducts.length > 0 ? showcaseProducts : (category.heroProductId && HERO_PRODUCTS[category.heroProductId] ? [HERO_PRODUCTS[category.heroProductId]] : []);
  const currentProduct = activeProducts[currentProductIndex] || activeProducts[0];

  // Auto-cycle through products
  React.useEffect(() => {
    if (activeProducts.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentProductIndex(prev => (prev + 1) % activeProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeProducts.length]);

  // Animation variants
  const floatingProduct: Variants = {
    initial: { y: 0 },
    animate: {
      y: prefersReducedMotion ? 0 : [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const rotation3D: Variants = {
    initial: { rotateX: 0, rotateY: 0 },
    hover: prefersReducedMotion
      ? { rotateX: 0, rotateY: 0 }
      : {
          rotateX: 5,
          rotateY: 10,
          transition: { duration: 0.3, ease: 'easeOut' }
        }
  };

  const cardStagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardReveal: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // SVG connection path generator
  const getConnectionPath = (index: number, total: number): string => {
    // Create curved paths from center to each card
    const cols = 2;
    const row = Math.floor(index / cols);
    const col = index % cols;

    // Starting point (center of hero product area)
    const startX = -200;
    const startY = 0;

    // End points based on card grid position
    const endX = col * 300 + 50;
    const endY = row * 150 - 50;

    // Control points for smooth curve
    const cp1X = startX + 100;
    const cp1Y = startY;
    const cp2X = endX - 100;
    const cp2Y = endY;

    return `M ${startX},${startY} C ${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
  };

  const getCardStyle = (index: number) => {
    const diff = (index - currentProductIndex + activeProducts.length) % activeProducts.length;
    
    // Show current card and next 2 cards in the stack
    if (diff === 0) {
      // Current active card
      return {
        zIndex: 30,
        opacity: 1,
        scale: 1,
        y: 0,
      };
    } else if (diff === 1) {
      // First card behind
      return {
        zIndex: 20,
        opacity: 0.6,
        scale: 0.9,
        y: -40,
      };
    } else if (diff === 2) {
      // Second card behind
      return {
        zIndex: 10,
        opacity: 0.3,
        scale: 0.8,
        y: -80,
      };
    } else {
      // Others hidden
      return {
        zIndex: 0,
        opacity: 0,
        scale: 0.7,
        y: -100,
      };
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-slate-950 py-12 md:py-24 px-6 flex items-center overflow-hidden border-b border-white/5 relative group/section">
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Col: Interactive Product Deck */}
        <motion.div
          className="relative flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Animated gradient glow with breathing pulse */}
          <motion.div
            className="absolute -inset-40 rounded-[5rem] blur-3xl z-0"
            style={{
              background: enhancement
                ? `linear-gradient(to top right, ${enhancement.accentGradient.from}33, ${enhancement.accentGradient.to}33)`
                : 'linear-gradient(to top right, #24398433, #E82F8933)'
            }}
            variants={breathingPulse}
            initial="initial"
            animate="animate"
          />

          {/* Card Deck Container */}
          <div className="relative w-full max-w-xl aspect-square h-[500px] flex items-center justify-center z-30 mb-16">

            {/* Product glow effect */}
            {enhancement && (
              <motion.div
                className="absolute inset-0 -z-10 blur-3xl opacity-30 pointer-events-none"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: `radial-gradient(circle, ${enhancement.glowColor}60, transparent)`
                }}
              />
            )}

            {/* Standard Product Deck */}
            <div className="relative w-full h-full">
                {activeProducts.map((product, index) => {
                  const style = getCardStyle(index);

                  return (
                    <motion.div
                      key={product.id}
                      className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                      style={{
                         ...style,
                         boxShadow: depthShadows.deep,
                         transformOrigin: "bottom center"
                      }}
                    >
                      {/* Product Image */}
                      <div className="w-full h-full flex items-center justify-center p-6 relative">
                         {/* Subtle grid background for tech feel */}
                         <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                         />

                        <motion.img
                          src={product.imageUrl}
                          alt={product.name[lang]}
                          className="w-full h-full object-contain mix-blend-screen relative z-10"
                          initial={{ scale: 0.9 }}
                          animate={{
                            scale: style.opacity === 1 ? 1.05 : 0.9,
                            y: style.opacity === 1 ? [0, -10, 0] : 0
                          }}
                           transition={{
                            scale: { duration: 0.5 },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                      </div>

                      {/* Card Title/Badge (Only visible on active card) */}
                       <div className="absolute top-8 left-0 right-0 flex justify-center">
                         <div className={`px-4 py-1 rounded-full border border-white/10 ${style.opacity === 1 ? 'bg-white/10' : 'bg-transparent'} transition-colors duration-500`}>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{product.name[lang]}</span>
                         </div>
                      </div>
                    </motion.div>
                  );
                })}
             </div>

             {/* Indicators outside the cards */}
            {activeProducts.length > 1 && (
              <div className="absolute -bottom-16 flex gap-3 z-20">
                {activeProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProductIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentProductIndex ? 'w-12 bg-[#E82F89] shadow-[0_0_10px_#E82F89]' : 'w-3 bg-slate-700 hover:bg-slate-500'}`}
                    aria-label={`Show product ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Unified Product Dashboard */}
          <motion.div
            className="mt-6 w-full max-w-xl z-10 flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Row 1: Micro Stats */}
            {enhancement && enhancement.microStats && (
              <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                {enhancement.microStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center gap-1 flex-1">
                    <div className="flex items-center gap-2">
                       <Icon name={stat.icon} size={14} className="opacity-70" style={{ color: stat.color }} />
                       <span className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 text-center uppercase tracking-wide">{stat.label[lang]}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Row 2: Specs & SKU Count */}
            <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
               {/* Product Count */}
               <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-[#243984] to-[#1a2b6d] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                     <span className="text-lg font-black text-white">{category.productCount}</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-white leading-tight">Total SKUs</span>
                     <span className="text-[9px] text-slate-400 font-medium">Available Now</span>
                  </div>
               </div>

               <div className="hidden md:block w-[1px] h-8 bg-white/10" />

               {/* Dynamic Specs */}
               <div className="flex gap-2 flex-wrap justify-center md:justify-end">
                  {currentProduct?.specs.slice(0, 3).map((spec, i) => (
                     <div key={`${currentProduct?.id}-${i}`} className="px-3 py-1 bg-slate-800/80 border border-white/10 rounded-md">
                        <span className="text-[9px] font-bold text-slate-300 uppercase">{spec}</span>
                     </div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Interactive Element - Moved to right column per user request */}
          {/* {enhancement && enhancement.interactiveElement && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 w-full max-w-xl z-20"
            >
              {renderInteractiveElement(enhancement.interactiveElement, lang)}
            </motion.div>
          )} */}
        </motion.div>

        {/* Right Col: Narrative & Integration Hub */}
        <motion.div
          className="lg:col-span-1 flex flex-col gap-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-[#E82F89]" />
              <span className="text-[#E82F89] font-black uppercase tracking-[0.3em] text-[10px]">
                {lang === 'en' ? 'CATEGORY ECOSYSTEM' : 'ÉCOSYSTÈME CATÉGORIE'}
              </span>
            </div>

            {/* Category Icon with Animation */}
            {enhancement && category.icon && (
              <motion.div className="mb-6 flex items-center gap-4">
                <motion.img
                  src={category.icon}
                  alt={category.name[lang]}
                  className="w-16 h-16 object-contain"
                  variants={createIconAnimation(category.id as CategoryId)}
                  animate="animate"
                  style={{
                    filter: `drop-shadow(0 0 20px ${enhancement.glowColor}80)`
                  }}
                />
              </motion.div>
            )}

            <h3 className="text-6xl md:text-7xl font-black text-[#243984] mb-6 tracking-tight leading-[0.95]">
              {category.name[lang]}
            </h3>

            <p className="text-2xl text-slate-500 leading-relaxed font-medium max-w-2xl">
              {category.description[lang]}
            </p>
          </motion.div>

          {/* New Integration Grid */}
          <motion.div className="relative" variants={fadeInUp}>
            <div className="flex items-center gap-3 mb-6">
               <Icon name="Network" size={16} className="text-[#243984]" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {lang === 'en' ? 'Connected Logic Partners' : 'Partenaires de Logique Connectée'}
               </span>
            </div>

            {/* SVG Connection Lines Layer */}
            {category.connections.length > 0 && !prefersReducedMotion && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <defs>
                  {/* Glow filter for connection lines */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {category.connections.map((link, index) => {
                  const isActive = activePartnerId === link.partnerId;
                  const pathId = `path-${link.partnerId}`;
                  const path = getConnectionPath(index, category.connections.length);

                  return (
                    <g key={link.partnerId}>
                      {/* Connection line */}
                      <motion.path
                        id={pathId}
                        d={path}
                        fill="none"
                        stroke={isActive ? '#E82F89' : '#243984'}
                        strokeWidth={isActive ? 3 : 1.5}
                        strokeOpacity={isActive ? 0.6 : 0.1}
                        strokeDasharray={isActive ? '0' : '5,5'}
                        filter={isActive ? 'url(#glow)' : 'none'}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />

                      {/* Traveling particle along connection */}
                      {isActive && (
                        <motion.circle
                          r="4"
                          fill="#E82F89"
                          filter="url(#glow)"
                          initial={{ offsetDistance: '0%', opacity: 0 }}
                          animate={{
                            offsetDistance: ['0%', '100%'],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                          style={{
                            offsetPath: `path('${path}')`,
                            offsetRotate: '0deg'
                          }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            )}

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 relative"
              style={{ zIndex: 1 }}
              variants={cardStagger}
              initial="hidden"
              animate="visible"
            >
               {category.connections.length > 0 ? category.connections.map((link, index) => {
                 const partner = CATEGORIES.find(c => c.id === link.partnerId);
                 const isActive = activePartnerId === link.partnerId;
                 return (
                   <motion.div
                     key={link.partnerId}
                     variants={cardReveal}
                     role="button"
                     tabIndex={0}
                     onMouseEnter={() => setActivePartnerId(link.partnerId)}
                     onMouseLeave={() => setActivePartnerId(null)}
                     onFocus={() => setActivePartnerId(link.partnerId)}
                     onBlur={() => setActivePartnerId(null)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' || e.key === ' ') {
                         e.preventDefault();
                         setActivePartnerId(isActive ? null : link.partnerId);
                       }
                     }}
                     className={`p-6 rounded-[2.5rem] transition-all border-2 flex flex-col gap-3 relative overflow-hidden group/card cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 ${
                       isActive
                       ? 'bg-[#243984] border-[#243984] shadow-2xl -translate-y-1'
                       : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10 backdrop-blur-sm'
                     }`}
                     style={{
                       boxShadow: isActive ? depthShadows.brandBlue : 'none'
                     }}
                     whileHover={
                       prefersReducedMotion
                         ? {}
                         : { scale: 1.02, transition: { duration: 0.2 } }
                     }
                     aria-label={`${partner?.name[lang] || 'System Node'}: ${link.label[lang]}`}
                     aria-expanded={isActive}
                   >
                     {/* Animated background gradient on hover */}
                     {isActive && !prefersReducedMotion && (
                       <motion.div
                         className="absolute inset-0 bg-gradient-to-br from-[#243984] via-[#243984] to-[#E82F89]/40 rounded-[2.5rem]"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.3 }}
                       />
                     )}

                     <div className="flex items-center justify-between relative z-10">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-slate-400 opacity-70'}`}>
                          {partner?.name[lang] || 'System Node'}
                        </span>
                        <motion.div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                            isActive ? 'bg-[#E82F89] text-white' : 'bg-white/10 text-slate-400 border border-white/5'
                          }`}
                          animate={
                            isActive && !prefersReducedMotion
                              ? { rotate: [0, 360], transition: { duration: 0.6 } }
                              : { rotate: 0 }
                          }
                        >
                           <Icon name="Zap" size={14} />
                        </motion.div>
                     </div>
                     <p className={`text-sm font-bold leading-tight relative z-10 ${isActive ? 'text-white' : 'text-white'}`}>
                       {link.label[lang]}
                     </p>

                     <motion.div
                       className={`text-[10px] font-medium leading-relaxed mt-1 relative z-10 ${isActive ? 'text-white/80' : 'text-slate-400'}`}
                       initial={{ opacity: 0, height: 0 }}
                       animate={
                         isActive
                           ? { opacity: 1, height: 'auto' }
                           : { opacity: 0, height: 0 }
                       }
                       transition={{ duration: 0.3 }}
                     >
                       {link.description[lang]}
                       <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                          <span className="text-white font-black">{link.impactMetric[lang]}</span>
                          <Icon name="ArrowRight" size={10} />
                       </div>
                     </motion.div>
                   </motion.div>
                 );
               }) : (
                 <motion.div
                   className="col-span-full py-8 text-center text-slate-300 italic font-medium border-2 border-dashed border-slate-100 rounded-[2.5rem]"
                   variants={cardReveal}
                 >
                   Standalone capable or Matter-mesh integration.
                 </motion.div>
               )}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 mt-4"
            variants={fadeInUp}
          >
            <motion.button
              onClick={onViewAll}
              className="bg-[#243984] text-white px-10 py-6 rounded-3xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-4 group shadow-xl shadow-blue-900/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={lang === 'en' ? 'View product catalog for this category' : 'Voir le catalogue produits pour cette catégorie'}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span>{lang === 'en' ? 'PRODUCT CATALOG' : 'CATALOGUE PRODUITS'}</span>
              <Icon name="ChevronRight" size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </motion.button>
          </motion.div>

          {/* Interactive Element - Moved to right side with isometric visual treatment */}
          {enhancement && enhancement.interactiveElement && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9, rotateX: 20, rotateY: -10 }}
               animate={{ opacity: 1, scale: 1, rotateX: 10, rotateY: -10 }}
               transition={{ delay: 0.6, duration: 0.8 }}
               className="mt-8 w-full max-w-lg relative perspective-1000 origin-top-left"
               style={{ 
                 perspective: '1000px',
                 transformStyle: 'preserve-3d',
                 transform: 'rotateX(10deg) rotateY(-10deg) rotateZ(-2deg) translateX(40px)'
               }}
            >
               <div className="rounded-3xl overflow-visible shadow-[20px_20px_60px_rgba(0,0,0,0.5)] bg-slate-800/20 backdrop-blur-sm border border-white/5 p-6 origin-top-left transition-transform hover:rotate-0 hover:scale-[1.02] duration-500 ease-out">
                 {renderInteractiveElement(enhancement.interactiveElement, lang)}
               </div>
               
               {/* Isometric shadow/platform effect */}
               <div className="absolute inset-0 bg-[#243984]/5 -z-10 rounded-3xl transform translate-x-4 translate-y-6 blur-md"></div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySpotlight;
