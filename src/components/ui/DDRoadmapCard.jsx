import React from 'react';
import { theme } from '../../config/theme';

const TONES = {
  black: { badge: '#111111', label: '#fff' },
  orange: { badge: theme.colors.orange, label: '#111' },
  aqua: { badge: theme.colors.aqua, label: '#111' },
};

/**
 * DDRoadmapCard — a numbered build-order step in the roadmap plan.
 */
export default function DDRoadmapCard({ step, tone = 'orange', children, className = '', style }) {
  const t = TONES[tone] || TONES.orange;
  return (
    <div className={`dd-roadmap-step ${className}`.trim()} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', ...style }}>
      <span
        aria-hidden="true"
        style={{
          width: 44, height: 44, flexShrink: 0,
          border: '1px solid #111', borderRadius: 0,
          backgroundColor: t.badge, color: t.label,
          fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '1rem',
          display: 'grid', placeItems: 'center',
        }}
      >
        {String(step).padStart(2, '0')}
      </span>
      <p style={{ flex: 1, fontSize: '1rem', lineHeight: 1.6, color: theme.colors.textPrimary, margin: 0, paddingTop: '0.5rem' }}>{children}</p>
    </div>
  );
}