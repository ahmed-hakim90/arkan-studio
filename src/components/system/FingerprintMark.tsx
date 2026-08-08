import type { Project } from "@/content/types";
import { fingerprintParams } from "@/lib/fingerprint";

type Props = {
  project: Project;
  size?: number;
  className?: string;
  light?: boolean;
};

export function FingerprintMark({
  project,
  size = 40,
  className = "",
  light = false,
}: Props) {
  const { bars, rings, accent } = fingerprintParams(project);
  const stroke = light ? "rgba(255,255,255,0.55)" : "var(--navy)";
  const signal = "var(--signal)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
    >
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx="20"
          cy="20"
          r={6 + i * 5}
          fill="none"
          stroke={stroke}
          strokeWidth="0.75"
          opacity={0.35 + i * 0.15}
        />
      ))}
      {bars.map((h, i) => {
        const x = 6 + i * 3.5;
        const height = h * 18;
        return (
          <rect
            key={i}
            x={x}
            y={28 - height}
            width="1.5"
            height={height}
            fill={i / bars.length > accent ? signal : stroke}
            opacity={0.85}
          />
        );
      })}
    </svg>
  );
}
