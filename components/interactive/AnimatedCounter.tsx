import { motion, useReducedMotion } from 'framer-motion';
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

  useEffect(() => {
    if (!config.countUp) {
      setDisplayValue(config.value);
      return () => {}; // Explicit no-op cleanup
    }

    const duration = prefersReducedMotion ? 0 : config.animationDuration;
    const steps = 50;
    const stepValue = config.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(config.value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(stepValue * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [config.value, config.countUp, config.animationDuration, prefersReducedMotion]);

  return (
    <div
      className="flex flex-col items-center justify-center space-y-2"
      role="status"
      aria-label={`${config.label}: ${config.prefix || ''}${config.value}${config.suffix || ''}`}
    >
      {/* Main counter */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          ease: 'easeOut'
        }}
      >
        <motion.div
          className="text-7xl font-bold tabular-nums"
          style={{ color: config.color }}
          animate={
            displayValue === config.value && !prefersReducedMotion
              ? {
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{
            duration: 0.3,
          }}
        >
          {config.prefix}
          {displayValue}
          {config.suffix}
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 blur-2xl opacity-50 -z-10"
          style={{ backgroundColor: config.color }}
          animate={
            !prefersReducedMotion
              ? {
                  opacity: [0.3, 0.5, 0.3],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Label */}
      <motion.div
        className="text-sm font-semibold text-white/70 tracking-wider uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.3
        }}
      >
        {config.label}
      </motion.div>

      {/* Progress indicator */}
      {config.countUp && displayValue < config.value && (
        <motion.div
          className="h-1 bg-white/20 rounded-full overflow-hidden w-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{
              width: `${(displayValue / config.value) * 100}%`,
            }}
            transition={{
              duration: 0.1,
            }}
          />
        </motion.div>
      )}

      {/* Completion indicator */}
      {displayValue === config.value && config.countUp && (
        <motion.div
          className="flex items-center gap-2 text-xs text-white/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={
              !prefersReducedMotion
                ? {
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span>{language === 'en' ? 'Live' : 'En direct'}</span>
        </motion.div>
      )}
    </div>
  );
}
