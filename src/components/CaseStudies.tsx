import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ExternalLink, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { SectionHeader } from './ui/SectionHeader';
import { GradientText } from './ui/GradientText';
import { GradientButton } from './ui/GradientButton';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { caseStudies, type CaseStudy } from '@/data/data';

export default function CaseStudies() {
    return (
        <section id="case-studies" aria-labelledby="case-studies-title" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    id="case-studies-title"
                    title={caseStudies.length === 1 ? 'Featured Project' : 'Case Studies'}
                    subtitle="A product I designed, built and launched end to end — architecture decisions, trade-offs and how it runs in production."
                    titleClassName="text-3xl md:text-4xl"
                    subtitleClassName="text-lg max-w-2xl"
                />

                <div className="space-y-10">
                    {caseStudies.map((project) => (
                        <FeaturedProject key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturedProject({ project }: { project: CaseStudy }) {
    return (
        <motion.article
            aria-labelledby={`${project.id}-title`}
            className="relative overflow-hidden rounded-2xl border border-zinc-600/30 bg-linear-to-br from-zinc-800/40 via-zinc-900/40 to-zinc-950/60 p-6 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
        >
            {/* soft glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl"
            />

            <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-10">
                {/* Left: story */}
                <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-2">
                        {project.status && (
                            <span className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </span>
                                {project.status}
                            </span>
                        )}
                        <span className="text-xs px-3 py-1 rounded-full border border-zinc-600/30 bg-zinc-700/30 text-zinc-300">
                            {project.domain}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <h3 id={`${project.id}-title`} className="text-3xl md:text-4xl font-bold font-display">
                            <GradientText>{project.title}</GradientText>
                        </h3>
                        <p className="text-lg text-foreground/90 leading-relaxed">{project.tagline}</p>
                        <p className="text-sm text-muted-foreground">
                            <span className="text-zinc-300 font-medium">Role:</span> {project.role}
                        </p>
                    </div>

                    <ul className="space-y-2.5">
                        {project.keyOutcomes.map((outcome) => (
                            <li key={outcome} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" aria-hidden="true" />
                                <span>{outcome}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link to={`/case-study/${project.id}`} className="group/btn inline-block rounded-lg">
                            <GradientButton as="span">
                                <span>Read the case study</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                            </GradientButton>
                        </Link>
                        {project.demoLink && (
                            <GradientButton
                                as="a"
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                icon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
                            >
                                Visit {new URL(project.demoLink).hostname}
                            </GradientButton>
                        )}
                    </div>
                </div>

                {/* Right: numbers + architecture */}
                <div className="space-y-6">
                    <dl className="grid grid-cols-2 gap-3">
                        {project.highlights.map((h) => (
                            <div key={h.label} className="flex flex-col rounded-xl border border-zinc-600/30 bg-background/40 p-4">
                                <dt className="text-xs text-muted-foreground leading-snug">{h.label}</dt>
                                <dd className="order-first text-2xl font-bold font-display text-foreground">{h.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="rounded-xl border border-zinc-600/30 bg-background/40 p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                            Architecture at a glance
                        </p>
                        <ArchitectureDiagram layers={project.architecture} compact />
                    </div>
                </div>
            </div>

            {/* Stack */}
            <div className="relative mt-8 pt-6 border-t border-zinc-700/40">
                <h4 className="sr-only">Tech stack</h4>
                <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <li
                            key={tech}
                            className="px-3 py-1.5 text-xs bg-accent/50 border border-border rounded-lg text-foreground"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.article>
    );
}
