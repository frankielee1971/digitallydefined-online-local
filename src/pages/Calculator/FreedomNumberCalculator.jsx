import React, { useState, useEffect } from 'react';
import { useToolState } from '../../context/ToolStateContext.jsx';
import {
  CheckSquare, Crown, Lightbulb, Mail,
  ShieldAlert, TrendingDown, Video, MessageCircle,
} from 'lucide-react';
import SmartTooltip from '../../components/ui/SmartTooltip.jsx';
import NextStepRecommendation from '../../components/ui/NextStepRecommendation.jsx';
import { useHermesIntervention } from '../../hooks/useHermesIntervention.js';
import { PuterSaveButton } from '../../components/Puter/PuterAuth.jsx';
import './FreedomNumberCalculator.css';

const money = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(value);

const ASSETS = [
  { id: 'templates', name: 'Template Hubs / Printables', range: '$50 - $2,000/mo', min: 50, max: 2000, step: 50, tone: 'orange', icon: 'T' },
  { id: 'newsletters', name: 'Paid Newsletters (Mid-Tier)', range: '$2,000 - $10,000/mo', min: 2000, max: 10000, step: 250, tone: 'blue', icon: Mail },
  { id: 'youtube', name: 'YouTube Automation', range: '$500 - $10,000/mo', min: 500, max: 10000, step: 250, tone: 'slate', icon: Video },
];

export default function FreedomNumberCalculator() {
  const { updateToolState } = useToolState();
  const [freedomGoal, setFreedomGoal] = useState(5000);
  const [multiplier, setMultiplier] = useState(35);
  const [assets, setAssets] = useState({
    templates: { qty: 2, yield: 1000 },
    newsletters: { qty: 1, yield: 4500 },
    youtube: { qty: 0, yield: 3000 },
  });
  const [showResults, setShowResults] = useState(false);
  
  // Hermes intervention hook
  const { 
    intervention, 
    dismissIntervention, 
    trackInput,
    resetIntervention 
  } = useHermesIntervention({ enabled: true });
  
  // Track input changes for frustration detection
  useEffect(() => {
    if (showResults) {
      trackInput(JSON.stringify(assets), { context: 'freedom_calculator' });
    }
  }, [assets, showResults, trackInput]);
  
  // Reset intervention when remounting
  useEffect(() => {
    return () => resetIntervention();
  }, [resetIntervention]);

  const updateAsset = (id, field, value) => {
    setAssets((current) => ({
      ...current,
      [id]: { ...current[id], [field]: Number(value) },
    }));
  };

  const totalMonthlyIncome = Object.values(assets)
    .reduce((total, asset) => total + asset.qty * asset.yield, 0);
  const liquidationValue = totalMonthlyIncome * multiplier;
  const gap = Math.max(freedomGoal - totalMonthlyIncome, 0);
  const goalMet = totalMonthlyIncome >= freedomGoal;
  const digital12m = totalMonthlyIncome * 12 * 0.55 + totalMonthlyIncome * multiplier * 0.8;
  const digital24m = totalMonthlyIncome * 24 * 0.8 + liquidationValue;
  const chartMax = Math.max(24000, digital12m, digital24m);
  const barHeight = (value) => `${Math.max(4, (value / chartMax) * 100)}%`;

  useEffect(() => {
    const assetCount = Object.values(assets).reduce((n, a) => n + a.qty, 0);

    updateToolState({
      monthlyGoal: freedomGoal,
      totalMonthlyIncome,
      assetCount,
      yieldPerAsset:
        assetCount > 0 ? Math.round(totalMonthlyIncome / assetCount) : 0,
      hasCalculated: totalMonthlyIncome > 0,
      goalMet,
      gap,
    });
  }, [totalMonthlyIncome, freedomGoal, gap, goalMet, assets]);

  return (
    <>
      <main className="freedom-page">
        <section className="freedom-hero">
          <div className="freedom-hero__inner">
            <span className="freedom-kicker">Close The Retirement Gap</span>
            <h1>Calculate Your <span>Freedom Number</span></h1>
            <p>
              Discover how faceless digital real estate can help Gen X women build
              predictable income, close the retirement gap, and create assets their
              families can inherit.
            </p>
            <a className="freedom-button freedom-button--orange" href="#calculator-section" onClick={(e) => {
              e.preventDefault();
              document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>Calculate My Freedom Number →</a>
          </div>
        </section>

        <section className="freedom-workspace" id="calculator-section">
          <div className="freedom-grid">
            <div className="freedom-stack">
              <article className="freedom-card">
                <header className="freedom-card__heading">
                  <span className="freedom-step freedom-step--orange">01</span>
                  <div>
                    <h2>Your Freedom Target</h2>
                    <p>What monthly cash flow would replace your salary and create breathing room?</p>
                  </div>
                </header>
                <div className="freedom-control">
                  <div className="freedom-control__label">
                    <label htmlFor="freedom-goal">Monthly Freedom Goal</label>
                    <output>{money(freedomGoal)}</output>
                  </div>
                  <input id="freedom-goal" type="range" min="2000" max="25000" step="500" value={freedomGoal} onChange={(event) => setFreedomGoal(Number(event.target.value))} />
                </div>
              </article>

              <article className="freedom-card">
                <header className="freedom-card__heading">
                  <span className="freedom-step freedom-step--blue">02</span>
                  <div>
                    <h2>Your Digital Real Estate Mix</h2>
                    <p>Adjust the number of faceless assets and their expected monthly yield.</p>
                  </div>
                </header>

                <div className="freedom-insight">
                  <span><Lightbulb size={15} /></span>
                  <div>
                    <strong>The 10X ROI Rule</strong>
                    <p>A useful digital asset creates substantially more value for its customer than it costs to access, making the asset easier to retain and grow.</p>
                  </div>
                </div>

                <div className="freedom-assets">
                  {ASSETS.map((asset) => {
                    const Icon = asset.icon;
                    return (
                      <div className="freedom-asset" key={asset.id}>
                        <div className="freedom-asset__top">
                          <div className="freedom-asset__name">
                            <span className={`freedom-icon freedom-icon--${asset.tone}`}>
                              {typeof Icon === 'string' ? Icon : <Icon size={14} />}
                            </span>
                            <strong>{asset.name}</strong>
                          </div>
                          <label>
                            Qty:
                            <input type="number" min="0" max="10" value={assets[asset.id].qty} onChange={(event) => updateAsset(asset.id, 'qty', event.target.value)} />
                          </label>
                        </div>
                        <div className="freedom-control__label freedom-control__label--small">
                          <span>Average Yield (Range: {asset.range})</span>
                          <output className={`text-${asset.tone}`}>{money(assets[asset.id].yield)}/mo</output>
                        </div>
                        <input className={`range-${asset.tone}`} type="range" min={asset.min} max={asset.max} step={asset.step} value={assets[asset.id].yield} onChange={(event) => updateAsset(asset.id, 'yield', event.target.value)} />
                      </div>
                    );
                  })}
                </div>

                <div className="freedom-total">
                  <div><span>Projected Portfolio Income</span><strong>{money(totalMonthlyIncome)}</strong></div>
                  <div>
                    <span>Goal Status</span>
                    <strong className={goalMet ? 'status-met' : 'status-gap'}>
                      {goalMet ? <><CheckSquare size={15} /> Goal Achieved</> : `Gap: ${money(gap)}/mo`}
                    </strong>
                  </div>
                </div>
              </article>

              <article className="freedom-card">
                <header className="freedom-card__heading">
                  <span className="freedom-step freedom-step--black">03</span>
                  <div>
                    <h2>The Capital Gains Multiplier</h2>
                    <p>Profitable digital assets can be valued at a multiple of monthly net profit.</p>
                  </div>
                </header>
                <div className="freedom-control">
                  <div className="freedom-control__label">
                    <label htmlFor="market-multiplier">Market Multiplier</label>
                    <output className="text-slate">{multiplier}x</output>
                  </div>
                  <input id="market-multiplier" className="range-slate" type="range" min="30" max="40" step="1" value={multiplier} onChange={(event) => setMultiplier(Number(event.target.value))} />
                </div>
                <div className="freedom-liquidation">
                  <span>Estimated Portfolio Liquidation Value</span>
                  <strong>{money(liquidationValue)}</strong>
                </div>
                <div className="freedom-warning">
                  <span><ShieldAlert size={18} /></span>
                  <div>
                    <strong>Protect Your Sovereignty</strong>
                    <p>Catalog ownership, logins, income, and transfer instructions in your Digital Inheritance Vault.</p>
                  </div>
                </div>
              </article>
            </div>

            <aside className="freedom-comparison">
              <article className="freedom-card">
                <header className="freedom-card__heading freedom-card__heading--bordered">
                  <span className="freedom-step freedom-step--blue">04</span>
                  <div>
                    <h2>The ROI Contrast</h2>
                    <p>A 24-month comparison of traditional saving and digital asset ownership.</p>
                  </div>
                </header>

                <div className="freedom-chart" aria-label="24-month projection bar chart">
                  <div className="freedom-chart__plot">
                    <div className="freedom-chart__group">
                      <div className="freedom-chart__bar freedom-chart__bar--red" style={{ height: barHeight(12000) }} />
                      <div className="freedom-chart__bar freedom-chart__bar--blue" style={{ height: barHeight(digital12m) }} />
                      <span>Month 12</span>
                    </div>
                    <div className="freedom-chart__group">
                      <div className="freedom-chart__bar freedom-chart__bar--red" style={{ height: barHeight(24000) }} />
                      <div className="freedom-chart__bar freedom-chart__bar--blue" style={{ height: barHeight(digital24m) }} />
                      <span>Month 24</span>
                    </div>
                  </div>
                  <div className="freedom-chart__legend">
                    <span><i className="legend-red" /> Traditional Savings</span>
                    <span><i className="legend-blue" /> Digital Assets</span>
                  </div>
                </div>

                <h3 className="freedom-table-title">24-Month Projection Comparison</h3>
                <div className="freedom-table-wrap">
                  <table className="freedom-table">
                    <thead><tr><th>Metric</th><th>Traditional</th><th>Digital Assets</th></tr></thead>
                    <tbody>
                      <tr><th>Strategy</th><td><TrendingDown size={13} /> Savings</td><td><Crown size={13} /> Ownership</td></tr>
                      <tr><th>12m Outlook</th><td>{money(12000)}</td><td>{money(digital12m)}</td></tr>
                      <tr><th>24m Liquidity</th><td>{money(24000)}</td><td>{money(digital24m)}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* Next Step Recommendation with Hermes integration */}
                <NextStepRecommendation 
                  toolType="freedom_number"
                  results={{
                    monthlyGoal: freedomGoal,
                    totalMonthlyIncome,
                    gap,
                    goalMet,
                    assetCount: Object.values(assets).reduce((n, a) => n + a.qty, 0),
                  }}
                  onAskHermes={(question) => {
                    window.dispatchEvent(new CustomEvent('hermes-ask', { 
                      detail: { question } 
                    }));
                  }}
                />
                
                {/* Puter Save Button - Save calculation results to cloud drive */}
                <PuterSaveButton 
                  filename={`freedom-plan-${new Date().toISOString().split('T')[0]}.md`}
                  content={`# Freedom Number Calculator Results\n\n## Your Goal\nMonthly Income Target: ${money(freedomGoal)}\nLiquidation Multiplier: ${multiplier}x\n\n## Current Asset Portfolio\n${Object.entries(assets).map(([key, asset]) => {
  const assetInfo = ASSETS.find(a => a.id === key);
  return `- **${assetInfo?.name || key}**: ${asset.qty} units × ${money(asset.yield)} = ${money(asset.qty * asset.yield)}/mo`;
}).join('\n')}\n\n## Summary\nTotal Monthly Income: ${money(totalMonthlyIncome)}\nFreedom Gap: ${gap > 0 ? money(gap) : '✅ Goal Met!'}\nLiquidation Value: ${money(liquidationValue)}\n\n## 24-Month Projection\n- Traditional Savings: ${money(24000)}\n- Digital Assets: ${money(digital24m)}\n\n${goalMet ? '🎉 Congratulations! You have reached your freedom number.' : `💡 You need ${money(gap)} more monthly income to reach your goal.`}`}
                  mimeType="text/markdown"
                  onSaveComplete={(result) => console.log('Freedom plan saved to Puter:', result)}
                />
                
                <p className="freedom-privacy">Your calculations stay in your browser and are not stored.</p>
              </article>
            </aside>
          </div>
        </section>
        
        {/* Hermes Intervention Modal */}
        {intervention && (
          <div className="hermes-intervention-overlay" onClick={dismissIntervention}>
            <div className="hermes-intervention-modal-active" onClick={(e) => e.stopPropagation()}>
              <button 
                className="hermes-intervention-modal-active__close"
                onClick={dismissIntervention}
                aria-label="Close"
              >
                ×
              </button>
              <div className="hermes-intervention-modal-active__header">
                <MessageCircle size={24} className="hermes-intervention-modal-active__icon" />
                <h3>Hermes has a suggestion</h3>
              </div>
              <p className="hermes-intervention-modal-active__message">{intervention.message}</p>
              <div className="hermes-intervention-modal-active__actions">
                <button className="btn btn--outline" onClick={dismissIntervention}>Continue exploring</button>
                <button 
                  className="btn btn--primary"
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('hermes-open-chat', { 
                      detail: { initialMessage: intervention.message } 
                    }));
                    dismissIntervention();
                  }}
                >
                  Chat with Hermes →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
