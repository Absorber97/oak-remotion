import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface GlowPulseProps {
  color: string;
  intensity?: number;
  frequency?: number;
  baseRadius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Pulsing glow effect around elements using box-shadow
 * Uses sin wave for continuous, organic pulsing
 */
export const GlowPulse: React.FC<GlowPulseProps> = ({
  color,
  intensity = 1,
  frequency = 0.1,
  baseRadius = 40,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  // Sin wave for continuous pulse (0.4 to 1.0 range)
  const pulseMultiplier = Math.sin(frame * frequency) * 0.3 + 0.7;

  // Calculate glow radius and intensity
  const glowRadius = baseRadius * pulseMultiplier * intensity;
  const spreadRadius = (baseRadius * 0.5) * pulseMultiplier * intensity;

  return (
    <div
      style={{
        boxShadow: `0 0 ${glowRadius}px ${spreadRadius}px ${color}`,
        willChange: 'box-shadow',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Static glow effect (no animation) - useful for emphasizing elements
 */
export const StaticGlow: React.FC<{
  color: string;
  radius?: number;
  spread?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ color, radius = 40, spread = 20, children, style }) => {
  return (
    <div
      style={{
        boxShadow: `0 0 ${radius}px ${spread}px ${color}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Animated glow that fades in
 */
export const FadeInGlow: React.FC<{
  color: string;
  startFrame: number;
  endFrame: number;
  radius?: number;
  spread?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ color, startFrame, endFrame, radius = 40, spread = 20, children, style }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Parse color and add opacity
  const glowColor = color.replace(')', `, ${opacity})`).replace('rgb', 'rgba');

  return (
    <div
      style={{
        boxShadow: `0 0 ${radius}px ${spread}px ${glowColor}`,
        willChange: 'box-shadow',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
