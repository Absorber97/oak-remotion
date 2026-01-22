// Promo Video Configuration - 18 second flash promo
export const PROMO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 540, // 18 seconds
} as const;

// Scene timings (frames)
export const SCENES = {
  trap: { start: 0, duration: 105 },        // 0-3.5s
  stats: { start: 105, duration: 105 },     // 3.5-7s
  hierarchy: { start: 210, duration: 120 }, // 7-11s
  multiplier: { start: 330, duration: 100 }, // 11-14.3s (text + images 0.5s)
  cta: { start: 430, duration: 110 },       // 14.3-18s (two phases with slide transition)
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
