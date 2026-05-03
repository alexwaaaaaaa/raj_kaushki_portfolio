'use client';

import { useCallback } from 'react';
import { useEditorStore } from '@/store/editorStore';
import type { GridLayoutItem, EditorBreakpoint } from '@/types';

export function useGridLayout(): {
  onLayoutChange: (layout: GridLayoutItem[], bp: EditorBreakpoint) => void;
  currentLayout: GridLayoutItem[];
  breakpoint: EditorBreakpoint;
} {
  const { breakpoint, layouts, updateLayouts } = useEditorStore();

  const onLayoutChange = useCallback(
    (layout: GridLayoutItem[], bp: EditorBreakpoint) => {
      updateLayouts(bp, layout);
    },
    [updateLayouts]
  );

  const currentLayout = layouts[breakpoint] ?? [];

  return { onLayoutChange, currentLayout, breakpoint };
}
