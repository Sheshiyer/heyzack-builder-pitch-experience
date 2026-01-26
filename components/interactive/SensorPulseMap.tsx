import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type SensorPulseConfig = {
  zones: Array<{
    id: string;
    active: boolean;
    position: { x: number; y: number };
  }>;
  pulseInterval: number;
  showConnections?: boolean;
};

interface Props {
  config: SensorPulseConfig;
  language?: 'en' | 'fr';
}

export default function SensorPulseMap({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  const activeZones = config.zones.filter(z => z.active);
  const inactiveZones = config.zones.filter(z => !z.active);

  return (
    <motion.div
      className="relative w-full max-w-md aspect-square bg-slate-900/50 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md overflow-hidden"
      role="img"
      aria-label={`Sensor map showing ${activeZones.length} active zones`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Zone count badge */}
      <motion.div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md z-20 shadow-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgb(52,211,153)]" />
          <span className="text-xs font-bold text-emerald-400 tracking-wide">
            {activeZones.length} {language === 'en' ? 'ACTIVE' : 'ACTIFS'}
          </span>
        </div>
      </motion.div>

      {/* Floor plan background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Radar sweep effect */}
        <motion.div 
           className="absolute inset-0 origin-center bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent"
           animate={{ rotate: 360 }}
           transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
           style={{ maskImage: 'radial-gradient(circle, white, transparent 70%)' }}
        />
      </div>

      {/* Connection lines */}
      {config.showConnections && activeZones.length > 1 && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {activeZones.map((zone, index) => {
            if (index === activeZones.length - 1) return null;
            const nextZone = activeZones[index + 1];

            return (
              <motion.line
                key={`${zone.id}-${nextZone.id}`}
                x1={`${zone.position.x}%`}
                y1={`${zone.position.y}%`}
                x2={`${nextZone.position.x}%`}
                y2={`${nextZone.position.y}%`}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.5,
                  delay: index * 0.2,
                  ease: 'easeInOut'
                }}
              />
            );
          })}
        </svg>
      )}

      {/* Zone sensors */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        {/* Active zones */}
        {activeZones.map((zone, index) => (
          <div
            key={zone.id}
            className="absolute"
            style={{
              left: `${zone.position.x}%`,
              top: `${zone.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Pulse rings */}
            {!prefersReducedMotion && (
              <>
                <motion.div
                  className="absolute inset-0 w-16 h-16 rounded-full border border-emerald-400/30"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [0.5, 2.5],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: index * 0.5,
                  }}
                />
              </>
            )}

            {/* Center dot */}
            <motion.div
              className="relative w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] border-2 border-white/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.3 }}
            />

            {/* Zone name on hover */}
            {hoveredZone === zone.id && (
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 backdrop-blur-md text-xs font-bold text-white whitespace-nowrap z-30 shadow-xl"
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
              >
                {zone.id}
              </motion.div>
            )}
          </div>
        ))}

        {/* Inactive zones */}
        {inactiveZones.map((zone, index) => (
          <div
            key={zone.id}
            className="absolute"
            style={{
              left: `${zone.position.x}%`,
              top: `${zone.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            {/* Small gray dot */}
            <motion.div
              className="relative w-2 h-2 rounded-full bg-white/20 border border-white/5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: (activeZones.length + index) * 0.1,
              }}
              whileHover={{ scale: 1.5, backgroundColor: "rgba(255,255,255,0.4)" }}
            />

            {/* Zone name on hover */}
            {hoveredZone === zone.id && (
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-[10px] text-white/50 whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {zone.id} ({language === 'en' ? 'OFF' : 'INACTIF'})
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
