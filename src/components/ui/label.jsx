import * as React from 'react'
import { cva } from 'class-var-ancestor'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    defaultVariants: {},
  },
)

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label className={labelVariants({ className })} ref={ref} {...props} />
))
Label.displayName = 'Label'
