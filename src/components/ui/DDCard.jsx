import React from 'react';
import { brutalBorder, brutalCard, theme } from '../../config/theme';

const TONES = { card: theme.colors.card, panel: theme.colors.panel };

/**
 * DDCard — the base Soft Brutalism surface.
 * 1px #111 border, 0 radius, brutalist hard shadow.
 */
export default function DDCard({
  as: Tag = 'div',
  tone = 'card',
  bordered = true,
  shadow = true,
  className = '',
  style,
  children,
  ...rest
}) {
  return (
    <Tag
      className={`dd-card ${className}`.trim()}
      style={{
        border: bordered ? brutalBorder : 'none',
        borderRadius: 0,
        backgroundColor: TONES[tone] || TONES.card,
        boxShadow: shadow ? brutalCard.boxShadow : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}