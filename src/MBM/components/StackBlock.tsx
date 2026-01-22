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

interface StackBlockProps {
  label: string;
  level: 1 | 2 | 3; // 1 = base (largest), 3 = top (smallest)
  delay?: number;
  showShine?: boolean;
  showCrown?: boolean;
}

const LEVEL_CONFIG = {
  1: { width: 600, bgColor: COLORS.lightGreen, textColor: COLORS.dark },
  2: { width: 500, bgColor: COLORS.darkGreen, textColor: COLORS.cream },
  3: { width: 400, bgColor: COLORS.gold, textColor: COLORS.dark },
};

/**
 * Enhanced stack block with:
 * - Shine sweep effect on entry
 * - Optional crown icon for top level
 * - Heavy spring for impactful landing
 */
export const StackBlock: React.FC<StackBlockProps> = ({
  label,
  level,
  delay = 0,
  showShine = true,
  showCrown = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const config = LEVEL_CONFIG[level];

  // Heavy spring for impactful entry
  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIGS.heavy,
  });

  // Animate from bottom with slight bounce
  const translateY = interpolate(progress, [0, 1], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slight scale bounce on landing
  const scaleY = interpolate(progress, [0.7, 0.85, 1], [0.95, 1.02, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shine sweep effect (after entry completes)
  const shineDelay = delay + 25;
  const shineProgress = interpolate(
    frame,
    [shineDelay, shineDelay + 20],
    [-100, 200],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const shineOpacity = interpolate(
    frame,
    [shineDelay, shineDelay + 10, shineDelay + 20],
    [0, 0.6, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: config.width,
        padding: '24px 48px',
        backgroundColor: config.bgColor,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${translateY}px) scaleY(${scaleY})`,
        transformOrigin: 'center bottom',
        opacity,
        willChange: 'transform, opacity',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Shine sweep effect */}
      {showShine && shineOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${shineProgress}%`,
            width: 60,
            height: '100%',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${shineOpacity}), transparent)`,
            transform: 'skewX(-20deg)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Crown icon for top level */}
      {showCrown && level === 3 && (
        <div
          style={{
            position: 'absolute',
            top: -30,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 24,
            opacity: interpolate(progress, [0.8, 1], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}
        >
          👑
        </div>
      )}

      {/* Label text */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 28,
          fontWeight: 700,
          color: config.textColor,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {label}
      </div>
    </div>
  );
};

/**
 * Vertical guide line for hierarchy visual
 */
export const HierarchyGuide: React.FC<{
  height?: number;
  pulseSpeed?: number;
}> = ({ height = 320, pulseSpeed = 0.05 }) => {
  const frame = useCurrentFrame();

  // Subtle pulse effect
  const pulseOpacity = 0.15 + Math.sin(frame * pulseSpeed) * 0.05;

  return (
    <div
      style={{
        width: 2,
        height,
        backgroundColor: COLORS.darkGreen,
        opacity: pulseOpacity,
        willChange: 'opacity',
      }}
    />
  );
};
