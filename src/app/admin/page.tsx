import Link from "next/link";
import {
  AdminBadge,
  AdminCard,
  AdminEmpty,
  AdminHeader,
  AdminPage,
  AdminStat,
} from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/auth";
import type { Lead } from "@/lib/leads";
import { rowToProject, type ProjectRow, type TeamRow } from "@/lib/content/types";

export const metadata = {
  title: "لوحة التحكم",
};

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 18) return "مساء الخير";
  return "مرحبًا";
}

export default async function AdminDashboardPage() {
  const { supabase, user } = await requireAdmin();

  const [leadsRes, projectsRes, teamRes, mediaRes, settingsRes, newCountRes] =
    await Promise.all([
      supabase
        .from("leads")
        .select(
          "id, name, email, message, system_type, market, scale, language, source_project, status, admin_notes, created_at, updated_at",
        )
        .order("created_at", { ascending: false })
        .limit(6),
      supabase.from("projects").select("*").order("sort_order", { ascending: true }),
      supabase.from("team_members").select("id, active, name").order("sort_order"),
      supabase.from("media_assets").select("id", { count: "exact", head: true }),
      supabase.from("site_settings").select("legal_name, email").eq("id", 1).maybeSingle(),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
    ]);

  const leads = (leadsRes.data ?? []) as Lead[];
  const projects = ((projectsRes.data ?? []) as ProjectRow[]).map(rowToProject);
  const team = (teamRes.data ?? []) as Pick<TeamRow, "id" | "active" | "name">[];
  const newLeads = newCountRes.count ?? 0;
  const published =
    (projectsRes.data as ProjectRow[] | null)?.filter((p) => p.published).length ?? 0;
  const featured = projects.filter((p) => p.featured).length;
  const activeTeam = team.filter((m) => m.active).length;
  const emailShort = user.email?.split("@")[0] ?? "Admin";

  return (
    <AdminPage wide>
      <AdminHeader
        eyebrow="Dashboard / Overview"
        title={`${greeting()}، ${emailShort}`}
        description="تحكم كامل بمحتوى الموقع والطلبات والمشاريع — بنفس لغة تصميم المنصة."
        actions={
          <>
            <Link href="/admin/projects/new" className="btn-primary">
              مشروع جديد
            </Link>
            <Link href="/admin/leads?status=new" className="btn-ghost-dark">
              الطلبات الجديدة
              {newLeads > 0 ? ` (${newLeads})` : ""}
            </Link>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStat
          label="طلبات جديدة"
          value={newLeads}
          hint="بحاجة لمتابعة"
          href="/admin/leads?status=new"
          tone={newLeads > 0 ? "signal" : "default"}
        />
        <AdminStat
          label="المشاريع"
          value={projects.length}
          hint={`${published} منشور · ${featured} مميز`}
          href="/admin/projects"
        />
        <AdminStat
          label="الفريق"
          value={activeTeam}
          hint={`${team.length} إجمالي`}
          href="/admin/team"
          tone="ok"
        />
        <AdminStat
          label="الوسائط"
          value={mediaRes.count ?? 0}
          hint={
            settingsRes.data?.email
              ? `تواصل: ${settingsRes.data.email}`
              : "ارفع صور الاستخدام"
          }
          href="/admin/media"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="tech-label text-[10px] text-[var(--muted)]">Inbox</p>
              <h2 className="font-display mt-1 text-lg font-semibold sm:text-xl">أحدث الطلبات</h2>
            </div>
            <Link
              href="/admin/leads"
              className="text-sm font-medium text-[var(--navy-soft)] hover:text-[var(--signal)]"
            >
              عرض الكل
            </Link>
          </div>
          {leads.length === 0 ? (
            <AdminEmpty
              title="لا توجد طلبات بعد"
              description="ستظهر هنا طلبات نموذج /start فور وصولها."
            />
          ) : (
            <ul className="space-y-2.5">
              {leads.map((lead) => (
                <li key={lead.id}>
                  <AdminCard interactive className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="tech-label text-[10px] text-[var(--signal)]">
                          INQUIRY
                        </p>
                        <AdminBadge tone={lead.status === "new" ? "signal" : "muted"}>
                          {lead.status}
                        </AdminBadge>
                      </div>
                      <p className="mt-1 font-display text-lg font-semibold tracking-tight">
                        {lead.name}
                      </p>
                      <p className="mt-1 truncate text-sm text-[var(--muted)]" dir="ltr">
                        {lead.email}
                      </p>
                      <p className="mt-1 tech-label text-[10px] text-[var(--muted)]">
                        {formatDate(lead.created_at)} · {lead.system_type} · {lead.market}
                      </p>
                    </div>
                    <Link
                      href={`/admin/leads?q=${encodeURIComponent(lead.email)}`}
                      className="btn-ghost-dark text-sm"
                    >
                      فتح
                    </Link>
                  </AdminCard>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="space-y-3">
          <div>
            <p className="tech-label text-[10px] text-[var(--muted)]">Shortcuts</p>
            <h2 className="font-display mt-1 text-lg font-semibold sm:text-xl">اختصارات سريعة</h2>
          </div>
          <div className="grid gap-2.5">
            {[
              {
                href: "/admin/projects",
                title: "إدارة المشاريع",
                desc: "Control Rooms والنموذج الغني",
              },
              {
                href: "/admin/copy?ns=Hero",
                title: "تعديل النصوص",
                desc: "Hero، Nav، Footer، Start…",
              },
              {
                href: "/admin/settings",
                title: "إعدادات التواصل",
                desc: "إيميل، واتساب، سوشيال",
              },
              {
                href: "/admin/team",
                title: "أعضاء الفريق",
                desc: "الصور، الأدوار، الروابط",
              },
              {
                href: "/admin/media",
                title: "مكتبة الوسائط",
                desc: "رفع صور ونسخ المسارات",
              },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-[1.1rem]">
                <AdminCard interactive>
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.desc}</p>
                </AdminCard>
              </Link>
            ))}
          </div>

          <AdminCard>
            <p className="text-[11px] font-medium tracking-wide text-[var(--muted)] uppercase">
              المشاريع المميزة
            </p>
            {featured === 0 ? (
              <p className="mt-2 text-sm text-[var(--muted)]">لا يوجد مشروع مميز حاليًا.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {projects
                  .filter((p) => p.featured)
                  .slice(0, 5)
                  .map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="text-sm font-medium hover:text-[var(--signal)]"
                      >
                        {p.title.ar}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </AdminCard>
        </section>
      </div>
    </AdminPage>
  );
}
