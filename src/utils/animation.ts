/**
 * Animation utility constants and configurations
 * Follows DRY principle - centralized animation configurations
 */

export const ANIMATION_DURATION = {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8
} as const;

export const EASING = {
    easeOut: 'easeOut',
    easeIn: 'easeIn',
    easeInOut: 'easeInOut',
    spring: { type: 'spring', stiffness: 380, damping: 30 }
} as const;

export const FADE_IN_UP = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: ANIMATION_DURATION.slow }
};

export const FADE_IN = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: ANIMATION_DURATION.normal }
};

export const SCALE_ON_HOVER = {
    whileHover: { scale: 1.02 },
    transition: { duration: ANIMATION_DURATION.fast }
};

export const STAGGER_CHILDREN = (delayMultiplier: number = 0.1) => ({
    transition: {
        staggerChildren: delayMultiplier
    }
});

export const createStaggerDelay = (index: number, baseDelay: number = 0.05) => ({
    transition: {
        duration: ANIMATION_DURATION.slow,
        delay: index * baseDelay
    }
});
