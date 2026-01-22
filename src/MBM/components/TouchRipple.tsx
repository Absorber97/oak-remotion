import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SPRING_CONFIGS } from '../config';
import { COLORS } from '../styles/colors';

interface TouchRippleProps {
  delay: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}

/**
 * Expanding white ring effect that simulates a touch/tap interaction
 * Used on stat cards, buttons, and interactive elements
 */
export const TouchRipple: React.FC<TouchRippleProps> = ({
  delay,
  x = 0,
  y = 0,
  size = 100,
  color = COLORS.ripple,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation with easeOutBack feel
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.ripple,
  });

  // Scale from 0 to 2 (expands beyond original size)
  const scale = interpolate(progress, [0, 1], [0, 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out as it expands
  const opacity = interpolate(progress, [0, 0.5, 1], [0.7, 0.3, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Don't render before delay
  if (frame < delay) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
    />
  );
};
