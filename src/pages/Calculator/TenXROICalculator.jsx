import React, { useMemo, useState, useEffect } from 'react';
import { useToolState } from '../../context/ToolStateContext.jsx';
import {
  BarChart3, Building2, CircleDollarSign,
  Home, Lightbulb, PhoneCall, ShieldCheck, TrendingUp,
} from 'lucide-react';
import { CalculatorCard, LabeledSlider } from '../../components/ui/CalculatorCard';
import SectionHeader from '../../components/ui/SectionHeader';
import './TenXROICalculator.css';

const fmtUSD = (n) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(n);

export default function TenXROICalculator() {
  const { updateToolState } = useToolState();
  const [inputs, setInputs] = useState({
    propertyName: 'Main Street Plumbing',
    leadTraffic: 45,
    avgJobValue: 1500,
    closeRate: 40,
    ppcCost: 65,
  });

  const result = useMemo(() => {
    const closedLeads = Math.floor(inputs.leadTraffic * (inputs.closeRate / 100));
    const grossRevenue = closedLeads * inputs.avgJobValue;
    const monthlyRent = grossRevenue / 40;
    const equityCap = grossRevenue * 0.1;
    const ppcSpend = inputs.leadTraffic * inputs.ppcCost;
    const savings = Math.max(ppcSpend - monthlyRent, 0);
    return { closedLeads, grossRevenue, monthlyRent, equityCap, ppcSpend, savings };
  }, [inputs]);

  // Sync ROI results to Hermes
  useEffect(() => {
    updateToolState({
      hasCalculated: true,
      roiClosedLeads: result.closedLeads,
      roiGrossRevenue: result.grossRevenue,
      roiMonthlyRent: result.monthlyRent,
      roiEquityCap: result.equityCap,
      roiPpcSpend: result.ppcSpend,
      roiSavings: result.savings,
    });
  }, [result]);

  const update = (key, value) => setInputs((previous) => ({ ...previous, [key]: value }));
  const comparisonMax = Math.max(result.ppcSpend, result.monthlyRent, 1);

  const sliders = [
    {
      key: 'leadTraffic',
      label: 'Monthly Lead Traffic',
      min: 5,
      max: 200,
      step: 1,
      valueLabel: `${result.closedLeads} calls`,
      tone: 'primary',
    },
    {
      key: 'avgJobValue',
      label: 'Average Job Value',
      min: 100,
      max: 10000,
      step: 100,
      valueLabel: fmtUSD(inputs.avgJobValue),
      tone: 'primary',
    },
    {
      key: 'closeRate',
      label: 'Tenant Close Rate',
      min: 10,
      max: 80,
      step: 5,
      valueLabel: `${inputs.closeRate}%`,
      tone: 'secondary',
    },
    {
      key: 'ppcCost',
      label: 'Market PPC Cost',
      min: 15,
      max: 250,
      step: 5,
      valueLabel: fmtUSD(inputs.ppcCost),
      tone: 'secondary',
    },
  ];

  return (
    <>
      <main className="tenx-page">
        <section className="page-hero">
          <div className="container container--narrow">
            <span className="section__eyebrow">Digital Real Estate Yield Engine</span>
            <h1>10X ROI Calculator</h1>
            <p>
              Model tenant revenue, a sustainable lease price, and the cost advantage
              your digital property creates — in 30 seconds, no sign-up.
            </p>
            <p className="calculator-privacy">
              Your inputs stay on this device. Nothing is stored or sent.
            </p>
            <a className="btn btn--primary" href="#roi-calculator" onClick={(e) => {
              e.preventDefault();
              document.getElementById('roi-calculator')?.scrollIntoView({ behavior: 'smooth' });
            }}>Calculate My ROI →</a>
          </div>
        </section>

        <section className="tenx-workspace" id="roi-calculator">
          <div className="tenx-grid">
            <div className="tenx-stack">
              <CalculatorCard>
                <SectionHeader
                  number="01"
                  title="Asset Metrics"
                  description="Enter the real traffic and economics behind this digital property."
                  icon={Home}
                />

                <div className="tenx-property">
                  <label htmlFor="property-name">Property Name</label>
                  <input
                    id="property-name"
                    type="text"
                    value={inputs.propertyName}
                    onChange={(event) => update('propertyName', event.target.value)}
                    placeholder="e.g. Phoenix Roofing"
                  />
                </div>

                <div className="tenx-sliders">
                  {sliders.map((slider) => (
                    <LabeledSlider
                      key={slider.key}
                      id={`roi-${slider.key}`}
                      label={slider.label}
                      valueLabel={slider.valueLabel}
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={inputs[slider.key]}
                      tone={slider.tone}
                      onChange={(event) => update(slider.key, Number(event.target.value))}
                    />
                  ))}
                </div>
              </CalculatorCard>

              <CalculatorCard>
                <SectionHeader
                  number="02"
                  title="Revenue Summary"
                  description={`Projected monthly value generated by ${inputs.propertyName || 'this asset'}.`}
                  icon={TrendingUp}
                  tone="secondary"
                />

                <div className="tenx-primary-output">
                  <span>Total Yield Capability</span>
                  <strong>{fmtUSD(result.grossRevenue)}</strong>
                  <p>Based on {result.closedLeads} closed calls at {fmtUSD(inputs.avgJobValue)} per job.</p>
                </div>

                <div className="calc-metrics">
                  <div className="calc-metric">
                    <CircleDollarSign size={18} />
                    <span>Equity Cap (10%)</span>
                    <strong>{fmtUSD(result.equityCap)}<small>/mo</small></strong>
                  </div>
                  <div className="calc-metric">
                    <ShieldCheck size={18} />
                    <span>Lease Price (40X ROI)</span>
                    <strong>{fmtUSD(result.monthlyRent)}<small>/mo</small></strong>
                  </div>
                </div>
              </CalculatorCard>
            </div>

            <div className="tenx-stack tenx-sticky">
              <CalculatorCard>
                <SectionHeader
                  number="03"
                  title="Market Comparison"
                  description="Compare the asset lease with the cost of replacing its traffic through paid search."
                  icon={BarChart3}
                />

                <div className="tenx-comparison-chart" aria-label="Monthly lease and paid search cost comparison">
                  <div className="tenx-comparison-row">
                    <div><span>Digital Property Lease</span><strong>{fmtUSD(result.monthlyRent)}</strong></div>
                    <div className="tenx-comparison-track">
                      <span className="tenx-comparison-bar tenx-comparison-bar--orange" style={{ width: `${(result.monthlyRent / comparisonMax) * 100}%` }} />
                    </div>
                  </div>
                  <div className="tenx-comparison-row">
                    <div><span>Equivalent PPC Spend</span><strong>{fmtUSD(result.ppcSpend)}</strong></div>
                    <div className="tenx-comparison-track">
                      <span className="tenx-comparison-bar tenx-comparison-bar--blue" style={{ width: `${(result.ppcSpend / comparisonMax) * 100}%` }} />
                    </div>
                  </div>
                </div>

                <div className="tenx-savings">
                  <PhoneCall size={18} />
                  <div>
                    <span>Monthly Tenant Savings</span>
                    <strong>{fmtUSD(result.savings)}</strong>
                  </div>
                </div>
              </CalculatorCard>

              <CalculatorCard>
                <SectionHeader
                    number="04"
                    title="The Script — Use This Exactly"
                    description="Copy this. Send it to the business owner. The bracketed parts update live as you slide."
                    icon={Lightbulb}
                    tone="secondary"
                    bordered
                  />

                  <div className="tenx-pitch">
                      <p>
                        &ldquo;Hey [Name], I&rsquo;m auditing the traffic for my digital
                        property, <strong>{inputs.propertyName}</strong>.&rdquo;
                      </p>
                      <p>
                        &ldquo;Last month, this asset delivered <em>{result.closedLeads} exclusive
                        calls</em> directly to your phone.&rdquo;
                      </p>
                      <p>
                        &ldquo;Even if your team only converts <strong>{inputs.closeRate}%</strong>,
                        that is <strong>{fmtUSD(result.grossRevenue)}</strong> in gross revenue
                        generated by this property.&rdquo;
                      </p>
                      <p>
                        &ldquo;Replacing that traffic with Google Ads would cost
                        <strong> {fmtUSD(result.ppcSpend)}</strong> plus agency fees. The exclusive
                        territory lease is <strong>{fmtUSD(result.monthlyRent)}/month</strong>.&rdquo;
                      </p>
                      <p className="tenx-lease-note">
                        <strong>{fmtUSD(result.monthlyRent)}/month</strong> — that's the lease price for this territory.
                      </p>
                    </div>
              </CalculatorCard>
            </div>
          </div>

          <CalculatorCard className="tenx-cta-card">
            <Building2 size={21} />
            <h2>Build the Numbers Into an Asset Plan</h2>
            <p>Turn this model into a clear build, lease, and growth path for your first digital property.</p>
            <a
              href="https://francescaonline.gumroad.com/l/digital-business-os"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Start the Build Path →
            </a>
          </CalculatorCard>
        </section>
      </main>
    </>
  );
}
