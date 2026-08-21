import React from 'react';

export default function SectionHeader({
  number,
  title,
  description,
  icon: Icon,
  tone = 'primary',
  bordered = false,
  className = '',
}) {
  return (
    <header
      className={`
        calculator-section-header
        ${bordered ? 'calculator-section-header--bordered' : ''}
        ${className}
      `.trim()}
    >
      <span className={`calculator-step calculator-step--${tone}`}>{number}</span>
      <div>
        <h2>{Icon && <Icon aria-hidden="true" size={17} />}{title}</h2>
        <p>{description}</p>
      </div>
    </header>
  );
}
