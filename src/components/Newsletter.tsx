import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setErrorMsg('That email address looks incomplete.');
      return;
    }
    setErrorMsg('');
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 6000);
  };

  return (
    <section id="newsletter" className="sec sec--dark border-t border-[rgba(244,239,226,0.08)]" aria-label="Newsletter Subscription">
      <div className="wrap max-w-2xl mx-auto text-center">
        <span className="eyebrow eyebrow--dot mb-3">Market Intelligence</span>
        <h2 className="display text-3xl sm:text-5xl font-normal text-[#f4efe2] mb-4">
          The Monthly <em className="it text-[#ffd9a0]">Brief</em>.
        </h2>
        <p className="lede text-[#f4efe2]/80 text-sm sm:text-base mb-10 mx-auto">
          Subscribe to receive exclusive monthly updates on the South Florida luxury real estate market, curated property collections, and off-market opportunities.
        </p>

        {isSubscribed ? (
          <div className="p-8 border border-[#c9a24a] bg-[#141a1d] animate-fadeIn text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#c9a24a] mx-auto" />
            <h3 className="font-serif text-2xl text-[#ffd9a0] font-normal">Subscribed.</h3>
            <p className="text-xs font-mono text-[#f4efe2]/70">
              Expect market insights in your inbox soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <div className="field flex-1 text-left">
                <label htmlFor="nlEmail">Email address</label>
                <input
                  id="nlEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full"
                />
              </div>
              <div className="sm:self-end">
                <button type="submit" className="btn btn--gold w-full sm:w-auto h-[48px]">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {errorMsg && (
              <p className="font-mono text-xs text-rose-400 text-left pt-1">
                {errorMsg}
              </p>
            )}
          </form>
        )}

        <p className="font-mono text-[9px] uppercase tracking-widest text-[#f4efe2]/30 mt-8">
          Unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
