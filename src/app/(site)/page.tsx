import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { assetExists } from "@/lib/assets";
import { getGithubStats } from "@/lib/github";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProjects, github, hasResume] = await Promise.all([
    getFeaturedProjects(),
    getGithubStats(),
    assetExists("resume"),
  ]);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-surface">
        <div className="absolute inset-0 code-pattern opacity-20" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/10">
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#fce425]" />
              <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                Available for new projects
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter text-on-surface">
              Dipendra <br />
              <span className="text-secondary tracking-tight">Nath</span>
            </h1>

            <p className="text-xl text-on-tertiary-container max-w-xl leading-relaxed">
              Architecting high-performance digital ecosystems using the stability of{" "}
              <span className="text-primary font-bold">Python</span>, the reliability of{" "}
              <span className="text-[#f89820] font-bold">Java</span>, and the velocity of{" "}
              <span className="text-secondary font-bold">JavaScript</span>.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/projects"
                className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-lg font-bold font-headline flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-[0_32px_32px_-12px_rgba(0,29,51,0.08)]"
              >
                View Projects
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
              {hasResume ? (
                <a
                  href={siteConfig.resumePath}
                  download
                  className="bg-outline/20 text-on-surface px-8 py-4 rounded-lg font-bold font-headline hover:bg-surface-bright transition-colors"
                >
                  Download CV
                </a>
              ) : null}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="bg-surface-container-lowest border-l-4 border-secondary p-8 font-mono text-sm rounded-lg shadow-2xl transform rotate-2">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1">
                <p className="text-primary-fixed">
                  <span className="text-secondary">const</span> architect = {"{"}
                </p>
                <p className="pl-4 text-on-surface">
                  stack: [<span className="text-secondary">&quot;React&quot;</span>,{" "}
                  <span className="text-secondary">&quot;FastAPI&quot;</span>],
                </p>
                <p className="pl-4 text-on-surface">
                  focus:{" "}
                  <span className="text-secondary">&quot;Kinetic Architecture&quot;</span>,
                </p>
                <p className="pl-4 text-on-surface">
                  delivery:{" "}
                  <span className="text-secondary">&quot;High Velocity&quot;</span>
                </p>
                <p className="text-primary-fixed">{"}"}</p>
                <p className="mt-4 text-on-surface-variant italic">
                  {"// Performance: 99/100"}
                </p>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-6 bg-primary-container p-6 rounded-lg border border-outline-variant/10 backdrop-blur-md transform -rotate-3">
              <span className="text-primary text-4xl font-headline font-black">5+ Years</span>
              <p className="text-xs uppercase tracking-widest text-on-primary-container">
                of precision engineering
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low relative overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-4">
                Technical Proficiency
              </h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tight">
                The Core Engine.
              </h3>
            </div>
            <p className="max-w-md text-on-tertiary-container text-right">
              Leveraging enterprise-grade frameworks to build scalable, resilient web applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-outline-variant/10 rounded-xl overflow-hidden">
            <div className="bg-surface p-12 hover:bg-surface-bright transition-colors group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-secondary-fixed/10 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl">
                    terminal
                  </span>
                </div>
                <h4 className="text-2xl font-headline font-bold">Frontend &amp; Runtime</h4>
              </div>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Crafting dynamic, reactive interfaces with{" "}
                <span className="text-secondary">React</span> and robust server-side execution
                with <span className="text-secondary">Node.js</span>. Expert in TypeScript and
                modern ESM workflows.
              </p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "Tailwind", "Redux", "HTML5", "CSS3", "JavaScript"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface p-12 hover:bg-surface-bright transition-colors group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary/10 flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    analytics
                  </span>
                </div>
                <h4 className="text-2xl font-headline font-bold">Backend &amp; Data</h4>
              </div>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Building secure, high-throughput APIs and data pipelines with{" "}
               
                <span className="text-[#6db33f]">Spring Boot</span>, alongside{" "}
                <span className="text-primary">FastAPI</span> and{" "}
                <span className="text-primary">Django</span>. Expertise in analytics
                workflows, data modeling, and reliable storage layers.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Spring Boot",  "PostgreSQL", "Pandas", "Redis", "Docker", "PyTest", "Airflow",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-label uppercase tracking-widest rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface">
        <div className="container mx-auto px-8">
          <div className="mb-20 text-center">
            <h2 className="text-xs font-label uppercase tracking-[0.2em] text-secondary mb-4">
              Case Studies
            </h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
              Engineered Works
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-secondary font-headline font-bold text-sm uppercase tracking-widest group"
            >
              View all projects
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface-container-low overflow-hidden">
        <div className="container mx-auto px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-secondary/30" />
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mb-8 tracking-tighter">
                Dipendra Nath<br />
                Behind{" "}
                <span className="text-secondary">The Code.</span>
              </h2>
              <div className="space-y-6 text-on-tertiary-container leading-relaxed">
                <p>
                  I don&apos;t just write scripts; I design digital infrastructure. With a background
                  in structural engineering turned software development, I approach every project
                  with the mindset that code is a living, breathing monolith.
                </p>
                <p>
                  My expertise lies at the intersection of JavaScript&apos;s vibrant ecosystem and
                  Python&apos;s computational power — building systems that are both resilient
                  and high-velocity.
                </p>
              </div>
              <div className="mt-12 flex gap-12">
                <div>
                  <div className="text-3xl font-headline font-bold text-secondary">{github.repoCount}</div>
                  <div className="text-xs uppercase tracking-widest text-on-surface-variant">Public Repos</div>
                </div>
                <div>
                  <div className="text-3xl font-headline font-bold text-secondary">{github.mergedPrs}</div>
                  <div className="text-xs uppercase tracking-widest text-on-surface-variant">Merged PRs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-secondary/10 transform rotate-6 rounded-xl" />
              <div className="absolute inset-0 bg-surface-container-high rounded-xl flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-5xl text-primary">psychology</span>
                  </div>
                  <p className="font-headline font-bold text-white text-xl mb-2">Systems Thinking</p>
                  <p className="text-on-tertiary-container text-sm uppercase tracking-widest">
                    Architect-First Approach
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface-container-highest p-4 rounded-lg border border-outline-variant/20 shadow-xl backdrop-blur-xl">
                <span className="material-symbols-outlined text-secondary block text-3xl mb-1">
                  architecture
                </span>
                <span className="text-[10px] font-label uppercase tracking-widest text-on-surface">
                  Systems Thinking
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-surface">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="bg-surface-container-high p-12 rounded-2xl relative overflow-hidden border border-outline-variant/10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-10 text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">
                Ready to start building?
              </h2>
              <p className="text-on-surface-variant">
                Currently accepting select projects for {new Date().getFullYear()}.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="bg-secondary-fixed text-on-secondary-fixed px-10 py-5 rounded-lg font-bold font-headline flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(252,228,37,0.3)] transition-all"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Start a Conversation
                </a>
                <div className="flex gap-2 justify-center">
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-surface-variant flex items-center justify-center rounded-lg hover:text-secondary transition-colors"
                    aria-label="GitHub"
                  >
                    <span className="material-symbols-outlined text-2xl">hub</span>
                  </a>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-surface-variant flex items-center justify-center rounded-lg hover:text-secondary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <span className="material-symbols-outlined text-2xl">link</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
