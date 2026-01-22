import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface AnimatedNumberProps {
  from: number;
  to: number;
  startFrame: number;
  endFrame: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  useEasing?: boolean;
  tabularNums?: boolean;
}

/**
 * Enhanced animated number with:
 * - Easing.out(Easing.expo) for satisfying deceleration
 * - Intl.NumberFormat for proper locale formatting (commas, decimals)
 * - tabular-nums for stable character width
 */
export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  from,
  to,
  startFrame,
  endFrame,
  decimals = 0,
  prefix = '',
  suffix = '',
  locale = 'en-US',
  useEasing = true,
  tabularNums = true,
}) => {
  const frame = useCurrentFrame();

  // Use easeOutExpo for satisfying crescendo feel
  const value = interpolate(frame, [startFrame, endFrame], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: useEasing ? Easing.out(Easing.exp) : undefined,
  });

  // Use Intl.NumberFormat for proper locale formatting
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span
      style={{
        fontVariantNumeric: tabularNums ? 'tabular-nums' : undefined,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/**
 * Animated number with scale bounce at completion
 */
export const AnimatedNumberBounce: React.FC<AnimatedNumberProps & {
  bounceScale?: number;
  bounceDuration?: number;
}> = ({
  bounceScale = 1.1,
  bounceDuration = 10,
  endFrame,
  ...props
}) => {
  const frame = useCurrentFrame();

  // Bounce effect after number finishes
  const bounceStart = endFrame;
  const bounceEnd = endFrame + bounceDuration;

  const scale = interpolate(
    frame,
    [bounceStart, bounceStart + bounceDuration * 0.3, bounceEnd],
    [1, bounceScale, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.back(2)),
    }
  );

  return (
    <span
      style={{
        display: 'inline-block',
        transform: frame >= bounceStart ? `scale(${scale})` : undefined,
        willChange: frame >= bounceStart ? 'transform' : undefined,
      }}
    >
      <AnimatedNumber {...props} endFrame={endFrame} />
    </span>
  );
};

/**
 * Animated percentage with automatic % suffix
 */
export const AnimatedPercent: React.FC<Omit<AnimatedNumberProps, 'suffix'> & {
  showSign?: boolean;
}> = ({ showSign = false, from, ...props }) => {
  const prefix = showSign && from >= 0 ? '+' : '';
  return <AnimatedNumber {...props} from={from} prefix={prefix} suffix="%" />;
};
