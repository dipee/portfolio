import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineered works by Dipendra Nath — from high-performance APIs to distributed systems.",
};

export default function ProjectsPage() {
  const gridProjects = projects.filter((p) => !p.wide);
  const wideProject = projects.find((p) => p.wide);

  return (
    <main className="pt-24 min-h-screen">
      {/* Hero */}
      <header className="max-w-7xl mx-auto px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="text-secondary font-headline font-bold tracking-widest uppercase text-sm mb-4">
              Portfolio Index 02
            </p>
            <h1 className="font-headline text-5xl md:text-8xl font-bold tracking-tighter text-on-surface leading-none mb-8">
              Engineered <br />
              <span className="text-secondary">Works.</span>
            </h1>
          </div>
          <div className="md:col-span-4 pb-4">
            <div className="bg-surface-container-lowest border-l-2 border-secondary p-6 font-mono text-xs text-on-tertiary-container">
              <span className="text-secondary-fixed-dim">const</span>{" "}
              <span className="text-primary">architect</span> = {"{"}<br />
              &nbsp;&nbsp;focus:{" "}
              <span className="text-on-surface-variant">&quot;High-Performance Systems&quot;</span>
              ,<br />
              &nbsp;&nbsp;methodology:{" "}
              <span className="text-on-surface-variant">&quot;Kinetic Monolith&quot;</span>,<br />
              &nbsp;&nbsp;status:{" "}
              <span className="text-on-surface-variant">&quot;Available for projects&quot;</span>
              <br />
              {"}"};
            </div>
          </div>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Regular 3-col cards */}
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col bg-surface-container-high rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1"
              >
                <div className="h-64 overflow-hidden relative">
                  <div
                    className={`w-full h-full bg-gradient-to-br ${project.gradient} relative`}
                  >
                    <div className="absolute inset-0 code-pattern opacity-20" />
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                      <span className="material-symbols-outlined text-6xl text-primary">
                        code_blocks
                      </span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/90 to-transparent" />
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold tracking-widest uppercase rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-headline text-2xl font-bold text-on-surface mb-3 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-secondary font-headline font-bold text-xs uppercase tracking-widest group/link"
                  >
                    View Architecture
                    <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover/link:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}

            {/* Wide featured card (md:col-span-2) */}
            {wideProject && (
              <div className="group relative flex flex-col bg-surface-container-high rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 md:col-span-2">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="h-64 md:h-full overflow-hidden relative">
                    <div
                      className={`w-full h-full bg-gradient-to-br ${wideProject.gradient} relative`}
                    >
                      <div className="absolute inset-0 code-pattern opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-[120px] text-secondary">
                          memory
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {wideProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold tracking-widest uppercase rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-headline text-3xl font-bold text-on-surface mb-4 group-hover:text-secondary transition-colors">
                      {wideProject.title}
                    </h3>
                    <p className="text-on-surface-variant text-base leading-relaxed mb-8">
                      {wideProject.description}
                    </p>
                    <Link
                      href={wideProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-secondary font-headline font-bold text-xs uppercase tracking-widest group/link"
                    >
                      Case Study Document
                      <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover/link:translate-x-1">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="font-headline text-4xl font-bold text-on-surface mb-8">
              Technical Philosophical Alignment
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg mb-8">
              Every project is treated as a structural monolith — solid, dependable, and
              aesthetically precise. We do not build ephemeral prototypes; we engineer digital
              legacy.
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">architecture</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">
                    Precision Engineering
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Clean code is the baseline; architectural integrity is the goal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">speed</span>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">
                    Kinetic Performance
                  </h4>
                  <p className="text-sm text-on-surface-variant">
                    Systems designed to move at the speed of modern business requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative bg-surface-container rounded-lg p-1">
            <div className="kinetic-gradient w-full h-full p-12 rounded-lg flex items-center justify-center min-h-48">
              <div className="text-center">
                <p className="font-headline text-secondary text-5xl font-bold mb-4">120ms</p>
                <p className="text-on-surface font-label tracking-widest uppercase text-xs">
                  Average API Latency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
