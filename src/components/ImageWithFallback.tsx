import { useState, type ImgHTMLAttributes } from 'react';

const ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

export function ImageWithFallback({ src, alt, style, className, onError, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
    const [didError, setDidError] = useState(false);

    if (didError) {
        // Note: srcSet/sizes are intentionally NOT forwarded, otherwise the browser
        // would keep trying the broken responsive sources instead of the placeholder.
        return (
            <div
                className={`inline-flex items-center justify-center bg-zinc-800 ${className ?? ''}`}
                style={style}
                role="img"
                aria-label={alt || 'Image failed to load'}
            >
                <img src={ERROR_IMG_SRC} alt="" className="w-1/2 h-1/2 invert" data-original-url={src} />
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={style}
            {...rest}
            onError={(e) => {
                setDidError(true);
                onError?.(e);
            }}
        />
    );
}
