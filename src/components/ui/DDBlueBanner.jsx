import React from 'react';
import { theme } from '../../config/theme';

/**
 * DDBlueBanner — the one brand banner that appears after every hero.
 * Full width, blue fill, white text, generous padding, square corners.
 * Usage: <DDBlueBanner eyebrow="…" title="…" body="…" />
 */
export default function DDBlueBanner({ eyebrow, title, body, cta, className = '', style }) {
  return (
    <section
      className={`dd-blue-banner ${className}`.trim()}
      style={{
        width: '100%',
        backgroundColor: theme.colors.aqua,
        color: '#ffffff',
        padding: 'clamp(2.5rem, 6vw, 4rem) 0',
        borderTop: `1px solid ${theme.colors.border}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        ...style,
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: cta ? 'center' : 'left' }}>
        {eyebrow ? (
          <p style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff', opacity: 0.9, margin: '0 0 0.75rem' }}>
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 style={{ fontFamily: theme.fonts.heading, fontWeight: 800, letterSpacing: '-0.03em', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', lineHeight: 1.15, color: '#ffffff', margin: '0 0 0.75rem' }}>
            {title}
          </h2>
        ) : null}
        {body ? (
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#ffffff', maxWidth: 720, margin: cta ? '0 auto 1.5rem' : '0 0 1rem' }}>
            {body}
          </p>
        ) : null}
        {cta ? <div style={{ marginTop: cta ? '0' : '1.5rem' }}>{cta}</div> : null}
      </div>
    </section>
  );
}