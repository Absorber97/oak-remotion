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
import { SPRING_CONFIGS, ASSETS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';
import { ParallaxLayer, BreathingLayer } from '../components/ParallaxLayer';
import { GlowPulse } from '../components/GlowPulse';
import { WordHighlight } from '../components/WordHighlight';

/**
 * Scene 1: Hook (0-90 frames)
 * Dark Souls image + "Vibe coding won't make your product stand out."
 *
 * Enhancements:
 * - Parallax background movement
 * - Pulsing glow around image
 * - Word highlight on "stand out"
 * - Floating dust particles
 */
export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient fade in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Image Ken Burns slow zoom
  const imageScale = interpolate(frame, [0, 90], [1.0, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Image fade in
  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text spring entry (delayed 30 frames)
  const textSpring = spring({
    frame: frame - 30,
    fps,
    config: SPRING_CONFIGS.text,
  });

  const textY = interpolate(textSpring, [0, 1], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(textSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dust particles
  const particles = React.useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      x: 20 + (i * 18),
      y: 30 + (i * 12),
      size: 2 + (i % 3),
      speed: 0.02 + (i * 0.005),
      phase: i * 20,
    }));
  }, []);

  return (
    <AbsoluteFill>
      {/* Background gradient with parallax */}
      <ParallaxLayer speed={0.3} range={30}>
        <AbsoluteFill
          style={{
            background: GRADIENTS.matcha,
            opacity: bgOpacity,
          }}
        />
      </ParallaxLayer>

      {/* Soft radial highlight with breathing */}
      <BreathingLayer minScale={1} maxScale={1.05} frequency={0.015}>
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(800px 400px at 70% 20%, rgba(246,242,233,0.2), rgba(0,0,0,0))',
          }}
        />
      </BreathingLayer>

      {/* Floating dust particles */}
      {particles.map((p, i) => {
        const y = Math.sin((frame + p.phase) * p.speed) * 30;
        const x = Math.cos((frame + p.phase) * p.speed * 0.7) * 20;
        const particleOpacity = interpolate(frame, [10, 30], [0, 0.4], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: COLORS.cream,
              opacity: particleOpacity,
              transform: `translate(${x}px, ${y}px)`,
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Dark Souls image with Ken Burns and glow */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: imageOpacity,
        }}
      >
        <GlowPulse
          color={COLORS.glow.green}
          intensity={0.6}
          frequency={0.08}
          baseRadius={60}
          style={{ borderRadius: 24 }}
        >
          <Img
            src={staticFile(ASSETS.darkSouls)}
            style={{
              width: '70%',
              height: 'auto',
              borderRadius: 24,
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.4)',
              transform: `scale(${imageScale})`,
              willChange: 'transform',
            }}
          />
        </GlowPulse>
      </AbsoluteFill>

      {/* Kicker label */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 60,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: COLORS.cream,
            opacity: 0.9,
          }}
        >
          Manifesto
        </div>
      </AbsoluteFill>

      {/* Bottom fade for legibility */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)',
        }}
      />

      {/* Headline text with word highlight */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 100,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.serif,
            fontSize: 56,
            fontWeight: 600,
            color: COLORS.cream,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            willChange: 'transform, opacity',
          }}
        >
          Vibe coding won't make your product{' '}
          <WordHighlight delay={50} color={COLORS.gold} height="35%">
            stand out
          </WordHighlight>
          .
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
