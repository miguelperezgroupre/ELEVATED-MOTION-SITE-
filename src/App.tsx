// @ts-nocheck
// South Florida Elevated: App.tsx. Pages are real URLs (History API) so every page is indexable;
// legacy #hash links redirect client-side. The same component renders at build time for the prerender.
import {jsx, jsxs} from 'react/jsx-runtime';
import {useState, useEffect, useRef, startTransition} from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ChooseYourPath from './components/ChooseYourPath';
import AiSearch from './components/AiSearch';
import FeaturedListings from './components/FeaturedListings';
import LifestyleCollections from './components/LifestyleCollections';
import SouthFloridaMap from './components/SouthFloridaMap';
import NewDevelopments from './components/NewDevelopments';
import AboutSection from './components/AboutSection';
import MarketIntelligence from './components/MarketIntelligence';
import HomeValuation from './components/HomeValuation';
import ClientStories from './components/ClientStories';
import ContactCTA from './components/ContactCTA';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Modals from './components/Modals';
import * as RagAssistantModule from './components/RagAssistant';
import BuyView from './components/views/BuyView';
import SellView from './components/views/SellView';
import HomeValueView from './components/views/HomeValueView';
import RelocateView from './components/views/RelocateView';
import InvestView from './components/views/InvestView';
import DevelopmentsView from './components/views/DevelopmentsView';
import SouthFloridaView from './components/views/SouthFloridaView';
import NeighborhoodsView from './components/views/NeighborhoodsView';
import InsightsView from './components/views/InsightsView';
import AboutView from './components/views/AboutView';
import ListingsView from './views/ListingsView';
import JournalIndex from './components/journal/JournalIndex';
import JournalArticle from './components/journal/JournalArticle';
import LegalView from './components/views/LegalView';
import {routeFromPath, pathFor, legacyHashView} from './routes';
import {headFor, applyHead} from './seo';
import {FAQS} from './faq';

const RagAssistant = RagAssistantModule.default ?? RagAssistantModule.RagAssistant ?? Object.values(RagAssistantModule).find((x) => typeof x === 'function');

function FaqSection({items}) {
  return jsxs('section', {className: 'wrap py-20 border-t border-[rgba(244,239,226,0.12)]', 'aria-labelledby': 'faq-heading', children: [
    jsx('h2', {id: 'faq-heading', className: 'font-serif font-normal text-[34px] sm:text-[44px] leading-tight mb-8', children: 'Frequently Asked Questions'}),
    jsx('div', {className: 'max-w-3xl space-y-6', children: items.map((f) => jsxs('div', {children: [
      jsx('h3', {className: 'font-serif text-[22px] text-[#ffd9a0] mb-2', children: f.q}),
      jsx('p', {className: 'text-[#f4efe2]/80 leading-relaxed m-0', children: f.a}),
    ]}, f.q))}),
  ]});
}

function NotFound({onNavigate}) {
  return jsxs('section', {
    className: 'wrap pt-40 pb-32 min-h-[70vh]',
    children: [
      jsx('p', {className: 'font-mono text-[11px] tracking-[0.24em] uppercase text-[#C9A24A] m-0', children: '404 · Page not found'}),
      jsx('h1', {className: 'font-serif font-normal text-[52px] sm:text-[80px] leading-[1] mt-4 mb-5', children: 'Beyond this address.'}),
      jsx('p', {className: 'text-[#f4efe2]/80 text-lg max-w-xl', children: 'That page has moved or no longer exists. Start from the home page or read the Journal.'}),
      jsxs('div', {className: 'flex flex-wrap gap-3 mt-8', children: [
        jsx('a', {href: '/', className: 'btn btn--gold', onClick: (e) => { e.preventDefault(); onNavigate('home'); }, children: jsx('span', {children: 'Go home'})}),
        jsx('a', {href: '/journal', className: 'btn', onClick: (e) => { e.preventDefault(); onNavigate('journal'); }, children: jsx('span', {children: 'Read the Journal'})}),
      ]}),
    ],
  });
}

const isModified = (e) => e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;

function App({initialPath}) {
  const [route, setRoute] = useState(() => routeFromPath(initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')));
  const currentView = route.view;
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState('general');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSource, setContactSource] = useState('');
  const first = useRef(true);

  const go = (next, {replace = false, scroll = true, hash = ''} = {}) => {
    const path = pathFor(next.view, next.slug);
    const target = path + hash;
    if (window.location.pathname + window.location.hash !== target) {
      window.history[replace ? 'replaceState' : 'pushState'](null, '', target);
    }
    startTransition(() => setRoute(next));
    if (scroll) window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    // Legacy #hash routes (e.g. /#buy, /#relocate) -> /buy, /relocation
    const fromHash = () => {
      const v = legacyHashView(window.location.hash);
      if (v) { go({view: v}, {replace: true, scroll: true}); return true; }
      return false;
    };
    fromHash();
    // Friendly aliases served by the SPA (the server also 301s these)
    if (route.redirect) go({view: route.view}, {replace: true, scroll: false});
    const onPop = () => startTransition(() => setRoute(routeFromPath(window.location.pathname)));
    const onHash = () => { fromHash(); };
    // Intercept same-origin links to known routes so navigation stays client-side.
    const onClick = (e) => {
      if (isModified(e)) return;
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return; // in-page anchor
      const r = routeFromPath(url.pathname);
      if (r.view === 'notfound' || /\.(xml|txt|pdf|png|jpe?g|svg|webp)$/i.test(url.pathname)) return;
      e.preventDefault();
      go(r, {hash: url.hash, scroll: !url.hash});
      if (url.hash) requestAnimationFrame(() => setTimeout(() => document.getElementById(url.hash.slice(1))?.scrollIntoView({behavior: 'smooth'}), 120));
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    // The prerendered HTML already carries the right <head>; only update on client navigation.
    if (first.current) { first.current = false; if (document.head.querySelector('script[data-sfe-ld]')) return; }
    applyHead(headFor(route));
  }, [route]);

  const handleOpenContact = (intent = 'general', customMessage = '', source = '') => { setContactIntent(intent); setContactMessage(customMessage); setContactSource(typeof source === 'string' ? source : ''); setContactModalOpen(true); };
  const handleCloseContact = () => { setContactModalOpen(false); setContactMessage(''); };
  const handleNavigate = (view, slug) => {
    /* INP: let the browser paint the click first, then render the new view as a non-blocking transition. */
    requestAnimationFrame(() => { setTimeout(() => { go({view, slug}); }, 0); });
  };

  return jsxs('div', {
    className: 'relative min-h-screen bg-[#0e1416] text-[#f4efe2]',
    children: [
      jsx('div', {className: 'grain', 'aria-hidden': 'true'}),
      jsx(CustomCursor, {}),
      jsx(Navigation, {currentView, onNavigate: handleNavigate, onOpenContact: handleOpenContact}),
      jsxs('main', {
        id: 'main',
        children: [
          currentView === 'home' && jsxs('div', {className: 'animate-fadeIn', children: [
            jsx(Hero, {onOpenContact: handleOpenContact, onNavigate: handleNavigate}),
            jsx(ChooseYourPath, {onNavigate: handleNavigate, onOpenContact: handleOpenContact}),
            jsx('div', {id: 'ai', children: jsx(AiSearch, {onSelectProperty: (p) => setSelectedProperty(p)})}),
            jsx('div', {id: 'collection', children: jsx(FeaturedListings, {onSelectProperty: (p) => setSelectedProperty(p), onOpenContact: () => handleOpenContact('buyer')})}),
            jsx(LifestyleCollections, {onOpenContact: () => handleOpenContact('buyer')}),
            jsx(SouthFloridaMap, {onOpenContact: () => handleOpenContact('relocation')}),
            jsx('div', {id: 'developments', children: jsx(NewDevelopments, {onOpenContact: () => handleOpenContact('development')})}),
            jsx('div', {id: 'about', children: jsx(AboutSection, {})}),
            jsx('div', {id: 'market', children: jsx(MarketIntelligence, {onOpenContact: () => handleOpenContact('report')})}),
            jsx('div', {id: 'valuation', children: jsx(HomeValuation, {onOpenContact: () => handleOpenContact('seller')})}),
            jsx(ClientStories, {}),
            jsx('div', {id: 'contact', children: jsx(ContactCTA, {onOpenContact: () => handleOpenContact('general')})}),
            jsx(Newsletter, {}),
          ]}),
          currentView === 'buy' && jsx(BuyView, {onSelectProperty: (p) => setSelectedProperty(p), onOpenContact: handleOpenContact, onNavigateToNeighborhoods: () => handleNavigate('neighborhoods')}),
          currentView === 'sell' && jsx(SellView, {onOpenContact: handleOpenContact}),
          currentView === 'home-value' && jsx(HomeValueView, {onOpenContact: handleOpenContact}),
          currentView === 'free-home-evaluation' && jsx(HomeValueView, {onOpenContact: handleOpenContact, variant: 'mailer'}),
          currentView === 'relocate' && jsx(RelocateView, {onOpenContact: handleOpenContact, onSelectNeighborhood: () => handleNavigate('neighborhoods')}),
          currentView === 'invest' && jsx(InvestView, {onOpenContact: handleOpenContact, onNavigateToDevelopments: () => handleNavigate('developments')}),
          currentView === 'developments' && jsx(DevelopmentsView, {onOpenContact: handleOpenContact}),
          currentView === 'south-florida' && jsx(SouthFloridaView, {onOpenContact: handleOpenContact, onNavigate: handleNavigate}),
          currentView === 'neighborhoods' && jsx(NeighborhoodsView, {onOpenContact: handleOpenContact}),
          currentView === 'insights' && jsx(InsightsView, {onOpenContact: handleOpenContact}),
          currentView === 'listings' && jsx(ListingsView, {onSelectProperty: (p) => setSelectedProperty(p), onOpenContact: handleOpenContact}),
          currentView === 'about' && jsx(AboutView, {onOpenContact: handleOpenContact}),
          currentView === 'journal' && jsx(JournalIndex, {}),
          currentView === 'article' && jsx(JournalArticle, {slug: route.slug, onOpenContact: handleOpenContact}, route.slug),
          currentView === 'terms-of-service' && jsx(LegalView, {doc: 'terms', onNavigate: handleNavigate}),
          currentView === 'privacy-policy' && jsx(LegalView, {doc: 'privacy', onNavigate: handleNavigate}),
          currentView === 'notfound' && jsx(NotFound, {onNavigate: handleNavigate}),
          FAQS[currentView] && jsx(FaqSection, {items: FAQS[currentView]}),
        ],
      }),
      jsx(Footer, {onNavigate: handleNavigate, onOpenContact: handleOpenContact}),
      RagAssistant && jsx(RagAssistant, {}),
      jsx(Modals, {selectedProperty, onCloseProperty: () => setSelectedProperty(null), contactModalOpen, onCloseContact: handleCloseContact, onOpenContact: handleOpenContact, initialIntent: contactIntent, initialMessage: contactMessage, initialSource: contactSource}),
    ],
  });
}

export {App as default};
