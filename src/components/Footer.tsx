// @ts-nocheck
// South Florida Elevated: Footer.tsx (compact build copy; formatted source kept in the project kit under readable/src/components/Footer.tsx).
import * as n from 'react/jsx-runtime';
import { pathFor } from '../routes';

function Footer({
 onNavigate: m,
 onOpenContact: u
}) {
 const d = (new Date()).getFullYear(),
  c = x => {
   m(x), window.scrollTo({
    top: 0,
    behavior: 'smooth'
   });
  };
 return n.jsx('footer', {
  className: 'bg-[#040607] text-[#f4efe2] pt-20 pb-12 border-t border-[rgba(244,239,226,0.08)]',
  children: n.jsxs('div', {
   className: 'wrap space-y-16',
   children: [n.jsxs('div', {
    className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12',
    children: [n.jsxs('div', {
     className: 'lg:col-span-2 space-y-4',
     children: [n.jsxs('div', {
      children: [n.jsx('img', {
       src: '/assets/brand/sfe-elevated-logo-v4-white-gold-480.webp',
       srcSet: '/assets/brand/sfe-elevated-logo-v4-white-gold-240.webp 240w, /assets/brand/sfe-elevated-logo-v4-white-gold-360.webp 360w, /assets/brand/sfe-elevated-logo-v4-white-gold-480.webp 480w, /assets/brand/sfe-elevated-logo-v4-white-gold-720.webp 720w, /assets/brand/sfe-elevated-logo-v4-white-gold-960.webp 960w, /assets/brand/sfe-elevated-logo-v4-white-gold-1440.webp 1440w',
       sizes: '(min-width: 768px) 378px, 300px',
       alt: 'South Florida Elevated',
       width: 378,
       height: 88,
       loading: 'lazy',
       decoding: 'async',
       className: 'block w-[300px] md:w-[378px] max-w-full h-auto'
      }), n.jsx('span', {
       className: 'block font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a24a] mt-3',
       children: 'Miguel Perez · Luxury Real Estate Advisor'
      })]
     }), n.jsx('p', {
      className: 'text-xs sm:text-sm text-[#f4efe2]/70 max-w-sm font-light leading-relaxed',
      children: 'Miguel Perez is the advisor. South Florida Elevated is the platform. Helping clients navigate Miami, Fort Lauderdale, and Palm Beach with clear guidance and a local perspective.'
     })]
    }), n.jsxs('div', {
     className: 'space-y-4',
     children: [n.jsx('h2', {
      className: 'font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold',
      children: 'Advisory'
     }), n.jsxs('ul', {
      className: 'space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0',
      children: [n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('buy'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('buy'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Buy Residences'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('sell'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('sell'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Sell & Positioning'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('relocate'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('relocate'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Relocation Intelligence'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('invest'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('invest'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Capital & Investment'
       })
      })]
     })]
    }), n.jsxs('div', {
     className: 'space-y-4',
     children: [n.jsx('h2', {
      className: 'font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold',
      children: 'Platform'
     }), n.jsxs('ul', {
      className: 'space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0',
      children: [n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('developments'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('developments'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Pre-Construction'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('south-florida'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('south-florida'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'South Florida Living'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('neighborhoods'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('neighborhoods'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Neighborhood Guides'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('insights'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('insights'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'Market Insights & Data'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: '/journal',
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('journal'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'The Journal'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: pathFor('about'),
        onClick: e => { if (e.metaKey || e.ctrlKey || e.shiftKey) return; e.preventDefault(); c('about'); },
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0',
        children: 'About Miguel Perez'
       })
      })]
     })]
    }), n.jsxs('div', {
     className: 'space-y-4',
     children: [n.jsx('h2', {
      className: 'font-mono text-xs text-[#c9a24a] uppercase tracking-widest font-semibold',
      children: 'Connect'
     }), n.jsxs('ul', {
      className: 'space-y-2.5 font-sans text-xs sm:text-sm text-[#f4efe2]/75 list-none p-0',
      children: [n.jsx('li', {
       children: n.jsx('button', {
        onClick: () => u('general', 'I would like to schedule a private advisory consultation with Miguel.'),
        className: 'hover:text-[#c9a24a] transition-colors cursor-pointer bg-transparent border-none p-0 text-left',
        children: 'Book Private Consultation'
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: 'tel:+17864601023',
        className: 'font-mono text-xs text-[#ffd9a0] hover:text-[#c9a24a] transition-colors',
        children: '(786) 460-1023'
       })
      }), n.jsx('li', {
       className: 'font-mono text-[11px] text-[#f4efe2]/60',
       children: 'Miami · Fort Lauderdale · Palm Beach'
      }), n.jsx('li', {
       className: 'mt-2',
       children: n.jsx('a', {
        href: 'https://www.instagram.com/miguelperezflorida',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] lg:text-[10px] lg:tracking-[0.06em] xl:text-[11px] xl:tracking-[0.2em] font-mono text-[#c9a24a] hover:text-[#ffd9a0] transition-colors',
        children: n.jsx('span', {
         children: '@miguelperezflorida'
        })
       })
      }), n.jsx('li', {
       children: n.jsx('a', {
        href: 'https://www.zillow.com/profile/miguelperezflorida',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-[11px] uppercase tracking-[0.2em] font-mono text-[#f4efe2]/50 hover:text-[#c9a24a] transition-colors',
        children: 'Zillow Profile'
       })
      })]
     })]
    })]
   }), n.jsxs('div', {
    className: 'pt-8 border-t border-[rgba(244,239,226,0.08)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-[11px] text-[#f4efe2]/50',
    children: [n.jsxs('div', {
     className: 'space-y-1',
     children: [n.jsxs('p', {
      children: ['© ', d, ' South Florida Elevated · Miguel Perez · FL Real Estate License #SL3515849 · Luxe Properties']
     }), n.jsx('p', {
      className: 'text-[10px] text-[#f4efe2]/35 max-w-2xl font-sans',
      children: 'Equal Housing Opportunity. Designations: ABR®, SRS, PSA, SFR®. Content and valuations are strategic estimates for informational purposes.'
     })]
    }), n.jsxs('div', {
     className: 'flex flex-wrap items-center gap-6',
     // Privacy Policy / Terms of Representation pages do not exist yet (/privacy, /terms → 404).
     // Dead '#' links removed until Miguel/Luxe Properties supply approved copy; then add
     // routes in src/routes.ts and restore: { href: '/privacy' }, { href: '/terms-of-representation' }.
     children: [n.jsx('a', {
      href: 'https://www.instagram.com/miguelperezflorida',
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'hover:text-[#c9a24a] transition-colors',
      children: 'Instagram'
     })]
    })]
   })]
  })
 });
}
export {
 Footer as
 default
};