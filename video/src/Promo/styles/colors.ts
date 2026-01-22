// Neon Cyberpunk Color Palette for Promo Video
export const COLORS = {
  // Core palette
  background: '#0A0A0F',
  primary: '#00FF88',      // Neon green - "stand out"
  accent: '#FF3366',       // Hot pink - danger/slop
  gold: '#FFD700',         // Excellence/premium
  text: '#FFFFFF',
  muted: '#666680',

  // Semantic colors
  danger: '#FF3366',
  success: '#00FF88',
  warning: '#FFD700',

  // Glow variants for box-shadows
  glow: {
    green: 'rgba(0, 255, 136, 0.6)',
    pink: 'rgba(255, 51, 102, 0.6)',
    gold: 'rgba(255, 215, 0, 0.5)',
    white: 'rgba(255, 255, 255, 0.4)',
  },

  // Gradient stops
  gradient: {
    darkStart: '#0A0A0F',
    darkEnd: '#1A1A2E',
  },
} as const;

// Gradient presets
export const GRADIENTS = {
  dark: `linear-gradient(180deg, ${COLORS.background} 0%, #1A1A2E 100%)`,
  radialGlow: `radial-gradient(600px 400px at 50% 40%, rgba(0, 255, 136, 0.15), transparent)`,
  pinkGlow: `radial-gradient(400px 300px at 50% 50%, rgba(255, 51, 102, 0.2), transparent)`,
  vignette: `radial-gradient(80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)`,
} as const;
