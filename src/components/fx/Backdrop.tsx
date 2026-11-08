/** Fixed, decorative page backdrop: faint grid, aurora blobs and film grain. */
export function Backdrop() {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
            <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
            <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-indigo-600/15 blur-[120px] motion-safe:animate-aurora" />
            <div className="absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[120px] motion-safe:animate-aurora [animation-delay:-6s]" />
            <div className="absolute bottom-0 left-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/10 blur-[120px] motion-safe:animate-aurora [animation-delay:-12s]" />
            <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
        </div>
    );
}
