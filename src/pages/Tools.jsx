import React from 'react';
import { BarChart3, CircleDollarSign, Home, Target } from 'lucide-react';

const tools = [
  {
    step: 'Tool 01',
    title: 'Digital Superpower Quiz',
    description: 'Answer seven questions and receive a personalized starting roadmap based on how you naturally build, teach, create, strategize, or connect.',
    href: '/quiz',
    cta: 'Take the Quiz →',
    icon: Target,
  },
  {
    step: 'Tool 02',
    title: 'Freedom Number Calculator',
    description: 'Set a monthly income target and model a portfolio of faceless digital assets that could help close your retirement gap.',
    href: '/freedom',
    cta: 'Calculate My Freedom Number →',
    icon: CircleDollarSign,
  },
  {
    step: 'Tool 03',
    title: 'Niche Profitability Scorecard',
    description: 'Rate an idea across demand, competition, monetization, sustainability, ease of entry, and privacy fit before investing your time.',
    href: '/scorecard',
    cta: 'Score My Niche →',
    icon: BarChart3,
  },
  {
    step: 'Tool 04',
    title: '10X ROI Calculator',
    description: 'Model lead flow, tenant value, lease pricing, and paid-search savings for a rank-and-rent digital property.',
    href: '/roi',
    cta: 'Calculate My ROI →',
    icon: Home,
  },
];

export default function Tools() {
  return (
    <>
      <section className="page-hero">
        <span className="label label--blue">Free Planning Tools</span>
        <h1>Make the next decision with clearer numbers.</h1>
        <p>Use practical calculators and scorecards to find your starting point, validate an idea, and model an asset before you invest.</p>
        <div className="action-row"><a href="#tool-library" className="btn btn--primary">Explore the Tools →</a></div>
      </section>

      <section className="story-section" id="tool-library">
        <div className="story-heading">
          <span className="label label--orange">Know before you build</span>
          <h2>Four tools. One calmer path forward.</h2>
          <p>No account is required. Use the tool that answers the question in front of you today.</p>
        </div>
        <div className="tool-card-grid">
          {tools.map(({ step, title, description, href, cta, icon: Icon }) => (
            <article className="tool-card" key={title}>
              <div className="tool-card__header">
                <Icon size={19} aria-hidden="true" />
                <div>
                  <span>{step}</span>
                  <h3>{title}</h3>
                </div>
              </div>
              <p>{description}</p>
              <a href={href} className="btn btn--primary">{cta}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <span className="label label--blue">A useful first step</span>
        <h2>Start with how you naturally create value.</h2>
        <p>Two minutes gives you a personalized digital asset starting point.</p>
        <div className="action-row"><a href="/quiz" className="btn btn--primary">Take the Quiz →</a></div>
      </section>
    </>
  );
}
