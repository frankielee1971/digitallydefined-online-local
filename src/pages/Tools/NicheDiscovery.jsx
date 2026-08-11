import React, { useState } from 'react';
import SiteLayout from '../../components/Layout/SiteLayout';
import { callAgent } from '../../lib/buzz-agents';

export default function NicheDiscovery() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await callAgent('niche', { query });
      if (response.success) {
        setResult(response.data);
      }
    } catch (err) {
      setError('Failed to analyze niche. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout mentorTopic="tools">
      <section className="page-hero">
        <div className="container container--narrow" style={{ textAlign: 'center' }}>
          <p className="section__eyebrow">AI-Assisted Niche Discovery</p>
          <h1 style={{ marginBottom: '1rem' }}>
            Find Your Profitable Niche
          </h1>
          <p className="hero__tagline" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
            AI-powered niche analysis for Gen X women building faceless digital real estate.
          </p>
          <div className="action-row"><a href="#niche-discovery" className="btn btn--primary">Discover My Niche →</a></div>
        </div>
      </section>

      <section className="section" id="niche-discovery">
        <div className="container container--narrow" style={{ maxWidth: 700 }}>
          <form onSubmit={handleSubmit} className="card interactive-form-card" style={{ marginBottom: '2rem' }}>
            <label className="form-label">What niche or topic do you want to explore?</label>
            <input 
              type="text" 
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g., retirement planning for Gen X women, local roofing services..."
              className="form-input"
              style={{ marginBottom: '1rem' }}
            />
            <button type="submit" disabled={loading || !query.trim()} className="btn btn--primary">
              {loading ? 'Analyzing...' : 'Discover Niche →'}
            </button>
          </form>

          {error && (
            <div style={{ padding: '1rem', background: '#fee', color: '#c00', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {result && (
            <div className="card" style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{result.niche || 'Your Niche'}</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ padding: '1rem', background: '#fff' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Demand</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: result.demand === 'High' ? '#047857' : result.demand === 'Medium' ? '#D4A056' : '#C20F0A' }}>
                    {result.demand || 'Medium'}
                  </div>
                </div>
                <div style={{ padding: '1rem', background: '#fff' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Competition</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', color: result.competition === 'Low' ? '#047857' : result.competition === 'Medium' ? '#D4A056' : '#C20F0A' }}>
                    {result.competition || 'Medium'}
                  </div>
                </div>
              </div>

              {result.keywords?.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Keywords</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {result.keywords.map((kw, idx) => (
                      <span key={idx} style={{ padding: '0.25rem 0.75rem', background: '#FFFCF9', border: '1px solid #e5e5e5', fontSize: '0.85rem' }}>
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {result.recommendation && (
                <div style={{ padding: '1rem', background: '#FFFCF9', borderLeft: '4px solid #F18B25' }}>
                  <div style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Recommendation</div>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>{result.recommendation}</p>
                </div>
              )}

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <a href="/gap" className="btn btn--primary">Calculate My Gap →</a>
                <button onClick={() => setResult(null)} className="btn btn--outline">Analyze Another</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
