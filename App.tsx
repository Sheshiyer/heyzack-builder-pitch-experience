
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import CategorySpotlight from './components/ProductSpotlight';
import GeminiAssistant from './components/GeminiAssistant';
import CategoryDrawer from './components/CategoryDrawer';
import CategoryNav from './components/CategoryNav';
import { CATEGORIES } from './constants';
import Icon from './components/Icon';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'fr' : 'en');

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId);

  // Track scroll position to highlight active category in nav
  useEffect(() => {
    const container = document.getElementById('main-scroll-container');
    const handleScroll = () => {
      // Include Home and Pillars in the sections to track
      const allSections = [
        { id: 'home' },
        { id: 'pillars' },
        ...CATEGORIES
      ];
      
      const sections = allSections.map(item => document.getElementById(item.id));
      // Use container.scrollTop if available, otherwise window.scrollY
      const scrollY = container ? container.scrollTop : window.scrollY;
      const viewportHeight = container ? container.clientHeight : window.innerHeight;
      const scrollPosition = scrollY + viewportHeight / 3; // Trigger slightly earlier (1/3 down screen)

      // Default to home if nothing else matches
      let newActiveSection = 'home';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          newActiveSection = allSections[i].id;
          break;
        }
      }
      
      setCurrentSection(newActiveSection);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Run once on mount to set initial state
      handleScroll();
    } else {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Global Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg text-white text-xs font-bold tracking-wider hover:bg-black/40 transition-all uppercase hover:scale-105 active:scale-95"
          aria-label={lang === 'en' ? "Switch to French" : "Switch to English"}
        >
          <Icon name="Globe" size={14} />
          <span>{lang === 'en' ? 'FR' : 'EN'}</span>
        </button>
      </div>

      {/* Navbar removed as requested, consolidated into CategoryNav */}
      <CategoryNav activeCategoryId={currentSection} onNavigate={(id) => setCurrentSection(id)} />
      
      <main id="main-scroll-container" className="snap-y snap-mandatory overflow-y-auto h-screen w-full">
        <section className="snap-start" id="home">
          <Hero lang={lang} />
        </section>

        <section className="snap-start" id="pillars">
          <Pillars lang={lang} />
        </section>

        {/* Iterate through all 14 categories for a full ecosystem tour */}
        {CATEGORIES.map(cat => (
          <section key={cat.id} className="snap-start" id={cat.id}>
            <CategorySpotlight 
              lang={lang} 
              category={cat} 
              onViewAll={() => setActiveCategoryId(cat.id)}
            />
          </section>
        ))}

        <section className="snap-start bg-slate-900 text-white" id="assistant">
          <GeminiAssistant lang={lang} />
        </section>

        <footer className="bg-white py-24 px-6 border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#243984] to-[#E82F89] rounded-2xl flex items-center justify-center text-white shadow-lg">
                   <Icon name="Cpu" size={24} />
                </div>
                <h2 className="text-3xl font-black text-[#243984] tracking-tighter">HeyZack</h2>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                {lang === 'en' 
                  ? 'System-level building automation for high-density residential and hospitality portfolios.' 
                  : 'Automatisation de bâtiments au niveau système pour les portefeuilles multi-résidentiels.'}
              </p>
              <div className="flex gap-4">
                 {['Twitter', 'Linkedin', 'Github'].map(s => (
                   <div key={s} className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#243984] transition-colors cursor-pointer">
                      <Icon name={s} size={18} />
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Architecture</h4>
                <a href="#pillars" className="text-sm font-bold text-slate-600 hover:text-[#E82F89]">The 3 Pillars</a>
                <a href="#home" className="text-sm font-bold text-slate-600 hover:text-[#E82F89]">Category Matrix</a>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resources</h4>
                <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#E82F89]">Technical Specs</a>
                <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#E82F89]">BIM Models</a>
                <a href="#" className="text-sm font-bold text-slate-600 hover:text-[#E82F89]">Install Guide</a>
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#243984] opacity-[0.03] blur-3xl" />
               <h4 className="text-[10px] font-black text-[#243984] uppercase tracking-widest mb-4">Enterprise Inquiries</h4>
               <p className="text-sm text-slate-500 mb-8 leading-relaxed">Request a custom ROI audit for your current development project.</p>
               <button className="w-full bg-[#243984] text-white py-4 rounded-2xl text-xs font-black tracking-widest shadow-xl shadow-blue-900/20 hover:opacity-90 transition-all">
                 CONTACT SALES
               </button>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-400 tracking-[0.2em]">
            <span>&copy; 2026 HEYZACK SYSTEMS INC.</span>
            <div className="flex gap-10">
               <span className="cursor-pointer hover:text-[#243984]">DATA PRIVACY</span>
               <span className="cursor-pointer hover:text-[#243984]">LEGAL COMPLIANCE</span>
               <span className="cursor-pointer hover:text-[#243984]">SUSTAINABILITY</span>
            </div>
          </div>
        </footer>
      </main>

      <CategoryDrawer 
        lang={lang}
        category={activeCategory || CATEGORIES[0]} // Fallback to avoid null errors during close animation
        isOpen={!!activeCategory}
        onClose={() => setActiveCategoryId(null)}
      />
    </div>
  );
};

export default App;
