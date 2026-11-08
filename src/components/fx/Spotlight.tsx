import { useRef, type PointerEvent, type ReactNode } from 'react';

/**
 * Wraps content in a card whose border and surface light up under the pointer.
 * Uses CSS variables only — no React state updates on pointer move.
 */
export function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    return (
        <div ref={ref} onPointerMove={onMove} className={`spotlight group/spot relative ${className}`}>
            {children}
        </div>
    );
}
