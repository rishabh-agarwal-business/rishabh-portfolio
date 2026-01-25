import { useState, useEffect } from 'react';

export function useScrollSpy(
    sectionIds: string[],
    offset = '-20% 0px -60% 0px',
    enabled = true
) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!enabled || sectionIds.length === 0) return;

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: offset,
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                    break; // important: prevent unnecessary state updates
                }
            }
        }, observerOptions);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds, offset, enabled]);

    return activeSection;
}
