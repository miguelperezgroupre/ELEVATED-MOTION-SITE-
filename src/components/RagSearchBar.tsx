import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

export default function RagSearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch('/api/elevated-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!res.ok) {
        throw new Error('Vector DB query failed');
      }

      const data = await res.json();
      setResult(data.answer);
    } catch (err) {
      setError("Unable to connect to the secure RAG pipeline. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className="relative flex items-center bg-[#141a1d] border border-[rgba(244,239,226,0.15)] rounded-full p-2 hover:border-[#c9a24a]/40 transition-colors shadow-2xl focus-within:border-[#c9a24a]/80 focus-within:ring-1 focus-within:ring-[#c9a24a]/50"
      >
        <div className="pl-4 pr-2 text-[#c9a24a]">
          <Sparkles className="w-5 h-5" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask the AI (e.g., 'What are the best neighborhoods for investment?')"
          className="flex-grow bg-transparent text-[#f4efe2] placeholder:text-[#f4efe2]/40 focus:outline-none text-lg px-2 h-14"
          disabled={isSearching}
        />
        
        <button 
          type="submit"
          disabled={isSearching || !query.trim()}
          className="bg-[#c9a24a] hover:bg-[#d4b264] text-[#0B0B0B] h-12 w-12 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2 mr-1 flex-shrink-0"
        >
          {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      {(result || isSearching || error) && (
        <div 
          ref={resultRef}
          className="mt-8 bg-[#141a1d] border border-[rgba(244,239,226,0.1)] rounded-2xl p-6 md:p-8 shadow-2xl text-left animate-fadeIn"
        >
          {isSearching && (
            <div className="flex items-center gap-3 text-[#f4efe2]/60 font-mono text-sm uppercase tracking-wider">
              <Loader2 className="w-4 h-4 animate-spin text-[#c9a24a]" />
              Querying Pinecone Vector Database...
            </div>
          )}
          
          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}

          {result && !isSearching && (
            <div className="prose prose-invert prose-p:text-[#f4efe2]/80 prose-headings:text-[#f4efe2] prose-strong:text-[#c9a24a] prose-a:text-[#c9a24a] hover:prose-a:text-[#d4b264] max-w-none">
              <div className="markdown-body">
                <Markdown>{result}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
