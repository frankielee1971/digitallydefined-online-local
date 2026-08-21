import React from 'react';
import { brutalBorder, theme } from '../../config/theme';

/**
 * DDMentorWidget — standardized topic-aware Mentor affordance.
 * Renders a floating brutalist trigger; `onOpen` is wired to the real Mentor/Hermes
 * launch. Lightweight by design so it composes with hooks/useProactiveHermes.
 */
export default function DDMentorWidget({ onOpen, label = 'Mentor', topic, status, active = false, className = '', style }) {
  return (
    <div className={`dd-mentor-widget ${className}`.trim()} style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 60, ...style }}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${label}`}
        style={{
          border: brutalBorder,
          borderRadius: 0,
          backgroundColor: active ? theme.colors.orange : theme.colors.card,
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.heading,
          fontWeight: 800,
          fontSize: '0.85rem',
          padding: '12px 18px',
          cursor: 'pointer',
          boxShadow: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span aria-hidden="true" style={{ fontFamily: theme.fonts.heading, fontSize: '1rem' }}>✦</span>
        {label}
        {status ? <small style={{ color: theme.colors.textMuted, marginLeft: 6 }}>({status})</small> : null}
      </button>
    </div>
  );
}