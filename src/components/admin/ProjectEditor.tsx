import {
  CAPABILITIES,
  SECTORS,
  STATUSES,
  SYSTEM_TYPES,
} from "@/content/projects";
import type { Project } from "@/content/types";
import { deleteProjectAction, saveProjectAction } from "@/app/admin/actions";

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
        <span className="mb-1 block text-xs text-[var(--muted)]">{label} (عربي)</span>
        <textarea
          name={`${base}_ar`}
          defaultValue={value.ar}
          rows={rows}
          className="field-input"
          required={base === "title"}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs text-[var(--muted)]">{label} (EN)</span>
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
}: {
  name: string;
  label: string;
  value: unknown;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-[var(--muted)]">{label} (JSON)</span>
      <textarea
        name={name}
        defaultValue={JSON.stringify(value, null, 2)}
        rows={rows}
        className="field-input font-mono text-xs"
        spellCheck={false}
      />
    </label>
  );
}

export function ProjectEditor({
  project,
  published,
  sortOrder,
  isNew,
  message,
}: Props) {
  return (
    <form action={saveProjectAction} className="space-y-8">
      <input type="hidden" name="id" value={project.id} />

      {message ? (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            message === "ok"
              ? "bg-[color-mix(in_oklab,var(--ok)_15%,white)] text-[var(--ok)]"
              : "bg-[var(--signal-soft)] text-[var(--danger)]"
          }`}
        >
          {message === "ok" ? "تم الحفظ بنجاح." : "تعذر الحفظ. راجع البيانات."}
        </p>
      ) : null}

      <section className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="font-display text-xl">أساسيات</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">ID</span>
            <input
              defaultValue={project.id}
              readOnly
              className="field-input opacity-70"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">Slug</span>
            <input
              name="slug"
              defaultValue={project.slug}
              className="field-input"
              required
              readOnly={!isNew}
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
            <span className="mb-1 block text-xs text-[var(--muted)]">القطاع</span>
            <select name="sector" defaultValue={project.sector} className="field-input">
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">نوع النظام</span>
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
            <span className="mb-1 block text-xs text-[var(--muted)]">الحالة</span>
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
          <span className="mb-1 block text-xs text-[var(--muted)]">
            القدرات (مفصولة بفاصلة)
          </span>
          <input
            name="capabilities"
            defaultValue={project.capabilities.join(", ")}
            className="field-input"
            placeholder={CAPABILITIES.join(", ")}
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-[var(--muted)]">المناطق</span>
          <input
            name="region"
            defaultValue={(project.region ?? []).join(", ")}
            className="field-input"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-[var(--muted)]">رابط حي</span>
          <input
            name="live_url"
            defaultValue={project.liveUrl ?? ""}
            className="field-input"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-[var(--muted)]">DNA tags</span>
          <input
            name="dna"
            defaultValue={project.dna.join(", ")}
            className="field-input"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs text-[var(--muted)]">مشاريع مرتبطة</span>
          <input
            name="related"
            defaultValue={(project.relatedProjects ?? []).join(", ")}
            className="field-input"
          />
        </label>
        <div className="grid gap-3 md:grid-cols-3">
          <label className="block">
            <span className="mb-1 block text-xs text-[var(--muted)]">الترتيب</span>
            <input
              name="sort_order"
              type="number"
              defaultValue={sortOrder}
              className="field-input"
            />
          </label>
          <label className="flex items-center gap-2 pt-6 text-sm">
            <input type="checkbox" name="featured" defaultChecked={project.featured} />
            مميز
          </label>
          <label className="flex items-center gap-2 pt-6 text-sm">
            <input type="checkbox" name="published" defaultChecked={published} />
            منشور على الموقع
          </label>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="font-display text-xl">النصوص</h2>
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
        <JsonField
          name="behind_json"
          label="Behind Interface"
          value={project.behindInterface ?? null}
          rows={6}
        />
        <JsonField
          name="tech_rationale_json"
          label="Tech Rationale"
          value={project.techRationale ?? []}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <h2 className="font-display text-xl">النموذج الغني</h2>
        <JsonField name="modules_json" label="Modules" value={project.modules} />
        <JsonField name="roles_json" label="Roles" value={project.roles} />
        <JsonField name="workflows_json" label="Workflows" value={project.workflows} />
        <JsonField
          name="integrations_json"
          label="Integrations"
          value={project.integrations}
        />
        <JsonField name="stack_json" label="Stack" value={project.stack} />
        <JsonField name="outcomes_json" label="Outcomes" value={project.outcomes} />
        <JsonField name="scope_json" label="Arkan Scope" value={project.arkanScope} />
        <JsonField name="mass_json" label="Mass" value={project.mass} rows={4} />
        <JsonField name="scale_json" label="Scale" value={project.scale} rows={4} />
        <JsonField name="atlas_json" label="Atlas position" value={project.atlas} rows={3} />
        <JsonField name="media_json" label="Media refs" value={project.media ?? []} />
      </section>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          حفظ المشروع
        </button>
        {!isNew ? (
          <button
            formAction={deleteProjectAction}
            className="rounded-lg px-4 py-2 text-sm text-[var(--danger)] hover:bg-[var(--signal-soft)]"
          >
            حذف
          </button>
        ) : null}
      </div>
    </form>
  );
}
