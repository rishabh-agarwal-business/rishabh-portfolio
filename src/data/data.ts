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

export interface ArchitectureLayer {
    label: string;
    items: string[];
}

export interface CaseStudy {
    id: string;
    title: string;
    /** One-line pitch shown under the title */
    tagline: string;
    domain: string;
    role: string;
    status?: string;
    techStack: string[];
    /** Small "by the numbers" tiles; only verifiable facts */
    highlights: { value: string; label: string }[];
    keyOutcomes: string[];
    shortDescription: string;
    problemStatement: string;
    businessContext: string;
    technicalArchitecture: string;
    architecture: ArchitectureLayer[];
    keyChallenges: string[];
    performanceOptimizations: string[];
    failureScenariosHandled: string[];
    systemDesignHighlights: string[];
    tradeoffsAndDecisions: string[];
    futureEnhancements: string[];
    solutionsImplemented: string[];
    impactMetrics: string[];
    demoLink?: string;
    youtubeLink?: string;
    repoLink?: string;
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
        id: "namastescale",
        title: "NamasteScale",
        tagline: "A full-stack SaaS learning platform that takes engineers from junior to staff level in frontend and backend system design.",
        domain: "EdTech SaaS · Full-stack product",
        role: "Founder & sole engineer — product, design, frontend, backend, infrastructure",
        status: "Live since Nov 2026",

        techStack: [
            "React 19",
            "TypeScript",
            "Vite",
            "Tailwind CSS v4",
            "TanStack Query",
            "Zustand",
            "React Flow",
            "CodeMirror 6",
            "NestJS 11 + Fastify",
            "PostgreSQL + Drizzle",
            "Redis + BullMQ",
            "Zod (shared contracts)",
            "Claude (Anthropic API / Bedrock)",
            "OAuth / OIDC (Google, GitHub)",
            "Razorpay",
            "AWS (EC2, RDS, S3, SES, CDK)",
            "Cloudflare CDN",
            "Docker + Caddy",
            "Vitest",
            "GitHub Actions",
        ],

        highlights: [
            { value: "120+", label: "REST endpoints, versioned under /v1" },
            { value: "30+", label: "PostgreSQL tables with versioned migrations" },
            { value: "6", label: "AI roles: reviewer, scorer, mentor, interviewer, architecture & debugging" },
            { value: "~80%", label: "lower launch hosting cost vs. the autoscaled stack" },
        ],

        keyOutcomes: [
            "Designed, built and launched a production SaaS end to end as a solo engineer — live at namastescale.com",
            "AI-powered reviewer, mentor and mock interviewer that degrade to built-in rule-based engines, so learning never stops when the model is unavailable",
            "Interactive Architecture Lab: drag-and-drop system design canvas with automated architecture review",
            "Production-grade auth and billing: hashed opaque sessions, CSRF protection, TOTP 2FA, OAuth, signature-checked and idempotent Razorpay webhooks",
            "Structured system design practice: every question follows RADIO (+ estimates) for frontend or a 7-step framework for backend, with a guided walkthrough",
            "Launch infrastructure at ~$35–45/month behind Cloudflare's CDN, with a fully written AWS CDK path to an autoscaled multi-AZ setup",
        ],

        shortDescription:
            "NamasteScale is a learning platform for frontend and backend system design: learning paths, a concept explorer, design and coding challenges, an architecture lab, AI-reviewed answers, AI mock interviews and an AI-assisted debugging round. I built the whole product — a React 19 web app, a NestJS API with a BullMQ worker, PostgreSQL, and the AWS infrastructure it runs on.",

        problemStatement:
            "Engineers preparing for senior and staff roles end up juggling several paid platforms — one for frontend system design, one for backend, another for mock interviews — and most of them only show a model answer. What's missing is feedback on your answer: what you missed, how it scores, and what to improve next. Interviews are also changing: companies now run AI-allowed debugging rounds, and there is almost nowhere to practise one.",

        businessContext:
            "A bootstrapped product I run as a sole proprietor. It launches with a generous Free tier and one Pro plan (monthly, yearly or lifetime) priced by country — rupees in India and a fairer USD tier for lower-income countries — with payments through Razorpay. The goal was a product that's cheap to run at launch but doesn't need a rewrite to scale, and where every AI call is metered against the plan so costs stay predictable.",

        technicalArchitecture:
            "Two repositories. The web app is React 19 + Vite with TanStack Query for server state and Zustand for client state; components depend only on per-domain service interfaces, with HTTP adapters bound behind them, so implementations can be swapped without touching UI. The backend is an npm-workspaces monorepo: a NestJS 11 API on Fastify, a BullMQ worker for email, images, invoices and AI jobs, a Drizzle/PostgreSQL data package, and a Zod contracts package that is the single source of truth for request/response schemas, plans and pricing — copied into the web app so forms and the API validate with the same schemas. Web and API are always same-origin (/api/* routed by the proxy), so session cookies stay first-party and there is no CORS. At launch everything runs on one EC2 Graviton instance behind Caddy with RDS PostgreSQL, S3 and SES; the infra package also defines (in AWS CDK) the scale-up version: CloudFront + WAF, ECS Fargate, Aurora Serverless v2, ElastiCache and Bedrock.",

        architecture: [
            { label: "Client", items: ["React 19 SPA", "TanStack Query", "Zustand", "React Flow canvas", "CodeMirror editor"] },
            { label: "Edge", items: ["Cloudflare CDN", "Caddy (HTTPS, headers, caching)", "Same-origin /api routing", "CloudFront + WAF (scale-up)"] },
            { label: "Application", items: ["NestJS 11 + Fastify API", "BullMQ worker", "Zod contracts", "Claude (Anthropic / Bedrock)"] },
            { label: "Data & services", items: ["PostgreSQL (RDS)", "Redis", "S3", "SES", "Razorpay"] },
        ],

        keyChallenges: [
            "Making AI feedback reliable and affordable: per-user rate limits, plan-based allowances and model tiers, and structured outputs that the UI can render safely",
            "Keeping the product usable when a dependency is missing — no model, no payment keys, no email provider — without branching the UI everywhere",
            "Sharing one set of validation schemas, plans and prices between two repositories without drift",
            "Building secure, first-party authentication (sessions, CSRF, 2FA, Google/GitHub OAuth, one active device per account) without a third-party auth service",
            "Handling payments correctly: verifying checkout signatures, processing webhooks exactly once, and applying the single best discount across sales, coupons and referrals",
            "Shipping on a tight launch date while still leaving a clean path from one server to an autoscaled cloud setup",
        ],

        performanceOptimizations: [
            "Server state cached and deduplicated with TanStack Query; client state read through narrow Zustand selectors to avoid unnecessary re-renders",
            "React Compiler enabled for automatic memoization across the app",
            "Sessions hashed in PostgreSQL and cached in Redis, so authenticated requests don't hit the database on every call",
            "Static assets served from Cloudflare's edge cache worldwide; the origin trusts only Cloudflare's IP ranges and reads the real visitor IP",
            "Slow work (emails, image processing, invoices, AI jobs) moved off the request path into a BullMQ worker",
            "Hashed static assets cached for a year at the edge, with index.html revalidated on every deploy",
            "Cheaper, faster model tier on Free and the advanced tier on Pro, chosen per request by the plan service",
        ],

        failureScenariosHandled: [
            "AI unavailable or allowance used up → the web app falls back to built-in rule-based reviewer, mentor and interviewer engines",
            "Model call fails → the request returns a clear, retryable error and the learner is never charged usage for it",
            "Duplicate or replayed Razorpay webhooks → signature-checked and de-duplicated by event id (idempotent)",
            "Concurrent deploys running migrations → serialised with a Postgres advisory lock; migrations are kept backwards compatible",
            "Unhealthy release on the scale-up stack → ECS deployment circuit breaker rolls back automatically",
            "Misconfigured environment → every variable is validated at startup and the process refuses to start with a list of what's missing",
            "Guest progress at sign-in → uploaded once and its XP recomputed on the server, so clients can't award themselves XP",
            "Signing in on a new device → the previous session is revoked, so one account is active on one device at a time",
            "Payment confirmed by Razorpay but the browser closed before confirming → the webhook still activates the plan",
        ],

        systemDesignHighlights: [
            "Dependency inversion in the web app: components import a domain service interface; swapping an implementation is a one-line binding change",
            "Open/closed content model: frontend/backend challenge differences, lesson kinds and architecture-review rules are data tables, not if/else chains",
            "Contracts package as the single source of truth for schemas, plans, limits and pricing across API, worker and web",
            "Uniform API conventions: everything under /v1, one error shape with a request id, money stored in paise, UUIDv7 ids, timestamptz everywhere",
            "Admin CMS backed by Postgres with drafts, publishing and version restore; database seeds never overwrite admin edits",
            "First-party, cookie-less analytics that honours Do Not Track",
        ],

        tradeoffsAndDecisions: [
            "Launched on a single EC2 server (~$35–45/month) instead of the autoscaled ECS/Aurora stack (~$200+/month) — accepted less redundancy at launch in exchange for ~80% lower cost, with the full CDK stack ready for when traffic needs it",
            "Opaque server-side sessions in httpOnly cookies over JWTs — easy revocation and per-device session management, at the cost of a Redis/DB lookup (mitigated by caching)",
            "Same-origin API instead of a separate API domain — no CORS and first-party cookies, at the cost of routing rules at the edge",
            "Two repositories with a synced contracts copy instead of one monorepo — independent deploys for web and API, with a sync script to prevent schema drift",
            "XP and plan state decided only by the server — more backend work, but impossible to cheat from the client",
        ],

        futureEnhancements: [
            "Move to the autoscaled AWS stack (CloudFront, ECS Fargate, Aurora Serverless v2) as traffic grows",
            "Turn on Razorpay live payments for the Pro plan",
            "Grow the companion @namastescale YouTube channel with animated system-design videos and Shorts",
            "AI help chatbot inside the app (currently shown as coming soon)",
            "Community features and leaderboards",
        ],

        solutionsImplemented: [
            "AI service pipeline: rate limit → plan allowance (also picks the model tier) → model call with schema-validated JSON → usage recorded in cost-weighted units only on success",
            "AI reviewer that scores system design answers against a weighted rubric and shows a suggested answer on demand",
            "AI mock interviewer with follow-up questions, scored once at the end of the session",
            "AI-assisted debugging round modelled on AI-allowed interviews: find bugs in a codebase with limited AI help, judged on results and prompt quality",
            "Step-based system design content: RADIO + estimates for frontend, a 7-step framework for backend, with a walkthrough tab for every question",
            "Sign in with Google or GitHub (OpenID Connect), one account per email",
            "Architecture Lab built on React Flow with a rule-based architecture review",
            "Account security: password change, TOTP 2FA (required for admins in production), session list and revoke, OAuth connect/disconnect, data export and account deletion",
            "Growth engine: festival sales, coupon codes and referral rewards, with the server always applying the single best discount",
            "Two deploy paths: a one-command EC2 deploy script with instant website rollback, and a GitHub Actions + AWS CDK pipeline for the scale-up stack",
        ],

        impactMetrics: [
            "Launched to production at namastescale.com in November 2026",
            "120+ REST endpoints and 30+ database tables behind a single, consistent API contract",
            "~80% lower launch hosting cost (~$35–45/month vs ~$200+/month) without giving up a path to scale",
            "AI features stay usable at zero model cost through rule-based fallbacks",
        ],

        demoLink: "https://namastescale.com",
        youtubeLink: "https://www.youtube.com/@namastescale",
    },
];

export const skills: Record<string, string[]> = {
    'Languages': ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
    'Frameworks & Libraries': ['React 19', 'Next.js', 'Angular', 'Redux Toolkit', 'RTK Query', 'TanStack Query', 'Zustand', 'RxJS', 'React Flow', 'three.js'],
    'UI & Design Systems': ['Tailwind CSS', 'Material UI', 'Bootstrap', 'Responsive Design', 'Accessibility (a11y)'],
    'Architecture & Patterns': ['Frontend System Design (RADIO)', 'Modular Architecture', 'SOLID / Dependency Inversion', 'Component-Driven Development', 'State Management Patterns', 'REST API Design', 'Schema-shared Contracts (Zod)'],
    'Security & Quality': ['RBAC', 'OAuth / OIDC', 'Session Auth + CSRF', 'TOTP 2FA', 'Jest', 'Vitest', 'React Testing Library', 'Performance Optimization'],
    'Backend & Data': ['Node.js / Express', 'NestJS + Fastify', 'PostgreSQL', 'Drizzle ORM', 'Redis', 'BullMQ', 'MongoDB', 'Razorpay', 'LLM integration (Claude)'],
    'Tools & Infrastructure': ['Git', 'Vite', 'Webpack', 'Docker', 'Caddy', 'AWS (EC2, RDS, S3, SES, CloudFront, CDK)', 'Cloudflare', 'GitHub Actions CI/CD']
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

