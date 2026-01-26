
import React from 'react';
import { Language } from '../types';
import Icon from './Icon';

interface NavbarProps {
  lang: Language;
  toggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, toggleLang }) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-[100] glass-card px-8 py-3 flex justify-between items-center rounded-2xl shadow-2xl border border-white/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#243984] to-[#E82F89] rounded-xl flex items-center justify-center text-white shadow-lg">
          <Icon name="Cpu" size={24} />
        </div>
        <span className="text-xl font-black tracking-tight text-[#243984]">HeyZack</span>
      </div>

      <div className="hidden md:flex gap-10 font-bold text-gray-500 text-sm uppercase tracking-widest">
        <a href="#savings" className="hover:text-[#E82F89] transition-colors flex items-center gap-2">
          {lang === 'en' ? 'Savings' : 'Économies'}
        </a>
        <a href="#security" className="hover:text-[#E82F89] transition-colors flex items-center gap-2">
          {lang === 'en' ? 'Security' : 'Sécurité'}
        </a>
        <a href="#comfort" className="hover:text-[#E82F89] transition-colors flex items-center gap-2">
          {lang === 'en' ? 'Comfort' : 'Confort'}
        </a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl hover:bg-white transition-all border border-gray-100 shadow-sm font-bold text-xs"
        >
          <Icon name="Globe" size={16} className="text-[#243984]" />
          <span>{lang === 'en' ? 'ENGLISH' : 'FRANÇAIS'}</span>
        </button>
        <button className="bg-[#243984] text-white px-5 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity">
          GET STARTED
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
