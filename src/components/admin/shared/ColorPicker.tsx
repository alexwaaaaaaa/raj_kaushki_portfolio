'use client';

import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
  presetColors?: string[];
}

const DEFAULT_PRESETS = [
  '#08080f', '#0f0f1a', '#13131e', '#1a1a28',
  '#c9a84c', '#e8c96d', '#7c6fcd', '#f0ede6',
  '#8a8499', '#4a4560', '#ef4444', '#10b981'
];

export function ColorPicker({ color, onChange, label, presetColors = DEFAULT_PRESETS }: ColorPickerProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onChange(val);
    }
  };

  return (
    <div className="relative flex flex-col gap-2">
      {label && <label className="text-xs text-[var(--text-secondary)] font-medium">{label}</label>}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 rounded-md border border-[var(--border-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
          title="Pick color"
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="input flex-1 h-8 text-sm font-mono"
          placeholder="#000000"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 p-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl shadow-xl">
          <div className="mb-3">
            <HexColorPicker color={color} onChange={onChange} />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset}
                className="w-6 h-6 rounded border border-[var(--border-subtle)] hover:scale-110 transition-transform"
                style={{ backgroundColor: preset }}
                onClick={() => onChange(preset)}
                title={preset}
              />
            ))}
          </div>
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
}

export default ColorPicker;
