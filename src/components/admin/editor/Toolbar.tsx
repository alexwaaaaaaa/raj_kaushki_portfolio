'use client';

import React from 'react';
import { 
  Monitor, Tablet, Smartphone, Search, 
  Undo, Redo, LayoutGrid, Ruler, Save, Eye
} from 'lucide-react';
import { useEditorStore } from '@/store/editorStore';
import type { EditorBreakpoint } from '@/types';

export function Toolbar(): React.ReactElement {
  const { 
    breakpoint, setBreakpoint, 
    showGrid, toggleGrid, 
    showRulers, toggleRulers,
    zoom, setZoom
  } = useEditorStore();

  const [previewMode, setPreviewMode] = React.useState(false);
  const togglePreviewMode = () => setPreviewMode(!previewMode);

  const handleBreakpointChange = (bp: EditorBreakpoint) => {
    setBreakpoint(bp);
  };

  return (
    <div className="h-14 border-b border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-between px-4 select-none">
      
      {/* Left: Device Selection */}
      <div className="flex items-center gap-1 bg-[var(--bg-elevated)] p-1 rounded-lg border border-[var(--border-subtle)]">
        {[
          { id: 'lg', icon: Monitor, label: 'Desktop (1200px+)' },
          { id: 'md', icon: Tablet, label: 'Tablet (996px+)' },
          { id: 'sm', icon: Smartphone, label: 'Mobile (768px+)' },
          { id: 'xs', icon: Smartphone, label: 'Small Mobile (480px+)' }
        ].map((device) => (
          <button
            key={device.id}
            onClick={() => handleBreakpointChange(device.id as EditorBreakpoint)}
            className={`p-1.5 rounded-md transition-colors ${breakpoint === device.id ? 'bg-[var(--color-primary)] text-[var(--bg-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]'}`}
            title={device.label}
          >
            <device.icon size={16} />
          </button>
        ))}
      </div>

      {/* Center: View Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 border-r border-[var(--border-subtle)] pr-4">
          <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" title="Undo (Ctrl+Z)">
            <Undo size={16} />
          </button>
          <button className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" title="Redo (Ctrl+Y)">
            <Redo size={16} />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={toggleGrid}
            className={`p-1.5 rounded-md transition-colors ${showGrid ? 'text-[var(--color-primary)] bg-[rgba(201,168,76,0.1)]' : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]'}`} 
            title="Toggle Grid (G)"
          >
            <LayoutGrid size={16} />
          </button>
          <button 
            onClick={toggleRulers}
            className={`p-1.5 rounded-md transition-colors ${showRulers ? 'text-[var(--color-primary)] bg-[rgba(201,168,76,0.1)]' : 'text-[var(--text-secondary)] hover:bg-[rgba(255,255,255,0.05)]'}`} 
            title="Toggle Snap Guides (H)"
          >
            <Ruler size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-elevated)] px-2 py-1 rounded-lg border border-[var(--border-subtle)]">
          <Search size={14} className="text-[var(--text-muted)]" />
          <input 
            type="range" 
            min="25" max="150" step="25" 
            value={zoom} 
            onChange={(e) => setZoom(parseInt(e.target.value))}
            className="w-24 accent-[var(--color-primary)]"
          />
          <span className="text-[10px] font-mono w-8 text-right text-[var(--text-secondary)]">{zoom}%</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={togglePreviewMode}
          className={`btn ${previewMode ? 'btn-primary' : 'btn-outline'} flex items-center gap-2 px-3 py-1.5 text-xs h-auto min-h-0`}
        >
          <Eye size={14} />
          {previewMode ? 'Edit Mode' : 'Preview'}
        </button>
        <button className="btn btn-primary flex items-center gap-2 px-3 py-1.5 text-xs h-auto min-h-0">
          <Save size={14} />
          Publish
        </button>
      </div>

    </div>
  );
}

export default Toolbar;
