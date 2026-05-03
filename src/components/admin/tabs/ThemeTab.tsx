'use client';

import React from 'react';
import { useThemeStore } from '@/store/themeStore';
import { ColorPicker } from '../shared/ColorPicker';
import { LivePreview } from '../shared/LivePreview';

const THEME_PRESETS_OPTIONS = ['dark-luxury', 'midnight-blue', 'clean-white', 'forest', 'neon-tokyo', 'rose-gold', 'deep-purple', 'monochrome', 'panda-tech'] as const;

export function ThemeTab(): React.ReactElement {
  const colors = useThemeStore((s) => s.theme.colors);
  const typography = useThemeStore((s) => s.theme.typography);
  const updateColors = useThemeStore((s) => s.updateColors);
  const updateTypography = useThemeStore((s) => s.updateTypography);
  const applyPreset = useThemeStore((s) => s.applyPreset);
  const preset = useThemeStore((s) => s.theme.preset);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left side: Controls */}
      <div className="w-[400px] flex-shrink-0 border-r border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Theme & Colors</h2>
          <p className="text-[var(--text-muted)] text-sm">Customize global CSS variables.</p>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Presets</h3>
            <div className="grid grid-cols-2 gap-2">
              {THEME_PRESETS_OPTIONS.map(p => (
                <button 
                  key={p}
                  onClick={() => applyPreset(p)}
                  className={`p-2 border rounded-lg transition-colors text-xs capitalize ${preset === p ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgba(201,168,76,0.1)]' : 'border-[var(--border-subtle)] hover:border-[var(--color-primary)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                >
                  {p.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Backgrounds</h3>
            <div className="space-y-4">
              <ColorPicker label="Primary Background" color={colors.bgPrimary || ''} onChange={(c) => updateColors({ bgPrimary: c })} />
              <ColorPicker label="Secondary Background" color={colors.bgSecondary || ''} onChange={(c) => updateColors({ bgSecondary: c })} />
              <ColorPicker label="Card Background" color={colors.bgCard || ''} onChange={(c) => updateColors({ bgCard: c })} />
              <ColorPicker label="Elevated Background" color={colors.bgTertiary || ''} onChange={(c) => updateColors({ bgTertiary: c })} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Accents</h3>
            <div className="space-y-4">
              <ColorPicker label="Primary Color (Gold)" color={colors.colorPrimary || ''} onChange={(c) => updateColors({ colorPrimary: c })} />
              <ColorPicker label="Secondary Color (Purple)" color={colors.colorSecondary || ''} onChange={(c) => updateColors({ colorSecondary: c })} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Text Colors</h3>
            <div className="space-y-4">
              <ColorPicker label="Primary Text" color={colors.textPrimary || ''} onChange={(c) => updateColors({ textPrimary: c })} />
              <ColorPicker label="Secondary Text" color={colors.textSecondary || ''} onChange={(c) => updateColors({ textSecondary: c })} />
              <ColorPicker label="Muted Text" color={colors.textMuted || ''} onChange={(c) => updateColors({ textMuted: c })} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Heading Font (Google Font)</label>
                <input 
                  value={typography.fontDisplay || ''} 
                  onChange={(e) => updateTypography({ fontDisplay: e.target.value })} 
                  className="input w-full"
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Body Font (Google Font)</label>
                <input 
                  value={typography.fontBody || ''} 
                  onChange={(e) => updateTypography({ fontBody: e.target.value })} 
                  className="input w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Live Preview */}
      <div className="flex-1 bg-[var(--bg-secondary)] p-8 overflow-hidden">
        <LivePreview />
      </div>
    </div>
  );
}

export default ThemeTab;
