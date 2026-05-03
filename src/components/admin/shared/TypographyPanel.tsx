'use client';

import React from 'react';
import { ColorPicker } from './ColorPicker';

interface TypographyPanelProps {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing: string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  onChange: (key: string, value: string) => void;
}

const FONTS = [
  { label: 'Playfair Display (Serif)', value: 'var(--font-display)' },
  { label: 'DM Sans (Sans-serif)', value: 'var(--font-body)' },
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Outfit', value: 'Outfit, sans-serif' },
  { label: 'Space Mono', value: 'var(--font-mono)' },
];

export function TypographyPanel({
  fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, color, textAlign, textTransform, onChange
}: TypographyPanelProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Font Family</label>
        <select
          value={fontFamily}
          onChange={(e) => onChange('fontFamily', e.target.value)}
          className="input w-full"
        >
          {FONTS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Size</label>
          <input
            type="text"
            value={fontSize}
            onChange={(e) => onChange('fontSize', e.target.value)}
            className="input w-full text-sm"
            placeholder="e.g. 16px, 1.5rem"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Weight</label>
          <select
            value={fontWeight}
            onChange={(e) => onChange('fontWeight', e.target.value)}
            className="input w-full text-sm"
          >
            <option value="300">Light (300)</option>
            <option value="400">Regular (400)</option>
            <option value="500">Medium (500)</option>
            <option value="600">SemiBold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">ExtraBold (800)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Line Height</label>
          <input
            type="text"
            value={lineHeight}
            onChange={(e) => onChange('lineHeight', e.target.value)}
            className="input w-full text-sm"
            placeholder="e.g. 1.5"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1 block">Letter Spacing</label>
          <input
            type="text"
            value={letterSpacing}
            onChange={(e) => onChange('letterSpacing', e.target.value)}
            className="input w-full text-sm"
            placeholder="e.g. 0.05em"
          />
        </div>
      </div>

      <ColorPicker color={color} onChange={(c) => onChange('color', c)} label="Text Color" />

      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Text Align</label>
        <div className="flex bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--border-subtle)]">
          {['left', 'center', 'right', 'justify'].map(align => (
            <button
              key={align}
              className={`flex-1 py-1 text-xs rounded-md ${textAlign === align ? 'bg-[var(--bg-elevated)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}
              onClick={() => onChange('textAlign', align)}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-xs text-[var(--text-secondary)] mb-1 block">Transform</label>
        <div className="flex bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--border-subtle)]">
          {['none', 'uppercase', 'lowercase', 'capitalize'].map(transform => (
            <button
              key={transform}
              className={`flex-1 py-1 text-xs rounded-md ${textTransform === transform ? 'bg-[var(--bg-elevated)] text-[var(--color-primary)] shadow-sm' : 'text-[var(--text-secondary)]'}`}
              onClick={() => onChange('textTransform', transform)}
            >
              {transform.substring(0, 4)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TypographyPanel;
