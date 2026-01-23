import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { GradientText } from './ui/GradientText';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { GradientButton } from './ui/GradientButton';
import { ImageWithFallback } from './ImageWithFallback';

/**
 * Hero section component
 * Follows Single Responsibility Principle - only handles hero section display
 * Uses React.memo for performance optimization
 */
export const Hero = () => {
    const { scrollToSection } = useSmoothScroll();

    return (
        <section id="about" className="pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight font-['Space_Grotesk',sans-serif]">
                                <GradientText animate>
                                    Senior Frontend Engineer
                                </GradientText>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-xl md:text-2xl font-semibold font-['Space_Grotesk',sans-serif]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <GradientText from="#9ca3af" via="#d1d5db" to="#cbd5e1">
                                6+ Years of Experience
                            </GradientText>
                        </motion.p>

                        <motion.p
                            className="text-lg text-muted-foreground leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            Building{" "}
                            <span className="font-semibold text-foreground">
                                enterprise-scale applications
                            </span>{" "}
                            with React, Angular, and TypeScript. Specialized
                            in{" "}
                            <span className="font-semibold text-foreground">
                                healthcare, fintech,
                            </span>{" "}
                            and{" "}
                            <span className="font-semibold text-foreground">
                                high-performance
                            </span>{" "}
                            web applications.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <GradientButton
                                onClick={() => scrollToSection('case-studies')}
                                icon={<ArrowRight className="w-4 h-4" />}
                            >
                                View Case Studies
                            </GradientButton>

                            <GradientButton
                                variant="outline"
                                icon={<Download className="w-4 h-4" />}
                                iconPosition="left"
                            >
                                Download Resume
                            </GradientButton>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Developer Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        <motion.div
                            className="relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.3 },
                            }}
                        >
                            <ImageWithFallback
                                src="https://avatars.githubusercontent.com/u/198452371?v=4"
                                alt="Developer workspace"
                                className="w-full h-auto"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* About Section - Integrated Below */}
                <motion.div
                    className="max-w-4xl mx-auto space-y-4 text-lg text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        Senior Frontend Engineer with{" "}
                        <span className="font-semibold text-foreground">
                            6+ years of experience
                        </span>{" "}
                        building scalable, high-performance web applications
                        for enterprise clients in{" "}
                        <span className="font-semibold text-foreground">
                            healthcare, fintech, and SaaS
                        </span>{" "}
                        industries.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        Specialized in architecting complex{" "}
                        <span className="font-semibold text-foreground">
                            React and Angular
                        </span>{" "}
                        applications with a focus on{" "}
                        <span className="font-semibold text-foreground">
                            performance optimization, security, and
                            maintainability
                        </span>
                        . Expert in state management patterns, implementing
                        role-based access control, and ensuring regulatory
                        compliance{" "}
                        <span className="font-semibold text-foreground">
                            (HIPAA, SOC 2, PCI DSS)
                        </span>
                        .
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    >
                        Proven track record of delivering{" "}
                        <span className="font-semibold text-foreground">
                            mission-critical applications
                        </span>{" "}
                        that serve hundreds of thousands of users while
                        maintaining{" "}
                        <span className="font-semibold text-foreground">
                            enterprise-grade security standards
                        </span>{" "}
                        and exceptional user experiences.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}