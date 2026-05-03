'use client';

import React from 'react';
import { Layers, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

export function ComponentTree(): React.ReactElement {
  const { layouts, breakpoint, widgets, selectedWidgetId, setSelectedWidget, deleteWidget } = useEditorStore();
  
  const currentLayout = layouts[breakpoint] || [];

  return (
    <div className="w-64 border-r border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center gap-2">
        <Layers size={16} className="text-[var(--color-primary)]" />
        <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">Component Tree</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {currentLayout.length === 0 ? (
          <div className="text-center p-4 text-[var(--text-muted)] text-xs">
            Canvas is empty.
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {currentLayout.map((item) => {
              const widget = widgets.find(w => w.id === item.i);
              if (!widget) return null;
              
              const isSelected = selectedWidgetId === item.i;

              return (
                <div
                  key={item.i}
                  className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors border ${isSelected ? 'bg-[rgba(201,168,76,0.1)] border-[var(--color-primary)]' : 'bg-transparent border-transparent hover:bg-[var(--bg-elevated)] hover:border-[var(--border-subtle)]'}`}
                  onClick={() => setSelectedWidget(item.i)}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-4 h-4 rounded-sm bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[8px] font-bold text-[var(--color-primary)] flex-shrink-0">
                      {widget.type.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs text-[var(--text-primary)] truncate">{widget.label || widget.type}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity">
                    <button className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded">
                      <Eye size={12} />
                    </button>
                    <button 
                      className="p-1 text-[var(--text-muted)] hover:text-red-400 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWidget(item.i);
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComponentTree;
