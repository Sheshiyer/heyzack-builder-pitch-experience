
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Language } from '../types';
import Icon from './Icon';

interface GeminiAssistantProps { lang: Language; }

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ lang }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `You are HeyZack's AI Smart Building Consultant. Builder asks: "${input}". Provide a professional, benefit-focused response in ${lang === 'en' ? 'English' : 'French'}. Mention specific categories (Sensors, Climatisation, Door Locks). Tone: Knowledgeable, Premium. Under 150 words.`;
      const result = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setResponse(result.text || '');
    } catch (err) {
      setResponse('Error. Please check your configuration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen py-24 px-6 flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background visual effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#243984] opacity-[0.1] blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E82F89] opacity-[0.1] blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-2xl">
            <div className="w-2 h-2 rounded-full bg-[#E82F89] animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">ZACK CORE INTELLIGENCE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            {lang === 'en' ? 'Property Engine' : 'Moteur de Propriété'}
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            {lang === 'en' 
              ? 'Input your project parameters to generate a custom automation ecosystem tailored to your segment.' 
              : 'Saisissez vos paramètres de projet pour générer un écosystème d\'automatisation personnalisé.'}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-8">
            <div className="relative">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'en' ? "Tell us about your next development..." : "Parlez-nous de votre prochain projet..."}
                className="w-full bg-white/5 border-2 border-white/10 rounded-3xl p-8 text-white placeholder-white/20 focus:outline-none focus:border-[#E82F89]/50 transition-all text-xl font-medium min-h-[160px] resize-none"
              />
              <div className="absolute bottom-6 right-8 flex gap-3 text-white/20">
                <Icon name="Mic" size={20} />
                <Icon name="Image" size={20} />
              </div>
            </div>
            
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="group bg-gradient-to-r from-[#243984] to-[#E82F89] text-white py-6 rounded-3xl font-black text-sm tracking-[0.2em] disabled:opacity-50 flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(232,47,137,0.2)] hover:scale-[1.02] transition-all"
            >
              {loading ? (
                <Icon name="Loader2" size={24} className="animate-spin" />
              ) : (
                <>
                  <Icon name="Sparkles" size={20} />
                  {lang === 'en' ? 'DESIGN PROJECT' : 'CONCEVOIR LE PROJET'}
                </>
              )}
            </button>
          </div>

          {response && (
            <div className="mt-12 p-10 bg-white/5 rounded-[2.5rem] border border-white/10 animate-fade-in relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#E82F89] group-hover:w-full transition-all duration-700 opacity-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 text-[#E82F89] font-black text-[10px] uppercase tracking-[0.3em]">
                  <Icon name="Terminal" size={16} />
                  PROPOSAL OUTPUT
                </div>
                <div className="text-lg text-slate-200 leading-relaxed font-medium">
                  {response}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;
