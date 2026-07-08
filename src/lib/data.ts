export const skillSections = {
  javascript: {
    title: "JavaScript Ecosystem",
    icon: "terminal",
    tags: ["TypeScript", "React", "Next.js", "JavaScript", "Tailwind", "Bootstrap"],
  },
  python: {
    title: "Python and Java Core",
    skills: [
      { name: "FastAPI", level: 95 },
      { name: "Django", level: 88 },
      { name: "Spring Boot", level: 85 }
    ],
  },
  devops: [
    {
      icon: "cloud",
      title: "AWS",
      description:
        "Architecting serverless functions, EC2 clusters, and S3 storage solutions with IAM security protocols.",
    },
    {
      icon: "inventory_2",
      title: "Docker & K8s",
      description:
        "Container orchestration and microservices management for scalable enterprise applications.",
    },
    {
      icon: "dynamic_form",
      title: "CI / CD",
      description:
        "GitHub Actions and GitLab CI for automated testing, linting, and blue-green deployments.",
    },
    {
      icon: "security",
      title: "DevSecOps",
      description:
        "Integrated security scanning and vulnerability management within the development lifecycle.",
    },
  ],
  databases: [
    { icon: "database", name: "PostgreSQL", label: "Relational Power" },
    { icon: "speed", name: "Redis", label: "Caching Tier" },
    { icon: "account_tree", name: "Git / GitHub", label: "Version Control" },
    { icon: "hub", name: "MongoDB", label: "Document Store" },
  ],
};

export const timeline = [
  {
    year: "2024",
    title: "Freelance Software Developer",
    label: "afso.io",
    labelColor: "text-secondary",
    description:
      "Designed and developed a production-ready multi-tenant ERP and accounting platform (Lekha) and a subscription-based learning platform (Learnify) using React, Django REST Framework, PostgreSQL, Redis, and Docker.",
  },
  {
    year: "2023",
    title: "Software Developer",
    label: "Khalti — Nepal",
    labelColor: "text-primary-fixed-dim",
    description:
      "Developed Scan-to-Order with UPI QR technology, an automated recurring payment system (AutoPay), and a subscription management platform for third-party merchants integrating Khalti Payment Gateway.",
  },
  {
    year: "2021",
    title: "Backend Developer",
    label: "Soori Technology — Nepal",
    labelColor: "text-secondary",
    description:
      "Built a Warehouse Management System backend with Django REST Framework, barcode/QR inventory systems, multi-tiered authentication, and real-time notifications via WebSockets, Redis, and Celery.",
  },
  {
    year: "2020",
    title: "Backend Developer",
    label: "Meraki Techs — Nepal",
    labelColor: "text-tertiary",
    description:
      "Developed backend APIs for Restaurant, Pharmacy, and Medical Lab Management systems using Python, Django, and PostgreSQL, with Docker containerization and AWS (EC2, S3) hosting.",
  },
];

export const education = [
  {
    degree: "Mobile Solutions Development",
    school: "Conestoga College",
    location: "Waterloo, CA",
    period: "2023 – 2024",
    detail: "GPA 3.83/4 — Web Design & Development, Systems Design, iOS & Android Development",
  },
  {
    degree: "Bachelor's in Computer Science",
    school: "Tribhuwan University",
    location: "Kathmandu, Nepal",
    period: "2016 – 2020",
    detail:
      "Data Structures, Software Design, Interface Design, Web Technologies, Operating Systems, Security & Encryption",
  },
];

export const awards = [
  {
    title: "Best of the Program — Capstone Project",
    issuer: "Conestoga College",
    detail: "SmartFarm — Mobile Solutions Development",
  },
  {
    title: "React & Django Full Stack",
    issuer: "Udemy",
    detail: "Web apps and Backend apps",
  },
  {
    title: "React — The Complete Guide 2025",
    issuer: "Udemy",
    detail: "Frontend Apps (incl. Next.js, Redux)",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Skills", href: "/skills" },
  { label: "About", href: "/about" },
];
