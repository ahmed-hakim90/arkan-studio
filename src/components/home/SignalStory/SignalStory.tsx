"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { SignalStoryProgress } from "./SignalStoryProgress";
import { SignalStoryVisual } from "./SignalStoryVisual";
import { themeClasses } from "./theme";
import type { SignalStoryItem, SignalStoryProps } from "./types";

function NarrativeBlock({
  item,
  index,
  total,
  mutedClass,
  inkClass,
  showProgress,
  localProgress,
}: {
  item: SignalStoryItem;
  index: number;
  total: number;
  mutedClass: string;
  inkClass: string;
  showProgress: boolean;
  localProgress: number;
}) {
  return (
    <div className="flex min-h-0 flex-col justify-center">
      {item.eyebrow ? (
        <p className={`tech-label text-[11px] ${mutedClass}`} dir="ltr">
          {item.eyebrow}
        </p>
      ) : (
        <p className={`tech-label text-[11px] ${mutedClass}`} dir="ltr">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
      )}

      <h2
        className={`font-display mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.08] tracking-[-0.025em] ${
          item.accent ? "text-[var(--oxide)]" : inkClass
        }`}
      >
        {item.title}
      </h2>

      {item.description ? (
        <p
          className={`mt-4 max-w-[36ch] text-base leading-relaxed md:text-lg ${mutedClass}`}
        >
          {item.description}
        </p>
      ) : null}

      {item.meta && item.meta.length > 0 ? (
        <dl className="mt-6 hidden max-w-md grid-cols-2 gap-x-6 gap-y-3 lg:grid">
          {item.meta.map((row) => (
            <div key={`${row.label}-${row.value}`}>
              <dt className={`tech-label text-[9px] ${mutedClass}`}>
                {row.label}
              </dt>
              <dd className={`mt-1 text-sm font-medium ${inkClass}`}>
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      {showProgress ? (
        <SignalStoryProgress
          index={index}
          total={total}
          localProgress={localProgress}
        />
      ) : null}
    </div>
  );
}

function VisualPane({
  item,
  index,
  localProgress,
  invert,
  reduced,
  renderVisual,
  className = "",
}: {
  item: SignalStoryItem;
  index: number;
  localProgress: number;
  invert: boolean;
  reduced?: boolean;
  renderVisual?: SignalStoryProps["renderVisual"];
  className?: string;
}) {
  return (
    <div className={`relative min-h-0 w-full ${className}`}>
      {renderVisual ? (
        renderVisual({ item, index, localProgress })
      ) : (
        <SignalStoryVisual
          item={item}
          invert={invert}
          reduced={reduced}
          localProgress={localProgress}
        />
      )}
    </div>
  );
}

function StackedStory({
  items,
  themeStyle,
  ariaLabel,
  sectionEyebrow,
  showProgress,
  renderVisual,
  reduced,
  className,
}: {
  items: SignalStoryItem[];
  themeStyle: ReturnType<typeof themeClasses>;
  ariaLabel?: string;
  sectionEyebrow?: string;
  showProgress: boolean;
  renderVisual?: SignalStoryProps["renderVisual"];
  reduced?: boolean;
  className?: string;
}) {
  return (
    <section
      className={`${themeStyle.section} ${className ?? ""}`}
      aria-label={ariaLabel}
    >
      <div className="section-pad canvas py-10 md:py-16">
        {sectionEyebrow ? (
          <p className={`tech-label mb-8 text-[11px] ${themeStyle.muted}`}>
            {sectionEyebrow}
          </p>
        ) : null}
        <ol className="space-y-0">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`border-t py-10 md:grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-center md:gap-10 md:py-14 ${themeStyle.line} first:border-t-0 first:pt-0`}
            >
              <div className="md:contents">
                {item.eyebrow ? (
                  <p
                    className={`tech-label text-[11px] md:col-start-1 ${themeStyle.muted}`}
                    dir="ltr"
                  >
                    {item.eyebrow}
                  </p>
                ) : null}
                <VisualPane
                  item={item}
                  index={index}
                  localProgress={0.45}
                  invert={themeStyle.invert}
                  reduced={reduced}
                  renderVisual={renderVisual}
                  className="mt-4 min-h-[42svh] md:col-start-2 md:row-span-4 md:mt-0 md:min-h-[320px]"
                />
                <h2
                  className={`font-display mt-6 text-[clamp(1.65rem,7vw,2.25rem)] leading-[1.1] tracking-[-0.025em] md:col-start-1 md:mt-4 ${
                    item.accent ? "text-[var(--oxide)]" : themeStyle.ink
                  }`}
                >
                  {item.title}
                </h2>
                {item.description ? (
                  <p
                    className={`mt-3 max-w-[40ch] text-base leading-relaxed md:col-start-1 ${themeStyle.muted}`}
                  >
                    {item.description}
                  </p>
                ) : null}
                {showProgress ? (
                  <div className="md:col-start-1">
                    <SignalStoryProgress
                      index={index}
                      total={items.length}
                      localProgress={1}
                    />
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ScrubNarrative({
  items,
  scrollYProgress,
  activeIndex,
  localProgress,
  mutedClass,
  inkClass,
  showProgress,
}: {
  items: SignalStoryItem[];
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
  localProgress: number;
  mutedClass: string;
  inkClass: string;
  showProgress: boolean;
}) {
  const count = items.length;

  return (
    <div className="relative min-h-[280px] w-full">
      {items.map((item, index) => (
        <ScrubBeat
          key={item.id}
          item={item}
          index={index}
          count={count}
          scrollYProgress={scrollYProgress}
          activeIndex={activeIndex}
          localProgress={localProgress}
          mutedClass={mutedClass}
          inkClass={inkClass}
          showProgress={showProgress}
        />
      ))}
    </div>
  );
}

function ScrubBeat({
  item,
  index,
  count,
  scrollYProgress,
  activeIndex,
  localProgress,
  mutedClass,
  inkClass,
  showProgress,
}: {
  item: SignalStoryItem;
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
  localProgress: number;
  mutedClass: string;
  inkClass: string;
  showProgress: boolean;
}) {
  // Equal bands across full section height (paired with offset end/start)
  const start = index / count;
  const mid = (index + 0.5) / count;
  const end = (index + 1) / count;
  const fade = Math.min(0.04, 0.35 / count);

  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, start - fade),
      start + fade,
      Math.max(start + fade, end - fade),
      Math.min(1, end + fade),
    ],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [start, mid, end],
    [10, 0, -8],
  );

  const on = activeIndex === index;

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center ${
        on ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!on}
    >
      <NarrativeBlock
        item={item}
        index={index}
        total={count}
        mutedClass={mutedClass}
        inkClass={inkClass}
        showProgress={showProgress && on}
        localProgress={on ? localProgress : 0}
      />
    </motion.div>
  );
}

/**
 * SignalStory — Arkan sticky narrative system.
 * Scroll distance scales with `items.length`; inner scene stays pinned on md+.
 */
export function SignalStory({
  items,
  theme = "bone-soft",
  visualPosition = "end",
  showProgress = true,
  variant = "split",
  className = "",
  ariaLabel,
  sectionEyebrow,
  renderVisual,
}: SignalStoryProps) {
  const reduced = usePrefersReducedMotion();
  const themeStyle = themeClasses(theme);
  const ref = useRef<HTMLElement>(null);
  const count = Math.max(items.length, 1);

  // start/start → end/end: progress 0..1 while the pin is held.
  // Track height = N×step + 1 viewport so each step gets an equal band.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const scaled = Math.min(count - 0.001, Math.max(0, v * count));
    const next = Math.min(count - 1, Math.floor(scaled));
    setActiveIndex(next);
    setLocalProgress(scaled - next);
  });

  const activeItem = items[activeIndex] ?? items[0];
  const visualFirst = visualPosition === "start";

  const trackStyle = useMemo(
    () =>
      ({
        ["--signal-story-steps" as string]: String(count),
        minHeight:
          "calc(var(--signal-story-steps) * clamp(70vh, 12vw + 56vh, 84vh) + 100svh)",
      }) as CSSProperties,
    [count],
  );

  if (items.length === 0) return null;

  if (reduced) {
    return (
      <StackedStory
        items={items}
        themeStyle={themeStyle}
        ariaLabel={ariaLabel}
        sectionEyebrow={sectionEyebrow}
        showProgress={false}
        renderVisual={renderVisual}
        reduced
        className={className}
      />
    );
  }

  const narrative = (
    <ScrubNarrative
      items={items}
      scrollYProgress={scrollYProgress}
      activeIndex={activeIndex}
      localProgress={localProgress}
      mutedClass={themeStyle.muted}
      inkClass={themeStyle.ink}
      showProgress={showProgress}
    />
  );

  const visual = (
    <VisualPane
      item={activeItem}
      index={activeIndex}
      localProgress={localProgress}
      invert={themeStyle.invert}
      renderVisual={renderVisual}
      className="h-full min-h-[min(52svh,480px)]"
    />
  );

  let desktopGrid: ReactNode;
  if (variant === "centered") {
    desktopGrid = (
      <div className="mx-auto grid w-full max-w-3xl gap-10">
        {narrative}
        {visual}
      </div>
    );
  } else if (visualFirst) {
    desktopGrid = (
      <div className="grid h-full max-h-[820px] w-full items-stretch gap-8 md:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] md:gap-10 lg:gap-14">
        {visual}
        <div className="flex min-h-0 flex-col justify-center">{narrative}</div>
      </div>
    );
  } else {
    desktopGrid = (
      <div className="grid h-full max-h-[820px] w-full items-stretch gap-8 md:grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] md:gap-10 lg:gap-14">
        <div className="flex min-h-0 flex-col justify-center">{narrative}</div>
        {visual}
      </div>
    );
  }

  return (
    <>
      <div className="md:hidden">
        <StackedStory
          items={items}
          themeStyle={themeStyle}
          ariaLabel={ariaLabel}
          sectionEyebrow={sectionEyebrow}
          showProgress={showProgress}
          renderVisual={renderVisual}
          className={className}
        />
      </div>

      <section
        ref={ref}
        className={`relative hidden md:block ${themeStyle.section} ${className}`}
        aria-label={ariaLabel}
        style={trackStyle}
      >
        <div className="section-pad sticky top-[var(--header-offset,5rem)] canvas flex h-[calc(100svh-var(--header-offset,5rem))] flex-col justify-center py-6 lg:py-8">
          {sectionEyebrow ? (
            <p className={`tech-label mb-5 text-[11px] ${themeStyle.muted}`}>
              {sectionEyebrow}
            </p>
          ) : null}

          {desktopGrid}

          <div className="sr-only" aria-live="polite">
            {activeItem.eyebrow ? `${activeItem.eyebrow}. ` : ""}
            {activeItem.title}
            {activeItem.description ? `. ${activeItem.description}` : ""}
          </div>
        </div>
      </section>
    </>
  );
}
