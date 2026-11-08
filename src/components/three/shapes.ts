import * as THREE from 'three';

/**
 * Point-cloud "shapes" the ambient background morphs between, one per section.
 * Every generator returns exactly `n` points (x, y, z) so any shape can morph into any other.
 */
export type ShapeName = 'helix' | 'layers' | 'galaxy' | 'icosahedron' | 'portal' | 'scatter' | 'grid';

interface ShapeStyle {
    /** colour at the bottom / top of the shape */
    colors: [string, string];
    /** where the shape sits, in world units, on desktop (mobile is always centred) */
    offset: [number, number];
    scale: number;
    /** resting tilt around the x axis (radians) */
    tilt: number;
    /** idle spin speed around the y axis (radians / second) */
    spin: number;
    /** point size multiplier (sparse shapes need bigger points) */
    size?: number;
}

export const SHAPE_STYLES: Record<ShapeName, ShapeStyle> = {
    helix: { colors: ['#22d3ee', '#a78bfa'], offset: [4.4, 0], scale: 1.05, tilt: 0.15, spin: 0.35 },
    layers: { colors: ['#a78bfa', '#22d3ee'], offset: [0, 0.2], scale: 1.9, tilt: 0.45, spin: 0.08 },
    galaxy: { colors: ['#f472b6', '#818cf8'], offset: [3.6, 0.4], scale: 1.25, tilt: 1.05, spin: 0.1 },
    icosahedron: { colors: ['#22d3ee', '#818cf8'], offset: [0, 0], scale: 1.55, tilt: 0.3, spin: 0.15, size: 1.3 },
    portal: { colors: ['#818cf8', '#f472b6'], offset: [0, 0.1], scale: 1.35, tilt: 0.15, spin: 0.04 },
    scatter: { colors: ['#a5b4fc', '#22d3ee'], offset: [0, 0], scale: 1.3, tilt: 0.2, spin: 0.03, size: 1.7 },
    grid: { colors: ['#818cf8', '#22d3ee'], offset: [0, -1.3], scale: 1.8, tilt: 0.5, spin: 0.05, size: 1.3 },
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function fill(n: number, gen: (i: number, t: number) => [number, number, number]) {
    const out = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) out.set(gen(i, i / n), i * 3);
    return out;
}

/** Sample `n` points evenly along a set of line segments (used for wireframe-like shapes) */
function alongSegments(n: number, segs: Float32Array, jitter = 0.02) {
    const count = segs.length / 6;
    return fill(n, (i) => {
        const s = (i % count) * 6;
        const t = Math.random();
        return [
            segs[s] + (segs[s + 3] - segs[s]) * t + rand(-jitter, jitter),
            segs[s + 1] + (segs[s + 4] - segs[s + 1]) * t + rand(-jitter, jitter),
            segs[s + 2] + (segs[s + 5] - segs[s + 2]) * t + rand(-jitter, jitter),
        ];
    });
}

const GENERATORS: Record<ShapeName, (n: number) => Float32Array> = {

    // DNA double helix with rungs — "skills / building blocks"
    helix: (n) =>
        fill(n, (i) => {
            const kind = i % 10;
            const t = Math.random();
            const y = (t - 0.5) * 6.4;
            const a = t * Math.PI * 6;
            if (kind < 8) {
                const strand = kind % 2 ? Math.PI : 0;
                const r = 1.15 + rand(-0.05, 0.05);
                return [Math.cos(a + strand) * r, y, Math.sin(a + strand) * r];
            }
            // rungs between the strands
            const k = Math.round(t * 36) / 36;
            const ya = (k - 0.5) * 6.4;
            const aa = k * Math.PI * 6;
            const u = rand(-1, 1);
            return [Math.cos(aa) * 1.15 * u, ya, Math.sin(aa) * 1.15 * u];
        }),

    // Four stacked grid planes — client / edge / app / data (matches the architecture diagram)
    layers: (n) =>
        fill(n, (i) => {
            const layer = i % 4;
            const g = 14;
            const cell = Math.floor(i / 4) % (g * g);
            const x = ((cell % g) / (g - 1) - 0.5) * 3.6;
            const z = (Math.floor(cell / g) / (g - 1) - 0.5) * 3.6;
            return [x + rand(-0.04, 0.04), (layer - 1.5) * 1.25, z + rand(-0.04, 0.04)];
        }),

    // Spiral galaxy — "the journey" for experience
    galaxy: (n) =>
        fill(n, () => {
            const arms = 3;
            const r = Math.pow(Math.random(), 0.7) * 3.2;
            const arm = Math.floor(Math.random() * arms);
            const a = (arm / arms) * Math.PI * 2 + r * 1.35;
            const spread = (0.35 * (3.2 - r)) / 3.2 + 0.08;
            return [Math.cos(a) * r + rand(-spread, spread), rand(-0.12, 0.12) * (3.4 - r), Math.sin(a) * r + rand(-spread, spread)];
        }),

    // Wireframe icosahedron — "architecture / structure"
    icosahedron: (n) => {
        const edges = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.4, 1));
        const pts = alongSegments(n, edges.attributes.position.array as Float32Array);
        edges.dispose();
        return pts;
    },

    // Glowing torus ring — "portal" for contact
    portal: (n) =>
        fill(n, () => {
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = 2.6;
            const r = 0.12 + Math.pow(Math.random(), 3) * 0.55;
            return [(R + r * Math.cos(v)) * Math.cos(u), (R + r * Math.cos(v)) * Math.sin(u), r * Math.sin(v)];
        }),

    // Lost in space — 404
    scatter: (n) => fill(n, () => [rand(-5, 5), rand(-3, 3), rand(-3, 3)]),

    // Undulating dot grid — case-study pages
    grid: (n) => {
        const g = Math.ceil(Math.sqrt(n));
        return fill(n, (i) => {
            const x = ((i % g) / (g - 1) - 0.5) * 6;
            const z = (Math.floor(i / g) / (g - 1) - 0.5) * 6;
            return [x, Math.sin(x * 1.2) * 0.35 + Math.cos(z * 1.4) * 0.35, z];
        });
    },
};

const cache = new Map<string, Float32Array>();

export function getShape(name: ShapeName, n: number) {
    const key = `${name}:${n}`;
    let pts = cache.get(key);
    if (!pts) {
        pts = GENERATORS[name](n);
        cache.set(key, pts);
    }
    return pts;
}

export const isShapeName = (v: string | undefined): v is ShapeName => !!v && v in GENERATORS;
