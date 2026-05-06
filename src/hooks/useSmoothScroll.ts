import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

const NAVBAR_HEIGHT = 80;

export function useSmoothScroll() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = useCallback(
        (id: string) => {
            const scroll = () => {
                const el = document.getElementById(id);
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
                // navigate WITHOUT hash
                navigate('/');

                // wait for page render, then scroll
                requestAnimationFrame(() => {
                    requestAnimationFrame(scroll);
                });
            } else {
                scroll();
            }
        },
        [navigate, location.pathname]
    );

    return { scrollToSection };
}
