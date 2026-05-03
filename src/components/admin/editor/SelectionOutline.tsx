'use client';

import React from 'react';

interface SelectionOutlineProps {
  isSelected: boolean;
  widgetName: string;
}

export function SelectionOutline({ isSelected, widgetName }: SelectionOutlineProps): React.ReactElement | null {
  if (!isSelected) return null;

  return (
    <div className="absolute inset-0 border-2 border-[var(--color-primary)] pointer-events-none rounded-lg z-50">
      <div className="absolute -top-3 left-4 bg-[var(--color-primary)] text-[var(--bg-primary)] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
        {widgetName}
      </div>
      
      {/* Corner indicators */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white -translate-x-0.5 -translate-y-0.5" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white translate-x-0.5 -translate-y-0.5" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white -translate-x-0.5 translate-y-0.5" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white translate-x-0.5 translate-y-0.5" />
    </div>
  );
}

export default SelectionOutline;
