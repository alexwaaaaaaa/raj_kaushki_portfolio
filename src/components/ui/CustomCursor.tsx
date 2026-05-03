'use client';

import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useThemeStore } from '@/store/themeStore';

export function CustomCursor(): React.ReactElement | null {
  const shouldReduceMotion = useReducedMotion();
  const { position, isHovering, isClicking, label } = useCustomCursor();
  const cursorStyle = useThemeStore((s) => s.cursor.style);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const ringPos = useRef({ x: -100, y: -100 });

  // Only show on non-touch desktop
  const [visible, setVisible] = React.useState(false);
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    setVisible(!isTouchDevice && cursorStyle !== 'default');
  }, [cursorStyle]);

  // Smooth ring animation with lag
  useEffect(() => {
    if (!visible || shouldReduceMotion) return;
    const animate = () => {
      ringPos.current.x += (position.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (position.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [position, visible, shouldReduceMotion]);

  if (!visible || shouldReduceMotion) return null;

  const scale = isClicking ? 0.8 : isHovering ? 1.5 : 1;

  return (
    <>
      {/* Dot — follows cursor exactly */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px) scale(${scale})`,
          transition: 'transform 0.1s ease',
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'expanded' : ''}`}
        style={{ opacity: isClicking ? 0.4 : 1 }}
      >
        {label && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--color-primary)',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}

export default CustomCursor;
