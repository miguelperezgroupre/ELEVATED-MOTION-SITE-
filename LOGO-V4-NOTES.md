# Logo v4 swap — Oct 17, 2026 (preview only, NOT promoted)
- Backup: /workspace/sites/backups/elevated-motion-site-pre-logo-v4-20261017-1118.tgz (+ deploy14-manifest-pre-logo-v4.json)
- New assets: public/assets/brand/sfe-elevated-logo-v4-{240,360,480,720,960,1440}.webp (from /workspace/brand/logo-elevated-v4-2026-10-17.png, premultiplied Lanczos), og-image-v4-2026-10-17.png
- Header (Navigation.tsx): srcSet+sizes, fetchPriority high (React emits <link rel=preload imagesrcset>), 236x56
- Footer, AboutView, RagAssistant: srcSet+sizes; Hero watermark -> v4 480 webp (was 650 KB sfe-arrow-logo.png)
- seo.ts DEFAULT_OG -> og-image-v4-2026-10-17.png; scripts/og-image.mjs legacy SVG OG build disabled (favicons still built from favicon.svg, unchanged)
- Deployment: dpl_bkouMXEdTEDbWcZYLKLLT8GQhnc9 / elevated-motion-site-q7c9259uq.vercel.app (manifest /workspace/deploy15.json)
- Old files left in place (unreferenced): sfe-logo-light.svg, sfe-arrow-logo.png
- Oct 17 (later): About page card sits inside an .sfe-ivory section (card renders #FBF8F1), so it now uses the light-bg logo: sfe-elevated-logo-v4-light-bg-{240,360,480,720}.webp. All other logo spots are on dark backgrounds and keep the dark-bg (white SOUTH FLORIDA) version.

## Oct 17 2026 (12:2x ET): icon set from the ELEVATED icon mark
- Backup: /workspace/sites/backups/elevated-motion-site-pre-icons-v4-20261017-1222.tgz
- public/: favicon.ico (16/32/48), favicon-16/32/48.png, apple-touch-icon.png (180, #0B0B0B), android-chrome-192x192/512x512.png, maskable-icon-512x512.png, site.webmanifest (display: browser)
- index.html: icon/manifest links (with ?v=4); old favicon.svg link removed (file kept, unused)
- scripts/og-image.mjs: arrow-A buildIcon() disabled so the build no longer overwrites favicon-32.png / apple-touch-icon.png
- Note: seo.ts schema LOGO points at /apple-touch-icon.png, so structured data now shows the icon mark tile
