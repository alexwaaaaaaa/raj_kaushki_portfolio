'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import type { CursorStyle } from '@/types';

const CURSOR_STYLES: { id: CursorStyle; label: string }[] = [
  { id: 'gold-dot', label: 'Gold Dot' },
  { id: 'ring', label: 'Ring' },
  { id: 'magnetic', label: 'Magnetic' },
];

export function CursorTab(): React.ReactElement {
  const cursor = useThemeStore((s) => s.cursor);
  const updateCursor = useThemeStore((s) => s.updateCursor);

  const customCursorEnabled = cursor.style !== 'default';

  const toggleCustomCursor = () => {
    updateCursor({ style: customCursorEnabled ? 'default' : 'ring' });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-full overflow-auto custom-scrollbar">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Cursor & Effects</h2>
        <p className="text-[var(--text-muted)] text-sm">Customize global interactive effects.</p>
      </div>

      <div className="glass-strong card p-6 border border-[var(--border-subtle)] space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
          <div>
            <h3 className="font-bold text-[var(--text-primary)]">Custom Cursor</h3>
            <p className="text-xs text-[var(--text-muted)]">Enable custom magnetic animated cursor.</p>
          </div>
          <button
            onClick={toggleCustomCursor}
            className={`w-12 h-6 rounded-full relative transition-colors ${customCursorEnabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-elevated)]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${customCursorEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        {/* Style Selection */}
        <div className="grid grid-cols-3 gap-4">
          {CURSOR_STYLES.map((s) => (
            <div
              key={s.id}
              onClick={() => updateCursor({ style: s.id })}
              className={`p-4 border rounded-lg text-center cursor-pointer transition-colors ${cursor.style === s.id ? 'border-[var(--color-primary)] bg-[rgba(201,168,76,0.05)]' : 'border-[var(--border-subtle)] hover:border-[var(--color-primary)]'}`}
            >
              <div className={`w-8 h-8 rounded-full border-2 border-[var(--color-primary)] mx-auto mb-2 ${s.id === 'gold-dot' ? 'bg-[var(--color-primary)]' : ''}`} />
              <span className="text-xs text-[var(--text-secondary)]">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-4 pt-2 border-t border-[var(--border-subtle)]">
          <label className="text-sm text-[var(--text-secondary)] font-medium">Cursor Color</label>
          <input
            type="color"
            value={cursor.color}
            onChange={(e) => updateCursor({ color: e.target.value })}
            className="w-10 h-8 rounded border border-[var(--border-subtle)] bg-transparent cursor-pointer"
          />
          <span className="text-xs font-mono text-[var(--text-muted)]">{cursor.color}</span>
        </div>

        {/* Trail Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-[var(--text-primary)] text-sm">Cursor Trail</h3>
            <p className="text-xs text-[var(--text-muted)]">Show a motion trail behind the cursor.</p>
          </div>
          <button
            onClick={() => updateCursor({ trailEnabled: !cursor.trailEnabled })}
            className={`w-12 h-6 rounded-full relative transition-colors ${cursor.trailEnabled ? 'bg-[var(--color-primary)]' : 'bg-[var(--bg-elevated)]'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${cursor.trailEnabled ? 'left-7' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CursorTab;
