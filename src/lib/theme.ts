import type { ThemeColors, ThemePreset } from '@/types';

export interface PresetTheme {
  id: ThemePreset;
  name: string;
  colors: ThemeColors;
}

export const THEME_PRESETS: PresetTheme[] = [
  {
    id: 'dark-luxury',
    name: 'Dark Luxury',
    colors: {
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
    },
  },
  {
    id: 'panda-tech',
    name: 'Panda Tech',
    colors: {
      bgPrimary: '#0b1120',
      bgSecondary: '#0f172a',
      bgTertiary: '#1e293b',
      bgCard: '#1e293b',
      colorPrimary: '#06b6d4',
      colorPrimaryLight: '#22d3ee',
      colorPrimaryDark: '#0891b2',
      colorSecondary: '#8b5cf6',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      textMuted: '#64748b',
    },
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    colors: {
      bgPrimary: '#060d1e',
      bgSecondary: '#0d1f3c',
      bgTertiary: '#142d54',
      bgCard: '#0f2540',
      colorPrimary: '#4d9de0',
      colorPrimaryLight: '#67b3f0',
      colorPrimaryDark: '#3377b8',
      colorSecondary: '#2ecc71',
      textPrimary: '#e8f4fd',
      textSecondary: '#a0bcd8',
      textMuted: '#5a7a9a',
    },
  },
  {
    id: 'clean-white',
    name: 'Clean White',
    colors: {
      bgPrimary: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#f0f2f5',
      bgCard: '#ffffff',
      colorPrimary: '#1a1a1a',
      colorPrimaryLight: '#333333',
      colorPrimaryDark: '#000000',
      colorSecondary: '#6366f1',
      textPrimary: '#111111',
      textSecondary: '#444444',
      textMuted: '#888888',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    colors: {
      bgPrimary: '#0a1409',
      bgSecondary: '#12201f',
      bgTertiary: '#1a2e1d',
      bgCard: '#142118',
      colorPrimary: '#4caf50',
      colorPrimaryLight: '#66bb6a',
      colorPrimaryDark: '#388e3c',
      colorSecondary: '#8d6e63',
      textPrimary: '#e8f5e9',
      textSecondary: '#a5d6a7',
      textMuted: '#5a7a5c',
    },
  },
  {
    id: 'neon-tokyo',
    name: 'Neon Tokyo',
    colors: {
      bgPrimary: '#050510',
      bgSecondary: '#0a0a20',
      bgTertiary: '#0f0f30',
      bgCard: '#080818',
      colorPrimary: '#ff2d78',
      colorPrimaryLight: '#ff6ba8',
      colorPrimaryDark: '#cc1a5a',
      colorSecondary: '#00e5ff',
      textPrimary: '#ffffff',
      textSecondary: '#ccccff',
      textMuted: '#7777aa',
    },
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    colors: {
      bgPrimary: '#1a0f0f',
      bgSecondary: '#2d1a1a',
      bgTertiary: '#3d2222',
      bgCard: '#251515',
      colorPrimary: '#e8967a',
      colorPrimaryLight: '#f0b09a',
      colorPrimaryDark: '#c07060',
      colorSecondary: '#d4b896',
      textPrimary: '#fdf0ec',
      textSecondary: '#d4b8b0',
      textMuted: '#8a6a60',
    },
  },
  {
    id: 'deep-purple',
    name: 'Deep Purple',
    colors: {
      bgPrimary: '#0f0a1e',
      bgSecondary: '#1a1030',
      bgTertiary: '#241640',
      bgCard: '#160d28',
      colorPrimary: '#9c27b0',
      colorPrimaryLight: '#ba68c8',
      colorPrimaryDark: '#7b1fa2',
      colorSecondary: '#e040fb',
      textPrimary: '#f3e5f5',
      textSecondary: '#ce93d8',
      textMuted: '#7b5e8a',
    },
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#111111',
      bgTertiary: '#1a1a1a',
      bgCard: '#0d0d0d',
      colorPrimary: '#ffffff',
      colorPrimaryLight: '#eeeeee',
      colorPrimaryDark: '#cccccc',
      colorSecondary: '#888888',
      textPrimary: '#ffffff',
      textSecondary: '#aaaaaa',
      textMuted: '#666666',
    },
  },
];

export function applyThemeToDOM(colors: ThemeColors): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--bg-primary', colors.bgPrimary);
  root.style.setProperty('--bg-secondary', colors.bgSecondary);
  root.style.setProperty('--bg-tertiary', colors.bgTertiary);
  root.style.setProperty('--bg-card', colors.bgCard);
  root.style.setProperty('--color-primary', colors.colorPrimary);
  root.style.setProperty('--color-primary-light', colors.colorPrimaryLight);
  root.style.setProperty('--color-primary-dark', colors.colorPrimaryDark);
  root.style.setProperty('--color-secondary', colors.colorSecondary);
  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--text-muted', colors.textMuted);
}

export function getPresetById(id: ThemePreset): PresetTheme | undefined {
  return THEME_PRESETS.find((p) => p.id === id);
}
