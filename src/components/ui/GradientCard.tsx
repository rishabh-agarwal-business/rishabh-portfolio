import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GradientCardProps {
    children: ReactNode;
    hover?: boolean;
    className?: string;
    gradient?: 'subtle' | 'medium' | 'strong';
    onClick?: () => void;
}

/**
 * Reusable gradient card component with hover effects
 * Follows Open/Closed Principle - extensible through gradient variants
 */
export function GradientCard({
    children,
    hover = true,
    className = '',
    gradient = 'medium',
    onClick
}: GradientCardProps) {
    const gradientClasses = {
        subtle: 'bg-gradient-to-r from-zinc-700/10 to-gray-700/10',
        medium: 'bg-gradient-to-r from-zinc-700/20 to-gray-700/20',
        strong: 'bg-gradient-to-r from-zinc-700/40 to-gray-700/40'
    };

    const baseClasses = 'rounded-lg border border-zinc-600/30 backdrop-blur-sm transition-all';
    const hoverClasses = hover ? 'hover:border-zinc-500/50 hover:shadow-lg hover:shadow-zinc-600/10' : '';
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    return (
        <motion.div
            className={`${baseClasses} ${gradientClasses[gradient]} ${hoverClasses} ${clickableClasses} ${className}`}
            onClick={onClick}
            whileHover={hover ? { scale: 1.02 } : undefined}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}