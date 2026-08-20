import React from 'react';
import DDCTA from './DDCTA';
import { theme } from '../../config/theme';

/**
 * DDNextStepRow — the end-of-tool forward path.
 * A 1px soft top rule plus a horizontal row of next-step CTAs.
 */
export default function DDNextStepRow({ steps = [], className = '', style, title }) {
  if (!steps.length) return null;
  return (
    <div
      className={`dd-next-step ${className}`.trim()}
      style={{ borderTop: '1px solid rgba(17,17,17,0.08)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', ...style }}
    >
      {title ? <span style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '0.85rem', color: theme.colors.textPrimary }}>{title}</span> : null}
      {steps.map((s, i) => (
        <DDCTA key={i} {...s} className="dd-btn" />
      ))}
    </div>
  );
}