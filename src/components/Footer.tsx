import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/data';

const links = [
    { href: profile.github, label: 'GitHub', icon: Github, external: true },
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail, external: false },
];

export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-border bg-linear-to-b from-background to-zinc-950/50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript & Tailwind CSS.
                </p>
                <ul className="flex items-center gap-1">
                    {links.map(({ href, label, icon: Icon, external }) => (
                        <li key={label}>
                            <a
                                href={href}
                                aria-label={label}
                                title={label}
                                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                                className="inline-flex p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                            >
                                <Icon className="w-4 h-4" aria-hidden="true" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
