'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  once?: boolean;
}

export function CountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  once = true,
}: CountUpProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once });
  const hasStarted = useRef(false);

  const { value, start: startCount } = useCountUp({
    end,
    start,
    duration: shouldReduceMotion ? 0 : duration,
    decimals,
    suffix,
    prefix,
  });

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      startCount();
    }
  }, [isInView, startCount]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${end}${suffix}`}>
      {value}
    </span>
  );
}

export default CountUp;
