'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AnimationType = 'FadeUp' | 'FadeDown' | 'SlideLeft' | 'SlideRight' | 'ZoomIn' | 'Flip' | 'Bounce' | 'None';

interface AnimationPickerProps {
  animation: AnimationType;
  duration: number;
  delay: number;
  onChange: (anim: AnimationType, duration: number, delay: number) => void;
}

const ANIMATIONS: AnimationType[] = ['None', 'FadeUp', 'FadeDown', 'SlideLeft', 'SlideRight', 'ZoomIn', 'Flip', 'Bounce'];

export function AnimationPicker({ animation, duration, delay, onChange }: AnimationPickerProps): React.ReactElement {
  // Simple trigger to replay animation preview
  const [trigger, setTrigger] = React.useState(0);

  const getVariants = (type: AnimationType) => {
    switch (type) {
      case 'FadeUp': return { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
      case 'FadeDown': return { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } };
      case 'SlideLeft': return { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } };
      case 'SlideRight': return { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };
      case 'ZoomIn': return { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } };
      case 'Flip': return { hidden: { opacity: 0, rotateX: -90 }, visible: { opacity: 1, rotateX: 0 } };
      case 'Bounce': return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.5 } } };
      default: return { hidden: { opacity: 1 }, visible: { opacity: 1 } };
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Entrance Animation</label>
        <select
          value={animation}
          onChange={(e) => onChange(e.target.value as AnimationType, duration, delay)}
          className="input w-full"
        >
          {ANIMATIONS.map(anim => <option key={anim} value={anim}>{anim}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Duration (ms)</label>
          <input
            type="number"
            min="0"
            step="100"
            value={duration}
            onChange={(e) => onChange(animation, parseInt(e.target.value) || 0, delay)}
            className="input w-full text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Delay (ms)</label>
          <input
            type="number"
            min="0"
            step="100"
            value={delay}
            onChange={(e) => onChange(animation, duration, parseInt(e.target.value) || 0)}
            className="input w-full text-sm"
          />
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between items-center mb-2">
          <label className="text-xs text-[var(--text-secondary)]">Preview</label>
          <button 
            onClick={() => setTrigger(t => t + 1)}
            className="text-xs text-[var(--color-primary)] hover:underline"
          >
            Replay
          </button>
        </div>
        <div className="h-24 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={trigger}
              variants={getVariants(animation)}
              initial="hidden"
              animate="visible"
              transition={{ duration: duration / 1000, delay: delay / 1000 }}
              className="w-12 h-12 bg-gradient-to-br from-[var(--gold-400)] to-[var(--gold-600)] rounded-lg shadow-lg"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AnimationPicker;
