
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
          <div className="relative w-full max-w-2xl aspect-square h-[700px] flex flex-col items-center justify-center z-30 mb-16">
            
            {/* CURRENT PRODUCT NAME - Moved above the deck */}
            <AnimatePresence mode="wait">
              <motion.div
                 key={currentProduct?.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="mb-8 z-40 text-center px-4"
              >
                 <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md inline-block shadow-lg">
                    <span className="text-sm font-black text-white/80 uppercase tracking-widest leading-none">
                       {currentProduct?.name[lang]}
                    </span>
                 </div>
              </motion.div>
            </AnimatePresence>

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
                      className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/10 overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ease-out"
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
          className="lg:col-span-1 flex flex-col gap-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="space-y-3">
            {/* Compact Category Tag and Title */}
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#E82F89]" />
              <span className="text-[#E82F89] font-black uppercase tracking-[0.25em] text-[9px] whitespace-nowrap">
                {lang === 'en' ? 'CATEGORY ECOSYSTEM' : 'ÉCOSYSTÈME DE CATÉGORIE'}
              </span>
            </div>

            {/* Category Title with Dynamic Sizing */}
            <h3 
              className="font-black text-[#243984] tracking-tight leading-[0.9]"
              style={{
                fontSize: `clamp(2.5rem, ${Math.max(2.5, 4.5 - (category.name[lang].length * 0.05))}rem, 4.5rem)`
              }}
            >
              <span className="inline-block max-w-full break-words hyphens-auto" lang={lang}>
                {category.name[lang]}
              </span>
            </h3>

            <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-xl">
              {category.description[lang]}
            </p>
          </motion.div>

          {/* New Integration Grid */}
          <motion.div className="relative" variants={fadeInUp}>
            <div className="flex items-center gap-2 mb-4">
               <Icon name="Zap" size={14} className="text-[#E82F89]" />
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                 {lang === 'en' ? 'ECOSYSTEM FEATURES' : "FONCTIONNALITÉS DE L'ÉCOSYSTÈME"}
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
                  const pathId = `path-${link.partnerId}-${index}`;
                  const path = getConnectionPath(index, category.connections.length);

                  return (
                    <g key={`${link.partnerId}-${index}`}>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-3 relative"
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
                     key={`${link.partnerId}-${index}`}
                     variants={cardReveal}
                     role="button"
                     tabIndex={0}
                     onMouseEnter={() => setHoveredPartner(link.partnerId)}
                     onMouseLeave={() => setHoveredPartner(null)}
                     className={`group/card relative p-6 rounded-[1.5rem] transition-all border border-white/10 bg-slate-900/40 backdrop-blur-xl flex flex-col shadow-2xl overflow-hidden cursor-pointer hover:border-white/20`}
                     whileHover={
                       prefersReducedMotion
                         ? {}
                         : { y: -5, transition: { duration: 0.3 } }
                     }
                     aria-label={`${partner?.name[lang] || (lang === 'en' ? 'System Node' : 'Nœud système')}: ${link.label[lang]}`}
                   >
                     {/* Subtle Internal Glow */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#E82F89]/5 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                     
                     <div className="flex items-start justify-between relative z-10 mb-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#E82F89]" />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
                                {partner?.name[lang] || (lang === 'en' ? 'System Feature' : 'Fonction système')}
                             </span>
                          </div>
                          <h4 className="text-xl font-[800] text-white tracking-tight">
                            {link.label[lang]}
                          </h4>
                        </div>
                     </div>

                     <p className="text-sm font-medium leading-relaxed text-slate-400 relative z-10 group-hover/card:text-slate-300 transition-colors mb-3">
                       {link.description[lang]}
                     </p>

                     {/* Impact Metric Badge */}
                     {link.impactMetric && (
                       <div className="flex items-center gap-2 relative z-10">
                         <div className="px-3 py-1.5 rounded-lg bg-[#E82F89]/10 border border-[#E82F89]/20">
                           <span className="text-[10px] font-black text-[#E82F89] uppercase tracking-wider">
                             {link.impactMetric[lang]}
                           </span>
                         </div>
                       </div>
                     )}
                   </motion.div>
                 );
               }) : (
                 <motion.div
                   className="col-span-full py-8 text-center text-slate-300 italic font-medium border-2 border-dashed border-slate-100 rounded-[2.5rem]"
                   variants={cardReveal}
                 >
                   {lang === 'en' ? 'Standalone capable or Matter-mesh integration.' : 'Autonome ou intégration Matter-mesh.'}
                 </motion.div>
               )}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 mt-2"
            variants={fadeInUp}
          >
            <motion.button
              onClick={onViewAll}
              className="bg-[#243984] text-white px-8 py-5 rounded-3xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-3 group shadow-xl shadow-blue-900/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={lang === 'en' ? 'View product catalog for this category' : 'Voir le catalogue produits pour cette catégorie'}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span>{lang === 'en' ? 'PRODUCT CATALOG' : 'CATALOGUE PRODUITS'}</span>
              <Icon name="ChevronRight" size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </motion.button>
          </motion.div>


          {/* Interactive Element - Removed per user request */}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySpotlight;
