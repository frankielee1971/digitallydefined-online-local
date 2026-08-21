import React, { useState } from 'react';
import { callSupabaseEdge } from '../lib/supabase-edge';
import FadeInSection from '../components/FadeInSection';
import { brutalCard, brutalHeading } from '../config/theme';

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
    <>
      <FadeInSection>
        <section className="page-hero">
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <p className="section__eyebrow">Contact</p>
            <h1 style={{ ...brutalHeading, fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', marginBottom: '1rem' }}>Let's Build Something That Works.</h1>
            <p className="hero__tagline">Questions about the platform? Partnerships? Or just need help getting started? Drop us a line.</p>
            <div className="action-row"><a href="#contact-form" className="btn btn--primary dd-button dd-button--primary">Send a Message →</a></div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={100}>
        <section className="section" id="contact-form">
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ ...brutalCard, padding: '2rem' }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Your Name</label>
                  <input type="text" className="form-input dd-input" required placeholder="What should we call you?" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input dd-input" required placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea dd-input" required placeholder="Tell us what you're building." value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn--primary dd-button dd-button--primary" style={{ width: '100%' }} disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : 'Send Message →'}
                </button>
                {status === 'success' && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFFCF9', border: '2px solid #F18B25', color: '#000', fontWeight: 700, textAlign: 'center' }}>
                    ✅ Message sent. We'll be in touch.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FFFCF9', border: '2px solid #8B1A0A', color: '#000', fontWeight: 700, textAlign: 'center' }}>
                    ❌ Something went wrong. Try again or email hello@digitallydefined.online
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </FadeInSection>

      <FadeInSection delay={140}>
        <section className="section section--dark">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: '#fff', ...brutalHeading, fontSize: 'clamp(1.3rem, 2.6vw, 1.7rem)' }}>Quick Start Path</h2>
          </div>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
              {[
                { title: '1. Take the Quiz', copy: 'Discover your digital superpower and get a personalized roadmap.', href: '/quiz?start=true', label: 'Start Now →' },
                { title: '2. Score a Niche Idea', copy: 'Rate your niche against 6 criteria and get an instant profitability assessment.', href: '/tools/scorecard', label: 'Score My Niche →' },
                { title: '3. Use the Free Tools', copy: 'Calculate your gap, validate a niche, and model the first asset before you invest.', href: '/tools', label: 'Explore Tools →' },
              ].map((item) => (
                <div key={item.title} style={{ ...brutalCard, padding: '1.25rem', textAlign: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px rgba(0,0,0,0.12)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '1px 1px 0px rgba(0,0,0,0.08)'; }}>
                  <div style={{ ...brutalHeading, fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</div>
                  <p style={{ fontSize: '0.9rem', color: '#5F5F5F', lineHeight: 1.6, marginBottom: '1rem' }}>{item.copy}</p>
                  <a href={item.href} className="btn btn--outline dd-button dd-button--outline" style={{ width: 'fit-content', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>{item.label}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}
