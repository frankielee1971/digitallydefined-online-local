import React from 'react';
import DDLabel from './DDLabel';
import { brutalBorder, theme } from '../../config/theme';

/**
 * DDInput — flat brutalist form control. 1px #111, 0 radius, DM Sans.
 */
export default function DDInput({ label, value, onChange, type = 'text', placeholder, required, error, hint, className = '', style, ...rest }) {
  return (
    <div className={`dd-field ${className}`.trim()} style={{ display: 'grid', gap: '0.5rem', ...style }}>
      {label ? <DDLabel as="label">{label}</DDLabel> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          border: brutalBorder,
          borderRadius: 0,
          backgroundColor: theme.colors.card,
          fontFamily: theme.fonts.body,
          fontSize: '1rem',
          padding: '0.6rem 0.7rem',
          color: theme.colors.textPrimary,
          outline: 'none',
        }}
        {...rest}
      />
      {hint && !error ? <small style={{ color: theme.colors.textMuted }}>{hint}</small> : null}
      {error ? <small style={{ color: theme.colors.red }} role="alert">{error}</small> : null}
    </div>
  );
}