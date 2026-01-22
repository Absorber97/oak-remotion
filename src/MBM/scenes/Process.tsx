import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { SPRING_CONFIGS, ASSETS } from '../config';
import { COLORS, GRADIENTS } from '../styles/colors';
import { FONTS } from '../styles/fonts';
import { FloatingLayer } from '../components/ParallaxLayer';

/**
 * Scene 8: Process (720-810 frames, local 0-90)
 * App screens + process steps
 *
 * Enhancements:
 * - Numbered circles animate in
 * - Arrows draw in between steps
 * - App screens have subtle floating motion
 * - Checkmarks appear after each step
 */
export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image scale
  const imageSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const imageScale = interpolate(imageSpring, [0, 1], [0.95, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Process steps with enhanced animations
  const steps = [
    { label: 'Strategy', delay: 15, number: 1 },
    { label: 'Prototyping', delay: 35, number: 2 },
    { label: 'Build', delay: 55, number: 3 },
  ];

  const lineProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Cream background */}
      <AbsoluteFill style={{ background: GRADIENTS.cream }} />

      {/* App screens image with float */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FloatingLayer amplitude={6} frequency={0.03}>
          <Img
            src={staticFile(ASSETS.appScreens)}
            style={{
              width: '70%',
              height: 'auto',
              borderRadius: 24,
              boxShadow: '0 24px 80px rgba(46, 75, 58, 0.2)',
              transform: `scale(${imageScale})`,
              willChange: 'transform',
            }}
          />
        </FloatingLayer>
      </AbsoluteFill>

      {/* Process labels with numbers and checkmarks */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 80,
          gap: 80,
        }}
      >
        {steps.map((step, index) => {
          const stepSpring = spring({
            frame: frame - step.delay,
            fps,
            config: SPRING_CONFIGS.text,
          });

          const translateX = interpolate(stepSpring, [0, 1], [-30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(stepSpring, [0, 0.5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const dotScale = interpolate(stepSpring, [0, 1], [0.6, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Number circle animation
          const numberScale = interpolate(stepSpring, [0.3, 0.6], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Checkmark appears after step completes
          const checkOpacity = interpolate(
            frame,
            [step.delay + 25, step.delay + 35],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }
          );

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                  transform: `translateX(${translateX}px)`,
                  opacity,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Number circle */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: COLORS.darkGreen,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${numberScale})`,
                    willChange: 'transform',
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.cream,
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Step content */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: COLORS.darkGreen,
                      transform: `scale(${dotScale})`,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 24,
                      fontWeight: 600,
                      color: COLORS.darkGreen,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {step.label}
                  </div>

                  {/* Checkmark */}
                  <span
                    style={{
                      fontSize: 20,
                      opacity: checkOpacity,
                      color: COLORS.lightGreen,
                    }}
                  >
                    ✓
                  </span>
                </div>
              </div>

              {/* Arrow connector between steps */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}
                >
                  {/* Arrow line */}
                  <div
                    style={{
                      width: interpolate(
                        frame,
                        [step.delay + 15, step.delay + 25],
                        [0, 40],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                      ),
                      height: 2,
                      backgroundColor: COLORS.lightGreen,
                    }}
                  />
                  {/* Arrow head */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: `8px solid ${COLORS.lightGreen}`,
                      transform: 'rotate(90deg)',
                      opacity: interpolate(
                        frame,
                        [step.delay + 20, step.delay + 28],
                        [0, 1],
                        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                      ),
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </AbsoluteFill>

      {/* Progress line */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 120,
        }}
      >
        <div
          style={{
            width: 520,
            height: 4,
            backgroundColor: 'rgba(127,174,118,0.3)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.round(lineProgress * 100)}%`,
              height: '100%',
              backgroundColor: COLORS.darkGreen,
              borderRadius: 999,
            }}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
