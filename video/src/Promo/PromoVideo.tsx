import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

import { TrapScene } from './scenes/TrapScene';
import { SlopStats } from './scenes/SlopStats';
import { HierarchyScene } from './scenes/HierarchyScene';
import { MultiplierScene } from './scenes/MultiplierScene';
import { CTAScene } from './scenes/CTAScene';
import { SCENES, TRANSITIONS } from './config';
import { COLORS } from './styles/colors';

// Import grain overlay from MBM (reuse)
import { GrainOverlay } from '../MBM/components/GrainOverlay';

/**
 * PromoVideo - 15 second flash promo
 *
 * "Vibe coding won't make your product stand out. Here's what will."
 *
 * Scene Flow:
 * 1. Trap (0-2.5s) - "$20/month → slop" with glitch
 * 2. Stats (2.5-5s) - 82%, 2.3x, Word of 2025
 * 3. Hierarchy (5-8.5s) - Podium blocks
 * 4. Multiplier (8.5-12s) - SPEED × QUALITY × VOLUME = 🚀
 * 5. CTA (12-15s) - "Stop hoping. Start multiplying."
 *
 * Transitions:
 * - Trap → Stats: flash (8 frames)
 * - Stats → Hierarchy: wipe from-left (10 frames)
 * - Hierarchy → Multiplier: slide from-right (10 frames)
 * - Multiplier → CTA: fade (10 frames)
 */
export const PromoVideo: React.FC = () => {
  // Calculate scene durations accounting for transition overlaps
  const sceneDurations = {
    trap: SCENES.trap.duration + Math.floor(TRANSITIONS.flash / 2),
    stats: SCENES.stats.duration + Math.floor((TRANSITIONS.flash + TRANSITIONS.wipe) / 2),
    hierarchy: SCENES.hierarchy.duration + Math.floor((TRANSITIONS.wipe + TRANSITIONS.slide) / 2),
    multiplier: SCENES.multiplier.duration + Math.floor((TRANSITIONS.slide + TRANSITIONS.fade) / 2),
    cta: SCENES.cta.duration + Math.floor(TRANSITIONS.fade / 2),
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene sequence with transitions */}
      <TransitionSeries>
        {/* Scene 1: THE TRAP */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.trap}>
          <TrapScene />
        </TransitionSeries.Sequence>

        {/* Transition: Trap → Stats (flash fade, 8 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.flash })}
        />

        {/* Scene 2: SLOP STATS */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.stats}>
          <SlopStats />
        </TransitionSeries.Sequence>

        {/* Transition: Stats → Hierarchy (wipe from-left, 10 frames) */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-left' })}
          timing={linearTiming({ durationInFrames: TRANSITIONS.wipe })}
        />

        {/* Scene 3: THE HIERARCHY */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.hierarchy}>
          <HierarchyScene />
        </TransitionSeries.Sequence>

        {/* Transition: Hierarchy → Multiplier (slide from-right, 10 frames, spring) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={springTiming({
            config: { damping: 20, stiffness: 200 },
            durationInFrames: TRANSITIONS.slide,
          })}
        />

        {/* Scene 4: THE MULTIPLIER */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.multiplier}>
          <MultiplierScene />
        </TransitionSeries.Sequence>

        {/* Transition: Multiplier → CTA (fade, 10 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.fade })}
        />

        {/* Scene 5: CTA (two phases with internal slide transition) */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Persistent grain overlay - adds film texture */}
      <GrainOverlay opacity={0.03} />
    </AbsoluteFill>
  );
};
