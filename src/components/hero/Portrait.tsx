import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { PointerEvent } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import portfolio400 from '@/assets/portfolio-400.webp';
import portfolio800 from '@/assets/portfolio-800.webp';

const CHIPS = [
    { label: 'React', className: '-left-6 top-10', delay: 0 },
    { label: 'TypeScript', className: '-right-8 top-24', delay: 0.8 },
    { label: 'NestJS', className: '-left-10 bottom-28', delay: 1.6 },
    { label: 'AWS', className: '-right-4 bottom-12', delay: 2.4 },
];

/** Portrait with an animated gradient frame, 3D pointer tilt, glare and floating tech chips. */
export function Portrait({ alt }: { alt: string }) {
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const sx = useSpring(px, { stiffness: 150, damping: 18 });
    const sy = useSpring(py, { stiffness: 150, damping: 18 });
    const rotateY = useTransform(sx, [0, 1], [-10, 10]);
    const rotateX = useTransform(sy, [0, 1], [8, -8]);
    const glareX = useTransform(sx, [0, 1], ['0%', '100%']);
    const glareY = useTransform(sy, [0, 1], ['0%', '100%']);
    const glare = useTransform(
        [glareX, glareY],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), transparent 55%)`
    );

    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
    };
    const reset = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <div className="relative mx-auto w-full max-w-sm [perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset}>
            {/* glow */}
            <div aria-hidden="true" className="absolute -inset-10 rounded-[3rem] bg-indigo-500/20 blur-3xl motion-safe:animate-pulse-slow" />

            <motion.div className="relative" style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
                {/* animated gradient frame */}
                <div className="relative rounded-[1.75rem] p-[2px] overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="absolute inset-[-50%] motion-safe:animate-spin-slow bg-[conic-gradient(from_0deg,#818cf8,#22d3ee,#a78bfa,#f472b6,#818cf8)]"
                    />
                    <div className="relative overflow-hidden rounded-[1.65rem] bg-zinc-950">
                        <ImageWithFallback
                            src={portfolio800}
                            srcSet={`${portfolio400} 400w, ${portfolio800} 800w`}
                            sizes="(max-width: 640px) 90vw, 384px"
                            width={800}
                            height={1000}
                            loading="eager"
                            fetchPriority="high"
                            alt={alt}
                            className="block w-full h-auto"
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />
                        <motion.div aria-hidden="true" className="absolute inset-0 mix-blend-overlay" style={{ background: glare }} />
                    </div>
                </div>

                {/* floating chips (pushed forward in 3D space) */}
                {CHIPS.map((chip) => (
                    <motion.span
                        key={chip.label}
                        aria-hidden="true"
                        className={`absolute hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-200 shadow-lg shadow-black/40 backdrop-blur-md ${chip.className}`}
                        style={{ z: 60 }}
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-indigo-400 to-cyan-400" />
                        {chip.label}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
