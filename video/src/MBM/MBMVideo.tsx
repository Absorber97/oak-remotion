import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { GrainOverlay } from './components/GrainOverlay';
import { Hook } from './scenes/Hook';
import { Trap } from './scenes/Trap';
import { Slopidemic } from './scenes/Slopidemic';
import { Stats } from './scenes/Stats';
import { Hierarchy } from './scenes/Hierarchy';
import { MBMIntro } from './scenes/MBMIntro';
import { BeforeAfter } from './scenes/BeforeAfter';
import { Process } from './scenes/Process';
import { Result } from './scenes/Result';
import { SCENES, TRANSITIONS } from './config';

/**
 * MBMVideo - Main composition with premium scene transitions
 *
 * Transition Plan:
 * Hook → Trap: fade (15 frames, linear)
 * Trap → Slopidemic: slide from-bottom (12 frames, spring)
 * Slopidemic → Stats: fade (10 frames, linear) + flash overlay
 * Stats → Hierarchy: wipe (15 frames, ease-in-out)
 * Hierarchy → MBMIntro: fade (15 frames, linear)
 * MBMIntro → BeforeAfter: slide from-right (12 frames, spring)
 * BeforeAfter → Process: fade (12 frames, linear)
 * Process → Result: fade (10 frames, linear) + flash overlay
 *
 * Note: Transitions overlap scenes, total duration is adjusted accordingly.
 * Original: 900 frames
 * With transitions: 900 - (15+12+10+15+15+12+12+10) = 900 - 101 = 799 frames
 * We extend scene durations to maintain ~900 frame total
 */
export const MBMVideo: React.FC = () => {
  // Extended scene durations to compensate for transition overlaps
  // Each scene gets extra frames equal to half the transition on each side
  const sceneDurations = {
    hook: SCENES.hook.duration + Math.floor(TRANSITIONS.fade / 2),
    trap: SCENES.trap.duration + Math.floor((TRANSITIONS.fade + TRANSITIONS.slide) / 2),
    slopidemic: SCENES.slopidemic.duration + Math.floor((TRANSITIONS.slide + TRANSITIONS.fadeFlash) / 2),
    stats: SCENES.stats.duration + Math.floor((TRANSITIONS.fadeFlash + TRANSITIONS.wipe) / 2),
    hierarchy: SCENES.hierarchy.duration + Math.floor((TRANSITIONS.wipe + TRANSITIONS.fade) / 2),
    mbmIntro: SCENES.mbmIntro.duration + Math.floor((TRANSITIONS.fade + TRANSITIONS.slide) / 2),
    beforeAfter: SCENES.beforeAfter.duration + Math.floor((TRANSITIONS.slide + TRANSITIONS.fade) / 2),
    process: SCENES.process.duration + Math.floor((TRANSITIONS.fade + TRANSITIONS.fadeFlash) / 2),
    result: SCENES.result.duration + Math.floor(TRANSITIONS.fadeFlash / 2),
  };

  return (
    <AbsoluteFill>
      {/* Scene sequence with transitions */}
      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.hook}>
          <Hook />
        </TransitionSeries.Sequence>

        {/* Transition: Hook → Trap (fade, 15 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.fade })}
        />

        {/* Scene 2: Trap */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.trap}>
          <Trap />
        </TransitionSeries.Sequence>

        {/* Transition: Trap → Slopidemic (slide from-bottom, 12 frames, spring) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={springTiming({
            config: { damping: 20, stiffness: 200 },
            durationInFrames: TRANSITIONS.slide,
          })}
        />

        {/* Scene 3: Slopidemic */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.slopidemic}>
          <Slopidemic />
        </TransitionSeries.Sequence>

        {/* Transition: Slopidemic → Stats (fade, 10 frames) */}
        {/* Note: Flash is already in Slopidemic scene start */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.fadeFlash })}
        />

        {/* Scene 4: Stats */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.stats}>
          <Stats />
        </TransitionSeries.Sequence>

        {/* Transition: Stats → Hierarchy (wipe, 15 frames) */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-left' })}
          timing={linearTiming({ durationInFrames: TRANSITIONS.wipe })}
        />

        {/* Scene 5: Hierarchy */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.hierarchy}>
          <Hierarchy />
        </TransitionSeries.Sequence>

        {/* Transition: Hierarchy → MBMIntro (fade, 15 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.fade })}
        />

        {/* Scene 6: MBMIntro */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.mbmIntro}>
          <MBMIntro />
        </TransitionSeries.Sequence>

        {/* Transition: MBMIntro → BeforeAfter (slide from-right, 12 frames, spring) */}
        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={springTiming({
            config: { damping: 20, stiffness: 200 },
            durationInFrames: TRANSITIONS.slide,
          })}
        />

        {/* Scene 7: BeforeAfter */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.beforeAfter}>
          <BeforeAfter />
        </TransitionSeries.Sequence>

        {/* Transition: BeforeAfter → Process (fade, 12 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 12 })}
        />

        {/* Scene 8: Process */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.process}>
          <Process />
        </TransitionSeries.Sequence>

        {/* Transition: Process → Result (fade, 10 frames) */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITIONS.fadeFlash })}
        />

        {/* Scene 9: Result */}
        <TransitionSeries.Sequence durationInFrames={sceneDurations.result}>
          <Result />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Flash overlays for Slopidemic→Stats and Process→Result transitions */}
      {/* These are handled within the scenes themselves for precise timing */}

      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%)',
        }}
      />

      {/* Persistent grain overlay - renders on top of everything */}
      <GrainOverlay opacity={0.04} />
    </AbsoluteFill>
  );
};
