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
import { COLORS } from '../styles/colors';
import { FONTS } from '../styles/fonts';
import { FlashTransition } from '../components/FlashTransition';

/**
 * Scene 3: Slopidemic (210-300 frames, local 0-90)
 * Card stack + AI SLOP stamp
 *
 * Enhancements:
 * - White flash at scene start
 * - RGB glitch effect on cards
 * - Stamp slams in with bounce + rotation
 * - Cards slowly rotate in opposite directions
 */
export const Slopidemic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color transition (matcha green to dark)
  const bgColor = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Chaotic image zoom (bouncy spring)
  const imageSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.bouncy,
  });

  const imageScale = interpolate(imageSpring, [0, 1], [1.0, 1.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Slight shake effect
  const shakeX = Math.sin(frame * 0.5) * 3;
  const shakeY = Math.cos(frame * 0.7) * 2;

  // Text rapid entry
  const textOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // Stamp animation - slams in with bounce and rotation
  const stampSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 10, stiffness: 150 },
  });

  const stampScale = interpolate(stampSpring, [0, 1], [2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stampRotation = interpolate(stampSpring, [0, 1], [-15, -8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stampOpacity = interpolate(stampSpring, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Interpolate background color
  const backgroundColor = `rgb(${interpolate(bgColor, [0, 1], [46, 20])}, ${interpolate(bgColor, [0, 1], [75, 20])}, ${interpolate(bgColor, [0, 1], [58, 20])})`;

  // Cards with chaos rotation
  const cards = [
    { src: ASSETS.reactUi, baseRotate: -6, x: -340, y: -40, delay: 10, rotateDir: 1 },
    { src: ASSETS.generic3d, baseRotate: 3, x: 0, y: 10, delay: 20, rotateDir: -1 },
    { src: ASSETS.rollSafe, baseRotate: 6, x: 340, y: -30, delay: 30, rotateDir: 1 },
  ];

  // RGB glitch frames
  const glitchFrames = [15, 45, 75];
  const isGlitching = glitchFrames.some(gf => Math.abs(frame - gf) < 3);

  return (
    <AbsoluteFill>
      {/* Flash transition at scene start */}
      <FlashTransition startFrame={0} duration={5} intensity={0.8} />

      {/* Dynamic background */}
      <AbsoluteFill
        style={{
          backgroundColor,
        }}
      />

      {/* Buzz Lightyear shelf image with chaos */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile(ASSETS.buzzShelf)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${imageScale}) translate(${shakeX}px, ${shakeY}px)`,
            opacity: 0.7,
            willChange: 'transform',
          }}
        />
      </AbsoluteFill>

      {/* Center stack of "same" cards with rotation and glitch */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cards.map((card, index) => {
          const progress = spring({
            frame: frame - card.delay,
            fps,
            config: SPRING_CONFIGS.snappy,
          });

          const scale = interpolate(progress, [0, 1], [0.85, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const opacity = interpolate(progress, [0, 0.5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const translateY = interpolate(progress, [0, 1], [60, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Slow chaos rotation
          const chaosRotation = card.baseRotate + (frame * 0.02 * card.rotateDir);

          // RGB split for glitch effect
          const glitchOffset = isGlitching ? 4 : 0;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: 360,
                height: 240,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
                transform: `translate(${card.x}px, ${
                  card.y + translateY
                }px) rotate(${chaosRotation}deg) scale(${scale})`,
                opacity,
                willChange: 'transform, opacity',
              }}
            >
              {/* RGB glitch layers */}
              {isGlitching && (
                <>
                  <Img
                    src={staticFile(card.src)}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `translate(${-glitchOffset}px, 0)`,
                      mixBlendMode: 'screen',
                      opacity: 0.5,
                      filter: 'hue-rotate(-60deg)',
                    }}
                  />
                  <Img
                    src={staticFile(card.src)}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `translate(${glitchOffset}px, 0)`,
                      mixBlendMode: 'screen',
                      opacity: 0.5,
                      filter: 'hue-rotate(60deg)',
                    }}
                  />
                </>
              )}
              <Img
                src={staticFile(card.src)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* AI SLOP stamp with slam animation */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 60,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 22,
            fontWeight: 800,
            color: COLORS.cream,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: '2px solid rgba(246,242,233,0.8)',
            padding: '10px 16px',
            transform: `rotate(${stampRotation}deg) scale(${stampScale})`,
            backgroundColor: 'rgba(20,20,20,0.35)',
            opacity: stampOpacity,
            boxShadow: stampOpacity > 0.5 ? '0 4px 20px rgba(0,0,0,0.5)' : 'none',
            willChange: 'transform, opacity',
          }}
        >
          AI SLOP
        </div>
      </AbsoluteFill>

      {/* Chaotic text */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.cream,
            textAlign: 'center',
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
            willChange: 'transform, opacity',
          }}
        >
          Same layouts.
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.cream,
            textAlign: 'center',
            opacity: interpolate(frame, [25, 35], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          Same onboarding.
        </div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.cream,
            textAlign: 'center',
            opacity: interpolate(frame, [40, 50], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          Same everything.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
