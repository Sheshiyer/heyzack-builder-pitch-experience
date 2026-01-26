import React from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import Icon from './Icon';
import type { RadicalElementContent, CategoryId } from '../categoryEnhancements';
import type { Language } from '../types';

// ============================================================================
// PROPS INTERFACE
// ============================================================================

interface Props {
  elements: RadicalElementContent[];
  categoryId: CategoryId;
  accentGradient: { from: string; to: string };
  particleShape: 'circle' | 'square' | 'triangle' | 'star' | 'wave';
  language?: Language;
}

// ============================================================================
// POSITION HELPER
// ============================================================================

const getPositionClasses = (position: RadicalElementContent['position']): string => {
  switch (position) {
    case 'top-left':
      return '-top-8 -left-8';
    case 'top-right':
      return '-top-8 -right-8';
    case 'bottom-left':
      return '-bottom-8 -left-8';
    case 'bottom-right':
      return '-bottom-8 -right-8';
    case 'center':
      return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    case 'orbiting':
      return ''; // Handled by OrbitingPartners component
    default:
      return '';
  }
};

// ============================================================================
// SUB-COMPONENT: FLOATING BADGE
// ============================================================================

interface FloatingBadgeProps {
  element: Extract<RadicalElementContent, { type: 'floating-badge' }>;
  prefersReducedMotion: boolean;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({ element, prefersReducedMotion }) => {
  const { position, content } = element;
  const { text, icon, color, pulse, count, subtext } = content;

  return (
    <motion.div
      className={`absolute ${getPositionClasses(position)} z-50`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: prefersReducedMotion ? 0 : [0, -10, 0],
        rotate: prefersReducedMotion ? 0 : [0, 5, 0],
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ willChange: 'transform' }}
      aria-hidden="true"
    >
      <div
        className="px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${color}e0, ${color}b0)`,
          boxShadow: pulse
            ? `0 0 20px ${color}80, 0 4px 12px rgba(0, 0, 0, 0.3)`
            : `0 4px 12px rgba(0, 0, 0, 0.3)`,
        }}
      >
        {/* Icon */}
        <motion.div
          animate={
            pulse && !prefersReducedMotion
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon name={icon as any} size={16} className="text-white" />
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              {text}
            </span>
            {count !== undefined && (
              <span className="text-xs font-black text-white/90">
                {count}
              </span>
            )}
          </div>
          {subtext && (
            <span className="text-[8px] font-medium text-white/70 uppercase tracking-wider">
              {subtext}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// SUB-COMPONENT: METRIC RING
// ============================================================================

interface MetricRingProps {
  element: Extract<RadicalElementContent, { type: 'metric-ring' }>;
  prefersReducedMotion: boolean;
}

const MetricRing: React.FC<MetricRingProps> = ({ element, prefersReducedMotion }) => {
  const { position, content } = element;
  const { value, label, color, thickness, max = 100 } = content;
  const safeMax = Math.max(max, 1); // Prevent division by zero

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / safeMax) * circumference;

  return (
    <motion.div
      className={`absolute ${getPositionClasses(position)} z-50`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      <div
        className="relative w-[100px] h-[100px] rounded-2xl backdrop-blur-md flex items-center justify-center"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        }}
      >
        <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={thickness}
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: prefersReducedMotion ? strokeDashoffset : [circumference, strokeDashoffset],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut',
            }}
            style={{
              filter: `drop-shadow(0 0 8px ${color}80)`,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="flex flex-col items-center relative z-10">
          <motion.span
            className="text-2xl font-black text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            {value}
          </motion.span>
          <span className="text-[8px] font-bold text-white/60 uppercase tracking-widest">
            {label}
          </span>
        </div>

        {/* Pulse on completion */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(circle, ${color}40, transparent)`,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

// ============================================================================
// SUB-COMPONENT: PARTICLE FIELD
// ============================================================================

interface ParticleFieldProps {
  element: Extract<RadicalElementContent, { type: 'particle-field' }>;
  particleShape: 'circle' | 'square' | 'triangle' | 'star' | 'wave';
  accentGradient: { from: string; to: string };
  prefersReducedMotion: boolean;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
  element,
  particleShape,
  accentGradient,
  prefersReducedMotion,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { content } = element;

  // Device-aware particle count
  const particleCount = React.useMemo(() => {
    if (prefersReducedMotion) return 0;
    if (typeof window === 'undefined') return content.count;
    return window.innerWidth < 768 ? 15 : content.count;
  }, [prefersReducedMotion, content.count]);

  // Generate particles with random properties
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4, // 4-12px
      x: Math.random() * 100, // 0-100%
      y: Math.random() * 100, // 0-100%
      opacity: Math.random() * 0.4 + 0.2, // 0.2-0.6
      duration: Math.random() * 5 + 3, // 3-8s
      delay: Math.random() * 2, // 0-2s
      color: Math.random() > 0.5 ? accentGradient.from : accentGradient.to,
    }));
  }, [particleCount, accentGradient]);

  // Render particle shape
  const renderParticleShape = (size: number, color: string) => {
    switch (particleShape) {
      case 'circle':
        return (
          <svg width={size} height={size} viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="5" fill={color} />
          </svg>
        );
      case 'square':
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: '20%',
              transform: 'rotate(45deg)',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case 'star':
        return (
          <svg width={size} height={size} viewBox="0 0 10 10">
            <path
              d="M5 0 L6.12 3.09 L9.51 3.09 L6.82 5.18 L7.94 8.27 L5 6.18 L2.06 8.27 L3.18 5.18 L0.49 3.09 L3.88 3.09 Z"
              fill={color}
            />
          </svg>
        );
      case 'wave':
        return (
          <svg width={size} height={size} viewBox="0 0 20 10">
            <path
              d="M0 5 Q5 0 10 5 T20 5"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (particleCount === 0) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {isInView &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              willChange: 'transform, opacity',
            }}
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: [0, particle.opacity, particle.opacity, 0],
              scale: [0.8, 1.2, 0.8],
              x: [0, Math.random() * 40 - 20, 0],
              y: [0, Math.random() * 40 - 20, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          >
            {renderParticleShape(particle.size, particle.color)}
          </motion.div>
        ))}
    </div>
  );
};

// ============================================================================
// SUB-COMPONENT: LIGHT BEAM
// ============================================================================

interface LightBeamProps {
  element: Extract<RadicalElementContent, { type: 'light-beam' }>;
  prefersReducedMotion: boolean;
}

const LightBeam: React.FC<LightBeamProps> = ({ element, prefersReducedMotion }) => {
  const { position, content } = element;
  const { direction, intensity, color } = content;

  // Convert direction to angle
  const angle = React.useMemo(() => {
    switch (direction) {
      case 'horizontal':
        return 90;
      case 'vertical':
        return 0;
      case 'diagonal-left':
        return 45;
      case 'diagonal-right':
        return -45;
      case 'radial':
        return 0;
      default:
        return parseInt(direction) || 0;
    }
  }, [direction]);

  // Clamp intensity to valid range [0, 1] and convert to hex alpha
  const clampedIntensity = Math.min(Math.max(intensity, 0), 1);
  const alphaHex = Math.round(clampedIntensity * 255).toString(16).padStart(2, '0');

  return (
    <motion.div
      className={`absolute ${getPositionClasses(position)} z-10`}
      style={{
        width: '200px',
        height: '600px',
        background: `linear-gradient(to bottom, transparent, ${color}${alphaHex}, transparent)`,
        filter: 'blur(40px)',
        transform: `rotate(${angle}deg)`,
        pointerEvents: 'none',
        willChange: 'opacity, transform',
      }}
      initial={{ opacity: 0 }}
      animate={
        prefersReducedMotion
          ? { opacity: intensity }
          : {
              opacity: [intensity * 0.8, intensity * 1.2, intensity * 0.8],
              scale: [1.0, 1.1, 1.0],
            }
      }
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
      }}
      aria-hidden="true"
    />
  );
};

// ============================================================================
// SUB-COMPONENT: CONNECTION PULSE
// ============================================================================

interface ConnectionPulseProps {
  element: Extract<RadicalElementContent, { type: 'connection-pulse' }>;
  prefersReducedMotion: boolean;
}

const ConnectionPulse: React.FC<ConnectionPulseProps> = ({ element, prefersReducedMotion }) => {
  const { position, content } = element;
  const { pulseSpeed, color } = content;

  // Create staggered pulses
  const pulses = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    delay: (i * pulseSpeed) / 3 / 1000, // Convert to seconds
  }));

  if (prefersReducedMotion) return null;

  return (
    <div
      className={`absolute ${getPositionClasses(position)} z-20`}
      style={{
        width: '20px',
        height: '20px',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${color}`,
            willChange: 'transform, opacity',
          }}
          initial={{
            scale: 1,
            opacity: 1,
          }}
          animate={{
            scale: [1, 4],
            opacity: [1, 0],
          }}
          transition={{
            duration: pulseSpeed / 1000,
            repeat: Infinity,
            delay: pulse.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Center dot */}
      <div
        className="absolute inset-0 m-auto w-2 h-2 rounded-full"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}80`,
        }}
      />
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function RadicalElements({
  elements,
  categoryId,
  accentGradient,
  particleShape,
}: Props) {
  const prefersReducedMotion = useReducedMotion() || false;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {elements.map((element, index) => {
        // Render based on element.type
        switch (element.type) {
          case 'floating-badge':
            return (
              <FloatingBadge
                key={`${element.type}-${index}`}
                element={element}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          case 'metric-ring':
            return (
              <MetricRing
                key={`${element.type}-${index}`}
                element={element}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          case 'particle-field':
            return (
              <ParticleField
                key={`${element.type}-${index}`}
                element={element}
                particleShape={particleShape}
                accentGradient={accentGradient}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          case 'light-beam':
            return (
              <LightBeam
                key={`${element.type}-${index}`}
                element={element}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          case 'connection-pulse':
            return (
              <ConnectionPulse
                key={`${element.type}-${index}`}
                element={element}
                prefersReducedMotion={prefersReducedMotion}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
