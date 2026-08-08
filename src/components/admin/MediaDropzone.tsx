"use client";

import { useRef, useState } from "react";

export function MediaDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div
      className={`admin-dropzone ${dragging ? "admin-dropzone--active" : ""}`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (!file || !inputRef.current) return;
        const dt = new DataTransfer();
        dt.items.add(file);
        inputRef.current.files = dt.files;
        setFileName(file.name);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        required
        className="sr-only"
        id="admin-media-file"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      <label htmlFor="admin-media-file" className="block cursor-pointer text-center">
        <span className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--volt-soft)] text-[var(--volt)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 16V4m0 0 4 4m-4-4-4 4M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="block text-sm font-medium">
          {fileName ? fileName : "اسحب الصورة هنا أو اضغط للاختيار"}
        </span>
        <span className="mt-1 block text-xs text-[var(--muted)]">
          JPEG / PNG / WebP / GIF / SVG — حتى 5MB
        </span>
      </label>
    </div>
  );
}
