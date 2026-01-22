# Remotion Micro-Animation Patterns

## Overview
Reusable animation patterns for continuous viewer engagement in Remotion videos.

## Core Frequencies (Unified System)
```typescript
// Base frequencies for cohesive rhythm
const FREQUENCIES = {
  breathing: 0.08,    // Subtle scale pulse (slowest)
  floating: 0.06,     // Y-axis movement
  glowPulse: 0.12,    // Glow intensity (medium)
  wobble: 0.1,        // Rotation oscillation
  flicker: 0.4,       // Fast sparkle effects
};
```

## Pattern 1: Breathing Scale
```typescript
// Continuous subtle scale for "alive" feel
const breathe = 1 + Math.sin(frame * 0.08) * 0.03;
// Apply: transform: `scale(${breathe})`
// Use on: containers, backgrounds, large elements
```

## Pattern 2: Glow Pulse
```typescript
// Pulsing glow intensity
const glowPulse = 1 + Math.sin(frame * 0.12) * 0.4;
// Apply: textShadow or boxShadow with `${30 * glowPulse}px`
// Use on: CTAs, highlighted text, borders
```

## Pattern 3: Float Motion
```typescript
// Gentle floating animation
const floatY = Math.sin(frame * 0.06) * 8;
const floatX = Math.cos(frame * 0.05) * 4;
// Apply: transform: `translate(${floatX}px, ${floatY}px)`
// Use on: floating elements, emojis, particles
```

## Pattern 4: Shine Sweep
```typescript
// Ease-in-out shine across element
const shineCycle = (frame + delay * 10) % 120;
const shineEased = Math.sin((shineCycle / 120) * Math.PI - Math.PI / 2) * 0.5 + 0.5;
const shinePos = shineEased;

// Apply as overlay div with skewed gradient
```

## Pattern 5: Staggered Springs
```typescript
// Vary spring configs by visual importance
const springConfigs = {
  primary: { damping: 10, stiffness: 200 },   // Snappy
  secondary: { damping: 8, stiffness: 150 },  // Balanced
  tertiary: { damping: 12, stiffness: 130 },  // Slower
  smooth: { damping: 200 },                    // No bounce
};
```

## Pattern 6: Counter Easing
```typescript
import { Easing, interpolate } from 'remotion';
easing: Easing.out(Easing.cubic) // Natural deceleration
```

## Pattern 7: Transition Intensity
```typescript
// Intensify effects during scene transitions
const transitionIntensity = interpolate(frame, [40, 52, 65], [0, 1, 0], {...});
// Apply to particle size, flicker speed, opacity
```

## Anti-Patterns to Avoid
1. Static moments - Always have something breathing/floating
2. Conflicting frequencies - Unify glow frequencies within scene
3. Over-animation - Remove conflicting animations on same element
4. Uniform springs - Vary by importance for visual hierarchy
5. Hard thresholds - Use interpolate instead of conditions
