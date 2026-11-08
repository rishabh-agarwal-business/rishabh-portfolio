import { motion } from 'motion/react';
import { GradientText } from './GradientText';

interface SectionHeaderProps {
    id?: string;
    title: string;
    subtitle?: string;
    centered?: boolean;
    titleClassName?: string;
    subtitleClassName?: string;
}

export function SectionHeader({
    id,
    title,
    subtitle,
    titleClassName = 'text-3xl md:text-4xl',
    subtitleClassName = 'text-base',
    centered = false
}: SectionHeaderProps) {
    return (
        <div className="space-y-3 mb-12">
            <motion.div
                className={`flex items-center gap-3 ${centered ? 'justify-center' : ''
                    }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 id={id} className={`font-bold font-display ${titleClassName}`}>
                    <GradientText>{title}</GradientText>
                </h2>
            </motion.div>

            <motion.div
                aria-hidden="true"
                className={`h-[3px] w-20 rounded-full bg-linear-to-r from-indigo-400 via-cyan-400 to-violet-400 origin-left ${centered ? 'mx-auto origin-center' : ''}`}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

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