import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        // Add event listeners to interactive elements
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], .cursor-hover, input, textarea, select, .cursor-pointer'
            );

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        // Initial setup
        addHoverListeners();

        // Re-add listeners when DOM changes
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        window.addEventListener('mousemove', updatePosition);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('resize', checkMobile);
            observer.disconnect();

            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], .cursor-hover, input, textarea, select, .cursor-pointer'
            );
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <>
            {/* Main cursor ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
                animate={{
                    x: position.x - 20,
                    y: position.y - 20,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div className="w-10 h-10 border-2 border-white rounded-full" />
            </motion.div>

            {/* Small dot in center */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
                animate={{
                    x: position.x - 2,
                    y: position.y - 2,
                    scale: isHovering ? 0 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div className="w-1 h-1 bg-white rounded-full" />
            </motion.div>
        </>
    );
}

export default CustomCursor;
