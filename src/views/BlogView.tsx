import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

interface BlogViewProps {
  onOpenContact: (intent?: string, message?: string) => void;
}

const CATEGORIES = ['All', 'Market News', 'Neighborhood', 'Development', 'Advisory', 'Lifestyle'] as const;

export default function BlogView({ onOpenContact }: BlogViewProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const activePost = useMemo(
    () => BLOG_POSTS.find((p) => p.slug === activeSlug) ?? null,
    [activeSlug]
  );

  const posts = useMemo(() => {
    if (category === 'All') return BLOG_POSTS;
    return BLOG_POSTS.filter((p) => p.category === category);
  }, [category]);

  const openPost = (slug: string) => {
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closePost = () => {
    setActiveSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activePost) {
    return <ArticleReader post={activePost} onBack={closePost} onOpenContact={onOpenContact} />;
  }

  const [lead, ...rest] = posts;

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 border-b border-[rgba(244,239,226,0.1)] bg-gradient-to-b from-[#0B0B0B] via-[#141a1d] to-[#0B0B0B]">
        <div className="wrap max-w-3xl">
          <span className="eyebrow eyebrow--dot mb-3">News &amp; Commentary · South Florida Elevated</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#f4efe2] font-normal leading-[1.08] tracking-tight">
            The <em className="it text-[#ffd9a0]">Journal</em>.
          </h1>
          <p className="text-base sm:text-lg text-[#f4efe2]/80 mt-6 font-light leading-relaxed">
            Market news, neighborhood notes and buyer-side advisory — written by Miguel Perez from the
            desk, not the press release.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 border-b border-[rgba(244,239,226,0.08)] bg-[#0B0B0B] sticky top-16 z-30 backdrop-blur-md bg-[#0B0B0B]/95">
        <div className="wrap">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
                  category === cat
                    ? 'border-[#c9a24a] bg-[#c9a24a]/20 text-[#ffd9a0]'
                    : 'border-[rgba(244,239,226,0.1)] text-[#f4efe2]/70 hover:text-[#f4efe2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="wrap space-y-12">
          {lead && (
            <button
              onClick={() => openPost(lead.slug)}
              className="group w-full text-left grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all overflow-hidden"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src={lead.img}
                  alt={lead.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                  {lead.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 font-mono text-[11px] text-[#c9a24a]">
                  <span>{lead.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lead.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors leading-tight">
                  {lead.title}
                </h2>
                <p className="text-sm text-[#f4efe2]/75 font-light leading-relaxed">{lead.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-[#c9a24a] group-hover:underline">
                  Read the post <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <button
                key={post.slug}
                onClick={() => openPost(post.slug)}
                className="group text-left bg-[#141a1d] border border-[rgba(244,239,226,0.1)] hover:border-[#c9a24a] transition-all overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0B0B]/85 px-3 py-1 font-mono text-[10px] text-[#ffd9a0] border border-[rgba(244,239,226,0.2)]">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#c9a24a] mb-2">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#f4efe2] group-hover:text-[#ffd9a0] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#f4efe2]/75 font-light mt-3 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[rgba(244,239,226,0.08)] flex items-center justify-between">
                    <span className="font-mono text-xs text-[#f4efe2]/60">By {post.author}</span>
                    <span className="text-xs font-mono text-[#c9a24a] group-hover:underline">Read →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter nudge */}
      <section className="py-16 border-t border-[rgba(244,239,226,0.1)] bg-[#101618]">
        <div className="wrap max-w-3xl text-center space-y-5">
          <h3 className="font-serif text-3xl text-[#f4efe2] font-normal">
            Get the monthly <em className="it text-[#ffd9a0]">brief</em>.
          </h3>
          <p className="text-sm text-[#f4efe2]/75 font-light">
            One email a month — the moves that matter across Miami, Fort Lauderdale and Palm Beach.
          </p>
          <button
            onClick={() => onOpenContact('report', 'Please add me to the monthly South Florida Elevated brief.')}
            className="btn btn--gold"
          >
            <span>Subscribe to the Monthly Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

function ArticleReader({
  post,
  onBack,
  onOpenContact,
}: {
  post: BlogPost;
  onBack: () => void;
  onOpenContact: (intent?: string, message?: string) => void;
}) {
  return (
    <article className="pt-24 pb-20 animate-fadeIn bg-[#0B0B0B]">
      <div className="wrap max-w-3xl">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#f4efe2]/60 hover:text-[#c9a24a] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All posts
        </button>

        <span className="mono-label text-[#c9a24a]">
          {post.category} · {post.date}
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#f4efe2] font-normal mt-3 leading-[1.1] tracking-tight">
          {post.title}
        </h1>
        <div className="font-mono text-xs text-[#ffd9a0] mt-3 flex items-center gap-3">
          <span>By {post.author}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <div className="aspect-[16/9] overflow-hidden my-8 border border-[rgba(244,239,226,0.1)]">
          <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <p className="font-serif text-xl sm:text-2xl text-[#f4efe2]/90 italic leading-relaxed mb-8">
          {post.excerpt}
        </p>

        <div className="space-y-5">
          {post.body.map((para, i) => (
            <p key={i} className="text-[15px] sm:text-base text-[#f4efe2]/80 font-light leading-[1.8]">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(244,239,226,0.1)] flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#f4efe2]/50 max-w-sm">
            Questions on how this applies to your own search or sale?
          </p>
          <button
            onClick={() => onOpenContact('general', `Following up on your post: "${post.title}"`)}
            className="btn btn--gold text-xs"
          >
            <span>Talk to Miguel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
