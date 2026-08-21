import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ToolStateProvider } from './context/ToolStateContext.jsx';
import './styles/global.css';
import './styles/tailwind.css';

// Vercel Analytics + Speed Insights
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Initialize Puter.js for cloud OS features
import puter from './puter-adapter.js';

// Global Puter availability check
window.puter = puter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToolStateProvider>
      <BrowserRouter>
        <App />
        <Analytics />
        <SpeedInsights />
      </BrowserRouter>
    </ToolStateProvider>
  </React.StrictMode>
);
