
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Category, Language } from '../types';
import { ALL_PRODUCTS } from '../constants';
import Icon from './Icon';
import { gridWave, elasticEntrance, fadeInUp } from '../utils/animations';
import { createGlassEffect, depthShadows } from '../utils/designTokens';

interface CategoryModalProps {
  lang: Language;
  category: Category;
  onClose: () => void;
}

// Ecosystem compatibility badges data
const ecosystemBadges = [
  { id: 'iot', label: 'IoT Ready', icon: 'Cpu' },
  { id: 'cloud', label: 'Cloud Native', icon: 'Cloud' },
  { id: 'ai', label: 'AI Compatible', icon: 'Zap' },
  { id: 'mobile', label: 'Mobile Sync', icon: 'Smartphone' }
];

const CategoryModal: React.FC<CategoryModalProps> = ({ lang, category, onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl animate-fade-in text-white transition-colors duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="bg-slate-950 w-full max-w-7xl h-[90vh] rounded-[4rem] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.8)] flex flex-col relative animate-scale-up border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-10 w-14 h-14 bg-white/5 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#E82F89] hover:text-white transition-all z-20 group border border-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#E82F89]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label={lang === 'en' ? 'Close catalog modal' : 'Fermer le catalogue'}
        >
          <Icon name="X" size={24} className="group-hover:rotate-90 transition-transform" aria-hidden="true" />
        </button>

        <div className="p-16 pb-10 border-b border-white/5 flex flex-col sm:flex-row justify-between items-end gap-10 bg-slate-950">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#243984]/20 px-4 py-1 rounded-full text-[#243984] font-black text-[10px] uppercase tracking-[0.2em] border border-[#243984]/30">
                {lang === 'en' ? 'ENTERPRISE CATALOG' : 'CATALOGUE ENTREPRISE'}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{category.productCount} SKUs</span>
            </div>
            <h2 id="modal-title" className="text-6xl font-black text-white tracking-tight leading-none text-shadow-xl">
              {category.name[lang]}
            </h2>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl border border-white/10 font-black text-[10px] uppercase tracking-widest text-slate-300 hover:bg-white/10 transition-all hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
               aria-label={lang === 'en' ? 'Open product filters' : 'Ouvrir les filtres de produits'}>
                <Icon name="Settings2" size={16} aria-hidden="true" />
                FILTERS
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-16 bg-gradient-to-br from-slate-950 to-slate-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ALL_PRODUCTS.filter(p => p.category === category.id).map((product, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const isHovered = hoveredCard === i;

              // Get random ecosystem badges (2-3 per product)
              const productBadges = ecosystemBadges
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.floor(Math.random() * 2) + 2);

              return (
                <motion.div
                  key={product.id}
                  variants={shouldReduceMotion ? undefined : gridWave(row, col)}
                  initial="hidden"
                  animate="visible"
                  onHoverStart={() => setHoveredCard(i)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-white/5 p-8 rounded-[3rem] flex flex-col items-start group overflow-hidden relative"
                  style={{
                    boxShadow: isHovered
                      ? `${depthShadows.deep}, 0 0 80px rgba(36, 57, 132, 0.3), 0 0 120px rgba(232, 47, 137, 0.2)`
                      : depthShadows.float,
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: shouldReduceMotion ? 'none' : 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                  whileHover={shouldReduceMotion ? undefined : {
                    y: -8,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    transition: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }
                  }}
                >
                  {/* Animated gradient border - starts at top, expands to full on hover */}
                  <motion.div
                    className="absolute top-0 left-0 rounded-[3rem] bg-gradient-to-r from-[#243984] to-[#E82F89]"
                    initial={{
                      width: '100%',
                      height: '2px',
                      opacity: 0
                    }}
                    animate={isHovered ? {
                      width: '100%',
                      height: '100%',
                      opacity: 0.15,
                      transition: shouldReduceMotion ? { duration: 0 } : {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }
                    } : {
                      width: '100%',
                      height: '2px',
                      opacity: 0,
                      transition: shouldReduceMotion ? { duration: 0 } : {
                        duration: 0.4
                      }
                    }}
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* Glass reflection effect */}
                  <div
                    className="absolute inset-0 rounded-[3rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.05) 100%)',
                      transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease'
                    }}
                  />

                  <div className="w-full aspect-square bg-slate-900/50 rounded-[2.5rem] mb-8 flex items-center justify-center overflow-hidden border border-white/5 relative">
                    <motion.img
                      src={product.imageUrl}
                      alt={product.name[lang]}
                      className="w-3/4 h-auto mix-blend-screen opacity-90"
                      animate={isHovered && !shouldReduceMotion ? {
                        scale: 1.1,
                        transition: {
                          duration: 0.7,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }
                      } : { scale: 1 }}
                    />
                  </div>

                  <div className="text-[10px] font-black text-[#243984] uppercase tracking-widest mb-3 opacity-70">HEYZACK SERIES 2026</div>
                  <h4 className="text-xl font-black text-slate-200 mb-2 tracking-tight group-hover:text-white transition-colors relative z-10 line-clamp-2 min-h-[3.5rem]" title={product.name[lang]}>
                    {product.name[lang]}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono mb-4 font-bold">{product.sku}</p>

                  {/* Ecosystem compatibility badges - animated reveal on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="flex flex-wrap gap-2 mb-4 relative z-10"
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          marginBottom: 16,
                          transition: shouldReduceMotion ? { duration: 0 } : {
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94]
                          }
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginBottom: 0,
                          transition: shouldReduceMotion ? { duration: 0 } : {
                            duration: 0.2
                          }
                        }}
                      >
                        {productBadges.map((badge, idx) => (
                          <motion.div
                            key={badge.id}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
                            style={{
                              ...createGlassEffect('light'),
                              backgroundColor: 'rgba(36, 57, 132, 0.2)',
                              borderColor: 'rgba(36, 57, 132, 0.3)'
                            }}
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0,
                              transition: shouldReduceMotion ? { duration: 0 } : {
                                delay: idx * 0.05,
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                              }
                            }}
                          >
                            <Icon name={badge.icon as any} size={10} className="text-[#243984]" />
                            <span className="text-slate-300">{badge.label}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-auto w-full pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                     <button
                       className="text-[#E82F89] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#ff4fa7] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E82F89]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded px-2 py-1"
                       aria-label={lang === 'en' ? `View specifications for ${product.name[lang]}` : `Voir les spécifications pour ${product.name[lang]}`}
                     >
                        SPECS
                        <Icon name="ArrowUpRight" size={12} aria-hidden="true" />
                     </button>
                     <motion.button
                       className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#243984] group-hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                       whileHover={shouldReduceMotion ? undefined : {
                         scale: 1.1,
                         rotate: 90,
                         transition: {
                           type: 'spring',
                           stiffness: 300,
                           damping: 30
                         }
                       }}
                       aria-label={lang === 'en' ? `Add ${product.name[lang]} to selection` : `Ajouter ${product.name[lang]} à la sélection`}
                     >
                        <Icon name="Plus" size={14} aria-hidden="true" />
                     </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center bg-slate-950 gap-8">
          <div className="flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
             <Icon name="Info" size={18} className="text-[#243984]" />
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {lang === 'en' ? 'Bespoke integration available for bulk unit deployments.' : 'Intégration sur mesure disponible pour les déploiements de masse.'}
             </p>
          </div>
          <button onClick={onClose} className="bg-[#243984] text-white px-12 py-5 rounded-[2rem] text-xs font-black tracking-widest shadow-xl shadow-blue-900/20 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#243984]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
            {lang === 'en' ? 'DISMISS CATALOG' : 'FERMER'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
