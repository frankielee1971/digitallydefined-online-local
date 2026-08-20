import React from 'react';
import DDCard from './DDCard';
import DDCTA from './DDCTA';
import DDLabel from './DDLabel';
import { theme } from '../../config/theme';

/**
 * DDCalculatorCard — input form (left) → result grid (right), brutalist card.
 * The result list is [{ label, value, tone }]; highlights use tone `orange`/`red`/`success`.
 */
export default function DDCalculatorCard({ eyebrow, title, inputs, result = [], cta, className = '', style }) {
  return (
    <DDCard as="article" tone="card" className={`dd-calc-card ${className}`.trim()} style={{ padding: '1.5rem', display: 'grid', gap: '1.5rem', ...style }}>
      <div style={{ marginBottom: '0.5rem' }}>
        {eyebrow ? <DDLabel>{eyebrow}</DDLabel> : null}
        {title ? <h3 style={{ fontSize: '1.2rem', fontWeight: 800, fontFamily: theme.fonts.heading, letterSpacing: '-0.03em', margin: '0.25rem 0 0', color: theme.colors.textPrimary }}>{title}</h3> : null}
      </div>
      {inputs ? <div style={{ display: 'grid', gap: '1rem' }}>{inputs}</div> : null}
      {result.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px,1fr))', gap: '1rem' }}>
          {result.map((r, i) => (
            <div key={i} style={{ borderBottom: '1px solid #111', borderRadius: 0, backgroundColor: theme.colors.card, padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, fontFamily: theme.fonts.heading, textTransform: 'uppercase', letterSpacing: '0.08em', color: theme.colors.textMuted }}>{r.label}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: r.tone === 'orange' ? theme.colors.orange : r.tone === 'aqua' ? theme.colors.aqua : r.tone === 'success' ? theme.colors.success : theme.colors.textPrimary }}>{r.value}</div>
            </div>
          ))}
        </div>
      ) : null}
      {cta ? <DDCTA {...cta} className="dd-btn" /> : null}
    </DDCard>
  );
}