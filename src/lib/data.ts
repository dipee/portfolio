export const projects = [
  {
    id: 1,
    title: "QuantumAnalytics v2",
    description:
      "A real-time data orchestration platform built with FastAPI and React. Handles 10k+ concurrent WebSocket events with sub-millisecond latency.",
    tags: ["JavaScript", "FastAPI"],
    category: "FinTech",
    year: "2024",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    gradient: "from-[#002b48] to-[#0d3d6e]",
  },
  {
    id: 2,
    title: "NeuralBridge API",
    description:
      "A high-throughput abstraction layer for deploying machine learning models to production clusters with automated versioning.",
    tags: ["Python", "TensorFlow"],
    category: "SaaS",
    year: "2024",
    github: "https://github.com",
    live: "https://example.com",
    featured: true,
    gradient: "from-[#1a2a3e] to-[#002b48]",
  },
  {
    id: 3,
    title: "SentryGrid CI/CD",
    description:
      "Integrated deployment orchestration platform for containerized microservices across hybrid cloud environments, reducing deployment time by 45%.",
    tags: ["React", "Docker"],
    category: "DevOps",
    year: "2023",
    github: "https://github.com",
    featured: true,
    gradient: "from-[#171f33] to-[#2d3449]",
  },
  {
    id: 4,
    title: "TitanOS Core",
    description:
      "A custom-built operating system kernel optimized for embedded IoT devices, focusing on memory safety and extreme energy efficiency. Featured in the 2023 Tech Engineering Summit.",
    tags: ["C++", "Rust"],
    category: "Systems",
    year: "2023",
    github: "https://github.com",
    featured: false,
    gradient: "from-[#060e20] to-[#131b2e]",
    wide: true,
  },
  {
    id: 5,
    title: "FluxDB Instance",
    description:
      "Distributed key-value store designed for multi-region consistency and automated conflict resolution during network partitions.",
    tags: ["Go", "GraphQL"],
    category: "Infrastructure",
    year: "2022",
    github: "https://github.com",
    featured: false,
    gradient: "from-[#0b1c30] to-[#1a2a3e]",
  },
];

export const skillSections = {
  javascript: {
    title: "JavaScript Ecosystem",
    icon: "terminal",
    codeSnippet: `// Primary Interface Layer
const stack = {
  engine: "React / Next.js",
  state:  "Zustand / Redux",
  styles: "Tailwind CSS",
  runtime: "Node.js / Bun"
};`,
    tags: ["TypeScript", "React Query", "Framer Motion"],
  },
  python: {
    title: "Python Core",
    skills: [
      { name: "FastAPI", level: 95 },
      { name: "Django", level: 88 },
      { name: "Pandas/NumPy", level: 82 },
    ],
  },
  devops: [
    {
      icon: "cloud",
      title: "AWS / GCP",
      description: "Architecting serverless functions, EC2 clusters, and S3 storage solutions with IAM security protocols.",
    },
    {
      icon: "inventory_2",
      title: "Docker & K8s",
      description: "Container orchestration and microservices management for scalable enterprise applications.",
    },
    {
      icon: "dynamic_form",
      title: "CI / CD",
      description: "GitHub Actions and GitLab CI for automated testing, linting, and blue-green deployments.",
    },
    {
      icon: "security",
      title: "DevSecOps",
      description: "Integrated security scanning and vulnerability management within the development lifecycle.",
    },
  ],
  databases: [
    { icon: "database", name: "PostgreSQL", label: "Relational Power" },
    { icon: "speed", name: "Redis", label: "Caching Tier" },
    { icon: "account_tree", name: "Git / GitHub", label: "Version Control" },
    { icon: "hub", name: "GraphQL", label: "API Gateway" },
  ],
};

export const timeline = [
  {
    year: "2016",
    title: "The Spark",
    label: "JavaScript Enthusiast",
    labelColor: "text-primary-fixed-dim",
    description:
      "Started with building interactive DOM elements. Fell in love with the immediate feedback loop of the web and the chaos of the early JS ecosystem.",
  },
  {
    year: "2019",
    title: "Full-Stack Shift",
    label: "Backend Integration",
    labelColor: "text-secondary",
    description:
      "Transitioned into heavy-duty Node.js and Python development. Began managing complex state across the entire stack and mastering relational databases.",
  },
  {
    year: "2022",
    title: "The Architect",
    label: "Distributed Systems",
    labelColor: "text-tertiary",
    description:
      "Designing microservices and high-availability systems. Focusing on cloud-native architecture, performance tuning, and technical leadership for scaling products.",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];
