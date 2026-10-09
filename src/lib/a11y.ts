export interface A11ySettings {
  fontScale: number; // 0 = default, 1 = large, 2 = larger, 3 = largest
  contrast: boolean; // high-contrast mode
  invert: boolean; // light mode (invert colors)
  dyslexia: boolean; // dyslexia-friendly font
  reduceMotion: boolean;
  bigCursor: boolean;
  highlightLinks: boolean;
}

export const DEFAULT_A11Y: A11ySettings = {
  fontScale: 0,
  contrast: false,
  invert: false,
  dyslexia: false,
  reduceMotion: false,
  bigCursor: false,
  highlightLinks: false,
};

export const FONT_SCALES = ['Default', 'Large', 'Larger', 'Largest'];
const STORAGE_KEY = 'sfe-a11y-settings';

export function loadA11y(): A11ySettings {
  if (typeof window === 'undefined') return DEFAULT_A11Y;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_A11Y;
    const parsed = JSON.parse(raw) as Partial<A11ySettings>;
    return { ...DEFAULT_A11Y, ...parsed };
  } catch {
    return DEFAULT_A11Y;
  }
}

export function saveA11y(settings: A11ySettings): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    /* storage unavailable (private mode) — ignore */
  }
}

export function applyA11y(settings: A11ySettings): void {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  el.dataset.a11yFont = String(settings.fontScale);
  el.dataset.a11yContrast = settings.contrast ? 'on' : 'off';
  el.dataset.a11yInvert = settings.invert ? 'on' : 'off';
  el.dataset.a11yDyslexia = settings.dyslexia ? 'on' : 'off';
  el.dataset.a11yMotion = settings.reduceMotion ? 'reduce' : 'normal';
  el.dataset.a11yCursor = settings.bigCursor ? 'big' : 'normal';
  el.dataset.a11yLinks = settings.highlightLinks ? 'on' : 'off';
}
