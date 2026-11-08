import { useParams, Link } from 'react-router';
import { ArrowLeft, ArrowRight, ExternalLink, Activity, Blocks, CheckCircle2, Cloud, Code2, Component, CreditCard, Database, FileCode, Layers, Package, Palette, Server, Shield, Sparkles, Workflow, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { caseStudies, profile } from '@/data/data';
import NotFound from './NotFound';
import ProjectLinks from './common/ProjectLinks';
import { GradientText } from './ui/GradientText';
import { ArchitectureDiagram } from './ArchitectureDiagram';

const techIcons: [RegExp, LucideIcon][] = [
    [/react flow|canvas/i, Workflow],
    [/react/i, Component],
    [/typescript|zod/i, FileCode],
    [/tailwind|css|ui/i, Palette],
    [/zustand|query|redux/i, Layers],
    [/postgres|drizzle|sql/i, Database],
    [/redis|bullmq|queue/i, Activity],
    [/nest|fastify|node/i, Server],
    [/aws|docker|caddy|cdk/i, Cloud],
    [/claude|ai|anthropic/i, Sparkles],
    [/razorpay|stripe/i, CreditCard],
    [/codemirror|editor/i, Code2],
    [/vite|webpack/i, Package],
    [/auth|security/i, Shield],
];

const iconFor = (tech: string) => techIcons.find(([re]) => re.test(tech))?.[1] ?? Blocks;

export default function CaseStudy() {
    const { id } = useParams<{ id: string }>();
    const index = caseStudies.findIndex(cs => cs.id === id);
    const caseStudy = caseStudies[index];

    if (!caseStudy) return <NotFound />;

    const next = caseStudies[(index + 1) % caseStudies.length];

    return (
        <article data-scene="grid" className="min-h-screen">
            <title>{`${caseStudy.title} — Case Study | ${profile.name}`}</title>
            <meta name="description" content={caseStudy.shortDescription} />
            <div className="pt-24 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            to="/"
                            state={{ scrollTo: 'case-studies' }}
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Link>
                    </motion.div>

                    <div className="space-y-12">
                        {/* Header */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                {caseStudy.status && (
                                    <span className="text-xs px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                                        {caseStudy.status}
                                    </span>
                                )}
                                <span className="text-xs px-3 py-1 bg-accent rounded-full">{caseStudy.domain}</span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl md:text-5xl font-bold font-display">
                                    <GradientText>{caseStudy.title}</GradientText>
                                </h1>
                                <ProjectLinks
                                    projectName={caseStudy.title}
                                    repoLink={caseStudy.repoLink}
                                    demoLink={caseStudy.demoLink}
                                    youtubeLink={caseStudy.youtubeLink}
                                    size={22}
                                />
                            </div>
                            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">{caseStudy.tagline}</p>
                            <p className="text-sm text-muted-foreground">
                                <span className="text-zinc-300 font-medium">Role:</span> {caseStudy.role}
                            </p>
                            <p className="text-muted-foreground leading-relaxed">{caseStudy.shortDescription}</p>
                            {caseStudy.demoLink && (
                                <a
                                    href={caseStudy.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 hover:text-white underline-offset-4 hover:underline"
                                >
                                    Visit {new URL(caseStudy.demoLink).hostname}
                                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                </a>
                            )}
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.techStack.map((tech) => {
                                    const Icon = iconFor(tech);
                                    return (
                                        <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded flex items-center gap-2">
                                            <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* By the numbers */}
                        <motion.dl
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {caseStudy.highlights.map((h) => (
                                <div key={h.label} className="flex flex-col rounded-xl border border-zinc-600/30 bg-linear-to-br from-zinc-800/40 to-zinc-900/40 p-4">
                                    <dt className="text-xs text-muted-foreground leading-snug">{h.label}</dt>
                                    <dd className="order-first text-2xl md:text-3xl font-bold font-display text-foreground">{h.value}</dd>
                                </div>
                            ))}
                        </motion.dl>

                        {/* Problem Statement */}
                        <motion.div
                            className="p-6 bg-accent rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">Problem Statement</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.problemStatement}
                            </p>
                        </motion.div>

                        {/* Business Context */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">Business Context</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.businessContext}
                            </p>
                        </motion.div>

                        {/* Technical Architecture */}
                        <motion.div data-scene="layers"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">Technical Architecture</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {caseStudy.technicalArchitecture}
                            </p>
                            <div className="rounded-xl border border-border bg-accent/40 p-5">
                                <ArchitectureDiagram layers={caseStudy.architecture} />
                            </div>
                        </motion.div>

                        {/* System Design Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">
                                System Design Highlights
                            </h2>
                            <div className="grid gap-3">
                                {caseStudy.systemDesignHighlights.map((item, index) => (
                                    <motion.div data-scene="helix"
                                        key={index}
                                        className="p-4 border border-border rounded-lg bg-background hover:border-primary/40 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <p className="text-muted-foreground">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Failure Scenarios Handled */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">
                                Failure Scenarios Handled
                            </h2>
                            <div className="grid gap-3">
                                {caseStudy.failureScenariosHandled.map((scenario, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-primary/5 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{scenario}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Key Challenges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">Key Challenges</h2>
                            <div className="grid gap-3">
                                {caseStudy.keyChallenges.map((challenge, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-sm font-medium">
                                            {index + 1}
                                        </div>
                                        <p className="text-muted-foreground">{challenge}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Solutions Implemented */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">Solutions Implemented</h2>
                            <div className="grid gap-3">
                                {caseStudy.solutionsImplemented.map((solution, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 bg-accent rounded-lg hover:bg-primary/5 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{solution}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Performance Optimizations */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">
                                Performance Optimizations
                            </h2>
                            <div className="grid gap-3">
                                {caseStudy.performanceOptimizations.map((opt, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 border border-border rounded-lg hover:border-primary/40 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                        <p className="text-muted-foreground">{opt}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Tradeoffs & Decisions */}
                        <motion.div data-scene="icosahedron"
                            className="p-6 bg-accent rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">
                                Tradeoffs & Key Decisions
                            </h2>
                            <ul className="space-y-3">
                                {caseStudy.tradeoffsAndDecisions.map((tradeoff, index) => (
                                    <li key={index} className="text-muted-foreground leading-relaxed">
                                        • {tradeoff}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Future Enhancements */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-display">
                                Future Enhancements
                            </h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                {caseStudy.futureEnhancements.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-background border border-border rounded-lg hover:border-primary/40 transition-colors"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <p className="text-muted-foreground">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Impact & Metrics */}
                        <motion.div data-scene="portal"
                            className="p-6 bg-primary/5 border border-primary/20 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-6 font-display">Impact & Metrics</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {caseStudy.impactMetrics.map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        <p className="font-medium text-foreground">{metric}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Navigation */}
                        <motion.nav
                            aria-label="Case study navigation"
                            className="pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/"
                                state={{ scrollTo: 'case-studies' }}
                                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                                Back to portfolio
                            </Link>
                            {next && next.id !== caseStudy.id && (
                                <Link
                                    to={`/case-study/${next.id}`}
                                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:gap-3 transition-all sm:text-right"
                                >
                                    <span>
                                        <span className="block text-xs uppercase tracking-wider">Next case study</span>
                                        <span className="text-foreground">{next.title}</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                                </Link>
                            )}
                        </motion.nav>
                    </div>
                </div>
            </div>
        </article>
    );
}