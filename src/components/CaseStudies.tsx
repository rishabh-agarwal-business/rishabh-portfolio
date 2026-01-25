import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, ArrowRight, CheckCircle2, Code2, Target } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './ui/SectionHeader';
import { caseStudies, type CaseStudy } from '@/data/data';
import { GradientText } from './ui/GradientText';
import { GradientCard } from './ui/GradientCard';
import { GradientButton } from './ui/GradientButton';

/**
 * Case Studies section component
 * Follows Single Responsibility Principle - only handles case studies display
 */
export default function CaseStudies() {
    const [selectedProject, setSelectedProject] = useState(0);

    return (
        <section id="case-studies" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Case Studies"
                    subtitle="Selected projects showcasing architecture decisions, problem-solving approaches, and measurable impact."
                    titleClassName="text-3xl md:text-4xl"
                    subtitleClassName="text-lg max-w-2xl"
                />

                {/* Desktop Layout: Sidebar + Content */}
                <div className="hidden md:flex gap-8">
                    {/* Left Sidebar - Project List */}
                    <CaseStudiesSidebar
                        caseStudies={caseStudies}
                        selectedProject={selectedProject}
                        onSelectProject={setSelectedProject}
                    />

                    {/* Right Content - Selected Project Details */}
                    <CaseStudiesContent
                        project={caseStudies[selectedProject]}
                        selectedProject={selectedProject}
                    />
                </div>

                {/* Mobile Layout: Accordion Cards */}
                <CaseStudiesMobile
                    caseStudies={caseStudies}
                    selectedProject={selectedProject}
                    onSelectProject={setSelectedProject}
                />
            </div>
        </section>
    );
}

/**
 * Case studies sidebar component
 * Follows Single Responsibility Principle
 */
function CaseStudiesSidebar({
    caseStudies,
    selectedProject,
    onSelectProject
}: {
    caseStudies: CaseStudy[];
    selectedProject: number;
    onSelectProject: (index: number) => void;
}) {
    return (
        <motion.div
            className="w-80 shrink-0 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {caseStudies.map((project, index) => (
                <motion.button
                    key={project.id}
                    onClick={() => onSelectProject(index)}
                    className={`w-full p-4 rounded-lg text-left transition-all cursor-pointer ${selectedProject === index
                        ? 'bg-linear-to-r from-zinc-700/40 to-gray-700/40 border-l-2 border-zinc-500'
                        : 'hover:bg-accent/50 border-l-2 border-transparent'
                        }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="space-y-2">
                        <div className="flex items-start gap-2">
                            <Briefcase className={`w-4 h-4 mt-0.5 shrink-0 ${selectedProject === index ? 'text-zinc-400' : 'text-muted-foreground'
                                }`} />
                            <h3 className={`text-sm font-semibold font-['Space_Grotesk',sans-serif] leading-tight ${selectedProject === index ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {project.title}
                            </h3>
                        </div>
                        <p className={`text-xs ${selectedProject === index ? 'text-zinc-400' : 'text-muted-foreground'
                            }`}>
                            {project.domain}
                        </p>
                    </div>
                </motion.button>
            ))}
        </motion.div>
    );
}

/**
 * Case studies content component
 * Follows Single Responsibility Principle
 */
function CaseStudiesContent({
    project,
    selectedProject
}: {
    project: CaseStudy;
    selectedProject: number;
}) {
    return (
        <motion.div
            className="flex-1"
            key={selectedProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif]">
                            <GradientText>
                                {project.title}
                            </GradientText>
                        </h3>
                        <span className="inline-block text-xs px-3 py-1 bg-linear-to-r from-zinc-700/40 to-gray-700/40 border border-zinc-600/30 text-zinc-300 rounded-full">
                            {project.domain}
                        </span>
                    </div>
                </div>

                {/* Short Description */}
                <p className="text-muted-foreground leading-relaxed">
                    {project.shortDescription}
                </p>

                {/* Tech Stack */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Code2 className="w-4 h-4 text-zinc-400" />
                        <h4 className="text-sm font-semibold font-['Space_Grotesk',sans-serif]">Tech Stack</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (
                            <motion.div
                                key={tech}
                                className="relative group"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-zinc-600/20 via-gray-600/20 to-slate-600/20 rounded-lg blur-sm group-hover:blur-md transition-all opacity-0 group-hover:opacity-100"></div>
                                <div className="relative px-3 py-1.5 text-xs bg-accent/50 border border-border rounded-lg text-foreground hover:border-zinc-500/50 transition-all cursor-pointer backdrop-blur-sm">
                                    {tech}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Key Outcomes */}
                <GradientCard gradient="subtle" className="p-5">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-zinc-400" />
                            <h4 className="text-sm font-semibold font-['Space_Grotesk',sans-serif]">Key Outcomes</h4>
                        </div>
                        <ul className="space-y-2">
                            {project.keyOutcomes.map((outcome) => (
                                <li key={outcome} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                                    <span>{outcome}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </GradientCard>

                {/* View Full Case Study Button */}
                <div className="pt-2">
                    <Link to={`/case-study/${project.id}`}>
                        <GradientButton size="default" className="group/btn">
                            <span>View Full Case Study</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </GradientButton>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Mobile case studies accordion
 */
function CaseStudiesMobile({
    caseStudies,
    selectedProject,
    onSelectProject
}: {
    caseStudies: CaseStudy[];
    selectedProject: number;
    onSelectProject: (index: number) => void;
}) {
    return (
        <div className="block md:hidden space-y-4">
            {caseStudies.map((project, index) => {
                const isOpen = selectedProject === index;

                return (
                    <motion.div
                        key={project.id}
                        className={`border border-border rounded-lg overflow-hidden transition-all ${isOpen ? 'bg-linear-to-r from-zinc-700/20 to-gray-700/20' : 'bg-accent/30'
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <button
                            onClick={() => onSelectProject(index)}
                            className="w-full p-4 text-left"
                        >
                            <div className="space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-2 flex-1">
                                        <Briefcase className={`w-4 h-4 mt-0.5 shrink-0 ${isOpen ? 'text-zinc-400' : 'text-muted-foreground'}`} />
                                        <h3 className={`text-base font-semibold font-['Space_Grotesk',sans-serif] ${isOpen ? 'text-foreground' : 'text-muted-foreground'
                                            }`}>
                                            {project.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className={`text-xs ml-6 ${isOpen ? 'text-zinc-400' : 'text-muted-foreground'
                                    }`}>
                                    {project.domain}
                                </p>
                            </div>
                        </button>

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-4 pb-4"
                                >
                                    <div className="space-y-4">
                                        {/* Short Description */}
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {project.shortDescription}
                                        </p>

                                        {/* Tech Stack */}
                                        <div>
                                            <h4 className="text-xs font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.map((tech) => (
                                                    <span key={tech} className="text-xs px-2 py-1 bg-background/80 border border-border rounded-md text-foreground">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Key Outcomes */}
                                        <div>
                                            <h4 className="text-xs font-semibold mb-2 font-['Space_Grotesk',sans-serif]">Key Outcomes</h4>
                                            <ul className="space-y-1.5">
                                                {project.keyOutcomes.map((outcome) => (
                                                    <li key={outcome} className="flex items-start gap-2 text-xs text-muted-foreground">
                                                        <CheckCircle2 className="w-3 h-3 text-zinc-400 mt-0.5 shrink-0" />
                                                        <span>{outcome}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* View Case Study Link */}
                                        <Link
                                            to={`/case-study/${project.id}`}
                                            className="inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-zinc-100 transition-all pt-2"
                                        >
                                            View Full Case Study
                                            <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}