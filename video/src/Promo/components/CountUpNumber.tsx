import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from 'remotion';
import { SPRINGS } from '../config';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';

interface CountUpNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  useSpring?: boolean;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  delay = 0,
  duration = 30,
  fontSize = 120,
  color = COLORS.primary,
  glowColor,
  useSpring = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glow = glowColor || color;

  let progress: number;

  if (useSpring) {
    progress = spring({
      frame: frame - delay,
      fps,
      config: SPRINGS.text,
    });
  } else {
    progress = interpolate(
      frame,
      [delay, delay + duration],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      }
    );
  }

  // Current displayed value
  const currentValue = progress * value;
  const displayValue = currentValue.toFixed(decimals);

  // Entry animation
  const entryProgress = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.slam,
  });

  const scale = interpolate(entryProgress, [0, 1], [1.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entryProgress, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow effect
  const textShadow = [
    `0 0 10px ${glow}`,
    `0 0 30px ${glow}`,
    `0 0 60px ${glow}`,
  ].join(', ');

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize,
        fontWeight: 700,
        color,
        textShadow,
        transform: `scale(${scale})`,
        opacity,
        willChange: 'transform, opacity',
        display: 'inline-flex',
        alignItems: 'baseline',
      }}
    >
      {prefix && (
        <span style={{ fontSize: fontSize * 0.6, marginRight: 8 }}>
          {prefix}
        </span>
      )}
      {displayValue}
      {suffix && (
        <span style={{ fontSize: fontSize * 0.5, marginLeft: 8 }}>
          {suffix}
        </span>
      )}
    </div>
  );
};

// Variant: Stat with label
export const StatWithLabel: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = ({
  value,
  suffix = '',
  label,
  delay = 0,
  color = COLORS.primary,
  direction = 'up',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.slam,
  });

  const getOffset = () => {
    const dist = interpolate(entrySpring, [0, 1], [80, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    switch (direction) {
      case 'up': return { x: 0, y: dist };
      case 'down': return { x: 0, y: -dist };
      case 'left': return { x: dist, y: 0 };
      case 'right': return { x: -dist, y: 0 };
    }
  };

  const { x, y } = getOffset();
  const opacity = interpolate(entrySpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        transform: `translate(${x}px, ${y}px)`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      <CountUpNumber
        value={value}
        suffix={suffix}
        delay={delay}
        color={color}
        fontSize={96}
      />
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 24,
          fontWeight: 600,
          color: COLORS.muted,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
};
