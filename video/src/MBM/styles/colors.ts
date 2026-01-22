// MBM Color Palette
export const COLORS = {
  // Primary matcha greens
  darkGreen: '#2E4B3A',
  lightGreen: '#7FAE76',

  // Background tones
  cream: '#F6F2E9',
  softMatcha: '#DDEDD5',

  // Accents
  dark: '#141414',
  gold: '#CBBF93',

  // Semantic aliases
  text: {
    primary: '#141414',
    secondary: '#2E4B3A',
    light: '#F6F2E9',
  },

  // Glow variants (for box-shadow effects)
  glow: {
    green: 'rgba(127, 174, 118, 0.6)',
    gold: 'rgba(203, 191, 147, 0.5)',
    cream: 'rgba(246, 242, 233, 0.4)',
    dark: 'rgba(20, 20, 20, 0.3)',
  },

  // Flash/Overlay
  flash: 'rgba(255, 255, 255, 0.9)',
  ripple: 'rgba(255, 255, 255, 0.7)',

  // Glitch RGB (for Slopidemic scene)
  glitch: {
    red: 'rgba(255, 0, 0, 0.3)',
    cyan: 'rgba(0, 255, 255, 0.3)',
  },
} as const;

// Gradient presets (CSS values)
export const GRADIENTS = {
  matcha: `linear-gradient(135deg, ${COLORS.darkGreen} 0%, ${COLORS.lightGreen} 100%)`,
  cream: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.softMatcha} 100%)`,
  darkFade: `linear-gradient(180deg, ${COLORS.dark} 0%, rgba(20,20,20,0.8) 100%)`,
} as const;
