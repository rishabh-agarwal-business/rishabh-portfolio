import {
    ExternalLink,
    Github,
    Package,
} from "lucide-react";

interface ProjectLinksProps {
    /** Used to make link labels unique for screen readers */
    projectName?: string;
    repoLink?: string;
    packageLink?: string;
    demoLink?: string;
    size?: number;
    className?: string;
}

export default function ProjectLinks({
    projectName,
    repoLink,
    packageLink,
    demoLink,
    size = 18,
    className = "",
}: ProjectLinksProps) {
    const iconClass = "inline-flex p-1 rounded text-zinc-400 transition-colors";
    const label = (kind: string) => (projectName ? `${projectName} — ${kind}` : kind);

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {repoLink && (
                <a
                    href={repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label("GitHub repository")}
                    title="GitHub Repository"
                    className={`${iconClass} hover:text-white`}
                >
                    <Github size={size} aria-hidden="true" />
                </a>
            )}

            {packageLink && (
                <a
                    href={packageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label("npm package")}
                    title="npm Package"
                    className={`${iconClass} hover:text-emerald-400`}
                >
                    <Package size={size} aria-hidden="true" />
                </a>
            )}

            {demoLink && (
                <a
                    href={demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label("Live demo")}
                    title="Live Demo"
                    className={`${iconClass} hover:text-sky-400`}
                >
                    <ExternalLink size={size} aria-hidden="true" />
                </a>
            )}
        </div>
    );
}