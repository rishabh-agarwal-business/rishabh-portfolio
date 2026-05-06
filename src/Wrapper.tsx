import { useEffect, useRef, useState } from "react";

export function Wrapper({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: "200px" }); // preload early

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return <div ref={ref}>{visible ? children : null}</div>;
}