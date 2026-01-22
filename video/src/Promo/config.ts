// Promo Video Configuration - 17 second flash promo
export const PROMO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 515, // ~17 seconds
} as const;

// Scene timings (frames)
export const SCENES = {
  trap: { start: 0, duration: 105 },        // 0-3.5s
  stats: { start: 105, duration: 105 },     // 3.5-7s
  hierarchy: { start: 210, duration: 80 },  // 7-9.67s
  multiplier: { start: 290, duration: 115 }, // 9.67-13.5s (more time for text)
  cta: { start: 405, duration: 110 },       // 13.5-17.17s (two phases with slide transition)
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
