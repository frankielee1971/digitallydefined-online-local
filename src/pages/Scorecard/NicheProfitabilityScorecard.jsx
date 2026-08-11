import React, { useState } from 'react';
import { scoreNiche, tierCopy, CRITERIA } from './ScorecardLogic';
import SiteLayout from '../../components/Layout/SiteLayout';
import { callAgent } from '../../lib/buzz-agents';

export default function NicheProfitabilityScorecard() {
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
  const [nicheName, setNicheName] = useState('');
  const [insight, setInsight] = useState(null);
  const [insightLoading, setInsightLoading] = useState(false);

  const handleScoreChange = (key, value) => {
    const num = Math.min(10, Math.max(0, Number(value || '')));
    if (Number.isNaN(num)) return;
    setScores(prev => ({ ...prev, [key]: num }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (CRITERIA.some(c => scores[c.key] === undefined || scores[c.key] === null)) return;
    const scored = scoreNiche(scores);
    setResult(scored);
    setInsight(null);
    setInsightLoading(true);
    try {
      const response = await callAgent('scorecard', {
        nicheName: nicheName || 'Unnamed niche',
        scores,
        result: scored,
        criteria: CRITERIA,
      });
      setInsight(response.data);
    } catch {
      setInsight(null);
    } finally {
      setInsightLoading(false);
    }
  };

  const allAnswered = CRITERIA.every(c => scores[c.key] != null && scores[c.key] > -1);
  const tierColor = (tier) => tier === 'A' ? '#15803D' : tier === 'B' ? '#4db6d1' : tier === 'C' ? '#f18b25' : '#c20f0a';

  if (result) {
    const copy = tierCopy(result.tier);
    return (
      <SiteLayout mentorTopic="scorecard">
        <section className="page-hero">
          <div className="container container--narrow">
            <p className="section__eyebrow">Results</p>
            <h1>Niche Score for &ldquo;{nicheName || 'your niche'}&rdquo;</h1>
            <div className="action-row"><a href="#score-results" className="btn btn--primary">Review My Score →</a></div>
          </div>
        </section>

        <section className="section" id="score-results">
          <div className="container container--narrow">
            {/* Score badge */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '6rem', height: '6rem', borderRadius: 0, fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2.2rem', color: '#fff', background: tierColor(result.tier), border: '1px solid #000' }}>
                {Math.round(result.pct * 100)}%
              </div>
              <div style={{ marginTop: 'var(--space-sm)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase' }}>{copy.title}</div>
              <p style={{ maxWidth: '480px', marginInline: 'auto', fontSize: '1.05rem', lineHeight: 1.7, color: '#5A5A5A' }}>{copy.body}</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--space-lg)', background: '#fff' }}>
              <p className="section__eyebrow">AI-Assisted Interpretation</p>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                {insightLoading ? 'Interpreting your score...' : insight?.summary || 'Use the score as a filter, then validate the market.'}
              </h2>
              {insight && (
                <div className="grid-2">
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Strongest signals</h3>
                    {insight.strongestSignals?.map(item => <p key={item}>+ {item}</p>)}
                    <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Monetization paths</h3>
                    {insight.monetizationPaths?.map(item => <p key={item}>+ {item}</p>)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Risk flags</h3>
                    {insight.riskFlags?.map(item => <p key={item}>! {item}</p>)}
                    <h3 style={{ fontSize: '1rem', margin: '1rem 0 0.5rem' }}>Validation experiments</h3>
                    {insight.validationExperiments?.map(item => <p key={item}>→ {item}</p>)}
                  </div>
                </div>
              )}
              {insight?.nextAction && <div className="truth-bar"><strong>Next action</strong><span>{insight.nextAction}</span></div>}
            </div>

            {/* Breakdown table */}
            <div className="card" style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.9rem 0', borderBottom: '1px solid rgba(0,0,0,0.08)', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF' }}>
                <span>Criterion</span>
                <span>Score</span>
              </div>
              {CRITERIA.map(c => (
                <div key={c.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', borderBottom: c.key !== 'demand_market' ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{c.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{c.description}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#3B153E' }}>{scores[c.key]} / 10</div>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '0.85rem 0', marginTop: '0.5rem', borderTop: '2px solid rgba(0,0,0,0.08)', fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1rem' }}>
                <span>Total: {result.total}/{result.maxPossible} raw points ({Math.round(result.pct * 100)}%)</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: tierColor(result.tier) }}>{copy.title}</span>
              </div>
            </div>

            {/* Next steps */}
            <div style={{ textAlign: 'center' }}>
              <a href="/tools/calculator" className="btn btn--primary">Calculate My ROI →</a>
              <button onClick={() => { setResult(null); setScores({}); setInsight(null); }} className="btn btn--ghost" style={{ marginLeft: 'var(--space-sm)' }}>Reassess Niche</button>
              <p style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: 'var(--space-sm)' }}>Scores are based on simplified criteria. Use this as a filter, not a final verdict.</p>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout mentorTopic="scorecard">
      <section className="page-hero">
        <div className="container container--narrow">
          <p className="section__eyebrow">Validation Tool</p>
          <h1>Niche Profitability Scorecard</h1>
          <p className="hero__tagline" style={{ fontSize: '1.1rem', maxWidth: '520px', marginInline: 'auto' }}>
            Rate each criterion from 0 to 10. Get an instant profitability assessment before you invest time or money.
          </p>
          <div className="action-row"><a href="#niche-scorecard" className="btn btn--primary">Score My Niche →</a></div>
        </div>
      </section>

      <section className="section" id="niche-scorecard">
        <div className="container container--narrow">
          <form onSubmit={handleSubmit} className="card interactive-form-card">
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Niche Name (optional)</label>
              <input type="text" value={nicheName} onChange={e => setNicheName(e.target.value)} className="form-input" placeholder="e.g. Emergency Plumbing in Phoenix" />
            </div>

            <div className="scorecard-criteria">
              {CRITERIA.map(criterion => (
                <div key={criterion.key} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center', padding: '1rem 0', borderBottom: criterion.key !== 'ease_of_entry' ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.15rem' }}>{criterion.label}</div>
                    <div style={{ fontSize: '0.82rem', color: '#9CA3AF' }}>{criterion.description}</div>
                  </div>
                  <input type="number" min="0" max="10" value={scores[criterion.key] ?? ''} onChange={e => handleScoreChange(criterion.key, e.target.value)}
                    className="form-input" style={{ width: '5rem', textAlign: 'center', padding: '0.5rem 0.4rem', fontWeight: 800, fontSize: '1.1rem' }} />
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
              <button type="submit" disabled={!allAnswered} className="btn btn--primary" style={{ opacity: allAnswered ? 1 : 0.5, cursor: allAnswered ? 'pointer' : 'default' }}>Calculate My Score</button>
              <p style={{ fontSize: '0.82rem', color: '#9CA3AF', marginTop: '0.75rem' }}>Enter a score from 0 to 10 for each item. All fields must be filled to submit.</p>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
