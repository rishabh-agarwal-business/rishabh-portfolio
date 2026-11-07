import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { GradientText } from './ui/GradientText';

export default function NotFound() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center px-6 pt-24">
            <title>Page not found — Rishabh Agarwal</title>
            <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground tracking-widest uppercase">404</p>
                <h1 className="text-4xl md:text-5xl font-bold font-display">
                    <GradientText>Page not found</GradientText>
                </h1>
                <p className="text-muted-foreground">The page you're looking for doesn't exist or has moved.</p>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-zinc-300 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back to portfolio
                </Link>
            </div>
        </section>
    );
}
