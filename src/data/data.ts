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
    solutionsImplemented: string[];
    impactMetrics: string[];
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    [index: number]: any;
}

export const caseStudies: CaseStudy[] = [
    {
        id: 'marlo',
        title: 'Marlo – Healthcare Platform',
        domain: 'Healthcare (B2B2C & B2C)',
        techStack: ['React', 'Redux Toolkit', 'TypeScript', 'Material UI'],
        keyOutcomes: ['Improved user engagement', 'Enhanced data security', 'Scalable architecture'],
        shortDescription: 'Built a comprehensive healthcare platform serving both business and consumer users with advanced role-based access control.',
        problemStatement: 'Healthcare providers needed a unified platform to manage patient data, appointments, and clinical workflows while maintaining strict HIPAA compliance and supporting multiple user roles.',
        businessContext: 'Marlo serves healthcare organizations and individual patients, requiring a dual-mode interface that handles complex enterprise workflows and simple consumer interactions seamlessly.',
        technicalArchitecture: 'Implemented a modular React architecture with Redux Toolkit for predictable state management. Utilized TypeScript for type safety across the application. Designed a comprehensive RBAC system with granular permissions. Created reusable Material UI components following enterprise design patterns.',
        keyChallenges: [
            'Balancing complex enterprise workflows with simple consumer UX',
            'Implementing HIPAA-compliant data handling and encryption',
            'Managing state across multiple user roles and permissions',
            'Ensuring performance with large datasets and real-time updates'
        ],
        solutionsImplemented: [
            'Developed a modular component library with role-specific UI variations',
            'Implemented end-to-end encryption for sensitive health data',
            'Created a custom RBAC middleware with Redux Toolkit',
            'Optimized rendering with React.memo and virtualization for large lists',
            'Built a real-time notification system using WebSockets'
        ],
        impactMetrics: [
            '40% reduction in page load times through code splitting',
            '99.9% uptime maintaining HIPAA compliance standards',
            'Successfully scaled to support 50,000+ active users',
            'Reduced security incidents by 85% with enhanced access controls'
        ]
    },
    {
        id: 'genie',
        title: 'Genie – Secure Banking Search Engine',
        domain: 'FinTech',
        techStack: ['Angular', 'RxJS', 'TypeScript', 'Custom Security Framework'],
        keyOutcomes: ['Bank-grade security', 'Sub-second search results', 'Regulatory compliance'],
        shortDescription: 'Developed a high-security search platform for banking applications with real-time data encryption and compliance monitoring.',
        problemStatement: 'Financial institutions required a powerful search engine that could handle sensitive banking data while maintaining strict security protocols and regulatory compliance across multiple jurisdictions.',
        businessContext: 'Banks need to provide instant access to financial records, transactions, and customer data while ensuring zero data leakage and maintaining audit trails for regulatory compliance.',
        technicalArchitecture: 'Built with Angular for robust enterprise application structure. Leveraged RxJS for reactive data streams and complex async operations. Implemented multi-layer security with custom encryption protocols. Created a sophisticated caching strategy for performance optimization.',
        keyChallenges: [
            'Implementing end-to-end encryption without compromising search speed',
            'Managing complex regulatory requirements across different regions',
            'Handling concurrent searches with large datasets efficiently',
            'Maintaining detailed audit logs without performance degradation'
        ],
        solutionsImplemented: [
            'Developed a custom security framework with field-level encryption',
            'Implemented intelligent caching with secure data invalidation',
            'Created a sophisticated query optimizer for complex financial searches',
            'Built comprehensive audit logging system with minimal performance impact',
            'Designed a modular architecture supporting multi-tenancy'
        ],
        impactMetrics: [
            'Achieved sub-500ms average search response time',
            'Passed SOC 2 Type II and PCI DSS compliance audits',
            'Processed 10M+ searches daily with 99.99% accuracy',
            'Zero security breaches across 2+ years of production use'
        ]
    },
    {
        id: 'data-transform',
        title: 'Data Transformation Tool',
        domain: 'Enterprise SaaS',
        techStack: ['React', 'Redux', 'Web Workers', 'Custom Performance Framework'],
        keyOutcomes: ['90% faster processing', 'Improved UX', 'Scalable to large datasets'],
        shortDescription: 'Optimized a data transformation tool handling large datasets with advanced performance optimization techniques.',
        problemStatement: 'Enterprise users struggled with slow data transformation processes that blocked the UI and caused frustration when working with large CSV and JSON files exceeding 100MB.',
        businessContext: 'Data teams needed to quickly transform, validate, and export large datasets without experiencing browser freezes or crashes, while maintaining data integrity throughout the process.',
        technicalArchitecture: 'Leveraged Web Workers for off-main-thread data processing. Implemented virtual scrolling for efficient rendering of large datasets. Created a custom state management pattern optimized for bulk operations. Utilized IndexedDB for client-side data persistence.',
        keyChallenges: [
            'Processing large files without blocking the main thread',
            'Maintaining UI responsiveness during intensive operations',
            'Memory management for datasets exceeding available RAM',
            'Ensuring data integrity during complex transformations'
        ],
        solutionsImplemented: [
            'Implemented Web Workers for parallel data processing',
            'Created virtual scrolling with dynamic row heights',
            'Developed streaming data processing for files larger than memory',
            'Built an optimized diff algorithm for tracking changes',
            'Implemented progressive loading with visual feedback'
        ],
        impactMetrics: [
            '90% improvement in processing speed for 100MB+ files',
            'Zero UI blocking during data operations',
            'Successfully handled datasets up to 500MB in browser',
            'Reduced user-reported errors by 75%'
        ]
    }
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
        company: 'Enterprise Health Solutions',
        role: 'Senior Frontend Engineer',
        period: '2021 - Present',
        description: 'Led frontend development for healthcare platforms serving 50,000+ users',
        highlights: [
            'Architected scalable React applications with TypeScript',
            'Implemented HIPAA-compliant security measures',
            'Mentored junior developers and conducted code reviews'
        ]
    },
    {
        company: 'FinTech Innovations Inc.',
        role: 'Frontend Engineer',
        period: '2019 - 2021',
        description: 'Developed secure banking applications with Angular',
        highlights: [
            'Built high-performance search functionality',
            'Ensured regulatory compliance (SOC 2, PCI DSS)',
            'Optimized application performance and security'
        ]
    },
    {
        company: 'Tech Solutions Ltd.',
        role: 'Frontend Developer',
        period: '2017 - 2019',
        description: 'Created data-intensive web applications',
        highlights: [
            'Developed data transformation tools',
            'Implemented performance optimizations',
            'Collaborated with cross-functional teams'
        ]
    }
];
