import React from 'react';
import { brutalEyebrow, theme } from '../../config/theme';

const TONES = {
  default: theme.colors.textPrimary,
  orange: theme.colors.orange,
  aqua: theme.colors.aqua,
  muted: theme.colors.textMuted,
};

/**
 * DDLabel — small-caps brutalist eyebrow / label.
 */
export default function DDLabel({ children, as: Tag = 'span', tone = 'default', className = '', style, ...rest }) {
  return (
    <Tag
      className={`dd-label ${className}`.trim()}
      style={{ ...brutalEyebrow, color: TONES[tone] || TONES.default, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}