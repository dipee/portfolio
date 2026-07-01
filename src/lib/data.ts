export const skillSections = {
  javascript: {
    title: "JavaScript Ecosystem",
    icon: "terminal",
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
  { label: "Blog", href: "/blog" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];
