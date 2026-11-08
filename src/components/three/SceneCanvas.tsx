import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getShape, isShapeName, SHAPE_STYLES, type ShapeName } from './shapes';

const VERTEX = /* glsl */ `
  attribute float aRand;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec3 p = position;
    // gentle per-point drift so the cloud always feels alive
    p += 0.045 * vec3(
      sin(uTime * 0.8 + aRand * 20.0),
      cos(uTime * 0.7 + aRand * 15.0),
      sin(uTime * 0.6 + aRand * 10.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aRand * 0.9) * (8.0 / -mv.z);
    vColor = mix(uColorA, uColorB, clamp(position.y / 6.0 + 0.5, 0.0, 1.0));
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.8 + aRand * 40.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vTwinkle * uOpacity);
  }
`;

/**
 * One shared, fixed WebGL canvas behind every page. Each section (or page) declares the
 * shape it wants with `data-scene="helix"` etc.; whichever section is in the middle of the
 * viewport wins, and the particle cloud morphs into that shape, colour and position.
 *
 * - one WebGL context for the whole site (no per-section canvases)
 * - `data-scene="none"` fades it out (the hero has its own, richer scene)
 * - stops rendering when invisible, settled-and-reduced-motion, or the tab is hidden
 * - prefers-reduced-motion: shapes swap without drifting or spinning
 */
export default function SceneCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        let renderer: THREE.WebGLRenderer;
        try {
            renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
        } catch {
            return;
        }

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = () => window.innerWidth < 768;
        const COUNT = isMobile() ? 2200 : 4200;
        const pixelRatio = Math.min(window.devicePixelRatio, 1.75);

        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);
        Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.set(0, 0, 11);

        // ── Particles ────────────────────────────────────────────────────
        let shape: ShapeName = 'scatter';
        const current = getShape('scatter', COUNT).slice();
        let target = getShape('scatter', COUNT);

        const geo = new THREE.BufferGeometry();
        const posAttr = new THREE.BufferAttribute(current, 3);
        posAttr.setUsage(THREE.DynamicDrawUsage);
        geo.setAttribute('position', posAttr);
        const rands = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) rands[i] = Math.random();
        geo.setAttribute('aRand', new THREE.BufferAttribute(rands, 1));

        const uniforms = {
            uTime: { value: 0 },
            uSize: { value: 4.2 },
            uPixelRatio: { value: pixelRatio },
            uOpacity: { value: 0 },
            uColorA: { value: new THREE.Color(SHAPE_STYLES.scatter.colors[0]) },
            uColorB: { value: new THREE.Color(SHAPE_STYLES.scatter.colors[1]) },
        };
        const mat = new THREE.ShaderMaterial({
            vertexShader: VERTEX,
            fragmentShader: FRAGMENT,
            uniforms,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
        const group = new THREE.Group();
        group.rotation.x = 0.25;
        group.add(new THREE.Points(geo, mat));
        scene.add(group);

        // loop state (declared before anything can call start())
        const clock = new THREE.Clock();
        let frame = 0;

        // animated targets
        const colorA = new THREE.Color();
        const colorB = new THREE.Color();
        const targetPos = new THREE.Vector3();
        let targetScale = 1;
        let targetTilt = 0.25;
        let idleSpin = 0.1;
        let targetSize = 4.2;
        let targetOpacity = 0;
        let settled = false;

        const setShape = (name: ShapeName | 'none') => {
            settled = false;
            if (name === 'none') {
                targetOpacity = 0;
                start();
                return;
            }
            shape = name;
            target = getShape(name, COUNT);
            const style = SHAPE_STYLES[name];
            colorA.set(style.colors[0]);
            colorB.set(style.colors[1]);
            const mobile = isMobile();
            targetPos.set(mobile ? 0 : style.offset[0], mobile ? 0 : style.offset[1], 0);
            targetScale = style.scale * (mobile ? 0.75 : 1);
            targetOpacity = mobile ? 0.6 : 1;
            targetTilt = style.tilt;
            idleSpin = style.spin;
            targetSize = 4.2 * (style.size ?? 1);
            if (reduce) {
                group.rotation.x = style.tilt;
                current.set(target);
                posAttr.needsUpdate = true;
            }
            start();
        };

        // ── Which section is active? ─────────────────────────────────────
        let io: IntersectionObserver | null = null;
        const visible = new Map<Element, number>();
        const pick = () => {
            // the section covering the most of the middle band of the viewport wins
            let best: Element | null = null;
            let bestRatio = 0;
            visible.forEach((ratio, el) => {
                if (ratio > bestRatio) {
                    bestRatio = ratio;
                    best = el;
                }
            });
            const name = (best as HTMLElement | null)?.dataset.scene;
            if (name === 'none') setShape('none');
            else if (isShapeName(name) && (name !== shape || targetOpacity === 0)) setShape(name);
        };
        const rescan = () => {
            io?.disconnect();
            visible.clear();
            io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => (e.isIntersecting ? visible.set(e.target, e.intersectionRatio) : visible.delete(e.target)));
                    pick();
                },
                { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
            );
            document.querySelectorAll('[data-scene]').forEach((el) => io!.observe(el));
        };
        rescan();
        // lazily-loaded pages mount their sections later — re-observe when [data-scene] nodes appear
        let pending = 0;
        const mo = new MutationObserver(() => {
            cancelAnimationFrame(pending);
            pending = requestAnimationFrame(rescan);
        });
        mo.observe(document.getElementById('main') ?? document.body, { childList: true, subtree: true });

        // ── Layout & input ───────────────────────────────────────────────
        const layout = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            if (shape) setShape(targetOpacity === 0 ? 'none' : shape);
        };
        layout();
        window.addEventListener('resize', layout);

        const pointer = { x: 0, y: 0 };
        const onPointer = (e: PointerEvent) => {
            pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener('pointermove', onPointer, { passive: true });

        let lastScroll = window.scrollY;
        let spin = 0;
        const onScroll = () => {
            const dy = window.scrollY - lastScroll;
            lastScroll = window.scrollY;
            spin += dy * 0.0015; // scrolling gives the cloud a little push
            start();
        };
        window.addEventListener('scroll', onScroll, { passive: true });

        // ── Loop ─────────────────────────────────────────────────────────
        function tick() {
            frame = 0;
            const dt = Math.min(clock.getDelta(), 0.05);
            const k = reduce ? 1 : 1 - Math.exp(-dt * 2.6);

            // morph positions toward the target shape
            let maxDiff = 0;
            for (let i = 0; i < current.length; i++) {
                const d = target[i] - current[i];
                if (d > 0.001 || d < -0.001) {
                    current[i] += d * k;
                    maxDiff = Math.max(maxDiff, Math.abs(d));
                }
            }
            if (maxDiff > 0) posAttr.needsUpdate = true;

            uniforms.uColorA.value.lerp(colorA, k);
            uniforms.uColorB.value.lerp(colorB, k);
            uniforms.uOpacity.value += (targetOpacity - uniforms.uOpacity.value) * k;
            uniforms.uSize.value += (targetSize - uniforms.uSize.value) * k;
            group.position.lerp(targetPos, k);
            group.scale.setScalar(group.scale.x + (targetScale - group.scale.x) * k);

            if (!reduce) {
                uniforms.uTime.value += dt;
                spin *= 0.92;
                group.rotation.y += dt * idleSpin + spin;
                group.rotation.x += (targetTilt + pointer.y * 0.15 - group.rotation.x) * k;
                group.rotation.z += (pointer.x * -0.08 - group.rotation.z) * k;
            }

            renderer.render(scene, camera);

            const faded = targetOpacity === 0 && uniforms.uOpacity.value < 0.005;
            settled = faded || (reduce && maxDiff === 0);
            if (!settled) start();
        }

        function start() {
            if (!frame && !document.hidden) {
                frame = requestAnimationFrame(tick);
            }
        }
        const onVisibility = () => {
            if (document.hidden) {
                cancelAnimationFrame(frame);
                frame = 0;
            } else {
                clock.getDelta();
                start();
            }
        };
        document.addEventListener('visibilitychange', onVisibility);
        start();

        return () => {
            cancelAnimationFrame(frame);
            io?.disconnect();
            mo.disconnect();
            cancelAnimationFrame(pending);
            window.removeEventListener('resize', layout);
            window.removeEventListener('pointermove', onPointer);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
            geo.dispose();
            mat.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        };
    }, []);


    return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5]" />;
}
