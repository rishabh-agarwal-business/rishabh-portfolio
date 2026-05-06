import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { GradientText } from './GradientText';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    icon?: ReactNode;
    centered?: boolean;
    titleClassName?: string;
    subtitleClassName?: string;
}

export function SectionHeader({
    title,
    subtitle,
    icon,
    titleClassName = 'text-3xl md:text-4xl',
    subtitleClassName = 'text-base',
    centered = false
}: SectionHeaderProps) {
    return (
        <div className="space-y-2 mb-12">
            <motion.div
                className={`flex items-center gap-3 ${centered ? 'justify-center' : ''
                    }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                {icon && (
                    <div className="p-3 rounded-lg bg-linear-to-br from-zinc-700/40 to-gray-700/40 border border-zinc-500/50">
                        {icon}
                    </div>
                )}
                <h2 className={`font-bold font-['Space_Grotesk',sans-serif] ${titleClassName}`}>
                    <GradientText>{title}</GradientText>
                </h2>
            </motion.div>

            {subtitle && (
                <motion.p
                    className={`text-muted-foreground ${subtitleClassName}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}