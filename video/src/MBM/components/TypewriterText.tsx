import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { FONTS } from '../styles/fonts';
import { COLORS } from '../styles/colors';

interface TypewriterTextProps {
  text: string;
  startFrame?: number;
  charFrames?: number;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  useSerif?: boolean;
  style?: React.CSSProperties;
}

/**
 * Character-by-character text reveal with optional blinking cursor
 * Creates a typewriter/terminal effect
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  startFrame = 0,
  charFrames = 2,
  showCursor = true,
  cursorBlinkSpeed = 15,
  fontSize = 48,
  fontWeight = 600,
  color = COLORS.text.primary,
  useSerif = false,
  style,
}) => {
  const frame = useCurrentFrame();

  // Calculate how many characters to show
  const elapsed = Math.max(0, frame - startFrame);
  const totalDuration = text.length * charFrames;
  const charCount = Math.min(
    text.length,
    Math.floor(elapsed / charFrames)
  );

  const displayedText = text.slice(0, charCount);

  // Cursor blinks after typing is complete
  const typingComplete = elapsed >= totalDuration;
  const cursorVisible = typingComplete
    ? Math.floor(frame / cursorBlinkSpeed) % 2 === 0
    : true;

  return (
    <div
      style={{
        fontFamily: useSerif ? FONTS.serif : FONTS.sans,
        fontSize,
        fontWeight,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <span
          style={{
            display: 'inline-block',
            width: fontSize * 0.5,
            height: fontSize * 0.9,
            backgroundColor: color,
            marginLeft: 2,
            opacity: cursorVisible ? 1 : 0,
            willChange: 'opacity',
          }}
        />
      )}
    </div>
  );
};

/**
 * Typewriter with fade-out cursor after completion
 */
export const TypewriterWithFade: React.FC<TypewriterTextProps & {
  cursorFadeDelay?: number;
  cursorFadeDuration?: number;
}> = ({
  cursorFadeDelay = 30,
  cursorFadeDuration = 15,
  ...props
}) => {
  const frame = useCurrentFrame();
  const { text, startFrame = 0, charFrames = 2 } = props;

  const totalDuration = text.length * charFrames;
  const typingEndFrame = startFrame + totalDuration;
  const fadeStartFrame = typingEndFrame + cursorFadeDelay;

  const cursorOpacity = interpolate(
    frame,
    [fadeStartFrame, fadeStartFrame + cursorFadeDuration],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Show cursor only if not fully faded
  const showCursor = cursorOpacity > 0;

  return <TypewriterText {...props} showCursor={showCursor} />;
};
