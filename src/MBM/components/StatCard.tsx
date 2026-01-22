import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SPRING_CONFIGS } from '../config';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';
import { TouchRipple } from './TouchRipple';

interface StatCardProps {
  stat: React.ReactNode;
  label: string;
  delay?: number;
  accentColor?: string;
  showRipple?: boolean;
  showProgressBar?: boolean;
  progressValue?: number;
}

/**
 * Enhanced stat card with:
 * - TouchRipple effect on entry
 * - Optional progress bar
 * - Glow effect on completion
 */
export const StatCard: React.FC<StatCardProps> = ({
  stat,
  label,
  delay = 0,
  accentColor,
  showRipple = true,
  showProgressBar = false,
  progressValue = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for entry
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  // Animate Y position and scale
  const translateY = interpolate(progress, [0, 1], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(progress, [0, 1], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow effect after entry completes
  const glowOpacity = interpolate(progress, [0.8, 1], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Progress bar animation (if enabled)
  const barProgress = showProgressBar
    ? interpolate(frame, [delay + 30, delay + 90], [0, progressValue], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 60px',
        backgroundColor: COLORS.cream,
        borderRadius: 24,
        boxShadow: `0 8px 32px rgba(46, 75, 58, 0.15), 0 0 ${40 * glowOpacity}px ${20 * glowOpacity}px ${accentColor || COLORS.glow.green}`,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        willChange: 'transform, opacity, box-shadow',
        overflow: 'hidden',
      }}
    >
      {/* Touch ripple effect */}
      {showRipple && (
        <TouchRipple
          delay={delay + 5}
          x={0}
          y={0}
          size={150}
          color={accentColor || COLORS.ripple}
        />
      )}

      {/* Accent bar at top */}
      {accentColor && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            backgroundColor: accentColor,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}
        />
      )}

      {/* Stat display */}
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: 96,
          fontWeight: 700,
          color: COLORS.darkGreen,
          lineHeight: 1,
          marginBottom: 12,
        }}
      >
        {stat}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 18,
          fontWeight: 600,
          color: COLORS.text.secondary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        {label}
      </div>

      {/* Optional progress bar */}
      {showProgressBar && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: 'rgba(46, 75, 58, 0.1)',
          }}
        >
          <div
            style={{
              width: `${barProgress}%`,
              height: '100%',
              backgroundColor: accentColor || COLORS.darkGreen,
              transition: 'none', // No CSS transitions in Remotion
            }}
          />
        </div>
      )}
    </div>
  );
};

/**
 * Compact stat card variant
 */
export const StatCardCompact: React.FC<{
  value: React.ReactNode;
  label: string;
  delay?: number;
  color?: string;
}> = ({ value, label, delay = 0, color = COLORS.darkGreen }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const translateY = interpolate(progress, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transform: `translateY(${translateY}px)`,
        opacity,
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          fontFamily: FONTS.serif,
          fontSize: 48,
          fontWeight: 700,
          color,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.text.secondary,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
};
