import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { StatCard } from '../components/StatCard';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 4: Stats (300-450 frames, local 0-150)
 * Three stat cards staggered
 *
 * Enhancements:
 * - TouchRipple on each card entry
 * - Animated progress bars under stats
 * - Cards have glow effect on completion
 * - Connector lines between cards
 */
export const Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const stats = [
    {
      stat: (
        <AnimatedNumber
          from={0}
          to={82}
          startFrame={10}
          endFrame={70}
          suffix="%"
        />
      ),
      label: 'Same layouts',
      delay: 0,
      accentColor: COLORS.darkGreen,
      progressValue: 82,
    },
    {
      stat: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: COLORS.dark, opacity: 0.7 }}>
            <AnimatedNumber
              from={0.0}
              to={1.2}
              startFrame={60}
              endFrame={110}
              decimals={1}
              suffix="%"
            />
          </span>
          <span style={{ fontSize: 36, color: COLORS.gold }}>→</span>
          <span style={{ color: COLORS.darkGreen }}>
            <AnimatedNumber
              from={1.2}
              to={2.8}
              startFrame={90}
              endFrame={140}
              decimals={1}
              suffix="%"
            />
          </span>
        </div>
      ),
      label: 'Conversion lift with differentiation',
      delay: 50,
      accentColor: COLORS.gold,
      progressValue: 0, // No progress bar for this one
    },
    {
      stat: (
        <AnimatedNumber
          from={0}
          to={-25}
          startFrame={110}
          endFrame={150}
          suffix="%"
        />
      ),
      label: 'Brand recall drop for generic work',
      delay: 90,
      accentColor: COLORS.dark,
      progressValue: 25,
    },
  ];

  // Connector line animations
  const line1Opacity = interpolate(frame, [60, 80], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Opacity = interpolate(frame, [110, 130], [0, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Premium cream background */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.cream,
        }}
      />

      {/* Scene title */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: 70,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 44,
            fontWeight: 600,
            color: COLORS.darkGreen,
            letterSpacing: '0.02em',
          }}
        >
          The Slopidemic
        </div>
      </AbsoluteFill>

      {/* Stats grid with connector lines */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          padding: 80,
          paddingTop: 140,
        }}
      >
        {stats.map((item, index) => (
          <React.Fragment key={index}>
            <StatCard
              stat={item.stat}
              label={item.label}
              delay={item.delay}
              accentColor={item.accentColor}
              showRipple={true}
              showProgressBar={item.progressValue > 0}
              progressValue={item.progressValue}
            />

            {/* Connector line to next card */}
            {index < stats.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: `${33 + index * 33}%`,
                  top: '50%',
                  width: 40,
                  height: 2,
                  backgroundColor: COLORS.lightGreen,
                  opacity: index === 0 ? line1Opacity : line2Opacity,
                  transform: 'translateY(-50%)',
                }}
              />
            )}
          </React.Fragment>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
