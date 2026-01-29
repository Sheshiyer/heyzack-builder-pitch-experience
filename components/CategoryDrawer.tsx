import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, Product, Language } from '../types';
import { ALL_PRODUCTS } from '../constants';
import Icon from './Icon';
import { createGlassEffect } from '../utils/designTokens';

interface CategoryDrawerProps {
  lang: Language;
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const CategoryDrawer: React.FC<CategoryDrawerProps> = ({ lang, category, isOpen, onClose }) => {
  // Get all products for this category
  const products = useMemo(() => 
    ALL_PRODUCTS.filter(p => p.category === category.id), 
  [category.id]);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id || null);

  const selectedProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId) || products[0],
  [products, selectedProductId]);
  const productAutomations = selectedProduct?.automations?.[lang] ?? [];
  const productScenes = selectedProduct?.connectedScenes?.[lang] ?? [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-4xl bg-white shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Left Sidebar: Product List */}
            <div className="w-full md:w-1/3 bg-slate-50 border-r border-slate-200 flex flex-col h-full">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                   <button onClick={onClose} className="p-2 -ml-2 hover:bg-slate-200 rounded-full transition-colors md:hidden">
                     <Icon name="ArrowLeft" size={20} className="text-slate-600" />
                   </button>
                   <span className="text-[10px] font-black text-[#E82F89] uppercase tracking-widest">
                      {lang === 'en' ? 'CATEGORY CATALOG' : 'CATALOGUE DE CATÉGORIE'}
                   </span>
                </div>
                <h2 className="text-xl font-black text-[#243984] leading-tight">
                  {category.name[lang]}
                </h2>
                <div className="mt-2 text-xs font-bold text-slate-400">
                  {category.productCount} {lang === 'en' ? 'Products Available' : 'Produits disponibles'}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {products.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`w-full text-left p-4 rounded-xl mb-2 transition-all group ${
                      selectedProductId === p.id 
                        ? 'bg-[#243984] text-white shadow-lg' 
                        : 'hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm truncate pr-2">{p.name[lang]}</span>
                      {selectedProductId === p.id && <Icon name="ChevronRight" size={14} />}
                    </div>
                    <div className={`text-[10px] uppercase font-black tracking-wider mt-1 ${
                      selectedProductId === p.id ? 'text-white/60' : 'text-slate-400'
                    }`}>
                      {p.sku}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Main Area: Product Details */}
            <div className="flex-1 h-full overflow-y-auto bg-white relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors hidden md:flex"
              >
                <Icon name="X" size={20} />
              </button>

              {selectedProduct ? (
                <div className="p-8 pb-24">
                   {/* Product Header */}
                   <div className="mb-6">
                     <div className="inline-block px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
                        {selectedProduct.sku}
                     </div>
                     <h3 className="text-3xl font-bold text-slate-900 mb-4">{selectedProduct.name[lang]}</h3>
                   </div>

                   {/* Product Image */}
                   <div className="mb-6 p-8 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center">
                      <motion.img 
                        key={selectedProduct.id}
                        src={selectedProduct.imageUrl} 
                        alt={selectedProduct.name[lang]}
                        className="w-full max-h-[300px] object-contain"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                   </div>

                   {/* Short Tagline */}
                   <div className="mb-10">
                     <p className="text-lg text-slate-600 font-medium leading-relaxed">
                       {selectedProduct.description[lang].split('\n\n')[0]}
                     </p>
                   </div>

                   {/* Three Pillars Analysis */}
                   <div className="mb-12 space-y-6">
                      {/* Security Pillar */}
                      <div className="p-6 rounded-2xl bg-[#243984]/5 border-l-4 border-[#243984]">
                        <h4 className="text-xl font-black text-[#243984] mb-2 uppercase flex items-center gap-2">
                           <Icon name="Shield" size={24} />
                           {lang === 'en' ? 'Security' : 'Sécurité'}
                        </h4>
                        <p className="text-slate-700 font-medium">
                           {(productAutomations.find(a => /secur|detect|safe|alert|camera|lock|alarm|siren|sécur|détect|alerte|caméra|serrure|alarme|sirène/i.test(a)) || (lang === 'en' ? "Continuous monitoring and protection for your property throughout the day and night." : "Surveillance et protection continues de votre propriété jour et nuit."))}
                        </p>
                      </div>

                      {/* Savings Pillar */}
                      <div className="p-6 rounded-2xl bg-[#10B981]/5 border-l-4 border-[#10B981]">
                        <h4 className="text-xl font-black text-[#10B981] mb-2 uppercase flex items-center gap-2">
                           <Icon name="TrendingDown" size={24} />
                           {lang === 'en' ? 'Savings' : 'Économies'}
                        </h4>
                         <p className="text-slate-700 font-medium">
                           {(productAutomations.find(a => /sav|energy|cost|cut|efficien|consumption|bill|économ|énergie|coût|rédu|consommation|facture/i.test(a)) || (lang === 'en' ? "Optimizes operational efficiency to reduce waste and lower utility costs." : "Optimise l'efficacité opérationnelle pour réduire le gaspillage et les coûts."))}
                        </p>
                      </div>

                      {/* Comfort Pillar */}
                      <div className="p-6 rounded-2xl bg-[#E82F89]/5 border-l-4 border-[#E82F89]">
                        <h4 className="text-xl font-black text-[#E82F89] mb-2 uppercase flex items-center gap-2">
                           <Icon name="Sparkles" size={24} />
                           {lang === 'en' ? 'Comfort' : 'Confort'}
                        </h4>
                        <p className="text-slate-700 font-medium">
                           {(productAutomations.find(a => /comfort|auto|ease|scene|voice|remot|schedul|confort|auto|scène|voix|distance|programm/i.test(a)) || (lang === 'en' ? "Simplifies daily interactions through intuitive automation and controls." : "Simplifie les interactions grâce à une automatisation et des commandes intuitives."))}
                        </p>
                      </div>
                   </div>

                   {/* Product Specific Automations */}
                   {productAutomations.length > 0 && (
                     <div className="border-t border-slate-100 pt-10 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                          <Icon name="Zap" size={20} className="text-[#E82F89]" />
                          <h4 className="font-black text-[#E82F89] uppercase tracking-widest text-sm">
                            {lang === 'en' ? 'Smart Automations' : 'Automatisations intelligentes'}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                           {productAutomations.map((auto, i) => (
                             <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <span className="w-6 h-6 rounded-full bg-[#E82F89]/10 text-[#E82F89] flex items-center justify-center font-bold text-xs shrink-0">{i+1}</span>
                                <p className="text-sm text-slate-600 font-medium">{auto}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                   {/* Product Specific Connected Scenes */}
                   {productScenes.length > 0 && (
                     <div className="border-t border-slate-100 pt-10">
                        <div className="flex items-center gap-3 mb-6">
                          <Icon name="Network" size={20} className="text-[#243984]" />
                          <h4 className="font-black text-[#243984] uppercase tracking-widest text-sm">
                            {lang === 'en' ? 'Ecosystem Integration' : "Intégration à l'écosystème"}
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                           {productScenes.map((scene, i) => (
                             <div key={i} className="group p-4 bg-white rounded-xl border-l-4 border-l-[#243984] border border-slate-200 shadow-sm">
                                <p className="text-sm text-slate-700 font-medium">{scene}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                   )}

                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                   {lang === 'en' ? 'Select a product to view details' : 'Sélectionnez un produit pour voir les détails'}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CategoryDrawer;
