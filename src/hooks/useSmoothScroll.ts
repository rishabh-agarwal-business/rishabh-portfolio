import { useNavigate, useLocation } from 'react-router';
import { useCallback } from 'react';

const NAVBAR_OFFSET = 80;

export function scrollToId(id: string, behavior: ScrollBehavior = 'smooth') {
    const el = document.getElementById(id);
    if (!el) return false;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? 'instant' : behavior });
    return true;
}

export function useSmoothScroll() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const scrollToSection = useCallback((id: string) => {
        if (pathname !== '/') {
            // ScrollManager picks this up once the home route has rendered
            navigate('/', { state: { scrollTo: id } });
            return;
        }
        scrollToId(id);
    }, [navigate, pathname]);

    return { scrollToSection };
}
