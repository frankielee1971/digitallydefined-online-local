import * as React from 'react'
import { motion } from 'framer-motion'

// DigitallyDefined Animation Presets
// Brand-aligned: smooth, subtle, performance-focused animations
// No flashy effects — just functional micro-interactions

export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'ease-out' },
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'ease-out' },
}

export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: 'ease-out' },
}

export const slideInBottom = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'ease-out' },
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'ease-out' },
}

// Hover animations for cards and buttons
export const cardHover = {
  scale: 1,
  rotate: 0,
  transition: { duration: 0.3, ease: 'ease-out' },
}

export const cardHoverHover = {
  y: -4,
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
  transition: { duration: 0.3, ease: 'ease-out' },
}

// Button hover animation
export const buttonHover = {
  scale: 1,
  transition: { duration: 0.2, ease: 'ease-out' },
}

export const buttonHoverHover = {
  translateY: -2,
  boxShadow: '0 6px 20px rgba(241, 139, 37, 0.3)',
  transition: { duration: 0.2, ease: 'ease-out' },
}

// Reusable Motion components
export const MotionDiv = motion.div
export const MotionSpan = motion.span
export const MotionSection = motion.section

export const FadeIn = ({ children, ...props }) => (
  <motion.div initial="initial" animate="animate" variants={fadeIn} {...props}>
    {children}
  </motion.div>
)

export const SlideInLeft = ({ children, ...props }) => (
  <motion.div initial="initial" animate="animate" variants={slideInLeft} {...props}>
    {children}
  </motion.div>
)

export const SlideInRight = ({ children, ...props }) => (
  <motion.div initial="initial" animate="animate" variants={slideInRight} {...props}>
    {children}
  </motion.div>
)

export const SlideInBottom = ({ children, ...props }) => (
  <motion.div initial="initial" animate="animate" variants={slideInBottom} {...props}>
    {children}
  </motion.div>
)

export const FadeInUp = ({ children, ...props }) => (
  <motion.div initial="initial" animate="animate" variants={fadeInUp} {...props}>
    {children}
  </motion.div>
)

export const HoverCard = ({ children, ...props }) => (
  <motion.div
    initial={cardHover}
    hover={cardHoverHover}
    variants={cardHover}
    {...props}
  >
    {children}
  </motion.div>
)

export const HoverButton = ({ children, ...props }) => (
  <motion.button
    initial={buttonHover}
    hover={buttonHoverHover}
    variants={buttonHover}
    {...props}
  >
    {children}
  </motion.button>
)

export default {
  fadeIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  fadeInUp,
  cardHover,
  buttonHover,
  FadeIn,
  SlideInLeft,
  SlideInRight,
  SlideInBottom,
  FadeInUp,
  HoverCard,
  HoverButton,
}
