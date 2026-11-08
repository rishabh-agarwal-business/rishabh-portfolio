import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { GradientButton } from './ui/GradientButton';
import { Portrait } from './hero/Portrait';
import { SplitReveal } from './fx/SplitReveal';
import { RotatingWords } from './fx/RotatingWords';
import { CountUp } from './fx/CountUp';
import { Spotlight } from './fx/Spotlight';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { SafeBoundary } from './fx/SafeBoundary';
import { experience, profile } from '@/data/data';

// three.js is ~150 KB — load it after first paint, never block the hero text
const HeroScene = lazy(() => import('./three/HeroScene'));

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const stats = [
    { value: profile.yearsOfExperience, label: 'Years building production web apps' },
    { value: String(experience.length), label: 'Companies, incl. Deloitte & Capgemini' },
    { value: '1', label: 'Full-stack SaaS built & launched solo' },
];

const socials = [
    { href: profile.github, label: 'GitHub', icon: Github },
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
];

const BUILDS = ['high-performance UIs', 'design systems', 'enterprise React apps', 'full-stack SaaS', 'secure healthcare portals'];

/** Defer the WebGL scene until the browser is idle after first paint. */
function useIdleMount() {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const ric = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 300));
        const id = ric(() => setReady(true));
        return () => (window.cancelIdleCallback ?? clearTimeout)(id as number);
    }, []);
    return ready;
}

const Hero = () => {
    const { scrollToSection } = useSmoothScroll();
    const sceneReady = useIdleMount();

    return (
        <section id="about" data-scene="none" aria-labelledby="hero-title" className="relative overflow-hidden">
            {/* WebGL network globe */}
            <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
                {sceneReady && (
                    <SafeBoundary>
                    <Suspense fallback={null}>
                        <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}>
                            <HeroScene />
                        </motion.div>
                    </Suspense>
                    </SafeBoundary>
                )}
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 md:min-h-[100svh] md:flex md:flex-col md:justify-center">
                <div className="grid md:grid-cols-[1.2fr_1fr] gap-14 items-center">
                    <div className="space-y-7">
                        {profile.openToWork && (
                            <motion.p
                                className="inline-flex items-center gap-2 text-sm text-zinc-300 pl-2 pr-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur"
                                {...fadeUp(0)}
                            >
                                <span className="relative flex h-2 w-2" aria-hidden="true">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>
                                Open to Senior / Staff Frontend roles
                            </motion.p>
                        )}

                        <h1 id="hero-title" className="font-display font-bold leading-[1.05] tracking-tight">
                            <motion.span className="block text-lg md:text-xl font-medium text-zinc-400 mb-3 tracking-normal" {...fadeUp(0.05)}>
                                Hi, I'm {profile.name}
                            </motion.span>
                            <span className="block text-5xl sm:text-6xl md:text-7xl">
                                <SplitReveal text="Senior Frontend" delay={0.15} className="text-zinc-100" />
                            </span>
                            <span className="block text-5xl sm:text-6xl md:text-7xl">
                                <SplitReveal
                                    text="Engineer."
                                    delay={0.35}
                                    className="bg-linear-to-r from-indigo-300 via-cyan-300 to-violet-300 bg-clip-text text-transparent bg-[length:200%_200%] motion-safe:animate-gradient"
                                />
                            </span>
                        </h1>

                        <motion.p className="text-xl md:text-2xl text-zinc-300 font-display" {...fadeUp(0.55)}>
                            I build{' '}
                            <RotatingWords
                                words={BUILDS}
                                className="font-semibold bg-linear-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent"
                            />
                        </motion.p>

                        <motion.p className="text-lg text-muted-foreground leading-relaxed max-w-xl" {...fadeUp(0.65)}>
                            {profile.yearsOfExperience} years shipping{' '}
                            <span className="text-foreground font-medium">enterprise-scale applications</span> with React,
                            Angular and TypeScript across{' '}
                            <span className="text-foreground font-medium">healthcare, fintech and SaaS</span>.
                        </motion.p>

                        <motion.div className="flex flex-col sm:flex-row gap-3" {...fadeUp(0.75)}>
                            <GradientButton
                                type="button"
                                onClick={() => scrollToSection('case-studies')}
                                icon={<ArrowRight className="w-4 h-4" aria-hidden="true" />}
                                className="bg-none! bg-white! text-zinc-900! hover:shadow-[0_0_40px_-8px_rgba(129,140,248,0.8)]!"
                            >
                                See my work
                            </GradientButton>

                            <GradientButton
                                as="a"
                                href={profile.resume}
                                download
                                variant="outline"
                                icon={<Download className="w-4 h-4" aria-hidden="true" />}
                                iconPosition="left"
                                className="backdrop-blur bg-white/5"
                            >
                                Download Resume
                            </GradientButton>
                        </motion.div>

                        <motion.ul className="flex items-center gap-2" aria-label="Social links" {...fadeUp(0.85)}>
                            {socials.map(({ href, label, icon: Icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        title={label}
                                        {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                                        className="inline-flex p-2.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-indigo-400/50 hover:-translate-y-0.5 transition-all backdrop-blur"
                                    >
                                        <Icon className="w-4 h-4" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </motion.ul>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    >
                        <Portrait alt={`Portrait of ${profile.name}`} />
                    </motion.div>
                </div>

                <motion.button
                    type="button"
                    onClick={() => scrollToSection('skills')}
                    className="hidden md:flex mx-auto mt-14 flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-300 transition-colors"
                    {...fadeUp(1.1)}
                >
                    Scroll
                    <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <ArrowDown className="w-4 h-4" aria-hidden="true" />
                    </motion.span>
                </motion.button>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 pb-20">
                {/* Quick stats */}
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <Spotlight className="h-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6">
                                <div className="flex flex-col">
                                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                                    <dd className="order-first text-4xl font-bold font-display bg-linear-to-br from-white to-zinc-400 bg-clip-text text-transparent mb-1">
                                        <CountUp value={s.value} />
                                    </dd>
                                </div>
                            </Spotlight>
                        </motion.div>
                    ))}
                </dl>

                {/* About */}
                <motion.div
                    className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 pt-1.5">About me</h2>
                    <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
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
                            </span>{' '}
                            — state management patterns, role-based access control, and regulatory compliance{' '}
                            <span className="font-semibold text-foreground">(HIPAA, SOC 2, PCI DSS)</span>.
                        </p>
                        <p>
                            Outside of work I build products end to end. Most recently I designed, built and launched{' '}
                            <Link
                                to="/case-study/namastescale"
                                className="font-semibold text-foreground underline decoration-indigo-400/60 underline-offset-4 hover:decoration-cyan-300"
                            >
                                NamasteScale
                            </Link>
                            , a system design learning platform with AI-reviewed answers, mock interviews and an
                            AI-assisted debugging round — React 19, NestJS, PostgreSQL, Redis and AWS behind Cloudflare.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
