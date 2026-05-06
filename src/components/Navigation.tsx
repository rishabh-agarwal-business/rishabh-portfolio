import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { useState, useCallback, memo, useEffect, useMemo } from 'react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Menu, X } from 'lucide-react';
import PortofolioImg from "@/assets/portfolio-400.webp";

const navigationLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
];

const Avatar = memo(() => (
    <motion.div
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <ImageWithFallback
            src={PortofolioImg}
            alt="Rishabh Agarwal"
            loading="eager"
            decoding="async"
            fetchPriority='high'
            className="w-full h-full object-cover"
        />
    </motion.div>
));

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollToSection } = useSmoothScroll();

    const [spyEnabled, setSpyEnabled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setSpyEnabled(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const sectionIds = useMemo(() => navigationLinks.map(l => l.id), []);

    const activeSection = useScrollSpy(sectionIds, spyEnabled);

    const handleNavClick = useCallback((id: string) => {
        setMobileMenuOpen(false);
        scrollToSection(id);
    }, [scrollToSection]);

    useEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, []);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 bg-accent/50 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                        <Link
                            to="/"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('about')
                            }}
                            className="flex items-center gap-3 group cursor-pointer pr-4 border-r border-border/50"
                        >
                            <Avatar />
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors font-['Space_Grotesk',sans-serif]">
                                Rishabh Agarwal
                            </span>
                        </Link>

                        {navigationLinks.map((link, index) => {
                            const isActive = activeSection === link.id;

                            return (
                                <motion.button
                                    key={link.id}
                                    onClick={() => handleNavClick(link.id)}
                                    className={`relative text-sm px-3 py-1 rounded-full transition-all cursor-pointer ${isActive
                                        ? 'text-foreground bg-zinc-700/40 border border-zinc-500/50'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/30'
                                        }`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {link.label}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="flex md:hidden items-center gap-3 w-full">
                        <Link to="/" onClick={(e) => {
                            e.preventDefault();
                            handleNavClick('about')
                        }} className="flex items-center gap-3 group cursor-pointer">
                            <motion.div
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shrink-0"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ImageWithFallback
                                    src={PortofolioImg}
                                    alt="Rishabh Agarwal"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority='high'
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors font-['Space_Grotesk',sans-serif]">
                                Rishabh Agarwal
                            </span>
                        </Link>

                        <motion.button
                            onClick={() => setMobileMenuOpen(v => !v)}
                            className="ml-auto p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                            whileTap={{ scale: 0.9 }}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-foreground" />
                            ) : (
                                <Menu className="w-5 h-5 text-foreground" />
                            )}
                        </motion.button>
                    </div>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="md:hidden pt-4 pb-2 border-t border-border mt-4"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col gap-3">
                                {navigationLinks.map((link, index) => {
                                    const isActive = activeSection === link.id;

                                    return (
                                        <motion.button
                                            key={link.id}
                                            onClick={() => handleNavClick(link.id)}
                                            className={`text-left py-2 relative transition-colors cursor-pointer ${isActive
                                                ? 'text-foreground font-semibold'
                                                : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
                                                    layoutId="activeMobileNav"
                                                    transition={{
                                                        type: 'spring',
                                                        stiffness: 380,
                                                        damping: 30,
                                                    }}
                                                />
                                            )}
                                            <span className={isActive ? 'pl-3' : ''}>
                                                {link.label}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navigation;
