// @ts-nocheck
// South Florida Elevated: Navigation.tsx (compact build copy; formatted source kept in the project kit under readable/src/components/Navigation.tsx).
import * as R from 'react';
import { pathFor } from '../routes';
import * as n from 'react/jsx-runtime';
import {
 Phone as Cl,
 ArrowRight as ue,
 X as Ta,
 Menu as ib
} from 'lucide-react';

function Navigation({
 currentView: m,
 onNavigate: u,
 onOpenContact: d
}) {
 const [c, x] = R.useState(false), [g, C] = R.useState(false);
 R.useEffect(() => {
  let raf = 0,
   last = null;
  const read = () => {
   raf = 0;
   const s = window.scrollY > 40;
   if (s !== last) {
    last = s;
    x(s);
   }
  };
  const v = () => {
   if (!raf) raf = requestAnimationFrame(read);
  };
  read();
  window.addEventListener('scroll', v, {
   passive: true
  });
  return () => {
   window.removeEventListener('scroll', v);
   if (raf) cancelAnimationFrame(raf);
  };
 }, []);
 const A = [{
   id: 'buy',
   label: 'Buy'
  }, {
   id: 'sell',
   label: 'Sell'
  }, {
   id: 'relocate',
   label: 'Relocate'
  }, {
   id: 'invest',
   label: 'Invest'
  }, {
   id: 'developments',
   label: 'Pre-Construction'
  }, {
   id: 'south-florida',
   label: 'South Florida'
  }, {
   id: 'neighborhoods',
   label: 'Neighborhoods'
  }, {
   id: 'insights',
   label: 'Insights'
  }, {
   id: 'journal',
   label: 'Journal'
  }, {
   id: 'listings',
   label: 'Listings'
  }, {
   id: 'about',
   label: 'About'
  }],
  _ = v => {
   if (g) {
    C(false);
    document.documentElement.style.overflow = '';
   }
   u(v);
  },
  E = () => {
   const v = !g;
   C(v), document.documentElement.style.overflow = v ? 'hidden' : '';
  };
 return n.jsxs(n.Fragment, {
  children: [n.jsx('header', {
   id: 'nav',
   'data-scrolled': c ? 'true' : 'false',
   className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${c?'bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[rgba(244,239,226,0.08)] py-3.5 shadow-2xl':'bg-[#0e0e0e]/90 py-5'}`,
   children: n.jsxs('div', {
    className: 'wrap flex items-center justify-between',
    children: [n.jsx('a', {
     href: '/',
     onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; e.preventDefault(); _('home'); },
     className: 'flex shrink-0 items-center group text-left cursor-pointer border-none bg-transparent p-0',
     'aria-label': 'South Florida Elevated — Home',
     children: n.jsx('img', {
      src: '/assets/brand/sfe-elevated-logo-v4-white-gold-480.webp',
      srcSet: '/assets/brand/sfe-elevated-logo-v4-white-gold-240.webp 240w, /assets/brand/sfe-elevated-logo-v4-white-gold-360.webp 360w, /assets/brand/sfe-elevated-logo-v4-white-gold-480.webp 480w, /assets/brand/sfe-elevated-logo-v4-white-gold-720.webp 720w, /assets/brand/sfe-elevated-logo-v4-white-gold-960.webp 960w, /assets/brand/sfe-elevated-logo-v4-white-gold-1440.webp 1440w',
      sizes: '(min-width: 1440px) 241px, (min-width: 1280px) 207px, (min-width: 640px) 190px, 172px',
      alt: 'South Florida Elevated',
      width: 241,
      height: 56,
      decoding: 'async',
      fetchPriority: 'high',
      className: `block w-auto h-10 sm:h-11 xl:h-12 min-[1440px]:h-14! origin-left transition-transform duration-300`
     })
    }), n.jsx('nav', {
     'aria-label': 'Primary',
     className: 'hidden xl:block',
     children: n.jsx('ul', {
      className: 'flex items-center gap-2 min-[1440px]:gap-2.5 list-none m-0 p-0 whitespace-nowrap',
      children: A.map(v => {
       const f = m === v.id || (v.id === 'journal' && m === 'article');
       return n.jsx('li', {
        children: n.jsx('a', {
         href: pathFor(v.id),
         'aria-current': f ? 'page' : undefined,
         onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; e.preventDefault(); _(v.id); },
         className: `text-[11px] font-mono tracking-[0.04em] min-[1440px]:tracking-[0.06em] uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer bg-transparent border-none px-[3px] py-1 ${f?'text-[#c9a24a] font-bold border-b border-[#c9a24a]':'text-[#f4efe2]/80 hover:text-[#ffd9a0]'}`,
         children: v.label
        })
       }, v.id);
      })
     })
    }), n.jsxs('div', {
     className: 'flex items-center gap-3 sm:gap-5',
     children: [n.jsxs('a', {
      className: 'hidden lg:inline-flex xl:hidden items-center gap-2 font-mono text-[11px] tracking-wider text-[#f4efe2]/85 hover:text-[#c9a24a] transition-colors',
      href: 'tel:+17864601023',
      children: [n.jsx(Cl, {
       className: 'w-3.5 h-3.5 text-[#c9a24a]'
      }), n.jsx('span', {
       children: '(786) 460-1023'
      })]
     }), n.jsx('span', {
      className: 'hidden sm:inline-flex',
      children: n.jsxs('button', {
       className: 'btn btn--sm',
       onClick: () => d('general', "Let's connect to discuss my South Florida real estate objectives."),
       children: [n.jsx('span', {
        children: "Let's Talk"
       }), n.jsx(ue, {
        className: 'w-3 h-3'
       })]
      })
     }), n.jsx('button', {
      className: 'xl:hidden text-[#f4efe2] p-2 hover:text-[#c9a24a] transition-colors cursor-pointer',
      onClick: E,
      'aria-label': 'Open menu',
      'aria-expanded': g,
      children: g ? n.jsx(Ta, {
       className: 'w-6 h-6'
      }) : n.jsx(ib, {
       className: 'w-6 h-6'
      })
     })]
    })]
   })
  }), g && n.jsxs('div', {
   className: 'fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-10 px-8 animate-fadeIn xl:hidden',
   children: [n.jsxs('div', {
    className: 'space-y-6',
    children: [n.jsx('div', {
     className: 'font-mono text-xs text-[#c9a24a] tracking-widest uppercase',
     children: 'Navigation Menu'
    }), n.jsxs('div', {
     className: 'flex flex-col space-y-4',
     children: [n.jsx('a', {
      href: '/',
      onClick: e => { e.preventDefault(); _('home'); },
      className: `text-left font-serif text-2xl tracking-wide transition-colors ${m==='home'?'text-[#c9a24a]':'text-[#f4efe2]'}`,
      children: 'Home'
     }), A.map(v => n.jsx('a', {
      href: pathFor(v.id),
      'aria-current': m === v.id ? 'page' : undefined,
      onClick: e => { e.preventDefault(); _(v.id); },
      className: `text-left font-serif text-2xl tracking-wide transition-colors ${m===v.id?'text-[#c9a24a]':'text-[#f4efe2]'}`,
      children: v.label
     }, v.id))]
    })]
   }), n.jsxs('div', {
    className: 'space-y-4 pt-6 border-t border-[rgba(244,239,226,0.1)]',
    children: [n.jsxs('a', {
     href: 'tel:+17864601023',
     className: 'flex items-center gap-2 font-mono text-sm text-[#ffd9a0]',
     children: [n.jsx(Cl, {
      className: 'w-4 h-4 text-[#c9a24a]'
     }), n.jsx('span', {
      children: '(786) 460-1023'
     })]
    }), n.jsxs('button', {
     onClick: () => {
      C(false), document.documentElement.style.overflow = '', d('general', "Let's connect to discuss my South Florida real estate objectives.");
     },
     className: 'btn btn--gold w-full justify-center',
     children: [n.jsx('span', {
      children: 'Book a Consultation'
     }), n.jsx(ue, {
      className: 'w-4 h-4'
     })]
    })]
   })]
  })]
 });
}
export {
 Navigation as
 default
};