'use client';

import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  easing?: (t: number) => number;
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  suffix = '',
  prefix = '',
  easing = easeOutCubic,
}: UseCountUpOptions): { value: string; start: () => void; isRunning: boolean } {
  const [value, setValue] = useState<string>(`${prefix}${start.toFixed(decimals)}${suffix}`);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const run = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const current = start + (end - start) * easedProgress;
      setValue(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(`${prefix}${end.toFixed(decimals)}${suffix}`);
        setIsRunning(false);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { value, start: run, isRunning };
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
