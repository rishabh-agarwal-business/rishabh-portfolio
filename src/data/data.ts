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
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    remote: boolean;
    [index: number]: any;
}

export const caseStudies: CaseStudy[] = [
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
        ]
    }
];

export const skills = {
    'Languages': ['JavaScript (ES6+)', 'TypeScript', 'Python'],
    'Frameworks & Libraries': ['React', 'Angular', 'Redux', 'Redux Toolkit', 'RxJS'],
    'UI & Design Systems': ['Material UI', 'Bootstrap', 'Responsive Design', 'CSS-in-JS'],
    'Architecture & Patterns': ['Modular Architecture', 'Component-Driven Development', 'State Management Patterns'],
    'Security & Quality': ['RBAC Implementation', 'Data Encryption', 'Performance Optimization', 'Code Quality & Testing'],
    'Tools & Infrastructure': ['Git', 'Webpack', 'npm/yarn', 'CI/CD Pipelines']
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
            "Built the ECP portal using React, Redux Toolkit, and Material UI, enabling scalable state management and consistent UI.",
            "Improved application performance and maintainability through optimized frontend architecture.",
            "Developed and optimized the Patient portal using Angular and TypeScript with a modular, responsive design.",
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

