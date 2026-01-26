import { motion, useReducedMotion, useSpring, useTransform, useMotionValue } from 'framer-motion';
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

  // Physics setup
  const valueMotion = useMotionValue(config.min);
  const valueSpring = useSpring(valueMotion, {
    stiffness: 50,
    damping: 12,
    mass: 0.8
  });

  useEffect(() => {
    // Set spring target
    valueMotion.set(config.value);

    // Update display number
    const unsubscribe = valueSpring.on("change", (latest) => {
      setDisplayValue(Math.round(latest * 10) / 10);
    });

    return () => unsubscribe();
  }, [config.value, valueMotion, valueSpring]);

  // Dimensions
  const radius = 120;
  const arcLength = 2 * Math.PI * radius; // circumference

  // Transform spring value to percentage (0 to 1)
  const progress = useTransform(
    valueSpring,
    [config.min, config.max],
    [0, 1]
  );
  
  // Transform percentage to dash offset (full circle)
  const dashOffset = useTransform(
    progress,
    [0, 1],
    [arcLength, 0]
  );

  // Calculate Marker Position
  // We need to sync this with framer motion. 
  // Standard SVG rotation is easier than calculating x/y with useTransform multiple times,
  // so we'll rotate a group container for the marker.
  // -90deg is top. We want to rotate from 0 to 360 based on progress.
  const rotation = useTransform(progress, [0, 1], [0, 360]);

  // Temperature gradient color based on value (helper)
  const getTemperatureColor = (temp: number) => {
    // simple normalization for color logic
    const normalized = (temp - config.min) / (config.max - config.min);
    if (normalized < 0.33) return '#3B82F6'; // Blue
    if (normalized < 0.66) return '#10B981'; // Green
    return '#F97316'; // Orange
  };

  const statusText = language === 'en'
    ? `${config.zones.length} ZONES ACTIVE`
    : `${config.zones.length} ZONES ACTIVES`;

  const currentColor = getTemperatureColor(config.value);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-3xl border border-white/5 shadow-inner backdrop-blur-md" 
      role="img" 
      aria-label={`Temperature dial showing ${config.value}${config.unit}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
        <defs>
          <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow">
             <feGaussianBlur stdDeviation="4" result="coloredBlur" />
             <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
             </feMerge>
          </filter>
        </defs>

        {/* Background arc track */}
        <circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="24"
        />

        {/* Animated gradient arc */}
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          fill="none"
          stroke="url(#tempGradient)"
          strokeWidth="24"
          strokeLinecap="round"
          strokeDasharray={arcLength}
          style={{ strokeDashoffset: dashOffset }}
          transform="rotate(-90 150 150)"
        />

        {/* Marker Knob Group */}
        {/* Rotates based on spring value */}
        <motion.g 
          style={{ rotate: rotation, originX: "150px", originY: "150px" }}
          // Initial rotation needs to offset the SVG standard orientation if needed.
          // Since our arc starts at -90deg, we want 0 progress to be at -90deg.
          // Wait, 'progress' 0->1 maps to 0->360 rotation.
          // If we rotate the group containing the marker (which sits at top/0deg relative to group),
          // we should be good if we align start positions.
        >
             {/* We place the marker at the "top" of the circle (150, 30) assuming 0deg is top.
                 Actually SVG 0deg is right (3 o'clock). 
                 So we need to correct the phase.
             */}
             <motion.g transform="rotate(-90 150 150)">
                <circle
                  cx={150 + radius} 
                  cy={150}
                  r="12"
                  fill="#fff"
                  filter="url(#glow)"
                  className="cursor-pointer"
                />
                <circle
                  cx={150 + radius} 
                  cy={150}
                  r="4"
                  fill={currentColor}
                />
             </motion.g>
        </motion.g>

        {/* Center temperature value */}
        <text
          x="150"
          y="155"
          textAnchor="middle"
          className="text-6xl font-black fill-white tracking-tighter"
          style={{ 
             filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
             fontFamily: 'Inter, sans-serif'
          }}
        >
          {displayValue}
        </text>

        {/* Unit */}
        <text
          x="150"
          y="190"
          textAnchor="middle"
          className="text-2xl fill-white/50 font-bold"
        >
          {config.unit}
        </text>
      </svg>

      {/* Mode and zone status */}
      <div className="mt-8 text-center flex flex-col gap-2">
        <motion.div
          className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-black tracking-widest uppercase"
          style={{ color: currentColor, borderColor: `${currentColor}33` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {config.mode}
        </motion.div>
        <motion.div
          className="text-[10px] text-white/40 font-medium uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {statusText}
        </motion.div>
      </div>
    </motion.div>
  );
}
