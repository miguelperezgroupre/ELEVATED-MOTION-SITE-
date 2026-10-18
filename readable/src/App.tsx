import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation, { type NavView } from './components/Navigation';
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
import * as schemaServiceModule from './services/schemaService';

// Dedicated Full-Page Sitemap Views
import BuyView from './components/views/BuyView';
import SellView from './components/views/SellView';
import RelocateView from './components/views/RelocateView';
import InvestView from './components/views/InvestView';
import DevelopmentsView from './components/views/DevelopmentsView';
import SouthFloridaView from './components/views/SouthFloridaView';
import NeighborhoodsView from './components/views/NeighborhoodsView';
import InsightsView from './components/views/InsightsView';
import AboutView from './components/views/AboutView';
import ListingsView from './views/ListingsView';
import { PAGE_META, applyPageMeta } from './pageMeta';

/*
 * App shell — reconstructed from the deployed production bundle (the original App.tsx could not be retrieved in
 * full through the Vercel connector) and extended for the Oct 2026 hero copy system:
 *  - new South Florida lifestyle page (#south-florida)
 *  - hash aliases: #pre-construction → Pre-Construction (developments), #relocation → relocate, #lifestyle → south-florida
 *  - per-page <title> and meta description (pageMeta.ts)
 *  - an empty hash (browser back to the homepage) now returns to the homepage
 */

// Resolve these two modules without depending on their export style.
const RagAssistant: any =
  (RagAssistantModule as any).default ?? (RagAssistantModule as any).RagAssistant ?? Object.values(RagAssistantModule).find((x: any) => typeof x === 'function');
const schemaService: any =
  (schemaServiceModule as any).schemaService ?? (schemaServiceModule as any).default ??
  Object.values(schemaServiceModule).find((x: any) => x && typeof x === 'object' && typeof x.inject === 'function');

const VIEWS: NavView[] = ['buy', 'sell', 'relocate', 'invest', 'developments', 'south-florida', 'neighborhoods', 'insights', 'about', 'listings'];
const ALIASES: Record<string, NavView> = { 'pre-construction': 'developments', preconstruction: 'developments', relocation: 'relocate', lifestyle: 'south-florida' };
const SCHEMA_PAGES = ['home', 'buy', 'sell', 'relocate', 'invest', 'developments', 'neighborhoods', 'insights', 'about'];

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState('general');
  const [contactMessage, setContactMessage] = useState('');

  // Handle URL hash navigation if user navigates with browser back/forward or hash links
  useEffect(() => {
    const handleHash = () => {
      const raw = window.location.hash.replace('#', '').toLowerCase();
      const hash = (ALIASES[raw] ?? raw) as NavView;
      if (VIEWS.includes(hash)) setCurrentView(hash);
      else if (raw === '') setCurrentView('home');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Page title + meta description follow the current view
  useEffect(() => {
    applyPageMeta(PAGE_META[currentView] ?? PAGE_META.home);
  }, [currentView]);

  const handleOpenContact = (intent: string = 'general', customMessage: string = '') => {
    setContactIntent(intent);
    setContactMessage(customMessage);
    setContactModalOpen(true);
  };

  const handleCloseContact = () => {
    setContactModalOpen(false);
    setContactMessage('');
  };

  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    window.location.hash = view === 'home' ? '' : view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      schemaService?.inject({ pageType: SCHEMA_PAGES.includes(view) ? view : 'home' });
    } catch {
      /* structured data is best-effort */
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e1416] text-[#f4efe2]">
      <div className="grain" aria-hidden="true" />
      <CustomCursor />
      <Navigation currentView={currentView} onNavigate={handleNavigate} onOpenContact={handleOpenContact} />

      <main>
        {currentView === 'home' && (
          <div className="animate-fadeIn">
            <Hero onOpenContact={handleOpenContact} onNavigate={handleNavigate} />
            <ChooseYourPath onNavigate={handleNavigate} onOpenContact={handleOpenContact} />
            <div id="ai">
              <AiSearch onSelectProperty={(p: any) => setSelectedProperty(p)} />
            </div>
            <div id="collection">
              <FeaturedListings onSelectProperty={(p: any) => setSelectedProperty(p)} onOpenContact={() => handleOpenContact('buyer')} />
            </div>
            <LifestyleCollections onOpenContact={() => handleOpenContact('buyer')} />
            <SouthFloridaMap onOpenContact={() => handleOpenContact('relocation')} />
            <div id="developments">
              <NewDevelopments onOpenContact={() => handleOpenContact('development')} />
            </div>
            <div id="about">
              <AboutSection />
            </div>
            <div id="market">
              <MarketIntelligence onOpenContact={() => handleOpenContact('report')} />
            </div>
            <div id="valuation">
              <HomeValuation onOpenContact={() => handleOpenContact('seller')} />
            </div>
            <ClientStories />
            <div id="contact">
              <ContactCTA onOpenContact={() => handleOpenContact('general')} />
            </div>
            <Newsletter />
          </div>
        )}

        {currentView === 'buy' && (
          <BuyView
            onSelectProperty={(p: any) => setSelectedProperty(p)}
            onOpenContact={handleOpenContact}
            onNavigateToNeighborhoods={() => handleNavigate('neighborhoods')}
          />
        )}
        {currentView === 'sell' && <SellView onOpenContact={handleOpenContact} />}
        {currentView === 'relocate' && (
          <RelocateView onOpenContact={handleOpenContact} onSelectNeighborhood={() => handleNavigate('neighborhoods')} />
        )}
        {currentView === 'invest' && (
          <InvestView onOpenContact={handleOpenContact} onNavigateToDevelopments={() => handleNavigate('developments')} />
        )}
        {currentView === 'developments' && <DevelopmentsView onOpenContact={handleOpenContact} />}
        {currentView === 'south-florida' && <SouthFloridaView onOpenContact={handleOpenContact} onNavigate={handleNavigate} />}
        {currentView === 'neighborhoods' && <NeighborhoodsView onOpenContact={handleOpenContact} />}
        {currentView === 'insights' && <InsightsView onOpenContact={handleOpenContact} />}
        {currentView === 'listings' && (
          <ListingsView onSelectProperty={(p: any) => setSelectedProperty(p)} onOpenContact={handleOpenContact} />
        )}
        {currentView === 'about' && <AboutView onOpenContact={handleOpenContact} />}
      </main>

      <Footer onNavigate={handleNavigate} onOpenContact={handleOpenContact} />
      {RagAssistant && <RagAssistant />}
      <Modals
        selectedProperty={selectedProperty}
        onCloseProperty={() => setSelectedProperty(null)}
        contactModalOpen={contactModalOpen}
        onCloseContact={handleCloseContact}
        onOpenContact={handleOpenContact}
        initialIntent={contactIntent}
        initialMessage={contactMessage}
      />
    </div>
  );
}
