"use client";

import { useEffect, useRef } from "react";

/**
 * Count-up for measurement numbers. IO-triggered once; writes formatted
 * digits straight to the DOM node (no React state per frame). Pure
 * integers only — anything else renders statically. Reduced motion
 * leaves the final value in place from the start.
 */
export function CountUp({
  value,
  className,
  duration = 1200,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digits = value.replace(/,/g, "");
    if (!/^\d+$/.test(digits)) return;
    const end = parseInt(digits, 10);
    if (end <= 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(end * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
