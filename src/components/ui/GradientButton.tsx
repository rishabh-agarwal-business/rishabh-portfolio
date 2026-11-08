import { memo, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import { motion } from 'motion/react';

type Variant = 'primary' | 'secondary' | 'outline';

const VARIANT_CLASSES: Record<Variant, string> = {
    primary: 'bg-linear-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-[background-position,box-shadow] duration-500',
    secondary: 'bg-linear-to-r from-zinc-700/40 to-gray-700/40 text-foreground border border-zinc-500/50',
    outline: 'border-2 border-border hover:bg-accent hover:border-zinc-500/50',
};

const BASE_CLASSES =
    'inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 min-h-[44px] sm:min-h-[48px] ' +
    'text-sm sm:text-base rounded-lg font-semibold cursor-pointer transition-[box-shadow,background-color,border-color] ' +
    'whitespace-nowrap touch-manipulation select-none';

interface CommonProps {
    children: ReactNode;
    variant?: Variant;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    className?: string;
}

type ButtonProps = CommonProps & { as?: 'button' } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>;
type AnchorProps = CommonProps & { as: 'a' } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'>;
/** Visual-only: use inside an existing <a>/<Link> to avoid nesting interactive elements */
type SpanProps = CommonProps & { as: 'span' };

type GradientButtonProps = ButtonProps | AnchorProps | SpanProps;

const hoverProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.96 },
    transition: { duration: 0.2 },
};

export const GradientButton = memo(function GradientButton(props: GradientButtonProps) {
    const { children, variant = 'primary', icon, iconPosition = 'right', fullWidth = false, className = '' } = props;

    const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;
    const content = (
        <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
        </>
    );

    if (props.as === 'span') {
        return <span className={classes}>{content}</span>;
    }

    if (props.as === 'a') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { as, children: _c, variant: _v, icon: _i, iconPosition: _p, fullWidth: _f, className: _cl, ...rest } = props;
        return (
            <motion.a className={classes} {...hoverProps} {...rest}>
                {content}
            </motion.a>
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as, children: _c, variant: _v, icon: _i, iconPosition: _p, fullWidth: _f, className: _cl, ...rest } = props;
    return (
        <motion.button type="button" className={classes} {...hoverProps} {...rest}>
            {content}
        </motion.button>
    );
});
