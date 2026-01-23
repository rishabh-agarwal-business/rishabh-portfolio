import { useState, useEffect } from 'react';

/**
 * Custom hook for scroll spy functionality
 * Follows Single Responsibility Principle - only handles scroll observation
 * Follows Dependency Inversion - provides abstraction for scroll tracking
 */
export function useScrollSpy(sectionIds: string[], offset = '-20% 0px -60% 0px') {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: offset,
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sectionIds, offset]);

    return activeSection;
}
