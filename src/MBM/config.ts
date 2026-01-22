// Video configuration
export const VIDEO_CONFIG = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 900,
} as const;

// Scene frame ranges (start frame, duration)
// Note: Using TransitionSeries with overlapping transitions
export const SCENES = {
  hook: { start: 0, duration: 90 },
  trap: { start: 90, duration: 120 },
  slopidemic: { start: 210, duration: 90 },
  stats: { start: 300, duration: 150 },
  hierarchy: { start: 450, duration: 90 },
  mbmIntro: { start: 540, duration: 90 },
  beforeAfter: { start: 630, duration: 90 },
  process: { start: 720, duration: 90 },
  result: { start: 810, duration: 90 },
} as const;

// Transition durations (frames)
export const TRANSITIONS = {
  fade: 15,
  slide: 12,
  wipe: 15,
  flash: 10,
  fadeFlash: 10,
} as const;

// Spring configurations for consistent motion language
// Partial configs - Remotion's spring() applies sensible defaults
export const SPRING_CONFIGS = {
  // No bounce, elegant reveals
  smooth: { damping: 200 },

  // Quick, minimal bounce for UI elements
  snappy: { damping: 20, stiffness: 200 },

  // Playful, used in "slop" section
  bouncy: { damping: 8 },

  // Slow, impactful for hierarchy blocks
  heavy: { damping: 15, stiffness: 80, mass: 2 },

  // Text reveals with slight overshoot
  text: { damping: 100, stiffness: 180 },

  // Ripple effect (easeOutBack equivalent)
  ripple: { damping: 15, stiffness: 200, mass: 0.8 },

  // Gentle for slow reveals
  gentle: { damping: 12, stiffness: 80, mass: 1.2 },

  // Default balanced
  default: { damping: 10, stiffness: 100, mass: 1 },
} as const;

// Premount duration for all sequences
export const PREMOUNT_FRAMES = 30;

// Asset paths
export const ASSETS = {
  darkSouls: 'mbm/dark-souls.jpeg',
  matchaCollage: 'mbm/matcha-collage.jpeg',
  matchaBrochure: 'mbm/matcha-brochure.jpeg',
  buzzShelf: 'mbm/buzz-shelf.jpeg',
  appScreens: 'mbm/app-screens.jpeg',
  beforeAfter: 'mbm/before-after.jpeg',
  rollSafe: 'mbm/roll-safe.jpeg',
  reactUi: 'mbm/react-ui.jpeg',
  generic3d: 'mbm/generic-3d.jpeg',
} as const;
