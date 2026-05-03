'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerChildren?: number;
  splitBy?: 'char' | 'word';
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const charVariants = {
  hidden: { opacity: 0, rotateX: -90, y: 20 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SplitText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  staggerChildren = 0.03,
  splitBy = 'char',
  once = true,
}: SplitTextProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once, margin: '-10% 0px' });

  if (shouldReduceMotion) {
    return React.createElement(Tag, { className }, text);
  }

  const items = splitBy === 'char' ? text.split('') : text.split(' ');
  const variants = splitBy === 'char' ? charVariants : wordVariants;

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={staggerChildren}
      style={{ display: 'block', perspective: 1000 }}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={variants}
          style={{
            display: 'inline-block',
            whiteSpace: splitBy === 'char' && item === ' ' ? 'pre' : 'normal',
            marginRight: splitBy === 'word' ? '0.3em' : undefined,
          }}
          transition={{ delay: delay + i * staggerChildren }}
        >
          {item === ' ' && splitBy === 'char' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default SplitText;
