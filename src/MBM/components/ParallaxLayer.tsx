import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

interface ParallaxLayerProps {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  children: React.ReactNode;
  style?: React.CSSProperties;
  range?: number;
}

/**
 * Multi-speed background movement for depth effect
 * Speed < 1 = slower than foreground (background feel)
 * Speed > 1 = faster than foreground (foreground feel)
 */
export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  speed = 0.5,
  direction = 'vertical',
  children,
  style,
  range = 50,
}) => {
  const frame = useCurrentFrame();

  // Calculate offset based on frame and speed
  const offset = frame * speed * 0.5;

  // Clamp to range to prevent excessive movement
  const clampedOffset = Math.min(offset, range);

  const transform =
    direction === 'vertical'
      ? `translateY(${-clampedOffset}px)`
      : `translateX(${-clampedOffset}px)`;

  return (
    <AbsoluteFill
      style={{
        transform,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/**
 * Floating animation for subtle ambient movement
 */
export const FloatingLayer: React.FC<{
  amplitude?: number;
  frequency?: number;
  phase?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  amplitude = 10,
  frequency = 0.05,
  phase = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  // Sin wave for continuous floating motion
  const yOffset = Math.sin((frame + phase) * frequency) * amplitude;
  const xOffset = Math.cos((frame + phase) * frequency * 0.7) * (amplitude * 0.3);

  return (
    <div
      style={{
        transform: `translate(${xOffset}px, ${yOffset}px)`,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Breathing scale effect for background elements
 */
export const BreathingLayer: React.FC<{
  minScale?: number;
  maxScale?: number;
  frequency?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({
  minScale = 1.0,
  maxScale = 1.03,
  frequency = 0.02,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  // Sin wave for breathing effect
  const scaleProgress = (Math.sin(frame * frequency) + 1) / 2;
  const scale = minScale + scaleProgress * (maxScale - minScale);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
