import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navigation, { NavView } from './components/Navigation';
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

// Dedicated Full-Page Sitemap Views
import BuyView from './components/views/BuyView';
import SellView from './components/views/SellView';
import RelocateView from './components/views/RelocateView';
import InvestView from './components/views/InvestView';
import DevelopmentsView from './components/views/DevelopmentsView';
import NeighborhoodsView from './components/views/NeighborhoodsView';
import InsightsView from './components/views/InsightsView';
import AboutView from './components/views/AboutView';
import ListingsView from './views/ListingsView';

import { Property, NeighborhoodDetail } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactIntent, setContactIntent] = useState('general');
  const [contactMessage, setContactMessage] = useState('');

  // Handle URL hash navigation if user navigates with browser back/forward or hash links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['buy', 'sell', 'relocate', 'invest', 'developments', 'neighborhoods', 'insights', 'about', 'listings'].includes(hash)) {
        setCurrentView(hash as NavView);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

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
  };

  return (
    <div className="relative min-h-screen bg-[#0e1416] text-[#f4efe2]">
      {/* Film grain texture overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Fluid custom cursor */}
      <CustomCursor />

      {/* Sticky navigation header & mobile drawer */}
      <Navigation
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
      />

      <main>
        {currentView === 'home' && (
          <div className="animate-fadeIn">
            {/* Cinematic Hero */}
            <Hero
              onOpenContact={handleOpenContact}
              onNavigate={handleNavigate}
            />

            {/* Choose Your Path (Primary Interactive UX Driver) */}
            <ChooseYourPath
              onNavigate={handleNavigate}
              onOpenContact={handleOpenContact}
            />

            {/* Natural Language AI Property Discovery */}
            <div id="ai">
              <AiSearch onSelectProperty={(p) => setSelectedProperty(p)} />
            </div>

            {/* Featured Luxury Residences */}
            <div id="collection">
              <FeaturedListings
                onSelectProperty={(p) => setSelectedProperty(p)}
                onOpenContact={() => handleOpenContact('buyer')}
              />
            </div>

            {/* Curated Lifestyle Collections */}
            <LifestyleCollections
              onOpenContact={() => handleOpenContact('buyer')}
            />

            {/* South Florida Coastline Map */}
            <SouthFloridaMap
              onOpenContact={() => handleOpenContact('relocation')}
            />

            {/* Pre-Construction Highlights */}
            <div id="developments">
              <NewDevelopments
                onOpenContact={() => handleOpenContact('development')}
              />
            </div>

            {/* About Miguel Perez */}
            <div id="about">
              <AboutSection />
            </div>

            {/* Market Intelligence Preview */}
            <div id="market">
              <MarketIntelligence
                onOpenContact={() => handleOpenContact('report')}
              />
            </div>

            {/* Valuation Model */}
            <div id="valuation">
              <HomeValuation
                onOpenContact={() => handleOpenContact('seller')}
              />
            </div>

            {/* Client Testimonials */}
            <ClientStories />

            {/* Direct Advisory CTA */}
            <div id="contact">
              <ContactCTA
                onOpenContact={() => handleOpenContact('general')}
              />
            </div>

            {/* Monthly Intelligence Brief */}
            <Newsletter />
          </div>
        )}

        {currentView === 'buy' && (
          <BuyView
            onSelectProperty={(p) => setSelectedProperty(p)}
            onOpenContact={handleOpenContact}
            onNavigateToNeighborhoods={() => handleNavigate('neighborhoods')}
          />
        )}

        {currentView === 'sell' && (
          <SellView
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'relocate' && (
          <RelocateView
            onOpenContact={handleOpenContact}
            onSelectNeighborhood={() => handleNavigate('neighborhoods')}
          />
        )}

        {currentView === 'invest' && (
          <InvestView
            onOpenContact={handleOpenContact}
            onNavigateToDevelopments={() => handleNavigate('developments')}
          />
        )}

        {currentView === 'developments' && (
          <DevelopmentsView
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'neighborhoods' && (
          <NeighborhoodsView
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'insights' && (
          <InsightsView
            onOpenContact={handleOpenContact}
          />
        )}

        {currentView === 'listings' && (
          <ListingsView
            onSelectProperty={(p) => setSelectedProperty(p)}
            onOpenContact={handleOpenContact}
          />
        )}
        {currentView === 'about' && (
          <AboutView
            onOpenContact={handleOpenContact}
          />
        )}
      </main>

      {/* Persistent global footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={handleOpenContact}
      />

      {/* Global Interactive Modals (Property Detail & Intent-Aware Consultation) */}
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
