import React from 'react';
import SiteLayout from '../components/Layout/SiteLayout';

const path = [
  ['01', 'Face the number', 'Use the Retirement Gap Calculator to turn a vague fear into a planning number. The result is a scenario, not a verdict.', '/gap', 'Calculate the gap'],
  ['02', 'Name your advantage', 'Take the Digital Superpower Quiz to identify the kind of asset-building work that fits how you naturally think.', '/quiz', 'Find your superpower'],
  ['03', 'Choose a problem', 'Use niche discovery and the profitability scorecard to test demand, privacy fit, durability, and ways to earn.', '/scorecard', 'Score a niche'],
  ['04', 'Model one asset', 'Use the ROI and Freedom Number calculators to compare a realistic asset plan with your monthly target.', '/freedom', 'Model the portfolio'],
  ['05', 'Build the first version', 'Turn the validated idea into one small, useful property. Document the process so it can be improved, automated, and repeated.', '/tools', 'Choose a build tool'],
];

export default function StartHere() {
  return (
    <SiteLayout mentorTopic="start-here">
      <section className="page-hero">
        <span className="label label--blue">Start here / not everywhere</span>
        <h1>One path from retirement anxiety to an asset you own.</h1>
        <p>You do not need another pile of ideas. You need a sequence that respects your time, privacy, experience, and actual financial goal.</p>
        <div className="action-row"><a href="/quiz" className="btn btn--primary">Take the Quiz →</a></div>
      </section>
      <section className="story-section story-section--white">
        <div className="path-list">
          {path.map(([number, title, copy, href, cta]) => (
            <article className="path-step" key={number}>
              <span className="path-step__number">{number}</span>
              <div><h2>{title}</h2><p>{copy}</p></div>
              <a href={href} className="btn btn--primary">{cta} →</a>
            </article>
          ))}
        </div>
      </section>
      <section className="expectation-strip">
        <div><strong>What this is</strong><p>A practical system for building owned digital assets with AI assistance.</p></div>
        <div><strong>What this is not</strong><p>A guarantee, a get-rich-quick plan, or a demand that you become a public personality.</p></div>
        <div><strong>What comes first</strong><p>Clarity, validation, one small build, and a documented process you can repeat.</p></div>
      </section>
    </SiteLayout>
  );
}
