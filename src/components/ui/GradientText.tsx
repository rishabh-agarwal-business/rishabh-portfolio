import type { ReactNode } from 'react';

/** Soft silver gradient text used for headings. */
export function GradientText({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <span className={`bg-linear-to-r from-zinc-400 via-gray-300 to-slate-300 bg-clip-text text-transparent ${className}`}>
            {children}
        </span>
    );
}
