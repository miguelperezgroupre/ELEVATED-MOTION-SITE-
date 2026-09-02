const fs = require('fs');
let code = fs.readFileSync('src/components/AiSearch.tsx', 'utf8');

const startStr = "  const handleSearch = (textToSearch?: string) => {";
const endStr = "    }, 1100);\n  };";

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `  const handleSearch = async (textToSearch?: string) => {
    const q = (textToSearch !== undefined ? textToSearch : query).trim();
    if (!q) {
      setStatus("Describe the home you're after");
      setTimeout(() => setStatus(''), 2500);
      return;
    }

    setIsSearching(true);
    setStatus('Analyzing your request...');
    setResults(null);

    const parsed = parseAiQuery(q);

    setStatus('Querying MiamiRE MLS via Bridge Interactive...');
    try {
      const liveResults = await idxService.getProperties({
        city: parsed.city || undefined,
        beds: parsed.beds || undefined,
        maxPrice: parsed.maxPrice || undefined,
        propertyType: parsed.type === 'house' ? 'Single Family Residence' : 
                       parsed.type === 'condo' ? 'Condo' : undefined,
      });

      // Filter local
      let hits = liveResults.filter(p => p.price > 0).slice(0, 6);
      let relaxed = false;

      if (!hits.length) {
        setStatus('Falling back to portfolio data...');
        const ranked = PROPERTIES.map((p) => ({
          property: p,
          ...scoreProperty(p, parsed)
        })).sort((a, b) => b.score - a.score);

        hits = ranked.filter((r) => r.hard && r.score > 0).map((r) => r.property);
        if (!hits.length) {
          hits = ranked.slice(0, 3).map((r) => r.property);
          relaxed = true;
        }
        hits = hits.slice(0, 6);
      }

      setResults({
        queryInfo: parsed,
        properties: hits,
        relaxed
      });
      
      setStatus(\`\${hits.length} \${hits.length === 1 ? 'match' : 'matches'} found\`);
      setIsSearching(false);

      setTimeout(() => {
        setStatus('');
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 2000);

    } catch (error) {
      console.error('Search failed:', error);
      // Fallback to mock data
      const ranked = PROPERTIES.map((p) => ({
        property: p,
        ...scoreProperty(p, parsed)
      })).sort((a, b) => b.score - a.score);

      let hits = ranked.filter((r) => r.hard && r.score > 0).map((r) => r.property);
      let relaxed = false;
      if (!hits.length) {
        hits = ranked.slice(0, 3).map((r) => r.property);
        relaxed = true;
      }
      hits = hits.slice(0, 6);

      setResults({
        queryInfo: parsed,
        properties: hits,
        relaxed
      });
      
      setStatus(\`\${hits.length} \${hits.length === 1 ? 'match' : 'matches'} found\`);
      setIsSearching(false);

      setTimeout(() => {
        setStatus('');
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 2000);
    }
  };`;

  code = code.substring(0, startIndex) + replacement + code.substring(endIndex + endStr.length);
  fs.writeFileSync('src/components/AiSearch.tsx', code);
  console.log('Replaced successfully');
} else {
  console.log('Target not found', { startIndex, endIndex });
}
