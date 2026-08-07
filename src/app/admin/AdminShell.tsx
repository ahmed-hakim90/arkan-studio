"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "./AdminNav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/admin/login");

  if (isLogin) {
    return <div className="site-shell min-h-full">{children}</div>;
  }

  return (
    <div className="site-shell min-h-full md:grid md:grid-cols-[16rem_1fr]">
      <AdminNav />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
