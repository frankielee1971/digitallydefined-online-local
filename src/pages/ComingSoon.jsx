import React, { useState } from 'react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    // TODO: Replace with your actual API endpoint
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="story-hero">
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div className="label label--orange" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            YOU'RE IN
          </div>
          <h1>Welcome to DigitallyDefined</h1>
          <p style={{ fontSize: '1.25rem', margin: '1.5rem 0', color: '#242424' }}>
            We'll notify you the moment we launch.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#525252', marginBottom: '2rem' }}>
            In the meantime, follow us for tips on building faceless digital real estate.
          </p>
          <a 
            href="https://linkedin.com" 
            className="btn btn--outline"
            style={{ marginRight: '1rem' }}
          >
            LinkedIn
          </a>
          <a href="https://instagram.com" className="btn btn--outline">
            Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="story-hero">
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        {/* Hero Heading - Stacked labels */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <div className="label label--orange" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
            COMING SOON
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '.12em', color: 'var(--color-text-muted)' }}>
            Faceless Digital Real Estate
          </div>
        </div>
        
        <h1 style={{ marginBottom: '1.5rem' }}>
          Digital Real Estate,<br />
          <span className="marker">Built for Gen X Women</span>
        </h1>

        <p style={{ 
          fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', 
          maxWidth: '600px', 
          margin: '0 auto 2.5rem',
          lineHeight: '1.7',
          color: '#525252'
        }}>
          Stop trading time for money. We help you create automated income streams 
          that work while you sleep — no face, no hype, just smart digital assets.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{ maxWidth: '420px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem',
            marginBottom: error ? '0.75rem' : '0'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="form-input"
              style={{ 
                flex: 1,
                padding: '0.875rem 1rem',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                fontSize: '0.95rem'
              }}
            />
            <button type="submit" className="btn btn--primary">
              Join the Waitlist
            </button>
          </div>
          {error && (
            <p style={{ 
              color: 'var(--color-red)', 
              fontSize: '0.85rem', 
              fontWeight: '700',
              marginTop: '0.5rem'
            }}>
              {error}
            </p>
          )}
        </form>

        {/* Value Proposition - Grid of individual cards */}
        <div style={{ 
          marginTop: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px',
              margin: '0 auto 1rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '0.8rem'
            }}>
              $0
            </div>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '800' }}>
              NO UPFRONT COSTS
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#525252' }}>
              Start with free tools, scale when ready
            </p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px',
              margin: '0 auto 1rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '0.8rem'
            }}>
              🔒
            </div>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '800' }}>
              PRIVACY FIRST
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#525252' }}>
              Your data, your control — no exceptions
            </p>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ 
              width: '32px', 
              height: '32px',
              margin: '0 auto 1rem',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '900',
              fontSize: '0.8rem',
              background: 'var(--color-accent)',
              color: 'var(--color-surface)'
            }}>
              AI
            </div>
            <h3 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '800' }}>
              AI-POWERED
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#525252' }}>
              Smart automation that actually works
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            For Gen X women who are done with the 9-to-5 grind.<br />
            Build assets, not a second job.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
