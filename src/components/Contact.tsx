import { Mail, Linkedin, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './ui/SectionHeader';
import { GradientButton } from './ui/GradientButton';

/**
 * Contact section component
 * Follows Single Responsibility Principle - only handles contact display
 */
export default function Contact() {
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-8">
                    <SectionHeader
                        title="Get In Touch"
                        subtitle="Open to discussing new opportunities and exciting projects"
                        titleClassName="text-3xl md:text-4xl text-center"
                        subtitleClassName="text-lg text-center"
                    />

                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <motion.a
                            href="mailto:hello@example.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GradientButton
                                as="span"
                                icon={<Mail className="w-4 h-4" />}
                            >
                                Email Me
                            </GradientButton>
                        </motion.a>

                        <motion.a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GradientButton
                                variant="outline"
                                as="span"
                                icon={<Linkedin className="w-4 h-4" />}
                                iconPosition="left"
                            >
                                LinkedIn
                            </GradientButton>
                        </motion.a>

                        <motion.a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <GradientButton
                                variant="outline"
                                as="span"
                                icon={<Github className="w-4 h-4" />}
                                iconPosition="left"
                            >
                                GitHub
                            </GradientButton>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};