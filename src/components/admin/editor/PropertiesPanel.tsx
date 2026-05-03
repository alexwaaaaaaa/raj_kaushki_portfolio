'use client';

import React from 'react';
import { Settings, Image, Type, Maximize } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import { SpacingEditor } from '../shared/SpacingEditor';
import { TypographyPanel } from '../shared/TypographyPanel';

export function PropertiesPanel(): React.ReactElement {
  const { selectedWidgetId, widgets, updateWidgetSettings, updateWidgetStyle } = useEditorStore();

  const selectedWidget = Object.values(widgets).find(w => w.id === selectedWidgetId);

  if (!selectedWidget) {
    return (
      <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center p-6 text-center">
        <p className="text-sm text-[var(--text-muted)]">Select a widget on the canvas to edit its properties.</p>
      </div>
    );
  }

  const style = selectedWidget.style || {};
  const settings = selectedWidget.settings || {};

  const handleSpacingChange = (type: 'padding' | 'margin', values: any) => {
    // SpacingEditor returns { top, right, bottom, left } for each type
    // We need to map it to the flat WidgetSpacing structure
    const updatedSpacing = { ...style.spacing };
    
    if (type === 'padding') {
      updatedSpacing.paddingTop = values.top;
      updatedSpacing.paddingRight = values.right;
      updatedSpacing.paddingBottom = values.bottom;
      updatedSpacing.paddingLeft = values.left;
    } else {
      updatedSpacing.marginTop = values.top;
      updatedSpacing.marginRight = values.right;
      updatedSpacing.marginBottom = values.bottom;
      updatedSpacing.marginLeft = values.left;
    }

    updateWidgetStyle(selectedWidget.id, {
      spacing: updatedSpacing
    });
  };

  const handleTypographyChange = (key: string, value: string) => {
    // Typography is not on WidgetStyle by default in types, but let's assume it's custom or we need to add it, wait, Typography isn't on WidgetStyle either!
    // Let me check if WidgetStyle has typography.
    // It does not.
    // If it's a custom thing, I'll put it in style. Wait, TypographyPanel uses `settings.typography`. Let's just update WidgetSettings for now but cast as any or add it to WidgetSettings if it's there. Actually, let's keep typography in settings but cast to any to fix type error.
    updateWidgetSettings(selectedWidget.id, {
      typography: { ...(settings as any).typography, [key]: value }
    } as any);
  };

  return (
    <div className="w-80 border-l border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-6 rounded bg-[rgba(201,168,76,0.1)] flex items-center justify-center text-[var(--color-primary)]">
            <Settings size={14} />
          </div>
          <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">Widget Settings</h3>
        </div>
        <p className="text-xs text-[var(--text-muted)] truncate">ID: {selectedWidget.id}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6 custom-scrollbar">
        
        {/* Type-specific settings */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
            <Settings size={12} /> Specific Settings
          </h4>
          
          <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)]">
              Editing <span className="text-[var(--color-primary)] font-mono">{selectedWidget.type}</span> specific options.
            </p>
            {/* Real app would render dynamic forms based on widget type here */}
            {selectedWidget.type === 'custom-text' && (
              <div className="mt-3">
                <label className="text-xs text-[var(--text-secondary)] mb-1 block">Content Text</label>
                <textarea 
                  className="input w-full text-xs" 
                  rows={3} 
                  value={(settings as any).content?.text || ''}
                  onChange={(e) => updateWidgetSettings(selectedWidget.id, { content: { ...(settings as any).content, text: e.target.value } } as any)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-[var(--border-subtle)]" />

        {/* Typography */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
            <Type size={12} /> Typography
          </h4>
          <TypographyPanel
            fontFamily={(settings as any).typography?.fontFamily || 'var(--font-body)'}
            fontSize={(settings as any).typography?.fontSize || '16px'}
            fontWeight={(settings as any).typography?.fontWeight || '400'}
            lineHeight={(settings as any).typography?.lineHeight || '1.5'}
            letterSpacing={(settings as any).typography?.letterSpacing || 'normal'}
            color={(settings as any).typography?.color || '#ffffff'}
            textAlign={(settings as any).typography?.textAlign || 'left'}
            textTransform={(settings as any).typography?.textTransform || 'none'}
            onChange={handleTypographyChange}
          />
        </div>

        <div className="w-full h-px bg-[var(--border-subtle)]" />

        {/* Spacing */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider flex items-center gap-2">
            <Maximize size={12} /> Spacing & Layout
          </h4>
          <SpacingEditor
            padding={{
              top: style.spacing?.paddingTop || 0,
              right: style.spacing?.paddingRight || 0,
              bottom: style.spacing?.paddingBottom || 0,
              left: style.spacing?.paddingLeft || 0
            }}
            margin={{
              top: style.spacing?.marginTop || 0,
              right: style.spacing?.marginRight || 0,
              bottom: style.spacing?.marginBottom || 0,
              left: style.spacing?.marginLeft || 0
            }}
            onChange={handleSpacingChange}
          />
        </div>

      </div>
    </div>
  );
}

export default PropertiesPanel;
