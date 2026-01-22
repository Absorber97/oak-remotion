import React from 'react';
import { AbsoluteFill, random } from 'remotion';

interface GrainOverlayProps {
  opacity?: number;
  seed?: string;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({
  opacity = 0.04,
  seed = 'grain',
}) => {
  // Generate unique ID for the filter
  const filterId = `grain-filter-${seed}`;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute' }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              seed={Math.floor(random(seed) * 100)}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect
          width="100%"
          height="100%"
          filter={`url(#${filterId})`}
          style={{ opacity }}
        />
      </svg>
    </AbsoluteFill>
  );
};
