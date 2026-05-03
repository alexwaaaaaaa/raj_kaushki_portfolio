'use client';

import React, { useRef, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useEditorStore } from '@/store/editorStore';
import { SnapGuides } from './SnapGuides';
import { ResizeHandles } from './ResizeHandles';
import { SelectionOutline } from './SelectionOutline';

// Widget Maps
import { HeroWidget } from './widgets/HeroWidget';
import { SkillsWidget } from './widgets/SkillsWidget';
import { ExperienceWidget } from './widgets/ExperienceWidget';
import { ContactWidget } from './widgets/ContactWidget';
import { CustomTextWidget } from './widgets/CustomTextWidget';

const WIDGET_COMPONENTS: Record<string, React.FC<any>> = {
  hero: HeroWidget,
  skills: SkillsWidget,
  experience: ExperienceWidget,
  contact: ContactWidget,
  customText: CustomTextWidget,
};

export function Canvas(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(1200);
  
  const { 
    breakpoint, layouts, widgets, updateLayouts, 
    selectedWidgetId, setSelectedWidget, zoom, showGrid, showRulers,
    addWidget
  } = useEditorStore();
  
  const previewMode = false;

  const layout = layouts[breakpoint] || [];

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      // Basic drop calculation (react-grid-layout handles precise drops better with droppingItem but we do a simple append here)
      addWidget(breakpoint, {
        type: data.type,
        label: data.name || data.type,
        w: data.w,
        h: data.h,
        x: 0,
        y: Infinity
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="flex-1 overflow-auto bg-[var(--bg-secondary)] relative p-8 flex justify-center items-start custom-scrollbar"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => setSelectedWidget(null)}
    >
      <ResizeHandles />
      
      <div 
        ref={containerRef}
        className={`relative transition-transform duration-200 ${showGrid ? 'bg-grid-pattern' : ''}`}
        style={{ 
          width: '100%', 
          maxWidth: breakpoint === 'lg' ? 1200 : breakpoint === 'md' ? 996 : breakpoint === 'sm' ? 768 : 480,
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          minHeight: 800,
          background: 'var(--bg-primary)',
          boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        }}
      >
        <SnapGuides showGuides={showRulers} cols={12} rowHeight={60} />
        
        <GridLayout
          className="layout z-10"
          layout={layout}
          cols={12}
          rowHeight={60}
          width={width}
          onLayoutChange={(l) => updateLayouts(breakpoint, l)}
          isDraggable={!previewMode}
          isResizable={!previewMode}
          margin={[10, 10]}
          useCSSTransforms={true}
        >
          {layout.map((item) => {
            const widget = widgets.find(w => w.id === item.i);
            if (!widget) return <div key={item.i} />;
            
            const WidgetComponent = WIDGET_COMPONENTS[widget.type] || CustomTextWidget;
            const isSelected = selectedWidgetId === item.i;

            return (
              <div 
                key={item.i} 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWidget(item.i);
                }}
                className={`relative group ${previewMode ? '' : 'bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)]'} rounded-lg overflow-hidden transition-colors cursor-pointer`}
              >
                {!previewMode && <SelectionOutline isSelected={isSelected} widgetName={widget.type} />}
                <WidgetComponent settings={widget.settings} isEditing={!previewMode} />
              </div>
            );
          })}
        </GridLayout>

        {layout.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[rgba(201,168,76,0.1)] border border-dashed border-[var(--color-primary)] mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-[var(--color-primary)]">+</span>
              </div>
              <p className="text-[var(--text-muted)] text-sm">Drag widgets here to build layout</p>
            </div>
          </div>
        )}
      </div>

      {/* Grid Pattern CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(201,168,76,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(201,168,76,0.05) 1px, transparent 1px) !important;
          background-size: calc(100% / 12) 70px !important; /* rowHeight + margin */
          background-position: -1px -1px;
        }
      `}} />
    </div>
  );
}

export default Canvas;
