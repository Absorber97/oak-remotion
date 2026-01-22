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
import { FloatingLayer } from '../components/ParallaxLayer';
import { UnderlineReveal } from '../components/WordHighlight';

/**
 * Scene 6: MBM Intro (540-630 frames, local 0-90)
 * Side-by-side text + collage
 *
 * Enhancements:
 * - Image has subtle float effect
 * - "Maryam" has signature-style underline reveal
 * - Apple icon fades in with text
 * - Decorative matcha leaf accent
 */
export const MBMIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Image scale and opacity
  const imageSpring = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
  });

  const imageScale = interpolate(imageSpring, [0, 1], [0.9, 1.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Word-by-word reveal with enhanced styling
  const words = [
    { text: 'Maryam.', delay: 18, isName: true },
    { text: 'Apple engineer.', delay: 32, isName: false },
    { text: 'Matcha by Maryam.', delay: 48, isName: false },
  ];

  // Case study label animation
  const labelSpring = spring({
    frame: frame - 5,
    fps,
    config: SPRING_CONFIGS.snappy,
  });
  const labelOpacity = interpolate(labelSpring, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Apple icon fade
  const appleOpacity = interpolate(frame, [35, 48], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Decorative leaf animation
  const leafSpring = spring({
    frame: frame - 60,
    fps,
    config: SPRING_CONFIGS.gentle,
  });
  const leafOpacity = interpolate(leafSpring, [0, 0.5], [0, 0.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const leafY = interpolate(leafSpring, [0, 1], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Soft matcha background */}
      <AbsoluteFill style={{ backgroundColor: COLORS.softMatcha }} />

      {/* Decorative leaf accent */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: 80,
          fontSize: 48,
          opacity: leafOpacity,
          transform: `translateY(${leafY}px) rotate(15deg)`,
          willChange: 'transform, opacity',
        }}
      >
        🍃
      </div>

      {/* Layout: text left, image right */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 100,
          gap: 80,
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Case study label */}
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: COLORS.darkGreen,
              marginBottom: 24,
              opacity: labelOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Case Study
          </div>

          {/* Word reveals */}
          {words.map((word, index) => {
            const wordSpring = spring({
              frame: frame - word.delay,
              fps,
              config: SPRING_CONFIGS.text,
            });

            const opacity = interpolate(wordSpring, [0, 0.5], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const translateY = interpolate(wordSpring, [0, 1], [24, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={index}
                style={{
                  fontFamily: FONTS.serif,
                  fontSize: index === 2 ? 60 : 42,
                  fontWeight: index === 2 ? 700 : 500,
                  color: COLORS.darkGreen,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  willChange: 'transform, opacity',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                {/* Signature-style underline for name */}
                {word.isName ? (
                  <UnderlineReveal delay={word.delay + 10} color={COLORS.gold} thickness={3}>
                    {word.text}
                  </UnderlineReveal>
                ) : (
                  word.text
                )}

                {/* Apple icon after "Apple engineer" */}
                {index === 1 && (
                  <span
                    style={{
                      fontSize: 28,
                      opacity: appleOpacity,
                    }}
                  >

                  </span>
                )}
              </div>
            );
          })}

          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 22,
              fontWeight: 500,
              color: COLORS.dark,
              marginTop: 24,
              maxWidth: 520,
              lineHeight: 1.5,
              opacity: interpolate(frame, [55, 70], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            Events, content, products, and partnerships across the US and Canada.
          </div>
        </div>

        {/* Floating image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <FloatingLayer amplitude={8} frequency={0.04}>
            <Img
              src={staticFile(ASSETS.matchaCollage)}
              style={{
                width: '90%',
                height: 'auto',
                borderRadius: 28,
                boxShadow: '0 24px 80px rgba(46, 75, 58, 0.3)',
                transform: `scale(${imageScale})`,
                opacity: imageOpacity,
                willChange: 'transform, opacity',
              }}
            />
          </FloatingLayer>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
