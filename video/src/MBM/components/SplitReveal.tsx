import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
  staticFile,
  spring,
} from 'remotion';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';
import { SPRING_CONFIGS } from '../config';

interface SplitRevealProps {
  imageSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  revealDuration?: number;
  showHandle?: boolean;
  showSparkle?: boolean;
}

/**
 * Enhanced split reveal with:
 * - Pulsing handle during movement
 * - Sparkle effect along reveal line
 * - Smooth easing for reveal
 */
export const SplitReveal: React.FC<SplitRevealProps> = ({
  imageSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  revealDuration = 60,
  showHandle = true,
  showSparkle = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Reveal animation from left to right using clipPath
  const revealProgress = interpolate(frame, [0, revealDuration], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.quad),
  });

  // Handle pulsing while moving
  const handlePulse = Math.sin(frame * 0.3) * 0.15 + 1;
  const isMoving = revealProgress > 0 && revealProgress < 100;

  // Before label appears early with slide
  const beforeSpring = spring({
    frame: frame - 10,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const beforeOpacity = interpolate(beforeSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beforeX = interpolate(beforeSpring, [0, 1], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // After label appears as reveal completes with slide
  const afterSpring = spring({
    frame: frame - revealDuration,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const afterOpacity = interpolate(afterSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const afterX = interpolate(afterSpring, [0, 1], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Zoom effect on "After" when fully revealed
  const afterZoom = interpolate(
    frame,
    [revealDuration, revealDuration + 15],
    [1, 1.02],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const dividerX = `${100 - revealProgress}%`;

  // Sparkle positions along the reveal line
  const sparkles = showSparkle && isMoving
    ? [0.2, 0.4, 0.6, 0.8].map((pos, i) => {
        const sparkleOpacity = Math.sin((frame + i * 5) * 0.4) * 0.5 + 0.5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: dividerX,
              top: `${pos * 100}%`,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: COLORS.cream,
              boxShadow: `0 0 10px ${COLORS.cream}`,
              transform: 'translate(-50%, -50%)',
              opacity: sparkleOpacity,
              willChange: 'opacity',
            }}
          />
        );
      })
    : null;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Image with reveal effect */}
      <div
        style={{
          position: 'relative',
          width: '80%',
          height: '80%',
          overflow: 'hidden',
          borderRadius: 24,
          boxShadow: '0 16px 64px rgba(46, 75, 58, 0.2)',
          transform: revealProgress === 0 ? `scale(${afterZoom})` : undefined,
          willChange: 'transform',
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            clipPath: `inset(0 ${revealProgress}% 0 0)`,
          }}
        />

        {/* Center divider line */}
        <div
          style={{
            position: 'absolute',
            left: dividerX,
            top: 0,
            bottom: 0,
            width: 4,
            backgroundColor: COLORS.cream,
            boxShadow: `0 0 20px rgba(0,0,0,0.3), 0 0 40px ${COLORS.glow.cream}`,
            opacity: isMoving ? 1 : 0,
          }}
        />

        {/* Sparkle effects along the line */}
        {sparkles}

        {/* Handle with pulse */}
        {showHandle && (
          <div
            style={{
              position: 'absolute',
              left: dividerX,
              top: '50%',
              transform: `translate(-50%, -50%) scale(${isMoving ? handlePulse : 1})`,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: COLORS.cream,
              boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 ${isMoving ? 20 : 0}px ${COLORS.glow.cream}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isMoving ? 1 : 0,
              willChange: 'transform, opacity, box-shadow',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: COLORS.darkGreen,
              }}
            />
          </div>
        )}
      </div>

      {/* Before label with slide */}
      <div
        style={{
          position: 'absolute',
          left: '15%',
          top: '50%',
          transform: `translate(${beforeX}px, -50%)`,
          fontFamily: FONTS.sans,
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.cream,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: beforeOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          willChange: 'transform, opacity',
        }}
      >
        {beforeLabel}
      </div>

      {/* After label with slide */}
      <div
        style={{
          position: 'absolute',
          right: '15%',
          top: '50%',
          transform: `translate(${afterX}px, -50%)`,
          fontFamily: FONTS.sans,
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.cream,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          opacity: afterOpacity,
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          willChange: 'transform, opacity',
        }}
      >
        {afterLabel}
      </div>
    </div>
  );
};
