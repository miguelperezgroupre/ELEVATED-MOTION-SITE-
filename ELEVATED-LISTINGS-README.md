# Elevated Listings (working name)

A neighborhood listings-media section inside the South Florida Elevated site.

## Routes
- `/featured` landing: hubs, live "just listed" strip, Insiders/Happenings/News (links to /guides, /south-florida, /journal), agent pitch, weekly email.
- `/featured/miami-beach`, `/featured/brickell`, `/featured/coral-gables`, `/featured/fort-lauderdale`: hubs with New Listings, Price Changes and Just Sold tabs, read live from the MLS through `/api/idx` (only already-sanitized fields; listing brokerage shown as "Listing courtesy of"; no agent names or contact details).
- `/featured/submit`: "Agents: get featured" form. Posts to `/api/lead` (GoHighLevel, Follow Up Boss fallback) with intent `Elevated Listings: Agent Feature Request`.
- The weekly email signup posts to `/api/lead` as type `newsletter`, intent `Elevated Listings Weekly`.

Code: `src/featured/` (config, feed) and `src/components/featured/`. Hubs are defined in `src/featured/config.ts`; add a neighborhood by adding an OData filter there plus a route in `src/routes.ts` and `src/seo.ts`.

## Instagram post template
`public/social-templates/elevated-listings-post.html` (1080x1350) and `scripts/render-listing-post.py` render posts from live MLS data in four variants: new-listing, price-change, just-sold, featured-agent.

    python3 scripts/render-listing-post.py --variant new-listing --hub miami-beach --index 0 --out post.png

Before posting other brokers' listings or photos, confirm MLS advertising rules and broker permission. Keep the "Listing courtesy of" line.

## Not decided yet (Miguel)
Package pricing, Instagram handle, whether to show Just Sold data publicly. Nothing is charged on the site.
