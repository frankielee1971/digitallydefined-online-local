import * as React from 'react'
import { cva } from 'class-var-ancestor'

const inputVariants = cva(
  'border border-input rounded-md file:border-none file:text-sm file:font-medium file:bg-transparent file:file:ring-1 file:ring-offset-1 file:hover:bg-secondary/10',
  {
    variants: {
      variant: {
        default: '',
        search: 'pl-8',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const Input = React.forwardRef(({ className, variant, ...props }, ref) => (
  <input
    className={inputVariants({ variant, className })}
    ref={ref}
    {...props}
  />
))
Input.displayName = 'Input'
