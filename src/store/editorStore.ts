import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  EditorState,
  EditorTool,
  EditorBreakpoint,
  Widget,
  WidgetType,
  WidgetStyle,
  WidgetSettings,
  LayoutBreakpoints,
  GridLayoutItem,
} from '@/types';
import { generateId } from '@/lib/utils';

const DEFAULT_STYLE: WidgetStyle = {
  background: { type: 'transparent' },
  border: { width: 0, style: 'none', color: '#c9a84c', radiusAll: 12 },
  shadows: [],
  spacing: {
    paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
    marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
  },
  opacity: 100,
  zIndex: 0,
  animation: { entrance: 'fadeUp', delay: 0, duration: 600, hoverEffect: 'none', clickEffect: 'none' },
};

const DEFAULT_WIDGETS: Widget[] = [
  { id: 'hero', type: 'hero', visible: true, locked: false, label: 'Hero', style: { ...DEFAULT_STYLE }, settings: { backgroundType: 'particles', textAlignment: 'left', nameStyle: 'gradient', showTagline: true, showCTAButtons: true, showScrollIndicator: true, showStats: true, cta1Text: 'Explore My Work', cta1Link: '#experience', cta1Style: 'fill', cta2Text: 'Download CV', cta2Link: '#', cta2Style: 'outline', particleCount: 200, particleColor: '#c9a84c', particleSize: 0.06, particleSpeed: 0.3, enable3DHelix: true, helixPosition: 'right' } },
  { id: 'about', type: 'about', visible: true, locked: false, label: 'About', style: { ...DEFAULT_STYLE }, settings: {} },
  { id: 'experience', type: 'experience', visible: true, locked: false, label: 'Experience', style: { ...DEFAULT_STYLE }, settings: { timelineStyle: 'alternating', cardStyle: 'glassmorphism', showCompanyLogo: false, dateFormat: 'range', bulletStyle: 'dot', cardWidth: 90, cardGap: 32 } },
  { id: 'skills', type: 'skills', visible: true, locked: false, label: 'Skills', style: { ...DEFAULT_STYLE }, settings: { displayStyle: 'animated-bars', showPercentage: true, showCategoryTabs: true, barHeight: 6, barBorderRadius: 3, colorMode: 'gradient', sortBy: 'level' } },
  { id: 'certifications', type: 'certifications', visible: true, locked: false, label: 'Certifications', style: { ...DEFAULT_STYLE }, settings: {} },
  { id: 'strengths', type: 'strengths', visible: true, locked: false, label: 'Strengths', style: { ...DEFAULT_STYLE }, settings: {} },
  { id: 'contact', type: 'contact', visible: true, locked: false, label: 'Contact', style: { ...DEFAULT_STYLE }, settings: { layout: 'side-by-side', formStyle: 'default', showMap: false, showAvailabilityBadge: true, background: 'glass' } },
  { id: 'footer', type: 'footer', visible: true, locked: false, label: 'Footer', style: { ...DEFAULT_STYLE }, settings: {} },
];

const DEFAULT_LAYOUTS: LayoutBreakpoints = {
  lg: [
    { i: 'hero', x: 0, y: 0, w: 12, h: 10, minW: 6, minH: 6 },
    { i: 'about', x: 0, y: 10, w: 12, h: 8, minW: 6, minH: 4 },
    { i: 'experience', x: 0, y: 18, w: 12, h: 10, minW: 6, minH: 6 },
    { i: 'skills', x: 0, y: 28, w: 8, h: 6, minW: 4, minH: 4 },
    { i: 'certifications', x: 0, y: 34, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'strengths', x: 6, y: 34, w: 6, h: 5, minW: 3, minH: 3 },
    { i: 'contact', x: 0, y: 39, w: 12, h: 7, minW: 6, minH: 5 },
    { i: 'footer', x: 0, y: 46, w: 12, h: 2, minW: 12, minH: 2 },
  ],
  md: [
    { i: 'hero', x: 0, y: 0, w: 10, h: 10 },
    { i: 'about', x: 0, y: 10, w: 10, h: 8 },
    { i: 'experience', x: 0, y: 18, w: 10, h: 10 },
    { i: 'skills', x: 0, y: 28, w: 10, h: 6 },
    { i: 'certifications', x: 0, y: 34, w: 5, h: 5 },
    { i: 'strengths', x: 5, y: 34, w: 5, h: 5 },
    { i: 'contact', x: 0, y: 39, w: 10, h: 7 },
    { i: 'footer', x: 0, y: 46, w: 10, h: 2 },
  ],
  sm: [
    { i: 'hero', x: 0, y: 0, w: 6, h: 12 },
    { i: 'about', x: 0, y: 12, w: 6, h: 10 },
    { i: 'experience', x: 0, y: 22, w: 6, h: 12 },
    { i: 'skills', x: 0, y: 34, w: 6, h: 8 },
    { i: 'certifications', x: 0, y: 42, w: 6, h: 6 },
    { i: 'strengths', x: 0, y: 48, w: 6, h: 6 },
    { i: 'contact', x: 0, y: 54, w: 6, h: 8 },
    { i: 'footer', x: 0, y: 62, w: 6, h: 3 },
  ],
  xs: [
    { i: 'hero', x: 0, y: 0, w: 4, h: 14 },
    { i: 'about', x: 0, y: 14, w: 4, h: 12 },
    { i: 'experience', x: 0, y: 26, w: 4, h: 14 },
    { i: 'skills', x: 0, y: 40, w: 4, h: 10 },
    { i: 'certifications', x: 0, y: 50, w: 4, h: 7 },
    { i: 'strengths', x: 0, y: 57, w: 4, h: 7 },
    { i: 'contact', x: 0, y: 64, w: 4, h: 10 },
    { i: 'footer', x: 0, y: 74, w: 4, h: 3 },
  ],
  xxs: [
    { i: 'hero', x: 0, y: 0, w: 2, h: 16 },
    { i: 'about', x: 0, y: 16, w: 2, h: 14 },
    { i: 'experience', x: 0, y: 30, w: 2, h: 16 },
    { i: 'skills', x: 0, y: 46, w: 2, h: 12 },
    { i: 'certifications', x: 0, y: 58, w: 2, h: 8 },
    { i: 'strengths', x: 0, y: 66, w: 2, h: 8 },
    { i: 'contact', x: 0, y: 74, w: 2, h: 12 },
    { i: 'footer', x: 0, y: 86, w: 2, h: 4 },
  ],
};

interface EditorStore extends EditorState {
  widgets: Widget[];
  layouts: LayoutBreakpoints;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setSelectedWidget: (id: string | null) => void;
  setHoveredWidget: (id: string | null) => void;
  setTool: (tool: EditorTool) => void;
  setZoom: (zoom: number) => void;
  setBreakpoint: (bp: EditorBreakpoint) => void;
  toggleGrid: () => void;
  toggleSnap: () => void;
  toggleRulers: () => void;
  toggleWidgetLibrary: () => void;
  togglePropertiesPanel: () => void;
  toggleComponentTree: () => void;
  setDragging: (v: boolean) => void;
  setResizing: (v: boolean) => void;
  updateWidgetStyle: (id: string, style: Partial<WidgetStyle>) => void;
  updateWidgetSettings: (id: string, settings: Partial<WidgetSettings>) => void;
  toggleWidgetVisibility: (id: string) => void;
  deleteWidget: (id: string) => void;
  duplicateWidget: (id: string) => void;
  addWidget: (bp: EditorBreakpoint, item: { type: WidgetType; label: string; w: number; h: number; x: number; y: number }) => void;
  updateLayouts: (bp: EditorBreakpoint, layout: GridLayoutItem[]) => void;
  reorderWidgets: (from: number, to: number) => void;
  fetchFromServer: () => Promise<void>;
  publishToServer: () => Promise<void>;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      // EditorState
      selectedWidgetId: null,
      hoveredWidgetId: null,
      tool: 'select',
      zoom: 75,
      showGrid: true,
      snapToGrid: true,
      showRulers: false,
      breakpoint: 'lg',
      widgetLibraryOpen: false,
      propertiesPanelOpen: true,
      componentTreeOpen: true,
      isDragging: false,
      isResizing: false,
      // Data
      widgets: DEFAULT_WIDGETS,
      layouts: DEFAULT_LAYOUTS,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setSelectedWidget: (id) => set({ selectedWidgetId: id }),
      setHoveredWidget: (id) => set({ hoveredWidgetId: id }),
      setTool: (tool) => set({ tool }),
      setZoom: (zoom) => set({ zoom: Math.max(25, Math.min(150, zoom)) }),
      setBreakpoint: (breakpoint) => set({ breakpoint }),
      toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
      toggleSnap: () => set((s) => ({ snapToGrid: !s.snapToGrid })),
      toggleRulers: () => set((s) => ({ showRulers: !s.showRulers })),
      toggleWidgetLibrary: () => set((s) => ({ widgetLibraryOpen: !s.widgetLibraryOpen })),
      togglePropertiesPanel: () => set((s) => ({ propertiesPanelOpen: !s.propertiesPanelOpen })),
      toggleComponentTree: () => set((s) => ({ componentTreeOpen: !s.componentTreeOpen })),
      setDragging: (isDragging) => set({ isDragging }),
      setResizing: (isResizing) => set({ isResizing }),
      updateWidgetStyle: (id, style) =>
        set((s) => ({
          widgets: s.widgets.map((w) =>
            w.id === id ? { ...w, style: { ...w.style, ...style } } : w
          ),
        })),
      updateWidgetSettings: (id, settings) =>
        set((s) => ({
          widgets: s.widgets.map((w) =>
            w.id === id ? { ...w, settings: { ...w.settings, ...settings } } : w
          ),
        })),
      toggleWidgetVisibility: (id) =>
        set((s) => ({
          widgets: s.widgets.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)),
        })),
      deleteWidget: (id) =>
        set((s) => ({
          widgets: s.widgets.filter((w) => w.id !== id),
          selectedWidgetId: s.selectedWidgetId === id ? null : s.selectedWidgetId,
        })),
      duplicateWidget: (id) => {
        const widget = get().widgets.find((w) => w.id === id);
        if (!widget) return;
        const newId = generateId();
        set((s) => ({ widgets: [...s.widgets, { ...widget, id: newId, label: `${widget.label} (copy)` }] }));
      },
      addWidget: (bp, item) => {
        const newId = generateId();
        const newWidget: Widget = {
          id: newId, type: item.type, visible: true, locked: false, label: item.label,
          style: { ...DEFAULT_STYLE }, settings: {},
        };
        const newLayoutItem: GridLayoutItem = {
          i: newId, x: item.x, y: item.y, w: item.w, h: item.h
        };
        set((s) => ({ 
          widgets: [...s.widgets, newWidget],
          layouts: { ...s.layouts, [bp]: [...(s.layouts[bp] || []), newLayoutItem] }
        }));
      },
      updateLayouts: (bp, layout) =>
        set((s) => ({ layouts: { ...s.layouts, [bp]: layout } })),
      reorderWidgets: (from, to) => {
        const widgets = [...get().widgets];
        const [moved] = widgets.splice(from, 1);
        widgets.splice(to, 0, moved);
        set({ widgets });
      },
      fetchFromServer: async () => {
        try {
          const res = await fetch('/api/editor');
          if (res.ok) {
            let serverData = await res.json();
            if (typeof serverData === 'string') {
              try { serverData = JSON.parse(serverData); } catch (e) {}
            }
            if (serverData && typeof serverData === 'object' && Object.keys(serverData).length > 0) {
              set({ 
                widgets: serverData.widgets || DEFAULT_WIDGETS, 
                layouts: serverData.layouts || DEFAULT_LAYOUTS 
              });
            }
          }
        } catch (error) {
          console.error('Failed to fetch editor data from server', error);
        }
      },
      publishToServer: async () => {
        try {
          const state = useEditorStore.getState();
          const dataToSave = { widgets: state.widgets, layouts: state.layouts };
          const res = await fetch('/api/editor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSave),
          });
          if (!res.ok) throw new Error('Failed to publish editor data');
        } catch (error) {
          console.error('Failed to publish editor data to server', error);
          throw error;
        }
      },
    }),
    {
      name: 'rk-editor',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
      onRehydrateStorage: () => (state) => { state?.setHydrated(true); },
    }
  )
);
