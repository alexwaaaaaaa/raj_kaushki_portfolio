'use client';

import React from 'react';
import type { WidgetSettings } from '@/types';
import { Contact } from '@/components/portfolio/Contact';

interface ContactWidgetProps {
  settings?: WidgetSettings;
  isEditing?: boolean;
}

export function ContactWidget({ settings, isEditing }: ContactWidgetProps): React.ReactElement {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg relative" style={{ pointerEvents: isEditing ? 'none' : 'auto' }}>
      <div style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}>
        <Contact />
      </div>
      {isEditing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
          <span className="bg-[var(--color-primary)] text-[var(--bg-primary)] px-3 py-1 rounded text-xs font-bold">CONTACT SECTION</span>
        </div>
      )}
    </div>
  );
}

export default ContactWidget;
