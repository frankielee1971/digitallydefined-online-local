import React from 'react';
import SiteLayout from '../components/Layout/SiteLayout';

export default function Automation() {
  const steps = [
    { num: '01', title: 'Capture', desc: 'Visitor lands on your site. Email capture or quiz completion. No face needed.' },
    { num: '02', title: 'Nurture', desc: 'Automated email sequences deliver value and position your digital products as the next logical step.' },
    { num: '03', title: 'Convert', desc: 'Quiz results trigger personalized product recommendations. Automated checkout. One-click upsells.' },
    { num: '04', title: 'Scale', desc: 'Content engines generate SEO pages, social posts, and lead magnets on autopilot.' }
  ];

  return (
    <SiteLayout>
      <section className="hero hero--dark">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Automation</p>
          <h1 style={{ marginBottom: '1rem' }}>Systems That Work While You Sleep.</h1>
          <p className="hero__tagline">Configure once. Run forever. No more tool management — just configured systems doing the work.</p>
        </div>
      </section>
      <section className="section" style={{ background: 'linear-gradient(180deg, #FFFCF9 0%, #fff 100%)' }}>
        <div className="container container--narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section__eyebrow">Automation</p>
            <h2 style={{ maxWidth: 700, margin: '0 auto 1rem' }}>Your Faceless Empire. Four Steps.</h2>
            <p className="section__subtitle" style={{ fontSize: '1.15rem' }}>Configure once. Run forever. No more tool management — just configured systems doing the work.</p>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {steps.map(s => (
              <div key={s.num} className="card" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'flex-start', border: '2px solid var(--black)', position: 'relative' }}>
                <div style={{ flexShrink: 0, width: '4rem', height: '4rem', background: 'linear-gradient(135deg, var(--dd-orange) 0%, #FF9F43 100%)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '1.5rem', border: '2px solid var(--black)' }}>{s.num}</div>
                <div style={{ flex: 1, paddingTop: '0.5rem' }}>
                  <div className="card__heading" style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{s.title}</div>
                  <p className="card__text" style={{ fontSize: '1.05rem', lineHeight: 1.7, marginBottom: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff' }}>What Runs on Autopilot?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '1rem auto 2rem' }}>Social posting, email funnels, content generation, lead capture, CRM tracking, and revenue analytics — all automated through DigitallyDefined's backend.</p>
        </div>
      </section>
    </SiteLayout>
  );
}