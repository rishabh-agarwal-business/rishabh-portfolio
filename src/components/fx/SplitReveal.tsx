import { motion } from 'motion/react';

/** Word-by-word masked rise for headings. Screen readers get the plain text. */
export function SplitReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    const words = text.split(' ');
    return (
        <>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {words.map((word, i) => (
                    <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
                        <motion.span
                            className={`inline-block ${className}`}
                            initial={{ y: '110%' }}
                            animate={{ y: '0%' }}
                            transition={{ duration: 0.8, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {word}
                            {i < words.length - 1 && '\u00A0'}
                        </motion.span>
                    </span>
                ))}
            </span>
        </>
    );
}
