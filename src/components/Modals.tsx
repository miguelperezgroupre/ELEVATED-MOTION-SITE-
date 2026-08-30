import React, { useState, useEffect } from 'react';
import { X, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';
import { money } from '../data';

interface ModalsProps {
  selectedProperty: Property | null;
  onCloseProperty: () => void;
  contactModalOpen: boolean;
  onCloseContact: () => void;
  onOpenContact: (intent?: string, customMessage?: string) => void;
  initialIntent?: string;
  initialMessage?: string;
}

export default function Modals({
  selectedProperty,
  onCloseProperty,
  contactModalOpen,
  onCloseContact,
  onOpenContact,
  initialIntent = 'general',
  initialMessage = ''
}: ModalsProps) {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState('Buy');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialIntent) {
      if (initialIntent === 'buyer') setIntent('Buy');
      else if (initialIntent === 'seller') setIntent('Sell');
      else if (initialIntent === 'relocation') setIntent('Relocate');
      else if (initialIntent === 'investor') setIntent('Invest');
      else if (initialIntent === 'development') setIntent('Explore new development');
      else if (initialIntent === 'report') setIntent('Market Report & Research');
      else setIntent('General Advisory Consultation');
    }
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialIntent, initialMessage, contactModalOpen]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Add a name so Miguel knows who he's calling.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setErrorMessage('That email address looks incomplete.');
      return;
    }
    setErrorMessage('');
    setFormSubmitted(true);

    const payload = {
      name,
      email,
      phone,
      intent,
      message,
      submittedAt: new Date().toISOString()
    };
    console.info('Consultation Enquiry Submitted:', payload);

    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setFormSubmitted(false);
      onCloseContact();
    }, 3500);
  };

  return (
    <>
      {/* 1. Property Detail Modal */}
      {selectedProperty && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Property detail"
        >
          <div
            className="fixed inset-0"
            onClick={onCloseProperty}
          />

          <div className="relative w-full max-w-4xl bg-[#141a1d] border border-[rgba(201,162,74,0.3)] shadow-2xl overflow-hidden z-10 my-auto">
            {/* Close Button */}
            <button
              onClick={onCloseProperty}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-[#f4efe2] hover:text-[#c9a24a] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Media */}
              <div className={`relative min-h-[300px] md:min-h-[460px] ${selectedProperty.grad}`}>
                <img
                  src={selectedProperty.img}
                  alt={selectedProperty.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141a1d] via-transparent to-transparent md:hidden" />
              </div>

              {/* Details Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="font-mono text-xs text-[#c9a24a] uppercase tracking-wider mb-1">
                    {selectedProperty.city}, Florida
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f4efe2] font-normal leading-snug">
                    {selectedProperty.name}
                  </h3>
                  <div className="font-mono text-2xl text-[#ffd9a0] font-bold mt-2">
                    {money(selectedProperty.price)}
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-3 py-4 my-4 border-y border-[rgba(244,239,226,0.1)] text-center">
                    <div>
                      <b className="font-mono text-lg text-[#f4efe2] block">{selectedProperty.beds}</b>
                      <span className="mono-label text-[9px]">Bedrooms</span>
                    </div>
                    <div>
                      <b className="font-mono text-lg text-[#f4efe2] block">{selectedProperty.baths}</b>
                      <span className="mono-label text-[9px]">Bathrooms</span>
                    </div>
                    <div>
                      <b className="font-mono text-lg text-[#f4efe2] block">{selectedProperty.sqft.toLocaleString()}</b>
                      <span className="mono-label text-[9px]">Sq ft</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#f4efe2]/80 font-light leading-relaxed mb-4">
                    {selectedProperty.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedProperty.tags.map((tag) => (
                      <span key={tag} className="tag text-[9px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    className="btn btn--gold w-full justify-between"
                    onClick={() => {
                      onCloseProperty();
                      onOpenContact('buyer', `Inquiry regarding ${selectedProperty.name} (${money(selectedProperty.price)})`);
                    }}
                  >
                    <span>Request a private viewing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    className="btn w-full justify-center"
                    href="tel:+17864601023"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Miguel (786) 460-1023</span>
                  </a>

                  <p className="mono-label text-[9px] text-[#f4efe2]/40 text-center pt-2">
                    Sample listing for demonstration — not live MLS data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Contact / Schedule Consultation Modal */}
      {contactModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Schedule a consultation"
        >
          <div
            className="fixed inset-0"
            onClick={onCloseContact}
          />

          <div className="relative w-full max-w-2xl bg-[#141a1d] border border-[#c9a24a] shadow-2xl p-6 sm:p-10 z-10 my-auto">
            <button
              onClick={onCloseContact}
              aria-label="Close"
              className="absolute top-4 right-4 text-[#f4efe2]/60 hover:text-[#c9a24a] transition-colors p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-14 h-14 text-[#c9a24a] mx-auto" />
                <h3 className="font-serif text-3xl text-[#ffd9a0] font-normal">
                  Request received.
                </h3>
                <p className="text-sm text-[#f4efe2]/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Miguel will review your requirements and respond promptly.
                </p>
                <div className="pt-4 font-mono text-xs text-[#c9a24a]">
                  Closing dialog shortly...
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="eyebrow">Private Advisory Consultation</span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] font-normal mt-2">
                    Let's discuss your next move.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#f4efe2]/75 mt-2 font-light">
                    Every enquiry is personally reviewed and answered directly by Miguel Perez.
                  </p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor="cName">Your Name</label>
                      <input
                        id="cName"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="cEmail">Email Address</label>
                      <input
                        id="cEmail"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="field">
                      <label htmlFor="cPhone">Phone Number</label>
                      <input
                        id="cPhone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(786) 000-0000"
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="cIntent">Advisory Focus</label>
                      <select
                        id="cIntent"
                        value={intent}
                        onChange={(e) => setIntent(e.target.value)}
                      >
                        <option value="Buy">Buy Property / Off-Market</option>
                        <option value="Sell">Sell / Property Strategy Review</option>
                        <option value="Invest">Capital Investment & Underwriting</option>
                        <option value="Relocate">Relocation Dossier & Neighborhood Match</option>
                        <option value="Explore new development">New Pre-Construction Developments</option>
                        <option value="Market Report & Research">Market Report & Intelligence</option>
                        <option value="General Advisory Consultation">General Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="cMsg">Tell Miguel about your objectives</label>
                    <textarea
                      id="cMsg"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Timing, target neighborhoods, budget range, dockage needs, or specific questions..."
                    />
                  </div>

                  {errorMessage && (
                    <p className="font-mono text-xs text-rose-400">
                      {errorMessage}
                    </p>
                  )}

                  <div className="pt-2">
                    <button type="submit" className="btn btn--gold w-full justify-center">
                      <span>Submit Advisory Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
