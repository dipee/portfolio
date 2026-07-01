"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-xl transition-all duration-300">
      <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter text-slate-100 font-headline"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-headline tracking-tight text-sm font-bold uppercase transition-colors ${
                pathname === link.href
                  ? "text-secondary-fixed border-b-2 border-secondary-fixed pb-1"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <a
          href={`mailto:${siteConfig.email}`}
          className="hidden md:inline-block bg-secondary-fixed text-on-secondary-fixed px-6 py-2 rounded-lg font-bold font-headline text-sm uppercase tracking-tight hover:brightness-110 transition-all duration-300 active:scale-95"
        >
          Hire Me
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-outline-variant/20 bg-[#0b1326] px-8 py-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-headline text-sm font-bold uppercase tracking-widest transition-colors ${
                  pathname === link.href
                    ? "text-secondary-fixed"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-block bg-secondary-fixed text-on-secondary-fixed px-6 py-2.5 rounded-lg font-bold font-headline text-sm uppercase tracking-tight w-fit"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
