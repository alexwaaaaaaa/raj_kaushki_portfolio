'use client';

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import type { GridLayoutItem } from '@/types';

export function ResponsiveTab(): React.ReactElement {
  const layouts = useEditorStore((s) => s.layouts);

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Responsive Overview</h2>
        <p className="text-[var(--text-muted)] text-sm">See layout statistics per breakpoint.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(layouts).map(([bp, items]) => (
          <div key={bp} className="glass-strong card p-4 border border-[var(--border-subtle)]">
            <h3 className="font-bold text-[var(--text-primary)] uppercase mb-2">Breakpoint: {bp}</h3>
            <p className="text-[var(--text-muted)] text-xs mb-4">Total widgets: {items.length}</p>
            
            <div className="space-y-2">
              {items.map((item: GridLayoutItem) => (
                <div key={item.i} className="flex justify-between text-xs p-2 bg-[var(--bg-primary)] rounded border border-[var(--border-subtle)]">
                  <span className="text-[var(--text-secondary)]">ID: {item.i}</span>
                  <span className="font-mono text-[var(--color-primary)]">x:{item.x} y:{item.y} w:{item.w} h:{item.h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResponsiveTab;
