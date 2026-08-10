import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import ChatWidget from '../ChatWidget';

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <BrandNav />
      <main className="site-main">{children}</main>
      <BrandFooter />
      {/* Temporarily remove ChatWidget to fix blank page */}
      {/* <ChatWidget position="bottom-right" /> */}
    </div>
  );
}
