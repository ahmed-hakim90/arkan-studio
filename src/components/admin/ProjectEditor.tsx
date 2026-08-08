"use client";

import {
  CAPABILITIES,
  SECTORS,
  STATUSES,
  SYSTEM_TYPES,
} from "@/content/projects";
import type { Project } from "@/content/types";
import { deleteProjectAction, saveProjectAction } from "@/app/admin/actions";
import { Collapsible } from "@/components/admin/Collapsible";
import { ConfirmSubmit } from "@/components/admin/ConfirmSubmit";
import { EditorTabs } from "@/components/admin/EditorTabs";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { AdminCard, AdminFlash, FieldLabel } from "@/components/admin/ui";

type Props = {
  project: Project;
  published: boolean;
  sortOrder: number;
  isNew?: boolean;
  message?: string | null;
};

function LocalizedFields({
  base,
  label,
  value,
  rows = 2,
}: {
  base: string;
  label: string;
  value: { ar: string; en: string };
  rows?: number;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="block">
        <FieldLabel>{label} (عربي)</FieldLabel>
        <textarea
          name={`${base}_ar`}
          defaultValue={value.ar}
          rows={rows}
          className="field-input"
          required={base === "title"}
        />
      </label>
      <label className="block">
        <FieldLabel>{label} (EN)</FieldLabel>
        <textarea
          name={`${base}_en`}
          defaultValue={value.en}
          rows={rows}
          className="field-input"
          required={base === "title"}
        />
      </label>
    </div>
  );
}

function JsonField({
  name,
  label,
  value,
  rows = 8,
  hint,
}: {
  name: string;
  label: string;
  value: unknown;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <FieldLabel hint={hint}>{label} (JSON)</FieldLabel>
      <textarea
        name={name}
        defaultValue={JSON.stringify(value, null, 2)}
        rows={rows}
        className="field-input font-mono text-xs leading-relaxed"
        spellCheck={false}
        dir="ltr"
      />
    </label>
  );
}

const tabs = [
  { id: "basics", label: "أساسيات", hint: "هوية النظام" },
  { id: "copy", label: "النصوص", hint: "AR / EN" },
  { id: "model", label: "النموذج الغني", hint: "Control Room" },
];

export function ProjectEditor({
  project,
  published,
  sortOrder,
  isNew,
  message,
}: Props) {
  return (
    <form action={saveProjectAction} className="space-y-5 pb-28">
      <input type="hidden" name="id" value={project.id} />

      <AdminFlash
        ok={message === "ok" ? "1" : null}
        error={message && message !== "ok" ? "1" : null}
      />

      <EditorTabs
        tabs={tabs}
        panels={{
          basics: (
            <AdminCard className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <FieldLabel>ID</FieldLabel>
                  <input
                    defaultValue={project.id}
                    readOnly
                    className="field-input opacity-70"
                    dir="ltr"
                  />
                </label>
                <label className="block">
                  <FieldLabel>Slug</FieldLabel>
                  <input
                    name="slug"
                    defaultValue={project.slug}
                    className="field-input"
                    required
                    readOnly={!isNew}
                    dir="ltr"
                  />
                </label>
              </div>
              <LocalizedFields base="title" label="العنوان" value={project.title} rows={1} />
              <LocalizedFields
                base="descriptor"
                label="الوصف القصير"
                value={project.descriptor}
                rows={1}
              />
              <div className="grid gap-3 md:grid-cols-3">
                <label className="block">
                  <FieldLabel>القطاع</FieldLabel>
                  <select name="sector" defaultValue={project.sector} className="field-input">
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <FieldLabel>نوع النظام</FieldLabel>
                  <select
                    name="system_type"
                    defaultValue={project.systemType}
                    className="field-input"
                  >
                    {SYSTEM_TYPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <FieldLabel>الحالة</FieldLabel>
                  <select name="status" defaultValue={project.status} className="field-input">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block">
                <FieldLabel hint={CAPABILITIES.join(" · ")}>القدرات (مفصولة بفاصلة)</FieldLabel>
                <input
                  name="capabilities"
                  defaultValue={project.capabilities.join(", ")}
                  className="field-input"
                  dir="ltr"
                />
              </label>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="block">
                  <FieldLabel>المناطق</FieldLabel>
                  <input
                    name="region"
                    defaultValue={(project.region ?? []).join(", ")}
                    className="field-input"
                  />
                </label>
                <label className="block">
                  <FieldLabel>رابط حي</FieldLabel>
                  <input
                    name="live_url"
                    defaultValue={project.liveUrl ?? ""}
                    className="field-input"
                    dir="ltr"
                  />
                </label>
                <label className="block">
                  <FieldLabel>DNA tags</FieldLabel>
                  <input
                    name="dna"
                    defaultValue={project.dna.join(", ")}
                    className="field-input"
                    dir="ltr"
                  />
                </label>
                <label className="block">
                  <FieldLabel>مشاريع مرتبطة</FieldLabel>
                  <input
                    name="related"
                    defaultValue={(project.relatedProjects ?? []).join(", ")}
                    className="field-input"
                    dir="ltr"
                  />
                </label>
              </div>
              <div className="grid gap-3 rounded-xl bg-[color-mix(in_oklab,var(--paper)_70%,white)] p-3 md:grid-cols-3">
                <label className="block">
                  <FieldLabel>الترتيب</FieldLabel>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={sortOrder}
                    className="field-input"
                  />
                </label>
                <label className="flex items-center gap-2 pt-7 text-sm font-medium">
                  <input type="checkbox" name="featured" defaultChecked={project.featured} />
                  مميز في الصفحة الرئيسية
                </label>
                <label className="flex items-center gap-2 pt-7 text-sm font-medium">
                  <input type="checkbox" name="published" defaultChecked={published} />
                  منشور على الموقع
                </label>
              </div>
            </AdminCard>
          ),
          copy: (
            <AdminCard className="space-y-4">
              <LocalizedFields base="summary" label="الملخص" value={project.summary} />
              <LocalizedFields base="context" label="السياق" value={project.context} />
              <LocalizedFields base="challenge" label="التحدي" value={project.challenge} />
              <LocalizedFields
                base="thinking"
                label="التفكير"
                value={project.thinking ?? { ar: "", en: "" }}
              />
              <LocalizedFields base="solution" label="الحل" value={project.solution} />
              <LocalizedFields base="impact" label="الأثر" value={project.impact} />
              <Collapsible
                title="Behind Interface + Tech Rationale"
                hint="حقول JSON متقدمة للنصوص"
              >
                <div className="space-y-3">
                  <JsonField
                    name="behind_json"
                    label="Behind Interface"
                    value={project.behindInterface ?? null}
                    rows={6}
                    hint="surfaceAction / chain / punchline"
                  />
                  <JsonField
                    name="tech_rationale_json"
                    label="Tech Rationale"
                    value={project.techRationale ?? []}
                  />
                </div>
              </Collapsible>
            </AdminCard>
          ),
          model: (
            <AdminCard className="space-y-4">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                هذه الحقول تغذّي Control Room وSystem X-Ray. كل قسم قابل للطي — احفظ من أي تبويب.
              </p>
              <div className="grid gap-3 lg:grid-cols-2">
                {(
                  [
                    { name: "modules_json", label: "Modules", value: project.modules, open: true },
                    { name: "roles_json", label: "Roles", value: project.roles, open: true },
                    { name: "workflows_json", label: "Workflows", value: project.workflows },
                    {
                      name: "integrations_json",
                      label: "Integrations",
                      value: project.integrations,
                    },
                    { name: "stack_json", label: "Stack", value: project.stack },
                    { name: "outcomes_json", label: "Outcomes", value: project.outcomes },
                    { name: "scope_json", label: "Arkan Scope", value: project.arkanScope },
                    { name: "media_json", label: "Media refs", value: project.media ?? [] },
                    { name: "mass_json", label: "Mass", value: project.mass, rows: 5 },
                    { name: "scale_json", label: "Scale", value: project.scale, rows: 5 },
                    { name: "atlas_json", label: "Atlas position", value: project.atlas, rows: 3 },
                  ] as Array<{
                    name: string;
                    label: string;
                    value: unknown;
                    rows?: number;
                    open?: boolean;
                  }>
                ).map((field) => (
                  <Collapsible
                    key={field.name}
                    title={field.label}
                    hint="JSON"
                    defaultOpen={Boolean(field.open)}
                  >
                    <JsonField
                      name={field.name}
                      label={field.label}
                      value={field.value}
                      rows={field.rows ?? 8}
                    />
                  </Collapsible>
                ))}
              </div>
            </AdminCard>
          ),
        }}
      />

      <div className="admin-sticky-save">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted)]">
            {isNew ? "مشروع جديد — احفظ للنشر على الموقع" : `تعديل ${project.slug}`}
          </p>
          <div className="flex flex-wrap gap-2">
            {!isNew ? (
              <ConfirmSubmit
                formAction={deleteProjectAction}
                message={`حذف المشروع «${project.title.ar}» نهائيًا؟`}
                className="rounded-lg px-4 py-2 text-sm text-[var(--danger)] hover:bg-[color-mix(in_oklab,var(--danger)_8%,white)]"
              >
                حذف
              </ConfirmSubmit>
            ) : null}
            <SubmitButton pendingLabel="جارٍ الحفظ…">حفظ المشروع</SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
}
