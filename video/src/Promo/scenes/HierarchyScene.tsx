import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from 'remotion';
import { SPRINGS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';

// Dark Souls epic background - "AI for more" vs "AI for less"
const EpicBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry animation
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const opacity = interpolate(entrySpring, [0, 1], [0, 0.45], {
    extrapolateRight: 'clamp',
  });

  // Parallax breathing sync
  const parallaxY = Math.sin(frame * 0.05) * 12;

  // Slow zoom over scene duration
  const bgScale = 1 + frame * 0.0004;

  // Glow pulse sync
  const glowOpacity = 0.5 + Math.sin(frame * 0.08) * 0.15;

  return (
    <AbsoluteFill
      style={{
        opacity,
        overflow: 'hidden',
      }}
    >
      <Img
        src={staticFile('promo-assets/seq3-hierarchy.png')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `scale(${bgScale}) translateY(${parallaxY}px)`,
        }}
      />
      {/* Dark overlay gradient - darker at bottom for podium contrast */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg,
            rgba(10,10,15,${0.4 + glowOpacity * 0.2}) 0%,
            rgba(10,10,15,0.85) 60%,
            rgba(10,10,15,0.95) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Scene 3: THE HIERARCHY (150-255 frames / 5-8.5s)
 *
 * 3 stacked blocks rising like a podium - CENTERED
 * "Not AI first. AI on top."
 * CONTINUOUS DOPAMINE: floating particles, pulsing blocks, breathing glow
 */

const BLOCKS = [
  { rank: 1, label: 'EXPERT/AGENCY', color: '#FFD700', height: 340 },
  { rank: 2, label: 'SPECIALIZED TOOLS', color: '#C0C0C0', height: 240 },
  { rank: 3, label: 'AI AS LEVERAGE', color: '#CD7F32', height: 170 },
];

// Rising spark particle
const RisingSpark: React.FC<{
  x: number;
  delay: number;
  color: string;
  speed: number;
}> = ({ x, delay, color, speed }) => {
  const frame = useCurrentFrame();

  const cycleLength = 120;
  const adjustedFrame = (frame + delay) % cycleLength;
  const progress = adjustedFrame / cycleLength;

  // Rise from bottom to top
  const y = 100 - (progress * 110);
  const opacity = Math.sin(progress * Math.PI) * 0.8;
  const size = 4 + Math.sin((frame + delay) * 0.2) * 2;

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
        opacity,
        boxShadow: `0 0 ${size * 3 * (1 + Math.sin(frame * 0.08 + delay) * 0.4)}px ${color}`,
      }}
    />
  );
};

// Orbiting dot around podium
const OrbitingDot: React.FC<{
  radius: number;
  speed: number;
  delay: number;
  color: string;
  size: number;
}> = ({ radius, speed, delay, color, size }) => {
  const frame = useCurrentFrame();

  const angle = (frame + delay) * speed;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius * 0.3; // Elliptical orbit

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '58%',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        transform: `translate(${x}px, ${y}px)`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        opacity: 0.8,
      }}
    />
  );
};

// Crown emoji that drops onto the gold podium
const CrownEmoji: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Delay the crown appearance
  const startFrame = 15;
  if (frame < startFrame) return null;

  const entrySpring = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  // Drop from above
  const y = interpolate(entrySpring, [0, 1], [-150, 0], {
    extrapolateRight: 'clamp',
  });

  // Scale bounce - reduced overshoot for cleaner motion
  const scale = interpolate(entrySpring, [0, 0.5, 1], [0.3, 1.15, 1], {
    extrapolateRight: 'clamp',
  });

  // Rotation on entry
  const rotate = interpolate(entrySpring, [0, 1], [-30, 0], {
    extrapolateRight: 'clamp',
  });

  // Continuous floating and wobble after landing - synced to scene frequency
  const floatY = Math.sin(frame * 0.08) * 8;
  const wobble = Math.sin(frame * 0.08 + 0.5) * 4;
  // Remove conflicting pulse - let float breathe alone

  return (
    <div
      style={{
        position: 'absolute',
        top: -80,
        left: '50%',
        transform: `translateX(-50%) translateY(${y + floatY}px) scale(${scale}) rotate(${rotate + wobble}deg)`,
        fontSize: 100,
        filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8)) drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
        zIndex: 10,
      }}
    >
      👑
    </div>
  );
};

export const HierarchyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tagline animation
  const taglineSpring = spring({
    frame: frame - 50,
    fps,
    config: SPRINGS.text,
  });

  const taglineOpacity = interpolate(taglineSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineY = interpolate(taglineSpring, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Continuous breathing effect for the whole scene
  const breathe = 1 + Math.sin(frame * 0.08) * 0.03;

  // Continuous text glow pulse - synced to breathing frequency
  const glowIntensity = 1 + Math.sin(frame * 0.08) * 0.4;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Gradient background */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)',
        }}
      />

      {/* Dark Souls epic background - "AI for more" vs "AI for less" */}
      <EpicBackground />

      {/* Radial highlight - breathing */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(${800 * breathe}px ${600 * breathe}px at 50% 55%, rgba(255, 215, 0, 0.15), transparent)`,
        }}
      />

      {/* Rising sparks from podium */}
      <RisingSpark x={42} delay={0} color="#FFD700" speed={0.08} />
      <RisingSpark x={50} delay={20} color="#FFD700" speed={0.07} />
      <RisingSpark x={58} delay={40} color="#FFD700" speed={0.09} />
      <RisingSpark x={45} delay={60} color="#C0C0C0" speed={0.075} />
      <RisingSpark x={55} delay={80} color="#C0C0C0" speed={0.085} />
      <RisingSpark x={48} delay={100} color="#CD7F32" speed={0.08} />
      <RisingSpark x={52} delay={30} color="#CD7F32" speed={0.07} />

      {/* Orbiting dots around the podium */}
      <OrbitingDot radius={280} speed={0.03} delay={0} color="#FFD700" size={8} />
      <OrbitingDot radius={320} speed={-0.025} delay={30} color="#C0C0C0" size={6} />
      <OrbitingDot radius={260} speed={0.035} delay={60} color="#CD7F32" size={7} />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Tagline at top */}
        <div
          style={{
            marginBottom: 80,
            textAlign: 'center',
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 48,
              fontWeight: 500,
              color: COLORS.muted,
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            The hierarchy that works
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.primary,
              textShadow: `
                0 0 ${30 * glowIntensity}px ${COLORS.glow.green},
                0 0 ${60 * glowIntensity}px ${COLORS.glow.green},
                0 0 ${100 * glowIntensity}px ${COLORS.glow.green}
              `,
              letterSpacing: '-0.02em',
            }}
          >
            AI is leverage, not magic.
          </div>
        </div>

        {/* Podium blocks - ordered 2nd, 1st, 3rd for podium effect */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 40,
            position: 'relative',
          }}
        >
          <PodiumBlock {...BLOCKS[1]} delay={5} />
          <PodiumBlock {...BLOCKS[0]} delay={0} isGold />
          <PodiumBlock {...BLOCKS[2]} delay={10} />

          {/* Crown emoji above the gold podium */}
          <CrownEmoji />
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

const PodiumBlock: React.FC<{
  rank: number;
  label: string;
  color: string;
  height: number;
  delay: number;
  isGold?: boolean;
}> = ({ rank, label, color, height, delay, isGold = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered spring configs by rank for visual hierarchy
  const springConfig = isGold
    ? { damping: 10, stiffness: 200 }   // Gold: snappy, authoritative
    : rank === 2
    ? { damping: 8, stiffness: 150 }    // Silver: balanced
    : { damping: 12, stiffness: 130 };  // Bronze: slower, anticipatory

  const entrySpring = spring({
    frame: frame - delay,
    fps,
    config: springConfig,
  });

  const scaleY = interpolate(entrySpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entrySpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // CONTINUOUS: Glow pulse synced to scene breathing (0.08 base)
  const glowPulse = isGold
    ? 1 + Math.sin(frame * 0.08) * 0.6
    : 1 + Math.sin(frame * 0.08 + delay * 0.1) * 0.4;

  // CONTINUOUS: Subtle floating motion
  const floatY = Math.sin(frame * 0.08 + delay) * 5;

  // CONTINUOUS: Subtle rotation wobble
  const wobble = Math.sin(frame * 0.06 + delay * 2) * 1.5;

  // CONTINUOUS: Scale pulse for gold block
  const scalePulse = isGold ? 1 + Math.sin(frame * 0.1) * 0.02 : 1;

  // Shine effect with ease-in-out motion
  const shineCycle = (frame + delay * 10) % 120;
  const shineEased = Math.sin((shineCycle / 120) * Math.PI - Math.PI / 2) * 0.5 + 0.5;
  const shinePos = shineEased;
  const shineOpacity = 0.25 + Math.sin(frame * 0.08) * 0.1;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        opacity,
        transform: `translateY(${floatY}px) rotate(${wobble}deg) scale(${scalePulse})`,
      }}
    >
      {/* Block */}
      <div
        style={{
          position: 'relative',
          width: isGold ? 260 : 200,
          height: height * scaleY,
          backgroundColor: color,
          borderRadius: 24,
          boxShadow: `
            0 0 ${50 * glowPulse}px ${color}70,
            0 0 ${100 * glowPulse}px ${color}50,
            0 0 ${150 * glowPulse}px ${color}30,
            0 ${25 + Math.sin(frame * 0.08) * 3}px ${80 + Math.sin(frame * 0.08) * 10}px rgba(0,0,0,${0.5 + Math.sin(frame * 0.08) * 0.1})
          `,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 28,
          transformOrigin: 'bottom',
          overflow: 'hidden',
        }}
      >
        {/* Shine sweep effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: `${shinePos * 150 - 50}%`,
            width: '30%',
            height: '100%',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${shineOpacity}), transparent)`,
            transform: 'skewX(-20deg)',
          }}
        />
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: isGold ? 88 : 68,
            fontWeight: 800,
            color: COLORS.background,
            opacity: scaleY > 0.5 ? 1 : 0,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {rank}
        </div>
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontSize: isGold ? 32 : 26,
          fontWeight: 700,
          color: COLORS.text,
          textAlign: 'center',
          letterSpacing: '0.12em',
          opacity: scaleY > 0.3
            ? interpolate(scaleY, [0.3, 0.7], [0, 1], { extrapolateRight: 'clamp' })
            : 0,
          textShadow: `0 0 ${20 * glowPulse}px ${color}80`,
        }}
      >
        {label}
      </div>
    </div>
  );
};
