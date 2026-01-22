import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from 'remotion';
import { SPRINGS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 5: CTA (360-450 frames / 12-15s)
 *
 * "Stop hoping for magic."
 * "Start multiplying your edge."
 * CONTINUOUS DOPAMINE: pulsing glow, floating particles, breathing background
 */

// Floating emoji for visual interest
const FloatingEmoji: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
  emoji: string;
}> = ({ x, y, delay, size, emoji }) => {
  const frame = useCurrentFrame();

  // Continuous floating
  const floatY = Math.sin((frame + delay) * 0.05) * 18;
  const floatX = Math.cos((frame + delay) * 0.035) * 12;
  const rotate = Math.sin((frame + delay) * 0.04) * 12;
  const pulse = 1 + Math.sin((frame + delay) * 0.1) * 0.18;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        fontSize: size,
        opacity: 0.9,
        transform: `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg) scale(${pulse})`,
        filter: `drop-shadow(0 0 ${size * 0.35}px rgba(0, 255, 136, 0.6))`,
      }}
    >
      {emoji}
    </div>
  );
};

// Floating orb for ambient motion
const FloatingOrb: React.FC<{
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
}> = ({ x, y, size, color, speed, delay }) => {
  const frame = useCurrentFrame();

  const floatX = Math.sin((frame + delay) * speed) * 30;
  const floatY = Math.cos((frame + delay) * speed * 0.7) * 20;
  const pulse = 1 + Math.sin((frame + delay) * speed * 1.5) * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        transform: `translate(${floatX}px, ${floatY}px) scale(${pulse})`,
        filter: `blur(${size * 0.3}px)`,
      }}
    />
  );
};

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // First line animation
  const line1Spring = spring({
    frame,
    fps,
    config: SPRINGS.text,
  });

  const line1Opacity = interpolate(line1Spring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line1Y = interpolate(line1Spring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Second line animation
  const line2Spring = spring({
    frame: frame - 20,
    fps,
    config: SPRINGS.text,
  });

  const line2Opacity = interpolate(line2Spring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Y = interpolate(line2Spring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Highlight wipe on "edge"
  const highlightSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 25, stiffness: 120 },
  });

  const highlightWidth = interpolate(highlightSpring, [0, 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Glow pulse
  const glowPulse = 1 + Math.sin(frame * 0.12) * 0.4;

  // Footer animation
  const footerSpring = spring({
    frame: frame - 50,
    fps,
    config: SPRINGS.smooth,
  });

  const footerOpacity = interpolate(footerSpring, [0, 1], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Background breathing
  const breathe = 1 + Math.sin(frame * 0.08) * 0.08;

  // CONTINUOUS: URL glow pulse
  const urlGlow = 1 + Math.sin(frame * 0.15) * 0.5;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Gradient background with pulse */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${900 * breathe}px ${600 * breathe}px at 50% 50%, rgba(0, 255, 136, 0.18), transparent)`,
        }}
      />

      {/* Floating orbs for ambient motion */}
      <FloatingOrb x={10} y={20} size={100} color={COLORS.primary} speed={0.03} delay={0} />
      <FloatingOrb x={85} y={30} size={80} color={COLORS.gold} speed={0.04} delay={10} />
      <FloatingOrb x={15} y={70} size={60} color={COLORS.primary} speed={0.05} delay={20} />
      <FloatingOrb x={90} y={75} size={70} color={COLORS.accent} speed={0.035} delay={30} />
      <FloatingOrb x={50} y={85} size={90} color={COLORS.primary} speed={0.025} delay={15} />

      {/* Floating emojis - CTA/success theme */}
      <FloatingEmoji x={5} y={15} delay={0} size={55} emoji="🚀" />
      <FloatingEmoji x={93} y={18} delay={5} size={50} emoji="✨" />
      <FloatingEmoji x={7} y={78} delay={10} size={52} emoji="💎" />
      <FloatingEmoji x={91} y={75} delay={3} size={48} emoji="🏆" />
      <FloatingEmoji x={3} y={45} delay={8} size={46} emoji="⚡" />
      <FloatingEmoji x={96} y={50} delay={12} size={54} emoji="🎯" />
      <FloatingEmoji x={10} y={60} delay={6} size={44} emoji="🔥" />
      <FloatingEmoji x={88} y={35} delay={9} size={50} emoji="💪" />

      {/* Main content - centered */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* Line 1: "Vibe coding won't make you stand out" */}
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 56,
            fontWeight: 500,
            color: COLORS.muted,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          Vibe coding won't make you stand out.
        </div>

        {/* Line 2: "Here's what will." */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 72,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            Here's what
          </span>

          {/* "will" with highlight */}
          <span
            style={{
              position: 'relative',
              fontFamily: FONTS.sans,
              fontSize: 88,
              fontWeight: 900,
              color: COLORS.primary,
              textShadow: `
                0 0 ${30 * glowPulse}px ${COLORS.glow.green},
                0 0 ${60 * glowPulse}px ${COLORS.glow.green},
                0 0 ${100 * glowPulse}px ${COLORS.glow.green}
              `,
              display: 'inline-block',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {/* Highlight background */}
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 6,
                height: '35%',
                width: `${highlightWidth}%`,
                backgroundColor: COLORS.primary,
                opacity: 0.35,
                borderRadius: 8,
                zIndex: -1,
              }}
            />
            will.
          </span>
        </div>

        {/* Footer - Read full article CTA */}
        <div
          style={{
            marginTop: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            opacity: footerOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 28,
              fontWeight: 500,
              color: COLORS.muted,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Read the full article + case study
          </div>
          <div
            style={{
              width: 120 + Math.sin(frame * 0.1) * 20,
              height: 3,
              backgroundColor: COLORS.primary,
              opacity: 0.6,
              boxShadow: `0 0 ${20 * urlGlow}px ${COLORS.glow.green}`,
            }}
          />
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 42,
              fontWeight: 700,
              color: COLORS.primary,
              letterSpacing: '0.05em',
              textShadow: `
                0 0 ${20 * urlGlow}px ${COLORS.glow.green},
                0 0 ${40 * urlGlow}px ${COLORS.glow.green}
              `,
            }}
          >
            forbiddentrust.com
          </div>
        </div>
      </AbsoluteFill>

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.vignette,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
