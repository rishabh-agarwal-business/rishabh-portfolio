import { Fragment } from 'react';
import { ArrowDown } from 'lucide-react';
import type { ArchitectureLayer } from '@/data/data';

/** Layered request-flow diagram (client → edge → app → data), built from data. */
export function ArchitectureDiagram({ layers, compact = false }: { layers: ArchitectureLayer[]; compact?: boolean }) {
    return (
        <figure aria-label="Layered system architecture" className="flex flex-col">
            {layers.map((layer, i) => (
                <Fragment key={layer.label}>
                    <div
                        className={`grid ${compact ? 'grid-cols-[88px_1fr] gap-3' : 'sm:grid-cols-[140px_1fr] gap-2 sm:gap-4'} items-center`}
                    >
                        <span
                            className={`font-semibold uppercase tracking-wider text-zinc-400 ${compact ? 'text-[10px]' : 'text-xs'}`}
                        >
                            {layer.label}
                        </span>
                        <ul className="flex flex-wrap gap-1.5">
                            {layer.items.map((item) => (
                                <li
                                    key={item}
                                    className={`rounded-md border border-zinc-600/40 bg-zinc-800/60 text-zinc-200 ${compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-sm'}`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {i < layers.length - 1 && (
                        <div
                            aria-hidden="true"
                            className={`flex ${compact ? 'pl-[100px] py-1' : 'sm:pl-[156px] py-2'} text-zinc-600`}
                        >
                            <ArrowDown className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                        </div>
                    )}
                </Fragment>
            ))}
        </figure>
    );
}
