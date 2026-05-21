import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  year: string;
  github: string;
  live?: string;
  featured: boolean;
  gradient: string;
  wide?: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col bg-surface-container-high rounded-lg overflow-hidden transition-all duration-500 hover:-translate-y-1">
      {/* Image area */}
      <div className="h-64 overflow-hidden relative">
        <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-end p-4`}>
          <div className="w-full h-full absolute inset-0 code-pattern opacity-20" />
          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-primary">code_blocks</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
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

        <div className="flex justify-between items-center mt-auto">
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
          <span className="text-[10px] font-label uppercase tracking-widest text-on-tertiary-container">
            {project.category} / {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}
