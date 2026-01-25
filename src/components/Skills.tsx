import { skills } from "@/data/data";
import { Blocks, Code2, Database, Shield, Sparkles, Wrench, Zap } from "lucide-react"
import { memo, useMemo, useState } from "react"
import { SectionHeader } from "./ui/SectionHeader";
import { AnimatePresence, motion } from "motion/react";
import { GradientCard } from "./ui/GradientCard";
import { GradientText } from "./ui/GradientText";

const categoryIcons: Record<string, any> = {
    'Languages': Code2,
    'Frameworks & Libraries': Blocks,
    'UI & Design Systems': Database,
    'Architecture & Patterns': Wrench,
    'Security & Quality': Shield,
    'Tools & Infrastructure': Zap
}

/**
 * 
 * Skills section component follows single responsibility responsible- only handles display
 */
const Skills = () => {
    const [selectedCategory, setSelectedCategory] = useState(0);

    // convert skills object to array of skill categories
    const skillsArray = useMemo(() => {
        return Object.entries(skills).map(([category, items]) => ({
            category,
            items
        }));
    }, []);

    return (
        <section id="skills" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Skills & Expertise"
                    subtitle="My technical toolkit and areas of mastery"
                />

                {/* Desktop Layout: Sidebar + Content */}
                <div className="hidden md:flex gap-8">
                    {/* Left Sidebar - Category List */}
                    <SkillsSidebar
                        skillsArray={skillsArray}
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />

                    {/* Right Content - Selected Skills Details */}
                    <SkillsContent
                        skill={skillsArray[selectedCategory]}
                        selectedCategory={selectedCategory}
                    />
                </div>

                {/* Mobile Layout: Accordion Cards */}
                <SkillsMobile
                    skillsArray={skillsArray}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </div>
        </section>
    )
}

export default Skills;

/**
 * Skills sidebar component - memoized for performance
 * Follows Single Responsibility Principle
 */
const SkillsSidebar = memo(function SkillsSidebar({
    skillsArray,
    selectedCategory,
    onSelectCategory
}: {
    skillsArray: Array<{ category: string; items: string[] }>;
    selectedCategory: number;
    onSelectCategory: (index: number) => void;
}) {
    return (
        <motion.div
            className="w-64 shrink-0 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {skillsArray.map((skill, index) => {
                const Icon = categoryIcons[skill.category] || Code2;
                return (
                    <motion.button
                        key={index}
                        onClick={() => onSelectCategory(index)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all cursor-pointer ${selectedCategory === index
                            ? 'bg-linear-to-r from-zinc-700/40 to-gray-700/40 border-l-2 border-zinc-500'
                            : 'hover:bg-accent/50 border-l-2 border-transparent'
                            }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Icon className={`w-5 h-5 shrink-0 ${selectedCategory === index ? 'text-zinc-400' : 'text-muted-foreground'
                            }`} />
                        <span className={`text-sm font-medium ${selectedCategory === index ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                            {skill.category}
                        </span>
                    </motion.button>
                );
            })}
        </motion.div>
    );
});

/**
 * Skills content component - memoized for performance
 * Follows Single Responsibility Principle
 */
const SkillsContent = memo(function SkillsContent({
    skill,
    selectedCategory
}: {
    skill: { category: string; items: string[] };
    selectedCategory: number;
}) {
    const Icon = categoryIcons[skill.category] || Code2;

    return (
        <motion.div
            className="flex-1"
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-linear-to-br from-zinc-700/40 to-gray-700/40 border border-zinc-500/50">
                        <Icon className="w-6 h-6 text-zinc-400" />
                    </div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif]">
                        <GradientText>
                            {skill.category}
                        </GradientText>
                    </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                    {skill.items.map((item, idx) => (
                        <SkillPill key={idx} item={item} index={idx} />
                    ))}
                </div>

                {/* Decorative Gradient Element */}
                <GradientCard gradient="subtle" className="mt-8 p-6">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            <span className="text-foreground font-semibold">Expert proficiency</span> in these technologies, with hands-on experience building production-grade applications serving thousands of users.
                        </p>
                    </div>
                </GradientCard>
            </div>
        </motion.div>
    );
});

/**
 * Individual skill pill component - memoized for performance
 */
const SkillPill = memo(function SkillPill({ item, index }: { item: string; index: number }) {
    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
        >
            <div className="absolute inset-0 bg-linear-to-r from-zinc-600/20 via-gray-600/20 to-slate-600/20 rounded-lg blur-sm group-hover:blur-md transition-all opacity-0 group-hover:opacity-100"></div>
            <div className="relative px-4 py-2 text-sm bg-accent/50 border border-border rounded-lg text-foreground hover:border-zinc-500/50 transition-all cursor-pointer backdrop-blur-sm">
                {item}
            </div>
        </motion.div>
    );
});

/**
 * Mobile skills accordion - memoized for performance
 */
const SkillsMobile = memo(function SkillsMobile({
    skillsArray,
    selectedCategory,
    onSelectCategory
}: {
    skillsArray: Array<{ category: string; items: string[] }>;
    selectedCategory: number;
    onSelectCategory: (index: number) => void;
}) {
    return (
        <div className="block md:hidden space-y-4">
            {skillsArray.map((skill, index) => {
                const Icon = categoryIcons[skill.category] || Code2;
                const isOpen = selectedCategory === index;

                return (
                    <motion.div
                        key={index}
                        className={`border border-border rounded-lg overflow-hidden transition-all ${isOpen ? 'bg-linear-to-r from-zinc-700/20 to-gray-700/20' : 'bg-accent/30'
                            }`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <button
                            onClick={() => onSelectCategory(index)}
                            className="w-full flex items-center gap-3 p-4 text-left"
                        >
                            <Icon className={`w-5 h-5 shrink-0 ${isOpen ? 'text-zinc-400' : 'text-muted-foreground'}`} />
                            <span className={`text-base font-semibold font-['Space_Grotesk',sans-serif] ${isOpen ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {skill.category}
                            </span>
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
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="px-3 py-1.5 text-xs bg-background/80 border border-border rounded-md text-foreground"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
});