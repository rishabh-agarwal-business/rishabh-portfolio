import { Component, type ReactNode } from 'react';

/**
 * Error boundary for purely decorative pieces (WebGL scenes, effects): if they throw,
 * render nothing instead of taking the whole page down.
 */
export class SafeBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error: unknown) {
        console.warn('Decorative component failed and was disabled:', error);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}
