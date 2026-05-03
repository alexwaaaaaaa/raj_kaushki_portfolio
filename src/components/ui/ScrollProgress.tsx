'use client';

import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useReducedMotion } from 'framer-motion';

export function ScrollProgress(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (shouldReduceMotion) {
    return (
      <div
        className="scroll-progress"
        style={{ width: `${progress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    );
  }

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress, transformOrigin: 'left' }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

export default ScrollProgress;
