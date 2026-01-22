import { loadFont } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadManrope } from '@remotion/google-fonts/Manrope';

// Load serif font for headlines
const { fontFamily: serifFont } = loadFont('normal', {
  weights: ['400', '600', '700'],
  subsets: ['latin'],
});

// Load sans font for body text
const { fontFamily: sansFont } = loadManrope('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const FONTS = {
  serif: serifFont, // Cormorant Garamond
  sans: sansFont,   // Manrope
} as const;

// Reusable text styles
export const TEXT_STYLES = {
  headline: {
    fontFamily: FONTS.serif,
    fontSize: 72,
    fontWeight: 600,
    lineHeight: 1.1,
  },
  subheadline: {
    fontFamily: FONTS.serif,
    fontSize: 48,
    fontWeight: 400,
    lineHeight: 1.2,
  },
  body: {
    fontFamily: FONTS.sans,
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.4,
  },
  stat: {
    fontFamily: FONTS.serif,
    fontSize: 96,
    fontWeight: 700,
    lineHeight: 1.0,
  },
  label: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },
} as const;
