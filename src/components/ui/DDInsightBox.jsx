import React from 'react';
import { brutalBorder, theme } from '../../config/theme';

const TONES = {
  aqua: { bg: 'rgba(71,183,212,0.10)', accent: theme.colors.aqua },
  orange: { bg: 'rgba(241,139,37,0.10)', accent: theme.colors.orange },
  red: { bg: 'rgba(139,26,10,0.08)', accent: theme.colors.red },
  neutral: { bg: theme.colors.panel, accent: theme.colors.textPrimary },
};

/**
 * DDInsightBox — Hermes / AI guidance banner with a 1px left accent rule.
 */
export default function DDInsightBox({ title, body, tone = 'neutral', className = '', style, children }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <div
      className={`dd-insight ${className}`.trim()}
      style={{
        border: brutalBorder,
        borderLeft: `4px solid ${t.accent}`,
        borderRadius: 0,
        backgroundColor: t.bg,
        padding: '1.5rem',
        ...style,
      }}
    >
      {title ? <h3 style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: theme.fonts.heading, margin: '0 0 0.5rem', color: theme.colors.textPrimary }}>{title}</h3> : null}
      {body ? <p style={{ lineHeight: 1.6, color: theme.colors.textPrimary, margin: 0 }}>{body}</p> : null}
      {children}
    </div>
  );
}