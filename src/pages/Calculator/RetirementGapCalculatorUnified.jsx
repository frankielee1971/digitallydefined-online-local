import React, { useState, useEffect, useRef } from 'react';
import FadeInSection from '../../components/FadeInSection';
import { brutalCard, brutalHeading } from '../../config/theme';
import { callAgent } from '../../lib/buzz-agents';

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
};

const ASSET_TYPES = [
  { id: 'templates', name: 'Template Hubs & Printables', icon: '📋', minYield: 50, maxYield: 2000, defaultYield: 500, color: '#F18B25' },
  { id: 'newsletters', name: 'Paid Newsletters', icon: '✉️', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#47B7D4' },
  { id: 'youtube', name: 'YouTube Automation', icon: '🎬', minYield: 300, maxYield: 8000, defaultYield: 1000, color: '#2D3748' },
  { id: 'rankandrent', name: 'Rank & Rent Sites', icon: '🏠', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#3B153E' },
  { id: 'digitalproducts', name: 'Digital Products', icon: '📦', minYield: 100, maxYield: 3000, defaultYield: 500, color: '#F18B25' },
];

function computeResult(formData, assets, multiplier) {
  const { currentAge, retireAge, currentSavings, monthlyContribution, annualReturn, desiredIncome, socialSecurity, swr } = formData;
  const yearsToRetire = Math.max(retireAge - currentAge, 1);
  const rate = annualReturn / 100;
  const needFromPortfolio = Math.max(0, desiredIncome - socialSecurity);
  const targetNestEgg = swr > 0 ? needFromPortfolio / (swr / 100) : 0;
  const futureSavings = currentSavings * Math.pow(1 + rate, yearsToRetire);
  const m = rate / 12;
  const periods = yearsToRetire * 12;
  const futureContributions = m === 0 ? monthlyContribution * periods : monthlyContribution * ((Math.pow(1 + m, periods) - 1) / m);
  const totalAtRetirement = futureSavings + futureContributions;
  const gap = Math.max(0, targetNestEgg - totalAtRetirement);
  const divisor = (Math.pow(1 + rate / 12, yearsToRetire * 12) - 1) / (rate / 12);
  const monthlyNeededToClose = gap > 0 && divisor > 0 ? gap / divisor : 0;
  const totalMonthlyIncome = Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0);
  const liquidationValue = totalMonthlyIncome * multiplier;
  const traditional12m = 12000;
  const traditional24m = 24000;
  const digital12m = (totalMonthlyIncome * 12) + (totalMonthlyIncome * multiplier * 0.5);
  const digital24m = (totalMonthlyIncome * 24) + liquidationValue;
  const isOnTrack = gap === 0;
  const gapPercent = targetNestEgg > 0 ? Math.round((gap / targetNestEgg) * 100) : 0;
  return { needFromPortfolio, targetNestEgg, totalAtRetirement, gap, monthlyNeededToClose, yearsToRetire, traditional12m, traditional24m, digital12m, digital24m, isOnTrack, gapPercent, totalMonthlyIncome, liquidationValue };
}

export default function RetirementGapCalculator() {
  const calculatorRef = useRef(null);
  const [formData, setFormData] = useState({ currentAge: 52, retireAge: 67, currentSavings: 120000, monthlyContribution: 600, annualReturn: 6, desiredIncome: 55000, socialSecurity: 24000, swr: 4 });
  const [assets, setAssets] = useState({ templates: { qty: 2, yield: 500 }, newsletters: { qty: 1, yield: 1500 }, youtube: { qty: 0, yield: 1000 }, rankandrent: { qty: 0, yield: 1500 }, digitalproducts: { qty: 1, yield: 500 } });
  const [multiplier, setMultiplier] = useState(35);
  const [agentResult, setAgentResult] = useState(null);
  const [agentLoading, setAgentLoading] = useState(false);

  const result = computeResult(formData, assets, multiplier);
  const handleChange = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));
  const handleAssetChange = (id, field, value) => setAssets((prev) => ({ ...prev, [id]: { ...prev[id], [field]: Number(value) } }));
  const handleMultiplier = (value) => setMultiplier(Number(value));

  useEffect(() => {
    if (calculatorRef.current) calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const askAgent = async () => {
    setAgentLoading(true);
    setAgentResult(null);
    try {
      const response = await callAgent('wealth', { context: 'retirement-gap', formData, assets, result });
      setAgentResult(response.data || response);
    } catch (err) {
      setAgentResult('Agent unavailable right now.');
    } finally {
      setAgentLoading(false);
    }
  };

  return (
    <>
      <FadeInSection>
        <section className="page-hero">
          <span className="label label--blue">Retirement Gap Calculator</span>
          <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>How Big Is Your Retirement Gap?</h1>
          <p className="hero__tagline">Gen X women retire with less than men. Calculate your gap and see how faceless digital assets can close it — in years, not decades.</p>
          <div className="action-row"><a href="#gap-calculator" className="btn btn--primary dd-button dd-button--primary">Calculate My Gap →</a></div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="gap-calculator" ref={calculatorRef}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ ...brutalCard, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <span className="label label--orange" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Start Here</span>
              <h2 style={{ ...brutalHeading, fontSize: 'clamp(1.2rem, 2.4vw, 1.5rem)', margin: '0.5rem 0' }}>Your Retirement Gap Isn&rsquo;t a Judgment &mdash; It&rsquo;s a Starting Point.</h2>
              <p style={{ color: '#5F5F5F', lineHeight: 1.7 }}>This page isn&rsquo;t about judgment. It&rsquo;s about clarity — and clarity is power.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <span className="label label--blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>01 / Your Numbers</span>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <label className="form-label">{key}</label>
                      <input className="form-input dd-input" type="number" value={value} onChange={(e) => handleChange(key, Number(e.target.value))} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...brutalCard, padding: '1.25rem', background: '#FFFAF5' }}>
                <span className="label label--orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Live Results</span>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#5F5F5F', textTransform: 'uppercase' }}>Retirement Gap</div>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: result.isOnTrack ? '#16A34A' : '#111111' }}>{result.isOnTrack ? '✓ ON TRACK' : fmt(result.gap)}</div>
                  <div style={{ fontSize: '0.9rem', color: '#5F5F5F' }}>{result.isOnTrack ? 'You have enough to retire!' : `Shortfall by age ${formData.retireAge}`}</div>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span>Target Nest Egg</span>
                    <strong>{fmt(result.targetNestEgg)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span>Projected at Retirement</span>
                    <strong>{fmt(result.totalAtRetirement)}</strong>
                  </div>
                </div>
                {!result.isOnTrack && (
                  <div style={{ marginTop: '1rem', ...brutalCard, padding: '1rem', borderLeft: '4px solid #F18B25' }}>
                    <strong>To Close the Gap:</strong>
                    <div style={{ color: '#5F5F5F', lineHeight: 1.6 }}>You need <strong>{fmt(result.monthlyNeededToClose)}/mo</strong> more in contributions, OR build digital assets generating <strong>{fmt(result.monthlyNeededToClose * 12)}/year</strong> in passive income.</div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <span className="label label--blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>24-Month Comparison</span>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span>Traditional Savings</span>
                    <strong>{fmt(result.traditional24m)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.5rem' }}>
                    <span>Digital Assets (Projected)</span>
                    <strong style={{ color: '#47B7D4' }}>{fmt(result.digital24m)}</strong>
                  </div>
                </div>
              </div>
              <div style={{ ...brutalCard, padding: '1.25rem' }}>
                <span className="label label--orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Next Steps</span>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <a href="/quiz?start=true" className="btn btn--primary dd-button dd-button--primary">Take the Digital Superpower Quiz →</a>
                  <a href="/tools/scorecard" className="btn btn--outline dd-button dd-button--outline">Score a Niche Idea →</a>
                  <button type="button" className="btn btn--outline dd-button dd-button--outline" disabled={agentLoading} onClick={askAgent}>{agentLoading ? 'Asking agent…' : 'Ask Hermes for a gap plan'}</button>
                </div>
                {agentResult && <div style={{ marginTop: '1rem', ...brutalCard, padding: '1rem' }}>{typeof agentResult === 'string' ? agentResult : JSON.stringify(agentResult, null, 2)}</div>}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
