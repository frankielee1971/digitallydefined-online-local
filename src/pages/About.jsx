import React from 'react';

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--ink">
        <span className="label label--orange">Why DigitallyDefined exists</span>
        <h1>Women do not need to be loud to build something valuable.</h1>
        <p>DigitallyDefined is a privacy-first platform for Gen X women turning experience into faceless digital real estate, automated income systems, and transferable family assets.</p>
        <div className="action-row"><a href="/start-here" className="btn btn--primary">Start the Build Path →</a></div>
      </section>
      <section className="story-section story-section--cream">
        <div className="mission-belief-card">
          <div className="story-heading story-heading--left">
            <span className="label label--blue">The belief</span>
            <h2>Faceless is a strategy, not a limitation.</h2>
            <p>Ownership should not require constant visibility.</p>
          </div>
          <div className="prose-block">
            <p>The visible internet rewards constant performance. Many capable women looked at that bargain and reasonably decided it was not for them. But opting out of exposure should not mean opting out of ownership.</p>
            <p>AI changes the cost of building. It can help research, structure, draft, repurpose, route, and maintain. Your judgment still matters most. The technology simply lets your knowledge travel farther without requiring more of your identity.</p>
          </div>
        </div>
      </section>
      <section className="story-section story-section--white">
        <div className="story-heading">
          <span className="label label--orange">One practical path</span>
          <h2>Clarity, property, and systems that can outlive the founder.</h2>
        </div>
        <div className="story-grid story-grid--three">
          <article className="story-card"><span className="story-card__number">01</span><h3>Find the number</h3><p>Free calculators and planning tools help turn retirement uncertainty into a concrete target you can work with.</p></article>
          <article className="story-card story-card--blue"><span className="story-card__number">02</span><h3>Build the property</h3><p>Choose a useful niche asset that fits your experience, privacy needs, available time, and realistic path to revenue.</p></article>
          <article className="story-card story-card--orange"><span className="story-card__number">03</span><h3>Document the system</h3><p>Use practical AI and automation to reduce repetitive work, protect the asset, and make it transferable to someone else.</p></article>
        </div>
      </section>
      <section className="legacy-section">
        <div className="legacy-section__copy">
          <span className="label label--orange">The larger mission</span>
          <h2>Close more than a retirement gap.</h2>
          <p>We are building toward a future where families inherit more than bills, passwords, and unfinished plans. They inherit documented assets, operating knowledge, and proof that financial patterns can change.</p>
          <a href="/start-here" className="btn btn--primary">Start the Build Path →</a>
        </div>
      </section>
    </>
  );
}
