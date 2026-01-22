import React from 'react';
import { useCurrentFrame, random, interpolate } from 'remotion';
import { COLORS } from '../styles/colors';

interface ConfettiProps {
  startFrame?: number;
  duration?: number;
  particleCount?: number;
  colors?: string[];
  spread?: number;
  seed?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  velocityX: number;
  velocityY: number;
  color: string;
  delay: number;
}

/**
 * Celebratory confetti particles for success/achievement moments
 */
export const Confetti: React.FC<ConfettiProps> = ({
  startFrame = 0,
  duration = 60,
  particleCount = 30,
  colors = [COLORS.gold, COLORS.lightGreen, COLORS.cream, COLORS.darkGreen],
  spread = 400,
  seed = 'confetti',
}) => {
  const frame = useCurrentFrame();

  // Generate particles with deterministic randomness
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => {
      const particleSeed = `${seed}-${i}`;
      return {
        x: random(particleSeed + '-x') * spread - spread / 2,
        y: random(particleSeed + '-y') * -200 - 50,
        size: 4 + random(particleSeed + '-size') * 8,
        rotation: random(particleSeed + '-rot') * 360,
        rotationSpeed: (random(particleSeed + '-rotSpeed') - 0.5) * 20,
        velocityX: (random(particleSeed + '-vx') - 0.5) * 8,
        velocityY: random(particleSeed + '-vy') * 3 + 2,
        color: colors[Math.floor(random(particleSeed + '-color') * colors.length)],
        delay: random(particleSeed + '-delay') * 15,
      };
    });
  }, [particleCount, colors, spread, seed]);

  const elapsed = frame - startFrame;

  // Don't render before start or after duration
  if (elapsed < 0 || elapsed > duration + 30) {
    return null;
  }

  // Overall opacity fade out at the end
  const overallOpacity = interpolate(
    elapsed,
    [duration - 20, duration],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        opacity: overallOpacity,
      }}
    >
      {particles.map((particle, i) => {
        const particleElapsed = elapsed - particle.delay;
        if (particleElapsed < 0) return null;

        // Physics simulation
        const gravity = 0.15;
        const x = particle.x + particle.velocityX * particleElapsed;
        const y =
          particle.y +
          particle.velocityY * particleElapsed +
          0.5 * gravity * particleElapsed * particleElapsed;
        const rotation = particle.rotation + particle.rotationSpeed * particleElapsed;

        // Fade in quickly
        const opacity = interpolate(particleElapsed, [0, 5], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: particle.size,
              height: particle.size * 0.6,
              backgroundColor: particle.color,
              borderRadius: 2,
              transform: `rotate(${rotation}deg)`,
              opacity,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * Sparkle particles (smaller, more subtle than confetti)
 */
export const Sparkles: React.FC<{
  startFrame?: number;
  count?: number;
  color?: string;
  spread?: number;
  seed?: string;
}> = ({
  startFrame = 0,
  count = 8,
  color = COLORS.gold,
  spread = 100,
  seed = 'sparkle',
}) => {
  const frame = useCurrentFrame();

  const sparkles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const s = `${seed}-${i}`;
      return {
        x: (random(s + '-x') - 0.5) * spread,
        y: (random(s + '-y') - 0.5) * spread,
        size: 2 + random(s + '-size') * 4,
        delay: random(s + '-delay') * 20,
        duration: 15 + random(s + '-dur') * 15,
      };
    });
  }, [count, spread, seed]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {sparkles.map((sparkle, i) => {
        const elapsed = frame - startFrame - sparkle.delay;
        if (elapsed < 0) return null;

        // Twinkle: fade in, fade out
        const opacity = interpolate(
          elapsed,
          [0, sparkle.duration * 0.3, sparkle.duration * 0.7, sparkle.duration],
          [0, 1, 1, 0],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        const scale = interpolate(
          elapsed,
          [0, sparkle.duration * 0.5, sparkle.duration],
          [0.5, 1, 0.5],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${sparkle.x}px)`,
              top: `calc(50% + ${sparkle.y}px)`,
              width: sparkle.size,
              height: sparkle.size,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 ${sparkle.size * 2}px ${color}`,
              transform: `scale(${scale})`,
              opacity,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}
    </div>
  );
};
