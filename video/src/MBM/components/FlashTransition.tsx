import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

interface FlashTransitionProps {
  startFrame: number;
  duration?: number;
  intensity?: number;
  color?: string;
}

/**
 * White flash overlay effect between scene cuts
 * Creates a brief, punchy transition that draws attention
 */
export const FlashTransition: React.FC<FlashTransitionProps> = ({
  startFrame,
  duration = 5,
  intensity = 0.9,
  color = 'white',
}) => {
  const frame = useCurrentFrame();

  // Quick flash: 0 -> peak -> 0
  const opacity = interpolate(
    frame,
    [startFrame, startFrame + duration * 0.4, startFrame + duration],
    [0, intensity, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Don't render if not visible
  if (frame < startFrame || frame > startFrame + duration) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity,
        pointerEvents: 'none',
        zIndex: 9998, // Just below grain overlay
      }}
    />
  );
};

/**
 * Double flash for more dramatic effect
 */
export const DoubleFlash: React.FC<{
  startFrame: number;
  intensity?: number;
}> = ({ startFrame, intensity = 0.8 }) => {
  return (
    <>
      <FlashTransition startFrame={startFrame} duration={3} intensity={intensity} />
      <FlashTransition startFrame={startFrame + 4} duration={3} intensity={intensity * 0.6} />
    </>
  );
};
