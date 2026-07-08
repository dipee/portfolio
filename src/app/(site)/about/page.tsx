import type { Metadata } from "next";
import { assetExists, getAsset } from "@/lib/assets";
import { awards, education, timeline } from "@/lib/data";
import { getGithubStats } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The architect behind the code — Dipendra Nath's philosophy, experience, and technical evolution.",
};

export const dynamic = "force-dynamic";

const philosophyCards = [
  {
    icon: "architecture",
    iconColor: "text-primary",
    title: "Structural Resilience",
    description:
      "I treat backend architecture as the skeleton of the product. Using Python and specialized frameworks, I build APIs that prioritize uptime and lightning-fast query resolution.",
  },
  {
    icon: "speed",
    iconColor: "text-secondary",
    title: "High-Velocity UI",
    description:
      "The frontend is where the user feels the power. I leverage JavaScript ecosystems to create responsive, hardware-accelerated interfaces that move with the user's intent.",
  },
  {
    icon: "terminal",
    iconColor: "text-tertiary",
    title: "Technical Purity",
    description:
      "No bloat. No unnecessary dependencies. I believe in writing code that is self-documenting, modular, and built to be extended, not replaced.",
  },
];

export default async function AboutPage() {
  const [hasResume, photo, github] = await Promise.all([
    assetExists("resume"),
    getAsset("photo"),
    getGithubStats(),
  ]);

  const photoSrc = photo
    ? `${siteConfig.photoPath}?t=${photo.updatedAt.getTime()}`
    : null;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[820px] flex items-center overflow-hidden px-8 py-20 bg-surface">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text */}
          <div className="lg:col-span-7 z-10">
            <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-6 block">
              Biography // 01
            </span>
            <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight text-on-surface mb-8 leading-[1.1]">
              The Architect Behind <br />
              <span className="text-primary italic">The Code</span>
            </h1>

            <div className="max-w-xl space-y-6">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                I don&apos;t just write scripts; I engineer resilience. My approach to full-stack
                development is rooted in the philosophy of{" "}
                <strong className="text-on-surface">Kinetic Monoliths</strong> — building systems
                that are heavy in their structural integrity but fluid in their execution.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Every line of code is a structural beam. Every database schema is a foundation.
                I focus on high-performance architecture that survives the chaos of scale while
                maintaining the precision of a high-end digital terminal.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              <div className="bg-surface-container-low p-6 border-l-2 border-secondary">
                <div className="font-headline text-3xl font-bold text-white mb-1">5+</div>
                <div className="font-label text-[10px] uppercase tracking-widest text-on-tertiary-container">
                  Years Experience
                </div>
              </div>
              <div className="bg-surface-container-low p-6 border-l-2 border-primary">
                <div className="font-headline text-3xl font-bold text-white mb-1">{github.repoCount}</div>
                <div className="font-label text-[10px] uppercase tracking-widest text-on-tertiary-container">
                  Public Repos
                </div>
              </div>
              <div className="bg-surface-container-low p-6 border-l-2 border-tertiary col-span-2 md:col-span-1">
                <div className="font-headline text-3xl font-bold text-white mb-1">{github.mergedPrs}</div>
                <div className="font-label text-[10px] uppercase tracking-widest text-on-tertiary-container">
                  Merged PRs
                </div>
              </div>
            </div>
          </div>

          {/* Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-surface-container-high relative overflow-hidden rounded-xl">
              {photoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoSrc}
                  alt={`${siteConfig.name} — Full Stack Developer`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container to-surface-container-high">
                  <div className="absolute inset-0 code-pattern opacity-10" />
                  <div className="relative text-center p-8">
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
                      <span className="material-symbols-outlined text-6xl text-primary">
                        person
                      </span>
                    </div>
                    <p className="font-headline font-bold text-white text-xl tracking-tight">
                      Dipendra Nath
                    </p>
                    <p className="text-on-tertiary-container text-sm mt-1 font-label uppercase tracking-widest">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

              {/* Tech Overlay */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-lg border border-outline-variant/15">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-label text-[10px] uppercase tracking-tighter text-secondary">
                    System Status: Optimized
                  </span>
                </div>
                <div className="font-headline text-xs text-white/60">
                  &quot;Engineered Works v4.0.2&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-surface-container-low py-24 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="font-label text-xs tracking-[0.2em] text-tertiary uppercase mb-6 block">
                Philosophy // 02
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
                Precision Engineering <br />&amp;{" "}
                <span className="italic font-light">Architectural Integrity</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-high p-8 group hover:bg-surface-bright transition-all duration-500"
              >
                <div className={`mb-6 ${card.iconColor}`}>
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative line */}
        <div className="absolute right-20 top-0 bottom-0 w-px bg-outline-variant/10 hidden lg:block" />
      </section>

      {/* Technical Evolution Timeline */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-6 block">
              Roadmap // 03
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
              Technical Evolution
            </h2>
          </div>

          <div className="space-y-1">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid grid-cols-1 md:grid-cols-12 items-center group py-12 border-b border-outline-variant/10"
              >
                <div className="md:col-span-2 font-headline text-2xl font-bold text-outline group-hover:text-primary transition-colors">
                  {item.year}
                </div>
                <div className="md:col-span-4 py-4 md:py-0">
                  <h4 className="font-headline text-xl text-white font-bold mb-1">
                    {item.title}
                  </h4>
                  <p className={`font-label text-[10px] uppercase tracking-widest ${item.labelColor}`}>
                    {item.label}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-on-surface-variant leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] text-tertiary uppercase mb-6 block">
              Credentials // 04
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
              Education
            </h2>
          </div>

          <div className="space-y-1">
            {education.map((item) => (
              <div
                key={item.school}
                className="grid grid-cols-1 md:grid-cols-12 items-center group py-12 border-b border-outline-variant/10"
              >
                <div className="md:col-span-2 font-headline text-2xl font-bold text-outline group-hover:text-primary transition-colors">
                  {item.period}
                </div>
                <div className="md:col-span-4 py-4 md:py-0">
                  <h4 className="font-headline text-xl text-white font-bold mb-1">
                    {item.degree}
                  </h4>
                  <p className="font-label text-[10px] uppercase tracking-widest text-secondary">
                    {item.school} — {item.location}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-on-surface-variant leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Certificates */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-xs tracking-[0.2em] text-secondary uppercase mb-6 block">
              Recognition // 05
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
              Awards &amp; Certificates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-high p-8 group hover:bg-surface-bright transition-all duration-500"
              >
                <div className="mb-4 text-secondary">
                  <span
                    className="material-symbols-outlined text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">
                  {item.issuer}
                </p>
                <p className="text-on-surface-variant leading-relaxed text-sm">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Snippet + CTA */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Code snippet */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="bg-surface-container-lowest p-8 rounded-lg border-l-2 border-secondary shadow-2xl">
              <pre className="font-mono text-sm leading-relaxed overflow-x-auto text-on-tertiary-container">
                <span className="text-secondary">class</span>{" "}
                <span className="text-primary">Developer</span>:{"\n"}
                {"    "}<span className="text-secondary">def</span>{" "}
                <span className="text-primary">__init__</span>(self):{"\n"}
                {"        "}self.name = <span className="text-tertiary">&quot;Dipendra Nath&quot;</span>{"\n"}
                {"        "}self.ethos = <span className="text-tertiary">&quot;Resilience Over Trend&quot;</span>{"\n"}
                {"        "}self.stack = [<span className="text-tertiary">&quot;Python&quot;</span>,{" "}
                <span className="text-tertiary">&quot;React&quot;</span>,{" "}
                <span className="text-tertiary">&quot;PostgreSQL&quot;</span>]{"\n"}
                {"\n"}
                {"    "}<span className="text-secondary">def</span>{" "}
                <span className="text-primary">architect</span>(self, complexity):{"\n"}
                {"        "}<span className="text-secondary">return</span> self.precision_engineer(complexity){"\n"}
                {"\n"}
                <span className="text-outline-variant">{"# Initializing the Monolith..."}</span>{"\n"}
                me = Developer(){"\n"}
                me.architect(complexity=<span className="text-secondary">float</span>(<span className="text-tertiary">&apos;inf&apos;</span>))
              </pre>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-1">
            <h2 className="font-headline text-4xl font-bold text-white mb-6">
              Ready to Build the Impossible?
            </h2>
            <p className="text-on-surface-variant mb-6 text-lg">
              I am currently accepting new projects that require deep technical thinking and
              high-performance execution. Let&apos;s discuss your next architectural challenge.
            </p>
            {/* <p className="text-on-surface-variant text-sm mb-10">
              {siteConfig.location} ·{" "}
              <a href={`tel:${siteConfig.phone}`} className="hover:text-secondary transition-colors">
                {siteConfig.phone}
              </a>{" "}
              · {siteConfig.email}
            </p> */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-md font-headline font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
              >
                Initiate Contact
              </a>
              {hasResume ? (
                <a
                  href={siteConfig.resumePath}
                  download
                  className="bg-transparent border border-outline-variant text-white px-8 py-4 rounded-md font-headline font-bold uppercase tracking-widest text-xs hover:bg-surface-bright transition-colors"
                >
                  Download Dossier (CV)
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
