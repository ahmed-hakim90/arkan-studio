"use client";

import { useMemo, useState } from "react";
import { FieldLabel } from "@/components/admin/ui";

function resolvePreviewUrl(path: string) {
  const trimmed = path.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!base) return null;
  const clean = trimmed.replace(/^\//, "");
  return `${base}/storage/v1/object/public/media/${clean}`;
}

export function PhotoPathPreview({
  name = "photo_path",
  defaultValue = "",
}: {
  name?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const preview = useMemo(() => resolvePreviewUrl(value), [value]);
  const [broken, setBroken] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block">
        <FieldLabel hint="انسخ المسار من صفحة الوسائط أو الصق رابطًا عامًا">
          مسار الصورة
        </FieldLabel>
        <input
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setBroken(false);
          }}
          className="field-input"
          placeholder="uploads/...."
          dir="ltr"
        />
      </label>
      {preview && !broken ? (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt=""
            className="h-14 w-14 rounded-lg object-cover"
            onError={() => setBroken(true)}
          />
          <p className="truncate text-xs text-[var(--muted)]" dir="ltr">
            {preview}
          </p>
        </div>
      ) : null}
      {value && broken ? (
        <p className="text-xs text-[var(--danger)]">تعذر تحميل المعاينة — تحقق من المسار.</p>
      ) : null}
    </div>
  );
}
