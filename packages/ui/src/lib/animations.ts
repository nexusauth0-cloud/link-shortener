import type { Variants, Transition } from 'framer-motion'

export const defaultTransition: Transition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.3,
}

export const fastTransition: Transition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.15,
}

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
  mass: 1,
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: defaultTransition },
  exit: { opacity: 0, transition: fastTransition },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ...defaultTransition, duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: fastTransition },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: defaultTransition },
  exit: { opacity: 0, y: 10, transition: fastTransition },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { ...defaultTransition, duration: 0.15 } },
  exit: { opacity: 0, scale: 0.96, transition: fastTransition },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { ...defaultTransition, duration: 0.2 } },
  exit: { opacity: 0, x: -20, transition: fastTransition },
}

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
  whileTap: { y: 0, transition: { duration: 0.08 } },
}

export const cardHover = {
  whileHover: {
    y: -2,
    boxShadow: '0 8px 30px rgba(124,58,237,0.12)',
    transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
}

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { ...defaultTransition, duration: 0.15 } },
  exit: { opacity: 0, scale: 0.96, y: -10, transition: { duration: 0.1 } },
}

export const sidebarAnimation = {
  collapsed: { width: 64, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  expanded: { width: 224, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
}

export const dropdownAnimation: Variants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -4, scale: 0.98, transition: { duration: 0.1 } },
}

export const listItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  }),
}

export const counterAnimation = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export const buttonGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)',
    transition: { duration: 0.2 },
  },
}
