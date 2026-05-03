'use client';

import React from 'react';
import type { WidgetSettings } from '@/types';
import { Experience } from '@/components/portfolio/Experience';

interface ExperienceWidgetProps {
  settings?: WidgetSettings;
  isEditing?: boolean;
}

export function ExperienceWidget({ settings, isEditing }: ExperienceWidgetProps): React.ReactElement {
  return (
    <div className="w-full h-full overflow-auto rounded-lg relative bg-[var(--bg-secondary)]" style={{ pointerEvents: isEditing ? 'none' : 'auto' }}>
      <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
        <Experience />
      </div>
      {isEditing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-[var(--color-primary)] text-[var(--bg-primary)] px-3 py-1 rounded text-xs font-bold">EXPERIENCE SECTION</span>
        </div>
      )}
    </div>
  );
}

export default ExperienceWidget;
