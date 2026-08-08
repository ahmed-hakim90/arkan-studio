"use client";

import { usePathname } from "next/navigation";
import { AdminNav } from "./AdminNav";

export function AdminShell({
  children,
  userEmail,
  newLeads = 0,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
  newLeads?: number;
}) {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/admin/login");

  if (isLogin) {
    return <div className="admin-root min-h-full">{children}</div>;
  }

  return (
    <div className="admin-root">
      <div className="admin-shell">
        <AdminNav userEmail={userEmail} newLeads={newLeads} />
        <div className="admin-main">{children}</div>
      </div>
    </div>
  );
}
