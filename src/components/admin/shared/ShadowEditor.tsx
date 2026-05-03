'use client';

import React from 'react';
import { ColorPicker } from './ColorPicker';

export interface ShadowConfig {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

interface ShadowEditorProps {
  shadow: ShadowConfig;
  onChange: (shadow: ShadowConfig) => void;
}

export function ShadowEditor({ shadow, onChange }: ShadowEditorProps): React.ReactElement {
  const handleChange = (key: keyof ShadowConfig, value: any) => {
    onChange({ ...shadow, [key]: value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="text-xs text-[var(--text-secondary)] flex-1">Inset</label>
        <input 
          type="checkbox" 
          checked={shadow.inset} 
          onChange={(e) => handleChange('inset', e.target.checked)}
          className="rounded bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">X Offset (px)</label>
          <input type="number" value={shadow.x} onChange={(e) => handleChange('x', parseInt(e.target.value))} className="input w-full text-sm" />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Y Offset (px)</label>
          <input type="number" value={shadow.y} onChange={(e) => handleChange('y', parseInt(e.target.value))} className="input w-full text-sm" />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Blur (px)</label>
          <input type="number" min="0" value={shadow.blur} onChange={(e) => handleChange('blur', Math.max(0, parseInt(e.target.value)))} className="input w-full text-sm" />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Spread (px)</label>
          <input type="number" value={shadow.spread} onChange={(e) => handleChange('spread', parseInt(e.target.value))} className="input w-full text-sm" />
        </div>
      </div>

      <ColorPicker color={shadow.color} onChange={(c) => handleChange('color', c)} label="Shadow Color" />

      <div className="mt-4 p-6 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden">
        <div 
          className="w-20 h-20 bg-[var(--bg-elevated)] rounded-lg transition-shadow duration-200"
          style={{
            boxShadow: `${shadow.inset ? 'inset ' : ''}${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
          }}
        />
      </div>
    </div>
  );
}

export default ShadowEditor;
