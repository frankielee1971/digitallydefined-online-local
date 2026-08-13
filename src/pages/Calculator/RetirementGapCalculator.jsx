import React, { useState, useEffect, useRef } from 'react';
import { useToolState } from '../../context/ToolStateContext.jsx';
import './RetirementGapCalculator.css';

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
  const calculatorRef = useRef(null);
  const { updateToolState } = useToolState();

  // Auto-scroll to calculator on mount
  useEffect(() => {
    if (calculatorRef.current) {
      calculatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Reset toolState when component mounts/unmounts
  useEffect(() => {
    updateToolState({ hasCalculated: false });
    return () => updateToolState({ hasCalculated: false });
  }, []);

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

    // Publish results to Hermes
    updateToolState({
      hasCalculated: true,
      gapAmount: Math.round(
        (gap / ((formData.retireAge - formData.currentAge) * 12)) || 0
      ),
      desiredIncome: Math.round(formData.desiredIncome / 12),
      currentSavings: formData.currentSavings,
      yearsToRetirement: formData.retireAge - formData.currentAge,
      totalMonthlyIncome: totalMonthlyIncome,
      monthlyNeededToClose: Math.round(monthlyNeededToClose),
    });
  };

  return (
    <>
      <main className="gap-page">
        {/* Hero */}
        <section className="gap-hero">
          <div className="gap-hero__inner">
            <p className="section__eyebrow">Retirement Gap Calculator</p>
            <h1>How Big Is Your Retirement Gap?</h1>
            <p className="hero__tagline">
              Gen X women retire with 35% less than men. Calculate your gap and see how faceless digital assets close it — in years, not decades.
            </p>
            <div className="action-row"><a href="#gap-calculator" className="btn btn--primary">Calculate My Gap →</a></div>
          </div>
        </section>

        {/* Calculator */}
        <section className="gap-workspace" id="gap-calculator" ref={calculatorRef}>
          <div className="gap-calc-header">
            <span className="gap-calc-header__eyebrow">Retirement Gap Calculator</span>
            <h2 className="gap-calc-header__title">📊 Enter Your Numbers</h2>
            <p className="gap-calc-header__sub">Fill in your details below to calculate your retirement gap and see how digital assets close it.</p>
          </div>
          <div className="gap-grid">
            {/* Left column: inputs */}
            <div className="gap-inputs">
              <div className="gap-inputs-grid">
                {/* Retirement Picture */}
                <article className="gap-card">
                  <header className="gap-card__heading">
                    <h2>Your Retirement Picture</h2>
                    <p>Enter your current financial situation to calculate your gap.</p>
                  </header>
                  
                  <div className="gap-form-grid">
                    <div>
                      <label className="form-label">Current Age</label>
                      <input type="number" value={formData.currentAge} onChange={e => handleChange('currentAge', e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Retirement Age</label>
                      <input type="number" value={formData.retireAge} onChange={e => handleChange('retireAge', e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div className="gap-form-grid">
                    <div>
                      <label className="form-label">Current Savings</label>
                      <input type="number" value={formData.currentSavings} onChange={e => handleChange('currentSavings', e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Monthly Contribution</label>
                      <input type="number" value={formData.monthlyContribution} onChange={e => handleChange('monthlyContribution', e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div className="gap-form-grid">
                    <div>
                      <label className="form-label">Expected Annual Return (%)</label>
                      <input type="number" step="0.1" value={formData.annualReturn} onChange={e => handleChange('annualReturn', e.target.value)} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Social Security/Other Yearly</label>
                      <input type="number" value={formData.socialSecurity} onChange={e => handleChange('socialSecurity', e.target.value)} className="form-input" />
                    </div>
                  </div>

                  <div className="gap-form-full">
                    <label className="form-label">Desired Annual Retirement Income</label>
                    <input type="number" value={formData.desiredIncome} onChange={e => handleChange('desiredIncome', e.target.value)} className="form-input" />
                  </div>

                  <p className="gap-note">
                    The 4% Safe Withdrawal Rate is standard. Adjust if needed.
                  </p>

                  <button onClick={calculate} className="btn btn--primary gap-calculate-btn">
                    Calculate My Gap →
                  </button>
                </article>

                {/* Digital Asset Portfolio */}
                <article className="gap-card">
                  <header className="gap-card__heading">
                    <h2 className="gap-section-title">Your Digital Asset Portfolio</h2>
                    <p>Adjust the number and expected yield of your faceless digital assets.</p>
                  </header>
                  
                  <div className="gap-assets">
                    {ASSET_TYPES.map(asset => (
                      <div key={asset.id} className="gap-asset">
                        <div className="gap-asset__top">
                          <div className="gap-asset__name">
                            <span className="gap-asset-icon">{asset.icon}</span>
                            <strong>{asset.name}</strong>
                          </div>
                          <label>
                            Qty:
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={assets[asset.id].qty}
                              onChange={e => handleAssetChange(asset.id, 'qty', e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="gap-asset-control">
                          <span>Monthly yield per asset</span>
                          <output className={`text-${asset.id === 'newsletters' ? 'blue' : asset.id === 'youtube' ? 'slate' : 'orange'}`}>
                            {fmt(assets[asset.id].yield)}/mo
                          </output>
                        </div>
                        <input
                          type="range"
                          className={`range-${asset.id === 'newsletters' ? 'blue' : asset.id === 'youtube' ? 'slate' : 'orange'}`}
                          min={asset.minYield}
                          max={asset.maxYield}
                          step={Math.ceil((asset.maxYield - asset.minYield) / 20)}
                          value={assets[asset.id].yield}
                          onChange={e => handleAssetChange(asset.id, 'yield', e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="gap-total">
                    <div>
                      <span>Total Monthly Income</span>
                      <strong>{fmt(Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0))}</strong>
                    </div>
                    <div>
                      <span>Exit Value</span>
                      <strong>{fmt(Object.values(assets).reduce((sum, a) => sum + (a.qty * a.yield), 0) * multiplier)}</strong>
                    </div>
                  </div>
                </article>
              </div>
              {/* Exit Multiplier - full width below the two-column grid */}
              <article className="gap-card">
                <header className="gap-card__heading">
                  <h2>Exit Strategy Multiplier</h2>
                  <p>Profitable digital assets can be valued at a multiple of monthly net profit.</p>
                </header>
                <div className="gap-control">
                  <div className="gap-control__label">
                    <label htmlFor="market-multiplier">Market Multiplier</label>
                    <output>{multiplier}x</output>
                  </div>
                  <input
                    id="market-multiplier"
                    className="range-slate"
                    type="range"
                    min="30"
                    max="40"
                    step="1"
                    value={multiplier}
                    onChange={e => setMultiplier(Number(e.target.value))}
                  />
                </div>
                <div className="freedom-range-labels">
                  <span>30x (Conservative)</span>
                  <span>40x (Premium)</span>
                </div>
              </article>
            </div>

            {/* Right: Results */}
            <aside className="gap-results">
              {showResults && result && (
                <>
                  <article className={`gap-card gap-result-card ${result.isOnTrack ? 'gap-result-card--ontrack' : 'gap-result-card--gap'}`}>
                    <h3 className="gap-result-title">Your Retirement Gap</h3>
                    
                    <div className="gap-result-value">
                      <div className={`gap-value ${result.isOnTrack ? 'ontrack' : 'gap'}`}>
                        {result.isOnTrack ? '✓ ON TRACK' : fmt(result.gap)}
                      </div>
                      <div className="gap-label">
                        {result.isOnTrack ? 'You have enough to retire!' : `Shortfall by age ${formData.retireAge}`}
                      </div>
                    </div>

                    <div className="gap-result-grid">
                      <div className="gap-result-item">
                        <label>Target Nest Egg</label>
                        <div className="value">{fmt(result.targetNestEgg)}</div>
                      </div>
                      <div className="gap-result-item">
                        <label>Projected at Retirement</label>
                        <div className="value">{fmt(result.totalAtRetirement)}</div>
                      </div>
                    </div>

                    {!result.isOnTrack && (
                      <div className="gap-close-message">
                        <strong>To Close the Gap:</strong>
                        <div className="gap-close-message-content">
                          You need <strong>{fmt(result.monthlyNeededToClose)}/mo</strong> more in contributions, OR
                          <br />
                          Build digital assets generating <strong>{fmt(result.monthlyNeededToClose * 12)}/year</strong> in passive income.
                        </div>
                      </div>
                    )}
                  </article>

                  <article className="gap-card gap-comparison">
                    <h3 className="gap-result-title">24-Month Comparison</h3>
                    
                    <div className="gap-comparison-item">
                      <div className="gap-comparison-header">
                        <span className="label">Traditional Savings</span>
                        <span className="value">{fmt(result.traditional24m)}</span>
                      </div>
                      <div className="gap-comparison-note">~$1k/mo saved over 2 years</div>
                    </div>

                    <div className="gap-comparison-item highlight">
                      <div className="gap-comparison-header">
                        <span className="label">Digital Assets (Projected)</span>
                        <span className="value highlight">{fmt(result.digital24m)}</span>
                      </div>
                      <div className="gap-comparison-note">With exit multiplier + cashflow</div>
                    </div>

                    {!result.isOnTrack && (
                      <div className="gap-win-message">
                        <strong>Digital Assets Win By:</strong>
                        <div className="gap-win-amount">
                          {fmt(result.digital24m - result.traditional24m)}
                        </div>
                        <div className="gap-win-note">
                          That's {(result.digital24m / result.traditional24m).toFixed(0)}x more in 2 years.
                        </div>
                      </div>
                    )}
                  </article>

                  {/* CTA */}
                  <article className="gap-card">
                    <h3 className="gap-result-title">What's Your Next Step?</h3>
                    <div className="gap-cta-stack">
                      <a href="/quiz" className="btn btn--primary">
                        Take the Digital Superpower Quiz →
                      </a>
                      <a href="/scorecard" className="btn btn--outline">
                        Score a Niche Idea →
                      </a>
                      <a href="/tools" className="btn btn--outline">
                        Explore the Free Tools →
                      </a>
                    </div>
                  </article>
                </>
              )}

              {!showResults && (
                <article className="gap-card gap-placeholder">
                  <div className="gap-placeholder-icon">📊</div>
                  <h3 className="gap-result-title">Results Will Appear Here</h3>
                  <p className="gap-placeholder-text">
                    Fill in your retirement details on the left and click Calculate to see your gap.
                  </p>
                  <p className="gap-privacy">
                    Your calculations stay in your browser. No data is stored or shared.
                  </p>
                </article>
              )}
            </aside>
          </div>
        </section>

        {/* CTA */}
        <section className="section section--dark gap-final-cta">
          <div className="container container--narrow">
            <h2>Your Gap Is Real. Your Solution Is Too.</h2>
            <p>
              The retirement gap affects every Gen X woman. But digital assets are the great equalizer — faceless, automated, and built on your expertise.
            </p>
            <a href="/gap" className="btn btn--primary">
              Start the Build Path →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
