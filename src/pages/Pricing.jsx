import React, { useState } from 'react';
import SiteLayout from '../components/Layout/SiteLayout';

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  const plans = [
    { name: 'Free', price: '$0', desc: 'Explore tools, take the quiz, grab free resources.', features: ['Digital Superpower Quiz', 'Niche Profitability Scorecard', '10x ROI Calculator', 'Free AI Tools lists', 'Community forum access'], cta: 'Start Free', ctaClass: 'btn--outline' },
    { name: 'Builder', price: billing === 'monthly' ? '$27/mo' : '$297/year', desc: 'The automation starter kit. Systems that actually work.', features: ['Everything in Free', 'Automated email sequences', 'Social media scheduling (5 platforms)', 'AI content engine access', 'Notion dashboard templates', 'SEO content calendar'], cta: 'Get Started', ctaClass: 'btn--primary', highlighted: true },
    { name: 'Empire', price: billing === 'monthly' ? '$67/mo' : '$697/year', desc: 'Full faceless empire builder. Automate everything.', features: ['Everything in Builder', 'Unlimited social posting', 'Google Sheets revenue tracking', 'Custom CRM integration', 'Priority support', 'Exclusive templates & SOPs', 'API access for custom builds'], cta: 'Go Full Speed', ctaClass: 'btn--primary' }
  ];

  return (
    <SiteLayout mentorTopic="pricing">
      <section className="page-hero">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Pricing</p>
          <h1 style={{ marginBottom: '1rem' }}>Leverage Over Burnout. Pick Your System.</h1>
          <p className="hero__tagline">No hidden fees. No upsells. Just pricing that reflects actual value.</p>
          <div className="action-row"><a href="#plans" className="btn btn--primary">See the Plans →</a></div>
        </div>
      </section>
      <section className="section" id="plans" style={{ paddingBottom: '3rem' }}>
        <div className="container container--narrow">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p className="section__eyebrow">Pricing</p>
            <h2 style={{ maxWidth: 700, margin: '0 auto 1rem' }}>Leverage Over Burnout</h2>
            <p className="section__subtitle" style={{ fontSize: '1.15rem' }}>No hidden fees. No upsells. Just pricing that reflects actual value.</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <button onClick={() => setBilling('monthly')} className={`btn ${billing === 'monthly' ? 'btn--primary' : 'btn--outline'}`}>Monthly</button>
            <button onClick={() => setBilling('yearly')} className={`btn ${billing === 'yearly' ? 'btn--primary' : 'btn--outline'}`}>Yearly <span style={{ opacity: 0.9, fontSize: '0.75rem' }}>(Save 17%)</span></button>
          </div>
          <div className="grid-3">
            {plans.map(plan => (
              <div key={plan.name} className="card" style={{ padding: '2.5rem 2rem', border: plan.highlighted ? '3px solid var(--dd-orange)' : '2px solid var(--black)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {plan.highlighted && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--dd-orange)', color: 'var(--white)', padding: '0.35rem 1rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', border: '2px solid var(--black)' }}>Most Popular</div>}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div className="card__heading" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{plan.name}</div>
                  <div className="card__result" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{plan.price}</div>
                  <p className="card__text" style={{ color: '#2D3748', fontSize: '0.95rem' }}>{plan.desc}</p>
                </div>
                <ul style={{ listStyle: 'none', flex: 1, marginBottom: '1.5rem' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ padding: '0.5rem 0', fontSize: '0.95rem', lineHeight: 1.6, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>✓ {f}</li>
                  ))}
                </ul>
                <a href="/start-here" className={`btn ${plan.ctaClass}`} style={{ width: '100%' }}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
