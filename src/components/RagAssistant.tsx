// @ts-nocheck
// SFE Knowledge chat widget. Answers come from the local engine in ../services/chatEngine (MAP guide + verified
// figures, no API keys, no network calls). The old version sent prompts to an unauthenticated Hugging Face endpoint
// that no longer responds, then fell back to pasting raw knowledge-base text.
import { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { answer, SUGGESTED_PROMPTS, WELCOME } from '../services/chatEngine';

function Rich({ text }) {
  const lines = String(text).split('\n');
  const inline = (s, k) => s.split(/(\*\*[^*]+\*\*)/g).map((part, i) => part.startsWith('**') && part.endsWith('**') ? <strong key={k + '-' + i} className="text-[#f4efe2] font-semibold">{part.slice(2, -2)}</strong> : <span key={k + '-' + i}>{part}</span>);
  const out = [];
  let list = [];
  const flush = (k) => { if (list.length) { out.push(<ul key={'u' + k} className="space-y-1 pl-1">{list}</ul>); list = []; } };
  lines.forEach((l, i) => {
    if (l.startsWith('• ')) list.push(<li key={i} className="flex gap-2"><span className="text-[#c9a24a]" aria-hidden="true">•</span><span>{inline(l.slice(2), i)}</span></li>);
    else { flush(i); if (l.trim()) out.push(<p key={i}>{inline(l, i)}</p>); }
  });
  flush('end');
  return <div className="space-y-2">{out}</div>;
}

export default function RagAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: WELCOME, chips: SUGGESTED_PROMPTS }]);
  const inputRef = useRef(null), listRef = useRef(null), ctx = useRef({});

  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [msgs, busy]);
  useEffect(() => {
    // On phones, lift the launcher above the hero's "Scroll to explore" cue while the hero is on screen.
    const check = () => setLifted(window.innerWidth < 640 && window.scrollY < window.innerHeight * 0.6);
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = (text) => {
    const q = String(text || input).trim();
    if (!q || busy) return;
    setMsgs((m) => [...m, { role: 'user', content: q }]);
    setInput('');
    setBusy(true);
    setTimeout(() => {
      let r;
      try { r = answer(q, ctx.current); } catch (e) { r = { text: 'Sorry, something went wrong on my side. Miguel can answer that directly: 786-460-1023 or DM MAP.', chips: [] }; }
      setMsgs((m) => [...m, { role: 'assistant', content: r.text, chips: (r.chips || []).filter(Boolean) }]);
      setBusy(false);
    }, 280);
  };
  const last = msgs[msgs.length - 1];

  return (
    <>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} aria-label="Open SFE Knowledge assistant" data-chat-launcher="" style={{ transform: lifted ? 'translateY(-76px)' : 'none' }} className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 rounded-full bg-[#c9a24a] text-[#0e1416] flex items-center justify-center shadow-2xl hover:bg-[#deb65b] transition-[transform,background-color] duration-300 cursor-pointer">
          <Sparkles className="w-6 h-6" aria-hidden="true" />
        </button>
      )}
      {open && (
        <div role="dialog" aria-label="SFE Knowledge assistant" data-chat-panel="" className="fixed z-50 inset-x-3 bottom-3 h-[min(78vh,620px)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[390px] sm:h-[580px] sm:max-h-[calc(100vh-110px)] bg-[#141a1d] border border-[rgba(201,162,74,0.35)] shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(244,239,226,0.1)] bg-[#0e1416]">
            <div className="flex items-center gap-3 min-w-0">
              <img src="/assets/brand/sfe-elevated-logo-v4-white-gold-240.webp" srcSet="/assets/brand/sfe-elevated-logo-v4-white-gold-240.webp 240w, /assets/brand/sfe-elevated-logo-v4-white-gold-360.webp 360w, /assets/brand/sfe-elevated-logo-v4-white-gold-480.webp 480w, /assets/brand/sfe-elevated-logo-v4-white-gold-720.webp 720w, /assets/brand/sfe-elevated-logo-v4-white-gold-960.webp 960w, /assets/brand/sfe-elevated-logo-v4-white-gold-1440.webp 1440w" sizes="121px" alt="South Florida Elevated" width={121} height={28} decoding="async" className="block h-7 w-auto shrink-0" />
              <div className="min-w-0 leading-tight">
                <span className="block font-sans text-sm font-medium text-[#f4efe2]">Knowledge</span>
                <span className="block truncate font-mono text-[10px] uppercase tracking-wider text-[#f4efe2]/70">MAP guide + verified data</span>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#f4efe2]/80 hover:text-[#f4efe2] cursor-pointer" aria-label="Close assistant">
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3" aria-live="polite" tabIndex={0}>
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-[rgba(201,162,74,0.18)] text-[#f4efe2] border border-[rgba(201,162,74,0.3)]' : 'bg-[#0e1416] text-[#f4efe2]/90 border border-[rgba(244,239,226,0.1)]'}`}>
                  {m.role === 'user' ? m.content : <Rich text={m.content} />}
                </div>
              </div>
            ))}
            {busy && (
              <div className="flex justify-start">
                <div className="bg-[#0e1416] border border-[rgba(244,239,226,0.1)] rounded-lg px-3 py-2 font-mono text-[11px] text-[#f4efe2]/75">Checking the MAP guide…</div>
              </div>
            )}
          </div>
          {!busy && last.role === 'assistant' && last.chips && last.chips.length > 0 && (
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5" aria-label="Suggested questions">
              {last.chips.map((c) => (
                <button key={c} type="button" onClick={() => ask(c)} className="text-[11px] font-mono px-2 py-1 border border-[rgba(244,239,226,0.2)] text-[#f4efe2]/85 hover:border-[#c9a24a] hover:text-[#ffd9a0] transition-colors cursor-pointer text-left">{c}</button>
              ))}
            </div>
          )}
          <form className="border-t border-[rgba(244,239,226,0.1)] p-3 flex gap-2" onSubmit={(e) => { e.preventDefault(); ask(); }}>
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} aria-label="Ask about South Florida real estate" placeholder="Ask about a neighborhood, buying, selling…" className="flex-1 min-w-0 bg-[#0e1416] border border-[rgba(244,239,226,0.2)] px-3 py-2 text-sm text-[#f4efe2] placeholder-[#f4efe2]/55 outline-none focus:border-[#c9a24a] transition-colors" />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="w-10 h-10 bg-[#c9a24a] text-[#0e1416] flex items-center justify-center hover:bg-[#deb65b] transition-colors disabled:opacity-50 cursor-pointer">
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
          <p className="px-3 pb-2 font-mono text-[10px] text-[#f4efe2]/70">General information, not legal, tax or financial advice. Miguel: 786-460-1023</p>
        </div>
      )}
    </>
  );
}
