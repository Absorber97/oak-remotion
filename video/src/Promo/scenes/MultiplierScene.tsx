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

/**
 * Scene 4: THE MULTIPLIER (330-480 frames / 11-16s)
 *
 * 3D Camera Journey:
 * - 0-55: Station 1 - SPEED × QUALITY × VOLUME = 🚀 (centered)
 * - 55-85: Camera travels right → showcase
 * - 85-100: Showcase visible (brief moment)
 * - 100-150: Cinematic zoom IN with:
 *   - Parallax: mobile zooms faster than website (depth)
 *   - Drift: slight upward movement
 *   - Glow: intensifies during zoom
 *   - Flash: white brightness at the end
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

  // ===========================================
  // CAMERA PROGRESS (3D journey - HORIZONTAL)
  // ===========================================

  // Camera movement: text → showcase (frames 55-85)
  const cameraProgress = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // World position: moves LEFT as camera moves RIGHT
  const worldX = cameraProgress * -2000;

  // ===========================================
  // ELEMENT VISIBILITY & SCALE
  // ===========================================

  // Text fades out during camera move
  const textOpacity = interpolate(cameraProgress, [0.3, 0.8], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Showcase fades in as camera approaches (no gap)
  const showcaseOpacity = interpolate(cameraProgress, [0.5, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Showcase scale: grows as camera approaches
  const showcaseScale = interpolate(cameraProgress, [0, 1], [0.7, 1], {
    extrapolateRight: 'clamp',
  });

  // ===========================================
  // CONTINUOUS MOTION (polish)
  // ===========================================

  // Background breathing
  const breathe = 1 + Math.sin(frame * 0.06) * 0.05;

  // Website float while visible
  const websiteFloat = Math.sin(frame * 0.06) * 8;

  // Mobile float with slight offset
  const mobileFloat = Math.sin(frame * 0.05 + 20) * 10;
  const mobileRotate = Math.sin(frame * 0.04) * 2;
  const mobilePulse = 1 + Math.sin(frame * 0.1) * 0.02;

  // ===========================================
  // EQUATION ANIMATION TIMING
  // ===========================================

  const parts = [
    { text: 'SPEED', color: COLORS.primary, delay: 0 },
    { text: '×', color: COLORS.text, delay: 8, isOp: true },
    { text: 'QUALITY', color: COLORS.gold, delay: 14 },
    { text: '×', color: COLORS.text, delay: 22, isOp: true },
    { text: 'VOLUME', color: COLORS.accent, delay: 28 },
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

  // Rocket continuous motion
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

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Dynamic gradient - breathing (FIXED, doesn't move with world) */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(${700 * breathe}px ${500 * breathe}px at 30% 40%, rgba(0, 255, 136, 0.15), transparent),
            radial-gradient(${600 * breathe}px ${450 * breathe}px at 70% 60%, rgba(255, 215, 0, 0.12), transparent)
          `,
        }}
      />

      {/* Sparkle particles (FIXED) */}
      <Spark x={10} y={30} delay={0} color={COLORS.primary} />
      <Spark x={90} y={25} delay={5} color={COLORS.gold} />
      <Spark x={15} y={70} delay={10} color={COLORS.accent} />
      <Spark x={85} y={75} delay={15} color={COLORS.primary} />
      <Spark x={5} y={50} delay={20} color={COLORS.gold} />
      <Spark x={95} y={50} delay={25} color={COLORS.accent} />
      <Spark x={20} y={20} delay={3} color={COLORS.primary} />
      <Spark x={80} y={80} delay={8} color={COLORS.gold} />

      {/* ===========================================
          3D WORLD CONTAINER (HORIZONTAL CAMERA)
          =========================================== */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          perspective: 2000,
          perspectiveOrigin: '50% 50%',
          overflow: 'hidden',
        }}
      >
        {/* World that moves LEFT as camera moves RIGHT */}
        <div
          style={{
            position: 'absolute',
            width: 4000,
            height: '100%',
            transform: `translateX(${worldX}px)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ===========================================
              STATION 1: TEXT (X: 0)
              =========================================== */}
          <div
            style={{
              position: 'absolute',
              left: 960, // Center of 1920 viewport
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: textOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
                opacity: subtitleOpacity * textOpacity,
                letterSpacing: '0.08em',
                textShadow: `0 0 ${20 + Math.sin(frame * 0.1) * 10}px ${COLORS.glow.green}`,
              }}
            >
              Same effort, 10× more results
            </div>
          </div>

          {/* ===========================================
              STATION 2: SHOWCASE (X: 2000)
              Website + Mobile together
              =========================================== */}
          <div
            style={{
              position: 'absolute',
              left: 2000 + 960, // 2000 offset + center
              top: '50%',
              transform: `translate(-50%, -50%) scale(${showcaseScale})`,
              opacity: showcaseOpacity,
              display: 'flex',
              gap: 50,
              alignItems: 'center',
            }}
          >
            {/* Website on left */}
            <div
              style={{
                transform: `translateY(${websiteFloat}px)`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Img
                src={staticFile('promo-assets/seq4-before-after.jpeg')}
                style={{
                  width: 800,
                  height: 'auto',
                }}
              />
            </div>

            {/* Mobile on right */}
            <div
              style={{
                transform: `translateY(${mobileFloat}px) rotate(${mobileRotate}deg) scale(${mobilePulse})`,
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(0, 255, 136, 0.15), 0 20px 60px rgba(0, 0, 0, 0.4)',
              }}
            >
              <Img
                src={staticFile('promo-assets/seq4-apps.jpeg')}
                style={{
                  width: 700,
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vignette (FIXED) */}
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
