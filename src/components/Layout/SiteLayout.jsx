import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import ChatWidget from '../ChatWidget';

/**
 * SiteLayout
 * Wraps every page with the shared site chrome (nav + footer + AI Mentor widget).
 */

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <BrandNav />

      <main className="site-main">
        {children}
      </main>

      <BrandFooter />

      {/* AI Mentor — available on every page */}
      <ChatWidget />
    </div>
  );
}
