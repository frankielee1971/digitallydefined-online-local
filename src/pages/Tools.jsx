import React, { useEffect, useState } from 'react';
import { fetchPersonalization } from '../lib/personalization';


const tools = [
  {
    step: '01',
    title: 'Digital Superpower Quiz',
    description: 'Answer seven questions to discover how you naturally create value. Your result determines which asset type fits your personality and schedule.',
    href: '/quiz?start=true',
    cta: 'Start the Quiz',
    note: 'Start here if you are not sure where to begin.'
  },
  {
    step: '02',
    title: 'Retirement Gap Calculator',
    description: 'Enter your current savings and retirement goals. See exactly how much income you need from digital assets to close your gap.',
    href: '/gap',
    cta: 'Calculate My Gap'
  },
  {
    step: '03',
    title: 'Freedom Number Calculator',
    description: 'Set your monthly target. Model how many assets at what yield covers your gap. See the path from anxiety to plan.',
    href: '/freedom',
    cta: 'Model My Freedom Number'
  },
  {
    step: '04',
    title: 'Niche & ROI Tools',
    description: 'Score a niche idea for viability, then model the revenue potential with the 10X ROI Calculator for rank-and-rent properties.',
    href: '/tools/scorecard',
    cta: 'Validate My Idea',
    subLinks: [
      { href: '/tools/scorecard', label: 'Niche Scorecard' },
      { href: '/roi', label: 'ROI Calculator' }
    ]
  },
];

export default function Tools() {
  const [personalization, setPersonalization] = useState(null);

  useEffect(() => {
    let active = true;
    fetchPersonalization()
      .then((data) => {
        if (active) setPersonalization(data);
      })
      .catch(() => {
        if (active) setPersonalization(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="page-hero">
        <span className="label label--blue">Free Planning Tools</span>
        <h1>Make the next decision with clearer numbers.</h1>
        <p>Use practical calculators and scorecards to find your starting point, validate an idea, and model an asset before you invest.</p>
        <div className="action-row"><a href="#tool-library" className="btn btn--primary">See the Tools â†’</a></div>
      </section>

      <section className="story-section story-section--white" id="tool-library">
        <div className="story-heading">
          <span className="label label--orange">Know before you build</span>
          <h2>Follow the sequence. Or jump to what you need.</h2>
          <p>No account is required. Step 01 is recommended for first-time visitors. The others assume you have already identified your gap or superpower.</p>
        </div>

        <div className="tools-grid">
          {tools.map(({ step, title, description, href, cta, note, subLinks }) => (
            <article className="path-step" key={step}>
              <span className="path-step__number">{step}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
                {note && <p className="tools-step-note">{note}</p>}
                {subLinks && subLinks.length > 0 && (
                  <div className="tools-sub-links">
                    {subLinks.map((link, idx) => (
                      <a key={idx} href={link.href} className="tools-sub-link">{link.label}</a>
                    ))}
                  </div>
                )}
              </div>
              <a href={href} className="btn btn--primary">{cta} â†’</a>
            </article>
          ))}
        </div>

        <div className="tools-footer">
{personalization && (
  <section className="story-section" style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
    <h3 className="section__eyebrow">Recommended for you</h3>
    <p>{personalization.nicheSuggestion}
      {personalization.assetSuggestions?.length > 0 ?
        `: ${personalization.assetSuggestions[0]}` : ''
    }</p>
    <p>{personalization.homepageRecommendations?.[0]}</p>
  </section>
)}
          <p>Not sure which tool to use? <a href="/quiz?start=true">Take the quiz first</a> â€” it tells you exactly where to start based on how you think.</p>
        </div>
      </section>
    </>
  );
}
