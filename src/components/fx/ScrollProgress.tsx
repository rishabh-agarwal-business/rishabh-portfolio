import { motion, useScroll, useSpring } from 'motion/react';

/** Thin gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-60 h-0.5 origin-left bg-linear-to-r from-indigo-400 via-cyan-400 to-violet-400"
            style={{ scaleX }}
        />
    );
}
