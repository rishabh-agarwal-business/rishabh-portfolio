/** Infinite, pause-on-hover tech marquee (pure CSS animation, duplicated track). */
export function Marquee({ items }: { items: string[] }) {
    const track = (hidden: boolean) => (
        <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 motion-safe:animate-marquee">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-10 whitespace-nowrap text-lg md:text-2xl font-display font-semibold text-zinc-500 hover:text-zinc-200 transition-colors">
                    {item}
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-linear-to-r from-indigo-400 to-cyan-400" />
                </li>
            ))}
        </ul>
    );
    return (
        <div className="group relative flex overflow-hidden py-6 border-y border-border/60 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] hover:[&>ul]:[animation-play-state:paused]">
            {track(false)}
            {track(true)}
        </div>
    );
}
