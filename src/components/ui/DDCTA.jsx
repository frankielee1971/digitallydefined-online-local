import React from 'react';
import { brutalButtonOutline, brutalButtonPrimary, brutalButtonSecondary } from '../../config/theme';

const VARIANTS = {
  primary: brutalButtonPrimary,
  secondary: brutalButtonSecondary,
  outline: brutalButtonOutline,
};

/**
 * DDCTA — the only conversion button on the website.
 * Sharp, 0 radius, 1px border, no gradient, no shadow.
 */
export default function DDCTA({ label, href, onClick, variant = 'primary', wide = false, className = '', style, disabled, icon, target, ...rest }) {
  const Tag = href ? 'a' : 'button';
  const common = {
    ...VARIANTS[variant] || brutalButtonPrimary,
    width: wide ? '100%' : undefined,
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
    ...style,
  };
  const inner = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      {label}
    </>
  );
  if (Tag === 'a') {
    return (
      <a href={href} className={`dd-btn ${className}`} style={common} target={target} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={`dd-btn ${className}`} style={common} onClick={onClick} disabled={disabled} {...rest}>
      {inner}
    </button>
  );
}