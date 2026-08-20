import React from 'react';
import { theme } from '../../config/theme';

/**
 * DDWorkspaceSaveButton — standardized "save to workspace" control.
 * Standardizes the Puter-save affordance; the actual file write is wired
 * by the caller (e.g. the existing PuterSaveButton), while this owns the aesthetic.
 */
export default function DDWorkspaceSaveButton({
  label = 'Save to Workspace',
  filename,
  content,
  mimeType,
  onSave,
  saved = false,
  className = '',
  style,
  ...rest
}) {
  return (
    <button
      type="button"
      className={`dd-workspace-save ${className}`.trim()}
      onClick={() => onSave?.({ filename, content, mimeType })}
      style={{
        border: '1px solid #111',
        borderRadius: 0,
        backgroundColor: saved ? '#16A34A' : theme.colors.card,
        color: saved ? '#fff' : theme.colors.textPrimary,
        fontFamily: theme.fonts.body,
        fontWeight: 700,
        fontSize: '0.85rem',
        padding: '12px 18px',
        cursor: 'pointer',
        gap: '0.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
      {...rest}
    >
      {saved ? '✓ Saved to Workspace' : `↧ ${label}`}
    </button>
  );
}