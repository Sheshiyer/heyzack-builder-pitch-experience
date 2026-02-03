
import React, { useState, useRef, useMemo } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, RecommendedProduct, Product } from '../types';
import { ALL_PRODUCTS } from '../constants';
import Icon from './Icon';

interface GeminiAssistantProps {
  lang: Language;
  onProductClick?: (categoryId: string, productId: string) => void;
  onNotificationClick?: () => void;
}


interface FloorPlan {
  base64: string;
  mimeType: string;
  preview: string;
}

type AssistantStatus = 'idle' | 'processing' | 'completed' | 'error';


const PILLAR_COLORS: Record<string, string> = {
  savings: '#10B981',
  security: '#243984',
  comfort: '#E82F89',
};

const PILLAR_ICONS: Record<string, string> = {
  savings: 'TrendingUp',
  security: 'Shield',
  comfort: 'Sparkles',
};

const PILLAR_LABELS: Record<string, Record<Language, string>> = {
  savings: { en: 'Savings', fr: 'Économies' },
  security: { en: 'Security', fr: 'Sécurité' },
  comfort: { en: 'Comfort', fr: 'Confort' },
};

// Build a compressed catalog for the prompt
function buildCatalogSummary(): string {
  const lines = ALL_PRODUCTS.map(p =>
    `${p.sku} | ${p.name.en} | ${p.category} | ${p.specs.slice(0, 3).join(', ')}`
  );
  return lines.join('\n');
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ lang, onProductClick, onNotificationClick }) => {

  const [input, setInput] = useState('');
  const [floorPlan, setFloorPlan] = useState<FloorPlan | null>(null);
  const [recommendations, setRecommendations] = useState<(RecommendedProduct & { product: Product })[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AssistantStatus>('idle');
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const catalogSummary = useMemo(() => buildCatalogSummary(), []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(',')[1];
      const mimeType = file.type || 'image/jpeg';
      setFloorPlan({ base64, mimeType, preview: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleAsk = async () => {
    if (!input.trim() && !floorPlan) return;
    setLoading(true);
    setStatus('processing');
    setError('');
    setRecommendations([]);


    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        setError(lang === 'en'
          ? 'Please set your Gemini API key in the .env file. Get one at https://ai.google.dev/'
          : 'Veuillez configurer votre clé API Gemini dans le fichier .env. Obtenez-en une sur https://ai.google.dev/');
        setLoading(false);
        setStatus('error');
        return;
      }


      const ai = new GoogleGenAI({ apiKey });

      const systemPrompt = `You are HeyZack's AI Smart Building Consultant. You help property developers select the best smart building products for their projects.

Given the property description${floorPlan ? ' and floor plan image' : ''}, recommend 6-12 products from this catalog that best suit the project. Consider the building type, size, use case, and specific needs.

PRODUCT CATALOG (SKU | Name | Category | Key Specs):
${catalogSummary}

For each recommended product, provide:
- sku: the exact SKU from the catalog
- reason: a brief ${lang === 'en' ? 'English' : 'French'} explanation of why this product fits (max 30 words)
- savings: score 0-100 for energy/cost savings impact
- security: score 0-100 for security impact
- comfort: score 0-100 for comfort/convenience impact`;

      const contents: any[] = [];
      if (floorPlan) {
        contents.push({
          inlineData: { data: floorPlan.base64, mimeType: floorPlan.mimeType }
        });
      }
      const userPrompt = lang === 'en'
        ? `Property description: ${input}`
        : `Description du projet: ${input}`;
      contents.push(userPrompt);

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sku: { type: Type.STRING, description: 'Product SKU from catalog' },
                reason: { type: Type.STRING, description: 'Why this product fits the project' },
                savings: { type: Type.NUMBER, description: 'Savings score 0-100' },
                security: { type: Type.NUMBER, description: 'Security score 0-100' },
                comfort: { type: Type.NUMBER, description: 'Comfort score 0-100' },
              },
              required: ['sku', 'reason', 'savings', 'security', 'comfort'],
            },
          },
        },
      });

      const parsed: RecommendedProduct[] = JSON.parse(response.text || '[]');

      // Match SKUs to full product data
      const matched = parsed
        .map(rec => {
          const product = ALL_PRODUCTS.find(p => p.sku === rec.sku);
          return product ? { ...rec, product } : null;
        })
        .filter((r): r is RecommendedProduct & { product: Product } => r !== null);

      setRecommendations(matched);
      if (matched.length === 0) {
        setStatus('error');
        setError(lang === 'en' ? 'No matching products found. Try a different description.' : 'Aucun produit correspondant. Essayez une autre description.');
      } else {
        setStatus('completed');
      }

    } catch (err) {
      console.error(err);
      setStatus('error');
      setError(lang === 'en' ? 'Error generating recommendations. Please check your configuration.' : 'Erreur. Veuillez vérifier votre configuration.');
    } finally {
      setLoading(false);
    }

  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen py-24 px-6 flex flex-col items-center justify-start bg-slate-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#243984] opacity-[0.1] blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E82F89] opacity-[0.1] blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Success Notification */}
      <AnimatePresence>
        {status === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            onClick={onNotificationClick}
            className="fixed top-8 right-8 z-[100] bg-white/10 backdrop-blur-2xl border border-[#10B981]/50 rounded-2xl p-6 shadow-2xl flex items-center gap-4 cursor-pointer hover:bg-white/15 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#10B981]/20 flex items-center justify-center text-[#10B981] group-hover:scale-110 transition-transform">
              <Icon name="CheckCircle2" size={24} />
            </div>

            <div>
              <p className="text-white font-bold">
                {lang === 'en' ? 'Report Ready' : 'Rapport Prêt'}
              </p>
              <p className="text-white/60 text-sm">
                {lang === 'en' ? 'Your report is ready to view.' : 'Votre rapport est prêt à être consulté.'}
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="ml-4 text-white/30 hover:text-white transition-colors"
            >
              <Icon name="X" size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl w-full relative z-10">

        {/* Header */}
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
              ? 'Describe your project or upload a floor plan to generate a custom smart building package.'
              : 'Décrivez votre projet ou téléchargez un plan pour générer un package domotique personnalisé.'}
          </p>
        </div>

        {/* Input area */}
        <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col gap-8">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'en' ? "Describe your property: type, size, units, amenities, target market..." : "Décrivez votre propriété: type, taille, unités, équipements, marché cible..."}
                className="w-full bg-white/5 border-2 border-white/10 rounded-3xl p-8 text-white placeholder-white/20 focus:outline-none focus:border-[#E82F89]/50 transition-all text-xl font-medium min-h-[160px] resize-none"
              />
              <div className="absolute bottom-6 right-8 flex gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-white/30 hover:text-[#E82F89] transition-colors"
                  title={lang === 'en' ? 'Upload floor plan' : 'Télécharger un plan'}
                >
                  <Icon name="Image" size={20} />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Floor plan preview */}
            <AnimatePresence>
              {floorPlan && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 px-4"
                >
                  <img src={floorPlan.preview} alt="Floor plan" className="w-20 h-20 object-cover rounded-2xl border border-white/10" />
                  <div className="flex-1">
                    <p className="text-sm text-white/60 font-medium">
                      {lang === 'en' ? 'Floor plan attached' : 'Plan joint'}
                    </p>
                  </div>
                  <button
                    onClick={() => { setFloorPlan(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                    className="text-white/30 hover:text-red-400 transition-colors"
                  >
                    <Icon name="X" size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleAsk}
              disabled={loading}
              className="group bg-gradient-to-r from-[#243984] to-[#E82F89] text-white py-6 rounded-3xl font-black text-sm tracking-[0.2em] disabled:opacity-50 flex flex-col items-center justify-center gap-2 shadow-[0_20px_40px_rgba(232,47,137,0.2)] hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-4">
                {loading ? (
                  <Icon name="Loader2" size={24} className="animate-spin" />
                ) : (
                  <>
                    <Icon name="Sparkles" size={20} />
                    {lang === 'en' ? 'GENERATE PACKAGE' : 'GÉNÉRER LE PACKAGE'}
                  </>
                )}
              </div>
              <AnimatePresence>
                {loading && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-[10px] font-medium text-white/60 tracking-normal"
                  >
                    {lang === 'en' ? 'We will send you a report shortly...' : 'Nous vous enverrons un rapport sous peu...'}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>

          {/* Error */}
          {error && (
            <div className="mt-8 p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-300 text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Recommendation cards */}
        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-16"
            >
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 text-[#E82F89] font-black text-[10px] uppercase tracking-[0.3em]">
                  <Icon name="Terminal" size={16} />
                  {lang === 'en' ? `${recommendations.length} PRODUCTS RECOMMENDED` : `${recommendations.length} PRODUITS RECOMMANDÉS`}
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {recommendations.map((rec) => (
                  <motion.div
                    key={rec.sku}
                    variants={cardVariants}
                    onClick={() => onProductClick?.(rec.product.category, rec.product.id)}
                    className="group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] cursor-pointer"
                  >

                    {/* Product image */}
                    <div className="relative h-48 bg-white/5 overflow-hidden">
                      <img
                        src={rec.product.imageUrl}
                        alt={rec.product.name[lang]}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-product.svg'; }}
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl text-[9px] font-black uppercase tracking-wider text-white/60">
                        {rec.product.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-1 leading-tight">
                        {rec.product.name[lang]}
                      </h3>
                      <p className="text-[11px] font-mono text-white/30 mb-3">{rec.sku}</p>
                      <p className="text-sm text-slate-400 mb-4 leading-relaxed line-clamp-2">
                        {rec.product.description[lang]}
                      </p>

                      {/* AI Rationale */}
                      <div className="mb-5 p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="text-xs text-[#E82F89]/80 font-semibold mb-1 flex items-center gap-1.5">
                          <Icon name="Sparkles" size={10} />
                          {lang === 'en' ? 'Why this product' : 'Pourquoi ce produit'}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">{rec.reason}</p>
                      </div>

                      {/* Pillar scores */}
                      <div className="space-y-2">
                        {(['savings', 'security', 'comfort'] as const).map(pillar => {
                          const score = rec[pillar];
                          return (
                            <div key={pillar} className="flex items-center gap-2">
                              <Icon name={PILLAR_ICONS[pillar]} size={12} className="text-white/40 flex-shrink-0" />
                              <span className="text-[10px] font-semibold text-white/40 w-16 flex-shrink-0">
                                {PILLAR_LABELS[pillar][lang]}
                              </span>
                              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${score}%` }}
                                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: PILLAR_COLORS[pillar] }}
                                />
                              </div>
                              <span className="text-[10px] font-mono text-white/30 w-8 text-right">{score}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GeminiAssistant;
