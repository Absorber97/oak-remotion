import { loadFont as loadManrope } from '@remotion/google-fonts/Manrope';
import { loadFont as loadSpaceMono } from '@remotion/google-fonts/SpaceMono';

// Load bold sans font for impact
const { fontFamily: sansFont } = loadManrope('normal', {
  weights: ['400', '600', '700', '800'],
  subsets: ['latin'],
});

// Load mono font for stats/numbers
const { fontFamily: monoFont } = loadSpaceMono('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const FONTS = {
  sans: sansFont,   // Manrope - bold headlines
  mono: monoFont,   // Space Mono - stats/numbers
} as const;

// Text style presets
export const TEXT_STYLES = {
  headline: {
    fontFamily: FONTS.sans,
    fontSize: 80,
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.02em',
  },
  subheadline: {
    fontFamily: FONTS.sans,
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  stat: {
    fontFamily: FONTS.mono,
    fontSize: 120,
    fontWeight: 700,
    lineHeight: 1.0,
  },
  label: {
    fontFamily: FONTS.sans,
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: 28,
    fontWeight: 500,
    lineHeight: 1.4,
  },
} as const;
