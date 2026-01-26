import { motion, useReducedMotion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

type CounterConfig = {
  value: number;
  label: string;
  animationDuration: number;
  countUp: boolean;
  prefix?: string;
  suffix?: string;
  color: string;
};

interface Props {
  config: CounterConfig;
  language?: 'en' | 'fr';
}

export default function AnimatedCounter({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  // Physics setup
  const valueMotion = useMotionValue(0);
  const valueSpring = useSpring(valueMotion, {
    stiffness: 40,
    damping: 15,
    mass: 0.5
  });

  useEffect(() => {
    // Start animation
    valueMotion.set(config.value);

    // Sync state for rendering text
    const unsubscribe = valueSpring.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [config.value, valueMotion, valueSpring]);
  
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 bg-slate-900/50 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md min-w-[300px]"
      role="status"
      aria-label={`${config.label}: ${config.prefix || ''}${config.value}${config.suffix || ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Main counter */}
      <div className="relative z-10">
        <motion.div
          className="text-8xl font-black tabular-nums tracking-tighter"
          style={{ color: config.color, textShadow: '0 8px 16px rgba(0,0,0,0.5)' }}
        >
          {config.prefix}
          {displayValue}
          {config.suffix}
        </motion.div>

        {/* Ambient Glow backing */}
        <motion.div
          className="absolute inset-0 blur-3xl opacity-20 -z-10 rounded-full"
          style={{ backgroundColor: config.color }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="mt-2 text-sm font-bold uppercase tracking-widest text-white/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {config.label}
      </motion.div>
      
      {/* Decorative underline */}
      <div className="w-12 h-1 mt-4 rounded-full bg-white/10 overflow-hidden">
          <motion.div 
            className="h-full bg-white/40"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
      </div>
      
       {/* Live Indicator */}
      {config.countUp && (
        <motion.div
          className="flex items-center gap-2 mt-6 text-[10px] uppercase font-bold tracking-widest text-white/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
          <span>{language === 'en' ? 'Live Data' : 'Données en direct'}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
