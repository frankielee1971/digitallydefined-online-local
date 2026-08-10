import * as React from 'react'
import { cva } from 'class-var-ancestor'

const separatorVariants = cva(
  'shrink-0 bg-border',
  {
    variants: {
      vertical: {
        default: { className: 'h-full w-px' },
        true: { className: 'h-full w-px' },
      },
      horizontal: {
        default: { className: 'h-0 w-full' },
        true: { className: 'h-0 w-full' },
      },
    },
    defaultVariants: {
      horizontal: true,
    },
  },
)

export const Separator = React.forwardRef(({ className, vertical, ...props }, ref) => (
  <div
    className={separatorVariants({ vertical, className })}
    ref={ref}
    role="separator"
    {...props}
  />
))
Separator.displayName = 'Separator'
