import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SPRINGS } from '../config';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';

interface GlitchTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  glitchIntensity?: number;
  glitchFrequency?: number;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  delay = 0,
  fontSize = 80,
  fontWeight = 800,
  glitchIntensity = 1,
  glitchFrequency = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.slam,
  });

  const scale = interpolate(entryProgress, [0, 1], [1.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entryProgress, [0, 0.2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glitch effect - pseudo-random based on frame
  const glitchActive = Math.sin(frame * glitchFrequency) > 0.6;
  const glitchOffset = glitchActive ? (Math.sin(frame * 3.7) * 8 * glitchIntensity) : 0;
  const glitchSkew = glitchActive ? (Math.cos(frame * 2.3) * 3 * glitchIntensity) : 0;

  // RGB split effect
  const rgbOffset = glitchActive ? 4 * glitchIntensity : 0;

  return (
    <div
      style={{
        position: 'relative',
        transform: `scale(${scale}) skewX(${glitchSkew}deg)`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {/* Cyan layer (left offset) */}
      <div
        style={{
          position: 'absolute',
          left: -rgbOffset,
          top: 0,
          fontFamily: FONTS.sans,
          fontSize,
          fontWeight,
          color: 'cyan',
          mixBlendMode: 'screen',
          opacity: glitchActive ? 0.7 : 0,
          transform: `translateX(${glitchOffset}px)`,
        }}
      >
        {text}
      </div>

      {/* Red layer (right offset) */}
      <div
        style={{
          position: 'absolute',
          left: rgbOffset,
          top: 0,
          fontFamily: FONTS.sans,
          fontSize,
          fontWeight,
          color: COLORS.accent,
          mixBlendMode: 'screen',
          opacity: glitchActive ? 0.7 : 0,
          transform: `translateX(${-glitchOffset}px)`,
        }}
      >
        {text}
      </div>

      {/* Main text */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize,
          fontWeight,
          color: COLORS.text,
          textShadow: `
            0 0 10px ${COLORS.accent},
            0 0 20px ${COLORS.accent}
          `,
          position: 'relative',
        }}
      >
        {text}
      </div>

      {/* Scan line overlay */}
      {glitchActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};

// Variant: Corrupted text that reveals properly
export const CorruptedReveal: React.FC<{
  text: string;
  delay?: number;
  revealDuration?: number;
  fontSize?: number;
  color?: string;
}> = ({
  text,
  delay = 0,
  revealDuration = 20,
  fontSize = 80,
  color = COLORS.text,
}) => {
  const frame = useCurrentFrame();

  // Characters to use for corruption
  const corruptChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  // Progress through reveal
  const progress = interpolate(
    frame,
    [delay, delay + revealDuration],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // How many characters are revealed
  const revealedCount = Math.floor(progress * text.length);

  // Build displayed string
  const displayText = text
    .split('')
    .map((char, i) => {
      if (i < revealedCount) {
        return char;
      } else if (char === ' ') {
        return ' ';
      } else {
        // Pseudo-random corrupt character
        const idx = (frame + i * 7) % corruptChars.length;
        return corruptChars[idx];
      }
    })
    .join('');

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize,
        fontWeight: 700,
        color,
        letterSpacing: '0.05em',
      }}
    >
      {displayText}
    </div>
  );
};
