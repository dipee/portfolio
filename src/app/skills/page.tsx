import type { Metadata } from "next";
import { skillSections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical proficiency of Dipendra Nath — JavaScript ecosystem, Python, DevOps, and databases.",
};

export default function SkillsPage() {
  return (
    <div className="relative pt-32 pb-24 max-w-7xl mx-auto px-8">
      {/* Tracing line */}
      <div
        className="hidden lg:block absolute left-8 top-0 bottom-0 w-px opacity-20"
        style={{
          background: "linear-gradient(to bottom, transparent, #98cbff 20%, #98cbff 80%, transparent)",
        }}
      />

      {/* Hero */}
      <header className="mb-20 pl-4 lg:pl-12">
        <p className="font-label text-secondary font-bold tracking-[0.2em] mb-4 uppercase text-sm">
          Engineering Stack
        </p>
        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">
          Technical{" "}
          <span className="text-primary-fixed-dim">Proficiency</span>
        </h1>
        <div className="max-w-2xl">
          <p className="text-on-surface-variant text-lg leading-relaxed">
            A multi-disciplinary approach to software architecture, blending the high-velocity
            energy of{" "}
            <span className="text-secondary font-bold">JavaScript</span> with the mathematical
            stability of{" "}
            <span className="text-primary font-bold">Python</span>.
          </p>
        </div>
      </header>

      {/* Core Stack: Bento Grid */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* JS / React Block */}
          <div className="md:col-span-7 bg-surface-container-low p-8 lg:p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="material-symbols-outlined text-4xl text-secondary fill"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  terminal
                </span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">
                  JavaScript Ecosystem
                </h2>
              </div>

              <div className="bg-surface-container-lowest p-6 border-l-2 border-secondary font-mono text-sm mb-8">
                <div className="text-on-tertiary-container mb-2">
                  {"// Primary Interface Layer"}
                </div>
                <div className="flex gap-4 mb-1">
                  <span className="text-secondary">const</span>{" "}
                  <span className="text-primary">stack</span> = {"{"}
                </div>
                <div className="pl-6">
                  <div>
                    <span className="text-on-surface">engine:</span>{" "}
                    <span className="text-secondary">&quot;React / Next.js&quot;</span>,
                  </div>
                  <div>
                    <span className="text-on-surface">state:</span>{" "}
                    <span className="text-secondary">&quot;Zustand / Redux&quot;</span>,
                  </div>
                  <div>
                    <span className="text-on-surface">styles:</span>{" "}
                    <span className="text-secondary">&quot;Tailwind CSS&quot;</span>,
                  </div>
                  <div>
                    <span className="text-on-surface">runtime:</span>{" "}
                    <span className="text-secondary">&quot;Node.js / Bun&quot;</span>
                  </div>
                </div>
                <div>{"}"}</div>
              </div>

              <div className="flex flex-wrap gap-3">
                {skillSections.javascript.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-tertiary-container text-on-tertiary-container text-xs font-bold font-label tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all duration-500 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
              <span
                className="material-symbols-outlined text-[200px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                terminal
              </span>
            </div>
          </div>

          {/* Python / Backend Block */}
          <div className="md:col-span-5 kinetic-gradient p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="material-symbols-outlined text-4xl text-primary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  code_blocks
                </span>
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-white">
                  Python Core
                </h2>
              </div>
              <p className="text-on-primary-container text-sm leading-relaxed mb-8">
                Architecting robust backend services with a focus on data integrity,
                high-concurrency performance, and clean API design patterns.
              </p>
            </div>

            <div className="space-y-6">
              {skillSections.python.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex justify-between items-end border-b border-outline-variant/30 pb-2"
                >
                  <span className="font-headline font-bold text-xl text-white">{skill.name}</span>
                  <span className="font-mono text-secondary text-xs uppercase tracking-widest">
                    {skill.level}% Mastery
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure & DevOps */}
      <section className="mb-32 pl-4 lg:pl-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/3">
            <h2 className="font-headline text-5xl font-bold tracking-tighter mb-6 uppercase">
              Infrastructure <br />
              <span className="text-outline">&amp; DevOps</span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Cloud-native deployment strategies utilizing containerization and automated
              pipelines to ensure 99.9% uptime and rapid iteration cycles.
            </p>
          </div>

          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillSections.devops.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-high p-8 flex items-start gap-6 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                <div>
                  <h3 className="font-headline font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-on-tertiary-container">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Databases & Tools */}
      <section>
        <div className="bg-surface-container-low p-8 lg:p-16 relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="font-label text-secondary font-bold tracking-[0.2em] mb-4 block uppercase text-sm">
                Data Persistence
              </span>
              <h2 className="font-headline text-4xl font-bold uppercase tracking-tight">
                Databases &amp; Tools
              </h2>
            </div>
            <div className="hidden md:block">
              <div className="bg-surface-container-lowest px-6 py-3 border-l-2 border-primary font-mono text-xs text-primary-fixed-dim">
                QUERY_OPTIMIZATION_MODULE: LOADED
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {skillSections.databases.map((db) => (
              <div key={db.name} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 bg-surface-container-highest flex items-center justify-center rounded-xl group-hover:bg-primary transition-colors duration-500">
                  <span className="material-symbols-outlined text-3xl group-hover:text-on-primary transition-colors">
                    {db.icon}
                  </span>
                </div>
                <h4 className="font-headline font-bold text-lg mb-1">{db.name}</h4>
                <p className="text-[10px] text-on-tertiary-container uppercase tracking-widest font-bold">
                  {db.label}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative terminal */}
          <div className="mt-20 bg-surface-container-lowest rounded-lg p-4 font-mono text-[10px] md:text-xs text-on-tertiary-container/40 flex items-center gap-4 overflow-hidden border border-outline-variant/10">
            <span className="text-secondary shrink-0">Terminal v2.4.0</span>
            <span className="shrink-0">$ dipendranath --audit-skills</span>
            <span className="hidden md:block whitespace-nowrap">
              Analyzing repository metadata... dependencies verified... optimization 100% complete...
              status: READY_TO_BUILD
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
