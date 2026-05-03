'use client';

import { useRef, useCallback, useEffect } from 'react';
import type { Point2D } from '@/types';

interface UseMagneticOptions {
  strength?: number;
  ease?: number;
}

export function useMagnetic<T extends HTMLElement>(
  options: UseMagneticOptions = {}
): { ref: React.RefObject<T>; reset: () => void } {
  const { strength = 0.3, ease = 0.15 } = options;
  const ref = useRef<T>(null);
  const rafRef = useRef<number>(0);
  const currentPos = useRef<Point2D>({ x: 0, y: 0 });
  const targetPos = useRef<Point2D>({ x: 0, y: 0 });
  const isHovering = useRef<boolean>(false);

  const animate = useCallback(() => {
    currentPos.current.x += (targetPos.current.x - currentPos.current.x) * ease;
    currentPos.current.y += (targetPos.current.y - currentPos.current.y) * ease;

    if (ref.current) {
      ref.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px)`;
    }

    if (
      isHovering.current ||
      Math.abs(currentPos.current.x) > 0.01 ||
      Math.abs(currentPos.current.y) > 0.01
    ) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [ease]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetPos.current = {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      };
    },
    [strength]
  );

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetPos.current = { x: 0, y: 0 };
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const reset = useCallback(() => {
    targetPos.current = { x: 0, y: 0 };
    currentPos.current = { x: 0, y: 0 };
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ref, reset };
}
