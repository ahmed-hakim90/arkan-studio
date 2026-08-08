import type { SignalStoryTheme } from "./types";

export function themeClasses(theme: SignalStoryTheme): {
  section: string;
  ink: string;
  muted: string;
  panel: string;
  line: string;
  invert: boolean;
} {
  switch (theme) {
    case "gunmetal":
      return {
        section: "bg-[var(--gunmetal)] text-white",
        ink: "text-white",
        muted: "text-white/55",
        panel: "border-white/15 bg-white/[0.04]",
        line: "border-white/15",
        invert: true,
      };
    case "carbon":
      return {
        section: "bg-[var(--carbon)] text-white",
        ink: "text-white",
        muted: "text-white/55",
        panel: "border-white/15 bg-white/[0.04]",
        line: "border-white/15",
        invert: true,
      };
    case "bone":
      return {
        section: "bg-[var(--bone)] text-[var(--carbon)]",
        ink: "text-[var(--carbon)]",
        muted: "text-[var(--muted)]",
        panel: "border-[var(--line)] bg-[var(--surface)]",
        line: "border-[var(--line)]",
        invert: false,
      };
    case "surface":
      return {
        section: "bg-[var(--surface)] text-[var(--carbon)]",
        ink: "text-[var(--carbon)]",
        muted: "text-[var(--muted)]",
        panel: "border-[var(--line)] bg-[var(--bone-soft)]",
        line: "border-[var(--line)]",
        invert: false,
      };
    case "bone-soft":
    default:
      return {
        section: "bg-[var(--bone-soft)] text-[var(--carbon)]",
        ink: "text-[var(--carbon)]",
        muted: "text-[var(--muted)]",
        panel: "border-[var(--line)] bg-[var(--surface)]",
        line: "border-[var(--line)]",
        invert: false,
      };
  }
}
