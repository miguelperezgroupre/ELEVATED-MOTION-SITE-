#!/usr/bin/env python3
"""Render Elevated Listings Instagram posts (1080x1350 PNG) from live MLS data.

Usage:
  python3 scripts/render-listing-post.py --variant new-listing --hub miami-beach --index 0 --out out.png
  python3 scripts/render-listing-post.py --variant featured-agent --listing-key <ListingKey> --out out.png

Data comes from the site's own /api/idx proxy (already stripped of confidential fields). Only public
listing facts and the listing brokerage are used: no agent names or contact details come from the MLS.
Requires: python3, playwright (with Chrome/Chromium). Photos of other brokers' listings: confirm MLS
advertising rules / broker permission before posting (see PR notes).
"""
import argparse, json, pathlib, sys, urllib.parse, urllib.request, datetime

SITE = 'https://www.southfloridaelevated.com'
HUBS = {
  'miami-beach': ('Miami Beach', "City eq 'Miami Beach'"),
  'brickell': ('Brickell', "City eq 'Miami' and PostalCode eq '33131'"),
  'coral-gables': ('Coral Gables', "City eq 'Coral Gables'"),
  'fort-lauderdale': ('Fort Lauderdale', "City eq 'Fort Lauderdale'"),
}
SELECT = 'ListingKey,ListingId,UnparsedAddress,City,PostalCode,ListPrice,PreviousListPrice,ClosePrice,CloseDate,BedroomsTotal,BathroomsTotalInteger,LivingArea,LotSizeAcres,LotSizeSquareFeet,PropertySubType,ListOfficeName,PhotosCount,Media'
BASE = "PropertyType eq 'Residential' and InternetAddressDisplayYN eq true and InternetEntireListingDisplayYN eq true and ListPrice gt 0 and BedroomsTotal gt 0 and LivingArea gt 0 and PhotosCount gt 9"

def iso(days):
    return (datetime.date.today() - datetime.timedelta(days=days)).isoformat()

def query(hub, variant, top=40, key=None):
    if key:
        where = f"ListingKey eq '{key}'"; order = None
    elif variant == 'just-sold':
        where = f"StandardStatus eq 'Closed' and {BASE} and ClosePrice gt 0 and CloseDate ge {iso(60)} and CloseDate le {iso(0)}"; order = 'CloseDate desc'
    elif variant == 'price-change':
        where = f"StandardStatus eq 'Active' and {BASE} and MajorChangeType eq 'Price Decrease' and MajorChangeTimestamp ge {iso(21)}T00:00:00Z"; order = 'MajorChangeTimestamp desc'
    else:
        where = f"StandardStatus eq 'Active' and {BASE} and OriginalEntryTimestamp ge {iso(21)}T00:00:00Z"; order = 'OriginalEntryTimestamp desc'
    f = where if key else f"{HUBS[hub][1]} and {where}"
    p = {'resource': 'Property', '$filter': f, '$top': str(top), '$select': SELECT}
    if order: p['$orderby'] = order
    req = urllib.request.Request(SITE + '/api/idx?' + urllib.parse.urlencode(p), headers={'Accept': 'application/json', 'User-Agent': 'elevated-listings-render'})
    return json.load(urllib.request.urlopen(req, timeout=60))['value']

def to_post(r, variant, market):
    photos = sorted([m for m in (r.get('Media') or []) if m.get('MediaURL') and m.get('MediaCategory', 'Photo') == 'Photo'], key=lambda m: m.get('Order', 0))
    addr = r['UnparsedAddress']; c = addr.find(',')
    street = (addr[:c] if c > -1 else addr).replace(' # ', ' #'); city = addr[c + 1:].strip() if c > -1 else ''
    acres = r.get('LotSizeAcres') or ((r.get('LotSizeSquareFeet') or 0) / 43560)
    sold = variant == 'just-sold'
    d = {
      'variant': variant, 'market': market, 'address': street, 'cityLine': city,
      'price': r['ClosePrice'] if sold else r['ListPrice'],
      'prevPrice': r.get('PreviousListPrice') if variant == 'price-change' else 0,
      'beds': r.get('BedroomsTotal'), 'baths': r.get('BathroomsTotalInteger'), 'sqft': r.get('LivingArea'), 'acres': acres,
      'photo': photos[0]['MediaURL'] if photos else '',
      'mls': r.get('ListingId'), 'listingKey': r.get('ListingKey'),
      'courtesy': (f"Listing courtesy of {r['ListOfficeName']}. " if r.get('ListOfficeName') else '') + f"MLS# {r.get('ListingId')}. Information deemed reliable but not guaranteed.",
    }
    if sold and r.get('CloseDate'): d['soldNote'] = 'Closed ' + datetime.date.fromisoformat(r['CloseDate']).strftime('%b %-d')
    return d

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--variant', default='new-listing', choices=['new-listing', 'price-change', 'just-sold', 'featured-agent'])
    ap.add_argument('--hub', default='miami-beach', choices=list(HUBS))
    ap.add_argument('--index', type=int, default=0, help='which record of the feed to use')
    ap.add_argument('--listing-key', help='render one specific MLS ListingKey instead')
    ap.add_argument('--agent-json', help='featured-agent: {"name","brokerage","handle","headshot"}; omit for an EXAMPLE placeholder')
    ap.add_argument('--out', required=True)
    ap.add_argument('--json-out', help='also save the data used')
    a = ap.parse_args()
    fv = 'new-listing' if a.variant == 'featured-agent' else a.variant
    recs = query(a.hub, fv, key=a.listing_key)
    recs = [r for r in recs if (r.get('Media') or [])]
    if not recs: sys.exit('No matching listing in the feed')
    d = to_post(recs[min(a.index, len(recs) - 1)], a.variant, HUBS[a.hub][0])
    if a.variant == 'featured-agent':
        if a.agent_json: d['agent'] = json.loads(a.agent_json)
        else: d['agent'] = {'name': 'Agent Name', 'brokerage': 'Brokerage', 'handle': '@agenthandle'}; d['example'] = True
    if a.json_out: pathlib.Path(a.json_out).write_text(json.dumps(d, indent=2))
    from playwright.sync_api import sync_playwright
    tpl = pathlib.Path(__file__).resolve().parent.parent / 'public' / 'social-templates' / 'elevated-listings-post.html'
    with sync_playwright() as p:
        try: b = p.chromium.launch()
        except Exception: b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = b.new_page(viewport={'width': 1080, 'height': 1350}, device_scale_factor=1)
        pg.add_init_script('window.__POST__=' + json.dumps(d))
        pg.goto(tpl.as_uri()); pg.wait_for_selector('body[data-ready="1"]', timeout=60000)
        pg.locator('#post').screenshot(path=a.out); b.close()
    print('wrote', a.out, '|', d['address'], d['cityLine'], d['price'])

if __name__ == '__main__': main()
