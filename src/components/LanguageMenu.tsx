import { useEffect, useRef, useState } from 'react';
import { Globe, X, Check } from 'lucide-react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => unknown;
      };
    };
  }
}

const LANGS = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'zh-CN', name: 'Chinese', native: '中文' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
];

const SCRIPT_ID = 'google-translate-script';
const INCLUDED = LANGS.map((l) => l.code).join(',');

function initGoogleTranslate() {
  window.googleTranslateElementInit = () => {
    const el = document.getElementById('google_translate_element');
    if (el && window.google?.translate) {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: INCLUDED, autoDisplay: false },
        'google_translate_element'
      );
    }
  };
  if (!document.getElementById(SCRIPT_ID)) {
    const s = document.createElement('script');
    s.id = SCRIPT_ID;
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  }
}

function getCurrentLang(): string {
  if (typeof document === 'undefined') return 'en';
  const m = document.cookie.match(/(?:^|; )googtrans=\/en\/([^;]+)/);
  const code = m ? decodeURIComponent(m[1]) : 'en';
  return LANGS.some((l) => l.code === code) ? code : 'en';
}

function setLanguage(code: string) {
  const host = window.location.hostname;
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const write = (value: string, domain?: string) => {
    try {
      document.cookie =
        `googtrans=${value}; path=/${domain ? `; domain=${domain}` : ''}` +
        (value ? '' : `; ${expired}`);
    } catch {
      /* invalid domain — ignore */
    }
  };

  if (code === 'en') {
    write('');
    write('', host);
    write('', `.${host}`);
  } else {
    const val = `/en/${code}`;
    write(val);
    write(val, host);
    write(val, `.${host}`);
  }
  window.location.reload();
}

interface LanguageMenuProps {
  variant?: 'floating' | 'inline';
  className?: string;
}

export default function LanguageMenu({ variant = 'floating', className = '' }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('en');
  const ref = useRef<HTMLDivElement>(null);

  // Load the translator if a non-English language was previously chosen.
  useEffect(() => {
    const active = getCurrentLang();
    setCurrent(active);
    if (active !== 'en') initGoogleTranslate();
  }, []);

  // Open the panel from anywhere (e.g. the footer link).
  useEffect(() => {
    const handler = () => {
      initGoogleTranslate();
      setOpen(true);
    };
    window.addEventListener('sfe:open-lang', handler);
    return () => window.removeEventListener('sfe:open-lang', handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointer);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  const currentLang = LANGS.find((l) => l.code === current) ?? LANGS[0];

  const options = (
    <ul role="listbox" aria-label="Choose a language" className="list-none m-0 p-0 space-y-0.5">
      {LANGS.map((l) => {
        const selected = l.code === current;
        return (
          <li key={l.code}>
            <button
              role="option"
              aria-selected={selected}
              onClick={() => setLanguage(l.code)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-left transition-colors cursor-pointer bg-transparent border-none ${
                selected ? 'bg-[rgba(201,162,74,0.1)] text-[#c9a24a]' : 'text-[#f4efe2] hover:bg-[rgba(244,239,226,0.06)]'
              }`}
            >
              <span className="flex flex-col leading-tight">
                <span className="text-[13px]">{l.native}</span>
                {l.native !== l.name && (
                  <span className="text-[10px] text-[#f4efe2]/60">{l.name}</span>
                )}
              </span>
              {selected && <Check className="w-3.5 h-3.5 text-[#c9a24a]" aria-hidden="true" />}
            </button>
          </li>
        );
      })}
    </ul>
  );

  if (variant === 'inline') {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <button
          onClick={() => {
            initGoogleTranslate();
            setOpen((o) => !o);
          }}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={`Change language (current: ${currentLang.name})`}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#c9a24a] hover:text-[#ffd9a0] transition-colors cursor-pointer bg-transparent border-none"
        >
          <Globe className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{currentLang.native}</span>
        </button>
        {open && (
          <div
            className="absolute bottom-full right-0 mb-3 w-48 max-h-72 overflow-y-auto bg-[#0B0B0B] border border-[rgba(201,162,74,0.35)] shadow-2xl py-1.5 animate-fadeIn"
            role="dialog"
            aria-label="Choose a language"
          >
            {options}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className={`fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-[120] print:hidden ${className}`}>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Choose a language"
          className="absolute bottom-16 left-0 w-56 max-h-[70vh] overflow-y-auto bg-[#0B0B0B] border border-[rgba(201,162,74,0.35)] shadow-2xl animate-fadeIn"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(244,239,226,0.08)] sticky top-0 bg-[#0B0B0B]">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#c9a24a]" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#c9a24a]">
                Language
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close language menu"
              className="text-[#f4efe2]/60 hover:text-[#c9a24a] transition-colors p-1 cursor-pointer bg-transparent border-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-1.5">{options}</div>
        </div>
      )}
      <button
        onClick={() => {
          initGoogleTranslate();
          setOpen((o) => !o);
        }}
        aria-label={`Change language (current: ${currentLang.name})`}
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Change language"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0B0B0B] border border-[rgba(201,162,74,0.5)] text-[#c9a24a] shadow-2xl hover:bg-[#c9a24a] hover:text-[#0B0B0B] transition-colors cursor-pointer"
      >
        <Globe className="w-6 h-6" />
      </button>
    </div>
  );
}
