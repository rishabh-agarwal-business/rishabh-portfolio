import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from './ui/SectionHeader';
import { GradientButton } from './ui/GradientButton';
import { profile } from '@/data/data';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(t);
    }, [copied]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    return (
        <section id="contact" data-scene="portal" aria-labelledby="contact-title" className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center space-y-8">
                    <SectionHeader
                        id="contact-title"
                        title="Get In Touch"
                        subtitle="Open to discussing senior frontend roles, interesting problems, and open-source collaboration."
                        titleClassName="text-3xl md:text-4xl text-center"
                        subtitleClassName="text-lg text-center"
                        centered
                    />

                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <GradientButton as="a" href={`mailto:${profile.email}`} icon={<Mail className="w-4 h-4" aria-hidden="true" />}>
                            Email Me
                        </GradientButton>

                        <GradientButton
                            as="a"
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            icon={<Linkedin className="w-4 h-4" aria-hidden="true" />}
                            iconPosition="left"
                        >
                            LinkedIn
                        </GradientButton>

                        <GradientButton
                            as="a"
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            icon={<Github className="w-4 h-4" aria-hidden="true" />}
                            iconPosition="left"
                        >
                            GitHub
                        </GradientButton>
                    </motion.div>

                    <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={`Copy email address ${profile.email}`}
                        title="Copy email"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        ) : (
                            <Copy className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span>{copied ? 'Copied!' : profile.email}</span>
                    </button>
                    <span className="sr-only" aria-live="polite">
                        {copied ? 'Email copied to clipboard' : ''}
                    </span>
                </div>
            </div>
        </section>
    );
}
