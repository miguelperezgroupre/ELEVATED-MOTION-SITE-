// @ts-nocheck
import {jsx, jsxs} from 'react/jsx-runtime';
import {TERMS_EFFECTIVE, TERMS_INTRO, TERMS_SECTIONS, TERMS_TITLE} from '../../content/legal/terms';
import {PRIVACY_EFFECTIVE, PRIVACY_INTRO, PRIVACY_SECTIONS, PRIVACY_TITLE} from '../../content/legal/privacy';

const DOCS = {
  terms: {
    eyebrow: 'Legal',
    title: TERMS_TITLE,
    effective: TERMS_EFFECTIVE,
    intro: TERMS_INTRO,
    sections: TERMS_SECTIONS,
    other: {label: 'Privacy Policy', path: '/privacy-policy', view: 'privacy-policy'},
  },
  privacy: {
    eyebrow: 'Legal',
    title: PRIVACY_TITLE,
    effective: PRIVACY_EFFECTIVE,
    intro: PRIVACY_INTRO,
    sections: PRIVACY_SECTIONS,
    other: {label: 'Terms of Service', path: '/terms-of-service', view: 'terms-of-service'},
  },
};

export default function LegalView({doc = 'terms', onNavigate}) {
  const d = DOCS[doc] || DOCS.terms;
  return jsxs('div', {
    className: 'pb-24 animate-fadeIn',
    children: [
      jsx('section', {
        className: 'pt-28 sm:pt-32 pb-10 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B]',
        children: jsxs('div', {
          className: 'wrap max-w-3xl',
          children: [
            jsx('p', {className: 'font-mono text-[11px] tracking-[0.22em] uppercase text-[#C9A24A] m-0', children: d.eyebrow}),
            jsx('h1', {className: 'font-serif font-normal text-[40px] sm:text-[56px] leading-[1.05] text-[#F4EFE2] mt-3 mb-4', children: d.title}),
            jsx('p', {className: 'font-mono text-[11px] text-[#F4EFE2]/55 m-0', children: `Effective date: ${d.effective}`}),
            jsx('p', {className: 'text-base sm:text-lg text-[#F4EFE2]/80 font-light leading-relaxed mt-6 m-0', children: d.intro}),
          ],
        }),
      }),
      jsx('section', {
        className: 'py-12 sm:py-16 bg-[#0e1416]',
        children: jsxs('div', {
          className: 'wrap max-w-3xl space-y-12',
          children: [
            jsx('nav', {
              'aria-label': 'On this page',
              className: 'p-5 border border-[rgba(244,239,226,0.1)] bg-[#141a1d]',
              children: jsxs('div', {
                children: [
                  jsx('p', {className: 'font-mono text-[10px] tracking-[0.2em] uppercase text-[#C9A24A] m-0 mb-3', children: 'Contents'}),
                  jsx('ol', {
                    className: 'space-y-2 list-decimal list-inside m-0 p-0',
                    children: d.sections.map((s) => jsx('li', {
                      className: 'text-sm text-[#F4EFE2]/75',
                      children: jsx('a', {
                        href: `#${s.id}`,
                        className: 'text-[#F4EFE2]/85 hover:text-[#C9A24A] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24A]',
                        children: s.title.replace(/^\d+\.\s*/, ''),
                      }),
                    }, s.id)),
                  }),
                ],
              }),
            }),
            d.sections.map((s) => jsxs('article', {
              id: s.id,
              className: 'scroll-mt-28 space-y-4',
              children: [
                jsx('h2', {className: 'font-serif font-normal text-[26px] sm:text-[32px] text-[#F4EFE2] leading-tight m-0', children: s.title}),
                s.paragraphs.map((p, i) => jsx('p', {
                  className: 'text-[15px] sm:text-base text-[#F4EFE2]/80 font-light leading-relaxed m-0',
                  children: p,
                }, i)),
              ],
            }, s.id)),
            jsxs('p', {
              className: 'pt-8 border-t border-[rgba(244,239,226,0.08)] text-sm text-[#F4EFE2]/65 m-0',
              children: [
                'Also see our ',
                jsx('a', {
                  href: d.other.path,
                  onClick: (e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    onNavigate?.(d.other.view);
                  },
                  className: 'text-[#C9A24A] hover:text-[#ffd9a0] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24A]',
                  children: d.other.label,
                }),
                '.',
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
