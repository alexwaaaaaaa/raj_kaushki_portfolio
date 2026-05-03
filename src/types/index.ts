// ============================================================
// GLOBAL TYPE DEFINITIONS
// All types used across the application are defined here.
// ============================================================

// ── PORTFOLIO DATA TYPES ─────────────────────────────────────

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  bullets: string[];
  logoUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
  category: 'Core' | 'Soft' | 'Operations' | string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId: string;
  color: string;
  verifyUrl?: string;
}

export interface StrengthItem {
  icon: string;
  label: string;
  desc: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  location?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string[];
  location: string;
  linkedin: string;
  summary: string;
  stats: Stat[];
  avatarUrl?: string;
  aboutImage?: string;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  experience: ExperienceItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  strengths: StrengthItem[];
  events: EventItem[];
}

// ── THEME TYPES ──────────────────────────────────────────────

export type ThemePreset =
  | 'dark-luxury'
  | 'midnight-blue'
  | 'clean-white'
  | 'forest'
  | 'neon-tokyo'
  | 'rose-gold'
  | 'deep-purple'
  | 'monochrome'
  | 'panda-tech';

export interface ThemeColors {
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  colorPrimary: string;
  colorPrimaryLight: string;
  colorPrimaryDark: string;
  colorSecondary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export interface ThemeTypography {
  fontDisplay: string;
  fontBody: string;
  scaleBase: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface Scene3DConfig {
  enabled: boolean;
  helixEnabled: boolean;
  helixColor: string;
  helixRotationSpeed: number;
  helixNodeCount: number;
  particlesEnabled: boolean;
  particleCount: number;
  particleColor1: string;
  particleColor2: string;
  particleSize: number;
  particleSpeed: number;
  gridEnabled: boolean;
  gridColor: string;
  gridOpacity: number;
  skillSpheresEnabled: boolean;
  skillSphereOrbitSpeed: number;
  earthEnabled: boolean;
  bloomStrength: number;
  chromaticAberration: number;
  filmGrain: number;
  performanceMode: 'low' | 'medium' | 'high' | 'ultra' | 'auto';
}

export interface ThemeState {
  colors: ThemeColors;
  typography: ThemeTypography;
  preset: ThemePreset;
  scene3D: Scene3DConfig;
}

// ── EDITOR / WYSIWYG TYPES ───────────────────────────────────

export type WidgetType =
  | 'hero'
  | 'about'
  | 'experience'
  | 'skills'
  | 'stats'
  | 'certifications'
  | 'strengths'
  | 'contact'
  | 'footer'
  | 'custom-text'
  | 'spacer'
  | 'quote';

export type AnimationType =
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'zoomIn'
  | 'flip'
  | 'rotateIn'
  | 'bounce'
  | 'none';

export type BackgroundType =
  | 'transparent'
  | 'solid'
  | 'gradient'
  | 'glass'
  | 'image'
  | 'video'
  | 'mesh';

export type BorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';

export interface GradientStop {
  id: string;
  color: string;
  position: number;
}

export interface WidgetBackground {
  type: BackgroundType;
  color?: string;
  gradient?: {
    stops: GradientStop[];
    direction: number;
    type: 'linear' | 'radial' | 'conic';
  };
  imageUrl?: string;
  videoUrl?: string;
}

export interface WidgetBorder {
  width: number;
  widthTop?: number;
  widthRight?: number;
  widthBottom?: number;
  widthLeft?: number;
  style: BorderStyle;
  color: string;
  radiusAll?: number;
  radiusTL?: number;
  radiusTR?: number;
  radiusBR?: number;
  radiusBL?: number;
}

export interface BoxShadow {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
}

export interface WidgetSpacing {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface WidgetAnimation {
  entrance: AnimationType;
  delay: number;
  duration: number;
  hoverEffect: 'none' | 'lift' | 'scale' | 'glow' | 'shake' | 'rotate' | 'color-shift' | 'border-glow';
  clickEffect: 'none' | 'ripple' | 'press' | 'bounce';
}

export interface WidgetTypography {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  color: string;
}

export interface WidgetStyle {
  background: WidgetBackground;
  border: WidgetBorder;
  shadows: BoxShadow[];
  spacing: WidgetSpacing;
  opacity: number;
  zIndex: number;
  animation: WidgetAnimation;
}

// Widget-specific settings
export interface HeroWidgetSettings {
  backgroundType: 'particles' | 'video' | 'image' | 'gradient' | 'solid';
  textAlignment: 'left' | 'center' | 'right';
  nameStyle: 'default' | 'outline' | 'gradient' | '3d';
  showTagline: boolean;
  showCTAButtons: boolean;
  showScrollIndicator: boolean;
  showStats: boolean;
  cta1Text: string;
  cta1Link: string;
  cta1Style: 'fill' | 'outline' | 'ghost';
  cta2Text: string;
  cta2Link: string;
  cta2Style: 'fill' | 'outline' | 'ghost';
  particleCount: number;
  particleColor: string;
  particleSize: number;
  particleSpeed: number;
  enable3DHelix: boolean;
  helixPosition: 'left' | 'right' | 'center' | 'background';
}

export interface ExperienceWidgetSettings {
  timelineStyle:
    | 'alternating'
    | 'left-only'
    | 'right-only'
    | 'cards-grid'
    | 'horizontal-scroll'
    | '3d-tunnel'
    | 'minimal-list';
  cardStyle: 'default' | 'glassmorphism' | 'bordered' | 'minimal' | 'magazine' | 'newspaper';
  showCompanyLogo: boolean;
  dateFormat: 'relative' | 'absolute' | 'range';
  bulletStyle: 'dot' | 'arrow' | 'check' | 'number' | 'none';
  cardWidth: number;
  cardGap: number;
}

export interface SkillsWidgetSettings {
  displayStyle:
    | 'animated-bars'
    | 'circular-progress'
    | 'hexagon-grid'
    | 'tag-cloud'
    | '3d-spheres'
    | 'radar-chart'
    | 'bubble-chart'
    | 'treemap';
  showPercentage: boolean;
  showCategoryTabs: boolean;
  barHeight: number;
  barBorderRadius: number;
  colorMode: 'single' | 'gradient' | 'per-category';
  sortBy: 'level' | 'name' | 'category' | 'custom';
}

export interface ContactWidgetSettings {
  layout: 'side-by-side' | 'stacked' | 'full-width-form';
  formStyle: 'default' | 'floating-labels' | 'underline' | 'box';
  showMap: boolean;
  showAvailabilityBadge: boolean;
  background: 'glass' | 'solid' | 'gradient';
}

export type WidgetSettings =
  | HeroWidgetSettings
  | ExperienceWidgetSettings
  | SkillsWidgetSettings
  | ContactWidgetSettings
  | Record<string, unknown>;

export interface GridLayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface Widget {
  id: string;
  type: WidgetType;
  visible: boolean;
  locked: boolean;
  label: string;
  style: WidgetStyle;
  settings: WidgetSettings;
  customContent?: string;
}

export interface LayoutBreakpoints {
  lg: GridLayoutItem[];
  md: GridLayoutItem[];
  sm: GridLayoutItem[];
  xs: GridLayoutItem[];
  xxs: GridLayoutItem[];
}

// ── EDITOR STATE TYPES ───────────────────────────────────────

export type EditorTool = 'select' | 'move' | 'add';
export type EditorBreakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export interface EditorState {
  selectedWidgetId: string | null;
  hoveredWidgetId: string | null;
  tool: EditorTool;
  zoom: number;
  showGrid: boolean;
  snapToGrid: boolean;
  showRulers: boolean;
  breakpoint: EditorBreakpoint;
  widgetLibraryOpen: boolean;
  propertiesPanelOpen: boolean;
  componentTreeOpen: boolean;
  isDragging: boolean;
  isResizing: boolean;
}

// ── HISTORY TYPES ────────────────────────────────────────────

export type HistoryActionType =
  | 'UPDATE_WIDGET_STYLE'
  | 'UPDATE_WIDGET_SETTINGS'
  | 'MOVE_WIDGET'
  | 'RESIZE_WIDGET'
  | 'ADD_WIDGET'
  | 'DELETE_WIDGET'
  | 'REORDER_SECTION'
  | 'UPDATE_THEME'
  | 'UPDATE_PROFILE'
  | 'UPDATE_EXPERIENCE'
  | 'UPDATE_SKILLS'
  | 'UPDATE_EVENTS';

export interface HistoryAction {
  id: string;
  type: HistoryActionType;
  timestamp: number;
  description: string;
  before: unknown;
  after: unknown;
}

// ── CURSOR TYPES ─────────────────────────────────────────────

export type CursorStyle =
  | 'default'
  | 'gold-dot'
  | 'ring'
  | 'magnetic'
  | '3d-sphere'
  | 'text'
  | 'custom-svg';

export interface CursorConfig {
  style: CursorStyle;
  color: string;
  size: number;
  trailEnabled: boolean;
  trailLength: number;
}

// ── EXPORT TYPES ─────────────────────────────────────────────

export interface ExportConfig {
  format: 'json' | 'html' | 'pdf';
  includeTheme: boolean;
  includeLayout: boolean;
  includeContent: boolean;
}

// ── FONT TYPES ───────────────────────────────────────────────

export interface FontPairing {
  id: string;
  name: string;
  display: string;
  body: string;
  displayUrl: string;
  bodyUrl: string;
}

// ── ADMIN TYPES ──────────────────────────────────────────────

export type AdminTab =
  | 'dashboard'
  | 'profile'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'strengths'
  | 'events'
  | 'theme'
  | 'layout-editor'
  | 'cursor'
  | 'responsive'
  | 'export';

export interface AdminState {
  authenticated: boolean;
  activeTab: AdminTab;
  sidebarCollapsed: boolean;
  unsavedChanges: boolean;
  lastSaved: number | null;
  autoSave: boolean;
}

// ── FORM TYPES ───────────────────────────────────────────────

export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  message: string;
}

// ── UTILITY TYPES ────────────────────────────────────────────

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export interface Point2D {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
