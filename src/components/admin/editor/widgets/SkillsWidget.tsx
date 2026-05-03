'use client';

import React from 'react';
import type { WidgetSettings } from '@/types';
import { Skills } from '@/components/portfolio/Skills';

interface SkillsWidgetProps {
  settings?: WidgetSettings;
  isEditing?: boolean;
}

export function SkillsWidget({ settings, isEditing }: SkillsWidgetProps): React.ReactElement {
  return (
    <div className="w-full h-full overflow-auto rounded-lg relative bg-[var(--bg-primary)]" style={{ pointerEvents: isEditing ? 'none' : 'auto' }}>
      <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
        <Skills />
      </div>
      {isEditing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-[var(--color-primary)] text-[var(--bg-primary)] px-3 py-1 rounded text-xs font-bold">SKILLS SECTION</span>
        </div>
      )}
    </div>
  );
}

export default SkillsWidget;
