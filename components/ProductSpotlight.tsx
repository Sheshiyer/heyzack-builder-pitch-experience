
import React, { useState } from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Category, Product, Language } from '../types';
import { HERO_PRODUCTS, CATEGORIES } from '../constants';
import Icon from './Icon';
import { fadeInUp, breathingPulse, staggerContainer } from '../utils/animations';
import { createGlassEffect, depthShadows } from '../utils/designTokens';

interface CategorySpotlightProps {
  lang: Language;
  category: Category;
  onViewAll: () => void;
}

const CategorySpotlight: React.FC<CategorySpotlightProps> = ({ lang, category, onViewAll }) => {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const heroProduct: Product | undefined = HERO_PRODUCTS[category.heroProductId];

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

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

  return (
    <div className="h-screen bg-slate-950 py-24 px-6 flex items-center overflow-hidden border-b border-white/5 relative group/section">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        
        {/* Left Col: Interactive Category Hub */}
        <motion.div
          className="lg:col-span-5 relative flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* Animated gradient glow with breathing pulse */}
          <motion.div
            className="absolute -inset-20 bg-gradient-to-tr from-[#243984]/20 to-[#E82F89]/20 rounded-[5rem] blur-3xl"
            variants={breathingPulse}
            initial="initial"
            animate="animate"
          />

          {/* Central Node: Hero Product */}
          <motion.div
            className="relative bg-slate-900 rounded-[4rem] p-8 shadow-2xl border border-white/10 overflow-hidden aspect-square flex flex-col items-center justify-center w-full max-w-md"
            style={{
              perspective: 1000,
              boxShadow: depthShadows.deep
            }}
            variants={rotation3D}
            initial="initial"
            whileHover="hover"
          >
            {isSimulating && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[2px] border-[#E82F89]/50 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-[2px] border-[#243984]/40 rounded-full animate-ping [animation-delay:0.5s]" />
              </div>
            )}

            {/* Floating product with animation */}
            <motion.div
              variants={floatingProduct}
              initial="initial"
              animate="animate"
              className="w-4/5"
            >
              {heroProduct ? (
                <img
                  src={heroProduct.imageUrl}
                  alt={category.name[lang]}
                  className={`w-full h-auto object-contain transition-all duration-700 mix-blend-screen opacity-90 ${isSimulating ? 'scale-105 rotate-1' : ''}`}
                />
              ) : (
                <Icon name="Layers" size={120} className="text-slate-700 mx-auto" />
              )}
            </motion.div>

            {/* Bottom Specs Bar */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-2">
               {heroProduct?.specs.slice(0, 3).map((s, i) => (
                 <motion.div
                   key={i}
                   className="flex-1 bg-white/60 backdrop-blur-md p-2 rounded-xl border border-white text-[8px] font-black text-slate-500 uppercase tracking-widest text-center"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 + 0.5 }}
                 >
                    {s}
                 </motion.div>
               ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-8 bg-slate-100 p-4 rounded-3xl flex gap-6 items-center border border-slate-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
             <div className="flex flex-col items-center">
                <span className="text-xl font-black text-[#243984]">{category.productCount}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SKUs</span>
             </div>
             <div className="w-[1px] h-8 bg-slate-200" />
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-700">{heroProduct?.sku || 'HEYZACK SERIES'}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Enterprise Ready</span>
             </div>
          </motion.div>
        </motion.div>

        {/* Right Col: Narrative & Integration Hub */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-10"
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
                        strokeOpacity={isActive ? 0.6 : 0.2}
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
              aria-label={lang === 'en' ? 'View project references for this category' : 'Voir les références de projet pour cette catégorie'}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <span>{lang === 'en' ? 'VIEW PROJECT REFS' : 'RÉFÉRENCES PROJET'}</span>
              <Icon name="ChevronRight" size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </motion.button>
            <motion.button
              onClick={runSimulation}
              disabled={isSimulating}
              className="bg-white text-[#243984] border border-slate-200 px-8 py-6 rounded-3xl font-black text-xs hover:bg-slate-50 transition-all flex items-center gap-3 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={lang === 'en' ? 'Test automation logic simulation' : 'Tester la simulation de logique d\'automatisation'}
              aria-live="polite"
              aria-busy={isSimulating}
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Icon name="Activity" size={18} className={isSimulating ? 'animate-spin' : ''} aria-hidden="true" />
              {isSimulating ? 'SIMULATING...' : 'TEST LOGIC'}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySpotlight;
