import * as React from 'react'
import { cva } from 'class-var-ancestor'

const avatarVariants = cva(
  'relative flex-shrink-0 border-2 font-medium select-none',
  {
    variants: {
      size: {
        sm: 'h-7 w-7 text-xs',
        default: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-lg',
        xs: 'h-6 w-6 text-[0.75rem]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)

const avatarImageVariants = cva(
  'absolute inset-0 h-full w-full rounded-md bg-foreground/10',
  {
    defaultVariants: {},
  },
)

const avatarFallbackVariants = cva(
  'flex items-center justify-center',
  {
    defaultVariants: {},
  },
)

export const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div className={avatarVariants({ className })} ref={ref} {...props} />
))
Avatar.displayName = 'Avatar'

export const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img className={avatarImageVariants({ className })} ref={ref} alt="avatar" {...props} />
))
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div className={avatarFallbackVariants({ className })} ref={ref} {...props}>AA</div>
))
AvatarFallback.displayName = 'AvatarFallback'
