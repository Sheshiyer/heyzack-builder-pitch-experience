import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type GaugeConfig = {
  value: number;
  max: number;
  min: number;
  unit: string;
  label: string;
  thresholds?: Array<{ value: number; color: string; label: string }>;
  showMarkers?: number[];
  needleColor: string;
};

interface Props {
  config: GaugeConfig;
  language?: 'en' | 'fr';
}

export default function CircularGauge({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(config.min);

  useEffect(() => {
    // Animate value counting up
    const duration = 1000;
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

  // Calculate arc and needle positions (180° semi-circle)
  const percentage = ((config.value - config.min) / (config.max - config.min)) * 100;
  const rotation = -90 + (percentage / 100) * 180; // -90° to 90°

  const getArcColor = () => {
    if (!config.thresholds) return config.needleColor;

    for (const threshold of [...config.thresholds].reverse()) {
      if (config.value >= threshold.value) {
        return threshold.color;
      }
    }
    return config.needleColor;
  };

  const arcColor = getArcColor();
  const radius = 100;
  const strokeWidth = 12;
  const centerX = 150;
  const centerY = 150;

  return (
    <div
      className="flex flex-col items-center justify-center"
      role="meter"
      aria-label={`${config.label}: ${config.value}${config.unit}`}
      aria-valuenow={config.value}
      aria-valuemin={config.min}
      aria-valuemax={config.max}
    >
      <svg width="300" height="180" viewBox="0 0 300 180" className="overflow-visible">
        <defs>
          <linearGradient id={`gaugeGradient-${config.label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset={`${percentage}%`} stopColor={arcColor} />
            <stop offset={`${percentage}%`} stopColor="#374151" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d={`M 50 150 A ${radius} ${radius} 0 0 1 250 150`}
          fill="none"
          stroke="#374151"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Animated arc fill */}
        <motion.path
          d={`M 50 150 A ${radius} ${radius} 0 0 1 250 150`}
          fill="none"
          stroke={`url(#gaugeGradient-${config.label})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.5,
            ease: 'easeOut'
          }}
        />

        {/* Markers */}
        {config.showMarkers?.map((markerValue) => {
          const markerPercentage = ((markerValue - config.min) / (config.max - config.min)) * 100;
          const markerAngle = -90 + (markerPercentage / 100) * 180;
          const markerRad = (markerAngle * Math.PI) / 180;
          const markerX = centerX + (radius - 5) * Math.cos(markerRad);
          const markerY = centerY + (radius - 5) * Math.sin(markerRad);

          return (
            <g key={markerValue}>
              <line
                x1={markerX}
                y1={markerY}
                x2={centerX + (radius + 8) * Math.cos(markerRad)}
                y2={centerY + (radius + 8) * Math.sin(markerRad)}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <text
                x={centerX + (radius + 20) * Math.cos(markerRad)}
                y={centerY + (radius + 20) * Math.sin(markerRad)}
                textAnchor="middle"
                className="text-xs fill-white/50"
                dominantBaseline="middle"
              >
                {markerValue}
              </text>
            </g>
          );
        })}

        {/* Needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: prefersReducedMotion ? 0 : 1
          }}
          style={{ originX: `${centerX}px`, originY: `${centerY}px` }}
        >
          <line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={centerY - radius + 15}
            stroke={config.needleColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            cx={centerX}
            cy={centerY - radius + 15}
            r="5"
            fill={config.needleColor}
          />
        </motion.g>

        {/* Center pivot */}
        <circle
          cx={centerX}
          cy={centerY}
          r="6"
          fill={config.needleColor}
        />
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill="white"
        />

        {/* Value display */}
        <text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          className="text-3xl font-bold fill-white"
        >
          {Math.round(displayValue * 10) / 10}
        </text>
        <text
          x={centerX}
          y={centerY + 40}
          textAnchor="middle"
          className="text-sm fill-white/60"
        >
          {config.unit}
        </text>
      </svg>

      {/* Label */}
      <motion.div
        className="text-sm font-semibold text-white/70 mt-2 uppercase tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {config.label}
      </motion.div>

      {/* Threshold indicators */}
      {config.thresholds && (
        <div className="flex items-center gap-3 mt-3 text-xs">
          {config.thresholds.map((threshold) => (
            <div key={threshold.value} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: threshold.color }}
              />
              <span className="text-white/50">
                {threshold.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
