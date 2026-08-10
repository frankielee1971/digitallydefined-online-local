import * as React from 'react'
import { cva } from 'class-var-ancestor'

const scrollAreaVariants = cva(
  'relative overflow-hidden',
  {
    defaultVariants: {},
  },
)

const scrollAreaViewport = cva(
  'block min-w-[max-content] min-h-[max-content]',
  {
    defaultVariants: {},
  },
)

const scrollAreaViewportInner = cva(
  'block',
  {
    defaultVariants: {},
  },
)

const scrollAreaScrollbar = cva(
  'flex flex-row bg-hover rounded-full h-0.5 p-1 transition-[transform,opacity] dark:hover:bg-white',
  {
    variants: {
      orientation: {
        horizontal: { className: 'top-0 left-0 right-0' },
        vertical: { className: 'right-0 top-0 bottom-0 rotate-90' },
      },
      state: {
        enabled: { className: 'h-2.5 w-2.5 bg-foreground bg-opacity-20 hover:bg-opacity-50' },
        disabled: { className: 'h-0 w-0' },
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      state: 'disabled',
    },
  },
)

const scrollAreaScrollbarTrack = cva(
  'flex-1 bg-hover rounded-full relative hover:bg-opacity-10 dark:track-hidden',
  {
    defaultVariants: {},
  },
)

const scrollAreaScrollbarHandle = cva(
  'flex-1 bg-foreground rounded-full relative hover:bg-opacity-50',
  {
    variants: {
      state: {
        disabled: { className: 'block invisible' },
      },
    },
    defaultVariants: {
      state: 'enabled',
    },
  },
)

export const ScrollArea = React.forwardRef(({ className, ...props }, ref) => (
  <div className={scrollAreaVariants({ className })} ref={ref} {...props}>
    <ScrollAreaViewport>
      <ScrollAreaViewportInner ref={ref} {...props} />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="horizontal" state="enabled">
      <ScrollAreaTrack>
        <ScrollAreaHandle />
      </ScrollAreaTrack>
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="vertical" state="enabled">
      <ScrollAreaTrack>
        <ScrollAreaHandle />
      </ScrollAreaTrack>
    </ScrollAreaScrollbar>
  </div>
))
ScrollArea.displayName = 'ScrollArea'

const ScrollAreaViewport = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cva(scrollAreaVariants(), { className })} ref={ref} {...props}>
    <ScrollAreaViewportInner className={scrollAreaViewport({ className })} ref={ref} {...props} />
  </div>
))
ScrollAreaViewport.displayName = 'ScrollAreaViewport'

const ScrollAreaViewportInner = React.forwardRef(({ className, ...props }, ref) => (
  <div className={scrollAreaViewportInner({ className })} ref={ref} {...props} />
))
ScrollAreaViewportInner.displayName = 'ScrollAreaViewportInner'

const ScrollAreaScrollbar = React.forwardRef(({ className, ...props }, ref) => (
  <div className={scrollAreaScrollbar({ className })} ref={ref} {...props} />
))
ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar'

const ScrollAreaTrack = React.forwardRef(({ className, ...props }, ref) => (
  <div className={scrollAreaTrack({ className })} ref={ref} {...props} />
))
ScrollAreaTrack.displayName = 'ScrollAreaTrack'

const ScrollAreaHandle = React.forwardRef(({ className, ...props }, ref) => (
  <div className={scrollAreaHandle({ className })} ref={ref} {...props} />
))
ScrollAreaHandle.displayName = 'ScrollAreaHandle'

export { ScrollArea, ScrollAreaViewport, ScrollAreaViewportInner, ScrollAreaScrollbar, ScrollAreaTrack, ScrollAreaHandle }
