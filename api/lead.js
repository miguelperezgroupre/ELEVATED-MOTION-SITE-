// Server-side lead intake for southfloridaelevated.com.
// Forwards a validated website lead to GoHighLevel (POST /contacts/) and Follow Up Boss (POST /v1/events).
// These are the ONLY upstream calls this function can make. Keys come from Vercel env vars and are never returned.
//   GHL_TOKEN, GHL_LOCATION_ID, FUB_API_KEY, FUB_SYSTEM_KEY, FUB_SYSTEM_NAME
// Dry run: POST /api/lead?dryRun=1 validates and reports what would be sent; it never calls GHL or FUB.

const GHL_CONTACTS_URL = 'https://services.leadconnectorhq.com/contacts/';
const FUB_EVENTS_URL = 'https://api.followupboss.com/v1/events';
const TYPES = new Set(['contact', 'newsletter', 'valuation']);
const MAX_BODY = 10_000;
const LIMITS = { name: 100, email: 254, phone: 30, message: 2000, intent: 80, source: 200, sqft: 20, beds: 10, baths: 10, propertyType: 60, marketArea: 80 };
const ALLOWED_HOSTS = [/^(www\.)?southfloridaelevated\.com$/i, /^elevated-motion-site(-[a-z0-9-]+)?\.vercel\.app$/i];
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^[0-9+().\-\s]{7,30}$/;

const env = (k) => process.env[k] || process.env['VITE_' + k] || '';

export function validateLead(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { error: 'Body must be a JSON object' };
  if (raw.website || raw.company_website) return { error: 'Rejected' }; // honeypot
  const d = {};
  for (const [k, max] of Object.entries(LIMITS)) {
    const v = raw[k];
    if (v === undefined || v === null || v === '') continue;
    if (typeof v !== 'string' && typeof v !== 'number') return { error: `Invalid ${k}` };
    const s = String(v).trim();
    if (s.length > max) return { error: `${k} too long` };
    if (s) d[k] = s;
  }
  d.type = typeof raw.type === 'string' ? raw.type : '';
  if (!TYPES.has(d.type)) return { error: 'Invalid type' };
  if (!d.email || !EMAIL_RE.test(d.email)) return { error: 'Valid email required' };
  if (!d.name) {
    if (d.type !== 'newsletter') return { error: 'Name required' };
    d.name = d.email.split('@')[0];
  }
  if (d.phone && !PHONE_RE.test(d.phone)) return { error: 'Invalid phone' };
  return { lead: d };
}

export function buildPayloads(d) {
  const parts = d.name.split(/\s+/);
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
  const mailer = !!(d.source && d.source.startsWith('mailer-'));
  const tags = ['Website Lead', 'southfloridaelevated.com'];
  if (d.intent) tags.push(d.intent);
  if (d.type === 'newsletter') tags.push('Newsletter Subscriber');
  if (d.type === 'valuation') tags.push('Home Valuation Request');
  if (mailer) tags.push('Mailer Home Evaluation');

  const ghl = {
    locationId: env('GHL_LOCATION_ID'),
    firstName, lastName, email: d.email, phone: d.phone || undefined, tags,
    customField: { message: d.message || '', intent: d.intent || 'General', source: d.source || 'southfloridaelevated.com' },
  };
  if (d.sqft) ghl.customField.sqft = d.sqft;
  if (d.propertyType) ghl.customField.propertyType = d.propertyType;

  const fub = {
    source: 'South Florida Elevated Website',
    type: 'visit',
    person: { firstName, lastName, email: d.email, phone: d.phone || undefined },
    message: d.message || '',
    tags: ['southfloridaelevated.com', 'Website Lead', d.intent || 'General'].concat(mailer ? ['Mailer Home Evaluation', d.source] : []),
  };
  return { ghl, fub };
}

function originAllowed(req) {
  const h = req.headers || {};
  const src = h.origin || h.referer || '';
  try { const host = new URL(src).hostname; return ALLOWED_HOSTS.some((re) => re.test(host)); } catch { return false; }
}

async function readBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') { if (req.body.length > MAX_BODY) throw new Error('too large'); return JSON.parse(req.body); }
    if (Buffer.isBuffer(req.body)) { if (req.body.length > MAX_BODY) throw new Error('too large'); return JSON.parse(req.body.toString('utf8')); }
    return req.body;
  }
  let s = '';
  for await (const chunk of req) { s += chunk; if (s.length > MAX_BODY) throw new Error('too large'); }
  return JSON.parse(s || 'null');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed' }); }
  const ct = String((req.headers || {})['content-type'] || '');
  if (!ct.includes('application/json')) return res.status(415).json({ error: 'JSON required' });

  let raw;
  try { raw = await readBody(req); } catch { return res.status(400).json({ error: 'Invalid JSON' }); }
  const { lead, error } = validateLead(raw);
  if (error) return res.status(400).json({ error });

  const url = new URL(req.url, 'http://localhost');
  const dryRun = url.searchParams.get('dryRun') === '1';
  const ghlToken = env('GHL_TOKEN');
  const fubKey = env('FUB_API_KEY');
  if (dryRun) {
    return res.status(200).json({ ok: true, dryRun: true, wouldSend: { ghl: !!(ghlToken && env('GHL_LOCATION_ID')), fub: !!fubKey } });
  }
  if (!originAllowed(req)) return res.status(403).json({ error: 'Forbidden' });

  const { ghl, fub } = buildPayloads(lead);
  const result = { ghl: 'skipped', fub: 'skipped' };

  if (ghlToken && ghl.locationId) {
    try {
      const r = await fetch(GHL_CONTACTS_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${ghlToken}`, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(ghl),
      });
      result.ghl = r.ok ? 'ok' : `error-${r.status}`;
    } catch { result.ghl = 'error'; }
  }
  // Same order as the previous client code: Follow Up Boss only if GoHighLevel did not accept it.
  if (result.ghl !== 'ok' && fubKey) {
    try {
      const r = await fetch(FUB_EVENTS_URL, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(fubKey + ':').toString('base64'),
          'Content-Type': 'application/json',
          'X-System': env('FUB_SYSTEM_NAME') || 'MiguelPerezRealEstateAI',
          'X-System-Key': env('FUB_SYSTEM_KEY'),
        },
        body: JSON.stringify(fub),
      });
      result.fub = r.ok ? 'ok' : `error-${r.status}`;
    } catch { result.fub = 'error'; }
  }
  const ok = result.ghl === 'ok' || result.fub === 'ok';
  if (!ok) console.warn('[api/lead] no CRM accepted the lead', result);
  return res.status(ok ? 200 : 502).json({ success: ok, method: result.ghl === 'ok' ? 'ghl' : result.fub === 'ok' ? 'fub' : 'none' });
}
