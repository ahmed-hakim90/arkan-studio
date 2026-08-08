"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { quickUpdateLeadStatusAction } from "@/app/admin/actions";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/leads";

const labels: Record<LeadStatus, string> = {
  new: "جديد",
  seen: "اتشاف",
  contacted: "تواصل",
  closed: "مغلق",
  spam: "سبام",
};

export function LeadQuickStatus({
  id,
  current,
  notes,
}: {
  id: string;
  current: LeadStatus;
  notes: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-1.5" aria-label="تغيير سريع للحالة">
      {LEAD_STATUSES.map((status) => {
        const active = status === current;
        return (
          <button
            key={status}
            type="button"
            disabled={pending || active}
            className={`admin-chip ${active ? "admin-chip--active" : ""} disabled:cursor-not-allowed disabled:opacity-55`}
            onClick={() => {
              startTransition(async () => {
                const body = new FormData();
                body.set("id", id);
                body.set("status", status);
                body.set("admin_notes", notes);
                await quickUpdateLeadStatusAction(body);
                router.refresh();
              });
            }}
          >
            {labels[status]}
          </button>
        );
      })}
    </div>
  );
}
