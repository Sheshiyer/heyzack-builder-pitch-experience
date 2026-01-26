
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { PILLARS } from '../constants';
import { Language } from '../types';
import Icon from './Icon';

interface PillarsProps {
  lang: Language;
}

const Pillars: React.FC<PillarsProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="h-screen bg-slate-950 py-24 px-6 flex flex-col justify-center overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#243984]/5 -skew-x-12 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto text-center mb-24 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tight">
          {lang === 'en' ? 'Built for Performance' : 'Conçu pour la Performance'}
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
          {lang === 'en' 
            ? 'We focus on three fundamental outcomes that drive value for builders and joy for residents.' 
            : 'Nous nous concentrons sur trois résultats fondamentaux qui créent de la valeur pour les promoteurs.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto w-full relative z-10">
        {PILLARS.map(pillar => (
          <div
            key={pillar.id}
            className={`group relative bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-12 flex flex-col items-start text-left shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden ${
              shouldReduceMotion ? '' : 'hover:-translate-y-4 transition-all duration-500'
            }`}
          >
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-3xl rounded-full"
              style={{ backgroundColor: pillar.color }}
            />
            
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/20 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
            >
              <Icon name={pillar.icon} size={32} />
            </div>

            <h3 className="text-3xl font-black mb-4 tracking-tight text-white">
              {pillar.title[lang]}
            </h3>
            
            <p className="text-slate-400 leading-relaxed text-lg font-medium">
              {pillar.description[lang]}
            </p>

            <div className="mt-10 pt-8 border-t border-slate-50 w-full">
              <button
                className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all hover:gap-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded px-2 py-2"
                style={{
                  color: pillar.color,
                  '--tw-ring-color': `${pillar.color}40`
                } as React.CSSProperties}
                aria-label={`${lang === 'en' ? 'Learn more about' : 'En savoir plus sur'} ${pillar.title[lang]}`}
              >
                {lang === 'en' ? 'THE IMPACT' : 'L\'IMPACT'}
                <Icon name="ChevronRight" size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pillars;
