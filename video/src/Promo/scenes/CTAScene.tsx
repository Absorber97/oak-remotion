import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  OffthreadVideo,
  staticFile,
} from 'remotion';
import { SPRINGS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

/**
 * Scene 5: CTA - Two Phases with Slide Transition
 * Phase 1 (0-50): "Vibe coding won't make you stand out" / "Here's what will"
 * Phase 2 (50-110): Website CTA + Polaroid Video (slides in from above)
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

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===========================================
  // PHASE TRANSITION (frame 40-65) - SLOWER, reversed direction
  // ===========================================

  const phaseTransition = interpolate(frame, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Phase 1 slides UP and fades out
  const phase1Y = interpolate(phaseTransition, [0, 1], [0, -600], {
    extrapolateRight: 'clamp',
  });
  const phase1Opacity = interpolate(phaseTransition, [0, 0.6], [1, 0], {
    extrapolateRight: 'clamp',
  });
  const phase1Scale = interpolate(phaseTransition, [0, 1], [1, 0.9], {
    extrapolateRight: 'clamp',
  });

  // Phase 2 slides UP from below
  const phase2Y = interpolate(phaseTransition, [0, 1], [500, 0], {
    extrapolateRight: 'clamp',
  });
  const phase2Opacity = interpolate(phaseTransition, [0.2, 0.7], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const phase2Scale = interpolate(phaseTransition, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  // ===========================================
  // PHASE 1 ANIMATIONS
  // ===========================================

  // Entry camera (rises into view)
  const entryProgress = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  const entryY = interpolate(entryProgress, [0, 1], [400, 0], {
    extrapolateRight: 'clamp',
  });
  const entryScale = interpolate(entryProgress, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });
  const entryOpacity = interpolate(entryProgress, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Text animations
  const line1Spring = spring({ frame, fps, config: SPRINGS.text });
  const line1Opacity = interpolate(line1Spring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line1Y = interpolate(line1Spring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const line2Spring = spring({ frame: frame - 15, fps, config: SPRINGS.text });
  const line2Opacity = interpolate(line2Spring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Y = interpolate(line2Spring, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const highlightSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 25, stiffness: 120 },
  });
  const highlightWidth = interpolate(highlightSpring, [0, 1], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ===========================================
  // PHASE 2 ANIMATIONS
  // ===========================================

  const polaroidSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const polaroidBounce = interpolate(polaroidSpring, [0, 1], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ===========================================
  // CONTINUOUS MOTION
  // ===========================================

  const breathe = 1 + Math.sin(frame * 0.08) * 0.08;
  const glowPulse = 1 + Math.sin(frame * 0.12) * 0.4;
  const polaroidFloat = Math.sin(frame * 0.05) * 5;
  const polaroidRotate = Math.sin(frame * 0.03) * 2;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Gradient background */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${900 * breathe}px ${600 * breathe}px at 50% 50%, rgba(0, 255, 136, 0.18), transparent)`,
        }}
      />

      {/* Floating emojis */}
      <FloatingEmoji x={5} y={15} delay={0} size={55} emoji="🚀" />
      <FloatingEmoji x={93} y={18} delay={5} size={50} emoji="✨" />
      <FloatingEmoji x={7} y={78} delay={10} size={52} emoji="💎" />
      <FloatingEmoji x={91} y={75} delay={3} size={48} emoji="🏆" />
      <FloatingEmoji x={3} y={45} delay={8} size={46} emoji="⚡" />
      <FloatingEmoji x={96} y={50} delay={12} size={54} emoji="🎯" />

      {/* ===========================================
          PHASE 1: Main Message
          =========================================== */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          transform: `translateY(${entryY + phase1Y}px) scale(${entryScale * phase1Scale})`,
          opacity: entryOpacity * phase1Opacity,
        }}
      >
        {/* Line 1 */}
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

        {/* Line 2 */}
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
      </AbsoluteFill>

      {/* ===========================================
          PHASE 2: Website + Floating Video
          =========================================== */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 35,
          transform: `translateY(${phase2Y}px) scale(${phase2Scale})`,
          opacity: phase2Opacity,
        }}
      >
        {/* Website CTA - BIGGER */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 36,
              fontWeight: 500,
              color: COLORS.muted,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Read the full article + case study
          </div>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 72,
              fontWeight: 700,
              color: COLORS.primary,
              letterSpacing: '0.03em',
              textShadow: `
                0 0 ${30 * glowPulse}px ${COLORS.glow.green},
                0 0 ${60 * glowPulse}px ${COLORS.glow.green},
                0 0 ${100 * glowPulse}px ${COLORS.glow.green}
              `,
            }}
          >
            forbiddentrust.com
          </div>
        </div>

        {/* Floating video with glowing border - NO polaroid */}
        <div
          style={{
            transform: `translateY(${videoFloat}px) scale(${videoBounce})`,
            position: 'relative',
          }}
        >
          {/* Glow backdrop */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              background: `radial-gradient(ellipse at center, ${COLORS.primary}30 0%, transparent 70%)`,
              filter: 'blur(30px)',
              opacity: glowPulse * 0.6,
            }}
          />
          {/* Video container with sleek rounded corners and glow border */}
          <div
            style={{
              position: 'relative',
              width: 700,
              height: 394,
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: `
                0 0 0 2px ${COLORS.primary}50,
                0 0 ${40 * glowPulse}px ${COLORS.primary}40,
                0 25px 80px rgba(0, 0, 0, 0.5)
              `,
            }}
          >
            <OffthreadVideo
              src={staticFile('promo-assets/seq5-video.mp4')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              muted
            />
            {/* Subtle inner vignette on video */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)',
                pointerEvents: 'none',
              }}
            />
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
