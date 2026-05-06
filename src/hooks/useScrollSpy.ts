import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], enabled = true) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!enabled) return;

        const handleScroll = () => {
            let current = '';

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;

                const rect = el.getBoundingClientRect();

                if (rect.top <= 120) {
                    current = id;
                }
            }

            // 🔥 Fix last section (contact)
            const isBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 5;

            if (isBottom) {
                current = sectionIds[sectionIds.length - 1];
            }

            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll(); // initial

        return () => window.removeEventListener('scroll', handleScroll);
    }, [sectionIds, enabled]);

    return activeSection;
}