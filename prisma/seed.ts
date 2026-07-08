import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
});

const projects = [
  {
    title: "Lekha",
    description:
      "A full-stack multi-tenant ERP and accounting platform supporting multiple organizations. Features journal entries, trial balance, profit & loss, VAT, depreciation, subscriptions, notifications, and activity tracking with JWT authentication and role-based access control.",
    tags: ["React", "Django", "PostgreSQL", "Redis", "Docker", "AWS"],
    category: "ERP / FinTech",
    year: "2024",
    github: "",
    live: "https://lekha.afso.io",
    featured: true,
    gradient: "from-[#002b48] to-[#0d3d6e]",
    wide: false,
  },
  {
    title: "Learnify",
    description:
      "A subscription-based online learning platform with responsive React interfaces for course browsing and secure video streaming. Includes authentication, subscriptions, secure content delivery, and user engagement features.",
    tags: ["React", "Django", "PostgreSQL", "Docker"],
    category: "EdTech",
    year: "2024",
    github: "",
    live: "https://learn.afso.io",
    featured: true,
    gradient: "from-[#1a2a3e] to-[#002b48]",
    wide: false,
  },
  {
    title: "SmartFarm",
    description:
      "A crop recommendation platform using historical climate and soil data. Built responsive dashboards and analytics interfaces with React, integrated external weather and agriculture APIs, and added blog and news modules for user engagement. Capstone project — Best of the Program at Conestoga College.",
    tags: ["React", "Django", "PostgreSQL"],
    category: "AgTech",
    year: "2024",
    github: "",
    live: null,
    featured: true,
    gradient: "from-[#171f33] to-[#2d3449]",
    wide: true,
  },
  {
    title: "django-query-log",
    description:
      "An open-source Django package for logging SQL query execution and measuring database performance. Helps developers identify slow queries, detect N+1 issues, and optimize database performance during development.",
    tags: ["Django", "Python", "Open Source"],
    category: "Open Source",
    year: "2024",
    github: "https://github.com/dipee/django-query-log",
    live: "https://django-query-log.readthedocs.io",
    featured: false,
    gradient: "from-[#060e20] to-[#131b2e]",
    wide: false,
  },
];

const blogPosts = [
  {
    slug: "kinetic-monolith-architecture",
    title: "The Kinetic Monolith: Architecture for High-Velocity Teams",
    excerpt:
      "Why treating your application as a single, well-structured monolith can outperform premature microservices for most product stages.",
    content: `## Introduction

High-velocity teams need systems that are easy to reason about, deploy, and observe. The "kinetic monolith" approach keeps related logic in one deployable unit while maintaining strict module boundaries inside the codebase.

## Core principles

1. **Clear module seams** — Domain folders, not distributed network calls.
2. **Observable by default** — Structured logging and tracing from day one.
3. **Deploy confidence** — One artifact, one rollback path.

## When to split

Extract services when you have measurable pain: independent scaling requirements, team ownership boundaries, or regulatory isolation—not because a diagram looks cleaner.

## Conclusion

Start monolithic, stay modular, and split only when data proves you need to.`,
    published: true,
    publishedAt: new Date("2024-06-15"),
  },
  {
    slug: "fastapi-websocket-patterns",
    title: "FastAPI WebSocket Patterns at Scale",
    excerpt:
      "Practical patterns for handling thousands of concurrent WebSocket connections without sacrificing latency or memory.",
    content: `## The challenge

Real-time dashboards and analytics platforms push WebSocket servers harder than typical REST APIs. Connection churn, backpressure, and fan-out all need explicit design.

## Patterns that work

- **Connection registry** with heartbeat and stale cleanup
- **Pub/sub bridge** (Redis) for horizontal scale
- **Typed event schemas** shared between Python and TypeScript clients

## Measuring success

Track p99 message latency, reconnect rate, and memory per 1k connections. Optimize only what those metrics flag.

## Takeaway

FastAPI plus asyncio is enough for many real-time workloads when pairing discipline with observability.`,
    published: true,
    publishedAt: new Date("2024-03-22"),
  },
];

async function main() {
  await prisma.blogPost.deleteMany();
  await prisma.project.deleteMany();

  await prisma.project.createMany({ data: projects });
  await prisma.blogPost.createMany({ data: blogPosts });

  console.log(`Seeded ${projects.length} projects and ${blogPosts.length} blog posts.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
