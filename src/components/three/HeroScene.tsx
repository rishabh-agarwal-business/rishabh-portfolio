import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive WebGL background for the hero: a slowly rotating "network globe"
 * (Fibonacci-sphere nodes linked to their nearest neighbours) inside a field of
 * drifting dust, with mouse parallax.
 *
 * Perf/a11y guards:
 *  - renders only while the hero is on screen and the tab is visible
 *  - devicePixelRatio capped at 1.75, fewer nodes on small screens
 *  - prefers-reduced-motion → a single static frame
 *  - no WebGL → renders nothing (the CSS background still shows)
 */
export default function HeroScene() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        } catch {
            return; // WebGL unavailable
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const small = window.innerWidth < 768;

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0a0a, 0.06);
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
        camera.position.set(0, 0, 9);

        // ── Globe ────────────────────────────────────────────────────────
        const globe = new THREE.Group();
        scene.add(globe);

        const NODE_COUNT = small ? 220 : 420;
        const RADIUS = 2.6;
        const nodes: THREE.Vector3[] = [];
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < NODE_COUNT; i++) {
            const y = 1 - (i / (NODE_COUNT - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = golden * i;
            nodes.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(RADIUS));
        }

        const indigo = new THREE.Color('#818cf8');
        const cyan = new THREE.Color('#22d3ee');
        const nodeColors = new Float32Array(NODE_COUNT * 3);
        nodes.forEach((p, i) => {
            const c = indigo.clone().lerp(cyan, (p.y / RADIUS + 1) / 2);
            nodeColors.set([c.r, c.g, c.b], i * 3);
        });

        const nodeGeo = new THREE.BufferGeometry().setFromPoints(nodes);
        nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
        const nodeMat = new THREE.PointsMaterial({
            size: 0.06,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            map: makeDotTexture(),
        });
        globe.add(new THREE.Points(nodeGeo, nodeMat));

        // links: each node → its 2 nearest neighbours (computed once)
        const linkPositions: number[] = [];
        const linkColors: number[] = [];
        nodes.forEach((a, i) => {
            const nearest = nodes
                .map((b, j) => ({ j, d: i === j ? Infinity : a.distanceToSquared(b) }))
                .sort((x, y) => x.d - y.d)
                .slice(0, 2);
            nearest.forEach(({ j }) => {
                if (j < i) return; // avoid duplicates
                const b = nodes[j];
                linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
                linkColors.push(...nodeColors.slice(i * 3, i * 3 + 3), ...nodeColors.slice(j * 3, j * 3 + 3));
            });
        });
        const linkGeo = new THREE.BufferGeometry();
        linkGeo.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
        linkGeo.setAttribute('color', new THREE.Float32BufferAttribute(linkColors, 3));
        const linkMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        globe.add(new THREE.LineSegments(linkGeo, linkMat));

        // orbit rings
        const ringMat = new THREE.MeshBasicMaterial({ color: '#a5b4fc', transparent: true, opacity: 0.12, side: THREE.DoubleSide });
        const ring1 = new THREE.Mesh(new THREE.RingGeometry(3.35, 3.37, 160), ringMat);
        ring1.rotation.x = Math.PI / 2.3;
        const ring2 = new THREE.Mesh(new THREE.RingGeometry(3.9, 3.915, 160), ringMat.clone());
        ring2.rotation.x = Math.PI / 1.8;
        ring2.rotation.y = 0.5;
        globe.add(ring1, ring2);

        // satellites travelling on the rings
        const satGeo = new THREE.SphereGeometry(0.035, 12, 12);
        const sat1 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: '#22d3ee' }));
        const sat2 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: '#c4b5fd' }));
        ring1.add(sat1);
        ring2.add(sat2);

        // ── Dust ─────────────────────────────────────────────────────────
        const DUST = small ? 350 : 900;
        const dustPos = new Float32Array(DUST * 3);
        for (let i = 0; i < DUST; i++) {
            dustPos.set([(Math.random() - 0.5) * 24, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 12 - 2], i * 3);
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            size: 0.03,
            color: '#a1a1aa',
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
            map: makeDotTexture(),
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        scene.add(dust);

        // ── Layout ───────────────────────────────────────────────────────
        const layout = () => {
            const { clientWidth: w, clientHeight: h } = mount;
            if (!w || !h) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            // globe sits behind the portrait on desktop, centred and smaller on mobile
            const desktop = w >= 768;
            globe.position.set(desktop ? 2.5 : 0, desktop ? 0 : 1.6, desktop ? 0 : -3);
            globe.scale.setScalar(desktop ? 1.2 : 1);
        };
        layout();
        const ro = new ResizeObserver(layout);
        ro.observe(mount);

        // ── Interaction ──────────────────────────────────────────────────
        const pointer = { x: 0, y: 0 };
        const onPointer = (e: PointerEvent) => {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onPointer, { passive: true });

        // ── Loop ─────────────────────────────────────────────────────────
        const clock = new THREE.Clock();
        let frame = 0;
        let onScreen = true;

        const render = () => {
            const t = clock.getElapsedTime();
            globe.rotation.y = t * 0.08 + pointer.x * 0.35;
            globe.rotation.x = 0.25 + pointer.y * 0.2;
            dust.rotation.y = t * 0.01;
            dust.position.x = pointer.x * -0.3;
            dust.position.y = pointer.y * 0.2;
            const a1 = t * 0.6;
            const a2 = -t * 0.45;
            sat1.position.set(Math.cos(a1) * 3.36, Math.sin(a1) * 3.36, 0);
            sat2.position.set(Math.cos(a2) * 3.91, Math.sin(a2) * 3.91, 0);
            nodeMat.size = 0.06 + Math.sin(t * 1.5) * 0.008;
            renderer.render(scene, camera);
        };

        const loop = () => {
            render();
            frame = requestAnimationFrame(loop);
        };
        const start = () => {
            if (!frame && onScreen && !document.hidden && !reduceMotion) frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const io = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            if (onScreen) start();
            else stop();
        });
        io.observe(mount);
        const onVisibility = () => (document.hidden ? stop() : start());
        document.addEventListener('visibilitychange', onVisibility);

        if (reduceMotion) render();
        else start();

        return () => {
            stop();
            io.disconnect();
            ro.disconnect();
            window.removeEventListener('pointermove', onPointer);
            document.removeEventListener('visibilitychange', onVisibility);
            scene.traverse((obj) => {
                const o = obj as THREE.Mesh;
                o.geometry?.dispose();
                const m = o.material as THREE.Material | THREE.Material[] | undefined;
                (Array.isArray(m) ? m : m ? [m] : []).forEach((mat) => {
                    (mat as THREE.PointsMaterial).map?.dispose();
                    mat.dispose();
                });
            });
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);

    return <div ref={mountRef} aria-hidden="true" className="absolute inset-0" />;
}

/** Soft round sprite so points render as glowing dots instead of squares */
function makeDotTexture() {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.8)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}
