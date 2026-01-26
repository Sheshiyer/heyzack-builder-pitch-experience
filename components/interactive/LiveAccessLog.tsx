import { motion, useReducedMotion } from 'framer-motion';
import { LogIn, LogOut, Package, User } from 'lucide-react';

type AccessLogConfig = {
  entries: Array<{
    time: string;
    type: string;
    name: string;
    unit?: string;
    status?: string;
    sponsor?: string;
  }>;
  scrollSpeed: number;
  maxVisible: number;
};

interface Props {
  config: AccessLogConfig;
  language?: 'en' | 'fr';
}

export default function LiveAccessLog({ config, language = 'en' }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const visibleEntries = config.entries.slice(0, config.maxVisible);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'entry':
        return LogIn;
      case 'exit':
        return LogOut;
      case 'delivery':
        return Package;
      default:
        return User;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'entry':
        return '#10B981'; // Green
      case 'exit':
        return '#3B82F6'; // Blue
      case 'delivery':
        return '#F59E0B'; // Orange
      default:
        return '#6B7280'; // Gray
    }
  };

  const getEventLabel = (type: string) => {
    if (language === 'fr') {
      switch (type) {
        case 'entry':
          return 'Entrée';
        case 'exit':
          return 'Sortie';
        case 'delivery':
          return 'Livraison';
        default:
          return 'Événement';
      }
    }
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div
      className="w-full max-w-md rounded-lg p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      role="log"
      aria-label="Access log"
    >
      <div className="space-y-3">
        {visibleEntries.map((entry, index) => {
          const Icon = getEventIcon(entry.type);
          const color = getEventColor(entry.type);

          return (
            <motion.div
              key={`${entry.time}-${index}`}
              className="flex items-center gap-3 p-3 rounded-md bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                delay: prefersReducedMotion ? 0 : index * 0.1,
                ease: 'easeOut'
              }}
            >
              {/* Icon */}
              <div
                className="flex-shrink-0 p-2 rounded-full"
                style={{ backgroundColor: `${color}20` }}
              >
                <Icon
                  size={20}
                  style={{ color }}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-semibold text-white/60">
                    {entry.time}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color }}
                  >
                    {getEventLabel(entry.type)}
                  </span>
                </div>
                <div className="text-sm font-medium text-white mt-0.5">
                  {entry.name}
                  {entry.unit && (
                    <span className="text-white/50 ml-1">
                      · Unit {entry.unit}
                    </span>
                  )}
                  {entry.sponsor && (
                    <span className="text-white/50 ml-1">
                      · {language === 'en' ? 'Invited by' : 'Invité par'} {entry.sponsor}
                    </span>
                  )}
                </div>
                {entry.status && (
                  <div className="text-xs text-white/40 mt-0.5 capitalize">
                    {entry.status}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
