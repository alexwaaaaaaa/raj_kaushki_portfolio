'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  strength?: number;
  href?: string;
  asLink?: boolean;
}

export function MagneticButton({
  children,
  variant = 'primary',
  size = 'md',
  strength = 0.25,
  className,
  href,
  asLink,
  onClick,
  ...props
}: MagneticButtonProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const magneticStrength = shouldReduceMotion ? 0 : strength;
  const { ref } = useMagnetic<HTMLButtonElement>({ strength: magneticStrength });

  const variantClass = {
    primary: 'btn btn-primary',
    outline: 'btn btn-outline',
    ghost: 'btn bg-transparent text-[var(--color-primary)] hover:bg-[rgba(201,168,76,0.08)]',
  }[variant];

  const sizeClass = {
    sm: 'text-xs px-4 py-2 min-h-[36px]',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  }[size];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
    if (!shouldReduceMotion) {
      const btn = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        width:${size}px;
        height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background:rgba(255,255,255,0.2);
        pointer-events:none;
        transform:scale(0);
        animation:ripple 0.6s ease-out forwards;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }
    onClick?.(e);
  };

  if (asLink && href) {
    return (
      <a
        href={href}
        className={cn(variantClass, sizeClass, 'inline-flex items-center justify-center gap-2', className)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      className={cn(variantClass, sizeClass, 'relative', className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default MagneticButton;
