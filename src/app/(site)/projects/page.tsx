import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineered works by Dipendra Nath — from high-performance APIs to distributed systems.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const gridProjects = projects.filter((project) => !project.wide);
  const wideProject = projects.find((project) => project.wide);

  return (
    <div className="pt-24 min-h-screen">
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
              <span className="text-primary">architect</span> = {"{"}
              <br />
              &nbsp;&nbsp;focus:{" "}
              <span className="text-on-surface-variant">&quot;High-Performance Systems&quot;</span>,
              <br />
              &nbsp;&nbsp;methodology:{" "}
              <span className="text-on-surface-variant">&quot;Kinetic Monolith&quot;</span>,
              <br />
              &nbsp;&nbsp;status:{" "}
              <span className="text-on-surface-variant">&quot;Available for projects&quot;</span>
              <br />
              {"}"};
            </div>
          </div>
        </div>
      </header>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {wideProject && (
              <ProjectCard
                project={wideProject}
                variant="wide"
                linkLabel="Case Study Document"
              />
            )}
          </div>
        </div>
      </section>

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
                  <h3 className="font-headline font-bold text-on-surface">Precision Engineering</h3>
                  <p className="text-sm text-on-surface-variant">
                    Clean code is the baseline; architectural integrity is the goal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary">speed</span>
                <div>
                  <h3 className="font-headline font-bold text-on-surface">Kinetic Performance</h3>
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
                <p className="font-headline text-secondary text-5xl font-bold mb-4">{projects.length}</p>
                <p className="text-on-surface font-label tracking-widest uppercase text-xs">
                  Projects Shipped
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
