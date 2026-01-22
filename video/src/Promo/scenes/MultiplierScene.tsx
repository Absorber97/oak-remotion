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
 * Scene 4: THE MULTIPLIER (255-360 frames / 8.5-12s)
 *
 * SPEED × QUALITY × VOLUME = 🚀
 * Big, centered, impactful
 * CONTINUOUS DOPAMINE: pulsing words, floating emoji, particle trails
 */

// Spark particle for continuous visual interest
const Spark: React.FC<{
  x: number;
  y: number;
  delay: number;
  color: string;
}> = ({ x, y, delay, color }) => {
  const frame = useCurrentFrame();

  // Continuous sparkle animation
  const sparkle = Math.sin((frame + delay * 10) * 0.2) * 0.5 + 0.5;
  const size = 4 + Math.sin((frame + delay * 5) * 0.15) * 2;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity: sparkle * 0.8,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        transform: `scale(${sparkle})`,
      }}
    />
  );
};

export const MultiplierScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Equation parts timing
  const parts = [
    { text: 'SPEED', color: COLORS.primary, delay: 0, emoji: '⚡' },
    { text: '×', color: COLORS.text, delay: 8, isOp: true },
    { text: 'QUALITY', color: COLORS.gold, delay: 14, emoji: '💎' },
    { text: '×', color: COLORS.text, delay: 22, isOp: true },
    { text: 'VOLUME', color: COLORS.accent, delay: 28, emoji: '📈' },
  ];

  // Rocket timing
  const rocketSpring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 10, stiffness: 80 },
  });

  const rocketY = interpolate(rocketSpring, [0, 1], [120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rocketOpacity = interpolate(rocketSpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rocketScale = interpolate(rocketSpring, [0, 0.5, 1], [0.3, 1.5, 1.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Rocket floating and wobbling
  const rocketFloat = Math.sin(frame * 0.1) * 15;
  const rocketWobble = Math.sin(frame * 0.15) * 5;
  const rocketGlow = 1 + Math.sin(frame * 0.2) * 0.3;

  // Subtitle timing
  const subtitleSpring = spring({
    frame: frame - 55,
    fps,
    config: SPRINGS.text,
  });

  const subtitleOpacity = interpolate(subtitleSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Background breathing
  const breathe = 1 + Math.sin(frame * 0.06) * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Dynamic gradient - breathing */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(${700 * breathe}px ${500 * breathe}px at 30% 40%, rgba(0, 255, 136, 0.15), transparent),
            radial-gradient(${600 * breathe}px ${450 * breathe}px at 70% 60%, rgba(255, 215, 0, 0.12), transparent)
          `,
        }}
      />

      {/* Sparkle particles */}
      <Spark x={10} y={30} delay={0} color={COLORS.primary} />
      <Spark x={90} y={25} delay={5} color={COLORS.gold} />
      <Spark x={15} y={70} delay={10} color={COLORS.accent} />
      <Spark x={85} y={75} delay={15} color={COLORS.primary} />
      <Spark x={5} y={50} delay={20} color={COLORS.gold} />
      <Spark x={95} y={50} delay={25} color={COLORS.accent} />
      <Spark x={20} y={20} delay={3} color={COLORS.primary} />
      <Spark x={80} y={80} delay={8} color={COLORS.gold} />

      {/* Main content - centered */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {/* Equation row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            flexWrap: 'wrap',
          }}
        >
          {parts.map((part, i) => (
            <EquationWord key={i} {...part} />
          ))}

          {/* Equals and rocket */}
          {frame >= 36 && (
            <>
              <EquationWord text="=" color={COLORS.text} delay={36} isOp />
              <div
                style={{
                  fontSize: 140,
                  transform: `translateY(${rocketY + rocketFloat}px) rotate(${rocketWobble}deg) scale(${rocketScale})`,
                  opacity: rocketOpacity,
                  filter: `
                    drop-shadow(0 0 ${30 * rocketGlow}px rgba(255, 200, 50, 0.9))
                    drop-shadow(0 0 ${60 * rocketGlow}px rgba(255, 150, 50, 0.6))
                  `,
                }}
              >
                🚀
              </div>
            </>
          )}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 32,
            fontWeight: 500,
            color: COLORS.primary,
            opacity: subtitleOpacity,
            letterSpacing: '0.08em',
            textShadow: `0 0 ${20 + Math.sin(frame * 0.1) * 10}px ${COLORS.glow.green}`,
          }}
        >
          Same effort, 10× more results
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

const EquationWord: React.FC<{
  text: string;
  color: string;
  delay: number;
  isOp?: boolean;
}> = ({ text, color, delay, isOp = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: isOp ? SPRINGS.smooth : SPRINGS.slam,
  });

  const scale = interpolate(entrySpring, [0, 1], [isOp ? 0.5 : 1.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entrySpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Pulse for operators, glow pulse for words
  const pulse = isOp
    ? 1 + Math.sin(frame * 0.25) * 0.15
    : 1 + Math.sin(frame * 0.12 + delay) * 0.08;

  // CONTINUOUS: Glow intensity animation
  const glowIntensity = 1 + Math.sin(frame * 0.15 + delay * 0.5) * 0.4;

  // CONTINUOUS: Subtle y float
  const floatY = isOp ? 0 : Math.sin(frame * 0.08 + delay) * 3;

  return (
    <div
      style={{
        fontFamily: FONTS.sans,
        fontSize: isOp ? 72 : 88,
        fontWeight: 900,
        color,
        textShadow: isOp ? 'none' : `
          0 0 ${20 * glowIntensity}px ${color},
          0 0 ${40 * glowIntensity}px ${color},
          0 0 ${80 * glowIntensity}px ${color}
        `,
        transform: `scale(${scale * pulse}) translateY(${floatY}px)`,
        opacity,
        letterSpacing: '-0.02em',
      }}
    >
      {text}
    </div>
  );
};
