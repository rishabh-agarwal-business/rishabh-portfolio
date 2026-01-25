import { Database, Shield, Zap, Blocks } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './ui/SectionHeader';
import { GradientCard } from './ui/GradientCard';

/**
 * Architecture section component
 * Follows Single Responsibility Principle - only handles architecture principles display
 */
export default function Architecture() {
    const principles = [
        {
            icon: Database,
            title: 'State Management',
            description: 'Expertise in Redux, Redux Toolkit, and RxJS for predictable state patterns and complex async flows.'
        },
        {
            icon: Zap,
            title: 'Performance Optimization',
            description: 'Code splitting, lazy loading, memoization, and Web Workers for optimal application performance.'
        },
        {
            icon: Shield,
            title: 'Security & RBAC',
            description: 'Implementation of role-based access control, data encryption, and compliance with industry standards.'
        },
        {
            icon: Blocks,
            title: 'Scalable Architecture',
            description: 'Modular component design, separation of concerns, and maintainable code structures for enterprise apps.'
        }
    ];

    return (
        <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Architecture & Engineering Approach"
                    subtitle="Core principles and methodologies that drive technical decision-making and solution design."
                    titleClassName="text-3xl md:text-4xl"
                    subtitleClassName="text-lg max-w-2xl"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <GradientCard hover gradient="medium" className="p-6 h-full">
                                <div className="flex items-start gap-4">
                                    <motion.div
                                        className="p-3 rounded-lg bg-linear-to-br from-zinc-700/40 to-gray-700/40 border border-zinc-500/50 shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <principle.icon className="w-6 h-6 text-zinc-400" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk',sans-serif]">
                                            {principle.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {principle.description}
                                        </p>
                                    </div>
                                </div>
                            </GradientCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}