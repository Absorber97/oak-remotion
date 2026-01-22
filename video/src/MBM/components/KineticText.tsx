import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  SpringConfig,
} from 'remotion';
import { SPRING_CONFIGS } from '../config';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';

interface KineticTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  useSerif?: boolean;
  springConfig?: SpringConfig;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  fontSize = 72,
  fontWeight = 600,
  color = COLORS.text.primary,
  useSerif = true,
  springConfig = SPRING_CONFIGS.text,
  direction = 'up',
  distance = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  // Opacity animation
  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily: useSerif ? FONTS.serif : FONTS.sans,
        fontSize,
        fontWeight,
        color,
        transform: getTransform(),
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      {text}
    </div>
  );
};
