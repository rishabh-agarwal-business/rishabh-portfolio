/** Single source of truth for personal details used across the site */
export const profile = {
    name: 'Rishabh Agarwal',
    title: 'Senior Frontend Engineer',
    yearsOfExperience: '7+',
    location: 'Rudrapur, Uttarakhand, India',
    email: 'rishabh.developer1509@gmail.com',
    linkedin: 'https://www.linkedin.com/in/rishi8a69127',
    github: 'https://github.com/rishabh-agarwal-business',
    resume: '/Rishabh_Agarwal.pdf',
    /** Shows the "Open to … roles" badge in the hero. Set to false to hide it. */
    openToWork: true,
} as const;

export interface CaseStudy {
    id: string;
    title: string;
    domain: string;
    techStack: string[];
    keyOutcomes: string[];
    shortDescription: string;
    problemStatement: string;
    businessContext: string;
    technicalArchitecture: string;
    keyChallenges: string[];
    performanceOptimizations: string[];
    failureScenariosHandled: string[];
    systemDesignHighlights: string[];
    tradeoffsAndDecisions: string[];
    futureEnhancements: string[];
    solutionsImplemented: string[];
    impactMetrics: string[];
    demoLink?: string;
    repoLink?: string;
    packageLink?: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    remote: boolean;
}

export const caseStudies: CaseStudy[] = [
    {
        id: "react-virtual-renderer",
        title: "react-virtual-renderer — React Library",
        domain: "Frontend Infrastructure / Developer Tooling",

        techStack: [
            "TypeScript",
            "React",
            "Fenwick Tree (Binary Indexed Tree)",
            "ResizeObserver",
            "IntersectionObserver",
            "Node.js (test/benchmark harness)",
            "npm",
        ],

        keyOutcomes: [
            "Reduced dynamic-height re-measurement cost from O(n) to O(log n), ~2000x faster in benchmarks at 50,000 items",
            "Reduced masonry infinite-scroll append cost from O(n) to O(k) for k new items, ~667x faster at 50,000 items",
            "Eliminated a content-overlap bug traced to five independent, compounding root causes across the measurement pipeline",
            "Published as an installable npm package with a documented, framework-adjacent core architecture",
        ],

        shortDescription:
            "A React virtualization library (lists, grids, and masonry layouts) built around a Fenwick-tree-backed offset engine and an incremental layout engine, designed to stay O(log n) or better on dynamic content at scale rather than degrading as the dataset grows.",

        problemStatement:
            "Most hand-rolled or lightly-adapted virtualization code recomputes offset/position state in full whenever any single item's measured size changes — a pattern that works fine at small scale but degrades badly exactly where virtualization is supposed to help: large, dynamic-height lists and infinite-scrolling grids. The goal was a virtualization core that stays fast as N grows, handles genuinely unpredictable content heights, and supports list, grid, and masonry layouts from the same underlying offset math.",

        businessContext:
            "Built as a standalone open-source npm package and portfolio project, not a company product — the goal was to demonstrate library-level engineering depth (API design, algorithmic tradeoffs, published package) for senior frontend engineering roles, where 'built a CRUD app' doesn't differentiate but 'designed and shipped a performance-critical library other developers would import' does.",

        technicalArchitecture:
            "Core offset/layout math lives in framework-agnostic TypeScript classes (FenwickTree, VirtualizationEngine, GridLayoutEngine, MeasurementSystem) with zero React imports, wrapped by a thin React adapter layer (VirtualList, VirtualGrid, useVirtualList). VirtualizationEngine delegates all offset/size bookkeeping to a Fenwick tree instead of a plain prefix-sum array. GridLayoutEngine maintains running per-column-height (masonry) or per-row-offset (dynamic grid) state and only computes positions for items it hasn't seen, rather than rebuilding the full layout on every items-array change. MeasurementSystem wraps ResizeObserver, batching all size changes from a single browser frame into one flush rather than deferring corrections to a later frame.",

        keyChallenges: [
            "Making dynamic-height offset lookups fast without a full-array rebuild on every re-measurement",
            "Avoiding O(n) masonry/grid layout recomputation when infinite scroll appends items to an already-large board",
            "Diagnosing a multi-cause overlap bug where several independent issues (a disconnected callback wire, an explicit-height box blocking ResizeObserver, content-box vs border-box measurement, unstable ref identities, and deferred-frame corrections) each contributed to the same visible symptom",
            "Growing a Fenwick tree's capacity after construction without invalidating prior point-update propagation — an initial naive implementation of this was provably incorrect and caught by a differential test against a naive reference array",
            "Making infinite scroll's sentinel element reliable inside a virtualized list, where a sentinel nested in a conditionally-rendered last item may never mount in the first place",
        ],

        performanceOptimizations: [
            "Fenwick tree (Binary Indexed Tree) for O(log n) point updates, prefix-sum offset queries, and offset-to-index lookups, replacing an O(n) rebuild-on-write prefix-sum array",
            "Amortized-doubling capacity growth for the Fenwick tree (power-of-two capacity, full rebuild only on doubling events) instead of per-item growth that would have required O(n) work on every append",
            "Incremental append-only masonry/grid layout engine (GridLayoutEngine) that reuses prior position calculations instead of recomputing the full layout on every items-array change",
            "O(1) fast path for fixed-row-height grid layout — direct index arithmetic with zero array allocation, bypassing the general incremental engine entirely for the most common grid configuration",
            "Binary-search visible-range lookup for masonry/dynamic-height grids, replacing a two-pass O(n) linear scan",
            "IntersectionObserver-based infinite scroll instead of a scroll-event listener reading scrollTop/scrollHeight/clientHeight on every event, removing forced synchronous layout reads from the scroll hot path",
            "Synchronous (flushSync-wrapped) measurement correction instead of deferring through an extra manual requestAnimationFrame layered on top of ResizeObserver's own per-frame batching, closing a one-frame visible-overlap window",
        ],

        failureScenariosHandled: [
            "Off-screen (unmounted) items retaining a stale pre-resize height indefinitely after the container's width changes, since ResizeObserver only reports on currently-mounted elements — fixed via debounced full invalidation on cross-axis size change",
            "Fenwick tree capacity growth silently under-counting totals when naive point-updates were bounded by the tree's size at the time of the update rather than its final size — caught by a differential test against a naive array before shipping",
            "Sentinel element for infinite scroll never mounting because it was nested inside a conditionally-rendered last virtualized item — fixed with an always-mounted `footer` slot independent of virtualization",
            "Measurement callback silently discarding every result because the wiring that sets the internal `onMeasure` callback was commented out — traced as the root cause of dynamic heights never updating past their initial estimate",
            "Ref-callback identity churn causing every visible item to be unobserved and re-observed on every scroll frame, from a per-render inline closure instead of a stable per-index cached callback",
            "AbortController cleanup that was constructed but never actually invoked, since the calling hook discarded the cleanup closure a loader function returned",
        ],

        systemDesignHighlights: [
            "Framework-agnostic core (FenwickTree, VirtualizationEngine, GridLayoutEngine) with no React imports, architected so a Vue/Svelte adapter could reuse the same engines without modification",
            "Separation between the 'fast path' (fixed-size grid, pure arithmetic, no data structure) and the 'general path' (masonry/dynamic sizing, incremental engine + binary search) rather than forcing every layout mode through one general algorithm",
            "Injectable synchronous-flush hook (`setFlush`) in MeasurementSystem, letting the framework adapter supply React's flushSync without the core class needing to import react-dom",
            "Accessibility built into the component layer (ARIA live-region range announcements, roving-tabindex keyboard navigation, correct list/grid ARIA semantics) rather than treated as an afterthought layered on top",
        ],

        tradeoffsAndDecisions: [
            "Chose a Fenwick tree over a segment tree or a naive array: O(log n) for both point updates and prefix queries with a much smaller constant factor and simpler implementation than a full segment tree, at the cost of not supporting range updates (not needed here, since only single-item measurements are ever recorded)",
            "Accepted that masonry's binary-search visible-range lookup is an approximation, not pixel-exact, since masonry's y-position isn't strictly monotonic in index order — mitigated with widened overscan rather than solved exactly, since an exact solution would require abandoning index-ordered virtualization entirely",
            "Chose to make all ResizeObserver-triggered corrections flushSync-synchronous, trading a small amount of scroll-performance headroom for eliminating a visible overlap window — considered the right tradeoff since it only fires when content genuinely resizes, not on every scroll frame",
            "Kept the default CSS deliberately minimal (box-sizing and scrollbar hygiene only) rather than shipping opinionated styling, so the library layers under any existing design system without a specificity fight",
        ],

        futureEnhancements: [
            "Split into @virtualize/core (framework-agnostic) and @virtualize/react packages, with the door open for Vue/Svelte adapters reusing the same engines",
            "Publish a reproducible, public benchmark suite comparing against react-window, react-virtuoso, and TanStack Virtual on identical workloads",
            "Bidirectional infinite scroll with scroll-anchor preservation for chat/feed-style prepend-above-viewport loading",
            "Sticky group headers integrated with the virtualization offset math for section-list UIs",
            "SSR-safe initial render of the first visible window to avoid client-hydration layout shift",
        ],

        solutionsImplemented: [
            "FenwickTree core primitive with amortized-doubling capacity growth, differentially tested against a naive reference array (5,000 random re-measurements, chunked incremental append, shrink/regrow, multi-doubling growth)",
            "GridLayoutEngine for incremental masonry and dynamic-row-height grid layout, verified against a fresh full rebuild for both modes",
            "VirtualList and VirtualGrid React components with a unified container/inner/item styling API (default classes merged with consumer-supplied classes and styles, geometry-critical style properties always protected from accidental override)",
            "useInfiniteScroll hook rewritten around IntersectionObserver with a sentinel-ref pattern",
            "Root-cause fixes across the dynamic-height measurement pipeline: reconnected the disconnected onMeasure callback wiring, removed the explicit-height constraint that prevented ResizeObserver from detecting content growth, switched from content-box to border-box measurement, stabilized ref-callback identity, and replaced deferred RAF-based correction with synchronous flushSync-based correction",
        ],

        impactMetrics: [
            "~2000x reduction in re-measurement cost for a 50,000-item dynamic-height list under 2,000 simulated re-measurements (3313ms -> 1.6ms, measured via Node benchmark)",
            "~667x reduction in masonry layout cost when infinite-scroll appending to a 50,000-item board in chunks of 20 (4279ms -> 6.4ms, measured via Node benchmark)",
            "Zero correctness regressions across 8 differential test cases run against naive reference implementations (FenwickTree and GridLayoutEngine test suites)",
            "One critical correctness bug (Fenwick tree capacity growth) caught and fixed before release via differential testing rather than shipped and discovered in production",
        ],
        demoLink: "https://react-virtual-renderer.vercel.app/",
        repoLink: "https://github.com/rishabh-agarwal-business/virtualize",
        packageLink: "https://www.npmjs.com/package/react-virtual-renderer"
    },
    {
        "id": "use-toolkit",
        "title": "use-toolkit: React Hooks Library",
        "domain": "Frontend Engineering / Open Source Systems Design",
        "techStack": [
            "React 18+",
            "TypeScript 5+ (strict mode)",
            "Jest 29+",
            "React Testing Library 14+",
            "tsup (ESM + CJS bundling)",
            "WebSocket API",
            "AbortController API",
            "IndexedDB",
            "localStorage",
            "Intersection Observer API",
            "Network Information API",
            "requestIdleCallback",
            "Node.js 18+",
            "npm",
            "GitHub Actions",
            "ESLint + Prettier"
        ],
        "keyOutcomes": [
            "Built a production-grade React Hooks library with zero dependencies and ~15KB gzipped bundle",
            "Engineered advanced data layer (useQueryLite) with request deduplication, stale-while-revalidate, and intelligent caching",
            "Reduced duplicate API calls by 60–80% using in-flight request tracking and cache reuse",
            "Implemented resilient retry system with exponential backoff and jitter preventing thundering herd issues",
            "Achieved 85%+ test coverage with 150+ test cases covering async hooks, browser APIs, and edge cases",
            "Designed offline-first architecture with message queueing, local persistence, and deterministic recovery",
            "Delivered 12 hooks, 12 demos, and 9 real-world applications (E-commerce, Chat, Dashboard, PWA, etc.)",
            "Reduced bundle size by ~67% compared to React Query while preserving core capabilities",
            "Enabled cross-tab synchronization and zero data loss across refresh, offline, and reconnection scenarios",
            "Published enterprise-grade documentation including deep internals, system design, and implementation patterns"
        ],
        "shortDescription": "Engineered a production-grade React Hooks library solving real-world frontend problems—data fetching with caching & deduplication, resilient WebSocket communication with auto-reconnection, offline-first storage, advanced state management (undo/redo, state machines), and performance optimization (virtualization, lazy loading). Built with zero dependencies, strict TypeScript, 85%+ test coverage, and deep system design principles including SWR, exponential backoff, and cross-tab synchronization.",
        "problemStatement": "Modern React applications require multiple specialized libraries (React Query, Redux, WebSocket wrappers, storage utilities), leading to increased bundle size, complexity, and maintenance overhead. Existing solutions are either too simplistic (lacking caching, retries, offline support) or overly complex and heavy. There is a gap for a lightweight, production-ready solution that integrates core frontend patterns—data fetching, real-time communication, persistence, and performance—without requiring providers or complex setup.",
        "businessContext": "Designed for startups, indie developers, and performance-sensitive applications needing fast iteration and minimal dependencies. Ideal for MVPs, dashboards, real-time apps, and PWAs where bundle size and simplicity are critical. Addresses pain points like slow load times, duplicated network requests, lack of offline support, and fragmented tooling. Applicable to millions of React developers seeking a lightweight alternative to enterprise-heavy frameworks.",
        "technicalArchitecture": "Built as a modular, hook-based system using strict TypeScript with zero external dependencies. Core architecture includes: (1) Data Layer with global cache, in-flight request deduplication, stale-while-revalidate strategy, and retry engine; (2) Real-Time Layer with WebSocket state machine, auto-reconnect, heartbeat detection, and message queueing; (3) State Layer using past/present/future model for undo/redo and finite state machines; (4) Storage Layer with localStorage TTL + cross-tab sync and IndexedDB abstraction; (5) Performance Layer with Intersection Observer, virtualization, and idle task scheduling. Uses tsup for dual ESM/CJS builds and fully tree-shakeable exports.",
        "keyChallenges": [
            "Designing request deduplication system using shared Promise references to eliminate redundant network calls",
            "Implementing stale-while-revalidate pattern balancing UX responsiveness with data freshness",
            "Building retry logic with exponential backoff + jitter to prevent coordinated retry spikes",
            "Preventing memory leaks using AbortController and lifecycle-safe cleanup across async hooks",
            "Handling WebSocket reconnection with state machine design and exponential retry strategies",
            "Ensuring no message loss via offline-safe queueing before connection establishment",
            "Managing cross-tab synchronization using storage events without infinite loops",
            "Designing undo/redo with past-present-future stacks and bounded memory usage",
            "Handling browser API inconsistencies (Network API, IndexedDB, Intersection Observer)",
            "Maintaining full TypeScript inference across generic hooks without sacrificing usability",
            "Testing hooks dependent on browser APIs with robust mocking strategies",
            "Balancing feature richness with strict bundle size constraints (~15KB target)"
        ],
        "performanceOptimizations": [
            "Implemented in-flight request deduplication reducing duplicate API calls by up to 80%",
            "Used stale-while-revalidate to provide instant UI with background data refresh",
            "Applied exponential backoff with jitter preventing server overload during retries",
            "Stored cache outside React state minimizing unnecessary re-renders",
            "Optimized WebSocket message handling using queue + batch processing",
            "Used lazy loading via Intersection Observer reducing initial load time",
            "Implemented virtualization supporting 10,000+ items with constant render cost",
            "Deferred non-critical work using requestIdleCallback avoiding UI blocking",
            "Applied TTL-based cache eviction preventing memory bloat",
            "Optimized storage reads with on-demand expiration checks instead of polling",
            "Minimized object allocations using structural sharing patterns",
            "Enabled tree-shaking ensuring only used hooks are included in bundle"
        ],
        "failureScenariosHandled": [
            "Network failures handled via retry with exponential backoff and capped delays",
            "Component unmount during fetch prevented using AbortController cancellation",
            "Offline WebSocket sends preserved using message queue and replay on reconnect",
            "Zombie WebSocket connections detected using heartbeat mechanism",
            "Cross-tab data inconsistency resolved via storage event synchronization",
            "Stale cache handled via TTL expiration and background revalidation",
            "Undo/redo inconsistencies resolved by clearing future state on new edits",
            "IndexedDB/storage quota issues handled with graceful fallback strategies",
            "Slow network conditions handled via adaptive logic (low-quality assets)",
            "Race conditions in concurrent requests prevented using shared promise registry",
            "Browser API absence handled via progressive enhancement and fallbacks",
            "Memory leaks prevented via cleanup of timers, listeners, and async tasks"
        ],
        "systemDesignHighlights": [
            "Global cache system with request deduplication and stale-while-revalidate strategy",
            "Event-driven architecture enabling decoupled hook composition",
            "Offline-first design with deterministic recovery and replay mechanisms",
            "WebSocket lifecycle managed via finite state machine (connect → reconnect → stable)",
            "Cross-tab synchronization using browser storage events",
            "Exponential backoff with jitter preventing coordinated retry storms",
            "Separation of concerns between data fetching, state, and UI layers",
            "Tree-shakeable modular architecture reducing bundle footprint",
            "Composable hooks enabling flexible integration patterns",
            "Performance-first design minimizing re-renders and blocking operations"
        ],
        "tradeoffsAndDecisions": [
            "Chose lightweight custom solution over React Query to reduce bundle size and complexity",
            "Implemented explicit cache invalidation instead of automatic dependency tracking for predictability",
            "Used localStorage for simplicity over IndexedDB for smaller datasets (with future extensibility)",
            "Prioritized simplicity and composability over feature-heavy abstractions",
            "Avoided provider-based architecture reducing setup overhead",
            "Focused on client-side resilience instead of server-heavy solutions",
            "Implemented manual retry strategy instead of relying on external libraries",
            "Designed hooks to be independent enabling selective usage and tree-shaking"
        ],
        "futureEnhancements": [
            "useStateMachine for complex UI workflows",
            "useIndexedDB for large-scale offline storage",
            "useVirtualizedList for high-performance rendering",
            "useIdleCallback for background processing",
            "DevTools extension for debugging cache and renders",
            "Plugin system for extensibility",
            "Advanced analytics and performance monitoring",
            "CRDT-based real-time sync for collaborative apps"
        ],
        "solutionsImplemented": [
            "useQueryLite: Data fetching with caching, request deduplication, SWR, retry logic, and AbortController support",
            "useMutationLite: Mutations with optimistic updates, cache invalidation, and lifecycle callbacks",
            "useWebSocketAdvanced: Real-time communication with auto-reconnect, backoff, heartbeat, and message queue",
            "useNetworkState: Network quality detection with adaptive behavior support",
            "useUndoRedo: State history using past/present/future stack model",
            "useLocalStorageSync: Cross-tab persistent storage with TTL and sync events",
            "useIntersectionObserverAdvanced: Lazy loading and visibility detection",
            "useRenderTracker: Performance debugging with render analysis",
            "useIndexedDB: Store notes locally, sync to server",
            "useVirtualizedList: Render large lists efficiently",
            "useIdleCallback: Background tasks"
        ],
        "impactMetrics": [
            "Reduced redundant API calls by up to 80% via request deduplication",
            "Improved perceived performance using instant cache-first rendering",
            "Maintained ~15KB gzipped bundle size with zero dependencies",
            "Achieved 85%+ test coverage ensuring reliability across edge cases",
            "Enabled offline-safe operations with zero message/data loss",
            "Supported scalable UI patterns handling 10,000+ items efficiently",
            "Provided production-ready hooks usable independently or combined",
            "Delivered comprehensive documentation covering internals and real-world usage",
            "Improved developer productivity by eliminating need for multiple libraries",
            "Ensured cross-browser compatibility with graceful degradation strategies"
        ],
        repoLink: "https://github.com/rishabh-agarwal-business/use-toolkit",
        packageLink: "https://www.npmjs.com/package/@use-toolkit/core"
    }
];

export const skills: Record<string, string[]> = {
    'Languages': ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
    'Frameworks & Libraries': ['React', 'Next.js', 'Angular', 'Redux Toolkit', 'RTK Query', 'RxJS'],
    'UI & Design Systems': ['Tailwind CSS', 'Material UI', 'Bootstrap', 'Responsive Design', 'Accessibility (a11y)'],
    'Architecture & Patterns': ['Modular Architecture', 'Component-Driven Development', 'State Management Patterns', 'REST APIs'],
    'Security & Quality': ['RBAC', 'OAuth / JWT Auth', 'Jest', 'React Testing Library', 'Performance Optimization'],
    'Tools & Infrastructure': ['Git', 'Vite', 'Webpack', 'Docker', 'Node.js / Express', 'AWS (S3, CloudFront, Lambda)', 'CI/CD Pipelines']
};

export const experience: Experience[] = [
    {
        company: "Alcon Laboratories",
        role: "Senior Associate II",
        period: "Oct 2024 – Present | Bengaluru",
        description:
            "Working on the Marlo healthcare platform delivering scalable B2B2C and B2C solutions, including Patient and ECP portals.",
        highlights: [
            "Developed and enhanced the Marlo healthcare platform supporting both B2B2C and B2C models.",
            "Built the ECP portal using React, Redux Toolkit, and Material UI, reducing state-management complexity by ~40% and integrating OAuth authentication.",
            "Optimized the Patient portal using Angular and TypeScript with a modular, responsive architecture, improving page-load performance by ~30%.",
            "Improved application performance and maintainability through optimized frontend architecture.",
            "Collaborated with cross-functional teams to improve delivery speed and overall platform stability."
        ],
        remote: false
    },
    {
        company: "Vorro India",
        role: "Senior Frontend Developer",
        period: "Feb 2023 – Oct 2024 | Rudrapur",
        description:
            "Focused on building high-performance frontend systems and reusable React components for data-driven applications.",
        highlights: [
            "Built a React-based data transformation tool using JavaScript, HTML, CSS, and Material UI.",
            "Reduced processing time by approximately 40% through optimized workflows.",
            "Improved data accuracy by around 25% using efficient state handling and validation logic.",
            "Developed complex, reusable React components handling multiple edge cases and dynamic states.",
            "Enhanced application stability, scalability, and long-term maintainability."
        ],
        remote: true
    },
    {
        company: "Deloitte",
        role: "Consultant",
        period: "Jan 2022 – Jan 2023 | Gurugram",
        description:
            "Led frontend development initiatives for enterprise-scale applications with a focus on usability and efficiency.",
        highlights: [
            "Architected intuitive and responsive user interfaces using Angular, React, TypeScript, JavaScript, HTML, CSS, and Bootstrap.",
            "Achieved approximately 25% increase in user satisfaction through improved UI/UX.",
            "Led frontend development of a Waste Management tracking system.",
            "Reduced scheduling inaccuracies by about 20% through accurate driver-hour tracking.",
            "Optimized time-tracking and reporting workflows, improving operational efficiency by around 30%."
        ],
        remote: false
    },
    {
        company: "Capgemini",
        role: "Senior Software Engineer",
        period: "Mar 2019 – Jan 2022 | Pune",
        description:
            "Worked on enterprise banking solutions, secure platforms, and large-scale frontend systems.",
        highlights: [
            "Designed and delivered Genie, a secure enterprise search engine for banking users.",
            "Centralized access to databases and documents, streamlining daily operations.",
            "Integrated document and file management systems into a unified interface.",
            "Implemented role-based access control (RBAC) for secure file sharing and compliance.",
            "Led cross-regional teams through strategic resource planning, contributing to a ~15% increase in sales.",
            "Contributed to AIQUIC and FNOL integration initiatives for enterprise platforms."
        ],
        remote: false
    }
];

