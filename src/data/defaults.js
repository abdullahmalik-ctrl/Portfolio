export const DEFAULT_PROFILE = {
  name: "Abdullah",
  title: "Full Stack Engineer & UI Designer",
  bio: "I build accessible, pixel-perfect, and performant web experiences. Passionate about merging clean code with stunning design.",
  email: "abdullahmalikmmm42@gmail.com",
  github: "https://github.com/abdullahmalik-ctrl",
  linkedin: "https://www.linkedin.com/in/abdullah-malik-4193a13ba?",
  instagram: "https://www.instagram.com/abdullah_._malik_?",
  facebook: "https://www.facebook.com/abdullah.malik.here.2025"
};

export const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    clientName: "Sarah Jenkins",
    company: "Bloom Tech",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    quote: "The attention to detail and performance optimization was incredible. Our conversion rates doubled after the redesign.",
    rating: 5
  },
  {
    id: 2,
    clientName: "Mark Thompson",
    company: "Nexus Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    quote: "Delivered the project 2 weeks early and the code quality was top-notch. Highly recommended for complex SaaS builds.",
    rating: 5
  },
  {
    id: 3,
    clientName: "Emily Chen",
    company: "Artistry DAO",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    quote: "A true professional who understands both design and engineering. The Web3 integration was flawless.",
    rating: 5
  }
];

export const DEFAULT_MEETINGS = [
  { id: 1, client: "Nexus Solutions", date: "2024-03-15", time: "10:00", topic: "Weekly Sprint Review", status: "Confirmed" },
  { id: 2, client: "Bloom Tech", date: "2024-03-16", time: "14:30", topic: "Design Handoff", status: "Pending" }
];

export const DEFAULT_SUPPORT = [
  { id: 1, client: "Nexus Solutions", subject: "API Rate Limiting Issue", priority: "High", status: "In Progress", date: "2024-03-10" },
  { id: 2, client: "Artistry DAO", subject: "Update Footer Links", priority: "Low", status: "Open", date: "2024-03-12" },
  { id: 3, client: "Bloom Tech", subject: "Mobile Menu Bug", priority: "Medium", status: "Resolved", date: "2024-03-01" }
];

export const DEFAULT_EDUCATION = [
  {
    id: 1,
    degree: "B.S. Computer Science",
    school: "Tech University",
    year: "2018 - 2022",
    desc: "Focus on Software Engineering and AI. Graduated Cum Laude."
  },
  {
    id: 2,
    degree: "Full Stack Certification",
    school: "Dev Bootcamp Academy",
    year: "2022",
    desc: "Intensive 12-week program covering React, Node.js, and Cloud Architecture."
  },
  {
    id: 3,
    degree: "M.S. Artificial Intelligence",
    school: "Stanford Online",
    year: "2022 - 2024",
    desc: "Specialized in Neural Networks, Deep Learning, and Computer Vision algorithms."
  },
  {
    id: 4,
    degree: "AWS Certified Solutions Architect",
    school: "Amazon Web Services",
    year: "2023",
    desc: "Professional certification for designing distributed systems on AWS."
  },
  {
    id: 5,
    degree: "Google UX Design Certificate",
    school: "Coursera / Google",
    year: "2023",
    desc: "Comprehensive training in UX research, wireframing, prototyping, and testing."
  },
  {
    id: 6,
    degree: "Machine Learning Specialization",
    school: "DeepLearning.AI",
    year: "2021",
    desc: "Mastered supervised and unsupervised learning techniques."
  },
  {
    id: 7,
    degree: "Diploma in Web Development",
    school: "Lighthouse Labs",
    year: "2019",
    desc: "Hands-on immersion into modern web development stacks and agile methodologies."
  }
];

export const DEFAULT_SKILLS = [
  {
    category: "Web",
    desc: "Building responsive, high-performance web applications.",
    items: ["React", "Tailwind", "Next.js", "TypeScript", "HTML5", "CSS3", "Redux", "Webpack", "Vue.js", "Angular", "SASS", "WebAssembly"]
  },
  {
    category: "App",
    desc: "Native and cross-platform mobile solutions.",
    items: ["React Native", "Flutter", "Swift", "Kotlin", "Expo", "iOS", "Android", "Dart", "SwiftUI"]
  },
  {
    category: "Backend",
    desc: "Scalable server-side architecture and databases.",
    items: ["Node.js", "Python", "Firebase", "PostgreSQL", "MongoDB", "GraphQL", "AWS", "Docker", "Go", "Rust", "Redis", "Elasticsearch"]
  },
  {
    category: "DevOps & Tools",
    desc: "Streamlining deployment and ensuring reliability.",
    items: ["Kubernetes", "Jenkins", "Terraform", "CircleCI", "Git", "Linux", "Jira", "Figma", "Adobe XD"]
  }
];

export const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Analytics",
    desc: "A comprehensive analytics dashboard for online retailers. Visualize sales data, manage inventory, and track user behavior in real-time.",
    challenge: "Handling large datasets and rendering complex charts without performance lag.",
    solution: "Implemented virtualization for tables and optimized D3.js rendering pipeline.",
    tags: ["React", "D3.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 2,
    title: "Social Connect",
    desc: "Mobile application for local community events and meetups. Connects neighbors based on shared interests.",
    challenge: "Real-time location tracking and battery optimization.",
    solution: "Used geofencing and background fetch API to minimize GPS polling.",
    tags: ["React Native", "Redux", "Maps API"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 3,
    title: "AI Art Generator",
    desc: "Web interface for generating art using stable diffusion models. Users can input prompts and get high-res images.",
    challenge: "Managing long-running API requests for image generation.",
    solution: "Implemented a queue system with WebSockets for real-time progress updates.",
    tags: ["Python", "Flask", "React", "AI"],
    image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 4,
    title: "DeFi Crypto Wallet",
    desc: "A secure non-custodial wallet for managing Ethereum and Solana assets with real-time price tracking.",
    challenge: "Ensuring transaction security and handling multiple blockchain standards.",
    solution: "Integrated Web3.js and created a unified abstraction layer for multi-chain interactions.",
    tags: ["React", "Web3.js", "Solidity"],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 5,
    title: "HealthTrack Mobile",
    desc: "Fitness tracking application that monitors steps, sleep, and heart rate using device sensors.",
    challenge: "Syncing data reliably between local storage and cloud while offline.",
    solution: "Built a custom conflict-resolution sync engine using WatermelonDB.",
    tags: ["Flutter", "Firebase", "HealthKit"],
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 6,
    title: "TaskFlow SaaS",
    desc: "Project management tool for agile teams with Kanban boards and sprint planning features.",
    challenge: "Real-time updates across multiple team members editing the same board.",
    solution: "Utilized WebSocket connections and Optimistic UI updates for instant feedback.",
    tags: ["Vue.js", "Node.js", "Socket.io"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 7,
    title: "LiveChat Pro",
    desc: "Enterprise-grade customer support chat widget with automated bot responses.",
    challenge: "Scaling to handle thousands of concurrent connections.",
    solution: "Deployed on Kubernetes with Redis for session management and message queuing.",
    tags: ["React", "Redis", "K8s"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 8,
    title: "Wanderlust Travel",
    desc: "Booking platform for unique travel experiences and eco-friendly stays.",
    challenge: "Complex search filtering with geospatial data.",
    solution: "Implemented PostGIS for efficient location-based queries and search.",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

export const DEFAULT_SERVICES = [
  {
    id: 'web-basic',
    name: 'Landing Page',
    price: 500,
    description: 'A responsive, high-converting landing page for your business.',
    features: ['Responsive Design', 'Contact Form', 'SEO Optimized', 'Fast Loading'],
    icon: 'Layout'
  },
  {
    id: 'web-adv',
    name: 'Full Stack App',
    price: 2500,
    description: 'Complex web application with database integration and auth.',
    features: ['User Authentication', 'Database Setup', 'Admin Dashboard', 'Payment Gateway'],
    icon: 'Code'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Store',
    price: 3500,
    description: 'Complete online store with cart, checkout, and inventory.',
    features: ['Product Management', 'Stripe/PayPal Integration', 'Order Tracking', 'User Reviews'],
    icon: 'ShoppingCart'
  },
  {
    id: 'mobile',
    name: 'Mobile App',
    price: 3000,
    description: 'Cross-platform mobile application for iOS & Android.',
    features: ['React Native / Flutter', 'Push Notifications', 'Offline Mode', 'App Store Submission'],
    icon: 'Smartphone'
  },
  {
    id: 'design',
    name: 'UI/UX Design Kit',
    price: 800,
    description: 'Complete design system and interactive prototypes.',
    features: ['Figma Source Files', 'Interactive Prototypes', 'Style Guide', 'Icon Set'],
    icon: 'Edit3'
  },
  {
    id: 'seo',
    name: 'SEO Optimization',
    price: 600,
    description: 'Improve your website ranking on Google and Bing.',
    features: ['Keyword Research', 'On-Page SEO', 'Performance Audit', 'Sitemap Generation'],
    icon: 'Search'
  },
  {
    id: 'api',
    name: 'API Development',
    price: 1200,
    description: 'Robust RESTful or GraphQL APIs for your services.',
    features: ['Secure Endpoints', 'Documentation (Swagger)', 'Rate Limiting', 'Database Integration'],
    icon: 'Server'
  },
  {
    id: 'cloud',
    name: 'Cloud Migration',
    price: 2000,
    description: 'Migrate your infrastructure to AWS, Google Cloud, or Azure.',
    features: ['Server Setup', 'CI/CD Pipelines', 'Auto-scaling', 'Cost Optimization'],
    icon: 'Cloud'
  },
  {
    id: 'audit',
    name: 'Code Review & Audit',
    price: 500,
    description: 'Thorough analysis of your existing codebase.',
    features: ['Security Check', 'Performance Analysis', 'Refactoring Tips', 'Best Practices Report'],
    icon: 'Shield'
  },
  {
    id: 'db-design',
    name: 'Database Architecture',
    price: 1000,
    description: 'Optimized schema design for SQL or NoSQL databases.',
    features: ['Schema Design', 'Normalization', 'Index Optimization', 'Data Migration Plans'],
    icon: 'Database'
  },
  {
    id: 'qa',
    name: 'QA & Testing',
    price: 800,
    description: 'Comprehensive testing suite for your application.',
    features: ['Unit Tests', 'Integration Tests', 'E2E Testing (Cypress)', 'Bug Reporting'],
    icon: 'CheckCircle'
  },
  {
    id: 'cms',
    name: 'Custom CMS',
    price: 2200,
    description: 'Tailor-made Content Management System for your needs.',
    features: ['Custom Fields', 'Role Management', 'Media Library', 'Headless Mode'],
    icon: 'Grid'
  },
  {
    id: 'maintenance',
    name: 'Monthly Maintenance',
    price: 400,
    description: 'Ongoing support and updates for your web properties.',
    features: ['Security Patches', 'Plugin Updates', 'Daily Backups', 'Uptime Monitoring'],
    icon: 'Calendar'
  },
  {
    id: 'performance',
    name: 'Performance Tuning',
    price: 700,
    description: 'Speed up your slow website or application.',
    features: ['Code Splitting', 'Image Optimization', 'Caching Strategies', 'Core Web Vitals'],
    icon: 'Zap'
  },
  {
    id: 'consulting',
    name: 'Tech Consulting',
    price: 150,
    description: 'Hourly consultation for technical decision making.',
    features: ['Stack Selection', 'Architecture Review', 'Hiring Assistance', 'Roadmap Planning'],
    icon: 'Terminal'
  },
  {
    id: 'bot',
    name: 'Chatbot Integration',
    price: 1500,
    description: 'AI-powered customer support agents for your site.',
    features: ['OpenAI Integration', 'Custom Knowledge Base', 'Multi-language', '24/7 Availability'],
    icon: 'MessageSquare'
  },
  {
    id: 'devops',
    name: 'DevOps Setup',
    price: 1800,
    description: 'Automate your deployment and operations.',
    features: ['Dockerization', 'Kubernetes Config', 'Automated Testing', 'Monitoring Setup'],
    icon: 'Layers'
  },
  {
    id: 'blockchain',
    name: 'Blockchain/Web3',
    price: 4000,
    description: 'Smart contract development and dApp integration.',
    features: ['Solidity Contracts', 'Wallet Integration', 'NFT Minting', 'Security Audit'],
    icon: 'Box'
  },
  {
    id: 'dataviz',
    name: 'Data Visualization',
    price: 1100,
    description: 'Interactive charts and dashboards for your data.',
    features: ['D3.js / Recharts', 'Real-time Updates', 'Interactive Filters', 'Export Options'],
    icon: 'BarChart'
  },
  {
    id: 'writing',
    name: 'Technical Writing',
    price: 300,
    description: 'Clear documentation for your APIs and products.',
    features: ['API Reference', 'User Guides', 'Tutorials', 'Release Notes'],
    icon: 'FileText'
  }
  ];

  export const DEFAULT_SERVICE_REQUESTS = [];
