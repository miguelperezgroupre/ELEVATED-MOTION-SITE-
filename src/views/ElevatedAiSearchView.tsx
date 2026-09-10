import { Sparkles, ArrowRight } from 'lucide-react';
import RagSearchBar from '../components/RagSearchBar';
import { Property } from '../types';

interface ElevatedAiSearchViewProps {
  onSelectProperty?: (property: Property) => void;
  onOpenContact: (intent?: string, message?: string) => void;
}

export default function ElevatedAiSearchView({ onOpenContact }: ElevatedAiSearchViewProps) {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0e1416] text-[#f4efe2] animate-fadeIn flex flex-col justify-center items-center">
      <div className="wrap max-w-5xl w-full">
        <header className="mb-12 text-center">
          <span className="eyebrow eyebrow--dot mb-3 mx-auto justify-center">Next-Gen Discovery</span>
          <h1 className="h1 mb-4 text-[#f4efe2]">
            Elevated AI <em className="it text-[#ffd9a0]">Search Engine</em>
          </h1>
          <p className="lede text-[#f4efe2]/70 max-w-2xl mx-auto">
            Ask anything about the real estate market, specific neighborhoods, or our properties. Powered by a secure vector knowledge base.
          </p>
        </header>

        <div className="animate-fadeIn">
          {/* The Focused Search Widget */}
          <RagSearchBar />
          
          <div className="mt-16 text-center">
            <p className="text-[#f4efe2]/60 font-mono text-sm max-w-xl mx-auto mb-6">
              Our AI engine securely processes your queries without exposing internal architecture or instructions.
            </p>
            <button 
              onClick={() => onOpenContact('ai_inquiry')}
              className="btn btn--gold mx-auto justify-center"
            >
              Speak with an Advisor <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
