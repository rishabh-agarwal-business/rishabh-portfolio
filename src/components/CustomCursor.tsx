import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary';
const SPRING = { stiffness: 500, damping: 28, mass: 0.5 };

/** Only enable on devices with a precise pointer that hover, and when the user hasn't asked for reduced motion */
function canUseCustomCursor() {
    return window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
}

const CustomCursor = () => {
    const [enabled, setEnabled] = useState(canUseCustomCursor);
    const [isHovering, setIsHovering] = useState(false);
    const [visible, setVisible] = useState(false);

    // Motion values update the DOM directly — no React re-render per mousemove
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const ringX = useSpring(x, SPRING);
    const ringY = useSpring(y, SPRING);

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
        const onChange = () => setEnabled(mq.matches);
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const root = document.documentElement;
        root.classList.add('has-custom-cursor');

        const onMove = (e: MouseEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setVisible(true);
        };
        // Event delegation instead of attaching listeners to every element + MutationObserver
        const onOver = (e: MouseEvent) => {
            const target = e.target as Element | null;
            setIsHovering(!!target?.closest?.(INTERACTIVE));
        };
        const onLeave = () => setVisible(false);

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeave);

        return () => {
            root.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.documentElement.removeEventListener('mouseleave', onLeave);
        };
    }, [enabled, x, y]);

    if (!enabled) return null;

    return (
        <div aria-hidden="true" className={`transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
                style={{ x: ringX, y: ringY }}
            >
                <motion.div
                    className="w-10 h-10 border-2 border-white rounded-full"
                    animate={{ scale: isHovering ? 1.5 : 1 }}
                    transition={{ type: 'spring', ...SPRING }}
                />
            </motion.div>

            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference -translate-x-1/2 -translate-y-1/2"
                style={{ x, y }}
            >
                <motion.div
                    className="w-1 h-1 bg-white rounded-full"
                    animate={{ scale: isHovering ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </div>
    );
};

export default CustomCursor;
