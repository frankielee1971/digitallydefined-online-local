import React from 'react';
import { BarChart3, CircleDollarSign, Home, Target } from 'lucide-react';

const tools = [
  {
    step: 'Step 01',
    title: 'Digital Superpower Quiz',
    description: 'Answer seven questions to discover how you naturally create value. Your result determines which asset type fits your personality and schedule.',
    href: '/quiz?start=true',
    cta: 'Start the Quiz →',
    icon: Target,
    priority: 'primary',
    note: 'Start here if you are not sure where to begin.'
  },
  {
    step: 'Step 02',
    title: 'Retirement Gap Calculator',
    description: 'Enter your current savings and retirement goals. See exactly how much income you need from digital assets to close your gap.',
    href: '/gap',
    cta: 'Calculate My Gap →',
    icon: CircleDollarSign,
    priority: 'secondary'
  },
  {
    step: 'Step 03',
    title: 'Freedom Number Calculator',
    description: 'Set your monthly target. Model how many assets at what yield covers your gap. See the path from anxiety to plan.',
    href: '/freedom',
    cta: 'Model My Freedom Number →',
    icon: Target,
    priority: 'secondary'
  },
  {
    step: 'Step 04',
    title: 'Niche & ROI Tools',
    description: 'Score a niche idea for viability, then model the revenue potential with the 10X ROI Calculator for rank-and-rent properties.',
    href: '/tools/scorecard',
    cta: 'Validate My Idea →',
    icon: BarChart3,
    priority: 'secondary',
    subLinks: [
      { href: '/tools/scorecard', label: 'Niche Scorecard' },
      { href: '/roi', label: 'ROI Calculator' }
    ]
  },
];

export default function Tools() {
  return (
    <>
      <section className="page-hero">
        <span className="label label--blue">Free Planning Tools</span>
        <h1>Make the next decision with clearer numbers.</h1>
        <p>Use practical calculators and scorecards to find your starting point, validate an idea, and model an asset before you invest.</p>
        <div className="action-row"><a href="#tool-library" className="btn btn--primary">See the Tools →</a></div>
      </section>

      <section className="story-section" id="tool-library">
        <div className="story-heading">
          <span className="label label--orange">Know before you build</span>
          <h2>Follow the sequence. Or jump to what you need.</h2>
          <p>No account is required. Step 01 is recommended for first-time visitors. The others assume you have already identified your gap or superpower.</p>
        </div>

        <div className="tool-sequence">
          {tools.map(({ step, title, description, href, cta, icon: Icon, priority, note, subLinks }, index) => (
            <article key={step} className={`tool-sequence-item tool-sequence-item--${priority}`}>
              <div className="tool-sequence-header">
                <div className="tool-sequence-number">{step.replace('Step ', '')}</div>
                <div className="tool-sequence-icon">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <div className="tool-sequence-title">{title}</div>
              </div>
              
              <p className="tool-sequence-desc">{description}</p>
              
              {note && <p className="tool-sequence-note">{note}</p>}
              
              <div className="tool-sequence-actions">
                <a href={href} className={`btn ${priority === 'primary' ? 'btn--primary btn--large' : 'btn--outline'}`}>
                  {cta}
                </a>
                
                {subLinks && subLinks.length > 0 && (
                  <div className="tool-sub-links">
                    {subLinks.map((link, idx) => (
                      <a key={idx} href={link.href} className="tool-sub-link">{link.label}</a>
                    ))}
                  </div>
                )}
              </div>
              
              {index < tools.length - 1 && <div className="tool-sequence-connector">↓</div>}
            </article>
          ))}
        </div>

        <div className="tools-footer">
          <p>Not sure which tool to use? <a href="/quiz?start=true">Take the quiz first</a> — it tells you exactly where to start based on how you think.</p>
        </div>
      </section>
    </>
  );
}
