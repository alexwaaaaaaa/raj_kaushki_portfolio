'use client';

import React from 'react';

interface SnapGuidesProps {
  showGuides: boolean;
  cols: number;
  rowHeight: number;
}

export function SnapGuides({ showGuides, cols, rowHeight }: SnapGuidesProps): React.ReactElement | null {
  if (!showGuides) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {/* Vertical columns */}
      <div 
        className="absolute inset-0 w-full flex"
        style={{ padding: '0 10px' }} // react-grid-layout margin
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div 
            key={`col-${i}`} 
            className="flex-1 h-full border-x border-[var(--color-primary)] border-dashed mx-[5px]"
            style={{ background: 'rgba(201,168,76,0.02)' }}
          />
        ))}
      </div>
      
      {/* Horizontal rows */}
      <div className="absolute inset-0 w-full h-[2000px]">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={`row-${i}`}
            className="w-full border-b border-[var(--color-primary)] opacity-30"
            style={{ height: rowHeight, marginBottom: 10 }} // margin[1]
          />
        ))}
      </div>
    </div>
  );
}

export default SnapGuides;
