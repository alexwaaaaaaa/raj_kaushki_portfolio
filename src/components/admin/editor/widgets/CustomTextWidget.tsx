'use client';

import React, { useState } from 'react';
import type { WidgetSettings } from '@/types';

interface CustomTextWidgetProps {
  settings?: WidgetSettings;
  isEditing?: boolean;
}

export function CustomTextWidget({ settings, isEditing }: CustomTextWidgetProps): React.ReactElement {
  const [text, setText] = useState('Custom Text Block');
  
  const content = (settings as any)?.content || {};
  const displayText = content.text || text;

  if (isEditing) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4 bg-[var(--bg-card)] rounded-lg">
        <textarea 
          className="w-full h-full bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-center"
          value={displayText}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          style={{
            fontFamily: (settings as any)?.typography?.fontFamily,
            fontSize: (settings as any)?.typography?.fontSize,
            color: (settings as any)?.typography?.color || 'var(--text-primary)',
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-4"
    >
      <div
        style={{
          fontFamily: (settings as any)?.typography?.fontFamily,
          fontSize: (settings as any)?.typography?.fontSize,
          fontWeight: (settings as any)?.typography?.fontWeight,
          lineHeight: (settings as any)?.typography?.lineHeight,
          letterSpacing: (settings as any)?.typography?.letterSpacing,
          color: (settings as any)?.typography?.color || 'var(--text-primary)',
          textAlign: (settings as any)?.typography?.textAlign as any || 'left',
          textTransform: (settings as any)?.typography?.textTransform as any || 'none',
        }}
      >
        {displayText}
      </div>
    </div>
  );
}

export default CustomTextWidget;
