import React from 'react';
// import { Link } from 'react-router-dom'; // Uncomment if you need internal links

/**
 * PageTemplate — DigitallyDefined Brand Template
 * =====================================================
 * Copy this file when creating a new page to maintain brand consistency.
 * 
 * BRAND AESTHETIC GUIDELINES:
 * - Soft Brutalism: sharp edges, no rounded corners
 * - Bold typography with heavy letter-spacing on labels
 * - High contrast borders (1px solid #000)
 * - Color palette: Cream (#FFFCF9), White (#FFFFFF), Orange (#F18B25), Blue (#47B7D4), Ink (#111111)
 * - Geometric, flat design language
 * - No gradients, no shadows with blur, no silhouettes
 * 
 * STRUCTURE:
 * 1. Page Hero (with label, h1, tagline, CTA)
 * 2. Content Sections (alternating cream/white backgrounds)
 * 3. Legacy/Final CTA Section (optional)
 * 
 * All pages are automatically wrapped with SiteLayout (BrandNav + BrandFooter).
 */

export default function PageTemplate() {
  return (
    <>
      {/* =====================================================
          SECTION 1: PAGE HERO
          Use page-hero class with optional page-hero--ink for dark variant
          ===================================================== */}
      <section className="page-hero">
        {/* Label/Eyebrow — always uppercase, bold, small */}
        <span className="label label--orange">Your section label here</span>
        
        {/* Main H1 — large, bold, tight letter-spacing */}
        <h1>Your compelling page title goes here.</h1>
        
        {/* Lead paragraph — muted text, max 720px wide */}
        <p>
          A concise description of what this page offers. Keep it clear, 
          actionable, and aligned with the DigitallyDefined voice: practical, 
          no-hype, privacy-first, and focused on building faceless digital assets.
        </p>
        
        {/* Action buttons — use btn classes */}
        <div className="action-row">
          <a href="/your-cta-link" className="btn btn--primary">
            Primary CTA →
          </a>
          <a href="/secondary-link" className="btn btn--outline">
            Secondary CTA
          </a>
        </div>
      </section>

      {/* =====================================================
          SECTION 2: CONTENT BLOCK (Cream Background)
          Use story-section--cream for cream background
          ===================================================== */}
      <section className="story-section story-section--cream">
        <div className="story-heading">
          <span className="label label--blue">Section label</span>
          <h2>Section heading that tells a story.</h2>
          <p>
            Supporting text that expands on the heading. Maintain the brand voice:
            direct, empowering, and focused on practical outcomes.
          </p>
        </div>
        
        {/* Example: 3-column grid of cards */}
        <div className="story-grid story-grid--three">
          <article className="story-card">
            <span className="story-card__number">01</span>
            <h3>Card Title One</h3>
            <p>Brief description of this concept or feature.</p>
          </article>
          
          <article className="story-card story-card--blue">
            <span className="story-card__number">02</span>
            <h3>Card Title Two</h3>
            <p>Use story-card--blue for accent cards.</p>
          </article>
          
          <article className="story-card story-card--orange">
            <span className="story-card__number">03</span>
            <h3>Card Title Three</h3>
            <p>Use story-card--orange for highlight cards.</p>
          </article>
        </div>
      </section>

      {/* =====================================================
          SECTION 3: CONTENT BLOCK (White Background)
          Use story-section--white for white background
          ===================================================== */}
      <section className="story-section story-section--white">
        <div className="split-story">
          <div className="story-heading story-heading--left">
            <span className="label label--orange">Left-aligned section</span>
            <h2>Heading for split layout content.</h2>
            <p>
              Text content on the left side. The split-story layout creates a 
              two-column grid with text on the left and visual/content on the right.
            </p>
            <a href="/link" className="text-link">Learn more →</a>
          </div>
          
          {/* Right column content — could be advantage list, diagram, etc. */}
          <div className="advantage-list">
            <div className="advantage-row">
              <span>01</span>
              <div>
                <h3>Advantage Point One</h3>
                <p>Description of this advantage or benefit.</p>
              </div>
            </div>
            <div className="advantage-row">
              <span>02</span>
              <div>
                <h3>Advantage Point Two</h3>
                <p>Another advantage or benefit description.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 4: DARK/INK SECTION
          Use story-section--ink for dark background with light text
          ===================================================== */}
      <section className="story-section story-section--ink">
        <div className="story-heading">
          <span className="label label--orange">Dark section label</span>
          <h2>High-impact statement in the dark section.</h2>
          <p>
            This section uses white text on black background for maximum contrast 
            and visual impact. Use sparingly for key messages.
          </p>
        </div>
        
        {/* Asset grid example — 2 columns with borders */}
        <div className="asset-grid">
          <article className="asset-card">
            <span>PROPERTY 01</span>
            <h3>Asset Type One</h3>
            <p>Description of this digital asset type.</p>
          </article>
          <article className="asset-card">
            <span>PROPERTY 02</span>
            <h3>Asset Type Two</h3>
            <p>Another digital asset type description.</p>
          </article>
        </div>
        
        {/* Disclaimer text for dark sections */}
        <p className="disclaimer">
          Important disclaimer or contextual note in lighter text.
        </p>
      </section>

      {/* =====================================================
          SECTION 5: EXPECTATION STRIP (Orange Background)
          Three-column strip for "What this is/is not" content
          ===================================================== */}
      <section className="expectation-strip">
        <div>
          <strong>What this is</strong>
          <p>A clear, honest description of what users can expect.</p>
        </div>
        <div>
          <strong>What this is not</strong>
          <p>Clarify misconceptions or set boundaries.</p>
        </div>
        <div>
          <strong>What comes next</strong>
          <p>Guide users to their next action or step.</p>
        </div>
      </section>

      {/* =====================================================
          SECTION 6: TICKER STRIP (Blue Background)
          Scrolling or static ticker for principles/taglines
          ===================================================== */}
      <section className="ticker">
        <span>PRINCIPLE ONE</span>
        <span>PRINCIPLE TWO</span>
        <span>PRINCIPLE THREE</span>
        <span>PRINCIPLE FOUR</span>
      </section>

      {/* =====================================================
          SECTION 7: LEGACY/MISSION SECTION (Blue Background)
          Use for larger mission statements or calls to action
          ===================================================== */}
      <section className="legacy-section">
        <div className="legacy-section__copy">
          <span className="label label--orange">The larger mission</span>
          <h2>Inspiring mission or vision statement.</h2>
          <p>
            Expand on the broader purpose or impact. Connect to the 
            DigitallyDefined mission of helping Gen X women build faceless 
            digital assets and close the retirement gap.
          </p>
        </div>
        
        {/* Numbered stack for steps or principles */}
        <div className="legacy-stack">
          <div>
            <span>01</span>
            <strong>First Step</strong>
            <small>Brief description of this step.</small>
          </div>
          <div>
            <span>02</span>
            <strong>Second Step</strong>
            <small>Brief description of this step.</small>
          </div>
          <div>
            <span>03</span>
            <strong>Third Step</strong>
            <small>Brief description of this step.</small>
          </div>
        </div>
      </section>

      {/* =====================================================
          SECTION 8: FINAL CTA (Black Background)
          Final call-to-action before footer
          ===================================================== */}
      <section className="final-cta">
        <span className="label label--blue">Final encouragement label</span>
        <h2>Your final compelling call to action headline.</h2>
        <div className="action-row">
          <a href="/primary-final-cta" className="btn btn--outline">
            Primary Action →
          </a>
          <a href="/secondary-final-cta" className="btn btn--primary btn--large">
            Secondary Action →
          </a>
        </div>
        <p className="microcopy">
          Small print, reassurance, or additional context for the CTAs.
        </p>
      </section>

      {/* =====================================================
          OPTIONAL: Email Signup Component
          Include if you want to capture emails on this page
          ===================================================== */}
      {/* <EmailSignup source="pagename-footer" /> */}
    </>
  );
}
