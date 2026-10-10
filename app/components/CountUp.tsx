"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a number up when it scrolls into view. Server-renders the final value
 * (no-JS and crawlers see the real figure). Uses a scroll check so it always
 * lands on the true value even after fast scrolls or anchor jumps.
 */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    prefix + n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const final = format(to);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // numbers already on screen at load keep their final value: nothing jumps
    if (el.getBoundingClientRect().top < window.innerHeight * 0.94) return;
    el.textContent = format(0);
    let raf = 0;
    let started = false;
    const run = () => {
      started = true;
      window.removeEventListener("scroll", onScroll);
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        el.textContent = format(to * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
        else el.textContent = final;
      };
      raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!started && el.getBoundingClientRect().top < window.innerHeight * 0.9) run();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {format(to)}
    </span>
  );
}
