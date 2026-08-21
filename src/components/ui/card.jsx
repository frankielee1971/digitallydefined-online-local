import * as React from 'react'
import { cva } from 'class-var-ancestor'

const cardVariants = cva(
  'rounded-md border bg-card text-card-foreground shadow-sm',
  {
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cardVariants({ className })} ref={ref} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cva('flex flex-col space-y-1.5 p-6', { className })} ref={ref} {...props} />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    className={cva('text-lg font-leading-tight', { className })}
    ref={ref}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    className={cva('text-sm text-foreground/70', { className })}
    ref={ref}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cva('', { className })} ref={ref} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cva('flex items-center p-6 pt-0', { className })} ref={ref} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
