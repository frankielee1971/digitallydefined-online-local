import React from 'react';
import DDCard from './DDCard';
import DDCTA from './DDCTA';
import DDInput from './DDInput';
import { theme } from '../../config/theme';

/**
 * DDScorecardCard — 6-criteria weighted niche scorer.
 * Each criterion: 0-10 input + label + optional help. Tier badge + CTA on submit.
 */
export default function DDScorecardCard({
  criteria = [],
  values = {},
  onChange,
  onSubmit,
  submitLabel = 'Score This Niche',
  result,
  className = '',
  style,
}) {
  const handleKey = (key, e) => {
    const num = Math.min(10, Math.max(0, Number(e.target.value || '')));
    onChange?.(key, Number.isNaN(num) ? 0 : num);
  };
  return (
    <DDCard as="form" tone="card" className={`dd-scorecard ${className}`.trim()} style={{ padding: '1.5rem', display: 'grid', gap: '1.25rem', ...style }}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {criteria.map((c) => (
          <DDInput
            key={c.key}
            label={`${c.label} ${c.weight ? `(${Math.round(c.weight * 100)}%)` : ''}`}
            type="number"
            min={0}
            max={10}
            value={values[c.key] ?? ''}
            hint={c.help}
            onChange={(e) => handleKey(c.key, e)}
          />
        ))}
      </div>
      {result ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ border: '1px solid #111', borderRadius: 0, backgroundColor: theme.colors.orange, color: '#111', width: 56, height: 56, display: 'grid', placeItems: 'center', fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '1.25rem' }}>
            {result.tier}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: theme.fonts.heading, fontWeight: 800, color: theme.colors.textPrimary }}>{result.title}</div>
            <div style={{ color: theme.colors.textMuted, fontSize: '0.9rem' }}>{Math.round(result.pct * 100)}% weighted score</div>
          </div>
        </div>
      ) : null}
      <DDCTA label={submitLabel} onClick={onSubmit} variant="primary" className="dd-btn" />
    </DDCard>
  );
}