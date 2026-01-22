# Remotion Promo Video - Micro-Animation Polish Session

## Session Metadata
```json
{
  "date": "2026-01-21",
  "project": "Remotion Promo Video",
  "focus": "🏗️ feature",
  "status": "completed",
  "duration": "~2 hours"
}
```

## Task Summary
Comprehensive micro-animation polish across all 5 scenes of a 17-second promo video to ensure continuous visual engagement every second.

## Completed Work

### Scene 1: TrapScene.tsx
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/scenes/TrapScene.tsx`

**Changes Made**:
- Chain pendulum swing enhanced with `skewY(${Math.sin(frame * 0.1 + i) * 3}deg)` for organic 3D motion
- Price tag breathing: `scale(${priceScale * (1 + Math.sin(frame * 0.1) * 0.02)})`
- Border glow sync: `border: 4px solid rgba(0, 255, 136, ${0.7 + Math.sin(frame * 0.15) * 0.3})`
- Thought bubble enhanced post-entry float with `bubbleBreathe = 1 + Math.sin(frame * 0.08) * 0.02`
- Vignette pulse: `opacity: 0.85 + Math.sin(frame * 0.06) * 0.1`

### Scene 2: SlopStats.tsx
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/scenes/SlopStats.tsx`

**Changes Made**:
- Added `Easing` import from remotion
- Counter easing with `Easing.out(Easing.cubic)` for natural deceleration
- Entry opacity fix: changed `[0, 0.3]` to `[0, 0.6]` for faster fade-in
- Stat breathing during hold: `breathe = 1 + Math.sin(frame * 0.08) * 0.015` (when entrySpring > 0.9 && exitProgress < 0.1)
- Suffix scale animation: `fontSize: 140 * (0.85 + countProgress * 0.15)`
- Vignette pulse added

### Scene 3: HierarchyScene.tsx
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/scenes/HierarchyScene.tsx`

**Changes Made**:
- Unified glow frequency to `frame * 0.08` base across all elements
- Crown scale overshoot reduced from 1.3 to 1.15: `[0.3, 1.15, 1]`
- Removed conflicting crown pulse, synced wobble to 0.08 frequency
- Staggered spring configs by rank:
  - Gold: `{ damping: 10, stiffness: 200 }` (snappy, authoritative)
  - Silver: `{ damping: 8, stiffness: 150 }` (balanced)
  - Bronze: `{ damping: 12, stiffness: 130 }` (slower, anticipatory)
- Shine sweep with ease-in-out: `Math.sin((shineCycle / 120) * Math.PI - Math.PI / 2) * 0.5 + 0.5`
- Shadow breathing: `shadowShift = Math.sin(frame * 0.08) * 3`
- Label smooth fade using interpolate `[0.3, 0.7]` instead of threshold `> 0.7`

### Scene 4: MultiplierScene.tsx
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/scenes/MultiplierScene.tsx`

**Changes Made**:
- Spark glow synced to scene breathing: `glowPulse = 1 + Math.sin(frame * 0.06 + delay) * 0.3`
- Sparkle frequency synced: `frame * 0.06` (was 0.2)
- Word glow synced to 0.12 base: `glowIntensity = 1 + Math.sin(frame * 0.12 + delay * 0.5) * 0.4`
- Subtitle shimmer with dual-layer glow:
  ```css
  textShadow: `
    0 0 ${20 + Math.sin(frame * 0.12) * 10}px ${COLORS.glow.green},
    0 0 ${40 + Math.sin(frame * 0.12 + 0.5) * 15}px ${COLORS.glow.green}
  `
  ```

### Scene 5: CTAScene.tsx
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/scenes/CTAScene.tsx`

**Changes Made**:
- Lightning particles intensified during phase transition (frames 40-65):
  - Added `transitionIntensity` prop
  - `lightningIntensity = interpolate(frame, [40, 52, 65], [0, 1, 0])`
  - Size, opacity, flicker speed all scale with intensity
- URL shimmer sweep: `shimmerPos = ((frame * 2) % 200) - 50`
- Video glow boosted:
  - Backdrop: inset -30 (was -20), opacity `glowPulse * 0.8` (was 0.6)
  - Box shadow: added third layer `0 0 ${80 * glowPulse}px ${COLORS.primary}30`
- Text stagger:
  - Subtitle: frames 55-65 fade in
  - URL: frames 60-70 fade in (5 frame delay)
- Vignette pulse: `opacity: 0.85 + Math.sin(frame * 0.06) * 0.1`

## Configuration State
**File**: `/Users/oak/Downloads/Core/Dev/Content/Remotion/video/src/Promo/config.ts`

```typescript
export const SCENES = {
  trap: { start: 0, duration: 105 },        // 0-3.5s
  stats: { start: 105, duration: 105 },     // 3.5-7s
  hierarchy: { start: 210, duration: 80 },  // 7-9.67s (reduced from 120)
  multiplier: { start: 290, duration: 115 }, // 9.67-13.5s (extended for readability)
  cta: { start: 405, duration: 110 },       // 13.5-17.17s
};
durationInFrames: 515 // ~17 seconds
```

## Animation Patterns Reference
```typescript
// Breathing (continuous subtle scale)
const breathe = 1 + Math.sin(frame * 0.08) * 0.03;

// Glow pulse (unified frequency)
const glowPulse = 1 + Math.sin(frame * 0.12) * 0.4;

// Smooth spring (no bounce)
{ damping: 200 }

// Snappy spring
{ damping: 20, stiffness: 200 }

// Counter easing
easing: Easing.out(Easing.cubic)

// Float motion
const float = Math.sin(frame * 0.06) * 8;

// Wobble
const wobble = Math.sin(frame * 0.1) * 3;

// Shine sweep with ease-in-out
const shineCycle = (frame + delay * 10) % 120;
const shineEased = Math.sin((shineCycle / 120) * Math.PI - Math.PI / 2) * 0.5 + 0.5;
```

## Key Learnings

### Frequency Unification
- **Problem**: Different glow frequencies (0.1, 0.12, 0.15, 0.2) created visual chaos
- **Solution**: Unified to `0.08` base for breathing, `0.12` for glows, creates cohesive rhythm

### Spring Config Hierarchy
- **Problem**: All blocks had same spring config, felt uniform
- **Solution**: Vary by importance - Gold snappier (stiffness: 200), Bronze slower (damping: 12)

### Entry Animation Timing
- **Problem**: Entry opacity `[0, 0.3]` was too slow, elements felt sluggish
- **Solution**: Changed to `[0, 0.6]` for faster initial reveal while maintaining smoothness

### Continuous Motion Anti-Patterns
- **Avoid**: Static moments where nothing moves
- **Avoid**: Conflicting animations (e.g., crown had both scale pulse AND float)
- **Avoid**: Inconsistent frequencies across scene elements

### Shimmer/Shine Effects
- **Pattern**: Use ease-in-out via `Math.sin(progress * Math.PI)` for natural sweep
- **Pattern**: Skew + gradient for directional shine on text

## Project Structure
```
/Users/oak/Downloads/Core/Dev/Content/Remotion/video/
├── src/Promo/
│   ├── config.ts           # Scene timing configuration
│   ├── scenes/
│   │   ├── TrapScene.tsx      # Scene 1 - Price trap
│   │   ├── SlopStats.tsx      # Scene 2 - Statistics carousel
│   │   ├── HierarchyScene.tsx # Scene 3 - Podium blocks
│   │   ├── MultiplierScene.tsx # Scene 4 - Equation + showcase
│   │   └── CTAScene.tsx       # Scene 5 - CTA with video
│   ├── styles/
│   │   ├── colors.ts          # COLORS, GRADIENTS constants
│   │   └── fonts.ts           # FONTS constants
│   └── components/
│       ├── NeonText.tsx       # Animated neon text
│       └── GlitchText.tsx     # Glitch effect text
└── public/promo-assets/       # Static assets (images, video)
```

## Next Steps (if continuing)
1. Run `npm start` in video directory to preview
2. Scrub each scene slowly - verify continuous motion
3. Check glow pulses feel unified, not chaotic
4. Full render: `npx remotion render PromoVideo`
5. Consider audio sync if adding music/sfx

## Handoff
**Focus**: 🏗️ feature (micro-animation polish)
**Task**: Comprehensive animation enhancement across all 5 scenes
**Status**: 100% complete - all 5 scenes polished
**Next**: Preview render and final adjustments if needed
**Blockers**: None
