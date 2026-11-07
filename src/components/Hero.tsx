import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { GradientText } from './ui/GradientText';
import { GradientButton } from './ui/GradientButton';
import { ImageWithFallback } from './ImageWithFallback';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { experience, profile } from '@/data/data';
import { Link } from 'react-router';
import portfolio400 from '@/assets/portfolio-400.webp';
import portfolio800 from '@/assets/portfolio-800.webp';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
});

const stats = [
    { value: profile.yearsOfExperience, label: 'Years building for the web' },
    { value: String(experience.length), label: 'Companies, incl. Deloitte & Capgemini' },
    { value: 'Live', label: 'NamasteScale — a full-stack SaaS I built & launched solo' },
];

const socials = [
    { href: profile.github, label: 'GitHub', icon: Github },
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
];

const Hero = () => {
    const { scrollToSection } = useSmoothScroll();

    return (
        <section id="about" aria-labelledby="hero-title" className="pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div className="space-y-6">
                        {profile.openToWork && (
                        <motion.p
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground px-3 py-1 rounded-full border border-border bg-accent/40"
                            {...fadeUp(0)}
                        >
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                            </span>
                            Open to Senior / Staff Frontend roles
                        </motion.p>
                        )}

                        <motion.h1
                            id="hero-title"
                            className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight font-display"
                            {...fadeUp(0.1)}
                        >
                            <span className="sr-only">{profile.name}, </span>
                            <GradientText animate>{profile.title}</GradientText>
                        </motion.h1>

                        <motion.p className="text-xl md:text-2xl font-semibold font-display" {...fadeUp(0.2)}>
                            <GradientText from="#9ca3af" via="#d1d5db" to="#cbd5e1">
                                {profile.yearsOfExperience} Years of Experience
                            </GradientText>
                        </motion.p>

                        <motion.p className="text-lg text-muted-foreground leading-relaxed" {...fadeUp(0.3)}>
                            Building{' '}
                            <span className="font-semibold text-foreground">enterprise-scale applications</span>{' '}
                            with React, Angular, and TypeScript. Specialized in{' '}
                            <span className="font-semibold text-foreground">healthcare, fintech,</span> and{' '}
                            <span className="font-semibold text-foreground">high-performance</span> web
                            applications.
                        </motion.p>

                        <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.4)}>
                            <GradientButton
                                type="button"
                                onClick={() => scrollToSection('case-studies')}
                                icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                            >
                                View Case Studies
                            </GradientButton>

                            <GradientButton
                                as="a"
                                href={profile.resume}
                                download
                                variant="outline"
                                icon={<Download className="w-4 h-4" aria-hidden="true" />}
                                iconPosition="left"
                            >
                                Download Resume
                            </GradientButton>
                        </motion.div>

                        <motion.ul className="flex items-center gap-2" aria-label="Social links" {...fadeUp(0.5)}>
                            {socials.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        title={label}
                                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                                        className="inline-flex p-2.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-zinc-500/50 hover:bg-accent/50 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    >
                        <motion.div
                            className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md mx-auto"
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                        >
                            <ImageWithFallback
                                src={portfolio800}
                                srcSet={`${portfolio400} 400w, ${portfolio800} 800w`}
                                sizes="(max-width: 640px) 90vw, 448px"
                                loading="eager"
                                fetchPriority="high"
                                alt={`Portrait of ${profile.name}`}
                                className="w-full h-auto rounded-2xl"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Quick stats */}
                <motion.dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16" {...fadeUp(0.5)}>
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-zinc-600/30 bg-linear-to-r from-zinc-700/20 to-gray-700/20 p-5"
                        >
                            <dt className="text-sm text-muted-foreground">{s.label}</dt>
                            <dd className="order-first text-3xl font-bold font-display text-foreground">{s.value}</dd>
                        </div>
                    ))}
                </motion.dl>

                {/* About */}
                <motion.div className="space-y-4 text-lg text-muted-foreground leading-relaxed" {...fadeUp(0.6)}>
                    <p>
                        I've spent the last{' '}
                        <span className="font-semibold text-foreground">{profile.yearsOfExperience} years</span>{' '}
                        building scalable, high-performance web applications for enterprise clients in{' '}
                        <span className="font-semibold text-foreground">healthcare, fintech, and SaaS</span>.
                    </p>
                    <p>
                        I specialize in architecting complex{' '}
                        <span className="font-semibold text-foreground">React and Angular</span> applications with a
                        focus on{' '}
                        <span className="font-semibold text-foreground">
                            performance optimization, security, and maintainability
                        </span>
                        — state management patterns, role-based access control, and regulatory compliance{' '}
                        <span className="font-semibold text-foreground">(HIPAA, SOC 2, PCI DSS)</span>.
                    </p>
                    <p>
                        Outside of work I build products end to end. Most recently I designed, built and launched{' '}
                        <Link
                            to="/case-study/namastescale"
                            className="font-semibold text-foreground underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
                        >
                            NamasteScale
                        </Link>
                        , a system design learning platform with AI-reviewed answers and mock interviews — React 19,
                        NestJS, PostgreSQL and AWS.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
