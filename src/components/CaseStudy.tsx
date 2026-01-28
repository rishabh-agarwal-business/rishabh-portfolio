import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Play, Component, Blocks, FileCode, Layers, Palette, Activity, Code2, Package, Shield, Database, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { caseStudies } from '@/data/data';

// Icon mapping for tech stack
const techIcons: Record<string, any> = {
    'React': Component,
    'Redux Toolkit': Layers,
    'Redux': Layers,
    'TypeScript': FileCode,
    'Material UI': Palette,
    'Angular': Blocks,
    'RxJS': Activity,
    'Custom Security Framework': Shield,
    'Web Workers': Activity,
    'Custom Performance Framework': Activity,
    'JavaScript': Code2,
    'Webpack': Package,
    'Node.js': Server,
    'MongoDB': Database,
};

export default function CaseStudy() {
    const { id } = useParams<{ id: string }>();
    const caseStudy = caseStudies.find(cs => cs.id === id);

    if (!caseStudy) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Case Study Not Found</h2>
                    <Link to="/" className="text-primary hover:underline cursor-pointer">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="pt-24 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors cursor-pointer"
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
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl font-semibold font-['Space_Grotesk',sans-serif]">{caseStudy.title}</h1>
                                <span className="px-3 py-1 bg-accent text-sm rounded-full">
                                    {caseStudy.domain}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.techStack.map((tech) => {
                                    const Icon = techIcons[tech] || Code2;
                                    return (
                                        <span key={tech} className="px-3 py-1 bg-secondary text-sm rounded flex items-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors">
                                            <Icon className="w-3.5 h-3.5 text-primary" />
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Demo Video Section */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold font-['Space_Grotesk',sans-serif]">Demo Video</h2>
                            <div className="relative aspect-video bg-accent rounded-lg overflow-hidden border border-border group cursor-pointer">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="flex flex-col items-center gap-4"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Click to watch project demonstration
                                        </p>
                                    </motion.div>
                                </div>
                                {/* Placeholder for actual video - can be replaced with iframe/video element */}
                                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent" />
                            </div>
                        </motion.div>

                        {/* Problem Statement */}
                        <motion.div
                            className="p-6 bg-accent rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Problem Statement</h2>
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
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Business Context</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.businessContext}
                            </p>
                        </motion.div>

                        {/* System Design Highlights */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">
                                System Design Highlights
                            </h2>
                            <div className="grid gap-3">
                                {caseStudy.systemDesignHighlights.map((item, index) => (
                                    <motion.div
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
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">
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
                                        <span className="shrink-0 text-primary font-medium">#{index + 1}</span>
                                        <p className="text-muted-foreground">{scenario}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Technical Architecture */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Technical Architecture</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {caseStudy.technicalArchitecture}
                            </p>
                        </motion.div>

                        {/* Key Challenges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Key Challenges</h2>
                            <div className="grid gap-3">
                                {caseStudy.keyChallenges.map((challenge, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
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
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">Solutions Implemented</h2>
                            <div className="grid gap-3">
                                {caseStudy.solutionsImplemented.map((solution, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex gap-3 p-4 bg-accent rounded-lg cursor-pointer hover:bg-primary/5 transition-colors"
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
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">
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
                        <motion.div
                            className="p-6 bg-accent rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">
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
                            <h2 className="text-xl font-semibold mb-4 font-['Space_Grotesk',sans-serif]">
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
                        <motion.div
                            className="p-6 bg-primary/5 border border-primary/20 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-xl font-semibold mb-6 font-['Space_Grotesk',sans-serif]">Impact & Metrics</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {caseStudy.impactMetrics.map((metric, index) => (
                                    <motion.div
                                        key={index}
                                        className="p-4 bg-background rounded-lg border border-border cursor-pointer hover:border-primary/50 transition-colors"
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
                        <motion.div
                            className="pt-8 border-t border-border"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all cursor-pointer"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                View All Case Studies
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}