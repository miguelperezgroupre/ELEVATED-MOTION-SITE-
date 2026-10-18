// Server-side proxy for the Bridge Interactive (Bridge Data Output) MLS API.
// The access token lives only in Vercel env vars and is never sent to the browser.
//   BRIDGEDATA_SERVER_TOKEN  (preferred)   | legacy fallback: VITE_BRIDGEDATA_SERVER_TOKEN
//   BRIDGEDATA_BROWSER_TOKEN (fallback)    | legacy fallback: VITE_BRIDGEDATA_BROWSER_TOKEN
//   BRIDGEDATA_DATASET       (default 'miamire')
//
// Usage from the client:  GET /api/idx?resource=Property&$filter=...&$top=...
//   resource: 'Property' | "Property('<ListingKey>')" | 'listings' | 'listings/<id>'
//   api:      'odata' (default) | 'pub'

const ALLOWED_PARAMS = new Set(['$filter', '$top', '$skip', '$orderby', '$count', '$select', '$expand']);
const RESOURCE_RE = /^(Property|Property\('[A-Za-z0-9_-]{1,64}'\)|listings|listings\/[A-Za-z0-9_-]{1,64})$/;
const MAX_TOP = 200;

function token() {
  const e = process.env;
  return (
    e.BRIDGEDATA_SERVER_TOKEN ||
    e.VITE_BRIDGEDATA_SERVER_TOKEN ||
    e.BRIDGEDATA_BROWSER_TOKEN ||
    e.VITE_BRIDGEDATA_BROWSER_TOKEN ||
    ''
  );
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const accessToken = token();
  if (!accessToken) return res.status(503).json({ error: 'IDX not configured' });

  const url = new URL(req.url, 'http://localhost');
  const resource = url.searchParams.get('resource') || 'Property';
  if (!RESOURCE_RE.test(resource)) return res.status(400).json({ error: 'Invalid resource' });

  const dataset = (process.env.BRIDGEDATA_DATASET || process.env.VITE_BRIDGEDATA_DATASET || 'miamire').replace(/[^a-z0-9_-]/gi, '');
  const api = url.searchParams.get('api') === 'pub' ? 'pub' : 'odata';
  const base = api === 'pub'
    ? 'https://api.bridgedataoutput.com/api/v2/pub'
    : `https://api.bridgedataoutput.com/api/v2/OData/${dataset}`;

  const qs = new URLSearchParams();
  for (const [k, v] of url.searchParams) {
    if (!ALLOWED_PARAMS.has(k)) continue;
    if (k === '$top') qs.set(k, String(Math.min(Math.max(parseInt(v, 10) || 1, 1), MAX_TOP)));
    else if (k === '$skip') qs.set(k, String(Math.max(parseInt(v, 10) || 0, 0)));
    else if (v.length <= 2000) qs.set(k, v);
  }
  qs.set('access_token', accessToken);

  try {
    const upstream = await fetch(`${base}/${resource}?${qs}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'southfloridaelevated.com IDX proxy' },
    });
    const body = await upstream.text();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', upstream.ok ? 'public, s-maxage=300, stale-while-revalidate=600' : 'no-store');
    if (!upstream.ok) {
      // Never echo upstream bodies on error (could include the request URL).
      return res.status(upstream.status === 404 ? 404 : 502).json({ error: `Upstream ${upstream.status}` });
    }
    return res.status(200).send(body.split(accessToken).join(''));
  } catch (err) {
    return res.status(502).json({ error: 'Upstream fetch failed' });
  }
}
