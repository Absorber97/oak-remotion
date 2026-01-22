import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  SpringConfig,
} from 'remotion';
import { SPRINGS } from '../config';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';

interface NeonTextProps {
  text: string;
  color?: string;
  glowColor?: string;
  fontSize?: number;
  fontWeight?: number;
  delay?: number;
  springConfig?: SpringConfig;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  distance?: number;
  glowIntensity?: number;
  pulseGlow?: boolean;
}

export const NeonText: React.FC<NeonTextProps> = ({
  text,
  color = COLORS.primary,
  glowColor,
  fontSize = 80,
  fontWeight = 800,
  delay = 0,
  springConfig = SPRINGS.text,
  direction = 'up',
  distance = 60,
  glowIntensity = 1,
  pulseGlow = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = glowColor || color;

  // Spring animation for entry
  const progress = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  // Calculate transform based on direction
  const getTransform = () => {
    const offset = interpolate(progress, [0, 1], [distance, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const scale = interpolate(progress, [0, 1], [0.8, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      case 'scale':
        return `scale(${scale})`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  // Opacity animation
  const opacity = interpolate(progress, [0, 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow pulse effect
  const glowMultiplier = pulseGlow
    ? 1 + Math.sin(frame * 0.15) * 0.3
    : 1;

  // Multi-layer glow for neon effect
  const textShadow = [
    `0 0 ${10 * glowIntensity * glowMultiplier}px ${glow}`,
    `0 0 ${20 * glowIntensity * glowMultiplier}px ${glow}`,
    `0 0 ${40 * glowIntensity * glowMultiplier}px ${glow}`,
    `0 0 ${80 * glowIntensity * glowMultiplier}px ${glow}`,
  ].join(', ');

  return (
    <div
      style={{
        fontFamily: FONTS.sans,
        fontSize,
        fontWeight,
        color,
        textShadow,
        transform: getTransform(),
        opacity,
        willChange: 'transform, opacity',
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </div>
  );
};

// Variant: Flickering neon (like a failing neon sign)
export const FlickerNeonText: React.FC<NeonTextProps & { flickerSpeed?: number }> = ({
  flickerSpeed = 0.3,
  ...props
}) => {
  const frame = useCurrentFrame();

  // Create pseudo-random flicker
  const flicker = Math.sin(frame * flickerSpeed) > 0.7 ? 0.4 : 1;

  return (
    <div style={{ opacity: flicker }}>
      <NeonText {...props} />
    </div>
  );
};
