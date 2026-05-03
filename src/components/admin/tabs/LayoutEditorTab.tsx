'use client';

import React from 'react';
import { Toolbar } from '../editor/Toolbar';
import { ComponentTree } from '../editor/ComponentTree';
import { Canvas } from '../editor/Canvas';
import { PropertiesPanel } from '../editor/PropertiesPanel';
import { WidgetLibrary } from '../editor/WidgetLibrary';

export function LayoutEditorTab(): React.ReactElement {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[var(--bg-primary)]">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <WidgetLibrary />
        <ComponentTree />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default LayoutEditorTab;
