import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SplitReveal } from '../components/SplitReveal';
import { ASSETS, SPRING_CONFIGS } from '../config';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 7: Before/After (630-720 frames, local 0-90)
 * Wipe reveal with handle
 *
 * Enhancements:
 * - Handle pulses while moving
 * - Labels slide in from edges
 * - Sparkle effect along reveal line
 * - Subtle zoom on "After" when revealed
 */
export const BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.snappy,
  });

  const titleOpacity = interpolate(titleSpring, [0, 0.5], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(titleSpring, [0, 1], [-20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Dark background for contrast */}
      <AbsoluteFill style={{ backgroundColor: COLORS.dark }} />

      {/* Subtle gradient overlay */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(46, 75, 58, 0.2), transparent 70%)',
        }}
      />

      {/* Title with slide animation */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 60,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: COLORS.cream,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            willChange: 'transform, opacity',
          }}
        >
          Before / After
        </div>
      </AbsoluteFill>

      {/* Enhanced split reveal component */}
      <SplitReveal
        imageSrc={ASSETS.beforeAfter}
        beforeLabel="Before: Generic"
        afterLabel="After: Memorable"
        revealDuration={60}
        showHandle={true}
        showSparkle={true}
      />
    </AbsoluteFill>
  );
};
