
import React from 'react';
import { Category, Language } from '../types';
import Icon from './Icon';

interface CategoryModalProps {
  lang: Language;
  category: Category;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ lang, category, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div 
        className="bg-white w-full max-w-7xl h-[90vh] rounded-[4rem] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.4)] flex flex-col relative animate-scale-up border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#E82F89] hover:text-white transition-all z-20 group"
        >
          <Icon name="X" size={24} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="p-16 pb-10 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-end gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#243984]/5 px-4 py-1 rounded-full text-[#243984] font-black text-[10px] uppercase tracking-[0.2em]">
                {lang === 'en' ? 'ENTERPRISE CATALOG' : 'CATALOGUE ENTREPRISE'}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">{category.productCount} SKUs</span>
            </div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-none">
              {category.name[lang]}
            </h2>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-2xl border border-slate-100 font-black text-[10px] uppercase tracking-widest text-[#243984] hover:bg-slate-100 transition-all">
                <Icon name="Settings2" size={16} />
                FILTERS
             </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-16 bg-slate-50/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: category.productCount }).map((_, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-start group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#243984] to-[#E82F89] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-full aspect-square bg-slate-50 rounded-[2.5rem] mb-8 flex items-center justify-center overflow-hidden border border-slate-50">
                  <img src={`https://picsum.photos/seed/${category.id}-${i}/600/600`} alt="Product" className="w-3/4 h-auto transform group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                </div>
                
                <div className="text-[10px] font-black text-[#243984] uppercase tracking-widest mb-3 opacity-50">HEYZACK SERIES 2026</div>
                <h4 className="text-xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-[#243984] transition-colors">
                  {lang === 'en' ? `Model ${i+100}` : `Modèle ${i+100}`}
                </h4>
                <p className="text-[10px] text-slate-400 font-mono mb-8 font-bold">SKU-ZACK-{i+1000}</p>
                
                <div className="mt-auto w-full pt-6 border-t border-slate-50 flex justify-between items-center">
                   <button className="text-[#E82F89] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                      SPECS
                      <Icon name="ArrowUpRight" size={12} />
                   </button>
                   <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#243984] group-hover:text-white transition-all">
                      <Icon name="Plus" size={14} />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-white gap-8">
          <div className="flex items-center gap-4 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
             <Icon name="Info" size={18} className="text-[#243984]" />
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {lang === 'en' ? 'Bespoke integration available for bulk unit deployments.' : 'Intégration sur mesure disponible pour les déploiements de masse.'}
             </p>
          </div>
          <button onClick={onClose} className="bg-[#243984] text-white px-12 py-5 rounded-[2rem] text-xs font-black tracking-widest shadow-xl shadow-blue-900/20">
            {lang === 'en' ? 'DISMISS CATALOG' : 'FERMER'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
