import { memo, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
    primary: 'bg-gradient-to-r from-zinc-600 to-gray-700 text-white hover:shadow-lg hover:shadow-zinc-600/30',
    secondary: 'bg-gradient-to-r from-zinc-700/40 to-gray-700/40 text-foreground border border-zinc-500/50',
    outline: 'border-2 border-border hover:bg-accent hover:border-zinc-500/50'
};

interface GradientButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'as'> {
    children: ReactNode;
    variant?: Variant;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    as?: 'button' | 'span';
}

export const GradientButton = memo(function GradientButton({
    children,
    variant = 'primary',
    icon,
    iconPosition = 'right',
    fullWidth = false,
    as = 'button',
    className = '',
    ...props
}: GradientButtonProps & MotionProps) {

    const baseClasses = `
inline-flex items-center justify-center
gap-1.5 sm:gap-2
px-4 sm:px-6
min-h-[44px] sm:min-h-[48px]
text-sm sm:text-base
rounded-lg font-semibold
cursor-pointer transition-all
whitespace-nowrap
touch-manipulation
`;

    const widthClass = fullWidth ? 'w-full justify-center' : '';
    const combinedClasses = `${baseClasses} ${VARIANT_CLASSES[variant]} ${widthClass} ${className}`;

    const content = (
        <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </>
    );

    if (as === 'span') {
        return <span className={combinedClasses}>{content}</span>;
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
});