'use client';

import React from 'react';
import type { WidgetSettings } from '@/types';
import { Hero } from '@/components/portfolio/Hero';

interface HeroWidgetProps {
  settings?: WidgetSettings;
  isEditing?: boolean;
}

export function HeroWidget({ settings, isEditing }: HeroWidgetProps): React.ReactElement {
  // In the editor, we just render the actual component.
  // In a real implementation, we would pass down the `settings` to override the component's default styles
  // For this demo, we wrap it to ensure it scales nicely in the grid cell
  return (
    <div className="w-full h-full overflow-hidden rounded-lg relative" style={{ pointerEvents: isEditing ? 'none' : 'auto' }}>
      <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%', height: '125%' }}>
        <Hero />
      </div>
      {isEditing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-[var(--color-primary)] text-[var(--bg-primary)] px-3 py-1 rounded text-xs font-bold">HERO SECTION</span>
        </div>
      )}
    </div>
  );
}

export default HeroWidget;
