# Interactive Element Components

This directory contains 9 interactive element components used in the HeyZack category enhancement system.

## Components

### 1. TemperatureDial.tsx
**Used by:** `climatisation` category
**Props:** `DialConfig`
**Features:** SVG-based circular temperature dial with gradient arc, animated value counting, and zone status display.

### 2. LiveAccessLog.tsx
**Used by:** `camera-doorbell` category
**Props:** `AccessLogConfig`
**Features:** Scrolling list of access events with icons, timestamps, and staggered animations.

### 3. ZoneToggleGrid.tsx
**Used by:** `lighting`, `control-panel`, `switch` categories
**Props:** `ToggleGridConfig`
**Features:** 2x2 grid of interactive zone cards with state toggles, brightness indicators, and glow effects.

### 4. EnergyFlowMeter.tsx
**Used by:** `circuit-breaker` category
**Props:** `FlowMeterConfig`
**Features:** Real-time energy flow visualization with animated particles, efficiency badge, and threshold markers.

### 5. AudioWaveform.tsx
**Used by:** `music-control` category
**Props:** `AudioWaveConfig`
**Features:** Animated frequency bars with gradient, now playing info, and continuous audio simulation.

### 6. AnimatedCounter.tsx
**Used by:** `gateway`, `accessories` categories
**Props:** `CounterConfig`
**Features:** Large animated counter with count-up animation, customizable prefix/suffix, and glow effect.

### 7. CircularGauge.tsx
**Used by:** `diy-breaker`, `curtain-shutter`, `pet-accessories` categories
**Props:** `GaugeConfig`
**Features:** Semi-circular gauge (180°) with animated needle, threshold zones, and value markers.

### 8. LockSequenceAnimation.tsx
**Used by:** `door-lock` category
**Props:** `LockSequenceConfig`
**Features:** Multi-step unlock sequence with animated progression, status circles, and encrypted badge.

### 9. SensorPulseMap.tsx
**Used by:** `sensors` category
**Props:** `SensorPulseConfig`
**Features:** Visual sensor map with pulsing active zones, connection lines, and hover tooltips.

## Common Features

All components include:
- ✅ TypeScript with proper config types from `categoryEnhancements.tsx`
- ✅ Framer Motion animations
- ✅ Reduced motion support via `useReducedMotion()`
- ✅ ARIA labels and accessibility
- ✅ Dark theme compatible
- ✅ Responsive design
- ✅ Bilingual support (EN/FR)

## Usage

```tsx
import { TemperatureDial } from '@/components/interactive';
import { CATEGORY_ENHANCEMENTS } from '@/categoryEnhancements';

const enhancement = CATEGORY_ENHANCEMENTS['climatisation'];
const config = enhancement.interactiveElement.config; // Type-safe DialConfig

<TemperatureDial config={config} language="en" />
```

## Animation Performance

All components target 60fps performance with:
- Hardware-accelerated transforms
- Optimized re-renders
- Conditional animation based on `prefersReducedMotion`
- Efficient SVG rendering
