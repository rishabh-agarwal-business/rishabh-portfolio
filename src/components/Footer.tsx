import { motion } from 'motion/react';

/**
 * Footer component
 * Follows Single Responsibility Principle - only handles footer display
 */
export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-border bg-linear-to-b from-background to-zinc-950/50">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-sm text-muted-foreground">
                        © 2026 Senior Frontend Engineer Portfolio
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Built with React, TypeScript & Tailwind CSS
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};