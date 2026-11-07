import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToId } from '@/hooks/useSmoothScroll';

/**
 * Handles scroll position on route changes:
 *  - navigating to a new page starts at the top (instead of keeping the old offset)
 *  - navigating to "/" with a pending section (from another page) scrolls to it
 *  - a hash in the URL (e.g. shared link /#experience) scrolls to that section
 */
export default function ScrollManager() {
    const { hash, state, key } = useLocation();
    const pending = (state as { scrollTo?: string } | null)?.scrollTo;

    useEffect(() => {
        const target = pending ?? (hash ? decodeURIComponent(hash.slice(1)) : '');
        if (target) {
            // wait one frame so the new route has rendered
            requestAnimationFrame(() => scrollToId(target, 'instant'));
            // images/fonts can shift layout on first load; correct once everything has loaded
            if (document.readyState !== 'complete') {
                const onLoad = () => scrollToId(target, 'instant');
                window.addEventListener('load', onLoad, { once: true });
                return () => window.removeEventListener('load', onLoad);
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run on every navigation (key)
    }, [key]);

    return null;
}
