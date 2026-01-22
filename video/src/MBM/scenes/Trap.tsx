import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { KineticText } from '../components/KineticText';
import { TypewriterText } from '../components/TypewriterText';
import { BreathingLayer } from '../components/ParallaxLayer';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';
import { SPRING_CONFIGS } from '../config';

/**
 * Scene 2: Trap (90-210 frames, local 0-120)
 * Kinetic text + token counter
 *
 * Enhancements:
 * - First line types character by character
 * - Token counter pulses red as it increases
 * - Background subtly breathes
 * - Emphasis marks around "good enough"
 */
export const Trap: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Token counter value
  const tokenValue = Math.round((frame / fps) * 120);

  // Counter glow intensifies with tokens
  const counterGlowIntensity = interpolate(frame, [10, 100], [0.2, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Counter pulse
  const counterPulse = Math.sin(frame * 0.15) * 0.1 + 1;

  const counterOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Emphasis marks for "good enough"
  const quotesSpring = spring({
    frame: frame - 70,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const quotesOpacity = interpolate(quotesSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const quotesScale = interpolate(quotesSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Background gradient with breathing effect */}
      <BreathingLayer minScale={1} maxScale={1.03} frequency={0.02}>
        <AbsoluteFill
          style={{
            background: GRADIENTS.matcha,
          }}
        />
      </BreathingLayer>

      {/* Soft top highlight */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(700px 300px at 50% 0%, rgba(246,242,233,0.25), rgba(0,0,0,0))',
        }}
      />

      {/* Kinetic text sequence with typewriter for first line */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {/* First line - typewriter effect */}
        <TypewriterText
          text="You paid money..."
          startFrame={0}
          charFrames={2}
          fontSize={64}
          fontWeight={600}
          color={COLORS.cream}
          useSerif={true}
          showCursor={false}
        />

        {/* Second line - kinetic */}
        <KineticText
          text="want magic..."
          delay={30}
          fontSize={64}
          fontWeight={600}
          color={COLORS.cream}
          useSerif={true}
          direction="up"
          distance={40}
        />

        {/* Third line - with emphasis marks */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Opening quote */}
          <span
            style={{
              fontFamily: FONTS.serif,
              fontSize: 80,
              fontWeight: 600,
              color: COLORS.gold,
              opacity: quotesOpacity,
              transform: `scale(${quotesScale})`,
              willChange: 'transform, opacity',
            }}
          >
            "
          </span>

          <KineticText
            text="accept good enough."
            delay={60}
            fontSize={64}
            fontWeight={600}
            color={COLORS.cream}
            useSerif={true}
            direction="up"
            distance={40}
          />

          {/* Closing quote */}
          <span
            style={{
              fontFamily: FONTS.serif,
              fontSize: 80,
              fontWeight: 600,
              color: COLORS.gold,
              opacity: quotesOpacity,
              transform: `scale(${quotesScale})`,
              willChange: 'transform, opacity',
            }}
          >
            "
          </span>
        </div>
      </AbsoluteFill>

      {/* Token counter with pulsing glow */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: 60,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: COLORS.cream,
            opacity: counterOpacity,
            transform: `scale(${counterPulse})`,
            textShadow: `0 0 ${20 * counterGlowIntensity}px rgba(255, 100, 100, ${counterGlowIntensity})`,
            willChange: 'transform, text-shadow',
          }}
        >
          Tokens spent:{' '}
          <span
            style={{
              fontVariantNumeric: 'tabular-nums',
              color: interpolate(frame, [50, 100], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) > 0.5
                ? '#ff6b6b'
                : COLORS.cream,
            }}
          >
            {tokenValue}
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
