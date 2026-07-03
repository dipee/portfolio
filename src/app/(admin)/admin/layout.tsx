"use client";

import { usePathname } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-screen bg-surface">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-surface">
      <AdminNav />
      <div className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-6 py-8 md:px-10 md:py-12">{children}</div>
      </div>
    </div>
  );
}
