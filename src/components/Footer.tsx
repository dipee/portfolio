import { footerSocialLinks, siteConfig } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1326] w-full py-12 border-t border-slate-800/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 max-w-7xl mx-auto gap-6">
        <div className="text-lg font-black text-slate-200 font-headline uppercase tracking-tighter">
          {siteConfig.name}
        </div>

        <div className="flex gap-8">
          {footerSocialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-label text-sm uppercase tracking-widest text-slate-500 hover:text-secondary-fixed transition-all duration-300 opacity-80 hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="text-slate-500 text-sm font-label uppercase tracking-widest">
          © {year} {siteConfig.name}
        </div>
      </div>
    </footer>
  );
}
