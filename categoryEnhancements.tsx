import { Variants } from 'framer-motion';
import { Language } from './types';

// ============================================================================
// CATEGORY ENHANCEMENT SYSTEM
// ============================================================================
// Defines unique visual characteristics, animations, and interactive elements
// for all 14 product categories in the HeyZack portfolio experience.
//
// Structure:
// - Security Pillar (3): camera-doorbell, door-lock, gateway
// - Savings Pillar (3): sensors, circuit-breaker, diy-breaker
// - Comfort Pillar (6): climatisation, lighting, music-control, curtain-shutter,
//                       control-panel, switch
// - Utility (2): accessories (includes door-lock-body products), pet-accessories
// ============================================================================

// ============================================================================
// TYPE DEFINITIONS - Interactive Element Configs
// ============================================================================

type DialConfig = {
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  mode: string;
  zones: string[];
};

type CounterConfig = {
  value: number;
  label: string;
  animationDuration: number;
  countUp: boolean;
  prefix?: string;
  suffix?: string;
  color: string;
};

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

type AudioWaveConfig = {
  bars: number;
  frequency: number[];
  color: string;
  animated: boolean;
  smoothing: number;
};

type LockSequenceConfig = {
  steps: Array<{
    stage: string;
    duration: number;
    icon: string;
    label: string;
  }>;
  loopDelay: number;
  showProgress: boolean;
};

type SensorPulseConfig = {
  zones: Array<{
    id: string;
    active: boolean;
    position: { x: number; y: number };
  }>;
  pulseInterval: number;
  showConnections?: boolean;
};

type InteractiveElementConfig =
  | { type: 'dial'; config: DialConfig }
  | { type: 'counter'; config: CounterConfig }
  | { type: 'gauge'; config: GaugeConfig }
  | { type: 'access-log'; config: AccessLogConfig }
  | { type: 'flow-meter'; config: FlowMeterConfig }
  | { type: 'toggle-grid'; config: ToggleGridConfig }
  | { type: 'audio-wave'; config: AudioWaveConfig }
  | { type: 'lock-sequence'; config: LockSequenceConfig }
  | { type: 'sensor-pulse'; config: SensorPulseConfig };

// ============================================================================
// TYPE DEFINITIONS - Radical Element Content
// ============================================================================

type FloatingBadgeContent = {
  text: string;
  icon: string;
  color: string;
  pulse?: boolean;
  count?: number;
  subtext?: string;
};

type MetricRingContent = {
  value: number;
  label: string;
  color: string;
  thickness: number;
  max?: number;
};

type ParticleFieldContent = {
  count: number;
  spread: string;
  color?: string;
  glow?: boolean;
  animated?: boolean;
};

type LightBeamContent = {
  direction: string;
  intensity: number;
  color: string;
};

type ConnectionPulseContent = {
  nodes: number;
  pulseSpeed: number;
  color: string;
  radial?: boolean;
};

type RadicalElementContent =
  | { type: 'floating-badge'; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'orbiting'; content: FloatingBadgeContent }
  | { type: 'metric-ring'; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'orbiting'; content: MetricRingContent }
  | { type: 'particle-field'; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'orbiting'; content: ParticleFieldContent }
  | { type: 'light-beam'; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'orbiting'; content: LightBeamContent }
  | { type: 'connection-pulse'; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'orbiting'; content: ConnectionPulseContent };

// ============================================================================
// CATEGORY ENHANCEMENT INTERFACE
// ============================================================================

export interface CategoryEnhancement {
  // Visual Theme
  accentGradient: { from: string; to: string };
  glowColor: string;
  particleShape: 'circle' | 'square' | 'triangle' | 'star' | 'wave';

  // Icon Animation (Framer Motion variants)
  iconAnimation: Variants;

  // Micro Stats Display (3 stat badges)
  microStats: Array<{
    icon: string;
    label: Record<Language, string>;
    value: string;
    color: string;
  }>;

  // Interactive Element (unique per category)
  interactiveElement: InteractiveElementConfig;

  // Orbital Elements (icons circling product)
  orbitalElements: Array<{
    icon: string;
    size: number;
    distance: number;
    speed: number;
    color: string;
  }>;

  // Radically Placed Elements
  radicalElements: Array<RadicalElementContent>;

  // Pillar Association
  pillar: 'savings' | 'security' | 'comfort';
}

export type CategoryId =
  | 'camera-doorbell'
  | 'door-lock'
  | 'gateway'
  | 'sensors'
  | 'circuit-breaker'
  | 'diy-breaker'
  | 'climatisation'
  | 'lighting'
  | 'music-control'
  | 'curtain-shutter'
  | 'control-panel'
  | 'switch'
  | 'accessories'
  | 'pet-accessories';

export const CATEGORY_ENHANCEMENTS: Record<CategoryId, CategoryEnhancement> = {
  // ==========================================================================
  // SECURITY PILLAR
  // ==========================================================================

  'camera-doorbell': {
    pillar: 'security',
    accentGradient: { from: '#243984', to: '#5B68C4' },
    glowColor: '#5B68C4',
    particleShape: 'circle',

    iconAnimation: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.9, 1, 0.9],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Target',
        label: {
          en: 'Detection Rate',
          fr: 'Taux de détection'
        },
        value: '95%',
        color: '#10B981'
      },
      {
        icon: 'Activity',
        label: {
          en: 'Events Today',
          fr: 'Événements aujourd\'hui'
        },
        value: '47',
        color: '#3B82F6'
      },
      {
        icon: 'HardDrive',
        label: {
          en: 'Storage',
          fr: 'Stockage'
        },
        value: '2.4TB',
        color: '#8B5CF6'
      }
    ],

    interactiveElement: {
      type: 'access-log',
      config: {
        entries: [
          { time: '14:32', type: 'entry', name: 'Resident A', unit: '402' },
          { time: '14:28', type: 'delivery', name: 'UPS', status: 'verified' },
          { time: '14:15', type: 'exit', name: 'Resident B', unit: '301' },
          { time: '13:58', type: 'entry', name: 'Guest', sponsor: 'Resident C' }
        ],
        scrollSpeed: 2000,
        maxVisible: 4
      }
    },

    orbitalElements: [
      { icon: 'Video', size: 24, distance: 175, speed: 12, color: '#3B82F6' },
      { icon: 'Bell', size: 20, distance: 195, speed: 15, color: '#8B5CF6' },
      { icon: 'Wifi', size: 22, distance: 215, speed: 18, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'LIVE', icon: 'Dot', color: '#EF4444', pulse: true }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 95, label: 'Accuracy', color: '#10B981', thickness: 6 }
      },
      {
        type: 'particle-field',
        position: 'center',
        content: { count: 40, spread: 'radial' }
      }
    ]
  },

  'door-lock': {
    pillar: 'security',
    accentGradient: { from: '#243984', to: '#5B68C4' },
    glowColor: '#5B68C4',
    particleShape: 'square',

    iconAnimation: {
      animate: {
        rotateY: [0, 10, 0, -10, 0],
        scale: [1, 1.02, 1],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Lock',
        label: {
          en: 'Access Points',
          fr: 'Points d\'accès'
        },
        value: '24',
        color: '#243984'
      },
      {
        icon: 'Key',
        label: {
          en: 'Virtual Keys',
          fr: 'Clés virtuelles'
        },
        value: '138',
        color: '#5B68C4'
      },
      {
        icon: 'Shield',
        label: {
          en: 'Encryption',
          fr: 'Chiffrement'
        },
        value: 'AES-256',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'lock-sequence',
      config: {
        steps: [
          { stage: 'verify', duration: 800, icon: 'Scan', label: 'Authenticating' },
          { stage: 'unlock', duration: 600, icon: 'Unlock', label: 'Unlocking' },
          { stage: 'complete', duration: 400, icon: 'Check', label: 'Access Granted' }
        ],
        loopDelay: 3000,
        showProgress: true
      }
    },

    orbitalElements: [
      { icon: 'Lock', size: 22, distance: 170, speed: 14, color: '#243984' },
      { icon: 'Key', size: 20, distance: 190, speed: 16, color: '#5B68C4' },
      { icon: 'Shield', size: 24, distance: 210, speed: 19, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'ENCRYPTED', icon: 'ShieldCheck', color: '#10B981' }
      },
      {
        type: 'connection-pulse',
        position: 'bottom-right',
        content: { nodes: 3, pulseSpeed: 1500, color: '#5B68C4' }
      }
    ]
  },

  'gateway': {
    pillar: 'security',
    accentGradient: { from: '#243984', to: '#5B68C4' },
    glowColor: '#5B68C4',
    particleShape: 'triangle',

    iconAnimation: {
      animate: {
        scale: [1, 1.08, 1],
        rotate: [0, 5, 0, -5, 0],
        transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Server',
        label: {
          en: 'Connected Devices',
          fr: 'Appareils connectés'
        },
        value: '247',
        color: '#3B82F6'
      },
      {
        icon: 'Zap',
        label: {
          en: 'Uptime',
          fr: 'Disponibilité'
        },
        value: '99.8%',
        color: '#10B981'
      },
      {
        icon: 'Activity',
        label: {
          en: 'Data Rate',
          fr: 'Débit de données'
        },
        value: '1.2GB/h',
        color: '#8B5CF6'
      }
    ],

    interactiveElement: {
      type: 'counter',
      config: {
        value: 247,
        label: 'Devices',
        animationDuration: 2000,
        countUp: true,
        suffix: ' units',
        color: '#3B82F6'
      }
    },

    orbitalElements: [
      { icon: 'Router', size: 24, distance: 180, speed: 11, color: '#3B82F6' },
      { icon: 'Cloud', size: 22, distance: 200, speed: 13, color: '#8B5CF6' },
      { icon: 'Network', size: 20, distance: 220, speed: 17, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-left',
        content: { text: 'PORTFOLIO HUB', icon: 'Server', color: '#3B82F6' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-right',
        content: { value: 247, label: 'Nodes', color: '#5B68C4', thickness: 5 }
      },
      {
        type: 'connection-pulse',
        position: 'center',
        content: { nodes: 8, pulseSpeed: 1200, color: '#3B82F6', radial: true }
      }
    ]
  },

  // ==========================================================================
  // SAVINGS PILLAR
  // ==========================================================================

  'sensors': {
    pillar: 'savings',
    accentGradient: { from: '#10B981', to: '#059669' },
    glowColor: '#10B981',
    particleShape: 'circle',

    iconAnimation: {
      animate: {
        scale: [1, 1.15, 1],
        boxShadow: [
          '0 0 20px rgba(16, 185, 129, 0.3)',
          '0 0 40px rgba(16, 185, 129, 0.6)',
          '0 0 20px rgba(16, 185, 129, 0.3)'
        ],
        transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Activity',
        label: {
          en: 'Active Zones',
          fr: 'Zones actives'
        },
        value: '18',
        color: '#10B981'
      },
      {
        icon: 'TrendingDown',
        label: {
          en: 'Energy Saved',
          fr: 'Énergie économisée'
        },
        value: '30%',
        color: '#059669'
      },
      {
        icon: 'Thermometer',
        label: {
          en: 'Avg Temp',
          fr: 'Temp moyenne'
        },
        value: '21.5°C',
        color: '#3B82F6'
      }
    ],

    interactiveElement: {
      type: 'sensor-pulse',
      config: {
        zones: [
          { id: 'lobby', active: true, position: { x: 30, y: 20 } },
          { id: 'hallway-1', active: true, position: { x: 60, y: 40 } },
          { id: 'gym', active: false, position: { x: 80, y: 60 } },
          { id: 'pool', active: true, position: { x: 50, y: 80 } }
        ],
        pulseInterval: 1500,
        showConnections: true
      }
    },

    orbitalElements: [
      { icon: 'Activity', size: 22, distance: 175, speed: 13, color: '#10B981' },
      { icon: 'Thermometer', size: 20, distance: 195, speed: 16, color: '#3B82F6' },
      { icon: 'Sun', size: 24, distance: 215, speed: 19, color: '#F59E0B' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'ZONE', icon: 'MapPin', color: '#10B981', count: 18 }
      },
      {
        type: 'particle-field',
        position: 'center',
        content: { count: 35, spread: 'grid', color: '#10B981' }
      }
    ]
  },

  'circuit-breaker': {
    pillar: 'savings',
    accentGradient: { from: '#10B981', to: '#059669' },
    glowColor: '#10B981',
    particleShape: 'wave',

    iconAnimation: {
      animate: {
        x: [0, 2, 0, -2, 0],
        filter: [
          'brightness(1)',
          'brightness(1.2)',
          'brightness(1)'
        ],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Zap',
        label: {
          en: 'Power Saved',
          fr: 'Puissance économisée'
        },
        value: '30%',
        color: '#10B981'
      },
      {
        icon: 'TrendingDown',
        label: {
          en: 'Peak Shaving',
          fr: 'Écrêtage des pics'
        },
        value: '22%',
        color: '#059669'
      },
      {
        icon: 'DollarSign',
        label: {
          en: 'Annual Savings',
          fr: 'Économies annuelles'
        },
        value: '$12K',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'flow-meter',
      config: {
        flow: {
          current: 68,
          peak: 120,
          baseline: 45,
          unit: 'kW'
        },
        visualType: 'wave',
        updateInterval: 800,
        showThresholds: true
      }
    },

    orbitalElements: [
      { icon: 'Zap', size: 24, distance: 170, speed: 12, color: '#F59E0B' },
      { icon: 'Battery', size: 22, distance: 190, speed: 14, color: '#10B981' },
      { icon: 'Gauge', size: 20, distance: 210, speed: 17, color: '#3B82F6' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: '-30% ENERGY', icon: 'TrendingDown', color: '#10B981' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 68, max: 120, label: 'Load', color: '#059669', thickness: 7 }
      },
      {
        type: 'light-beam',
        position: 'center',
        content: { direction: 'radial', intensity: 0.4, color: '#10B981' }
      }
    ]
  },

  'diy-breaker': {
    pillar: 'savings',
    accentGradient: { from: '#10B981', to: '#059669' },
    glowColor: '#10B981',
    particleShape: 'square',

    iconAnimation: {
      animate: {
        rotateZ: [0, 3, 0, -3, 0],
        scale: [1, 1.05, 1],
        transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Wrench',
        label: {
          en: 'Install Time',
          fr: 'Temps d\'installation'
        },
        value: '15min',
        color: '#F59E0B'
      },
      {
        icon: 'Gauge',
        label: {
          en: 'Load Monitor',
          fr: 'Surveillance charge'
        },
        value: '42A',
        color: '#3B82F6'
      },
      {
        icon: 'TrendingDown',
        label: {
          en: 'ROI Period',
          fr: 'Période de retour'
        },
        value: '18mo',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'gauge',
      config: {
        value: 42,
        max: 80,
        min: 0,
        unit: 'A',
        label: 'Current Load',
        thresholds: [
          { value: 60, color: '#F59E0B', label: 'Warning' },
          { value: 75, color: '#EF4444', label: 'Critical' }
        ],
        needleColor: '#10B981'
      }
    },

    orbitalElements: [
      { icon: 'Wrench', size: 22, distance: 175, speed: 14, color: '#F59E0B' },
      { icon: 'Zap', size: 24, distance: 195, speed: 16, color: '#10B981' },
      { icon: 'Settings', size: 20, distance: 215, speed: 18, color: '#3B82F6' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-left',
        content: { text: 'DIY READY', icon: 'Wrench', color: '#F59E0B' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-right',
        content: { value: 42, max: 80, label: 'Load', color: '#10B981', thickness: 6 }
      }
    ]
  },

  // ==========================================================================
  // COMFORT PILLAR
  // ==========================================================================

  'climatisation': {
    pillar: 'comfort',
    accentGradient: { from: '#3B82F6', to: '#F97316' },
    glowColor: '#3B82F6',
    particleShape: 'circle',

    iconAnimation: {
      animate: {
        rotate: 360,
        transition: { duration: 8, repeat: Infinity, ease: 'linear' }
      }
    },

    microStats: [
      {
        icon: 'Thermometer',
        label: {
          en: 'Target Temp',
          fr: 'Temp cible'
        },
        value: '21°C',
        color: '#3B82F6'
      },
      {
        icon: 'Wind',
        label: {
          en: 'Active Zones',
          fr: 'Zones actives'
        },
        value: '4/4',
        color: '#10B981'
      },
      {
        icon: 'TrendingDown',
        label: {
          en: 'Energy Mode',
          fr: 'Mode énergie'
        },
        value: 'ECO',
        color: '#059669'
      }
    ],

    interactiveElement: {
      type: 'dial',
      config: {
        value: 21,
        min: 16,
        max: 30,
        step: 0.5,
        unit: '°C',
        mode: 'auto',
        zones: ['living', 'bedroom', 'office', 'hallway']
      }
    },

    orbitalElements: [
      { icon: 'Snowflake', size: 22, distance: 170, speed: 13, color: '#3B82F6' },
      { icon: 'Flame', size: 24, distance: 190, speed: 15, color: '#F97316' },
      { icon: 'Wind', size: 20, distance: 210, speed: 18, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'AUTO MODE', icon: 'Zap', color: '#10B981' }
      },
      {
        type: 'floating-badge',
        position: 'top-left',
        content: { text: 'ZONE 1', icon: 'MapPin', color: '#3B82F6', count: 4 }
      },
      {
        type: 'particle-field',
        position: 'center',
        content: { count: 30, spread: 'radial', animated: true }
      }
    ]
  },

  'lighting': {
    pillar: 'comfort',
    accentGradient: { from: '#F59E0B', to: '#FCD34D' },
    glowColor: '#F59E0B',
    particleShape: 'star',

    iconAnimation: {
      animate: {
        filter: [
          'brightness(1) drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))',
          'brightness(1.3) drop-shadow(0 0 20px rgba(245, 158, 11, 0.6))',
          'brightness(1) drop-shadow(0 0 10px rgba(245, 158, 11, 0.3))'
        ],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Lightbulb',
        label: {
          en: 'Active Lights',
          fr: 'Lumières actives'
        },
        value: '24/42',
        color: '#F59E0B'
      },
      {
        icon: 'Palette',
        label: {
          en: 'Active Scenes',
          fr: 'Scènes actives'
        },
        value: '18',
        color: '#8B5CF6'
      },
      {
        icon: 'TrendingDown',
        label: {
          en: 'Power Usage',
          fr: 'Consommation'
        },
        value: '-45%',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'toggle-grid',
      config: {
        zones: [
          { id: 'lobby', label: 'Lobby', state: true },
          { id: 'hallway', label: 'Hallway', state: true },
          { id: 'gym', label: 'Gym', state: false },
          { id: 'pool', label: 'Pool', state: true }
        ],
        layout: 'grid',
        showLabels: true
      }
    },

    orbitalElements: [
      { icon: 'Sun', size: 24, distance: 175, speed: 11, color: '#F59E0B' },
      { icon: 'Moon', size: 20, distance: 195, speed: 14, color: '#8B5CF6' },
      { icon: 'Zap', size: 22, distance: 215, speed: 17, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'particle-field',
        position: 'center',
        content: { count: 50, spread: 'radial', color: '#F59E0B', glow: true }
      },
      {
        type: 'metric-ring',
        position: 'bottom-right',
        content: { value: 18, label: 'Scenes', color: '#F59E0B', thickness: 5 }
      }
    ]
  },

  'music-control': {
    pillar: 'comfort',
    accentGradient: { from: '#8B5CF6', to: '#A78BFA' },
    glowColor: '#8B5CF6',
    particleShape: 'wave',

    iconAnimation: {
      animate: {
        y: [0, -3, 0, 3, 0],
        scale: [1, 1.05, 1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Music',
        label: {
          en: 'Active Zones',
          fr: 'Zones actives'
        },
        value: '3/6',
        color: '#8B5CF6'
      },
      {
        icon: 'Volume2',
        label: {
          en: 'Avg Volume',
          fr: 'Volume moyen'
        },
        value: '65%',
        color: '#A78BFA'
      },
      {
        icon: 'Radio',
        label: {
          en: 'Sources',
          fr: 'Sources'
        },
        value: '4',
        color: '#3B82F6'
      }
    ],

    interactiveElement: {
      type: 'audio-wave',
      config: {
        bars: 12,
        frequency: [45, 68, 82, 90, 75, 88, 92, 78, 65, 55, 48, 40],
        color: '#8B5CF6',
        animated: true,
        smoothing: 0.3
      }
    },

    orbitalElements: [
      { icon: 'Music', size: 24, distance: 170, speed: 12, color: '#8B5CF6' },
      { icon: 'Speaker', size: 22, distance: 190, speed: 15, color: '#A78BFA' },
      { icon: 'Headphones', size: 20, distance: 210, speed: 18, color: '#3B82F6' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'NOW PLAYING', icon: 'Music', color: '#8B5CF6', pulse: true }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 65, max: 100, label: 'Volume', color: '#8B5CF6', thickness: 6 }
      }
    ]
  },

  'curtain-shutter': {
    pillar: 'comfort',
    accentGradient: { from: '#4F46E5', to: '#818CF8' },
    glowColor: '#4F46E5',
    particleShape: 'square',

    iconAnimation: {
      animate: {
        scaleY: [1, 0.95, 1],
        opacity: [1, 0.9, 1],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Sun',
        label: {
          en: 'Solar Control',
          fr: 'Contrôle solaire'
        },
        value: 'Active',
        color: '#F59E0B'
      },
      {
        icon: 'Clock',
        label: {
          en: 'Schedules',
          fr: 'Horaires'
        },
        value: '12',
        color: '#4F46E5'
      },
      {
        icon: 'Eye',
        label: {
          en: 'Privacy Mode',
          fr: 'Mode privé'
        },
        value: 'Auto',
        color: '#8B5CF6'
      }
    ],

    interactiveElement: {
      type: 'gauge',
      config: {
        value: 45,
        max: 100,
        min: 0,
        unit: '%',
        label: 'Position',
        showMarkers: [0, 25, 50, 75, 100],
        needleColor: '#4F46E5'
      }
    },

    orbitalElements: [
      { icon: 'Sun', size: 24, distance: 175, speed: 13, color: '#F59E0B' },
      { icon: 'Moon', size: 20, distance: 195, speed: 16, color: '#818CF8' },
      { icon: 'Clock', size: 22, distance: 215, speed: 19, color: '#4F46E5' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'AUTO SCHEDULE', icon: 'Clock', color: '#4F46E5' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 45, max: 100, label: 'Position', color: '#4F46E5', thickness: 6 }
      }
    ]
  },

  'control-panel': {
    pillar: 'comfort',
    accentGradient: { from: '#14B8A6', to: '#5EEAD4' },
    glowColor: '#14B8A6',
    particleShape: 'triangle',

    iconAnimation: {
      animate: {
        scale: [1, 1.08, 1],
        boxShadow: [
          '0 0 20px rgba(20, 184, 166, 0.3)',
          '0 0 40px rgba(20, 184, 166, 0.5)',
          '0 0 20px rgba(20, 184, 166, 0.3)'
        ],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Layout',
        label: {
          en: 'Active Scenes',
          fr: 'Scènes actives'
        },
        value: '8',
        color: '#14B8A6'
      },
      {
        icon: 'Touch',
        label: {
          en: 'Interactions',
          fr: 'Interactions'
        },
        value: '142/day',
        color: '#5EEAD4'
      },
      {
        icon: 'Home',
        label: {
          en: 'Zones',
          fr: 'Zones'
        },
        value: '6',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'toggle-grid',
      config: {
        zones: [
          { id: 'morning', label: 'Morning', state: false, icon: 'Sunrise' },
          { id: 'work', label: 'Work', state: true, icon: 'Briefcase' },
          { id: 'evening', label: 'Evening', state: false, icon: 'Sunset' },
          { id: 'sleep', label: 'Sleep', state: false, icon: 'Moon' }
        ],
        layout: 'grid',
        showIcons: true
      }
    },

    orbitalElements: [
      { icon: 'Home', size: 24, distance: 170, speed: 12, color: '#14B8A6' },
      { icon: 'Touch', size: 20, distance: 190, speed: 15, color: '#5EEAD4' },
      { icon: 'Sliders', size: 22, distance: 210, speed: 18, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-left',
        content: { text: 'SCENE MASTER', icon: 'Layout', color: '#14B8A6' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-right',
        content: { value: 8, label: 'Scenes', color: '#14B8A6', thickness: 5 }
      }
    ]
  },

  'switch': {
    pillar: 'comfort',
    accentGradient: { from: '#06B6D4', to: '#67E8F9' },
    glowColor: '#06B6D4',
    particleShape: 'circle',

    iconAnimation: {
      animate: {
        rotateY: [0, 180, 360],
        transition: { duration: 6, repeat: Infinity, ease: 'linear' }
      }
    },

    microStats: [
      {
        icon: 'ToggleLeft',
        label: {
          en: 'Total Switches',
          fr: 'Interrupteurs totaux'
        },
        value: '32',
        color: '#06B6D4'
      },
      {
        icon: 'Zap',
        label: {
          en: 'Smart Actions',
          fr: 'Actions intelligentes'
        },
        value: '89/day',
        color: '#67E8F9'
      },
      {
        icon: 'Clock',
        label: {
          en: 'Schedules',
          fr: 'Horaires'
        },
        value: '16',
        color: '#10B981'
      }
    ],

    interactiveElement: {
      type: 'toggle-grid',
      config: {
        zones: [
          { id: 'entry', label: 'Entry', state: true },
          { id: 'kitchen', label: 'Kitchen', state: true },
          { id: 'living', label: 'Living', state: false },
          { id: 'bedroom', label: 'Bedroom', state: false }
        ],
        layout: 'grid',
        showLabels: true,
        quickToggle: true
      }
    },

    orbitalElements: [
      { icon: 'Power', size: 22, distance: 175, speed: 14, color: '#06B6D4' },
      { icon: 'ToggleLeft', size: 24, distance: 195, speed: 16, color: '#67E8F9' },
      { icon: 'Zap', size: 20, distance: 215, speed: 18, color: '#10B981' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'QUICK COMFORT', icon: 'Zap', color: '#06B6D4' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 89, label: 'Daily Actions', color: '#06B6D4', thickness: 6 }
      }
    ]
  },

  // ==========================================================================
  // UTILITY CATEGORIES
  // ==========================================================================

  'accessories': {
    pillar: 'comfort',
    accentGradient: { from: '#6B7280', to: '#9CA3AF' },
    glowColor: '#6B7280',
    particleShape: 'square',

    iconAnimation: {
      animate: {
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.03, 1],
        transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Plug',
        label: {
          en: 'Power Outlets',
          fr: 'Prises électriques'
        },
        value: '18',
        color: '#6B7280'
      },
      {
        icon: 'Cpu',
        label: {
          en: 'Compatibility',
          fr: 'Compatibilité'
        },
        value: '100%',
        color: '#10B981'
      },
      {
        icon: 'Package',
        label: {
          en: 'Accessories',
          fr: 'Accessoires'
        },
        value: '24',
        color: '#9CA3AF'
      }
    ],

    interactiveElement: {
      type: 'counter',
      config: {
        value: 24,
        label: 'Accessories',
        animationDuration: 2000,
        countUp: true,
        prefix: '',
        suffix: ' items',
        color: '#6B7280'
      }
    },

    orbitalElements: [
      { icon: 'Plug', size: 22, distance: 170, speed: 13, color: '#6B7280' },
      { icon: 'Usb', size: 20, distance: 190, speed: 16, color: '#9CA3AF' },
      { icon: 'Cable', size: 24, distance: 210, speed: 19, color: '#3B82F6' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-left',
        content: { text: 'POWER HUB', icon: 'Plug', color: '#6B7280' }
      },
      {
        type: 'metric-ring',
        position: 'bottom-right',
        content: { value: 100, label: 'Compatible', color: '#10B981', thickness: 5 }
      }
    ]
  },

  'pet-accessories': {
    pillar: 'comfort',
    accentGradient: { from: '#F43F5E', to: '#FB7185' },
    glowColor: '#F43F5E',
    particleShape: 'circle',

    iconAnimation: {
      animate: {
        y: [0, -5, 0, 5, 0],
        rotate: [0, -3, 0, 3, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    },

    microStats: [
      {
        icon: 'Heart',
        label: {
          en: 'Pet Friendly',
          fr: 'Animaux acceptés'
        },
        value: '100%',
        color: '#F43F5E'
      },
      {
        icon: 'Clock',
        label: {
          en: 'Auto Schedule',
          fr: 'Horaire auto'
        },
        value: '3x/day',
        color: '#FB7185'
      },
      {
        icon: 'Camera',
        label: {
          en: 'Monitoring',
          fr: 'Surveillance'
        },
        value: '24/7',
        color: '#8B5CF6'
      }
    ],

    interactiveElement: {
      type: 'gauge',
      config: {
        value: 3,
        max: 5,
        min: 0,
        unit: 'x/day',
        label: 'Feeding Schedule',
        showMarkers: [1, 2, 3, 4, 5],
        needleColor: '#F43F5E'
      }
    },

    orbitalElements: [
      { icon: 'Heart', size: 24, distance: 175, speed: 12, color: '#F43F5E' },
      { icon: 'Camera', size: 20, distance: 195, speed: 15, color: '#8B5CF6' },
      { icon: 'Bell', size: 22, distance: 215, speed: 18, color: '#FB7185' }
    ],

    radicalElements: [
      {
        type: 'floating-badge',
        position: 'top-right',
        content: { text: 'AUTO-FEED', icon: 'Heart', color: '#F43F5E', pulse: true }
      },
      {
        type: 'metric-ring',
        position: 'bottom-left',
        content: { value: 3, max: 5, label: 'Feeds/Day', color: '#F43F5E', thickness: 6 }
      }
    ]
  }
};

// Helper function to get enhancement by category ID
export const getCategoryEnhancement = (categoryId: string): CategoryEnhancement | undefined => {
  return CATEGORY_ENHANCEMENTS[categoryId as CategoryId];
};

// Helper function to get all categories by pillar
export const getCategoriesByPillar = (pillar: 'savings' | 'security' | 'comfort'): CategoryId[] => {
  return Object.entries(CATEGORY_ENHANCEMENTS)
    .filter(([_, enhancement]) => enhancement.pillar === pillar)
    .map(([id]) => id as CategoryId);
};

// Export category count constant
export const TOTAL_CATEGORIES = 14;
