import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PILLARS } from '../constants';
import { Language } from '../types';
import Icon from './Icon';

interface PillarsProps {
  lang: Language;
}

const Pillars: React.FC<PillarsProps> = ({ lang }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <div className="h-screen bg-slate-950 py-24 px-6 flex flex-col justify-center overflow-hidden relative">
      {/* Cinematic Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#243984]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#E82F89]">Architectural Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-[900] mb-8 text-white tracking-tighter leading-none">
            {lang === 'en' ? 'Engineered for Value' : 'Conçu pour la Valeur'}
          </h2>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            {lang === 'en' 
              ? 'Transform your developments into high-performance assets that command rent premiums and elite resident satisfaction.' 
              : 'Transformez vos projets en actifs de haute performance qui justifient des loyers premium et une satisfaction élite.'}
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full relative z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {PILLARS.map((pillar) => (
          <motion.div
            key={pillar.id}
            variants={cardVariants}
            className="group relative"
          >
            {/* Background Glow */}
            <div 
              className="absolute -inset-2 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 rounded-[3rem]"
              style={{ background: `radial-gradient(circle at top right, ${pillar.color}15, transparent)` }}
            />
            
            <div className="relative bg-[#0d121f]/80 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 h-full flex flex-col items-start shadow-2xl transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-2">
              {/* Corner Accent */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 opacity-10 blur-2xl rounded-full"
                style={{ backgroundColor: pillar.color }}
              />
              
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-inner border border-white/5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `linear-gradient(135deg, ${pillar.color}10 0%, ${pillar.color}30 100%)`, color: pillar.color }}
              >
                <Icon name={pillar.icon} size={32} strokeWidth={1.5} />
              </div>

              <h3 className="text-3xl font-[800] mb-6 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-slate-400 transition-all duration-500">
                {pillar.title[lang]}
              </h3>
              
              <p className="text-slate-400 leading-relaxed text-lg font-normal opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {pillar.description[lang]}
              </p>

              {/* Decorative line */}
              <div 
                className="mt-12 w-12 h-1 rounded-full transition-all duration-500 group-hover:w-full opacity-30"
                style={{ backgroundColor: pillar.color }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pillars;
