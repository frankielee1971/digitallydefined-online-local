import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';

/**
 * SiteLayout
 * Wraps every page with the shared site chrome (nav + footer).
 */

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <BrandNav />

      <main className="site-main">
        {children}
      </main>

      <BrandFooter />
    </div>
  );
}
