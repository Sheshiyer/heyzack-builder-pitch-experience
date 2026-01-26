import React, { lazy, Suspense } from 'react';
import type { InteractiveElementConfig } from '../categoryEnhancements';
import type { Language } from '../types';

// ============================================================================
// LAZY LOADED COMPONENTS - Code splitting for performance
// ============================================================================

const TemperatureDial = lazy(() => import('../components/interactive/TemperatureDial'));
const LiveAccessLog = lazy(() => import('../components/interactive/LiveAccessLog'));
const ZoneToggleGrid = lazy(() => import('../components/interactive/ZoneToggleGrid'));
const EnergyFlowMeter = lazy(() => import('../components/interactive/EnergyFlowMeter'));
const AudioWaveform = lazy(() => import('../components/interactive/AudioWaveform'));
const AnimatedCounter = lazy(() => import('../components/interactive/AnimatedCounter'));
const CircularGauge = lazy(() => import('../components/interactive/CircularGauge'));
const LockSequenceAnimation = lazy(() => import('../components/interactive/LockSequenceAnimation'));
const SensorPulseMap = lazy(() => import('../components/interactive/SensorPulseMap'));

// ============================================================================
// LOADING SKELETON
// ============================================================================

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center w-full h-64 bg-gray-800/20 rounded-lg animate-pulse">
    <div className="text-gray-400">Loading...</div>
  </div>
);

// ============================================================================
// INTERACTIVE ELEMENT RENDERER
// ============================================================================

/**
 * Factory function that renders the correct interactive element based on type
 * Uses lazy loading for optimal bundle size and performance
 *
 * @param interactiveElement - The interactive element configuration
 * @param language - The language for localized content (default: 'en')
 * @returns React component corresponding to the interactive element type
 */
export function renderInteractiveElement(
  interactiveElement: InteractiveElementConfig,
  language: Language = 'en'
): React.ReactNode {
  // Switch based on discriminated union type
  const element = (() => {
    switch (interactiveElement.type) {
      case 'dial':
        return <TemperatureDial config={interactiveElement.config} language={language} />;

      case 'counter':
        return <AnimatedCounter config={interactiveElement.config} language={language} />;

      case 'gauge':
        return <CircularGauge config={interactiveElement.config} language={language} />;

      case 'access-log':
        return <LiveAccessLog config={interactiveElement.config} language={language} />;

      case 'flow-meter':
        return <EnergyFlowMeter config={interactiveElement.config} language={language} />;

      case 'toggle-grid':
        return <ZoneToggleGrid config={interactiveElement.config} language={language} />;

      case 'audio-wave':
        return <AudioWaveform config={interactiveElement.config} language={language} />;

      case 'lock-sequence':
        return <LockSequenceAnimation config={interactiveElement.config} language={language} />;

      case 'sensor-pulse':
        return <SensorPulseMap config={interactiveElement.config} language={language} />;

      default:
        // TypeScript exhaustiveness check - should never reach here
        const _exhaustive: never = interactiveElement;
        return null;
    }
  })();

  // Wrap with Suspense for lazy loading support
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      {element}
    </Suspense>
  );
}
