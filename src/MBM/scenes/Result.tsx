import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Confetti, Sparkles } from '../components/Confetti';
import { GlowPulse } from '../components/GlowPulse';
import { TouchRipple } from '../components/TouchRipple';
import { SPRING_CONFIGS, ASSETS } from '../config';
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 9: Result (810-900 frames, local 0-90)
 * Brochure + trust boost + formula
 *
 * Enhancements:
 * - Confetti on trust boost reveal
 * - Formula text has golden glow
 * - CTA becomes button-like with ripple
 * - Final glossy sweep on brochure
 */
export const Result: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Brochure image fade
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Brochure shine sweep
  const shineProgress = interpolate(frame, [75, 90], [-100, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shineOpacity = interpolate(frame, [75, 82, 90], [0, 0.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Trust boost text spring
  const trustSpring = spring({
    frame: frame - 10,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const trustScale = interpolate(trustSpring, [0, 1], [0.8, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const trustOpacity = interpolate(trustSpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Formula text with glow
  const formulaOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const formulaGlow = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CTA text and button effect
  const ctaSpring = spring({
    frame: frame - 70,
    fps,
    config: SPRING_CONFIGS.text,
  });

  const ctaOpacity = interpolate(ctaSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaY = interpolate(ctaSpring, [0, 1], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Soft matcha background */}
      <AbsoluteFill style={{ backgroundColor: COLORS.softMatcha }} />

      {/* Confetti celebration on trust boost */}
      <Confetti
        startFrame={35}
        duration={45}
        particleCount={25}
        colors={[COLORS.gold, COLORS.lightGreen, COLORS.cream]}
        seed="result-confetti"
      />

      {/* Brochure texture image with shine */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: 100,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '40%',
            overflow: 'hidden',
            borderRadius: 24,
          }}
        >
          <Img
            src={staticFile(ASSETS.matchaBrochure)}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 24,
              boxShadow: '0 24px 80px rgba(46, 75, 58, 0.3)',
              opacity: imageOpacity,
            }}
          />

          {/* Glossy shine sweep */}
          {shineOpacity > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: `${shineProgress}%`,
                width: 80,
                height: '100%',
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,${shineOpacity}), transparent)`,
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
              }}
            />
          )}
        </div>
      </AbsoluteFill>

      {/* Results content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: 100,
          gap: 40,
        }}
      >
        {/* Trust boost stat with sparkles */}
        <div style={{ position: 'relative' }}>
          <Sparkles
            startFrame={30}
            count={6}
            color={COLORS.gold}
            spread={150}
            seed="trust-sparkle"
          />

          <div
            style={{
              fontFamily: FONTS.serif,
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.darkGreen,
              transform: `scale(${trustScale})`,
              opacity: trustOpacity,
              willChange: 'transform, opacity',
            }}
          >
            +
            <AnimatedNumber
              from={0}
              to={65}
              startFrame={10}
              endFrame={60}
            />
            % trust boost
          </div>
        </div>

        {/* Accent underline */}
        <div
          style={{
            width: 260,
            height: 6,
            backgroundColor: COLORS.gold,
            alignSelf: 'flex-end',
            opacity: interpolate(frame, [20, 40], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            borderRadius: 3,
          }}
        />

        {/* Formula with glow */}
        <GlowPulse
          color={COLORS.glow.gold}
          intensity={formulaGlow * 0.5}
          frequency={0.1}
          baseRadius={20}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 32,
              fontWeight: 700,
              color: COLORS.dark,
              opacity: formulaOpacity,
              letterSpacing: '0.05em',
              padding: '8px 16px',
            }}
          >
            SPEED × QUALITY × VOLUME
          </div>
        </GlowPulse>

        {/* CTA with button styling and ripple */}
        <div
          style={{
            position: 'relative',
            backgroundColor: COLORS.darkGreen,
            padding: '20px 40px',
            borderRadius: 12,
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
            boxShadow: '0 8px 24px rgba(46, 75, 58, 0.3)',
            willChange: 'transform, opacity',
            overflow: 'hidden',
          }}
        >
          {/* Touch ripple on CTA */}
          <TouchRipple delay={80} x={100} y={30} size={120} color={COLORS.ripple} />

          <div
            style={{
              fontFamily: FONTS.serif,
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.cream,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Accept reality.
            <br />
            Think different.
            <br />
            Act different.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
