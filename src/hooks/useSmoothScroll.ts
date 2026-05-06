import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

const NAVBAR_HEIGHT = 80;

export function useSmoothScroll() {
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ Scroll handler (runs AFTER route render)
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');

            let attempts = 0;

            const tryScroll = () => {
                const el = document.getElementById(id);

                if (el) {
                    const y =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        NAVBAR_HEIGHT;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth',
                    });
                } else if (attempts < 10) {
                    attempts++;
                    requestAnimationFrame(tryScroll);
                }
            };

            tryScroll();
        }
    }, [location]);

    // ✅ Navigate OR scroll
    const scrollToSection = useCallback(
        (id: string) => {
            if (location.pathname !== '/') {
                // 👇 push hash → triggers effect after render
                navigate(`/#${id}`);
            } else {
                // 👇 update hash without navigation
                window.history.replaceState(null, '', `#${id}`);

                const el = document.getElementById(id);
                if (el) {
                    const y =
                        el.getBoundingClientRect().top +
                        window.scrollY -
                        NAVBAR_HEIGHT;

                    window.scrollTo({
                        top: y,
                        behavior: 'smooth',
                    });
                }
            }
        },
        [navigate, location.pathname]
    );

    return { scrollToSection };
}