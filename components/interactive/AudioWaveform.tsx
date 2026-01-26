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

  useEffect(() => {
    if (!config.animated || prefersReducedMotion) return;

    // Simulate audio frequencies with random variation
    const interval = setInterval(() => {
      setBarHeights(prev =>
        prev.map(height => {
          const variation = (Math.random() - 0.5) * 30; // Random variation
          const newHeight = Math.max(20, Math.min(100, height + variation));
          return newHeight;
        })
      );
    }, 150);

    return () => clearInterval(interval);
  }, [config.animated, prefersReducedMotion]);

  const maxHeight = 100;

  return (
    <div
      className="w-full max-w-md space-y-4"
      role="img"
      aria-label="Audio waveform visualization"
    >
      {/* Waveform bars */}
      <div className="flex items-end justify-center gap-1.5 h-32">
        {barHeights.map((height, index) => (
          <motion.div
            key={index}
            className="flex-1 rounded-t-full relative overflow-hidden"
            style={{
              background: `linear-gradient(to top, ${config.color}, ${config.color}dd)`,
              maxWidth: '24px',
            }}
            initial={{ height: '20%' }}
            animate={{ height: `${height}%` }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              mass: 0.5,
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent"
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.1,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Now playing info */}
      <motion.div
        className="text-center space-y-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-sm font-semibold text-white">
          {language === 'en' ? 'Ambient Soundscape' : 'Paysage sonore ambiant'}
        </div>
        <div className="text-xs text-white/50">
          {language === 'en' ? 'Lobby & Common Areas' : 'Hall et espaces communs'}
        </div>
      </motion.div>

      {/* Audio stats */}
      <div className="flex items-center justify-center gap-6 text-xs">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-white/60">
            {config.bars} {language === 'en' ? 'Channels' : 'Canaux'}
          </span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
          <span className="text-white/60">
            {language === 'en' ? 'Active' : 'Actif'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
