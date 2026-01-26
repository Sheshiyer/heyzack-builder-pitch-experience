import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import * as Icons from 'lucide-react';

type ToggleGridConfig = {
  zones: Array<{
    id: string;
    label: string;
    state: boolean;
    icon?: string;
  }>;
  layout: string;
  showLabels?: boolean;
  showIcons?: boolean;
  quickToggle?: boolean;
};

interface Props {
  config: ToggleGridConfig;
  language?: 'en' | 'fr';
}

export default function ZoneToggleGrid({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [zoneStates, setZoneStates] = useState(
    config.zones.reduce((acc, zone) => ({ ...acc, [zone.id]: zone.state }), {} as Record<string, boolean>)
  );

  const handleToggle = (zoneId: string) => {
    if (config.quickToggle !== false) {
      setZoneStates(prev => ({ ...prev, [zoneId]: !prev[zoneId] }));
    }
  };

  const getBrightness = (isActive: boolean) => {
    return isActive ? 85 : 0;
  };

  return (
    <div
      className="grid grid-cols-2 gap-3 w-full max-w-sm"
      role="group"
      aria-label="Zone control grid"
    >
      {config.zones.map((zone, index) => {
        const isActive = zoneStates[zone.id];
        const Icon = zone.icon && (Icons as any)[zone.icon] ? (Icons as any)[zone.icon] : null;

        return (
          <motion.button
            key={zone.id}
            className="relative h-24 rounded-lg overflow-hidden transition-transform focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              backgroundColor: isActive
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(55, 65, 81, 0.8)',
            }}
            onClick={() => handleToggle(zone.id)}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
            whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              delay: prefersReducedMotion ? 0 : index * 0.1
            }}
            aria-label={`${zone.label} - ${isActive ? 'active' : 'inactive'}`}
            aria-pressed={isActive}
          >
            {/* Glow effect for active zones */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
              {/* Icon */}
              {config.showIcons && Icon && (
                <Icon
                  size={28}
                  className={`mb-2 ${isActive ? 'text-green-400' : 'text-white/40'}`}
                  aria-hidden="true"
                />
              )}

              {/* Label */}
              {config.showLabels !== false && (
                <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {zone.label}
                </div>
              )}

              {/* Brightness bar */}
              <div className="mt-2 w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                  initial={{ width: `${getBrightness(zone.state)}%` }}
                  animate={{ width: `${getBrightness(isActive)}%` }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                />
              </div>

              {/* State indicator */}
              <div className="mt-1 text-xs text-white/40">
                {isActive ? (
                  <span className="text-green-400">{language === 'en' ? 'ON' : 'ACTIVÉ'}</span>
                ) : (
                  <span>{language === 'en' ? 'OFF' : 'DÉSACTIVÉ'}</span>
                )}
              </div>
            </div>

            {/* Active glow border */}
            {isActive && (
              <motion.div
                className="absolute inset-0 border-2 border-green-400/50 rounded-lg pointer-events-none"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(16, 185, 129, 0.3)',
                    '0 0 20px rgba(16, 185, 129, 0.5)',
                    '0 0 10px rgba(16, 185, 129, 0.3)',
                  ],
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
