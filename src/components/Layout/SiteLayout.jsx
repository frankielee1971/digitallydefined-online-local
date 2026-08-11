import React from 'react';
import BrandNav from '../BrandNav';
import BrandFooter from '../BrandFooter';
import MentorWidget from '../MentorWidget';

export default function Layout({ children, mentorTopic }) {
  return (
    <div className="site-shell">
      <BrandNav />
      <main className="site-main">{children}</main>
      <BrandFooter />
      <MentorWidget topic={mentorTopic} />
    </div>
  );
}
