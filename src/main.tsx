import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {SpeedInsights} from '@vercel/speed-insights/react';
import {Analytics} from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';
import './a11y.css';
import './journal.css';
import './ivory.css';

// Pages are prerendered at build time (scripts/prerender.mjs). Hydrate when the HTML is there,
// fall back to a client render in dev or on any page that wasn't prerendered.
const rootEl = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
if (rootEl.firstElementChild) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);

// Analytics live in their own root so they never affect hydration.
const metricsEl = document.createElement('div');
metricsEl.id = 'sfe-metrics';
document.body.appendChild(metricsEl);
createRoot(metricsEl).render(
  <>
    <SpeedInsights />
    <Analytics />
  </>,
);

// a11y: horizontally scrollable regions without focusable content must be
// keyboard-reachable (axe: scrollable-region-focusable, WCAG 2.1.1).
const FOCUSABLE = 'a[href],button,input,select,textarea,[tabindex]';
function tagScrollables() {
  document.querySelectorAll<HTMLElement>('[class*="overflow-x-auto"]').forEach((el) => {
    if (el.hasAttribute('tabindex') || el.scrollWidth <= el.clientWidth + 1) return;
    if (el.querySelector(FOCUSABLE)) return;
    el.tabIndex = 0;
    if (!el.getAttribute('role')) el.setAttribute('role', 'region');
    if (!el.getAttribute('aria-label')) el.setAttribute('aria-label', 'Scrollable content');
  });
}
let a11yTimer = 0;
const scheduleTag = () => {
  window.clearTimeout(a11yTimer);
  a11yTimer = window.setTimeout(tagScrollables, 250);
};
new MutationObserver(scheduleTag).observe(document.body, {childList: true, subtree: true});
window.addEventListener('resize', scheduleTag, {passive: true});
scheduleTag();
