import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {applyA11y, loadA11y} from './lib/a11y';

// Restore saved accessibility preferences before first paint to avoid a flash.
applyA11y(loadA11y());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
