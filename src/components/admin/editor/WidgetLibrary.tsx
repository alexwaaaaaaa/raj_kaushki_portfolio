'use client';

import React from 'react';
import { Type, LayoutTemplate, Briefcase, Star, Mail, Image as ImageIcon } from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';

const WIDGET_TEMPLATES = [
  { type: 'hero', name: 'Hero Section', icon: LayoutTemplate, w: 12, h: 10 },
  { type: 'about', name: 'About Widget', icon: Type, w: 12, h: 8 },
  { type: 'experience', name: 'Experience', icon: Briefcase, w: 12, h: 10 },
  { type: 'skills', name: 'Skills Grid', icon: Star, w: 8, h: 6 },
  { type: 'contact', name: 'Contact Form', icon: Mail, w: 12, h: 8 },
  { type: 'customText', name: 'Custom Text', icon: Type, w: 4, h: 4 },
  { type: 'image', name: 'Image Block', icon: ImageIcon, w: 4, h: 4 },
];

export function WidgetLibrary(): React.ReactElement {
  const addWidget = useEditorStore((s) => s.addWidget);
  const breakpoint = useEditorStore((s) => s.breakpoint);

  const handleDragStart = (e: React.DragEvent, template: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ type: template.type, name: template.name, w: template.w, h: template.h }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleAddClick = (template: any) => {
    addWidget(breakpoint, {
      type: template.type,
      label: template.name,
      w: template.w,
      h: template.h,
      x: 0,
      y: Infinity, // Add to bottom
    });
  };

  return (
    <div className="w-64 border-l border-[var(--border-subtle)] bg-[var(--bg-card)] flex flex-col">
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <h3 className="font-display font-semibold text-sm text-[var(--text-primary)]">Widget Library</h3>
        <p className="text-[10px] text-[var(--text-muted)] mt-1">Drag onto canvas or click to add</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
        {WIDGET_TEMPLATES.map((item) => (
          <div
            key={item.type}
            className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-[var(--color-primary)] hover:bg-[rgba(201,168,76,0.05)] cursor-grab transition-colors group"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onClick={() => handleAddClick(item)}
          >
            <div className="w-8 h-8 rounded bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
              <item.icon size={16} />
            </div>
            <div>
              <div className="text-xs font-medium text-[var(--text-primary)]">{item.name}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{item.w}×{item.h} units</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WidgetLibrary;
