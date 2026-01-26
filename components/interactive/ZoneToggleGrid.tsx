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
    <motion.div
      className="p-6 bg-slate-900/50 rounded-2xl border border-white/5 shadow-xl backdrop-blur-md w-full max-w-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="grid grid-cols-2 gap-3"
        role="group"
        aria-label="Zone control grid"
      >
        {config.zones.map((zone, index) => {
          const isActive = zoneStates[zone.id];
          const Icon = zone.icon && (Icons as any)[zone.icon] ? (Icons as any)[zone.icon] : null;

          return (
            <motion.button
              key={zone.id}
              className="relative h-24 rounded-xl overflow-hidden transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 group"
              style={{
                backgroundColor: isActive
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(255, 255, 255, 0.03)',
                borderColor: isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.05)',
                borderWidth: '1px'
              }}
              onClick={() => handleToggle(zone.id)}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05
              }}
              aria-label={`${zone.label} - ${isActive ? 'active' : 'inactive'}`}
              aria-pressed={isActive}
            >
              {/* Active State Background Gradient */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-50"
                  layoutId={`active-bg-${zone.id}`}
                />
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-3">
                {/* Icon */}
                {config.showIcons && Icon && (
                  <div className={`mb-2 p-2 rounded-full transition-colors duration-300 ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60'}`}>
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                )}

                {/* Label */}
                {config.showLabels !== false && (
                  <div className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {zone.label}
                  </div>
                )}

                {/* Status Dot */}
                <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? 'bg-emerald-400 shadow-[0_0_8px_rgb(52,211,153)]' : 'bg-white/10'}`} />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
