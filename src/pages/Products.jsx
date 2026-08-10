import React from 'react';
import SiteLayout from '../components/Layout/SiteLayout';

export default function Products() {
  return (
    <SiteLayout>
      <section className="page-hero">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Digital Products</p>
          <h1 style={{ marginBottom: '1rem' }}>
            Assets That Build Assets
          </h1>
          <p className="hero__tagline" style={{ fontSize: '1.15rem' }}>
            Faceless tools designed for Gen X women building digital freedom.
          </p>
          <div className="action-row"><a href="/tools" className="btn btn--primary">Explore the Free Tools →</a></div>
        </div>
      </section>

      <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container container--narrow" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <div className="card" style={{ maxWidth: 680, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Products Coming Soon</h2>
          <p style={{ fontSize: '1.1rem', color: '#5A5A5A', maxWidth: 600, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            We're building faceless tools designed for Gen X women building digital freedom. 
            These assets will help you calculate your retirement gap, score niches, model ROI, 
            and automate your digital real estate portfolio.
          </p>
          <a href="/contact" className="btn btn--primary">Get Notified →</a>
          <p style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '2rem' }}>
            Join the waitlist to be first when products launch.
          </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
