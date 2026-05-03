'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Point2D } from '@/types';

interface CursorState {
  position: Point2D;
  isHovering: boolean;
  isClicking: boolean;
  label: string;
}

export function useCustomCursor(): CursorState {
  const [state, setState] = useState<CursorState>({
    position: { x: -100, y: -100 },
    isHovering: false,
    isClicking: false,
    label: '',
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setState((prev) => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
  }, []);

  const handleMouseDown = useCallback(() => {
    setState((prev) => ({ ...prev, isClicking: true }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setState((prev) => ({ ...prev, isClicking: false }));
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') !== null ||
      target.closest('button') !== null ||
      target.getAttribute('role') === 'button' ||
      target.style.cursor === 'pointer' ||
      getComputedStyle(target).cursor === 'pointer';
    const label = target.getAttribute('data-cursor-label') ?? '';
    setState((prev) => ({ ...prev, isHovering: isInteractive, label }));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver]);

  return state;
}
