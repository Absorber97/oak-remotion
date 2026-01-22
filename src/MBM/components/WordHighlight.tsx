import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from 'remotion';
import { SPRING_CONFIGS } from '../config';
import { COLORS } from '../styles/colors';

interface WordHighlightProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  color?: string;
  height?: string;
  useSpring?: boolean;
}

/**
 * Highlighter pen effect that wipes across text
 * Creates emphasis on key words/phrases
 */
export const WordHighlight: React.FC<WordHighlightProps> = ({
  children,
  delay = 0,
  duration = 20,
  color = COLORS.gold,
  height = '40%',
  useSpring = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let progress: number;

  if (useSpring) {
    // Spring-based wipe (easeInOutCubic feel)
    const springProgress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 25, stiffness: 120 },
    });
    progress = interpolate(springProgress, [0, 1], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    // Easing-based wipe
    progress = interpolate(frame, [delay, delay + duration], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.inOut(Easing.cubic),
    });
  }

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {/* Highlight background */}
      <span
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height,
          width: `${progress}%`,
          backgroundColor: color,
          opacity: 0.4,
          zIndex: -1,
          willChange: 'width',
        }}
      />
      {/* Text content */}
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
};

/**
 * Underline reveal effect (alternative to highlight)
 */
export const UnderlineReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  color?: string;
  thickness?: number;
}> = ({
  children,
  delay = 0,
  duration = 15,
  color = COLORS.gold,
  thickness = 4,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springProgress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const width = interpolate(springProgress, [0, 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      {children}
      <span
        style={{
          position: 'absolute',
          left: 0,
          bottom: -thickness / 2,
          height: thickness,
          width: `${width}%`,
          backgroundColor: color,
          borderRadius: thickness / 2,
          willChange: 'width',
        }}
      />
    </span>
  );
};
