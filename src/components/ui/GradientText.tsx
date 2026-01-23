import type { ReactNode, CSSProperties } from 'react';

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    from?: string;
    via?: string;
    to?: string;
    animate?: boolean;
}

/**
 * Reusable gradient text component
 * Follows Single Responsibility Principle - only handles gradient text rendering
 * Uses inline styles for dynamic gradient colors
 */
export function GradientText({
    children,
    className = '',
    from = '#a1a1aa', // zinc-400
    via = '#d1d5db', // gray-300
    to = '#cbd5e1', // slate-400
    animate = false
}: GradientTextProps) {
    const gradientStyle: CSSProperties = {
        backgroundImage: `linear-gradient(to right, ${from}, ${via}, ${to})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: animate ? '200% 200%' : 'auto',
    };

    const animateClass = animate ? 'animate-gradient' : '';

    return (
        <span
            style={gradientStyle}
            className={`${animateClass} ${className}`}
        >
            {children}
        </span>
    );
}