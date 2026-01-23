import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling functionality
 * Follows Single Responsibility Principle
 */
export function useSmoothScroll() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = useCallback((id: string) => {
        // If not on homepage, navigate to homepage first
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [navigate, location.pathname]);

    return { scrollToSection };
}
