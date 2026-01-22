# Promo Video Session - 2026-01-21

## Handoff Summary
**Focus**: 🏗️ feature
**Task**: 15-second flash promo video for "Vibe coding won't make your product stand out" article
**Status**: 95% complete - Extended to 18 seconds for readability
**Next**: Review extended timing in Remotion Studio, test animations
**Blockers**: None

## Project Overview
```json
{
  "project": "Remotion Promo Video",
  "path": "/Users/oak/Downloads/Core/Dev/Content/Remotion/video",
  "duration": "18 seconds (540 frames @ 30fps)",
  "resolution": "1920x1080",
  "scenes": 5
}
```

## Key Files Modified
```json
{
  "config": "src/Promo/config.ts",
  "root": "src/Root.tsx",
  "scenes": {
    "TrapScene": "src/Promo/scenes/TrapScene.tsx",
    "SlopStats": "src/Promo/scenes/SlopStats.tsx",
    "HierarchyScene": "src/Promo/scenes/HierarchyScene.tsx",
    "MultiplierScene": "src/Promo/scenes/MultiplierScene.tsx",
    "CTAScene": "src/Promo/scenes/CTAScene.tsx"
  },
  "components": {
    "NeonText": "src/Promo/components/NeonText.tsx",
    "GlitchText": "src/Promo/components/GlitchText.tsx"
  },
  "styles": {
    "colors": "src/Promo/styles/colors.ts",
    "fonts": "src/Promo/styles/fonts.ts"
  }
}
```

## Scene Configuration (Final)
```json
{
  "scenes": {
    "trap": {"start": 0, "duration": 105, "seconds": "0-3.5s"},
    "stats": {"start": 105, "duration": 105, "seconds": "3.5-7s"},
    "hierarchy": {"start": 210, "duration": 120, "seconds": "7-11s"},
    "multiplier": {"start": 330, "duration": 105, "seconds": "11-14.5s"},
    "cta": {"start": 435, "duration": 105, "seconds": "14.5-18s"}
  },
  "total_duration": 540,
  "fps": 30
}
```

## Failures & Learnings (DO NOT REPEAT)

### ❌ Candlestick Charts Attempt
- **What**: User wanted "chart sticks like crypto trading" instead of glowing dots
- **Issue**: Multiple iterations were rejected as "too ugly"
- **Resolution**: REMOVED completely, enhanced podium with RisingSparks, OrbitingDots, CrownEmoji instead
- **Learning**: When user rejects multiple iterations of same concept, pivot to different approach

### ❌ Scattered Emojis Approach
- **What**: Added floating emojis scattered around edges of scenes
- **Issue**: User said "no i dont like it"
- **Resolution**: Created CentralEmoji component for impactful middle animations
- **Learning**: "Emoji magic" means central, impactful animations - NOT scattered decorations

### ❌ Poop Emoji on AI SLOP Badge
- **What**: Added poop emoji in corner of WordBadge
- **Issue**: User explicitly said "remove that poop emoji"
- **Resolution**: Removed immediately
- **Learning**: Keep badges clean, don't add extra elements to important text

### ❌ Dollar Signs Distribution
- **What**: Modified dollar sign placement
- **Issue**: User said "current one is ugly"
- **Resolution**: Reverted to 12 scattered with varied sizes (50-90px)
- **Learning**: Original distribution was good - don't over-modify working designs

## Successful Strategies

### ✅ Price Counter Animation
```typescript
const priceProgress = interpolate(frame, [0, 85], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
const currentPrice = Math.round(20 + priceProgress * 1980);
```

### ✅ CentralEmoji Component Pattern
- Entry spring with scale bounce + rotation
- Continuous wobble + pulse after landing
- Drop shadow for glow effect
- Used in TrapScene with 💩 emoji

### ✅ CrownEmoji Drop Animation (HierarchyScene)
- Drops from above (-150px) onto gold podium
- Scale bounce: 0.3 → 1.3 → 1
- Continuous floating (8px) + wobble (5deg)
- Gold glow drop shadow

### ✅ Enhanced WordBadge (AI SLOP)
- Padding: 70px 140px
- "Word of 2025": 42px
- "AI SLOP": 140px, weight 900
- Strong glow pulse with 3-layer box-shadow

## Animation Patterns Library

### Continuous Dopamine
```typescript
const breathe = 1 + Math.sin(frame * 0.08) * 0.03;
const glowPulse = 1 + Math.sin(frame * 0.12) * 0.4;
const floatY = Math.sin(frame * 0.08) * 8;
const wobble = Math.sin(frame * 0.12) * 5;
const scalePulse = 1 + Math.sin(frame * 0.1) * 0.02;
```

### Entry Springs
```typescript
const SPRINGS = {
  slam: { damping: 12, stiffness: 300 },
  bounce: { damping: 8, stiffness: 150 },
  text: { damping: 15, stiffness: 200 },
  smooth: { damping: 200 },
};
```

## Current Scene States

| Scene | Duration | Key Elements |
|-------|----------|--------------|
| TrapScene | 105f (3.5s) | 12 dollar signs, $20→$2000 counter, 💩 emoji |
| SlopStats | 105f (3.5s) | 82%, 2.3x stats, "AI SLOP" badge |
| HierarchyScene | 120f (4s) | 3 podiums, 👑 crown, sparks, orbits |
| MultiplierScene | 105f (3.5s) | SPEED×QUALITY×VOLUME=🚀 |
| CTAScene | 105f (3.5s) | "multiply your edge", floating emojis |

## Commands
```bash
cd /Users/oak/Downloads/Core/Dev/Content/Remotion/video
npm start  # Preview in Remotion Studio
npx remotion render PromoVideo  # Final render
```
