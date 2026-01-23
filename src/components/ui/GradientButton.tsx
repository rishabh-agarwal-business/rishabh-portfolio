import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion, type MotionProps } from 'motion/react';

interface GradientButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    as?: 'button' | 'span';
}

/**
 * Reusable gradient button component with motion animations
 * Follows Open/Closed Principle - extensible through variants
 */
export function GradientButton({
    children,
    variant = 'primary',
    icon,
    iconPosition = 'right',
    fullWidth = false,
    as = 'button',
    className = '',
    ...props
}: GradientButtonProps & MotionProps<HTMLButtonElement>) {
    const baseClasses = 'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all';

    const variantClasses = {
        primary: 'bg-gradient-to-r from-zinc-600 to-gray-700 text-white hover:shadow-lg hover:shadow-zinc-600/30',
        secondary: 'bg-gradient-to-r from-zinc-700/40 to-gray-700/40 text-foreground border border-zinc-500/50',
        outline: 'border-2 border-border hover:bg-accent hover:border-zinc-500/50'
    };

    const widthClass = fullWidth ? 'w-full justify-center' : '';
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`;

    const content = (
        <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </>
    );

    if (as === 'span') {
        return (
            <span className={combinedClasses}>
                {content}
            </span>
        );
    }

    return (
        <motion.button
            className={combinedClasses}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            {...props}
        >
            {content}
        </motion.button>
    );
}