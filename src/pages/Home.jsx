import React from 'react';
import EmailSignup from '../components/EmailSignup';

const pressures = [
  ['01', 'The caregiving squeeze', 'You may be helping children launch, supporting aging parents, and trying to protect your own future at the same time.'],
  ['02', 'The interrupted career', 'Years spent caregiving, underpaid, divorced, downsized, or rebuilding can show up later as smaller savings and benefits.'],
  ['03', 'The time gap', 'The old advice assumes decades of uninterrupted compounding. Many Gen X women need an income strategy that can begin now.'],
  ['04', 'The visibility tax', 'The internet keeps insisting that income requires constant posting, personal exposure, and becoming a full-time personality. It does not.'],
];

const advantages = [
  ['Pattern recognition', 'You have lived through analog and digital change. You can spot what is useful, what is noise, and what real people will pay to solve.'],
  ['Earned expertise', 'Careers, caregiving, reinvention, and hard-won judgment create niche knowledge that AI can help package without replacing your voice.'],
  ['Trust instincts', 'Gen X skepticism is an advantage. Clear, useful, no-hype digital assets stand out in an internet crowded with performance.'],
  ['Resourcefulness', 'You learned to figure things out before tutorials existed. With AI handling repetition, that independence becomes leverage.'],
];

const assets = [
  ['Search property', 'A useful niche website that attracts high-intent visitors and generates leads for a business.'],
  ['Knowledge property', 'Templates, guides, databases, calculators, and resource libraries built around a specific problem.'],
  ['Audience property', 'A faceless newsletter, directory, or content channel that compounds attention you control.'],
  ['System property', 'Automated funnels and workflows that capture, nurture, route, and measure demand without constant manual work.'],
];

export default function Home() {
  return (
    <>
      <section className="story-hero">
        <div className="story-hero__grid">
          <div className="reveal">
            <span className="label label--blue">Sovereign wealth for Gen X women</span>
            <h1>Build a retirement asset that <span className="marker">does not need your face.</span></h1>
            <p className="story-hero__lead">
              DigitallyDefined helps Gen X women turn lived experience into faceless digital real estate using practical AI and automated systems, so retirement does not depend on one paycheck, one platform, or being visible every day.
            </p>
            <div className="action-row">
              <a href="/start-here" className="btn btn--primary btn--large">Start Your Build Path →</a>
            </div>
            <p className="microcopy">No camera. No invented urgency. No promise of overnight income.</p>
          </div>

          <aside className="manifesto-card reveal reveal--delay">
            <span className="manifesto-card__index">THE NEW PLAN / 01</span>
            <p className="manifesto-card__quote">"We are not trying to become influencers. We are building useful property on the internet."</p>
            <div className="manifesto-card__ledger">
              <span>Own the asset</span>
              <span>Automate the repetition</span>
              <span>Document the system</span>
              <span>Pass it forward</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="ticker" aria-label="DigitallyDefined principles">
        <span>FACELESS BY DESIGN</span><span>AI AS LEVERAGE</span><span>SYSTEMS OVER HUSTLE</span><span>ASSETS OVER ALGORITHMS</span>
      </section>

      <section className="story-section story-section--cream">
        <div className="story-heading">
          <span className="label label--orange">The part no one planned for</span>
          <h2>You did everything you were told. The math still feels uncertain.</h2>
          <p>This is not a failure of discipline. It is the accumulated weight of unequal pay, unpaid care, career interruptions, rising costs, and retirement systems designed around a different life.</p>
        </div>
        <div className="story-grid story-grid--four">
          {pressures.map(([number, title, copy]) => (
            <article className="story-card" key={number}>
              <span className="story-card__number">{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="truth-bar">
          <strong>The goal is not to erase the past.</strong>
          <span>It is to build an asset base that gives the next decade more options than the last one did.</span>
        </div>
      </section>

      <section className="story-section story-section--white">
        <div className="split-story">
          <div className="story-heading story-heading--left">
            <span className="label label--blue">Your unfair advantage</span>
            <h2>Gen X is not late to the internet. We are built for this version of it.</h2>
            <p>You do not need to compete with twenty-year-old creators at being twenty. Your advantage is context: knowing how businesses work, what people actually need, and how to keep going when the novelty wears off.</p>
            <a href="/quiz?start=true" className="text-link">Find your digital superpower →</a>
          </div>
          <div className="advantage-list">
            {advantages.map(([title, copy], index) => (
              <div className="advantage-row" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section story-section--ink">
        <div className="story-heading">
          <span className="label label--orange">What you are building</span>
          <h2>Digital real estate is useful online property that can earn, grow, and transfer.</h2>
          <p>Instead of renting all your attention to social platforms, you build assets you can control: a domain, an email list, a searchable resource, a product library, a lead engine, or a documented automation.</p>
        </div>
        <div className="asset-grid">
          {assets.map(([title, copy], index) => (
            <article className="asset-card" key={title}>
              <span>PROPERTY {String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className="disclaimer">Digital assets take research, testing, maintenance, and time to become profitable. Calculator projections are planning scenarios, not income guarantees.</p>
      </section>

      <section className="story-section story-section--automation">
        <div className="automation-map">
          <div className="story-heading story-heading--left">
            <span className="label label--blue">The quiet operating system</span>
            <h2>You bring the judgment. Simple AI systems carry the repetition.</h2>
            <p>DigitallyDefined helps you move from an idea to a repeatable asset workflow: research the problem, validate demand, create useful content, capture interest, follow up, and measure what is working without manually rebuilding every step.</p>
          </div>
          <div className="system-diagram" aria-label="Faceless digital asset workflow">
            <div className="system-node system-node--orange"><small>YOU</small><strong>Direction + lived expertise</strong></div>
            <div className="system-arrow">↓</div>
            <div className="system-node system-node--black"><small>AI ASSISTANCE</small><strong>Research + structure + production</strong></div>
            <div className="system-arrow">↓</div>
            <div className="system-node system-node--blue"><small>AUTOMATION</small><strong>Capture + follow-up + measurement</strong></div>
            <div className="system-arrow">↓</div>
            <div className="system-node"><small>DIGITAL PROPERTY</small><strong>Compounding assets you control</strong></div>
          </div>
        </div>
      </section>

      <section className="legacy-section">
        <div className="legacy-section__copy">
          <span className="label label--orange">Beyond retirement</span>
          <h2>A legacy is not only money. It is a working system your family does not have to start from zero.</h2>
          <p>Generational trauma often includes scarcity, silence, financial confusion, and knowledge that disappears with one person. A documented digital portfolio can hold something different: owned assets, recurring processes, customer relationships, operating instructions, and the confidence that wealth-building is learnable.</p>
        </div>
        <div className="legacy-stack">
          <div><span>01</span><strong>Build</strong><small>Create useful assets around problems you understand.</small></div>
          <div><span>02</span><strong>Protect</strong><small>Document ownership, access, revenue, and maintenance.</small></div>
          <div><span>03</span><strong>Transfer</strong><small>Leave a clear digital inheritance, not a locked account mystery.</small></div>
          <div><span>04</span><strong>Teach</strong><small>Pass down the system and the belief that assets can be built.</small></div>
        </div>
      </section>

      <section className="final-cta">
        <span className="label label--blue">Your next chapter can own property</span>
        <h2>Start with the truth of your numbers. Then build one useful asset.</h2>
        <div className="action-row">
          <a href="/gap" className="btn btn--outline">Calculate My Retirement Gap →</a>
          <a href="/quiz?start=true" className="btn btn--primary btn--large">Find Your Superpower First →</a>
        </div>
        <p className="microcopy">Not sure where to start? Take the 2-minute quiz to find your digital asset superpower.</p>
      </section>

      <EmailSignup source="homepage-story" />
    </>
  );
}
