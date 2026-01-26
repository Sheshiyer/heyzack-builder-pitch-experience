import { motion, useReducedMotion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

type FlowMeterConfig = {
  flow: {
    current: number;
    peak: number;
    baseline: number;
    unit: string;
  };
  visualType: string;
  updateInterval: number;
  showThresholds: boolean;
};

interface Props {
  config: FlowMeterConfig;
  language?: 'en' | 'fr';
}

export default function EnergyFlowMeter({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  
  // Physics for current value
  const valueMotion = useMotionValue(0);
  const valueSpring = useSpring(valueMotion, {
    stiffness: 80,
    damping: 15,
    mass: 1
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    valueMotion.set(config.flow.current);
  }, [config.flow.current, valueMotion]);

  useEffect(() => {
    const unsubscribe = valueSpring.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [valueSpring]);

  // Derived values
  const percentageSpring = useTransform(
    valueSpring,
    [0, config.flow.peak],
    [0, 100]
  );
  
  // Efficiency calculation (responsive to spring value)
  const efficiencySpring = useTransform(
    valueSpring,
    (current) => Math.max(0, Math.round(((config.flow.peak - current) / config.flow.peak) * 100))
  );
  const [efficiency, setEfficiency] = useState(0);
  
  useEffect(() => {
    const unsubscribe = efficiencySpring.on("change", (v) => setEfficiency(v));
    return () => unsubscribe();
  }, [efficiencySpring]);

  // Particle visualization
  // We'll create particles that flow. 
  // To make it interesting, we can adjust opacity or speed based on flow value?
  // For now, let's keep it simple but physics-synced.
  const particleCount = 6;
  const particles = Array.from({ length: particleCount }).map((_, i) => i);

  return (
    <motion.div 
      className="w-full max-w-md space-y-5 p-6 bg-slate-900/50 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md"
      role="meter"
      aria-label={`Energy flow meter showing ${config.flow.current}${config.flow.unit}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Header with current value and efficiency */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
             <motion.span className="text-4xl font-black text-white tracking-tight font-mono">
               {displayValue.toFixed(1)}
             </motion.span>
             <span className="text-lg text-emerald-400/80 font-bold">{config.flow.unit}</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-white/40 font-bold mt-1">
            {language === 'en' ? 'Current Flow' : 'Flux actuel'}
          </div>
        </div>

        {/* Efficiency badge */}
        <motion.div
           className="flex flex-col items-end"
        >
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-1">
             <div className="text-sm font-black text-emerald-400">
               {efficiency}%
             </div>
          </div>
          <div className="text-[10px] uppercase tracking-wide text-white/30">
            {language === 'en' ? 'Efficiency' : 'Efficacité'}
          </div>
        </motion.div>
      </div>

      {/* Flow bar container */}
      <div className="relative pt-6 pb-2">
        {/* Threshold Markers (Floating above) */}
         {config.showThresholds && (
            <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none">
              <div 
                  className="absolute bottom-0 w-px h-8 bg-blue-500/30 z-10"
                  style={{ left: `${(config.flow.baseline / config.flow.peak) * 100}%` }}
              >
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-blue-400 uppercase tracking-tight whitespace-nowrap">
                     Base
                  </span>
              </div>
            </div>
         )}
      
        {/* Main Bar Track */}
        <div className="h-14 bg-black/40 rounded-xl overflow-hidden shadow-inner border border-white/5 relative">
          
          {/* Grid lines used for texture */}
          <div className="absolute inset-0 opacity-20" 
               style={{ backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 95%)', backgroundSize: '10% 100%' }}>
          </div>

          {/* Animated Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-600/80 to-emerald-400 relative"
            style={{ width: useTransform(percentageSpring, (p) => `${p}%`) }}
          >
            {/* Glossy highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
            
            {/* Active flow animation (scrolling stripes) */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '28px 0px']
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Leading edge glow */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/60 blur-md"></div>
          </motion.div>

          {/* Particles */}
          {!prefersReducedMotion && particles.map((i) => (
             <motion.div 
               key={i}
               className="absolute top-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] z-20"
               initial={{ x: -10, opacity: 0 }}
               animate={{ 
                 x: ["0%", "500%"], // Animate relative to container, or we can use percentage
                 opacity: [0, 1, 0] 
               }}
               style={{ 
                  left: 0,
                  top: `${20 + (i % 3) * 30}%`
               }}
               // We need a more robust approach for particles appearing only within the fill.
               // For simplicity in this demo, let's make them fly across the filled area.
               // Actually, simpler effect: Bubbles rising or moving Right.
             />
          ))}
          
           {/* Custom Particle System inside the bar (clipping to filled width is hard with simple DOM)
               Instead, let's just create 'bubbles' inside the Fill div above.
           */}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-xs font-mono border-t border-white/5 pt-3 mt-1">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500/50"></div>
            <span className="text-white/40">BASE:</span>
            <span className="text-blue-400">{config.flow.baseline}{config.flow.unit}</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
             <span className="text-white/40">PEAK:</span>
             <span className="text-emerald-400">{config.flow.peak}{config.flow.unit}</span>
        </div>
      </div>
    </motion.div>
  );
}
