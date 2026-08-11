import React, { useState } from 'react';
import SiteLayout from '../components/Layout/SiteLayout';
import { callSupabaseEdge } from '../lib/supabase-edge';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await callSupabaseEdge('contact', {
        name: form.name,
        email: form.email,
        message: form.message,
        source: 'contact-page',
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <SiteLayout mentorTopic="contact">
      <section className="page-hero">
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className="section__eyebrow">Contact</p>
          <h1 style={{ marginBottom: '1rem' }}>Let's Build Something That Works.</h1>
          <p className="hero__tagline">Questions about the platform? Partnerships? Or just need help getting started? Drop us a line.</p>
          <div className="action-row"><a href="#contact-form" className="btn btn--primary">Send a Message →</a></div>
        </div>
      </section>

      <section className="section" id="contact-form">
        <div className="container container--narrow" style={{ maxWidth: 700 }}>
          <div className="card" style={{ padding: '3rem', border: '2px solid var(--black)', maxWidth: 600, margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Your Name</label>
                <input type="text" className="form-input" required placeholder="What should we call you?" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label">Message</label>
                <textarea className="form-input form-textarea" required placeholder="Tell us what you're building." value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
              {status === 'success' && <p style={{ color: 'var(--dd-orange)', fontWeight: 700, marginTop: '1.5rem', padding: '1rem', background: 'var(--bone)', border: '1px solid var(--dd-orange)', textAlign: 'center' }}>✅ Message sent. We'll be in touch.</p>}
              {status === 'error' && <p style={{ color: 'var(--dd-red)', fontWeight: 700, marginTop: '1.5rem', padding: '1rem', background: 'var(--bone)', border: '1px solid var(--dd-red)', textAlign: 'center' }}>❌ Something went wrong. Try again or email hello@digitallydefined.online</p>}
            </form>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container container--narrow" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#fff' }}>Quick Start Path</h2>
        </div>
        <div className="container container--narrow">
          <div className="grid-3">
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div className="card__heading">1. Take the Quiz</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>Discover your digital superpower and get a personalized roadmap.</p>
              <a href="/quiz" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Start Now →</a>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div className="card__heading">2. Grab a Free Tool</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>ROI Calculator or Niche Profitability Scorecard. Get clarity before investing.</p>
              <a href="/tools" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Try Tools →</a>
            </div>
            <div className="card" style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div className="card__heading">3. Use the Free Tools</div>
              <p className="card__text" style={{ fontSize: '0.9rem' }}>Calculate your gap, validate a niche, and model the first asset before you invest.</p>
              <a href="/tools" className="btn btn--secondary" style={{ width: 'fit-content', fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Explore Tools →</a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
