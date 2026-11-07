import { useState, useEffect } from 'react';

const ACTIVATION_OFFSET = 120;

/**
 * Returns the id of the section currently under the navbar.
 * Scroll handling is passive and throttled to one read per animation frame.
 */
export function useScrollSpy(sectionIds: string[], enabled = true) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!enabled) return;

        let frame = 0;

        const update = () => {
            frame = 0;
            let current = '';

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= ACTIVATION_OFFSET) {
                    current = id;
                }
            }

            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
            if (atBottom && document.getElementById(sectionIds[sectionIds.length - 1])) {
                current = sectionIds[sectionIds.length - 1];
            }

            setActiveSection(current);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [sectionIds, enabled]);

    return activeSection;
}
