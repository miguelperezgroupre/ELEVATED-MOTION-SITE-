// RAG Service — Local Retrieval Augmented Generation
// Indexes and searches all knowledge content from data.ts
// No external API needed — pure local TF-IDF + weighted scoring

interface IndexedDoc {
  id: string;
  source: 'property' | 'neighborhood' | 'insight' | 'study' | 'market' | 'story' | 'development' | 'community';
  title: string;
  content: string;
  tags: string[];
  score?: number;
  url?: string;
  metadata: Record<string, any>;
}

class RagService {
  private index: IndexedDoc[] = [];
  private built = false;
  private stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'dare',
    'this', 'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their',
    'we', 'us', 'our', 'you', 'your', 'he', 'she', 'him', 'her', 'his',
    'not', 'no', 'nor', 'so', 'very', 'just', 'also', 'too', 'only',
    'about', 'over', 'after', 'before', 'between', 'through', 'during',
    'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other', 'some',
    'such', 'than', 'then', 'into', 'upon', 'within', 'without',
  ]);

  // Tokenize and normalize text
  private tokenize(text: string): string[] {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !this.stopWords.has(w));
  }

  // Compute TF-IDF style score for a query against a document
  private scoreDoc(queryTokens: string[], docTokens: string[], allDocs: number, docFreq: Map<string, number>): number {
    const docTermFreq = new Map<string, number>();
    docTokens.forEach(t => docTermFreq.set(t, (docTermFreq.get(t) || 0) + 1));

    let score = 0;
    const maxFreq = Math.max(...docTermFreq.values(), 1);

    for (const qToken of queryTokens) {
      const tf = (docTermFreq.get(qToken) || 0) / maxFreq;
      const idf = Math.log((allDocs + 1) / ((docFreq.get(qToken) || 0) + 1)) + 1;
      score += tf * idf;
    }

    // Bonus for title matches
    const titleTokens = queryTokens.filter(t => docTokens.slice(0, Math.min(20, docTokens.length)).includes(t));
    score += titleTokens.length * 0.5;

    return score;
  }

  // Build the search index from data.ts imports
  async build(): Promise<void> {
    if (this.built) return;

    // Dynamic imports from data.ts
    const data = await import('../data');

    // Neighborhoods
    (data.NEIGHBORHOODS || []).forEach((n: any) => {
      const content = `${n.name} ${n.tagline || ''} ${n.vibe || ''} ${n.description || ''} ${(n.highlights || []).join(' ')} ${n.bestFor || ''} ${n.insiderTip || ''}`;
      this.index.push({
        id: `nbhd-${n.id}`,
        source: 'neighborhood',
        title: n.name,
        content,
        tags: [n.region || '', ...(n.highlights || []).slice(0, 3)],
        metadata: { ...n },
      });
    });

    // Insight Articles
    (data.INSIGHT_ARTICLES || []).forEach((a: any) => {
      const content = `${a.title} ${a.summary || ''} ${(a.keyTakeaways || []).join(' ')} ${a.body || ''}`;
      this.index.push({
        id: `art-${a.id}`,
        source: 'insight',
        title: a.title,
        content,
        tags: [a.category || '', a.date || ''],
        metadata: { ...a },
      });
    });

    // Case Studies
    (data.CASE_STUDIES || []).forEach((cs: any) => {
      const content = `${cs.address} ${cs.neighborhood} ${cs.propertyType} ${cs.challenge || ''} ${cs.solution || ''} ${cs.outcome || ''} ${cs.originalExpectation || ''} ${cs.finalSalePrice || ''}`;
      this.index.push({
        id: `cs-${cs.id}`,
        source: 'study',
        title: `${cs.address} — ${cs.neighborhood}`,
        content,
        tags: [cs.neighborhood, cs.propertyType],
        metadata: { ...cs },
      });
    });

    // Developments
    (data.DEVELOPMENTS || []).forEach((d: any) => {
      const content = `${d.name} ${d.city || ''} ${d.developer || ''} ${d.description || ''} ${(d.amenities || []).join(' ')} ${d.status || ''} ${d.completionDate || ''}`;
      this.index.push({
        id: `dev-${d.id}`,
        source: 'development',
        title: d.name,
        content,
        tags: [d.city || '', d.status || ''],
        metadata: { ...d },
      });
    });

    // Communities
    (data.COMMUNITIES || []).forEach((c: any) => {
      const content = `${c.name} ${c.desc || ''} ${(c.tags || []).join(' ')} ${c.type || ''}`;
      this.index.push({
        id: `comm-${c.name}`,
        source: 'community',
        title: c.name,
        content,
        tags: c.type ? [c.type] : [],
        metadata: { ...c },
      });
    });

    // Market data
    (Object.entries(data.MARKET || {})).forEach(([city, m]: [string, any]) => {
      const content = `${city} ${m.avgPrice || ''} ${m.medPrice || ''} ${m.inventory || ''} ${m.daysOnMarket || ''} ${m.yoyChange || ''} ${m.note || ''} ${(m.neighborhoods || []).join(' ')}`;
      this.index.push({
        id: `mkt-${city}`,
        source: 'market',
        title: `${city} Market`,
        content,
        tags: ['market data', city],
        metadata: { ...m, city },
      });
    });

    // Stories
    (data.STORIES || []).forEach((s: any, i: number) => {
      const content = `${s.quote || ''} ${s.who || ''} ${s.where || ''}`;
      this.index.push({
        id: `story-${i}`,
        source: 'story',
        title: `${s.who} — ${s.where}`,
        content,
        tags: [s.where || ''],
        metadata: { ...s },
      });
    });

    this.built = true;
    console.log(`[RAG] Index built: ${this.index.length} documents`);
  }

  // Search the index with a natural language query
  async search(query: string, options: {
    limit?: number;
    sources?: string[];
    minScore?: number;
  } = {}): Promise<IndexedDoc[]> {
    if (!this.built) await this.build();

    const { limit = 10, sources, minScore = 0.01 } = options;
    const queryTokens = this.tokenize(query);
    const allDocs = this.index.length;

    // Pre-compute document frequency
    const docFreq = new Map<string, number>();
    for (const doc of this.index) {
      const tokens = new Set(this.tokenize(doc.content));
      tokens.forEach(t => docFreq.set(t, (docFreq.get(t) || 0) + 1));
    }

    // Score each document
    let results = this.index.map(doc => {
      if (sources && !sources.includes(doc.source)) return { ...doc, score: 0 };
      const docTokens = this.tokenize(doc.content);
      return {
        ...doc,
        score: this.scoreDoc(queryTokens, docTokens, allDocs, docFreq),
      };
    });

    // Filter, sort, return
    results = results
      .filter(d => d.score >= minScore)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, limit);

    return results;
  }

  // Get all documents of a specific source type
  async getBySource(source: string): Promise<IndexedDoc[]> {
    if (!this.built) await this.build();
    return this.index.filter(d => d.source === source);
  }

  // Quick FAQ-style lookup for common questions
  async faq(question: string): Promise<string | null> {
    const results = await this.search(question, { limit: 1 });
    if (results.length === 0) return null;

    const best = results[0];
    switch (best.source) {
      case 'neighborhood':
        return `${best.title}: ${best.metadata.description || best.content.slice(0, 200)}`;
      case 'insight':
        return `${best.title}: ${best.metadata.summary || best.content.slice(0, 200)}`;
      case 'study':
        return `${best.title}: Sold at ${best.metadata.finalSalePrice} (expectation was ${best.metadata.originalExpectation})`;
      case 'market':
        return `${best.title}: ${best.metadata.note || `Median price ${best.metadata.medPrice}`}`;
      default:
        return best.content.slice(0, 300);
    }
  }
}

export const ragService = new RagService();
