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
    <div
      className="relative w-full max-w-md aspect-square"
      role="img"
      aria-label={`Sensor map showing ${activeZones.length} active zones`}
    >
      {/* Zone count badge */}
      <motion.div
        className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 backdrop-blur-sm z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">
            {activeZones.length} {language === 'en' ? 'ACTIVE' : 'ACTIFS'}
          </span>
        </div>
      </motion.div>

      {/* Simplified floor plan background */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/10">
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
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
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
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
                  className="absolute inset-0 w-12 h-12 rounded-full border-2 border-green-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 2],
                    opacity: [0.6, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: index * 0.3,
                  }}
                />
                <motion.div
                  className="absolute inset-0 w-12 h-12 rounded-full border-2 border-green-400"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: index * 0.3 + 0.5,
                  }}
                />
              </>
            )}

            {/* Center dot */}
            <motion.div
              className="relative w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: index * 0.1,
              }}
              whileHover={{ scale: 1.5 }}
            />

            {/* Zone name on hover */}
            {hoveredZone === zone.id && (
              <motion.div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-xs text-white whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {zone.id}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
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
              className="relative w-2 h-2 rounded-full bg-gray-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: (activeZones.length + index) * 0.1,
              }}
              whileHover={{ scale: 1.5 }}
            />

            {/* Zone name on hover */}
            {hoveredZone === zone.id && (
              <motion.div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black/80 backdrop-blur-sm text-xs text-white/60 whitespace-nowrap"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {zone.id} ({language === 'en' ? 'inactive' : 'inactif'})
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
