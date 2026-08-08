"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type Tilt = { x: number; y: number };

type Options = {
  maxDeg?: number;
  disabled?: boolean;
};

/** Subtle perspective tilt for architectural panels (fine pointer only). */
export function useTilt3D({ maxDeg = 8, disabled = false }: Options = {}) {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = finePointer && !disabled;

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!active) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      setTilt({
        x: (0.5 - py) * maxDeg * 2,
        y: (px - 0.5) * maxDeg * 2,
      });
    },
    [active, maxDeg],
  );

  const onPointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const style: CSSProperties | undefined = active
    ? {
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 180ms var(--ease-out-system)",
        willChange: "transform",
      }
    : undefined;

  return {
    active,
    style,
    handlers: {
      onPointerMove,
      onPointerLeave,
    },
  };
}
