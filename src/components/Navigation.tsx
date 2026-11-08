import { motion, AnimatePresence } from 'motion/react';
import { memo, useCallback, useEffect, useState, type MouseEvent } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { ImageWithFallback } from './ImageWithFallback';
import avatarImg from '@/assets/avatar-256.webp';
import { profile } from '@/data/data';

const navigationLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'case-studies', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
] as const;

const SECTION_IDS = navigationLinks.map((l) => l.id);

const Avatar = memo(function Avatar({ size }: { size: 'sm' | 'md' }) {
    const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
    return (
        <span
            className={`${dim} block rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0`}
        >
            <ImageWithFallback
                src={avatarImg}
                alt=""
                width={40}
                height={40}
                decoding="async"
                className="w-full h-full object-cover"
            />
        </span>
    );
});

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollToSection } = useSmoothScroll();
    const activeSection = useScrollSpy(SECTION_IDS);

    const handleNavClick = useCallback(
        (e: MouseEvent<HTMLAnchorElement>, id: string) => {
            // let ctrl/cmd-click open a new tab as usual
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
            e.preventDefault();
            setMobileMenuOpen(false);
            scrollToSection(id);
        },
        [scrollToSection]
    );

    // Close the mobile menu on Escape or when resizing to desktop
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false);
        const mq = window.matchMedia('(min-width: 768px)');
        const onMq = () => mq.matches && setMobileMenuOpen(false);
        window.addEventListener('keydown', onKey);
        mq.addEventListener('change', onMq);
        return () => {
            window.removeEventListener('keydown', onKey);
            mq.removeEventListener('change', onMq);
        };
    }, [mobileMenuOpen]);

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <nav aria-label="Primary" className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 bg-accent/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                        <a
                            href="/#about"
                            onClick={(e) => handleNavClick(e, 'about')}
                            className="flex items-center gap-3 group pr-4 border-r border-border/50"
                        >
                            <Avatar size="sm" />
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors font-display">
                                {profile.name}
                            </span>
                        </a>

                        <ul className="flex items-center gap-1 lg:gap-2">
                            {navigationLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <li key={link.id}>
                                        <a
                                            href={`/#${link.id}`}
                                            onClick={(e) => handleNavClick(e, link.id)}
                                            aria-current={isActive ? 'location' : undefined}
                                            className={`block text-sm px-3 py-1 rounded-full border transition-colors ${isActive
                                                ? 'text-foreground bg-zinc-700/40 border-zinc-500/50'
                                                : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-background/30'
                                                }`}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <a
                        href={profile.resume}
                        download
                        className="hidden md:inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-border/50 bg-accent/50 text-muted-foreground hover:text-foreground hover:border-zinc-500/50 transition-colors"
                    >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        Resume
                    </a>

                    {/* Mobile header */}
                    <div className="flex md:hidden items-center gap-3 w-full">
                        <a
                            href="/#about"
                            onClick={(e) => handleNavClick(e, 'about')}
                            className="flex items-center gap-3 group"
                        >
                            <Avatar size="md" />
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors font-display">
                                {profile.name}
                            </span>
                        </a>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                            className="ml-auto p-2 rounded-lg hover:bg-accent transition-colors"
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-foreground" aria-hidden="true" />
                            ) : (
                                <Menu className="w-5 h-5 text-foreground" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            id="mobile-menu"
                            className="md:hidden border-t border-border mt-4"
                            // opacity/transform only: animating height:auto makes Motion
                            // measure layout and restore the old scroll position, which
                            // cancels the smooth scroll started by the link click
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ul className="flex flex-col gap-1 pt-4 pb-2">
                                {navigationLinks.map((link) => {
                                    const isActive = activeSection === link.id;
                                    return (
                                        <li key={link.id}>
                                            <a
                                                href={`/#${link.id}`}
                                                onClick={(e) => handleNavClick(e, link.id)}
                                                aria-current={isActive ? 'location' : undefined}
                                                className={`block py-2 border-l-2 pl-3 transition-colors ${isActive
                                                    ? 'text-foreground font-semibold border-primary'
                                                    : 'text-muted-foreground border-transparent hover:text-foreground'
                                                    }`}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                                <li>
                                    <a
                                        href={profile.resume}
                                        download
                                        className="flex items-center gap-2 py-2 pl-3 border-l-2 border-transparent text-muted-foreground hover:text-foreground"
                                    >
                                        <Download className="w-4 h-4" aria-hidden="true" />
                                        Download Resume
                                    </a>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Navigation;
