import React from 'react';
import SiteLayout from '../components/Layout/SiteLayout';

export default function ComingSoon() {
  return (
    <SiteLayout mentorTopic="home">
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <span className="label label--blue">Coming Soon</span>
        <h1>This page is under construction.</h1>
        <p className="hero__tagline">We are building something useful. Check back soon.</p>
        <div className="action-row">
          <a href="/start-here" className="btn btn--primary">Start Here →</a>
        </div>
      </section>
    </SiteLayout>
  );
}
