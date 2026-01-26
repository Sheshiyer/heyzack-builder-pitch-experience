
import React, { useState } from 'react';
import { Language } from '../types';
import Icon from './Icon';

interface ROICalculatorProps { lang: Language; }

const ROICalculator: React.FC<ROICalculatorProps> = ({ lang }) => {
  const [units, setUnits] = useState(100);
  const [segment, setSegment] = useState('mid');

  const baseCostPerUnit = segment === 'luxury' ? 3500 : segment === 'mid' ? 2200 : 1500;
  const savingsPerUnitPerYear = 47 * 12;

  const totalCost = units * baseCostPerUnit;
  const annualSavings = units * savingsPerUnitPerYear;
  const paybackYears = (totalCost / annualSavings).toFixed(1);

  return (
    <div className="h-screen py-24 px-6 flex flex-col justify-center items-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E82F89] opacity-[0.02] blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#243984] opacity-[0.02] blur-[150px] rounded-full" />

      <div className="max-w-5xl w-full text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 text-[#243984] font-black text-[10px] uppercase mb-4 tracking-[0.3em]">
          <Icon name="BarChart3" size={14} />
          {lang === 'en' ? 'INVESTMENT ANALYTICS' : 'ANALYSE D\'INVESTISSEMENT'}
        </div>
        <h2 className="text-6xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
          {lang === 'en' ? 'Profitability Model' : 'Modèle de Rentabilité'}
        </h2>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          {lang === 'en' 
            ? 'Our enterprise ROI engine calculates asset appreciation and energy mitigation for your specific portfolio.' 
            : 'Notre moteur de ROI calcule l\'appréciation des actifs pour votre portefeuille.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl w-full relative z-10">
        <div className="lg:col-span-5 bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  {lang === 'en' ? 'TOTAL UNITS' : 'UNITÉS TOTALES'}
                </label>
                <span className="text-2xl font-black text-[#243984]">{units}</span>
              </div>
              <input 
                type="range" min="10" max="1000" step="10" value={units}
                onChange={(e) => setUnits(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#243984]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
                {lang === 'en' ? 'BUILDING SEGMENT' : 'SEGMENT DE BÂTIMENT'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['affordable', 'mid', 'luxury'].map((seg) => (
                  <button
                    key={seg} onClick={() => setSegment(seg)}
                    className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      segment === seg ? 'bg-[#243984] text-white shadow-xl shadow-blue-900/20' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {seg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 group">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Icon name="Wallet" size={14} className="text-[#243984]" />
              SYSTEM COST
            </div>
            <div className="text-4xl font-black text-slate-900 mb-2">${totalCost.toLocaleString()}</div>
            <div className="w-10 h-1 bg-slate-100 rounded-full group-hover:bg-[#243984] transition-colors" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 group">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Icon name="Zap" size={14} className="text-[#10B981]" />
              ANNUAL SAVINGS
            </div>
            <div className="text-4xl font-black text-[#10B981] mb-2">${annualSavings.toLocaleString()}</div>
            <div className="w-10 h-1 bg-slate-100 rounded-full group-hover:bg-[#10B981] transition-colors" />
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl col-span-1 sm:col-span-2 relative overflow-hidden flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">ESTIMATED RECOUP PERIOD</div>
              <div className="text-6xl font-black text-white tracking-tighter">{paybackYears} <span className="text-2xl text-slate-600">YEARS</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center sm:items-end">
              <div className="text-[10px] font-black text-[#E82F89] uppercase tracking-widest mb-2">5-YEAR VALUE MULTIPLIER</div>
              <div className="text-4xl font-black text-white">x4.8</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <button className="flex items-center gap-4 bg-[#243984] text-white px-12 py-6 rounded-3xl text-sm font-black tracking-widest hover:opacity-90 transition-all shadow-2xl shadow-blue-900/30">
          <Icon name="Download" size={20} />
          {lang === 'en' ? 'DOWNLOAD INVESTOR PDF' : 'TÉLÉCHARGER LE PDF'}
        </button>
      </div>
    </div>
  );
};

export default ROICalculator;
