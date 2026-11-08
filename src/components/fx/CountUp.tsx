import { animate, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/** Animates the numeric part of a value ("7+" → 0…7+) when it scrolls into view. */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const reduce = useReducedMotion();
    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    const [display, setDisplay] = useState(match && !reduce ? `${match[1]}0${match[3]}` : value);

    useEffect(() => {
        if (!match || !inView || reduce) return;
        const [, prefix, num, suffix] = match;
        const target = parseFloat(num);
        const controls = animate(0, target, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, value]);

    return (
        <span ref={ref} aria-label={value}>
            <span aria-hidden="true">{display}</span>
        </span>
    );
}
