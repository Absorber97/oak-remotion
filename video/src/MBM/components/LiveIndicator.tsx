import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../styles/colors';

interface LiveIndicatorProps {
  color?: string;
  size?: number;
  pulseSpeed?: number;
  label?: string;
  showLabel?: boolean;
}

/**
 * Pulsing dot indicator for "live" or active elements
 * Similar to recording/live stream indicators
 */
export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  color = COLORS.lightGreen,
  size = 12,
  pulseSpeed = 0.1,
  label = 'LIVE',
  showLabel = false,
}) => {
  const frame = useCurrentFrame();

  // Pulse animation: scale 1 → 1.3 → 1 with opacity cycle
  const pulseProgress = (Math.sin(frame * pulseSpeed) + 1) / 2;
  const scale = 1 + pulseProgress * 0.3;
  const glowOpacity = 0.3 + pulseProgress * 0.4;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Pulsing dot with glow */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        {/* Glow ring */}
        <div
          style={{
            position: 'absolute',
            inset: -size * 0.5,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: glowOpacity,
            transform: `scale(${scale})`,
            willChange: 'transform, opacity',
          }}
        />
        {/* Core dot */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: color,
          }}
        />
      </div>

      {/* Optional label */}
      {showLabel && (
        <span
          style={{
            fontSize: size * 0.9,
            fontWeight: 700,
            color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Activity indicator with multiple dots
 */
export const ActivityDots: React.FC<{
  color?: string;
  size?: number;
  count?: number;
  speed?: number;
}> = ({
  color = COLORS.lightGreen,
  size = 8,
  count = 3,
  speed = 0.15,
}) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: 'flex', gap: size * 0.8 }}>
      {Array.from({ length: count }).map((_, i) => {
        // Stagger the phase for each dot
        const phase = (frame * speed + i * (Math.PI * 2 / count));
        const scale = 0.6 + Math.sin(phase) * 0.4;
        const opacity = 0.4 + Math.sin(phase) * 0.6;

        return (
          <div
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: color,
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
