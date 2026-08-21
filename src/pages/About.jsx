import React from 'react';

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--ink">
        <span className="label label--orange">Why DigitallyDefined exists</span>
        <h1>Women don’t need visibility to build something valuable.</h1>
        <p>DigitallyDefined is a privacy‑first platform for Gen X women who want to turn experience into faceless digital real estate, automated income systems, and assets their families can inherit.</p>
        <div className="action-row">
          <a href="/gap" className="btn btn--primary">Start the Build Path →</a>
        </div>
      </section>

      <section className="story-section story-section--cream">
        <div className="mission-belief-card">
          <span className="label label--blue">The belief</span>
          <h2>Faceless is a strategy — not a limitation.</h2>
          <p>Ownership should feel safe. It should not require performance, exposure, or constant visibility.</p>

          <div className="prose-block">
            <p>The visible internet rewards noise, speed, and nonstop output. Many capable women looked at that bargain and reasonably decided it wasn’t for them. But choosing privacy should never mean choosing small.</p>
            <p>AI lowers the cost of building. It helps you research, structure, draft, repurpose, and maintain — without demanding more of your identity. Your judgment is still the asset. Technology simply lets it travel farther.</p>
          </div>
        </div>
      </section>

      <section className="story-section story-section--white">
        <div className="story-heading">
          <span className="label label--orange">One practical path</span>
          <h2>Clarity, property, and systems that can outlive the founder.</h2>
        </div>

        <div className="story-grid story-grid--three">
          <article className="story-card">
            <span className="story-card__number">01</span>
            <h3>Find the number</h3>
            <p>Free calculators and planning tools turn retirement uncertainty into a clear target you can actually work toward.</p>
          </article>

          <article className="story-card story-card--blue">
            <span className="story-card__number">02</span>
            <h3>Build the property</h3>
            <p>Choose a niche digital asset that fits your experience, privacy needs, available time, and realistic path to revenue.</p>
          </article>

          <article className="story-card story-card--orange">
            <span className="story-card__number">03</span>
            <h3>Document the system</h3>
            <p>Use practical AI and automation to reduce repetitive work, protect the asset, and make it transferable to someone else.</p>
          </article>
        </div>
      </section>

      <section className="legacy-section">
        <div className="legacy-section__copy legacy-section__copy--centered">
          <span className="label label--orange">The larger mission</span>
          <h2>Close more than a retirement gap.</h2>
          <p>We’re building toward a future where families inherit more than bills, passwords, and unfinished plans. They inherit documented assets, operating knowledge, and proof that financial patterns can change.</p>
          <a href="/gap" className="btn btn--primary">Start the Build Path →</a>
        </div>
      </section>
    </>
  );
}
