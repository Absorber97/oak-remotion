// Promo Video Configuration - 18 second flash promo (extended for readability)
export const PROMO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 540, // 18 seconds (extended for reading time)
} as const;

// Scene timings (frames) - extended durations for readability
export const SCENES = {
  trap: { start: 0, duration: 105 },        // 0-3.5s (+1s reading time)
  stats: { start: 105, duration: 105 },     // 3.5-7s (+1s for AI SLOP badge)
  hierarchy: { start: 210, duration: 120 }, // 7-11s (+0.5s)
  multiplier: { start: 330, duration: 105 }, // 11-14.5s
  cta: { start: 435, duration: 105 },       // 14.5-18s (+0.5s for CTA)
} as const;

// Transition durations
export const TRANSITIONS = {
  flash: 8,
  wipe: 10,
  slide: 10,
  fade: 10,
} as const;

// Spring configs for punchy animations
export const SPRINGS = {
  slam: { damping: 12, stiffness: 300 },    // Hard impact
  glow: { damping: 20, stiffness: 100 },    // Pulsing
  text: { damping: 15, stiffness: 200 },    // Quick text
  bounce: { damping: 8, stiffness: 150 },   // Bouncy entrance
  smooth: { damping: 200 },                  // No bounce
} as const;

// Premount duration
export const PREMOUNT_FRAMES = 20;
