import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ThemeState, ThemeColors, ThemeTypography, Scene3DConfig, ThemePreset, CursorConfig, CursorStyle } from '@/types';
import { applyThemeToDOM } from '@/lib/theme';

const DEFAULT_COLORS: ThemeColors = {
  bgPrimary: '#0d0b14',
  bgSecondary: '#1a1625',
  bgTertiary: '#231e35',
  bgCard: '#1e1830',
  colorPrimary: '#c9a84c',
  colorPrimaryLight: '#e6b820',
  colorPrimaryDark: '#a07c2d',
  colorSecondary: '#7c6fcd',
  textPrimary: '#f5f3ff',
  textSecondary: '#b8b4d0',
  textMuted: '#7a7490',
};

const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  fontDisplay: 'Playfair Display',
  fontBody: 'DM Sans',
  scaleBase: 16,
  lineHeight: 1.7,
  letterSpacing: 0,
};

const DEFAULT_SCENE: Scene3DConfig = {
  enabled: true,
  helixEnabled: true,
  helixColor: '#c9a84c',
  helixRotationSpeed: 0.003,
  helixNodeCount: 40,
  particlesEnabled: true,
  particleCount: 100,
  particleColor1: '#c9a84c',
  particleColor2: '#7c6fcd',
  particleSize: 0.06,
  particleSpeed: 0.3,
  gridEnabled: true,
  gridColor: '#c9a84c',
  gridOpacity: 0.4,
  skillSpheresEnabled: true,
  skillSphereOrbitSpeed: 0.5,
  earthEnabled: true,
  bloomStrength: 0.4,
  chromaticAberration: 0.0008,
  filmGrain: 0.05,
  performanceMode: 'auto',
};

const DEFAULT_CURSOR: CursorConfig = {
  style: 'ring' as CursorStyle,
  color: '#c9a84c',
  size: 40,
  trailEnabled: false,
  trailLength: 8,
};

interface ThemeStore {
  theme: ThemeState;
  cursor: CursorConfig;
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  updateColors: (colors: Partial<ThemeColors>) => void;
  updateTypography: (typography: Partial<ThemeTypography>) => void;
  updateScene3D: (scene: Partial<Scene3DConfig>) => void;
  applyPreset: (preset: ThemePreset) => void;
  updateCursor: (cursor: Partial<CursorConfig>) => void;
  applyToDOM: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: {
        colors: DEFAULT_COLORS,
        typography: DEFAULT_TYPOGRAPHY,
        preset: 'dark-luxury' as ThemePreset,
        scene3D: DEFAULT_SCENE,
      },
      cursor: DEFAULT_CURSOR,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      updateColors: (colors) => {
        set((s) => {
          const newColors = { ...s.theme.colors, ...colors };
          return {
            theme: { 
              ...s.theme, 
              colors: newColors,
              scene3D: {
                ...s.theme.scene3D,
                ...(colors.colorPrimary ? {
                  helixColor: colors.colorPrimary,
                  particleColor1: colors.colorPrimary,
                  gridColor: colors.colorPrimary,
                } : {}),
                ...(colors.colorSecondary ? {
                  particleColor2: colors.colorSecondary,
                } : {})
              }
            },
          };
        });
        applyThemeToDOM({ ...get().theme.colors, ...colors });
      },
      updateTypography: (typography) =>
        set((s) => ({
          theme: { ...s.theme, typography: { ...s.theme.typography, ...typography } },
        })),
      updateScene3D: (scene) =>
        set((s) => ({
          theme: { ...s.theme, scene3D: { ...s.theme.scene3D, ...scene } },
        })),
      applyPreset: (preset) => {
        import('@/lib/theme').then(({ THEME_PRESETS }) => {
          const found = THEME_PRESETS.find((p) => p.id === preset);
          if (found) {
            set((s) => ({
              theme: { 
                ...s.theme, 
                colors: found.colors, 
                preset,
                scene3D: {
                  ...s.theme.scene3D,
                  helixColor: found.colors.colorPrimary,
                  particleColor1: found.colors.colorPrimary,
                  particleColor2: found.colors.colorSecondary,
                  gridColor: found.colors.colorPrimary,
                }
              },
            }));
            applyThemeToDOM(found.colors);
          }
        });
      },
      updateCursor: (cursor) =>
        set((s) => ({ cursor: { ...s.cursor, ...cursor } })),
      applyToDOM: () => {
        applyThemeToDOM(get().theme.colors);
      },
    }),
    {
      name: 'rk-theme',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
        state?.applyToDOM();
      },
    }
  )
);
