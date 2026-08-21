import React from 'react';
import FadeInSection from '../components/FadeInSection';
import { brutalHeading } from '../config/theme';

export default function ComingSoon() {
  return (
    <FadeInSection>
      <section className="page-hero" style={{ textAlign: 'center' }}>
        <span className="label label--blue">Coming Soon</span>
        <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>This page is under construction.</h1>
        <p className="hero__tagline">We are building something useful. Check back soon.</p>
        <div className="action-row">
          <a href="/" className="btn btn--primary dd-button dd-button--primary">Start Here →</a>
        </div>
      </section>
    </FadeInSection>
  );
}
