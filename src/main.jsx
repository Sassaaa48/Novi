import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/features.css';
import './styles/sections.css';
import './styles/cta.css';
import './styles/modal.css';
import './styles/footer.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
