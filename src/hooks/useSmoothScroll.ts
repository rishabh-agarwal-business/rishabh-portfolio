import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

const NAVBAR_HEIGHT = 80;

export function useSmoothScroll() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = useCallback((id: string) => {

        const scroll = (retry = 0) => {
            const el = document.getElementById(id);

            // 🔥 Retry until lazy component mounts
            if (!el && retry < 10) {
                setTimeout(() => scroll(retry + 1), 100);
                return;
            }

            if (!el) return;

            const y =
                el.getBoundingClientRect().top +
                window.scrollY -
                NAVBAR_HEIGHT;

            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        };

        if (location.pathname !== '/') {
            navigate('/');

            // wait for route + lazy render
            setTimeout(() => scroll(), 200);
        } else {
            scroll();
        }

    }, [navigate, location.pathname]);

    return { scrollToSection };
}