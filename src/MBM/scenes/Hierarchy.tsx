import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { StackBlock, HierarchyGuide } from '../components/StackBlock';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 5: Hierarchy (450-540 frames, local 0-90)
 * Stack blocks building (Expert > Specialized > AI leverage)
 *
 * Enhancements:
 * - Block shine effect on entry
 * - Crown icon above "Expert Vision"
 * - Pulsing guide line
 * - Labels slide in from side
 */
export const Hierarchy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 180 },
  });

  const titleOpacity = interpolate(titleSpring, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(titleSpring, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Level indicators animation
  const indicatorDelays = [5, 35, 65];
  const indicatorLabels = ['AI Tools', 'Specialist', 'Visionary'];

  return (
    <AbsoluteFill>
      {/* Premium cream background */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.cream,
        }}
      />

      {/* Title with slide */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: 100,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.darkGreen,
            marginBottom: 60,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            willChange: 'transform, opacity',
          }}
        >
          The Design Hierarchy
        </div>
      </AbsoluteFill>

      {/* Vertical guide line with pulse */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HierarchyGuide height={320} pulseSpeed={0.05} />
      </AbsoluteFill>

      {/* Level indicators on the side */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 100,
          gap: 70,
        }}
      >
        {indicatorLabels.map((label, index) => {
          const indicatorSpring = spring({
            frame: frame - indicatorDelays[2 - index],
            fps,
            config: { damping: 20, stiffness: 150 },
          });

          const opacity = interpolate(indicatorSpring, [0, 0.5], [0, 0.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const translateX = interpolate(indicatorSpring, [0, 1], [-30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                fontWeight: 600,
                color: COLORS.darkGreen,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                opacity,
                transform: `translateX(${translateX}px)`,
                willChange: 'transform, opacity',
              }}
            >
              {label}
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Stack blocks - building from bottom */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingBottom: 120,
          gap: 16,
        }}
      >
        {/* Base - AI leverage (largest, first to appear) */}
        <StackBlock label="AI Leverage" level={1} delay={0} showShine={true} />

        {/* Middle - Specialized */}
        <StackBlock label="Specialized Skills" level={2} delay={30} showShine={true} />

        {/* Top - Expert (smallest, last to appear, with crown) */}
        <StackBlock label="Expert Vision" level={3} delay={60} showShine={true} showCrown={true} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
