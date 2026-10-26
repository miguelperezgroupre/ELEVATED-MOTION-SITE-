import React, { useState, useEffect } from 'react';
import { X, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';
import { money } from '../data';
import { leadService } from '../services/leadService';

interface ModalsProps {
  selectedProperty: Property | null;
  onCloseProperty: () => void;
  contactModalOpen: boolean;
  onCloseContact: () => void;
  onOpenContact: (intent?: string, customMessage?: string) => void;
  initialIntent?: string;
  initialMessage?: string;
  initialSource?: string;
}

export default function Modals({
  selectedProperty,
  onCloseProperty,
  contactModalOpen,
  onCloseContact,
  onOpenContact,
  initialIntent = 'general',
  initialMessage = '',
  initialSource = ''
}: ModalsProps) {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState('Buy');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // Property gallery state
  const [photoIndex, setPhotoIndex] = useState(0);
  // Sign-up popup state (appears after a listing is opened)
  const [signupClosed, setSignupClosed] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMsg, setSignupMsg] = useState('');
  const [signupDone, setSignupDone] = useState(false);
  // Full-screen photo scroll view state
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Reset gallery + show signup popup when a new property is opened
  useEffect(() => {
    setPhotoIndex(0);
    setSignupClosed(false);
    setSignupDone(false);
    setSignupEmail('');
    setSignupMsg('');
  }, [selectedProperty?.id]);

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

    // Send lead to GoHighLevel CRM
    leadService.submit({
      type: 'contact',
      name,
      email,
      phone,
      message,
      intent,
      source: initialSource || 'southfloridaelevated.com'
    });

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
              {/* Media — full HD gallery (click to open full-screen viewer) */}
              <div
                className={`relative min-h-[300px] md:min-h-[460px] ${selectedProperty.grad} bg-black cursor-zoom-in`}
                onClick={() => setLightboxOpen(true)}
              >
                {(selectedProperty.photos && selectedProperty.photos.length > 0 ? selectedProperty.photos : [selectedProperty.img]).map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`${selectedProperty.name} — photo ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${idx === photoIndex ? 'opacity-100' : 'opacity-0'}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141a1d] via-transparent to-transparent md:hidden" />

                {/* Photo counter */}
                {(selectedProperty.photos && selectedProperty.photos.length > 1) && (
                  <span className="absolute bottom-3 left-3 z-20 font-mono text-[10px] text-[#f4efe2]/80 bg-black/60 px-2 py-1">
                    {photoIndex + 1} / {selectedProperty.photos.length}
                  </span>
                )}

                {/* Prev / Next arrows */}
                {(selectedProperty.photos && selectedProperty.photos.length > 1) && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex - 1 + selectedProperty.photos!.length) % selectedProperty.photos!.length); }}
                      aria-label="Previous photo"
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#c9a24a] hover:bg-black/70 transition-colors cursor-pointer"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex + 1) % selectedProperty.photos!.length); }}
                      aria-label="Next photo"
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white hover:text-[#c9a24a] hover:bg-black/70 transition-colors cursor-pointer"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Thumbnail strip */}
                {(selectedProperty.photos && selectedProperty.photos.length > 1) && (
                  <div className="absolute bottom-3 right-3 z-20 hidden sm:flex gap-1.5">
                    {selectedProperty.photos.slice(0, 6).map((thumb, ti) => (
                      <button
                        key={ti}
                        onClick={(e) => { e.stopPropagation(); setPhotoIndex(ti); }}
                        aria-label={`Photo ${ti + 1}`}
                        className={`w-12 h-9 overflow-hidden rounded border-2 transition-all cursor-pointer ${ti === photoIndex ? 'border-[#c9a24a]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={thumb} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
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
                    Live MLS listing — Miami Association of REALTORS&reg;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2a. Sign-up Popup — shows when a listing is opened */}
      {selectedProperty && !signupClosed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Sign up for listing alerts"
        >
          <div
            className="fixed inset-0"
            onClick={() => setSignupClosed(true)}
          />

          <div className="relative w-full max-w-md bg-[#141a1d] border border-[#c9a24a] shadow-2xl p-6 sm:p-8 z-10 animate-fadeIn">
            <button
              onClick={() => setSignupClosed(true)}
              aria-label="Close"
              className="absolute top-3 right-3 text-[#f4efe2]/50 hover:text-[#c9a24a] transition-colors p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {signupDone ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-[#c9a24a] mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-[#f4efe2] mb-2">You're in.</h3>
                <p className="text-xs text-[#f4efe2]/60 leading-relaxed">
                  Expect curated market updates and new opportunities as they come up.
                </p>
              </div>
            ) : (
              <>
                <span className="eyebrow eyebrow--dot mb-3 text-[13px]">Get alerts on this listing</span>
                <h3 className="font-serif text-2xl text-[#f4efe2] mb-2 leading-snug">
                  Don't Miss Homes Like <em className="it text-[#ffd9a0]">This</em>.
                </h3>
                <p className="text-xs text-[#f4efe2]/60 mb-6 leading-relaxed">
                  Join the private list for new South Florida listings that match your interest.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupEmail.trim());
                    if (!valid) {
                      setSignupMsg('Enter a valid email address.');
                      return;
                    }
                    setSignupMsg('');
                    // Send to GoHighLevel as a listing-alert lead
                    try {
                      leadService.submit({
                        type: 'newsletter',
                        name: 'Listing Alert',
                        email: signupEmail,
                        intent: 'Listing Alerts',
                        source: 'southfloridaelevated.com',
                        message: `Interested in ${selectedProperty.name || 'a listing'} (${selectedProperty.price ? money(selectedProperty.price) : ''})`,
                      });
                    } catch {
                      /* silent */
                    }
                    setSignupDone(true);
                  }}
                >
                  <div>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Your email address"
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-black/40 border border-[#f4efe2]/15 focus:border-[#c9a24a] text-[#f4efe2] placeholder:text-[#f4efe2]/35 text-sm outline-none transition-colors"
                    />
                  </div>
                  {signupMsg && (
                    <p className="text-[11px] text-[#e0a36a]">{signupMsg}</p>
                  )}
                  <button type="submit" className="btn btn--gold w-full justify-center">
                    <span>Get Listing Alerts</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <button
                  onClick={() => setSignupClosed(true)}
                  className="w-full text-center mono-label text-[10px] text-[#f4efe2]/40 hover:text-[#f4efe2]/70 mt-4 cursor-pointer"
                >
                  No thanks — just browsing
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2b. Full-Screen Photo Viewer (scroll through all listing photos) */}
      {selectedProperty && lightboxOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex flex-col animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Listing photo viewer"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 z-10" onClick={(e) => e.stopPropagation()}>
            <span className="font-mono text-[11px] text-[#f4efe2]/70 uppercase tracking-wider">
              {selectedProperty.name}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-[#c9a24a]">
                {photoIndex + 1} / {(selectedProperty.photos && selectedProperty.photos.length > 0) ? selectedProperty.photos.length : 1}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close viewer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable photo strip */}
          <div
            className="flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex h-full items-stretch">
              {(selectedProperty.photos && selectedProperty.photos.length > 0 ? selectedProperty.photos : [selectedProperty.img]).map((photo, idx) => (
                <div
                  key={idx}
                  className="min-w-full h-full flex items-center justify-center snap-center"
                >
                  <img
                    src={photo}
                    alt={`${selectedProperty.name} — photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom hint */}
          <div className="text-center pb-5 font-mono text-[10px] text-[#f4efe2]/40" onClick={(e) => e.stopPropagation()}>
            ← Swipe / scroll to browse all photos →
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
                        <option value="Buy">Buy Property</option>
                        <option value="Sell">Sell / Property Strategy Review</option>
                        <option value="Invest">Investment Property</option>
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
                  <p className="font-mono text-[10px] text-[#f4efe2]/45 leading-relaxed pt-2">
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="text-[#c9a24a] hover:text-[#ffd9a0] underline underline-offset-2">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="/terms-of-service" className="text-[#c9a24a] hover:text-[#ffd9a0] underline underline-offset-2">Terms of Service</a>.
                    Providing a phone number lets Miguel return your call or message about this inquiry; it is not consent for recurring marketing texts.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
