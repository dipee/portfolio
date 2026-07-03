"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/projects", label: "Projects", icon: "folder_open" },
  { href: "/admin/blog", label: "Blog", icon: "article" },
  { href: "/admin/assets", label: "Assets", icon: "upload_file" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r border-outline-variant/10 bg-surface-container-low">
      <div className="p-6 md:min-h-screen flex flex-col gap-8">
        <div>
          <p className="text-secondary font-headline font-bold tracking-widest uppercase text-xs mb-1">
            Admin
          </p>
          <h1 className="font-headline text-xl font-bold text-on-surface tracking-tight">
            Portfolio CMS
          </h1>
        </div>

        <nav className="flex md:flex-col gap-2 overflow-x-auto">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline font-bold uppercase tracking-wide transition-colors whitespace-nowrap ${
                  active
                    ? "bg-secondary/15 text-secondary"
                    : "text-on-tertiary-container hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="md:mt-auto flex flex-col gap-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline font-bold uppercase tracking-wide text-on-tertiary-container hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">public</span>
            View site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-headline font-bold uppercase tracking-wide text-on-tertiary-container hover:bg-surface-container-high hover:text-on-surface transition-colors text-left"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
