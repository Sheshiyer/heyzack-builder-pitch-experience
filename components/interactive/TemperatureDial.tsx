import { motion, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

type DialConfig = {
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  mode: string;
  zones: string[];
};

interface Props {
  config: DialConfig;
  language?: 'en' | 'fr';
}

export default function TemperatureDial({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(config.min);

  useEffect(() => {
    // Animate the value counting up
    const duration = 1500;
    const steps = 30;
    const stepValue = (config.value - config.min) / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(config.value);
        clearInterval(interval);
      } else {
        setDisplayValue(config.min + stepValue * currentStep);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [config.value, config.min]);

  // Calculate arc fill percentage
  const percentage = ((config.value - config.min) / (config.max - config.min)) * 100;
  const arcLength = 2 * Math.PI * 120; // circumference at radius 120
  const dashOffset = arcLength - (arcLength * percentage) / 100;

  // Temperature gradient color based on value
  const getTemperatureColor = (temp: number) => {
    const normalized = (temp - config.min) / (config.max - config.min);
    if (normalized < 0.33) return '#3B82F6'; // Blue
    if (normalized < 0.66) return '#10B981'; // Green
    return '#F97316'; // Orange
  };

  const statusText = language === 'en'
    ? `${config.zones.length} ZONES ACTIVE`
    : `${config.zones.length} ZONES ACTIVES`;

  return (
    <div className="flex flex-col items-center justify-center" role="img" aria-label={`Temperature dial showing ${config.value}${config.unit}`}>
      <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
        <defs>
          <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Animated gradient arc */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="none"
          stroke="url(#tempGradient)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={arcLength}
          transform="rotate(-90 150 150)"
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: 'easeOut'
          }}
        />

        {/* Temperature marker dot */}
        <motion.circle
          cx={150 + 120 * Math.cos((percentage / 100) * 2 * Math.PI - Math.PI / 2)}
          cy={150 + 120 * Math.sin((percentage / 100) * 2 * Math.PI - Math.PI / 2)}
          r="8"
          fill={getTemperatureColor(config.value)}
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: prefersReducedMotion ? 0 : 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Center temperature value */}
        <text
          x="150"
          y="145"
          textAnchor="middle"
          className="text-5xl font-bold fill-white"
          style={{ fontSize: '48px' }}
        >
          {Math.round(displayValue * 10) / 10}
        </text>

        {/* Unit */}
        <text
          x="150"
          y="175"
          textAnchor="middle"
          className="text-2xl fill-white/70"
          style={{ fontSize: '24px' }}
        >
          {config.unit}
        </text>
      </svg>

      {/* Mode and zone status */}
      <div className="mt-4 text-center">
        <motion.div
          className="text-sm font-semibold tracking-wider"
          style={{ color: getTemperatureColor(config.value) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {config.mode.toUpperCase()}
        </motion.div>
        <motion.div
          className="text-xs text-white/60 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {statusText}
        </motion.div>
      </div>
    </div>
  );
}
