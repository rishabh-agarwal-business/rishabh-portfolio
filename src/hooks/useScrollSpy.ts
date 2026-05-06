import { useState, useEffect } from 'react';

export function useScrollSpy(
    sectionIds: string[],
    enabled = true
) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        if (!enabled || sectionIds.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries.filter(e => e.isIntersecting);

                if (visibleSections.length > 0) {
                    const top = visibleSections.sort(
                        (a, b) => b.intersectionRatio - a.intersectionRatio
                    )[0];

                    if (top?.target?.id) {
                        setActiveSection(top.target.id);
                    }
                }
            },
            {
                root: null,
                rootMargin: '-40% 0px -40% 0px',
                threshold: [0.1, 0.25, 0.5, 0.75],
            }
        );

        const elements: HTMLElement[] = [];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) {
                observer.observe(el);
                elements.push(el);
            }
        });

        // ✅ 🔥 FIX: Handle last section (contact)
        const handleScroll = () => {
            const scrollBottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 10;

            if (scrollBottom) {
                setActiveSection(sectionIds[sectionIds.length - 1]);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds, enabled]);

    return activeSection;
}