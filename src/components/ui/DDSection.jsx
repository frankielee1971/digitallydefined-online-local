import React from 'react';
import { brutalEyebrow, theme } from '../../config/theme';

const TONES = { cream: theme.colors.background, white: theme.colors.card, panel: theme.colors.panel, dark: '#111111' };

/**
 * DDSection — a full-bleed content block with the calm 24px/1100px rhythm.
 * Optional eyebrow + title, hard 1px top rule, and tone control.
 */
export default function DDSection({
  id,
  eyebrow,
  title,
  intro,
  tone = 'cream',
  rule = 'none',
  narrow = false,
  className = '',
  style,
  children,
  eyebrowTone,
}) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      className={`dd-section ${tone !== 'cream' ? `dd-section--${tone}` : ''} ${className}`.trim()}
      style={{
        background: TONES[tone] || TONES.cream,
        color: dark ? '#fff' : undefined,
        ...(rule === 'top' ? { borderTop: '1px solid #111' } : {}),
        ...(rule === 'soft' ? { borderTop: '1px solid rgba(17,17,17,0.08)' } : {}),
        ...style,
      }}
    >
      <div className={narrow ? 'dd-container--narrow' : 'dd-container'}>
        <div className="dd-section__head">
          {eyebrow ? (
            <p style={{ ...brutalEyebrow, color: dark ? '#fff' : eyebrowTone === 'blue' ? theme.colors.aqua : eyebrowTone === 'orange' ? theme.colors.orange : theme.colors.textPrimary }}>
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 style={{ fontFamily: theme.fonts.heading, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.75rem,4vw,2rem)', color: dark ? '#fff' : theme.colors.textPrimary, margin: '0 0 0.5rem', lineHeight: 1.15 }}>
              {title}
            </h2>
          ) : null}
          {intro ? <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: dark ? 'rgba(255,255,255,0.75)' : theme.colors.textMuted, maxWidth: 640, margin: '0 0 1rem' }}>{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}