"use client";

import { useState, type ReactNode } from "react";

export type EditorTab = {
  id: string;
  label: string;
  hint?: string;
};

export function EditorTabs({
  tabs,
  panels,
}: {
  tabs: EditorTab[];
  /** Keep all panels mounted so form fields still submit. */
  panels: Record<string, ReactNode>;
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  return (
    <div className="space-y-4">
      <div className="admin-tabs" role="tablist" aria-label="أقسام المحرر">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`admin-tab ${selected ? "admin-tab--active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              <span>{tab.label}</span>
              {tab.hint ? <span className="admin-tab__hint">{tab.hint}</span> : null}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== active}
          className="space-y-4"
        >
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}
