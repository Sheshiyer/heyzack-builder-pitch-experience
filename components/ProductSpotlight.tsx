
import React, { useState } from 'react';
import { Category, Product, Language } from '../types';
import { HERO_PRODUCTS, CATEGORIES } from '../constants';
import Icon from './Icon';

interface CategorySpotlightProps {
  lang: Language;
  category: Category;
  onViewAll: () => void;
}

const CategorySpotlight: React.FC<CategorySpotlightProps> = ({ lang, category, onViewAll }) => {
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  
  const heroProduct: Product | undefined = HERO_PRODUCTS[category.heroProductId];

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="h-screen bg-white py-24 px-6 flex items-center overflow-hidden border-b border-slate-50 relative group/section">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        
        {/* Left Col: Interactive Category Hub */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          <div className="absolute -inset-20 bg-gradient-to-tr from-[#243984]/5 to-[#E82F89]/5 rounded-[5rem] blur-3xl opacity-50" />
          
          {/* Central Node: Hero Product */}
          <div className="relative bg-slate-50 rounded-[4rem] p-8 shadow-inner border border-white overflow-hidden aspect-square flex flex-col items-center justify-center w-full max-w-md">
            {isSimulating && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[2px] border-[#E82F89]/30 rounded-full animate-ping" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border-[2px] border-[#243984]/20 rounded-full animate-ping [animation-delay:0.5s]" />
              </div>
            )}

            {heroProduct ? (
              <img 
                src={heroProduct.imageUrl} 
                alt={category.name[lang]} 
                className={`w-4/5 h-auto object-contain transition-all duration-700 mix-blend-multiply ${isSimulating ? 'scale-105 rotate-1' : ''}`}
              />
            ) : (
              <Icon name="Layers" size={120} className="text-slate-200" />
            )}

            {/* Bottom Specs Bar */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-2">
               {heroProduct?.specs.slice(0, 3).map((s, i) => (
                 <div key={i} className="flex-1 bg-white/60 backdrop-blur-md p-2 rounded-xl border border-white text-[8px] font-black text-slate-500 uppercase tracking-widest text-center">
                    {s}
                 </div>
               ))}
            </div>
          </div>

          <div className="mt-8 bg-slate-100 p-4 rounded-3xl flex gap-6 items-center border border-slate-200 shadow-sm">
             <div className="flex flex-col items-center">
                <span className="text-xl font-black text-[#243984]">{category.productCount}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SKUs</span>
             </div>
             <div className="w-[1px] h-8 bg-slate-200" />
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-700">{heroProduct?.sku || 'HEYZACK SERIES'}</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Enterprise Ready</span>
             </div>
          </div>
        </div>

        {/* Right Col: Narrative & Integration Hub */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div>
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
          </div>

          {/* New Integration Grid */}
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
               <Icon name="Network" size={16} className="text-[#243984]" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {lang === 'en' ? 'Connected Logic Partners' : 'Partenaires de Logique Connectée'}
               </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {category.connections.length > 0 ? category.connections.map((link) => {
                 const partner = CATEGORIES.find(c => c.id === link.partnerId);
                 const isActive = activePartnerId === link.partnerId;
                 return (
                   <div 
                     key={link.partnerId}
                     onMouseEnter={() => setActivePartnerId(link.partnerId)}
                     onMouseLeave={() => setActivePartnerId(null)}
                     className={`p-6 rounded-[2.5rem] transition-all border-2 flex flex-col gap-3 relative overflow-hidden group/card ${
                       isActive 
                       ? 'bg-[#243984] border-[#243984] shadow-2xl -translate-y-1' 
                       : 'bg-slate-50 border-transparent hover:border-slate-200'
                     }`}
                   >
                     <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
                          {partner?.name[lang] || 'System Node'}
                        </span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-[#E82F89] text-white' : 'bg-white text-slate-300'
                        }`}>
                           <Icon name="Zap" size={14} />
                        </div>
                     </div>
                     <p className={`text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-[#243984]'}`}>
                       {link.label[lang]}
                     </p>
                     
                     <div className={`text-[10px] font-medium leading-relaxed mt-1 transition-opacity ${isActive ? 'text-white/80 opacity-100' : 'text-slate-500 opacity-0'}`}>
                       {link.description[lang]}
                       <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                          <span className="text-white font-black">{link.impactMetric[lang]}</span>
                          <Icon name="ArrowRight" size={10} />
                       </div>
                     </div>
                   </div>
                 );
               }) : (
                 <div className="col-span-full py-8 text-center text-slate-300 italic font-medium border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                   Standalone capable or Matter-mesh integration.
                 </div>
               )}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <button 
              onClick={onViewAll}
              className="bg-[#243984] text-white px-10 py-6 rounded-3xl font-black text-xs hover:opacity-90 transition-all flex items-center gap-4 group shadow-xl shadow-blue-900/20"
            >
              <span>{lang === 'en' ? 'VIEW PROJECT REFS' : 'RÉFÉRENCES PROJET'}</span>
              <Icon name="ChevronRight" size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={runSimulation}
              disabled={isSimulating}
              className="bg-white text-[#243984] border border-slate-200 px-8 py-6 rounded-3xl font-black text-xs hover:bg-slate-50 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              <Icon name="Activity" size={18} className={isSimulating ? 'animate-spin' : ''} />
              {isSimulating ? 'SIMULATING...' : 'TEST LOGIC'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySpotlight;
