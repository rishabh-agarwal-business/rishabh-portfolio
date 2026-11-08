import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * Cycles through words with a CSS slide-in. Uses a plain CSS keyframe (re-triggered by
 * `key`) rather than JS-driven animation, so the word can never get stuck invisible if
 * the main thread or GPU is busy (e.g. while the WebGL hero is rendering).
 * Screen readers get the full list once.
 */
export function RotatingWords({ words, interval = 2600, className = '' }: { words: string[]; interval?: number; className?: string }) {
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (reduce) return;
        const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
        return () => clearInterval(id);
    }, [words.length, interval, reduce]);

    return (
        <span className="relative inline-flex overflow-hidden align-bottom">
            <span className="sr-only">{words.join(', ')}</span>
            <span key={words[i]} aria-hidden="true" className={`inline-block whitespace-nowrap motion-safe:animate-word-in ${className}`}>
                {words[i]}
            </span>
        </span>
    );
}
