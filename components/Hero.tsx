
import React from 'react';
import { Language } from '../types';
import Icon from './Icon';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Immersive background with depth */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20000ms] scale-110 animate-subtle-zoom"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 animate-fade-in">
          <Icon name="Zap" size={16} className="text-[#E82F89]" />
          <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">Next Generation Automation</span>
        </div>
        
        <h1 className="text-6xl md:text-[5.5rem] font-[800] text-white leading-[1.05] mb-8 tracking-tighter">
          {lang === 'en' ? (
            <>The Smart Building Platform <br/><span className="gradient-text">That Pays For Itself</span></>
          ) : (
            <>La plateforme intelligente <br/><span className="gradient-text">qui s'autofinance</span></>
          )}
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
          {lang === 'en' 
            ? '128 devices. 15 categories. One seamless AI ecosystem for residential builders.' 
            : '128 appareils. 15 catégories. Un écosystème IA fluide pour les promoteurs.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="btn-primary text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-[0_0_30px_rgba(232,47,137,0.3)]">
            {lang === 'en' ? 'Explore catalog' : 'Explorer le catalogue'}
          </button>
          <button className="flex items-center gap-3 bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all group">
            <span>{lang === 'en' ? 'Book a demo' : 'Réserver une démo'}</span>
            <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/30">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{lang === 'en' ? 'SCROLL TO DISCOVER' : 'DÉFILER'}</span>
      </div>
    </div>
  );
};

export default Hero;
