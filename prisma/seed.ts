import { PrismaClient } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;
const prisma = new PrismaClient({
  datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
});

const projects = [
  {
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
    wide: false,
  },
  {
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
    wide: false,
  },
  {
    title: "SentryGrid CI/CD",
    description:
      "Integrated deployment orchestration platform for containerized microservices across hybrid cloud environments, reducing deployment time by 45%.",
    tags: ["React", "Docker"],
    category: "DevOps",
    year: "2023",
    github: "https://github.com",
    live: null,
    featured: true,
    gradient: "from-[#171f33] to-[#2d3449]",
    wide: false,
  },
  {
    title: "TitanOS Core",
    description:
      "A custom-built operating system kernel optimized for embedded IoT devices, focusing on memory safety and extreme energy efficiency. Featured in the 2023 Tech Engineering Summit.",
    tags: ["C++", "Rust"],
    category: "Systems",
    year: "2023",
    github: "https://github.com",
    live: null,
    featured: false,
    gradient: "from-[#060e20] to-[#131b2e]",
    wide: true,
  },
  {
    title: "FluxDB Instance",
    description:
      "Distributed key-value store designed for multi-region consistency and automated conflict resolution during network partitions.",
    tags: ["Go", "GraphQL"],
    category: "Infrastructure",
    year: "2022",
    github: "https://github.com",
    live: null,
    featured: false,
    gradient: "from-[#0b1c30] to-[#1a2a3e]",
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
