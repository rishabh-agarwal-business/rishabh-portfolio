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
        id: 'realtime-code-editor',
        title: 'Realtime Collaborative Code Editor',
        domain: 'Developer Tools / Realtime Collaboration',
        techStack: [
            'React',
            'TypeScript',
            'Monaco Editor',
            'WebSockets',
            'LocalStorage'
        ],
        keyOutcomes: [
            'Realtime multi-user collaboration',
            'Offline-first editing with deterministic recovery',
            'Correctness-first synchronization model',
            'Scalable and extensible collaboration architecture'
        ],
        shortDescription:
            'Built a production-grade realtime collaborative code editor inspired by VS Code Live Share, emphasizing correctness, offline resilience, and performance.',
        problemStatement:
            'Developers require realtime collaboration tools that remain correct during concurrent edits, network failures, and multi-tab usage without sacrificing editor performance.',
        businessContext:
            'The platform targets developers and teams for pair programming, collaborative interviews, and live coding sessions, requiring low latency, high reliability, and consistent state across users.',
        technicalArchitecture:
            'Designed a layered architecture where Monaco Editor is the authoritative source of document and language state. A decoupled collaboration controller handles intent-based events, versioning, permissions, and offline queuing, while WebSockets act as a stateless transport layer. React is limited to UI orchestration.',
        keyChallenges: [
            'Avoiding React-controlled editor state to prevent performance degradation',
            'Ensuring deterministic behavior under concurrent text edits',
            'Synchronizing editor language across users without dual sources of truth',
            'Recovering edits safely during network outages and browser refreshes',
            'Rendering multi-user cursor presence efficiently'
        ],
        solutionsImplemented: [
            'Implemented an OT-lite collaboration model using versioned TEXT_DELTA events with monotonic ordering',
            'Decoupled editor logic from React by emitting typed editor intent events',
            'Built an offline delta queue persisted to localStorage and replayed deterministically on reconnect',
            'Treated language as collaborative state applied directly to the Monaco model and synchronized via LANGUAGE_CHANGE events',
            'Implemented role-based permissions (Leader, Editor, Viewer) with read-only enforcement for viewers',
            'Optimized performance by batching high-frequency edits per animation frame and isolating presence updates'
        ],
        performanceOptimizations: [
            'Batched text delta emissions to reduce WebSocket overhead during rapid typing',
            'Isolated cursor and selection updates as best-effort, non-blocking operations',
            'Prevented multi-tab echo loops by ignoring self-originated events',
            'Minimized React re-renders by keeping editor state outside React'
        ],
        failureScenariosHandled: [
            'Network disconnection during active editing',
            'Browser refresh while offline',
            'Out-of-order or stale remote edit events',
            'Concurrent edits from multiple users',
            'Multiple tabs opened by the same user'
        ],
        systemDesignHighlights: [
            'Monaco Editor as the single source of truth for document and language state',
            'Intent-based collaboration model decoupled from UI and transport layers',
            'Deterministic ordering guarantees for text correctness',
            'Offline-first design with durable local persistence'
        ],
        tradeoffsAndDecisions: [
            'Chose OT-lite over CRDT to reduce complexity while preserving deterministic behavior',
            'Prioritized document correctness over perfect cursor presence fidelity',
            'Deferred server-side persistence in favor of client-side offline recovery for faster iteration'
        ],
        futureEnhancements: [
            'CRDT-based collaboration for large rooms and long-lived sessions',
            'Server-side persistence with snapshots and delta compaction',
            'Multi-file workspace and file tree support',
            'Voice/video integration for pair programming',
            'Fine-grained moderation and access controls'
        ],
        impactMetrics: [
            'Zero data loss during offline and reconnect scenarios',
            'Sub-50ms perceived latency for local edits',
            'Stable multi-user synchronization across tabs and browsers',
            'Architecture designed to scale to CRDT without major refactor'
        ]
    },
    // {
    //     id: 'genie',
    //     title: 'Genie – Secure Banking Search Engine',
    //     domain: 'FinTech',
    //     techStack: ['Angular', 'RxJS', 'TypeScript', 'Custom Security Framework'],
    //     keyOutcomes: ['Bank-grade security', 'Sub-second search results', 'Regulatory compliance'],
    //     shortDescription: 'Developed a high-security search platform for banking applications with real-time data encryption and compliance monitoring.',
    //     problemStatement: 'Financial institutions required a powerful search engine that could handle sensitive banking data while maintaining strict security protocols and regulatory compliance across multiple jurisdictions.',
    //     businessContext: 'Banks need to provide instant access to financial records, transactions, and customer data while ensuring zero data leakage and maintaining audit trails for regulatory compliance.',
    //     technicalArchitecture: 'Built with Angular for robust enterprise application structure. Leveraged RxJS for reactive data streams and complex async operations. Implemented multi-layer security with custom encryption protocols. Created a sophisticated caching strategy for performance optimization.',
    //     keyChallenges: [
    //         'Implementing end-to-end encryption without compromising search speed',
    //         'Managing complex regulatory requirements across different regions',
    //         'Handling concurrent searches with large datasets efficiently',
    //         'Maintaining detailed audit logs without performance degradation'
    //     ],
    //     solutionsImplemented: [
    //         'Developed a custom security framework with field-level encryption',
    //         'Implemented intelligent caching with secure data invalidation',
    //         'Created a sophisticated query optimizer for complex financial searches',
    //         'Built comprehensive audit logging system with minimal performance impact',
    //         'Designed a modular architecture supporting multi-tenancy'
    //     ],
    //     performanceOptimizations: [
    //         'Batched text delta emissions to reduce WebSocket overhead during rapid typing',
    //         'Isolated cursor and selection updates as best-effort, non-blocking operations',
    //         'Prevented multi-tab echo loops by ignoring self-originated events',
    //         'Minimized React re-renders by keeping editor state outside React'
    //     ],
    //     failureScenariosHandled: [
    //         'Network disconnection during active editing',
    //         'Browser refresh while offline',
    //         'Out-of-order or stale remote edit events',
    //         'Concurrent edits from multiple users',
    //         'Multiple tabs opened by the same user'
    //     ],
    //     systemDesignHighlights: [
    //         'Monaco Editor as the single source of truth for document and language state',
    //         'Intent-based collaboration model decoupled from UI and transport layers',
    //         'Deterministic ordering guarantees for text correctness',
    //         'Offline-first design with durable local persistence'
    //     ],
    //     tradeoffsAndDecisions: [
    //         'Chose OT-lite over CRDT to reduce complexity while preserving deterministic behavior',
    //         'Prioritized document correctness over perfect cursor presence fidelity',
    //         'Deferred server-side persistence in favor of client-side offline recovery for faster iteration'
    //     ],
    //     futureEnhancements: [
    //         'CRDT-based collaboration for large rooms and long-lived sessions',
    //         'Server-side persistence with snapshots and delta compaction',
    //         'Multi-file workspace and file tree support',
    //         'Voice/video integration for pair programming',
    //         'Fine-grained moderation and access controls'
    //     ],
    //     impactMetrics: [
    //         'Achieved sub-500ms average search response time',
    //         'Passed SOC 2 Type II and PCI DSS compliance audits',
    //         'Processed 10M+ searches daily with 99.99% accuracy',
    //         'Zero security breaches across 2+ years of production use'
    //     ]
    // },
    // {
    //     id: 'data-transform',
    //     title: 'Data Transformation Tool',
    //     domain: 'Enterprise SaaS',
    //     techStack: ['React', 'Redux', 'Web Workers', 'Custom Performance Framework'],
    //     keyOutcomes: ['90% faster processing', 'Improved UX', 'Scalable to large datasets'],
    //     shortDescription: 'Optimized a data transformation tool handling large datasets with advanced performance optimization techniques.',
    //     problemStatement: 'Enterprise users struggled with slow data transformation processes that blocked the UI and caused frustration when working with large CSV and JSON files exceeding 100MB.',
    //     businessContext: 'Data teams needed to quickly transform, validate, and export large datasets without experiencing browser freezes or crashes, while maintaining data integrity throughout the process.',
    //     technicalArchitecture: 'Leveraged Web Workers for off-main-thread data processing. Implemented virtual scrolling for efficient rendering of large datasets. Created a custom state management pattern optimized for bulk operations. Utilized IndexedDB for client-side data persistence.',
    //     keyChallenges: [
    //         'Processing large files without blocking the main thread',
    //         'Maintaining UI responsiveness during intensive operations',
    //         'Memory management for datasets exceeding available RAM',
    //         'Ensuring data integrity during complex transformations'
    //     ],
    //     solutionsImplemented: [
    //         'Implemented Web Workers for parallel data processing',
    //         'Created virtual scrolling with dynamic row heights',
    //         'Developed streaming data processing for files larger than memory',
    //         'Built an optimized diff algorithm for tracking changes',
    //         'Implemented progressive loading with visual feedback'
    //     ],
    //     performanceOptimizations: [
    //         'Batched text delta emissions to reduce WebSocket overhead during rapid typing',
    //         'Isolated cursor and selection updates as best-effort, non-blocking operations',
    //         'Prevented multi-tab echo loops by ignoring self-originated events',
    //         'Minimized React re-renders by keeping editor state outside React'
    //     ],
    //     failureScenariosHandled: [
    //         'Network disconnection during active editing',
    //         'Browser refresh while offline',
    //         'Out-of-order or stale remote edit events',
    //         'Concurrent edits from multiple users',
    //         'Multiple tabs opened by the same user'
    //     ],
    //     systemDesignHighlights: [
    //         'Monaco Editor as the single source of truth for document and language state',
    //         'Intent-based collaboration model decoupled from UI and transport layers',
    //         'Deterministic ordering guarantees for text correctness',
    //         'Offline-first design with durable local persistence'
    //     ],
    //     tradeoffsAndDecisions: [
    //         'Chose OT-lite over CRDT to reduce complexity while preserving deterministic behavior',
    //         'Prioritized document correctness over perfect cursor presence fidelity',
    //         'Deferred server-side persistence in favor of client-side offline recovery for faster iteration'
    //     ],
    //     futureEnhancements: [
    //         'CRDT-based collaboration for large rooms and long-lived sessions',
    //         'Server-side persistence with snapshots and delta compaction',
    //         'Multi-file workspace and file tree support',
    //         'Voice/video integration for pair programming',
    //         'Fine-grained moderation and access controls'
    //     ],
    //     impactMetrics: [
    //         '90% improvement in processing speed for 100MB+ files',
    //         'Zero UI blocking during data operations',
    //         'Successfully handled datasets up to 500MB in browser',
    //         'Reduced user-reported errors by 75%'
    //     ]
    // }
];

export const skills = {
    'Languages': ['JavaScript (ES6+)', 'TypeScript'],
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

