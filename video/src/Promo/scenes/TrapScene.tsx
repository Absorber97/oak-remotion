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
import { NeonText } from '../components/NeonText';
import { GlitchText } from '../components/GlitchText';

// Central emoji that pops in with the main content
const CentralEmoji: React.FC<{ emoji: string; startFrame: number }> = ({ emoji, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) return null;

  const entrySpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 8, stiffness: 200 },
  });

  const scale = interpolate(entrySpring, [0, 1], [0, 1.2], {
    extrapolateRight: 'clamp',
  });

  const rotate = interpolate(entrySpring, [0, 1], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  // Continuous wobble after entry
  const wobble = Math.sin(frame * 0.15) * 8;
  const pulse = 1 + Math.sin(frame * 0.12) * 0.1;

  return (
    <div
      style={{
        fontSize: 80,
        transform: `scale(${scale * pulse}) rotate(${rotate + wobble}deg)`,
        filter: 'drop-shadow(0 0 20px rgba(255, 51, 102, 0.8))',
        marginLeft: 16,
      }}
    >
      {emoji}
    </div>
  );
};

/**
 * Scene 1: THE TRAP (0-75 frames / 0-2.5s)
 *
 * "You paid for AI magic" → flash → "But got slop"
 * Price tag animation, chains visual metaphor, glitchy reveal
 * CONTINUOUS DOPAMINE: pulsing price, floating chains, breathing glow
 */

// Floating dollar sign for visual interest
const FloatingDollar: React.FC<{
  x: number;
  y: number;
  delay: number;
  size: number;
}> = ({ x, y, delay, size }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: { damping: 100 },
  });

  // Continuous floating
  const floatY = Math.sin((frame + delay) * 0.06) * 25;
  const floatX = Math.cos((frame + delay) * 0.04) * 15;
  const rotate = Math.sin((frame + delay) * 0.05) * 20;
  const pulse = 1 + Math.sin((frame + delay) * 0.1) * 0.3;

  // Higher opacity for better visibility
  const baseOpacity = size > 80 ? 0.85 : size > 60 ? 0.75 : 0.65;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        fontFamily: FONTS.mono,
        fontSize: size,
        fontWeight: 900,
        color: COLORS.primary,
        opacity: entrySpring * baseOpacity,
        transform: `translate(${floatX}px, ${floatY}px) rotate(${rotate}deg) scale(${pulse})`,
        textShadow: `
          0 0 ${size * 0.4}px ${COLORS.glow.green},
          0 0 ${size * 0.8}px ${COLORS.glow.green},
          0 0 ${size * 1.2}px rgba(0, 255, 136, 0.5)
        `,
      }}
    >
      $
    </div>
  );
};

export const TrapScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CONTINUOUS: Background pulse
  const bgPulse = 1 + Math.sin(frame * 0.1) * 0.04;

  // Price tag spring in
  const priceSpring = spring({
    frame,
    fps,
    config: SPRINGS.bounce,
  });

  const priceScale = interpolate(priceSpring, [0, 1], [0.3, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const priceOpacity = interpolate(priceSpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Chain links animation (staggered)
  const chainLinks = [0, 1, 2, 3, 4].map((i) => {
    const linkSpring = spring({
      frame: frame - 15 - i * 4,
      fps,
      config: SPRINGS.text,
    });
    return interpolate(linkSpring, [0, 1], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  });

  // Text visibility
  const showFirstText = frame >= 5;
  const showSecondText = frame >= 45;

  // CONTINUOUS: Price glow pulse
  const priceGlow = 1 + Math.sin(frame * 0.15) * 0.4;

  // CONTINUOUS: Price wobble
  const priceWobble = Math.sin(frame * 0.08) * 2;

  // CONTINUOUS: Grid speed
  const gridY = frame * 0.5;

  // Price counting up from $20 to $2000 (extended for readability)
  const priceProgress = interpolate(frame, [0, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentPrice = Math.round(20 + priceProgress * 1980);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Radial glow background - breathing */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${700 * bgPulse}px ${500 * bgPulse}px at 50% 40%, rgba(0, 255, 136, 0.12), transparent)`,
        }}
      />

      {/* Animated grid lines */}
      <AbsoluteFill
        style={{
          background: `
            linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px),
            linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateY(${gridY}px)`,
          opacity: 0.5,
        }}
      />

      {/* Floating dollar signs - scattered around edges */}
      <FloatingDollar x={4} y={12} delay={0} size={90} />
      <FloatingDollar x={92} y={75} delay={4} size={80} />
      <FloatingDollar x={88} y={15} delay={8} size={70} />
      <FloatingDollar x={8} y={82} delay={2} size={85} />
      <FloatingDollar x={5} y={45} delay={6} size={75} />
      <FloatingDollar x={94} y={40} delay={10} size={70} />
      <FloatingDollar x={16} y={25} delay={3} size={65} />
      <FloatingDollar x={82} y={65} delay={7} size={75} />
      <FloatingDollar x={22} y={88} delay={5} size={60} />
      <FloatingDollar x={76} y={8} delay={9} size={55} />
      <FloatingDollar x={3} y={62} delay={1} size={50} />
      <FloatingDollar x={96} y={52} delay={11} size={60} />

      {/* Main content - single centered layout */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {/* Price tag */}
        <div
          style={{
            transform: `scale(${priceScale}) rotate(${priceWobble}deg)`,
            opacity: priceOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Price tag box */}
          <div
            style={{
              backgroundColor: 'rgba(0, 255, 136, 0.15)',
              border: `4px solid ${COLORS.primary}`,
              borderRadius: 24,
              padding: '36px 72px',
              boxShadow: `
                0 0 ${40 * priceGlow}px ${COLORS.glow.green},
                0 0 ${80 * priceGlow}px ${COLORS.glow.green},
                inset 0 0 40px rgba(0, 255, 136, 0.15)
              `,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 120,
                fontWeight: 800,
                color: COLORS.primary,
                textShadow: `
                  0 0 ${20 * priceGlow}px ${COLORS.glow.green},
                  0 0 ${40 * priceGlow}px ${COLORS.glow.green},
                  0 0 ${80 * priceGlow}px ${COLORS.glow.green}
                `,
              }}
            >
              ${currentPrice}<span style={{ fontSize: 56 }}>/mo</span>
            </div>
          </div>

          {/* Chain links emanating from price tag - with continuous motion */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              marginTop: -10,
            }}
          >
            {chainLinks.map((linkOpacity, i) => {
              const linkFloat = Math.sin(frame * 0.1 + i) * 3;
              const linkRotate = (i - 2) * 15 + Math.sin(frame * 0.08 + i) * 5;
              return (
                <div
                  key={i}
                  style={{
                    width: 32,
                    height: 48,
                    border: `4px solid ${COLORS.muted}`,
                    borderRadius: 16,
                    opacity: linkOpacity,
                    transform: `rotate(${linkRotate}deg) translateY(${linkFloat}px)`,
                    boxShadow: linkOpacity > 0.5 ? `0 0 10px ${COLORS.muted}40` : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Text container - stacked below price tag */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            minHeight: 150,
          }}
        >
          {/* First text: "You paid for AI magic" */}
          {showFirstText && (
            <NeonText
              text="You paid for AI magic"
              color={COLORS.text}
              glowColor={COLORS.glow.white}
              fontSize={64}
              fontWeight={600}
              delay={0}
              direction="up"
              distance={40}
              glowIntensity={0.6}
            />
          )}

          {/* Second text: "But got slop" with glitch */}
          {showSecondText && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
              }}
            >
              <NeonText
                text="But got"
                color={COLORS.muted}
                fontSize={56}
                fontWeight={500}
                delay={0}
                direction="left"
                distance={30}
                glowIntensity={0.3}
              />
              <GlitchText
                text="SLOP"
                delay={8}
                fontSize={96}
                fontWeight={900}
                glitchIntensity={2}
                glitchFrequency={0.5}
              />
              <CentralEmoji emoji="💩" startFrame={53} />
            </div>
          )}
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
