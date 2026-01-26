import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from './Icon';
import type { Language } from '../types';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface OrbitalElement {
  icon: string;        // Lucide icon name
  size: number;        // Icon size in pixels (20-24)
  distance: number;    // Orbital radius in pixels (170-220)
  speed: number;       // Rotation duration in seconds (11-19)
  color: string;       // Icon color (hex)
}

interface Props {
  orbitalElements: OrbitalElement[];
  centerElement: React.ReactNode;     // The product image to wrap
  language?: Language;
}

// ============================================================================
// ICON LABELS - Mapping icon names to tooltips
// ============================================================================

const iconLabels: Record<string, Record<Language, string>> = {
  // Security icons
  'Video': { en: 'Video Feed', fr: 'Flux Vidéo' },
  'Bell': { en: 'Alerts', fr: 'Alertes' },
  'Wifi': { en: 'Connectivity', fr: 'Connectivité' },
  'Lock': { en: 'Encryption', fr: 'Chiffrement' },
  'Key': { en: 'Access Control', fr: 'Contrôle d\'accès' },
  'Shield': { en: 'Protection', fr: 'Protection' },

  // Savings icons
  'Activity': { en: 'Monitoring', fr: 'Surveillance' },
  'Thermometer': { en: 'Temperature', fr: 'Température' },
  'Lightbulb': { en: 'Smart Lighting', fr: 'Éclairage Intelligent' },
  'Zap': { en: 'Energy', fr: 'Énergie' },
  'Battery': { en: 'Power', fr: 'Alimentation' },
  'Gauge': { en: 'Metrics', fr: 'Métriques' },

  // Comfort icons
  'Snowflake': { en: 'Cooling', fr: 'Refroidissement' },
  'Flame': { en: 'Heating', fr: 'Chauffage' },
  'Wind': { en: 'Ventilation', fr: 'Ventilation' },
  'Sun': { en: 'Daylight', fr: 'Lumière du jour' },
  'Moon': { en: 'Night Mode', fr: 'Mode Nuit' },
  'Music': { en: 'Audio', fr: 'Audio' },
  'Speaker': { en: 'Sound', fr: 'Son' },
  'Headphones': { en: 'Audio Control', fr: 'Contrôle Audio' },

  // Utility icons
  'Router': { en: 'Network Hub', fr: 'Hub Réseau' },
  'Cloud': { en: 'Cloud Sync', fr: 'Synchro Cloud' },
  'Network': { en: 'Network', fr: 'Réseau' },
  'Tool': { en: 'Installation', fr: 'Installation' },
  'Power': { en: 'Power Supply', fr: 'Alimentation' },
  'Plug': { en: 'Power Connection', fr: 'Connexion Électrique' },
  'Usb': { en: 'USB Port', fr: 'Port USB' },
  'Cable': { en: 'Wiring', fr: 'Câblage' },
  'PawPrint': { en: 'Pet Care', fr: 'Soin Animaux' },
  'Camera': { en: 'Pet Monitoring', fr: 'Surveillance Animaux' },
  'Heart': { en: 'Pet Friendly', fr: 'Animaux acceptés' },
  'Home': { en: 'Home Control', fr: 'Contrôle Maison' },
  'Touch': { en: 'Touch Control', fr: 'Contrôle Tactile' },
  'Sliders': { en: 'Settings', fr: 'Paramètres' },
  'Settings': { en: 'Configuration', fr: 'Configuration' },
  'Wrench': { en: 'Tools', fr: 'Outils' },
  'Clock': { en: 'Schedule', fr: 'Horaire' },
  'ToggleLeft': { en: 'Switch', fr: 'Interrupteur' },
};

function getIconLabel(iconName: string, language: Language): string {
  return iconLabels[iconName]?.[language] || iconName;
}

// ============================================================================
// SUB-COMPONENT: ORBITAL ICON
// ============================================================================

interface OrbitalIconProps {
  element: OrbitalElement;
  index: number;
  total: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  prefersReducedMotion: boolean;
  language: Language;
}

function OrbitalIcon({
  element,
  index,
  total,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  prefersReducedMotion,
  language
}: OrbitalIconProps) {
  // Calculate starting position (distribute evenly around circle)
  const angleStep = (2 * Math.PI) / total;
  const startAngle = (index * angleStep * 180) / Math.PI; // Convert to degrees

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={prefersReducedMotion ? {} : { rotate: 360 }}
      initial={{ rotate: startAngle }}
      transition={prefersReducedMotion ? {} : {
        duration: element.speed,
        repeat: Infinity,
        ease: 'linear'
      }}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        className="pointer-events-auto"
        style={{
          transform: `translateX(${element.distance}px)`,
        }}
        animate={prefersReducedMotion ? {} : {
          rotate: -360, // Counter-rotate to keep icon upright
          y: [0, -5, 0], // Vertical bounce for 3D effect
        }}
        transition={prefersReducedMotion ? {} : {
          rotate: {
            duration: element.speed,
            repeat: Infinity,
            ease: 'linear'
          },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: `0 0 20px ${element.color}80`
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        aria-label={getIconLabel(element.icon, language)}
      >
        <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
          <Icon
            name={element.icon}
            size={element.size}
            color={element.color}
            className="drop-shadow-lg"
          />

          {/* Tooltip */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap z-50 pointer-events-none"
              style={{ willChange: 'opacity, transform' }}
            >
              {getIconLabel(element.icon, language)}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OrbitingPartners({
  orbitalElements,
  centerElement,
  language = 'en'
}: Props) {
  const prefersReducedMotion = useReducedMotion() || false;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {/* Center element (product) */}
      <div className="relative z-10">
        {centerElement}
      </div>

      {/* Orbital icons container */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {orbitalElements.map((element, index) => (
          <OrbitalIcon
            key={`orbital-${index}-${element.icon}`}
            element={element}
            index={index}
            total={orbitalElements.length}
            isHovered={hoveredIndex === index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            prefersReducedMotion={prefersReducedMotion}
            language={language}
          />
        ))}
      </div>
    </div>
  );
}
