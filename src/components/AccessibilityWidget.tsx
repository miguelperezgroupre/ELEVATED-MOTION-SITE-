import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Accessibility,
  X,
  Plus,
  Minus,
  RotateCcw,
  Contrast,
  Eye,
  Link2,
  MousePointer2,
  Sparkles,
  Zap,
  BookOpen,
  CaseSensitive,
} from 'lucide-react';
import {
  A11ySettings,
  DEFAULT_A11Y,
  FONT_SCALES,
  applyA11y,
  loadA11y,
  saveA11y,
} from '../lib/a11y';

interface ToggleDef {
  key: keyof Pick<
    A11ySettings,
    'contrast' | 'invert' | 'dyslexia' | 'reduceMotion' | 'bigCursor' | 'highlightLinks'
  >;
  label: string;
  hint: string;
  icon: typeof Contrast;
}

const TOGGLES: ToggleDef[] = [
  { key: 'contrast', label: 'High contrast', hint: 'Boost text & background contrast', icon: Contrast },
  { key: 'invert', label: 'Light mode', hint: 'Invert the dark theme to light', icon: Eye },
  { key: 'dyslexia', label: 'Readable font', hint: 'Dyslexia-friendly typeface', icon: BookOpen },
  { key: 'highlightLinks', label: 'Highlight links', hint: 'Underline and mark every link', icon: Link2 },
  { key: 'reduceMotion', label: 'Reduce motion', hint: 'Pause animations and transitions', icon: Zap },
  { key: 'bigCursor', label: 'Large cursor', hint: 'Enlarge the mouse pointer', icon: MousePointer2 },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_A11Y);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = loadA11y();
    setSettings(saved);
    applyA11y(saved);
  }, []);

  const update = useCallback((next: A11ySettings) => {
    setSettings(next);
    applyA11y(next);
    saveA11y(next);
  }, []);

  const toggle = (key: ToggleDef['key']) =>
    update({ ...settings, [key]: !settings[key] });

  const changeFont = (dir: 1 | -1) =>
    update({
      ...settings,
      fontScale: Math.min(3, Math.max(0, settings.fontScale + dir)),
    });

  const reset = () => update({ ...DEFAULT_A11Y });

  // Open the panel from anywhere (e.g. the footer link).
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('sfe:open-a11y', handler);
    return () => window.removeEventListener('sfe:open-a11y', handler);
  }, []);

  // Escape closes; click outside closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        buttonRef.current &&
        !buttonRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  const activeCount =
    (settings.contrast ? 1 : 0) +
    (settings.invert ? 1 : 0) +
    (settings.dyslexia ? 1 : 0) +
    (settings.highlightLinks ? 1 : 0) +
    (settings.reduceMotion ? 1 : 0) +
    (settings.bigCursor ? 1 : 0) +
    (settings.fontScale > 0 ? 1 : 0);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[120] print:hidden">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility options"
          className="absolute bottom-16 right-0 w-[calc(100vw-2.5rem)] max-w-[340px] bg-[#0B0B0B] border border-[rgba(201,162,74,0.35)] shadow-2xl animate-fadeIn"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(244,239,226,0.08)]">
            <div className="flex items-center gap-2.5">
              <Accessibility className="w-4 h-4 text-[#c9a24a]" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#c9a24a]">
                Accessibility
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility options"
              className="text-[#f4efe2]/60 hover:text-[#c9a24a] transition-colors p-1 cursor-pointer bg-transparent border-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-5 py-4 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Text size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#f4efe2]/60">
                  Text size
                </span>
                <span className="font-mono text-[10px] text-[#c9a24a]">
                  {FONT_SCALES[settings.fontScale]}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeFont(-1)}
                  disabled={settings.fontScale === 0}
                  aria-label="Decrease text size"
                  className="flex-1 h-10 flex items-center justify-center gap-1 border border-[rgba(244,239,226,0.15)] text-[#f4efe2] hover:border-[#c9a24a] hover:text-[#c9a24a] disabled:opacity-30 transition-colors cursor-pointer bg-transparent"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <CaseSensitive className="w-4 h-4" />
                </button>
                <button
                  onClick={() => changeFont(1)}
                  disabled={settings.fontScale === 3}
                  aria-label="Increase text size"
                  className="flex-1 h-10 flex items-center justify-center gap-1 border border-[rgba(244,239,226,0.15)] text-[#f4efe2] hover:border-[#c9a24a] hover:text-[#c9a24a] disabled:opacity-30 transition-colors cursor-pointer bg-transparent"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <CaseSensitive className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-1.5">
              {TOGGLES.map(({ key, label, hint, icon: Icon }) => {
                const isOn = settings[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggle(key)}
                    aria-pressed={isOn}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border transition-colors cursor-pointer bg-transparent ${
                      isOn
                        ? 'border-[#c9a24a] bg-[rgba(201,162,74,0.08)]'
                        : 'border-[rgba(244,239,226,0.1)] hover:border-[rgba(201,162,74,0.5)]'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isOn ? 'text-[#c9a24a]' : 'text-[#f4efe2]/70'}`}
                      aria-hidden="true"
                    />
                    <span className="flex-1 min-w-0">
                      <span className="block text-[13px] text-[#f4efe2] leading-tight">{label}</span>
                      <span className="block text-[10px] text-[#f4efe2]/45 leading-tight mt-0.5">
                        {hint}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-8 h-4 rounded-full relative shrink-0 transition-colors ${
                        isOn ? 'bg-[#c9a24a]' : 'bg-[#f4efe2]/15'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-3 h-3 rounded-full bg-[#0B0B0B] transition-all ${
                          isOn ? 'left-4' : 'left-0.5'
                        }`}
                      />
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#f4efe2]/45">
                <Sparkles className="w-3 h-3 text-[#c9a24a]" aria-hidden="true" />
                {activeCount > 0 ? `${activeCount} active` : 'No adjustments'}
              </span>
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#c9a24a] hover:text-[#ffd9a0] transition-colors cursor-pointer bg-transparent border-none"
              >
                <RotateCcw className="w-3 h-3" />
                Reset all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-label="Accessibility options"
        aria-expanded={open}
        title="Accessibility options"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0B0B0B] border border-[rgba(201,162,74,0.5)] text-[#c9a24a] shadow-2xl hover:bg-[#c9a24a] hover:text-[#0B0B0B] transition-colors cursor-pointer"
      >
        <Accessibility className="w-6 h-6" />
      </button>
    </div>
  );
}
