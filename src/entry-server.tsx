// @ts-nocheck
// Build-time entry: renders each route to static HTML (see scripts/prerender.mjs).
import {renderToString} from 'react-dom/server';
import {jsx} from 'react/jsx-runtime';
import App from './App';
export {PAGE_ROUTES, SITE_URL, routeFromPath, pathFor, absUrl} from './routes';
export {headFor, renderHeadHtml} from './seo';
export {ARTICLES} from './journal';

export function render(path) {
  return renderToString(jsx(App, {initialPath: path}));
}
