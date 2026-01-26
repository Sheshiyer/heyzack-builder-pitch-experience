import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Animate value counting up
    const duration = 1500;
    const steps = 30;
    const stepValue = config.flow.current / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(config.flow.current);
        clearInterval(interval);
      } else {
        setDisplayValue(stepValue * currentStep);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [config.flow.current]);

  const percentage = (config.flow.current / config.flow.peak) * 100;
  const efficiency = Math.round(((config.flow.peak - config.flow.current) / config.flow.peak) * 100);

  // Particle positions (5 particles)
  const particles = [0, 1, 2, 3, 4];

  return (
    <div className="w-full max-w-md space-y-4" role="meter" aria-label={`Energy flow meter showing ${config.flow.current}${config.flow.unit}`}>
      {/* Header with current value and efficiency */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-white">
            {displayValue.toFixed(1)} <span className="text-lg text-white/60">{config.flow.unit}</span>
          </div>
          <div className="text-sm text-white/50">
            {language === 'en' ? 'Current Flow' : 'Flux actuel'}
          </div>
        </div>

        {/* Efficiency badge */}
        <motion.div
          className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs text-white/60">
            {language === 'en' ? 'Efficiency' : 'Efficacité'}
          </div>
          <div className="text-lg font-bold text-green-400">
            {efficiency}%
          </div>
        </motion.div>
      </div>

      {/* Flow bar with particles */}
      <div className="relative">
        {/* Background bar */}
        <div className="h-12 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
          {/* Current flow fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 relative overflow-hidden"
            initial={{ width: '0%' }}
            animate={{ width: `${percentage}%` }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.5,
              ease: 'easeOut'
            }}
          >
            {/* Animated shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>

          {/* Threshold markers */}
          {config.showThresholds && (
            <>
              {/* Baseline marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-blue-400/50"
                style={{ left: `${(config.flow.baseline / config.flow.peak) * 100}%` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-blue-400 whitespace-nowrap">
                  {language === 'en' ? 'Baseline' : 'Base'}
                </div>
              </div>

              {/* Peak marker */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-400/50"
                style={{ left: '100%' }}
              >
                <div className="absolute -top-6 right-0 text-xs text-red-400 whitespace-nowrap">
                  {language === 'en' ? 'Peak' : 'Pic'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Flowing particles */}
        {!prefersReducedMotion && particles.map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-green-400/50"
            style={{
              left: '0%',
              y: '-50%',
            }}
            animate={{
              left: ['0%', `${Math.min(percentage, 100)}%`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-sm">
        <div className="text-white/60">
          <span className="text-white/40">{language === 'en' ? 'Baseline:' : 'Base:'}</span>{' '}
          <span className="text-blue-400 font-medium">{config.flow.baseline}{config.flow.unit}</span>
        </div>
        <div className="text-white/60">
          <span className="text-white/40">{language === 'en' ? 'Peak:' : 'Pic:'}</span>{' '}
          <span className="text-red-400 font-medium">{config.flow.peak}{config.flow.unit}</span>
        </div>
      </div>
    </div>
  );
}
