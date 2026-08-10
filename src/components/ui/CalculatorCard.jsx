import React from 'react';

export function CalculatorCard({ children, className = '' }) {
  return <article className={`calculator-card ${className}`.trim()}>{children}</article>;
}

export function LabeledSlider({
  id,
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  tone = 'primary',
}) {
  return (
    <div className="calculator-slider">
      <div className="calculator-slider__label">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{valueLabel}</output>
      </div>
      <input
        id={id}
        className={`calculator-range calculator-range--${tone}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      />
      <div className="calculator-slider__limits">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
