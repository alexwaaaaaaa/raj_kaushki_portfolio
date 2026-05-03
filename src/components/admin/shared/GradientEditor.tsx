'use client';

import React, { useState } from 'react';
import { ColorPicker } from './ColorPicker';

interface GradientStop {
  color: string;
  position: number; // 0 to 100
}

interface GradientEditorProps {
  stops: GradientStop[];
  angle: number;
  type: 'linear' | 'radial';
  onChange: (stops: GradientStop[], angle: number, type: 'linear' | 'radial') => void;
}

export function GradientEditor({ stops, angle, type, onChange }: GradientEditorProps): React.ReactElement {
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  const handleStopColorChange = (color: string) => {
    const newStops = [...stops];
    newStops[activeStopIndex].color = color;
    onChange(newStops, angle, type);
  };

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(stops, parseInt(e.target.value, 10), type);
  };

  const handleTypeChange = (newType: 'linear' | 'radial') => {
    onChange(stops, angle, newType);
  };

  const gradientString = type === 'linear'
    ? `linear-gradient(${angle}deg, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    : `radial-gradient(circle, ${stops.map(s => `${s.color} ${s.position}%`).join(', ')})`;

  return (
    <div className="flex flex-col gap-4 p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-elevated)]">
      <div className="flex gap-2">
        <button
          className={`flex-1 py-1 text-xs rounded-md ${type === 'linear' ? 'bg-[var(--color-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-card)] text-[var(--text-secondary)]'}`}
          onClick={() => handleTypeChange('linear')}
        >
          Linear
        </button>
        <button
          className={`flex-1 py-1 text-xs rounded-md ${type === 'radial' ? 'bg-[var(--color-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-card)] text-[var(--text-secondary)]'}`}
          onClick={() => handleTypeChange('radial')}
        >
          Radial
        </button>
      </div>

      <div 
        className="w-full h-24 rounded-lg border border-[var(--border-default)]" 
        style={{ background: gradientString }}
      />

      {type === 'linear' && (
        <div className="flex items-center gap-4">
          <label className="text-xs text-[var(--text-secondary)] w-12">Angle</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={handleAngleChange}
            className="flex-1"
          />
          <span className="text-xs font-mono text-[var(--text-primary)] w-8">{angle}°</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-xs text-[var(--text-secondary)]">Stops</label>
        <div className="flex gap-2">
          {stops.map((stop, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full border-2 ${activeStopIndex === i ? 'border-[var(--color-primary)]' : 'border-[var(--border-subtle)]'}`}
              style={{ backgroundColor: stop.color }}
              onClick={() => setActiveStopIndex(i)}
            />
          ))}
        </div>
        
        {stops[activeStopIndex] && (
          <div className="mt-2">
            <ColorPicker
              color={stops[activeStopIndex].color}
              onChange={handleStopColorChange}
              label="Stop Color"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GradientEditor;
