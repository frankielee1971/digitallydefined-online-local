import React, { useState } from 'react';
import SiteLayout from '../../components/Layout/SiteLayout';

// === Retirement Gap Calculator ===
// Gen X Retirement Gap Solver — faceless digital real estate path

const fmt = (n) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n.toLocaleString()}`;
};

// Future Value of Lump Sum
const fvLump = (principal, rate, years) => principal * Math.pow(1 + rate, years);

// Future Value of Monthly Series
const fvSeries = (monthly, annualRate, years) => {
  const m = annualRate / 12;
  const periods = years * 12;
  if (m === 0) return monthly * periods;
  return monthly * ((Math.pow(1 + m, periods) - 1) / m);
};

const ASSET_TYPES = [
  { id: 'templates', name: 'Template Hubs & Printables', icon: '📋', minYield: 50, maxYield: 2000, defaultYield: 500, color: '#F18B25' },
  { id: 'newsletters', name: 'Paid Newsletters', icon: '✉️', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#4db6d1' },
  { id: 'youtube', name: 'YouTube Automation', icon: '🎬', minYield: 300, maxYield: 8000, defaultYield: 1000, color: '#2D3748' },
  { id: 'rankandrent', name: 'Rank & Rent Sites', icon: '🏠', minYield: 500, maxYield: 5000, defaultYield: 1500, color: '#3B153E' },
  { id: 'digitalproducts', name: 'Digital Products', icon: '📦', minYield: 100, maxYield: 3000, defaultYield: 500, color: '#F18B25' },
];

export default function RetirementGapCalculator() {
  const [formData, setFormData] = useState({
    currentAge: 52,
    retireAge: 67,
    retireYears: 25,
    currentSavings: 120000,
    monthlyContribution: 600,
    annualReturn: 6,
    desiredIncome: 55000,
    socialSecurity: 24000,
    swr: 4,
  });

  const [assets, setAssets] = useState({
    templates: { qty: 2, yield: 500 },
    newsletters: { qty: 1, yield: 1500 },
    youtube: { qty: 0, yield: 1000 },
    rankandrent: { qty: 0, yield: 1500 },
    digitalproducts: { qty: 1, yield: 500 },
  });

  const [multiplier, setMultiplier] = useState(35);
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleAssetChange = (id, field, value) => {
    setAssets(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: Number(value) }
    }));
  };

  const calculate = () => {
    const {
      currentAge, retireAge, retireYears,
      currentSavings, monthlyContribution, annualReturn,
      desiredIncome, socialSecurity, swr
    } = formData;

    const yearsToRetire = retireAge - currentAge;
    const rate = annualReturn / 100;

    // Calculate nest egg needed
    const needFromPortfolio = Math.max(0, desiredIncome - socialSecurity);
    const targetNestEgg = swr > 0 ? needFromPortfolio / (swr / 100) : 0;

    // Calculate future value of current savings
    const futureSavings = fvLump(currentSavings, rate, yearsToRetire);
    const futureContributions = fvSeries(monthlyContribution, rate, yearsToRetire);
    const totalAtRetirement = futureSavings + futureContributions;

    // Calculate gap
    const gap = Math.max(0, targetNestEgg - totalAtRetirement);
    const monthlyNeededToClose = gap > 0
      ? (gap / (((Math.pow(1 + rate / 12, yearsToRetire * 12) - 1) / (rate / 12)) || 1))
      : 0;

    // Calculate digital asset income
    const totalMonthlyIncome = Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0);
    const liquidationValue = totalMonthlyIncome * multiplier;

    // 24-month projections
    const traditional12m = 12000; // ~$1k/mo savings
    const traditional24m = 24000;
    const digital12m = (totalMonthlyIncome * 12) + (totalMonthlyIncome * multiplier * 0.5);
    const digital24m = (totalMonthlyIncome * 24) + liquidationValue;

    const isOnTrack = gap === 0;
    const gapPercent = targetNestEgg > 0 ? Math.round((gap / targetNestEgg) * 100) : 0;

    setResult({
      needFromPortfolio,
      targetNestEgg,
      totalAtRetirement,
      gap,
      monthlyNeededToClose,
      yearsToRetire,
      traditional12m,
      traditional24m,
      digital12m,
      digital24m,
      isOnTrack,
      gapPercent,
      totalMonthlyIncome,
      liquidationValue,
    });
    setShowResults(true);
  };

  return (
    <SiteLayout mentorTopic="retirement-gap">
      {/* Hero */}
      <section className="page-hero">
        <div className="container container--narrow">
          <p className="section__eyebrow">Retirement Gap Calculator</p>
          <h1 style={{ marginBottom: '1rem' }}>
            How Big Is Your Retirement Gap?
          </h1>
          <p className="hero__tagline" style={{ fontSize: '1.15rem' }}>
            Gen X women retire with 35% less than men. Calculate your gap and see how faceless digital assets close it — in years, not decades.
          </p>
          <div className="action-row"><a href="#gap-calculator" className="btn btn--primary">Calculate My Gap →</a></div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section" id="gap-calculator">
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left: Inputs */}
            <div>
              <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Your Retirement Picture</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Current Age</label>
                    <input type="number" value={formData.currentAge} onChange={e => handleChange('currentAge', e.target.value)} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Retirement Age</label>
                    <input type="number" value={formData.retireAge} onChange={e => handleChange('retireAge', e.target.value)} className="form-input" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Current Savings</label>
                    <input type="number" value={formData.currentSavings} onChange={e => handleChange('currentSavings', e.target.value)} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Monthly Contribution</label>
                    <input type="number" value={formData.monthlyContribution} onChange={e => handleChange('monthlyContribution', e.target.value)} className="form-input" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label className="form-label">Expected Annual Return (%)</label>
                    <input type="number" step="0.1" value={formData.annualReturn} onChange={e => handleChange('annualReturn', e.target.value)} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Social Security/Other Yearly</label>
                    <input type="number" value={formData.socialSecurity} onChange={e => handleChange('socialSecurity', e.target.value)} className="form-input" />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label">Desired Annual Retirement Income</label>
                  <input type="number" value={formData.desiredIncome} onChange={e => handleChange('desiredIncome', e.target.value)} className="form-input" />
                </div>

                <p style={{ fontSize: '0.85rem', color: '#7A7A7A', marginBottom: '1.5rem' }}>
                  The 4% Safe Withdrawal Rate is standard. Adjust if needed.
                </p>

                <button onClick={calculate} className="btn btn--primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1.1rem' }}>
                  Calculate My Gap →
                </button>
              </div>

              {/* Digital Asset Portfolio */}
              <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Your Digital Asset Portfolio</h3>
                
                {ASSET_TYPES.map(asset => (
                  <div key={asset.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: asset.id !== 'digitalproducts' ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{asset.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{asset.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#7A7A7A' }}>Qty:</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={assets[asset.id].qty}
                          onChange={e => handleAssetChange(asset.id, 'qty', e.target.value)}
                          style={{ width: '3rem', textAlign: 'center', padding: '0.4rem', border: '2px solid #000', borderRadius: 0, fontWeight: 700 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                        <span>Monthly yield per asset</span>
                        <span style={{ fontWeight: 700, color: asset.color }}>{fmt(assets[asset.id].yield)}/mo</span>
                      </div>
                      <input
                        type="range"
                        min={asset.minYield}
                        max={asset.maxYield}
                        step={Math.ceil((asset.maxYield - asset.minYield) / 20)}
                        value={assets[asset.id].yield}
                        onChange={e => handleAssetChange(asset.id, 'yield', e.target.value)}
                        style={{ accentColor: asset.color, width: '100%' }}
                      />
                    </div>
                  </div>
                ))}

                <div className="retirement-summary" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Total Monthly Income</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '1.8rem' }}>
                      {fmt(Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7 }}>Exit Value</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-blue)' }}>
                      {fmt(Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0) * multiplier)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Exit Multiplier */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Exit Strategy Multiplier</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="form-label" style={{ marginBottom: 0 }}>Market Multiple</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '1.5rem' }}>{multiplier}x</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="40"
                  step="1"
                  value={multiplier}
                  onChange={e => setMultiplier(Number(e.target.value))}
                  style={{ accentColor: '#2D3748', width: '100%' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#7A7A7A' }}>
                  <span>30x (Conservative)</span>
                  <span>40x (Premium)</span>
                </div>
              </div>
            </div>

            {/* Right: Results */}
            <div>
              {showResults && result && (
                <>
                  <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: result.isOnTrack ? '#F0F9FF' : '#FFF5F5' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Your Retirement Gap</h3>
                    
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '3rem', color: result.isOnTrack ? '#047857' : '#C20F0A' }}>
                        {result.isOnTrack ? '✓ ON TRACK' : fmt(result.gap)}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#5A5A5A' }}>
                        {result.isOnTrack ? 'You have enough to retire!' : `Shortfall by age ${formData.retireAge}`}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                      <div style={{ padding: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ color: '#7A7A7A', fontSize: '0.8rem' }}>Target Nest Egg</div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{fmt(result.targetNestEgg)}</div>
                      </div>
                      <div style={{ padding: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
                        <div style={{ color: '#7A7A7A', fontSize: '0.8rem' }}>Projected at Retirement</div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{fmt(result.totalAtRetirement)}</div>
                      </div>
                    </div>

                    {!result.isOnTrack && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#fff', border: '2px solid #C20F0A' }}>
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>To Close the Gap:</div>
                        <div style={{ fontSize: '0.95rem' }}>
                          You need <strong>{fmt(result.monthlyNeededToClose)}/mo</strong> more in contributions, OR
                          <br />
                          Build digital assets generating <strong>{fmt(result.monthlyNeededToClose * 12)}/year</strong> in passive income.
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>24-Month Comparison</h3>
                    
                    <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem', color: '#7A7A7A' }}>Traditional Savings</span>
                        <span style={{ fontWeight: 700, color: '#C20F0A' }}>{fmt(result.traditional24m)}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>~$1k/mo saved over 2 years</div>
                    </div>

                    <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(77, 182, 209, .1)', border: '2px solid var(--color-blue)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.85rem' }}>Digital Assets (Projected)</span>
                        <span style={{ fontWeight: 700, color: 'var(--color-blue)' }}>{fmt(result.digital24m)}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#7A7A7A' }}>With exit multiplier + cashflow</div>
                    </div>

                    {!result.isOnTrack && (
                      <div style={{ padding: '1rem', background: '#FFFCF9', border: '2px solid #F18B25' }}>
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Digital Assets Win By:</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: '2rem', color: '#F18B25' }}>
                          {fmt(result.digital24m - result.traditional24m)}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#5A5A5A' }}>
                          That's {(result.digital24m / result.traditional24m).toFixed(0)}x more in 2 years.
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>What's Your Next Step?</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <a href="/quiz" className="btn btn--primary" style={{ width: '100%' }}>
                        Take the Digital Superpower Quiz →
                      </a>
                      <a href="/scorecard" className="btn btn--outline" style={{ width: '100%' }}>
                        Score a Niche Idea →
                      </a>
                      <a href="/tools" className="btn btn--outline" style={{ width: '100%' }}>
                        Explore the Free Tools →
                      </a>
                    </div>
                  </div>
                </>
              )}

              {!showResults && (
                <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Enter Your Numbers</h3>
                  <p style={{ fontSize: '0.95rem', color: '#5A5A5A', marginBottom: '1rem' }}>
                    Fill in your retirement details on the left to see your gap and how digital assets can close it.
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#9CA3AF' }}>
                    Your calculations stay in your browser. No data is stored or shared.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', marginBottom: '1rem' }}>Your Gap Is Real. Your Solution Is Too.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 2rem' }}>
            The retirement gap affects every Gen X woman. But digital assets are the great equalizer — faceless, automated, and built on your expertise.
          </p>
          <a href="/start-here" className="btn btn--primary" style={{ fontSize: '1.1rem', padding: '1.1rem 2.5rem' }}>
            Start the Build Path →
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
