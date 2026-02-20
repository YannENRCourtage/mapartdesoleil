import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import '@/index.css';
import { Toaster } from '@/components/ui/toaster';
import { Tooltip } from 'react-tooltip';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster />
        <Tooltip id="main-tooltip" />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);