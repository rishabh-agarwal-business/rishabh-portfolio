import { motion } from 'motion/react';
import { Building2, MapPin, Check } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './ui/SectionHeader';
import { experience, type Experience } from '@/data/data';

/**
 * Experience section component
 * Follows Single Responsibility Principle - only handles experience display
 */
export default function Experience() {
    const [selectedCompany, setSelectedCompany] = useState(0);

    return (
        <section id="experience" className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionHeader
                    title="Work Experience"
                    subtitle="I switch a lot of companies. It's mostly about the culture."
                />

                {/* Desktop Layout: Sidebar + Content */}
                <div className="hidden md:flex gap-8">
                    {/* Left Sidebar - Company List */}
                    <ExperienceSidebar
                        experience={experience}
                        selectedCompany={selectedCompany}
                        onSelectCompany={setSelectedCompany}
                    />

                    {/* Right Content - Selected Experience Details */}
                    <ExperienceContent
                        experience={experience[selectedCompany]}
                        selectedCompany={selectedCompany}
                    />
                </div>

                {/* Mobile Layout: Stacked Cards */}
                <div className="block md:hidden space-y-6">
                    {experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border border-border rounded-lg bg-accent/30"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif]">
                                        {exp.role}{' '}
                                        <span className="text-zinc-400">@{exp.company}</span>
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2">{exp.period}</p>
                                    {exp.remote && <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>Remote</span>
                                    </div>}
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {exp.description}
                                </p>
                                <ul className="space-y-2">
                                    {exp.highlights.map((highlight, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-sm text-muted-foreground"
                                        >
                                            <Check className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * ExperienceSidebar component
 * Displays a list of companies with buttons to select them
 */
function ExperienceSidebar({
    experience,
    selectedCompany,
    onSelectCompany,
}: {
    experience: Experience[];
    selectedCompany: number;
    onSelectCompany: (index: number) => void;
}) {
    return (
        <motion.div
            className="w-64 shrink-0 space-y-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {experience.map((exp: Experience, index: number) => (
                <motion.button
                    key={index}
                    onClick={() => onSelectCompany(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all cursor-pointer ${selectedCompany === index
                        ? 'bg-linear-to-r from-zinc-700/40 to-gray-700/40 border-l-2 border-zinc-500'
                        : 'hover:bg-accent/50 border-l-2 border-transparent'
                        }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Building2 className={`w-5 h-5 shrink-0 ${selectedCompany === index ? 'text-zinc-400' : 'text-muted-foreground'
                        }`} />
                    <span className={`text-sm font-medium ${selectedCompany === index ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                        {exp.company}
                    </span>
                </motion.button>
            ))}
        </motion.div>
    );
}

/**
 * ExperienceContent component
 * Displays the details of the selected company's experience
 */
function ExperienceContent({
    experience,
    selectedCompany,
}: {
    experience: Experience[number];
    selectedCompany: number;
}) {
    return (
        <motion.div
            className="flex-1"
            key={selectedCompany}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="space-y-4">
                <div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif]">
                        {experience.role}{' '}
                        <span className="text-zinc-400">@{experience.company}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                        {experience.period}
                    </p>
                    {experience.remote && <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>Remote</span>
                    </div>}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                </p>

                <ul className="space-y-3 pt-2">
                    {experience.highlights.map((highlight: string, idx: number) => (
                        <motion.li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                        >
                            <Check className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
                            <span>{highlight}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}