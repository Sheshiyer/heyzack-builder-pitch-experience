import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type AudioWaveConfig = {
  bars: number;
  frequency: number[];
  color: string;
  animated: boolean;
  smoothing: number;
};

interface Props {
  config: AudioWaveConfig;
  language?: 'en' | 'fr';
}

export default function AudioWaveform({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [barHeights, setBarHeights] = useState(config.frequency);

  // Initialize from config.frequency on mount or when it changes
  useEffect(() => {
    if (config.frequency && config.frequency.length > 0) {
      setBarHeights(config.frequency);
    }
  }, [config.frequency]);

  // Animation Loop
  useEffect(() => {
    if (!config.animated || prefersReducedMotion) {
      if (config.frequency && config.frequency.length > 0) {
        setBarHeights(config.frequency);
      }
      return;
    }

    const interval = setInterval(() => {
      setBarHeights(prev =>
        prev.map(height => {
          // More organic random walk
          const variation = (Math.random() - 0.5) * 40; 
          let newHeight = height + variation;
          
          // Clamp with some bounce
          if (newHeight < 15) newHeight = 15 + Math.random() * 10;
          if (newHeight > 95) newHeight = 95 - Math.random() * 10;
          
          return newHeight;
        })
      );
    }, 120);

    return () => clearInterval(interval);
  }, [config.animated, config.frequency, prefersReducedMotion]);

  return (
    <motion.div
      className="w-full max-w-md space-y-6 p-6 bg-slate-900/50 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md"
      role="img"
      aria-label="Audio waveform visualization"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Waveform bars */}
      <div className="flex items-center justify-center gap-1.5 h-32 px-4">
        {barHeights.map((height, index) => (
          <motion.div
            key={index}
            className="flex-1 rounded-full relative overflow-hidden shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            style={{
              // Use CSS variable or direct style for complex gradient
              background: `linear-gradient(to top, ${config.color}40, ${config.color})`,
              maxWidth: '16px',
            }}
            initial={{ height: '20%' }}
            animate={{ height: `${height}%` }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              mass: 0.8,
            }}
          >
            {/* Inner glow stick */}
            <div className="absolute inset-x-[30%] top-1 bottom-1 bg-white/30 rounded-full blur-[1px]" />
          </motion.div>
        ))}
      </div>

      {/* Info Group */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <motion.div
          className="space-y-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs uppercase tracking-widest text-white/40 font-bold">
            {language === 'en' ? 'Soundscape' : 'Paysage Sonore'}
          </div>
          <div className="text-sm font-semibold text-white">
            {language === 'en' ? 'Lobby Ambient' : 'Ambiance Hall'}
          </div>
        </motion.div>

        {/* Audio stats */}
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-tight uppercase">
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="text-white/50">
              {config.bars}CH
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }} />
            <span className="text-white/50">
              {language === 'en' ? 'LIVE' : 'EN LIGNE'}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
