
import React, { useState, useEffect } from 'react';
import { SCENES } from '../constants';
import { Language, Scene } from '../types';
import Icon from './Icon';

interface SceneTimelineProps { lang: Language; }

const SceneTimeline: React.FC<SceneTimelineProps> = ({ lang }) => {
  const [activeScene, setActiveScene] = useState<Scene>(SCENES[0]);
  const [executingStep, setExecutingStep] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const executeSequence = () => {
    setIsDone(false);
    let step = 0;
    const interval = setInterval(() => {
      setExecutingStep(step);
      step++;
      if (step > activeScene.steps.length) {
        clearInterval(interval);
        setExecutingStep(null);
        setIsDone(true);
      }
    }, 1200);
  };

  useEffect(() => {
    setExecutingStep(null);
    setIsDone(false);
  }, [activeScene]);

  return (
    <div className="h-screen py-24 px-6 flex items-center bg-[#F1F3F6] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #243984 1px, transparent 1px), linear-gradient(#243984 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Col: Scene Selection & Business Case */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#243984] flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
               <Icon name="Workflow" size={24} />
            </div>
            <span className="text-[#243984] font-black uppercase tracking-[0.4em] text-[10px]">
              {lang === 'en' ? 'B2B LOGIC ENGINE' : 'MOTEUR LOGIQUE B2B'}
            </span>
          </div>

          <h2 className="text-5xl font-black text-slate-900 mb-10 tracking-tight leading-none">
            {lang === 'en' ? 'System Orchestration' : 'Orchestration Système'}
          </h2>

          <div className="space-y-3 mb-12">
            {SCENES.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveScene(s)}
                className={`w-full text-left p-6 rounded-3xl transition-all border-2 flex items-center justify-between group ${
                  activeScene.id === s.id 
                  ? 'bg-white border-[#243984] shadow-2xl scale-[1.02]' 
                  : 'bg-white/50 border-transparent hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${activeScene.id === s.id ? 'text-[#E82F89]' : 'text-slate-400'}`}>
                    {s.category}
                  </span>
                  <span className={`font-bold ${activeScene.id === s.id ? 'text-[#243984]' : 'text-slate-600'}`}>
                    {s.name[lang]}
                  </span>
                </div>
                <Icon name="ChevronRight" size={16} className={`${activeScene.id === s.id ? 'text-[#243984]' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>

          <div className="bg-[#10B981] p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-900/20 text-white relative overflow-hidden">
             <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2 block">
                  {lang === 'en' ? 'MEASURABLE ROI' : 'ROI MESURABLE'}
                </span>
                <div className="text-3xl font-black">{activeScene.b2bMetric[lang]}</div>
             </div>
             <Icon name="TrendingDown" size={80} className="absolute -bottom-4 -right-4 opacity-10 rotate-12" />
          </div>
        </div>

        {/* Right Col: The Interactive Logic Flow */}
        <div className="lg:col-span-8 bg-white/70 backdrop-blur-xl rounded-[4rem] p-12 border border-white shadow-inner flex flex-col gap-10">
          <div className="flex justify-between items-center border-b border-slate-100 pb-8">
             <div>
                <h3 className="text-2xl font-black text-[#243984] tracking-tight">{activeScene.name[lang]}</h3>
                <p className="text-sm text-slate-500 font-medium">{activeScene.description[lang]}</p>
             </div>
             <button 
               onClick={executeSequence}
               disabled={executingStep !== null}
               className="bg-[#243984] text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:opacity-90 transition-all flex items-center gap-3 disabled:opacity-30 shadow-xl shadow-blue-900/20"
             >
               <Icon name="Play" size={14} fill="currentColor" />
               {lang === 'en' ? 'EXECUTE SEQUENCE' : 'EXÉCUTER SÉQUENCE'}
             </button>
          </div>

          <div className="flex flex-col gap-6 relative">
            {/* Visual connector line */}
            <div className="absolute left-[39px] top-10 bottom-10 w-1 bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className="w-full bg-gradient-to-b from-[#243984] to-[#E82F89] transition-all duration-700" 
                 style={{ height: executingStep !== null ? `${(executingStep / activeScene.steps.length) * 100}%` : '0%' }}
               />
            </div>

            {activeScene.steps.map((step, i) => (
              <div 
                key={i} 
                className={`flex items-center gap-10 transition-all duration-500 ${
                  executingStep === i ? 'translate-x-4 opacity-100' : 'opacity-40'
                } ${executingStep !== null && executingStep > i ? 'opacity-80' : ''}`}
              >
                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-2 transition-all shadow-sm ${
                  executingStep === i ? 'bg-white border-[#243984] shadow-xl' : 'bg-slate-50 border-transparent'
                }`}>
                   <Icon 
                     name={step.nodeType === 'trigger' ? 'Zap' : step.nodeType === 'logic' ? 'Cpu' : 'BellRing'} 
                     size={28} 
                     className={executingStep === i ? 'text-[#E82F89] animate-pulse' : 'text-slate-300'} 
                   />
                </div>
                
                <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                   {executingStep === i && (
                     <div className="absolute bottom-0 left-0 h-1 bg-[#243984] animate-[width_1.2s_ease-in-out]" />
                   )}
                   <div className="flex items-center gap-3 mb-1">
                      <span className={`text-[8px] font-black uppercase tracking-widest ${executingStep === i ? 'text-[#243984]' : 'text-slate-400'}`}>
                        {step.nodeType}
                      </span>
                      <span className="text-slate-200">•</span>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{step.category}</span>
                   </div>
                   <div className="text-xl font-black text-slate-800 tracking-tight">{step.action[lang]}</div>
                </div>
              </div>
            ))}

            {isDone && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex items-center justify-center rounded-[3rem] animate-fade-in border-2 border-emerald-100">
                 <div className="text-center">
                    <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-900/20">
                       <Icon name="Check" size={32} strokeWidth={4} />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-2">
                      {lang === 'en' ? 'Automation Confirmed' : 'Automatisation Confirmée'}
                    </h4>
                    <p className="text-slate-500 font-medium">
                      {lang === 'en' ? 'Operational value logged to portfolio dashboard.' : 'Valeur opérationnelle enregistrée dans le tableau de bord.'}
                    </p>
                    <button 
                      onClick={() => setIsDone(false)}
                      className="mt-8 text-xs font-black uppercase tracking-widest text-[#243984] hover:text-[#E82F89] transition-colors"
                    >
                      Reset Simulator
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SceneTimeline;
