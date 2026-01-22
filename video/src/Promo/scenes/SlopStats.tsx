import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import { SPRINGS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

// Buzz Lightyear "sameness" background - Ken Burns zoom out
const SamenessBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Ken Burns: zoom out from 1.3 to 1.0 to reveal wall of identical copies
  const zoom = interpolate(frame, [0, 45], [1.4, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle pan
  const panX = interpolate(frame, [0, 45], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade in/out
  const opacity = interpolate(
    frame,
    [0, 10, 40, 50],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile('promo-assets/seq2-slop.jpeg')}
        style={{
          position: 'absolute',
          width: '120%',
          height: '120%',
          objectFit: 'cover',
          transform: `scale(${zoom}) translateX(${panX}px)`,
          filter: 'brightness(0.7)',
        }}
      />
      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.9) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Scene 2: SLOP STATS (75-150 frames / 2.5-5s)
 *
 * BIG impactful stats - one at a time, full screen takeover
 * Each stat slams in, holds briefly, then the next appears
 * CONTINUOUS DOPAMINE: pulsing numbers, glowing particles, breathing background
 */

// Rising particle that floats from bottom to top
const RisingParticle: React.FC<{
  x: number;
  size: number;
  speed: number;
  delay: number;
  color?: string;
}> = ({ x, size, speed, delay, color = COLORS.accent }) => {
  const frame = useCurrentFrame();

  // Start from bottom (100%) and rise to top (0%)
  // Loop the animation using modulo
  const cycleLength = 150; // frames for full cycle
  const adjustedFrame = (frame + delay) % cycleLength;
  const progress = adjustedFrame / cycleLength;

  // Y position: start at 110% (below screen), end at -10% (above screen)
  const y = 110 - (progress * 120);

  // Horizontal drift for organic movement
  const drift = Math.sin((frame + delay) * 0.08) * 20;

  // Pulse size and opacity
  const pulse = 1 + Math.sin((frame + delay) * 0.15) * 0.3;
  const opacity = 0.4 + Math.sin((frame + delay) * 0.1) * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size * pulse,
        height: size * pulse,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: opacity,
        transform: `translateX(${drift}px)`,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}50`,
      }}
    />
  );
};

// Danger particle for continuous visual interest
const DangerParticle: React.FC<{
  x: number;
  y: number;
  delay: number;
}> = ({ x, y, delay }) => {
  const frame = useCurrentFrame();

  // Continuous pulsing
  const pulse = Math.sin((frame + delay * 10) * 0.15) * 0.5 + 0.5;
  const size = 6 + Math.sin((frame + delay * 5) * 0.2) * 3;
  const drift = Math.sin((frame + delay) * 0.05) * 15;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: COLORS.accent,
        opacity: pulse * 0.7,
        transform: `translateY(${drift}px) scale(${pulse})`,
        boxShadow: `0 0 ${size * 2}px ${COLORS.accent}`,
      }}
    />
  );
};

export const SlopStats: React.FC = () => {
  const frame = useCurrentFrame();

  // CONTINUOUS: Background pulse
  const bgPulse = 1 + Math.sin(frame * 0.08) * 0.05;

  // CONTINUOUS: Grid animation speed
  const gridSpeed = frame * 0.8;

  // Stat 1: 82% (frames 0-40) - extended for readability
  // Stat 2: 2.3x (frames 30-65)
  // Stat 3: Word of 2025 badge (frames 55-105) - longer hold

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Animated diagonal grid */}
      <AbsoluteFill
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 40px,
              rgba(255, 51, 102, 0.04) 40px,
              rgba(255, 51, 102, 0.04) 42px
            )
          `,
          transform: `translate(${gridSpeed}px, ${gridSpeed}px)`,
        }}
      />

      {/* Pink danger glow - breathing */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${600 * bgPulse}px ${400 * bgPulse}px at 50% 50%, rgba(255, 51, 102, 0.15), transparent)`,
        }}
      />


      {/* Rising particles - varied sizes, speeds, and positions */}
      {/* Large particles - slow rise */}
      <RisingParticle x={5} size={16} speed={1} delay={0} />
      <RisingParticle x={95} size={14} speed={1} delay={40} />
      <RisingParticle x={15} size={18} speed={1} delay={80} />
      <RisingParticle x={85} size={15} speed={1} delay={120} />

      {/* Medium particles - medium speed */}
      <RisingParticle x={10} size={10} speed={1.5} delay={20} />
      <RisingParticle x={90} size={12} speed={1.5} delay={60} />
      <RisingParticle x={25} size={11} speed={1.5} delay={100} />
      <RisingParticle x={75} size={10} speed={1.5} delay={140} />
      <RisingParticle x={35} size={9} speed={1.5} delay={30} />
      <RisingParticle x={65} size={11} speed={1.5} delay={70} />

      {/* Small particles - faster rise */}
      <RisingParticle x={8} size={6} speed={2} delay={10} />
      <RisingParticle x={92} size={7} speed={2} delay={50} />
      <RisingParticle x={20} size={5} speed={2} delay={90} />
      <RisingParticle x={80} size={6} speed={2} delay={130} />
      <RisingParticle x={30} size={7} speed={2} delay={25} />
      <RisingParticle x={70} size={5} speed={2} delay={65} />
      <RisingParticle x={45} size={6} speed={2} delay={105} />
      <RisingParticle x={55} size={7} speed={2} delay={145} />

      {/* Tiny particles - fastest */}
      <RisingParticle x={3} size={4} speed={2.5} delay={15} />
      <RisingParticle x={97} size={3} speed={2.5} delay={55} />
      <RisingParticle x={12} size={4} speed={2.5} delay={95} />
      <RisingParticle x={88} size={3} speed={2.5} delay={135} />
      <RisingParticle x={40} size={4} speed={2.5} delay={35} />
      <RisingParticle x={60} size={3} speed={2.5} delay={75} />

      {/* Some with different color (lighter pink) */}
      <RisingParticle x={18} size={8} speed={1.2} delay={45} color="#FF6699" />
      <RisingParticle x={82} size={9} speed={1.2} delay={85} color="#FF6699" />
      <RisingParticle x={50} size={7} speed={1.8} delay={115} color="#FF6699" />

      {/* STAT 1: 82% same layouts - BIG CENTER */}
      <BigStat
        value={82}
        suffix="%"
        label="AI SITES LOOK THE SAME"
        startFrame={0}
        endFrame={45}
        emoji="👯"
      />

      {/* STAT 2: 2.3x worse conversion */}
      <BigStat
        value={2.3}
        suffix="x"
        label="WORSE CONVERSION"
        decimals={1}
        startFrame={35}
        endFrame={75}
        emoji="📉"
      />

      {/* STAT 3: Word of 2025 badge - extended hold for readability */}
      <WordBadge startFrame={65} />

      {/* Vignette - breathing pulse */}
      <AbsoluteFill
        style={{
          background: GRADIENTS.vignette,
          opacity: 0.8 + Math.sin(frame * 0.08) * 0.12,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

// Big centered stat component
const BigStat: React.FC<{
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
  startFrame: number;
  endFrame: number;
  emoji?: string;
}> = ({ value, suffix, label, decimals = 0, startFrame, endFrame, emoji }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Only render during active window
  if (frame < startFrame - 5 || frame > endFrame + 10) return null;

  // Entry animation
  const entrySpring = spring({
    frame: frame - startFrame,
    fps,
    config: SPRINGS.slam,
  });

  // Exit animation
  const exitProgress = interpolate(
    frame,
    [endFrame - 10, endFrame],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Scale: slam in big, then shrink out + breathing during hold
  const entryScale = interpolate(entrySpring, [0, 1], [2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // Add breathing during stable display
  const breathe = entrySpring > 0.9 && exitProgress < 0.1
    ? 1 + Math.sin(frame * 0.08) * 0.015
    : 1;
  const scale = entryScale * exitScale * breathe;

  // Opacity - faster fade-in for snappier entry
  const entryOpacity = interpolate(entrySpring, [0, 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = entryOpacity * exitOpacity;

  // Count up the number with easing for natural deceleration
  const countProgress = interpolate(
    frame,
    [startFrame, startFrame + 25],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    }
  );
  const displayValue = (value * countProgress).toFixed(decimals);

  // CONTINUOUS: Glow pulse while visible
  const glowPulse = 1 + Math.sin(frame * 0.15) * 0.4;

  // CONTINUOUS: Subtle shake/vibration for intensity
  const shake = Math.sin(frame * 0.5) * 2;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale}) translateX(${shake}px)`,
        opacity,
      }}
    >
      {/* Big number */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 280,
          fontWeight: 800,
          color: COLORS.accent,
          textShadow: `
            0 0 ${30 * glowPulse}px ${COLORS.glow.pink},
            0 0 ${80 * glowPulse}px ${COLORS.glow.pink},
            0 0 ${150 * glowPulse}px ${COLORS.glow.pink}
          `,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        {displayValue}
        <span style={{ fontSize: 140 * (0.85 + countProgress * 0.15), marginLeft: 12 }}>{suffix}</span>
      </div>

      {/* Label with emoji */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.muted,
          letterSpacing: '0.25em',
          marginTop: 32,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        {emoji && (
          <span
            style={{
              fontSize: 60,
              filter: `drop-shadow(0 0 15px ${COLORS.glow.pink})`,
              transform: `scale(${1 + Math.sin(frame * 0.15) * 0.1}) rotate(${Math.sin(frame * 0.1) * 5}deg)`,
            }}
          >
            {emoji}
          </span>
        )}
        {label}
        {emoji && (
          <span
            style={{
              fontSize: 60,
              filter: `drop-shadow(0 0 15px ${COLORS.glow.pink})`,
              transform: `scale(${1 + Math.sin(frame * 0.15) * 0.1}) rotate(${Math.sin(frame * 0.1) * -5}deg)`,
            }}
          >
            {emoji}
          </span>
        )}
      </div>
    </AbsoluteFill>
  );
};

// "AI Slop - Word of 2025" badge with image on left, text on right
const WordBadge: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;

  // Image slides in from left
  const imageSpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const imageX = interpolate(imageSpring, [0, 1], [-400, 0], {
    extrapolateRight: 'clamp',
  });

  const imageOpacity = interpolate(imageSpring, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Badge slides in from right (staggered)
  const badgeSpring = spring({
    frame: frame - startFrame - 8,
    fps,
    config: SPRINGS.bounce,
  });

  const badgeX = interpolate(badgeSpring, [0, 1], [300, 0], {
    extrapolateRight: 'clamp',
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 0.3], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const badgeScale = interpolate(badgeSpring, [0, 1], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Badge glow pulse
  const glowPulse = 1 + Math.sin(frame * 0.12) * 0.5;

  // CONTINUOUS: Subtle wobble on badge
  const wobble = Math.sin(frame * 0.08) * 2;

  // CONTINUOUS: Image float
  const imageFloat = Math.sin(frame * 0.06) * 8;
  const imageRotate = Math.sin(frame * 0.04) * 3;

  // CONTINUOUS: Scale pulse
  const scalePulse = 1 + Math.sin(frame * 0.1) * 0.02;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        padding: '0 100px',
      }}
    >
      {/* Left side: Buzz Lightyear "sameness" image - natural aspect ratio */}
      <div
        style={{
          transform: `translateX(${imageX}px) translateY(${imageFloat}px) rotate(${imageRotate}deg)`,
          opacity: imageOpacity,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `
            0 0 60px rgba(255, 51, 102, 0.4),
            0 20px 60px rgba(0, 0, 0, 0.5)
          `,
          border: '4px solid rgba(255, 51, 102, 0.6)',
          flexShrink: 0,
        }}
      >
        <Img
          src={staticFile('promo-assets/seq2-slop.jpeg')}
          style={{
            height: 480,
            width: 'auto',
          }}
        />
      </div>

      {/* Right side: AI SLOP badge */}
      <div
        style={{
          transform: `translateX(${badgeX}px) scale(${badgeScale * scalePulse}) rotate(${wobble}deg)`,
          opacity: badgeOpacity,
          backgroundColor: COLORS.accent,
          padding: '50px 90px',
          borderRadius: 28,
          boxShadow: `
            0 0 ${80 * glowPulse}px ${COLORS.glow.pink},
            0 0 ${150 * glowPulse}px ${COLORS.glow.pink},
            0 30px 80px rgba(0, 0, 0, 0.6)
          `,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 38,
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.95)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 16,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          Word of the Year 2025
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 120,
            fontWeight: 900,
            color: COLORS.text,
            textAlign: 'center',
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em',
          }}
        >
          "AI SLOP"
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.75)',
            textAlign: 'center',
            marginTop: 16,
            letterSpacing: '0.03em',
          }}
        >
          If you're shipping slop, you're cooked.
        </div>
      </div>
    </AbsoluteFill>
  );
};
