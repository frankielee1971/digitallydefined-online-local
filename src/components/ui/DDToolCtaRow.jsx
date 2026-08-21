import React from 'react';
import DDCTA from './DDCTA';
import { theme } from '../../config/theme';

/**
 * DDToolCtaRow — the 1×4 row of pictogram tool CTAs that sits directly
 * under the hero on every page. Each item is a white card with an icon,
 * a title, and a CTA.
 * Usage: <DDToolCtaRow items={[{ icon, label, href, cta }]} />
 */
export default function DDToolCtaRow({ items = [], className = '', style }) {
  if (!items.length) return null;
  return (
    <section className={`dd-tool-cta-row-section ${className}`.trim()} style={{ padding: '2rem 0', backgroundColor: theme.colors.background, ...style }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div
          className="dd-tool-cta-row"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.6rem',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 0,
                backgroundColor: theme.colors.card,
                padding: '1.5rem 1rem',
              }}
            >
              {item.icon ? (
                <span aria-hidden="true" style={{ color: theme.colors.textPrimary, lineHeight: 1 }}>{item.icon}</span>
              ) : null}
              <span style={{ fontFamily: theme.fonts.heading, fontWeight: 800, fontSize: '0.95rem', color: theme.colors.textPrimary }}>
                {item.label}
              </span>
              {item.href ? (
                <DDCTA {...item} className="dd-btn" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}