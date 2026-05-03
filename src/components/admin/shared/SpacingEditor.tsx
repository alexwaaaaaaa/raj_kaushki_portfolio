'use client';

import React from 'react';

interface SpacingEditorProps {
  padding: { top: number; right: number; bottom: number; left: number };
  margin: { top: number; right: number; bottom: number; left: number };
  onChange: (type: 'padding' | 'margin', values: { top: number; right: number; bottom: number; left: number }) => void;
}

export function SpacingEditor({ padding, margin, onChange }: SpacingEditorProps): React.ReactElement {
  const handlePaddingChange = (side: keyof typeof padding, value: string) => {
    const val = parseInt(value, 10) || 0;
    onChange('padding', { ...padding, [side]: val });
  };

  const handleMarginChange = (side: keyof typeof margin, value: string) => {
    const val = parseInt(value, 10) || 0;
    onChange('margin', { ...margin, [side]: val });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Visual Box Model Editor */}
      <div className="relative w-full aspect-[4/3] bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-center font-mono text-[10px] p-2">
        {/* Margin Area */}
        <div className="absolute inset-2 border border-dashed border-[var(--border-hover)] bg-[rgba(124,111,205,0.05)] rounded-lg flex items-center justify-center">
          <span className="absolute top-1 text-[var(--text-muted)]">MARGIN</span>
          <input type="number" value={margin.top} onChange={(e) => handleMarginChange('top', e.target.value)} className="absolute top-4 w-10 text-center bg-transparent focus:outline-none focus:bg-[var(--bg-elevated)] rounded" />
          <input type="number" value={margin.right} onChange={(e) => handleMarginChange('right', e.target.value)} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 text-center bg-transparent focus:outline-none focus:bg-[var(--bg-elevated)] rounded" />
          <input type="number" value={margin.bottom} onChange={(e) => handleMarginChange('bottom', e.target.value)} className="absolute bottom-4 w-10 text-center bg-transparent focus:outline-none focus:bg-[var(--bg-elevated)] rounded" />
          <input type="number" value={margin.left} onChange={(e) => handleMarginChange('left', e.target.value)} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 text-center bg-transparent focus:outline-none focus:bg-[var(--bg-elevated)] rounded" />
          
          {/* Padding Area */}
          <div className="absolute inset-10 border border-solid border-[var(--color-primary)] bg-[rgba(201,168,76,0.1)] rounded flex items-center justify-center">
            <span className="absolute top-1 text-[var(--color-primary)] opacity-70">PADDING</span>
            <input type="number" value={padding.top} onChange={(e) => handlePaddingChange('top', e.target.value)} className="absolute top-4 w-10 text-center text-[var(--color-primary)] bg-transparent focus:outline-none focus:bg-[rgba(201,168,76,0.2)] rounded" />
            <input type="number" value={padding.right} onChange={(e) => handlePaddingChange('right', e.target.value)} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 text-center text-[var(--color-primary)] bg-transparent focus:outline-none focus:bg-[rgba(201,168,76,0.2)] rounded" />
            <input type="number" value={padding.bottom} onChange={(e) => handlePaddingChange('bottom', e.target.value)} className="absolute bottom-4 w-10 text-center text-[var(--color-primary)] bg-transparent focus:outline-none focus:bg-[rgba(201,168,76,0.2)] rounded" />
            <input type="number" value={padding.left} onChange={(e) => handlePaddingChange('left', e.target.value)} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 text-center text-[var(--color-primary)] bg-transparent focus:outline-none focus:bg-[rgba(201,168,76,0.2)] rounded" />
            
            {/* Content Area */}
            <div className="w-16 h-8 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded flex items-center justify-center text-[var(--text-muted)]">
              CONTENT
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-center text-[var(--text-muted)]">Values in pixels (px)</p>
    </div>
  );
}

export default SpacingEditor;
